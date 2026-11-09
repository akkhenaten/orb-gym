/**
 * Integration surface.
 *
 * Two things a gym operator actually needs from an integration layer, and neither needs
 * a live provider to be correct:
 *
 * 1. Inbound provider events must be authenticated and idempotent. Signature is an
 *    HMAC-SHA256 over `${timestamp}.${rawBody}`, compared in constant time, inside a
 *    replay window. Without a configured secret the receiver refuses: an unsigned
 *    accepted callback is worse than a rejected one.
 * 2. A till sale must balance. Line totals and payment totals are compared in integer
 *    minor units before anything is allowed to become a collection.
 *
 * Live till collection is refused rather than simulated, because CAP-POS evaluation
 * requires an exercised service and no POS provider has been tested.
 */
import { createHmac, timingSafeEqual, createHash } from 'node:crypto';
import { evaluateCapability } from './capabilities.mjs';

const SIGNATURE_HEADER = 'x-orb-signature';
const TIMESTAMP_HEADER = 'x-orb-timestamp';
const DEFAULT_TOLERANCE_SECONDS = 300;

const header = (headers, name) => {
  const key = Object.keys(headers ?? {}).find((h) => h.toLowerCase() === name);
  return key ? String(headers[key]) : null;
};

export function signPayload(secret, timestamp, rawBody) {
  return createHmac('sha256', secret).update(`${timestamp}.${rawBody}`).digest('hex');
}

/** Verify an inbound provider event. Fails closed on every axis. */
export function verifyProviderEvent({ headers, rawBody, secret, nowMs = Date.now(), toleranceSeconds = DEFAULT_TOLERANCE_SECONDS }) {
  if (!secret) return { ok: false, reason: 'NO_SECRET_CONFIGURED', detail: 'an unverified callback is never accepted' };
  const signature = header(headers, SIGNATURE_HEADER);
  const timestamp = header(headers, TIMESTAMP_HEADER);
  if (!signature) return { ok: false, reason: 'UNSIGNED' };
  if (!timestamp || !/^\d+$/.test(timestamp)) return { ok: false, reason: 'INVALID_TIMESTAMP' };

  const skewMs = Math.abs(nowMs - Number(timestamp) * 1000);
  if (skewMs > toleranceSeconds * 1000) {
    return { ok: false, reason: 'STALE_TIMESTAMP', detail: `skew ${Math.round(skewMs / 1000)}s exceeds ${toleranceSeconds}s` };
  }

  const expected = signPayload(secret, timestamp, rawBody ?? '');
  const a = Buffer.from(signature, 'hex');
  const b = Buffer.from(expected, 'hex');
  if (a.length !== b.length || !timingSafeEqual(a, b)) return { ok: false, reason: 'SIGNATURE_MISMATCH' };
  return { ok: true, payload_sha256: createHash('sha256').update(rawBody ?? '').digest('hex') };
}

const ensureProviderEventTable = (db) => db.exec(`
  CREATE TABLE IF NOT EXISTS _provider_event (
    event_id TEXT PRIMARY KEY,
    provider TEXT NOT NULL,
    payload_sha256 TEXT NOT NULL,
    received_at TEXT NOT NULL,
    outcome TEXT NOT NULL
  );`);

/**
 * Ingest a verified provider event exactly once. A repeated delivery is reported as a
 * duplicate and mutates nothing, which is the difference between a retry and a double
 * payment.
 */
export function ingestProviderEvent(db, { eventId, provider, headers, rawBody, secret, nowMs = Date.now() }) {
  if (!eventId) return { ok: false, reason: 'MISSING_EVENT_ID' };
  if (!provider) return { ok: false, reason: 'MISSING_PROVIDER' };
  const verified = verifyProviderEvent({ headers, rawBody, secret, nowMs });
  if (!verified.ok) return { ok: false, reason: verified.reason, detail: verified.detail ?? null };

  ensureProviderEventTable(db);
  const receivedAt = new Date(nowMs).toISOString();
  const result = db.prepare(
    'INSERT OR IGNORE INTO _provider_event (event_id, provider, payload_sha256, received_at, outcome) VALUES (?, ?, ?, ?, ?)',
  ).run(eventId, provider, verified.payload_sha256, receivedAt, 'ACCEPTED');

  if (result.changes === 0) {
    const prior = db.prepare('SELECT received_at, payload_sha256 FROM _provider_event WHERE event_id = ?').get(eventId);
    return {
      ok: true,
      duplicate: true,
      event_id: eventId,
      first_received_at: prior?.received_at ?? null,
      same_payload: prior?.payload_sha256 === verified.payload_sha256,
    };
  }
  return { ok: true, duplicate: false, event_id: eventId, payload_sha256: verified.payload_sha256 };
}

const isMinor = (n) => Number.isInteger(n) && n >= 0;

/**
 * A till sale must balance before it can become a collection.
 *
 * `amount_minor` on a line is the line total, not a unit price, and `quantity` is
 * informational. Multiplication is never implicit: a hidden quantity multiplier is how a
 * payable total drifts from what the customer saw.
 */
export function validateTillSale({ lines = [], payments = [], currency } = {}) {
  const errors = [];
  if (!currency) errors.push('currency is required; amounts are integer minor units of a declared currency');
  if (!lines.length) errors.push('a sale needs at least one line');
  if (!payments.length) errors.push('a sale needs at least one payment');

  let lineTotal = 0;
  for (const [i, l] of lines.entries()) {
    if (!isMinor(l.amount_minor)) errors.push(`line ${i}: amount_minor must be a non-negative integer`);
    else lineTotal += l.amount_minor;
    if (!l.description) errors.push(`line ${i}: description is required`);
    if (!Number.isInteger(l.quantity ?? 1) || (l.quantity ?? 1) < 1) errors.push(`line ${i}: quantity must be a positive integer`);
  }

  let paidTotal = 0;
  for (const [i, p] of payments.entries()) {
    if (!isMinor(p.amount_minor)) errors.push(`payment ${i}: amount_minor must be a non-negative integer`);
    else paidTotal += p.amount_minor;
    if (!p.method) errors.push(`payment ${i}: method is required`);
    if (p.currency && currency && p.currency !== currency) errors.push(`payment ${i}: currency ${p.currency} differs from sale currency ${currency}`);
  }

  if (!errors.length && lineTotal !== paidTotal) {
    errors.push(`sale does not balance: lines ${lineTotal}, payments ${paidTotal} (minor units)`);
  }
  return { ok: errors.length === 0, errors, line_total_minor: lineTotal, paid_total_minor: paidTotal, currency: currency ?? null };
}

/**
 * Record a till sale. Refused while CAP-POS is not enabled, and refused again even when
 * it is, because no live till provider has been exercised in this build.
 */
export function recordTillSale({ sale, capabilityFacts = {} } = {}) {
  const validation = validateTillSale(sale);
  const cap = evaluateCapability('CAP-POS', capabilityFacts);
  const reasons = [];

  if (cap.state !== 'enabled') {
    reasons.push({
      code: 'CAPABILITY_BLOCKED',
      detail: `CAP-POS is ${cap.state}`,
      unmet: cap.unmet ?? [],
      required: (capabilityFacts.requirements ?? []).map((r) => r.key),
    });
  }
  if (!validation.ok) reasons.push({ code: 'SALE_DOES_NOT_BALANCE', detail: validation.errors });
  if (reasons.length === 0) {
    reasons.push({
      code: 'LIVE_TILL_PROVIDER_UNTESTED',
      detail: 'CAP-POS requires an exercised till service; no POS provider or receipt device has been tested in this build',
    });
  }

  return { ok: false, outcome: 'TILL_SALE_REFUSED', capability_state: cap.state, sale_total_minor: validation.line_total_minor, reasons };
}
