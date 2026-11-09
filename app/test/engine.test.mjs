/**
 * Acceptance tests for the engine and the compiled contract.
 * Run: node --test
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { openDb, tables, columns, insertRow, getRow, GENERATED } from '../src/db.mjs';
import { executeCommand, authorize, auditTrail, OUTCOMES, CommandError, findTransition } from '../src/engine.mjs';
import { TRANSITIONS } from '../generated/transitions.mjs';
import { PERMISSION_IDS } from '../generated/permissions.mjs';
import { ENUMS } from '../generated/enums.mjs';

const report = JSON.parse(readFileSync(join(GENERATED, 'compile-report.json'), 'utf8'));
const PERMISSIONS = new Set(PERMISSION_IDS);
const now = () => new Date().toISOString();

function seed(db, { table, id = 'rec-1', state, workspaceId = 'ws-1', gymId = 'gym-1' }) {
  insertRow(db, table, {
    id, status: state, version: 1, created_at: now(), updated_at: now(),
    workspace_id: workspaceId, gym_id: gymId,
  });
  return id;
}

const owner = (extra = {}) => ({
  id: 'actor-owner', kind: 'user', grants: [], denied: [],
  workspace_id: 'ws-1', gym_id: 'gym-1', ...extra,
});

test('compiler reported no contract errors', () => {
  assert.deepEqual(report.errors, []);
  assert.equal(report.counts.transitions, 233);
  assert.equal(report.counts.entities, 78);
  assert.equal(report.counts.orphan_entities, 11);
});

test('schema covers every entity and every transition lands on a real table', () => {
  const db = openDb();
  const t = tables(db);
  assert.equal(t.filter((n) => !n.startsWith('_')).length, 78);
  for (const tr of TRANSITIONS) {
    assert.ok(t.includes(tr.entity_table), `missing table for ${tr.transition_id}`);
    const cols = columns(db, tr.entity_table).map((c) => c.name);
    assert.ok(cols.includes('status'), `${tr.entity_table} has no status column`);
    assert.ok(cols.includes('version'), `${tr.entity_table} has no version column`);
  }
});

test('every required permission is a real permission', () => {
  for (const tr of TRANSITIONS) {
    for (const p of tr.requires) assert.ok(PERMISSIONS.has(p), `${tr.transition_id} needs unknown ${p}`);
  }
});

test('every transition state belongs to its machine', () => {
  const byMachine = new Map(ENUMS.map((m) => [m.machine_id, new Set(m.states)]));
  for (const tr of TRANSITIONS) {
    const states = byMachine.get(tr.machine_id);
    assert.ok(states, `unknown machine ${tr.machine_id}`);
    assert.ok(states.has(tr.from_state), `${tr.transition_id} from_state ${tr.from_state}`);
    assert.ok(states.has(tr.to_state), `${tr.transition_id} to_state ${tr.to_state}`);
  }
});

test('accepted command changes state, bumps version and writes audit', () => {
  const db = openDb();
  const tr = findTransition('CompleteWorkspaceSetup');
  seed(db, { table: tr.entity_table, state: tr.from_state });

  const actor = owner({ grants: [...tr.requires] });
  const out = executeCommand({
    db, command: tr.command, recordId: 'rec-1', actor,
    expectedVersion: 1, operationId: 'op-happy',
  });

  assert.equal(out.outcome, OUTCOMES.ACCEPTED);
  assert.equal(out.to_state, tr.to_state);
  assert.equal(out.version, 2);

  const row = getRow(db, tr.entity_table, 'rec-1');
  assert.equal(row.status, tr.to_state);
  assert.equal(row.version, 2);

  const trail = auditTrail(db, tr.entity_table, 'rec-1');
  assert.equal(trail.length, 1);
  assert.equal(trail[0].transition_id, tr.transition_id);
  assert.equal(trail[0].actor_id, 'actor-owner');
});

test('missing grant is denied and nothing changes', () => {
  const db = openDb();
  const tr = findTransition('CompleteWorkspaceSetup');
  seed(db, { table: tr.entity_table, state: tr.from_state });

  assert.throws(
    () => executeCommand({ db, command: tr.command, recordId: 'rec-1', actor: owner() }),
    (err) => err instanceof CommandError && err.outcome === OUTCOMES.DENIED,
  );
  const row = getRow(db, tr.entity_table, 'rec-1');
  assert.equal(row.status, tr.from_state);
  assert.equal(row.version, 1);
  assert.equal(auditTrail(db, tr.entity_table, 'rec-1').length, 0);
});

test('individual deny beats a held grant', () => {
  const db = openDb();
  const tr = findTransition('CompleteWorkspaceSetup');
  seed(db, { table: tr.entity_table, state: tr.from_state });
  const actor = owner({ grants: [...tr.requires], denied: [tr.requires[0]] });

  assert.throws(
    () => executeCommand({ db, command: tr.command, recordId: 'rec-1', actor }),
    (err) => err.outcome === OUTCOMES.DENIED && /individual deny/.test(err.message),
  );
});

test('wrong current state is refused without side effects', () => {
  const db = openDb();
  const tr = findTransition('CompleteWorkspaceSetup');
  // a real state of the machine that is not this command's from_state
  const wrong = tr.from_state === 'ARCHIVED' ? 'SUSPENDED' : 'ARCHIVED';
  seed(db, { table: tr.entity_table, state: wrong });

  assert.throws(
    () => executeCommand({ db, command: tr.command, recordId: 'rec-1', actor: owner({ grants: [...tr.requires] }) }),
    (err) => err.outcome === OUTCOMES.INVALID_STATE,
  );
  assert.equal(getRow(db, tr.entity_table, 'rec-1').version, 1);
  assert.equal(getRow(db, tr.entity_table, 'rec-1').status, wrong);
});

test('storage refuses a state outside the machine vocabulary', () => {
  const db = openDb();
  const tr = findTransition('CompleteWorkspaceSetup');
  assert.throws(() => seed(db, { table: tr.entity_table, state: 'NOT_A_REAL_STATE' }), /CHECK constraint failed/);
});

test('stale expected version conflicts', () => {
  const db = openDb();
  const tr = findTransition('CompleteWorkspaceSetup');
  seed(db, { table: tr.entity_table, state: tr.from_state });

  assert.throws(
    () => executeCommand({
      db, command: tr.command, recordId: 'rec-1',
      actor: owner({ grants: [...tr.requires] }), expectedVersion: 99,
    }),
    (err) => err.outcome === OUTCOMES.CONFLICT && err.details.current_version === 1,
  );
});

test('repeated operation identity replays instead of double-applying', () => {
  const db = openDb();
  const tr = findTransition('CompleteWorkspaceSetup');
  seed(db, { table: tr.entity_table, state: tr.from_state });

  const args = {
    db, command: tr.command, recordId: 'rec-1',
    actor: owner({ grants: [...tr.requires] }), operationId: 'op-same',
  };
  const first = executeCommand(args);
  const second = executeCommand(args);

  assert.equal(first.outcome, OUTCOMES.ACCEPTED);
  assert.equal(second.outcome, OUTCOMES.REPLAYED);
  assert.equal(second.version, first.version);
  assert.equal(getRow(db, tr.entity_table, 'rec-1').version, 2);
  assert.equal(auditTrail(db, tr.entity_table, 'rec-1').length, 1);
});

test('a row in another workspace is unreachable', () => {
  const db = openDb();
  const tr = findTransition('CompleteWorkspaceSetup');
  seed(db, { table: tr.entity_table, state: tr.from_state, workspaceId: 'ws-other' });

  assert.throws(
    () => executeCommand({ db, command: tr.command, recordId: 'rec-1', actor: owner({ grants: [...tr.requires] }) }),
    (err) => err.outcome === OUTCOMES.DENIED && /another workspace/.test(err.message),
  );
});

test('verified_source_actor rejects a human actor even with the grant', () => {
  const db = openDb();
  const tr = TRANSITIONS.find((t) => t.mode === 'verified_source_actor');
  assert.ok(tr, 'spec has no verified_source_actor transition to test');
  seed(db, { table: tr.entity_table, state: tr.from_state });

  const human = owner({ grants: [...tr.requires] });
  assert.throws(
    () => executeCommand({ db, command: tr.command, recordId: 'rec-1', actor: human }),
    (err) => err.outcome === OUTCOMES.DENIED,
  );

  const source = owner({ id: 'provider', kind: 'verified_source', grants: [...tr.requires], proof: { verified: true } });
  const out = executeCommand({ db, command: tr.command, recordId: 'rec-1', actor: source });
  assert.equal(out.outcome, OUTCOMES.ACCEPTED);
});

test('context_routes requires the declared route', () => {
  const tr = TRANSITIONS.find((t) => t.mode === 'context_routes');
  assert.ok(tr, 'spec has no context_routes transition to test');
  const withoutRoute = authorize(owner({ grants: [...tr.requires] }), tr);
  assert.equal(withoutRoute.allowed, false);
  const withRoute = authorize(owner({ grants: [...tr.requires], routes: [tr.source_id ?? tr.workflow_domain] }), tr);
  assert.equal(withRoute.allowed, true);
});

test('unknown command is rejected, never guessed', () => {
  const db = openDb();
  assert.throws(
    () => executeCommand({ db, command: 'DeleteEverything', recordId: 'x', actor: owner() }),
    (err) => err.outcome === OUTCOMES.UNKNOWN_COMMAND,
  );
});

test('audit event survives a rejected follow-up (no rollback of prior success)', () => {
  const db = openDb();
  const tr = findTransition('CompleteWorkspaceSetup');
  seed(db, { table: tr.entity_table, state: tr.from_state });
  const actor = owner({ grants: [...tr.requires] });

  executeCommand({ db, command: tr.command, recordId: 'rec-1', actor, operationId: 'op-a' });
  assert.throws(
    () => executeCommand({ db, command: tr.command, recordId: 'rec-1', actor, operationId: 'op-b' }),
    (err) => err.outcome === OUTCOMES.INVALID_STATE,
  );
  assert.equal(auditTrail(db, tr.entity_table, 'rec-1').length, 1);
});

// ---------------------------------------------------------------- derived void transitions
const finance = (extra = {}) => owner({ grants: ['finance.reconcile'], ...extra });
const seedFin = (db, table, id, status, extra = {}) => {
  const now = new Date().toISOString();
  db.prepare(`INSERT INTO ${table} (id, version, status, created_at, updated_at, workspace_id) VALUES (?, 1, ?, ?, ?, ?)`)
    .run(id, status, now, now, 'ws-1');
  for (const [k, v] of Object.entries(extra)) db.prepare(`UPDATE ${table} SET ${k} = ? WHERE id = ?`).run(v, id);
};

test('derived transitions compile separately from the 233 source transitions', () => {
  assert.equal(report.counts.transitions, 233);
  assert.equal(report.counts.derived_transitions, 2);
  const derived = TRANSITIONS.filter((t) => t.source === 'derived').map((t) => t.command).sort();
  assert.deepEqual(derived, ['VoidCreditNote', 'VoidCustomerCharge']);
});

test('an unreferenced charge can be voided, with its reason audited', () => {
  const db = openDb();
  seedFin(db, 'customer_charge', 'ch-1', 'POSTED');
  const r = executeCommand({ db, command: 'VoidCustomerCharge', recordId: 'ch-1', actor: finance(), payload: { void_reason: 'raised in error' } });
  assert.equal(r.to_state ?? getRow(db, 'customer_charge', 'ch-1').status, 'VOID');
  assert.equal(getRow(db, 'customer_charge', 'ch-1').status, 'VOID');
  const audit = db.prepare("SELECT detail FROM _audit_event WHERE record_id = 'ch-1'").get();
  assert.equal(JSON.parse(audit.detail).reason, 'raised in error');
  assert.equal(JSON.parse(audit.detail).source, 'derived');
});

test('void refuses without a reason and leaves the charge untouched', () => {
  const db = openDb();
  seedFin(db, 'customer_charge', 'ch-2', 'POSTED');
  assert.throws(() => executeCommand({ db, command: 'VoidCustomerCharge', recordId: 'ch-2', actor: finance() }),
    (e) => e.outcome === 'REASON_REQUIRED' || e.code === 'REASON_REQUIRED' || /REASON_REQUIRED/.test(e.message));
  assert.equal(getRow(db, 'customer_charge', 'ch-2').status, 'POSTED');
});

test('an allocated charge cannot be voided and must be credited instead', () => {
  const db = openDb();
  seedFin(db, 'customer_charge', 'ch-3', 'POSTED');
  const now = new Date().toISOString();
  db.prepare('INSERT INTO payment_allocation (id, version, created_at, updated_at, workspace_id, charge_or_invoice_id) VALUES (?,1,?,?,?,?)')
    .run('al-1', now, now, 'ws-1', 'ch-3');
  assert.throws(() => executeCommand({ db, command: 'VoidCustomerCharge', recordId: 'ch-3', actor: finance(), payload: { void_reason: 'x' } }),
    (e) => /CHARGE_HAS_ALLOCATION/.test(`${e.outcome} ${e.code} ${e.message}`));
  assert.equal(getRow(db, 'customer_charge', 'ch-3').status, 'POSTED');
  assert.equal(getRow(db, 'customer_charge', 'ch-3').version, 1);
  assert.equal(db.prepare("SELECT count(*) c FROM _audit_event WHERE record_id='ch-3'").get().c, 0);
});

test('a credited charge cannot be voided', () => {
  const db = openDb();
  seedFin(db, 'customer_charge', 'ch-4', 'POSTED');
  seedFin(db, 'credit_note', 'cr-4', 'ISSUED', { charge_or_invoice_id: 'ch-4' });
  assert.throws(() => executeCommand({ db, command: 'VoidCustomerCharge', recordId: 'ch-4', actor: finance(), payload: { void_reason: 'x' } }),
    (e) => /CHARGE_HAS_CREDIT/.test(`${e.outcome} ${e.code} ${e.message}`));
});

test('void requires finance.reconcile', () => {
  const db = openDb();
  seedFin(db, 'customer_charge', 'ch-5', 'POSTED');
  assert.throws(() => executeCommand({ db, command: 'VoidCustomerCharge', recordId: 'ch-5', actor: owner({ grants: [] }), payload: { void_reason: 'x' } }),
    (e) => e.outcome === OUTCOMES.DENIED);
});

test('a voided charge cannot be voided again', () => {
  const db = openDb();
  seedFin(db, 'customer_charge', 'ch-6', 'VOID');
  assert.throws(() => executeCommand({ db, command: 'VoidCustomerCharge', recordId: 'ch-6', actor: finance(), payload: { void_reason: 'x' } }),
    (e) => e.outcome === OUTCOMES.INVALID_STATE);
});

test('an issued credit note can be voided with a reason', () => {
  const db = openDb();
  seedFin(db, 'credit_note', 'cr-1', 'ISSUED');
  executeCommand({ db, command: 'VoidCreditNote', recordId: 'cr-1', actor: finance(), payload: { void_reason: 'duplicate credit' } });
  assert.equal(getRow(db, 'credit_note', 'cr-1').status, 'VOID');
});

test('only owner-approved derived transitions are compiled into the engine', () => {
  const derived = TRANSITIONS.filter((t) => t.source === 'derived');
  assert.ok(derived.length > 0);
  for (const t of derived) assert.equal(t.approval, 'approved', `${t.transition_id} compiled without approval`);
});

test('compiler output carries no wall-clock time, so builds are reproducible', () => {
  if (process.env.SOURCE_DATE_EPOCH) return;
  assert.doesNotMatch(String(report.generated_at), /^\d{4}-\d{2}-\d{2}T/);
});
