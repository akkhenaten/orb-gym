/**
 * Reporting tests.
 *
 * These assert the pack's own fixture numbers. If the SQL drifts, the spec's
 * arithmetic catches it, which is what `actual_schema_queries_tested` was recording
 * as never done.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { openDb, insertRow } from '../src/db.mjs';
import { metricValue, formatMinor, runMetrics, implementedKeys } from '../src/reporting.mjs';
import { IMPLEMENTED_METRICS, METRICS, REPORT_VIEWS } from '../generated/reporting.mjs';

const now = '2026-11-09T12:00:00.000Z';
const minor = (s) => Math.round(Number(s) * 100);
const base = { workspace_id: 'ws-1', gym_id: 'gym-A', created_at: now, updated_at: now };

/** Load the pack's synthetic fixtures into the real generated tables. */
function loadFixtures(db) {
  const fx = {
    charges: [
      { id: 'C1', amount: '100.00' }, { id: 'C2', amount: '60.00' }, { id: 'C3', amount: '50.00' },
    ],
    credits: [{ id: 'CR1', charge: 'C1', amount: '20.00' }],
    payments: [
      { id: 'P1', amount: '100.00' }, { id: 'P2', amount: '60.00' },
      { id: 'P3', amount: '30.00' }, { id: 'P4', amount: '10.00' },
    ],
    refunds: [{ id: 'RF1', payment: 'P1', amount: '20.00' }],
    callbacks: ['P1', 'P1', 'P2', 'P3', 'P4'],
  };

  for (const c of fx.charges) {
    insertRow(db, 'customer_charge', { ...base, id: c.id, amount_minor: minor(c.amount) });
  }
  for (const c of fx.credits) {
    insertRow(db, 'credit_note', { ...base, id: c.id, amount_minor: minor(c.amount), charge_or_invoice_id: c.charge });
  }
  for (const p of fx.payments) {
    insertRow(db, 'payment_attempt', { ...base, id: `ATT-${p.id}`, attempt_state: 'CONFIRMED', provider_reference: p.id, status: 'CONFIRMED' });
    insertRow(db, 'payment_allocation', {
      ...base, id: `ALL-${p.id}`, movement_id: p.id,
      signed_amount_minor: minor(p.amount), charge_or_invoice_id: null,
    });
  }
  // duplicate provider callbacks: these must not create extra money
  for (const [i, ref] of fx.callbacks.entries()) {
    if (i === 0) continue; // the first attempt per payment is already inserted
    insertRow(db, 'payment_attempt', { ...base, id: `ATT-DUP-${i}`, attempt_state: 'CONFIRMED', provider_reference: ref, status: 'CONFIRMED' });
  }
  for (const r of fx.refunds) {
    insertRow(db, 'refund_request', { ...base, id: r.id, amount_minor: minor(r.amount), original_payment_id: r.payment, state: 'CONFIRMED', status: 'CONFIRMED' });
  }
}

const EXPECTED_WITH_STATE = {
  posted_charges: '210.00',
  posted_credits: '20.00',
  net_charge_activity: '190.00',
  confirmed_collections: '200.00',
  refunds: '20.00',
};

/** Simulate a schema without the derived state overlay, to prove the fail-closed path. */
function dropState(db, table) {
  // SQLite cannot drop a column referenced by a CHECK, so rebuild the table without it.
  const cols = db.prepare('SELECT name FROM pragma_table_info(?)').all(table)
    .map((c) => c.name).filter((c) => c !== 'status');
  db.exec(`DROP INDEX IF EXISTS ix_${table}_status`);
  db.exec(`ALTER TABLE ${table} RENAME TO _legacy_${table}`);
  db.exec(`CREATE TABLE ${table} AS SELECT ${cols.join(', ')} FROM _legacy_${table}`);
  db.exec(`DROP TABLE _legacy_${table}`);
}

test('every implemented metric names a real catalogue metric', () => {
  const ids = new Set(METRICS.map((m) => m.metric_id));
  for (const impl of IMPLEMENTED_METRICS) assert.ok(ids.has(impl.metric_id), `${impl.key} cites unknown ${impl.metric_id}`);
});

test('implemented money metrics reproduce the pack fixture arithmetic', () => {
  const db = openDb();
  loadFixtures(db);
  for (const [key, expected] of Object.entries(EXPECTED_WITH_STATE)) {
    const r = metricValue(db, key, { workspaceId: 'ws-1' });
    assert.equal(r.status, 'OK', `${key} did not run`);
    assert.equal(r.value, expected, `${key}: got ${r.value}, spec says ${expected}`);
    assert.ok(r.basis, `${key} returned no basis`);
  }
});

test('duplicate provider callbacks do not inflate collections', () => {
  const db = openDb();
  loadFixtures(db);
  // five callback deliveries for four payments: 200.00, never 300.00
  assert.equal(metricValue(db, 'confirmed_collections', { workspaceId: 'ws-1' }).value, '200.00');
  const attempts = db.prepare('SELECT count(*) c FROM payment_attempt WHERE attempt_state = ?').get('CONFIRMED').c;
  assert.equal(attempts, 8, '4 payments plus 4 duplicate callbacks must all be stored');
});

test('an unscoped computation still matches the fixture total', () => {
  const db = openDb();
  loadFixtures(db);
  assert.equal(metricValue(db, 'posted_charges').value, '210.00');
});

test('without a charge state column, charges are unavailable rather than assumed', () => {
  const db = openDb();
  loadFixtures(db);
  dropState(db, 'customer_charge');
  const charges = metricValue(db, 'posted_charges', { workspaceId: 'ws-1' });
  assert.equal(charges.status, 'UNAVAILABLE');
  assert.equal(charges.value_minor, null);
  assert.match(charges.reason, /no state column/);

  const net = metricValue(db, 'net_charge_activity', { workspaceId: 'ws-1' });
  assert.equal(net.status, 'UNAVAILABLE', 'a dependent metric must inherit the block');
  assert.match(net.reason, /blocked by posted_charges/);
});

test('unimplemented metrics report a reason instead of zero', () => {
  const db = openDb();
  loadFixtures(db);
  for (const key of ['reversals', 'outstanding_customer_balance', 'stock_value', 'profit']) {
    const r = metricValue(db, key, { workspaceId: 'ws-1' });
    assert.equal(r.status, 'UNAVAILABLE', `${key} must not claim a value`);
    assert.equal(r.value_minor, null, `${key} must not return zero`);
    assert.ok(r.reason && r.reason.length > 10, `${key} must explain why`);
  }
});

test('runMetrics separates computed from unavailable without hiding either', () => {
  const db = openDb();
  loadFixtures(db);
  const out = runMetrics(db, [...implementedKeys(), 'reversals'], { workspaceId: 'ws-1' });
  assert.equal(out.ok, 5);
  assert.equal(out.unavailable, 1);
  assert.equal(out.metrics.find((m) => m.key === 'reversals').value, null);
});

test('money formatting is exact and signed', () => {
  assert.equal(formatMinor(21000), '210.00');
  assert.equal(formatMinor(0), '0.00');
  assert.equal(formatMinor(-2050), '-20.50');
  assert.equal(formatMinor(null), null);
});

test('report views expose implemented coverage per view', () => {
  assert.equal(REPORT_VIEWS.length, 10);
  for (const v of REPORT_VIEWS) {
    assert.ok(v.metric_count > 0, `${v.report_id} has no metrics`);
    assert.ok(v.implemented_count <= v.metric_count);
  }
  assert.ok(REPORT_VIEWS.some((v) => v.implemented_count > 0), 'no view has any implemented metric');
});

test('a workspace filter cannot leak another workspace money', () => {
  const db = openDb();
  loadFixtures(db);
  insertRow(db, 'customer_charge', { ...base, id: 'C-other', workspace_id: 'ws-2', amount_minor: 500000 });
  assert.equal(metricValue(db, 'posted_charges', { workspaceId: 'ws-1' }).value, '210.00');
  assert.equal(metricValue(db, 'posted_charges', { workspaceId: 'ws-2' }).value, '5000.00');
});

test('VOID charges are excluded from posted charges', () => {
  const db = openDb();
  loadFixtures(db);
  insertRow(db, 'customer_charge', { ...base, id: 'C-void', amount_minor: 99900, status: 'VOID' });
  assert.equal(metricValue(db, 'posted_charges', { workspaceId: 'ws-1' }).value, '210.00');
  assert.equal(metricValue(db, 'net_charge_activity', { workspaceId: 'ws-1' }).value, '190.00');
});

test('DRAFT and VOID credit notes are excluded from posted credits', () => {
  const db = openDb();
  loadFixtures(db);
  insertRow(db, 'credit_note', { ...base, id: 'CR-draft', amount_minor: 5000, status: 'DRAFT' });
  insertRow(db, 'credit_note', { ...base, id: 'CR-void', amount_minor: 7000, status: 'VOID' });
  assert.equal(metricValue(db, 'posted_credits', { workspaceId: 'ws-1' }).value, '20.00');
});

test('the schema refuses a state outside the declared vocabulary', () => {
  const db = openDb();
  assert.throws(() => insertRow(db, 'customer_charge', { ...base, id: 'C-bad', amount_minor: 100, status: 'REFUNDED' }), /CHECK/);
  assert.throws(() => insertRow(db, 'credit_note', { ...base, id: 'CR-bad', amount_minor: 100, status: 'POSTED' }), /CHECK/);
});

test('new charges and credit notes default to their overlay initial state', () => {
  const db = openDb();
  insertRow(db, 'customer_charge', { ...base, id: 'C-new', amount_minor: 100 });
  insertRow(db, 'credit_note', { ...base, id: 'CR-new', amount_minor: 100 });
  assert.equal(db.prepare("SELECT status FROM customer_charge WHERE id='C-new'").get().status, 'POSTED');
  assert.equal(db.prepare("SELECT status FROM credit_note WHERE id='CR-new'").get().status, 'ISSUED');
});

test('without a credit state column, credits and net activity are unavailable', () => {
  const db = openDb();
  loadFixtures(db);
  dropState(db, 'credit_note');
  assert.equal(metricValue(db, 'posted_credits', { workspaceId: 'ws-1' }).status, 'UNAVAILABLE');
  assert.match(metricValue(db, 'net_charge_activity', { workspaceId: 'ws-1' }).reason, /blocked by posted_credits/);
});

test('each implemented metric is bound to the catalogue metric it computes', () => {
  const byId = new Map(METRICS.map((m) => [m.metric_id, m]));
  const refunds = IMPLEMENTED_METRICS.find((m) => m.key === 'refunds');
  assert.equal(refunds.metric_id, 'MET-FIN-05');
  assert.match(byId.get(refunds.metric_id).label, /refund/i);
});
