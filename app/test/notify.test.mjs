/**
 * Notification outbox and delivery tests.
 *
 * These assert the failure modes that matter: no duplicate delivery on retry, no
 * silent drop on exhaustion, no fake success when a channel is missing, no
 * delivery describing a command that rolled back.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { openDb, insertRow, getRow, columns } from '../src/db.mjs';
import { executeCommand, findTransition, OUTCOMES } from '../src/engine.mjs';
import {
  enqueue, dispatch, eventById, attemptsFor, outboxFor, inQuietHours,
  backoffMinutes, MAX_ATTEMPTS, OUTBOX,
} from '../src/notify.mjs';
import { EVENTS } from '../generated/notifications.mjs';

const now = '2026-11-09T09:00:00.000Z';
const actor = (grants) => ({
  id: 'actor-1', kind: 'user', grants, denied: [], workspace_id: 'ws-1', gym_id: 'gym-1',
});

function seedRecord(db, table, state) {
  insertRow(db, table, {
    id: 'rec-1', status: state, version: 1,
    created_at: now, updated_at: now, workspace_id: 'ws-1', gym_id: 'gym-1',
  });
}

const inboxAdapter = (db, seen = []) => ({
  in_app: ({ outbox_id, event_id, payload }) => {
    seen.push(event_id);
    insertRow(db, '_notification_inbox', {
      inbox_id: `inbox-${seen.length}`, recipient_id: payload.recipient_id ?? 'r-1',
      event_id, outbox_id, title: payload.event_name ?? event_id,
      body_json: JSON.stringify(payload), read_at: null, created_at: now,
    });
  },
});

test('all 91 notification events compiled with a dedup key', () => {
  assert.equal(EVENTS.length, 91);
  for (const e of EVENTS) {
    assert.ok(e.deduplication_key, `${e.event_id} has no dedup key`);
    assert.ok(e.event_id.startsWith('NOT-'));
  }
});

test('unknown event is refused, not silently dropped', () => {
  const db = openDb();
  assert.throws(() => enqueue(db, { eventId: 'NOT-999', dedupKey: 'k' }), /unknown notification event/);
});

test('enqueue without a dedup key is refused', () => {
  const db = openDb();
  assert.throws(() => enqueue(db, { eventId: 'NOT-001' }), /deduplication key/);
});

test('the same dedup key enqueues once', () => {
  const db = openDb();
  const a = enqueue(db, { eventId: 'NOT-001', dedupKey: 'same', at: now });
  const b = enqueue(db, { eventId: 'NOT-001', dedupKey: 'same', at: now });
  assert.equal(a.deduplicated, false);
  assert.equal(b.deduplicated, true);
  assert.equal(a.outbox_id, b.outbox_id);
  // outboxFor() filters on record_id, and `record_id = NULL` never matches in SQL,
  // so count directly rather than asserting through a filter that cannot see NULLs.
  assert.equal(db.prepare('SELECT count(*) c FROM _notification_outbox').get().c, 1);
});

test('supersede retires the older pending row', () => {
  const db = openDb();
  const first = enqueue(db, { eventId: 'NOT-001', dedupKey: 'd1', supersedeKey: 'inv-1', at: now });
  const second = enqueue(db, { eventId: 'NOT-001', dedupKey: 'd2', supersedeKey: 'inv-1', at: now });
  const rows = db.prepare('SELECT outbox_id, status FROM _notification_outbox ORDER BY created_at').all();
  assert.equal(rows.length, 2);
  assert.equal(rows.find((r) => r.outbox_id === first.outbox_id).status, OUTBOX.SUPERSEDED);
  assert.equal(rows.find((r) => r.outbox_id === second.outbox_id).status, OUTBOX.PENDING);
});

test('in-app delivery writes a real inbox row and marks DELIVERED', async () => {
  const db = openDb();
  const seen = [];
  enqueue(db, { eventId: 'NOT-001', dedupKey: 'deliver-1', recipientId: 'r-1', payload: { recipient_id: 'r-1' }, at: now });

  const summary = await dispatch({ db, adapters: inboxAdapter(db, seen), now });
  assert.equal(summary.delivered, 1);
  const row = db.prepare('SELECT * FROM _notification_outbox').get();
  assert.equal(row.status, OUTBOX.DELIVERED);
  assert.equal(row.attempts, 1);
  assert.equal(db.prepare('SELECT count(*) c FROM _notification_inbox').get().c, 1);
});

test('a channel with no adapter fails loudly and retries with backoff', async () => {
  const db = openDb();
  // NOT-001 declares an in_app plus external channels; give an adapter only for a
  // channel that is not configured to prove the missing-adapter path.
  enqueue(db, { eventId: 'NOT-001', dedupKey: 'noadapter', recipientId: 'r-1', payload: {}, at: now });
  const summary = await dispatch({ db, adapters: {}, now });

  assert.equal(summary.delivered, 0);
  const row = db.prepare('SELECT * FROM _notification_outbox').get();
  assert.equal(row.status, OUTBOX.PENDING, 'must stay pending while attempts remain');
  assert.equal(row.attempts, 1);
  assert.ok(row.next_attempt_at > now, 'next attempt must be scheduled forward');
  const attempts = attemptsFor(db, row.outbox_id);
  assert.ok(attempts.every((a) => a.outcome === 'SKIPPED_NO_CONSENT' || a.outcome === 'FAILED'));
  assert.ok(attempts.some((a) => a.outcome === 'FAILED'), 'a missing adapter must record a failure');
});

test('attempts are bounded and end in FAILED, never an endless retry', async () => {
  const db = openDb();
  enqueue(db, { eventId: 'NOT-001', dedupKey: 'exhaust', recipientId: 'r-1', payload: {}, at: now });
  let clock = new Date(now).getTime();
  for (let i = 0; i < MAX_ATTEMPTS + 2; i += 1) {
    await dispatch({ db, adapters: {}, now: new Date(clock).toISOString() });
    clock += 30 * 24 * 60 * 60 * 1000; // jump a month so the row is always due
  }
  const row = db.prepare('SELECT * FROM _notification_outbox').get();
  assert.equal(row.status, OUTBOX.FAILED);
  assert.equal(row.attempts, MAX_ATTEMPTS);
  assert.ok(row.last_error);
});

test('backoff increases monotonically', () => {
  const seq = [1, 2, 3, 4].map(backoffMinutes);
  for (let i = 1; i < seq.length; i += 1) assert.ok(seq[i] > seq[i - 1]);
});

test('quiet hours defer the whole dispatch without discarding', async () => {
  const db = openDb();
  enqueue(db, { eventId: 'NOT-001', dedupKey: 'quiet', recipientId: 'r-1', payload: { recipient_id: 'r-1' }, at: '2026-11-09T03:00:00.000Z' });
  const summary = await dispatch({
    db, adapters: inboxAdapter(db, []), now: '2026-11-09T03:00:00.000Z',
    quietHours: { startHour: 2, endHour: 4 },
  });
  assert.equal(summary.deferred_quiet_hours, true);
  assert.equal(summary.processed, 0);
  assert.equal(db.prepare('SELECT status FROM _notification_outbox').get().status, OUTBOX.PENDING);
});

test('quiet window wraps past midnight correctly', () => {
  const w = { startHour: 22, endHour: 6 };
  assert.equal(inQuietHours('2026-11-09T23:00:00Z', w), true);
  assert.equal(inQuietHours('2026-11-09T05:00:00Z', w), true);
  assert.equal(inQuietHours('2026-11-09T12:00:00Z', w), false);
  assert.equal(inQuietHours('2026-11-09T12:00:00Z', { startHour: 6, endHour: 6 }), false);
});

test('a command can enqueue notifications in its own transaction', () => {
  const db = openDb();
  const tr = findTransition('CompleteWorkspaceSetup');
  seedRecord(db, tr.entity_table, tr.from_state);

  const out = executeCommand({
    db, command: tr.command, recordId: 'rec-1', actor: actor([...tr.requires]),
    operationId: 'op-notify', notifications: [
      { event_id: 'NOT-001', dedup_key: 'cmd-1', recipient_id: 'r-1', payload: { recipient_id: 'r-1' } },
    ],
  });

  assert.equal(out.outcome, OUTCOMES.ACCEPTED);
  assert.equal(out.notifications.length, 1);
  assert.equal(out.notifications[0].deduplicated, false);
  const row = db.prepare('SELECT * FROM _notification_outbox').get();
  assert.equal(row.record_id, 'rec-1');
  assert.equal(row.entity_table, tr.entity_table);
  assert.match(row.payload_json, /op-notify/, 'notification must carry the operation identity');
});

test('a bad notification rolls the state change back with it', () => {
  const db = openDb();
  const tr = findTransition('CompleteWorkspaceSetup');
  seedRecord(db, tr.entity_table, tr.from_state);

  assert.throws(() => executeCommand({
    db, command: tr.command, recordId: 'rec-1', actor: actor([...tr.requires]),
    operationId: 'op-bad', notifications: [{ event_id: 'NOT-NOPE', dedup_key: 'x' }],
  }));

  const row = getRow(db, tr.entity_table, 'rec-1');
  assert.equal(row.status, tr.from_state, 'state must not advance when the notification fails');
  assert.equal(row.version, 1);
  assert.equal(db.prepare('SELECT count(*) c FROM _notification_outbox').get().c, 0);
  assert.equal(db.prepare('SELECT count(*) c FROM _audit_event').get().c, 0);
});

test('notification tables exist in the generated schema', () => {
  const db = openDb();
  for (const t of ['_notification_outbox', '_notification_attempt', '_notification_preference', '_notification_inbox']) {
    assert.ok(columns(db, t).length > 0, `${t} missing`);
  }
});

test('every event referenced by a test is a real event', () => {
  for (const id of ['NOT-001']) assert.ok(eventById(id), `${id} not in catalogue`);
});

test('regression: prose channel declarations never become per-character channels', async () => {
  const db = openDb();
  const event = eventById('NOT-001');
  assert.ok(Array.isArray(event.external_channels), 'external_channels must be an array after compile');
  assert.equal(event.external_channels.length, 0, 'prose must not survive as a channel list');
  assert.ok(event.external_channels_note, 'the prose must be preserved as a note, not discarded');

  const seen = [];
  enqueue(db, { eventId: 'NOT-001', dedupKey: 'char-bug', recipientId: 'r-1', payload: { recipient_id: 'r-1' }, at: now });
  await dispatch({ db, adapters: inboxAdapter(db, seen), now });

  const attempts = attemptsFor(db, db.prepare('SELECT outbox_id FROM _notification_outbox').get().outbox_id);
  assert.equal(attempts.length, 1, `expected exactly one attempt, got ${attempts.length}`);
  assert.equal(attempts[0].channel, 'in_app');
});

test('every compiled event preserves its declared channel prose', () => {
  for (const e of EVENTS) {
    assert.ok(Array.isArray(e.external_channels));
    if (!e.external_channels.length) assert.ok(e.external_channels_note, `${e.event_id} lost its channel prose`);
  }
});
