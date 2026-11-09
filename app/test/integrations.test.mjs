/**
 * Integration tests: authenticated, idempotent inbound events and a till sale that
 * balances. No provider is simulated; the refusal paths are the contract.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { openDb } from '../src/db.mjs';
import {
  signPayload, verifyProviderEvent, ingestProviderEvent, validateTillSale, recordTillSale,
} from '../src/integrations.mjs';

const SECRET = 'test-secret-not-a-real-credential';
const NOW = Date.parse('2026-11-09T12:00:00Z');
const TS = String(Math.floor(NOW / 1000));
const BODY = JSON.stringify({ id: 'evt_1', type: 'payment.confirmed' });
const signed = (body = BODY, ts = TS, secret = SECRET) => ({
  'x-orb-signature': signPayload(secret, ts, body),
  'x-orb-timestamp': ts,
});

test('a correctly signed event verifies and records a payload hash', () => {
  const r = verifyProviderEvent({ headers: signed(), rawBody: BODY, secret: SECRET, nowMs: NOW });
  assert.equal(r.ok, true);
  assert.match(r.payload_sha256, /^[0-9a-f]{64}$/);
});

test('every verification axis fails closed', () => {
  const cases = [
    [{ headers: {}, rawBody: BODY, secret: SECRET, nowMs: NOW }, 'UNSIGNED'],
    [{ headers: signed(), rawBody: BODY, secret: '', nowMs: NOW }, 'NO_SECRET_CONFIGURED'],
    [{ headers: signed(), rawBody: BODY, secret: 'other-secret', nowMs: NOW }, 'SIGNATURE_MISMATCH'],
    [{ headers: signed(), rawBody: `${BODY} `, secret: SECRET, nowMs: NOW }, 'SIGNATURE_MISMATCH'],
    [{ headers: { ...signed(), 'x-orb-timestamp': 'abc' }, rawBody: BODY, secret: SECRET, nowMs: NOW }, 'INVALID_TIMESTAMP'],
    [{ headers: signed(BODY, '1000000000'), rawBody: BODY, secret: SECRET, nowMs: NOW }, 'STALE_TIMESTAMP'],
  ];
  for (const [input, reason] of cases) {
    const r = verifyProviderEvent(input);
    assert.equal(r.ok, false, `expected refusal for ${reason}`);
    assert.equal(r.reason, reason);
  }
});

test('a replayed delivery is idempotent and mutates nothing', () => {
  const db = openDb();
  const first = ingestProviderEvent(db, { eventId: 'evt_1', provider: 'provider-a', headers: signed(), rawBody: BODY, secret: SECRET, nowMs: NOW });
  assert.deepEqual([first.ok, first.duplicate], [true, false]);

  const second = ingestProviderEvent(db, { eventId: 'evt_1', provider: 'provider-a', headers: signed(), rawBody: BODY, secret: SECRET, nowMs: NOW });
  assert.deepEqual([second.ok, second.duplicate], [true, true]);
  assert.equal(second.same_payload, true);
  assert.equal(db.prepare('SELECT count(*) c FROM _provider_event').get().c, 1);
});

test('an unsigned event is not stored at all', () => {
  const db = openDb();
  const r = ingestProviderEvent(db, { eventId: 'evt_2', provider: 'provider-a', headers: {}, rawBody: BODY, secret: SECRET, nowMs: NOW });
  assert.equal(r.ok, false);
  assert.equal(r.reason, 'UNSIGNED');
  assert.equal(db.prepare("SELECT count(*) c FROM sqlite_master WHERE name='_provider_event'").get().c, 0);
});

test('a reused event id with different content is flagged as not the same payload', () => {
  const db = openDb();
  ingestProviderEvent(db, { eventId: 'evt_3', provider: 'p', headers: signed(), rawBody: BODY, secret: SECRET, nowMs: NOW });
  const altered = JSON.stringify({ id: 'evt_3', type: 'payment.refunded' });
  const again = ingestProviderEvent(db, { eventId: 'evt_3', provider: 'p', headers: signed(altered), rawBody: altered, secret: SECRET, nowMs: NOW });
  assert.equal(again.duplicate, true);
  assert.equal(again.same_payload, false);
});

test('a balanced sale validates in integer minor units', () => {
  const r = validateTillSale({
    currency: 'GBP',
    lines: [{ description: 'Day pass', quantity: 2, amount_minor: 2400 }, { description: 'Towel', quantity: 1, amount_minor: 300 }],
    payments: [{ method: 'cash', amount_minor: 2700 }],
  });
  assert.equal(r.ok, true);
  assert.equal(r.line_total_minor, 2700);
  assert.equal(r.paid_total_minor, 2700);
});

test('a line total is never multiplied by quantity implicitly', () => {
  // quantity 2 with a 2400 line total means 2400 is owed, not 4800.
  const r = validateTillSale({
    currency: 'GBP',
    lines: [{ description: 'Pass', quantity: 2, amount_minor: 2400 }],
    payments: [{ method: 'cash', amount_minor: 2400 }],
  });
  assert.equal(r.ok, true);
  assert.equal(r.line_total_minor, 2400);
});

test('unbalanced, negative and non-integer sales are refused', () => {
  const base = { currency: 'GBP', lines: [{ description: 'Pass', amount_minor: 1000 }] };
  assert.match(validateTillSale({ ...base, payments: [{ method: 'cash', amount_minor: 900 }] }).errors[0], /does not balance/);
  assert.ok(validateTillSale({ ...base, payments: [{ method: 'cash', amount_minor: -1000 }] }).errors.length);
  assert.ok(validateTillSale({ ...base, payments: [{ method: 'cash', amount_minor: 10.5 }] }).errors.length);
  assert.ok(validateTillSale({ ...base, payments: [{ method: 'cash', amount_minor: 1000, currency: 'EUR' }] }).errors.length);
  assert.ok(validateTillSale({ currency: 'GBP', lines: [], payments: [] }).errors.length);
});

test('a till sale is refused while CAP-POS is disabled and again with no provider', () => {
  const sale = { currency: 'GBP', lines: [{ description: 'Pass', amount_minor: 1000 }], payments: [{ method: 'cash', amount_minor: 1000 }] };

  const disabled = recordTillSale({ sale, capabilityFacts: {} });
  assert.equal(disabled.ok, false);
  assert.equal(disabled.reasons[0].code, 'CAPABILITY_BLOCKED');
  assert.equal(disabled.capability_state, 'disabled_optional');

  const enabled = recordTillSale({
    sale,
    capabilityFacts: { enabled: true, requirements: [{ key: 'till_provider', satisfied: true }], service_tested: true },
  });
  assert.equal(enabled.ok, false);
  assert.equal(enabled.capability_state, 'enabled');
  assert.equal(enabled.reasons[0].code, 'LIVE_TILL_PROVIDER_UNTESTED');
});

test('balances and capability are checked independently', () => {
  const r = recordTillSale({
    sale: { currency: 'GBP', lines: [{ description: 'Pass', amount_minor: 1000 }], payments: [{ method: 'cash', amount_minor: 500 }] },
    capabilityFacts: {},
  });
  const codes = r.reasons.map((x) => x.code);
  assert.ok(codes.includes('CAPABILITY_BLOCKED'));
  assert.ok(codes.includes('SALE_DOES_NOT_BALANCE'));
});
