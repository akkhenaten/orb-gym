/**
 * Notification delivery.
 *
 * A transactional outbox, not a fire-and-forget call: the engine writes an outbox
 * row inside the same transaction as the state change, so a delivered notification
 * can never describe a command that rolled back, and a committed command never
 * loses its notification.
 *
 * Enforced rules, each traceable to docs/notifications/:
 *   - deduplication_key is unique, so a retried command cannot double-send
 *   - supersede_key retires older PENDING rows for the same subject
 *   - attempts are bounded with backoff; exhaustion is FAILED, never silently dropped
 *   - a channel with no adapter records a FAILED attempt, never a fake success
 *   - quiet hours defer, they do not discard
 *
 * The specification has no transition -> event edge (see notification-report.json),
 * so callers name the event explicitly. Nothing is inferred here.
 */
import { randomUUID } from 'node:crypto';
import { insertRow } from './db.mjs';
import { EVENTS } from '../generated/notifications.mjs';

const BY_ID = new Map(EVENTS.map((e) => [e.event_id, e]));

export const OUTBOX = Object.freeze({
  PENDING: 'PENDING', DELIVERED: 'DELIVERED', SUPERSEDED: 'SUPERSEDED', FAILED: 'FAILED',
});

export const MAX_ATTEMPTS = 5;
/** 1, 5, 25, 125, 625 minutes */
export const backoffMinutes = (attempt) => 5 ** Math.max(0, attempt - 1);

export function eventById(eventId) {
  return BY_ID.get(eventId) ?? null;
}

const nowIso = () => new Date().toISOString();

/**
 * Enqueue one notification. Must be called inside the command's transaction.
 * Returns { outbox_id, deduplicated } — a repeat of the same dedup key returns the
 * existing row untouched so a retry is safe.
 */
export function enqueue(db, {
  eventId, dedupKey, supersedeKey = null, entityTable = null, recordId = null,
  recipientId = null, payload = {}, at = nowIso(),
}) {
  const event = eventById(eventId);
  if (!event) throw new Error(`unknown notification event ${eventId}`);
  if (!dedupKey) throw new Error('a notification needs a deduplication key');

  const existing = db.prepare('SELECT outbox_id FROM _notification_outbox WHERE dedup_key = ?').get(dedupKey);
  if (existing) return { outbox_id: existing.outbox_id, deduplicated: true };

  if (supersedeKey) {
    db.prepare(
      `UPDATE _notification_outbox SET status = ?, updated_at = ?
       WHERE supersede_key = ? AND status = ?`,
    ).run(OUTBOX.SUPERSEDED, at, supersedeKey, OUTBOX.PENDING);
  }

  const outboxId = randomUUID();
  insertRow(db, '_notification_outbox', {
    outbox_id: outboxId,
    event_id: eventId,
    dedup_key: dedupKey,
    supersede_key: supersedeKey,
    entity_table: entityTable,
    record_id: recordId,
    recipient_id: recipientId,
    payload_json: JSON.stringify({ ...payload, event_name: event.name, domain: event.domain }),
    status: OUTBOX.PENDING,
    attempts: 0,
    next_attempt_at: at,
    created_at: at,
    updated_at: at,
  });
  return { outbox_id: outboxId, deduplicated: false };
}

/** Is `at` inside a quiet window expressed as [startHour, endHour) in UTC hours? */
export function inQuietHours(at, { startHour, endHour }) {
  const h = new Date(at).getUTCHours();
  if (startHour === endHour) return false;
  return startHour < endHour ? h >= startHour && h < endHour : h >= startHour || h < endHour;
}

function preferenceEnabled(db, recipientId, channel) {
  if (!recipientId) return false;
  const row = db.prepare(
    'SELECT enabled FROM _notification_preference WHERE actor_id = ? AND channel = ?',
  ).get(recipientId, channel);
  return row?.enabled === 1;
}

/**
 * Dispatch due notifications.
 *
 * @param {object} args
 * @param {import('node:sqlite').DatabaseSync} args.db
 * @param {Record<string, (job:object)=>void|Promise<void>>} args.adapters channel -> adapter
 * @param {string} [args.now]
 * @param {{startHour:number,endHour:number}} [args.quietHours]
 * @param {number} [args.limit]
 */
export async function dispatch({ db, adapters, now = nowIso(), quietHours = null, limit = 50 }) {
  if (quietHours && inQuietHours(now, quietHours)) {
    return { deferred_quiet_hours: true, processed: 0, delivered: 0, failed: 0, superseded: 0 };
  }

  const due = db.prepare(
    `SELECT * FROM _notification_outbox
     WHERE status = ? AND (next_attempt_at IS NULL OR next_attempt_at <= ?)
     ORDER BY created_at LIMIT ?`,
  ).all(OUTBOX.PENDING, now, limit);

  const summary = { deferred_quiet_hours: false, processed: 0, delivered: 0, failed: 0, superseded: 0 };

  for (const row of due) {
    summary.processed += 1;
    const event = eventById(row.event_id);
    const channels = [];
    if (event?.in_app) channels.push('in_app');
    // Guarded: a prose string here would otherwise be iterated per character.
    if (Array.isArray(event?.external_channels)) {
      for (const c of event.external_channels) channels.push(c);
    }
    const usable = channels.length ? channels : ['in_app'];

    let anyDelivered = false;
    let lastError = null;

    for (const channel of usable) {
      const adapter = adapters?.[channel];
      // preference and adapter are both required; a missing adapter is a failure,
      // never an assumed success.
      if (channel !== 'in_app' && row.recipient_id && !preferenceEnabled(db, row.recipient_id, channel)) {
        insertRow(db, '_notification_attempt', {
          attempt_id: randomUUID(), outbox_id: row.outbox_id, channel,
          outcome: 'SKIPPED_NO_CONSENT', detail: 'recipient has not enabled this channel', created_at: now,
        });
        continue;
      }
      if (!adapter) {
        lastError = `channel ${channel} has no adapter configured`;
        insertRow(db, '_notification_attempt', {
          attempt_id: randomUUID(), outbox_id: row.outbox_id, channel,
          outcome: 'FAILED', detail: lastError, created_at: now,
        });
        continue;
      }
      try {
        await adapter({ outbox_id: row.outbox_id, event_id: row.event_id, channel, payload: JSON.parse(row.payload_json) });
        insertRow(db, '_notification_attempt', {
          attempt_id: randomUUID(), outbox_id: row.outbox_id, channel, outcome: 'DELIVERED', detail: null, created_at: now,
        });
        anyDelivered = true;
      } catch (err) {
        lastError = `${channel}: ${err.message}`;
        insertRow(db, '_notification_attempt', {
          attempt_id: randomUUID(), outbox_id: row.outbox_id, channel, outcome: 'FAILED', detail: lastError, created_at: now,
        });
      }
    }

    const attempts = row.attempts + 1;
    if (anyDelivered) {
      db.prepare('UPDATE _notification_outbox SET status = ?, attempts = ?, last_error = ?, updated_at = ? WHERE outbox_id = ?')
        .run(OUTBOX.DELIVERED, attempts, null, now, row.outbox_id);
      summary.delivered += 1;
    } else if (attempts >= MAX_ATTEMPTS) {
      db.prepare('UPDATE _notification_outbox SET status = ?, attempts = ?, last_error = ?, updated_at = ? WHERE outbox_id = ?')
        .run(OUTBOX.FAILED, attempts, lastError, now, row.outbox_id);
      summary.failed += 1;
    } else {
      const next = new Date(new Date(now).getTime() + backoffMinutes(attempts) * 60_000).toISOString();
      db.prepare('UPDATE _notification_outbox SET attempts = ?, last_error = ?, next_attempt_at = ?, updated_at = ? WHERE outbox_id = ?')
        .run(attempts, lastError, next, now, row.outbox_id);
    }
  }

  return summary;
}

export function outboxFor(db, recordId) {
  return db.prepare('SELECT * FROM _notification_outbox WHERE record_id = ? ORDER BY created_at DESC').all(recordId);
}

export function attemptsFor(db, outboxId) {
  return db.prepare('SELECT * FROM _notification_attempt WHERE outbox_id = ? ORDER BY created_at').all(outboxId);
}
