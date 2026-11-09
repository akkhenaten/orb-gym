/**
 * Commercial policy configuration and enforcement.
 *
 * The point of these tests is the refusal path: an unconfigured policy must stop the
 * command, leave the record untouched, and leave no audit trace claiming otherwise.
 */
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
import assert from 'node:assert/strict';

import { openDb, insertRow, getRow } from '../src/db.mjs';
import { executeCommand, findTransition, OUTCOMES } from '../src/engine.mjs';
import {
  listPolicies, policyById, policiesForWorkflow, missingFields, statusFor,
  configurePolicy, readiness, checkWorkflowPolicies, POLICY_STATUS,
} from '../src/policies.mjs';
import { POLICIES } from '../generated/commercial.mjs';

const now = '2026-11-09T10:00:00.000Z';
const actor = (grants) => ({
  id: 'owner-1', kind: 'user', grants, denied: [], workspace_id: 'ws-1', gym_id: 'gym-1',
});

test('the registry carries all 11 policies and no invented values', () => {
  assert.equal(POLICIES.length, 11);
  for (const p of POLICIES) {
    assert.ok(p.required_fields.length > 0, `${p.policy_id} has no required fields`);
    assert.equal(p.configured_in_spec, false, `${p.policy_id} must not claim configured values`);
    assert.ok(p.workflows.length > 0, `${p.policy_id} governs no workflow`);
  }
});

test('an untouched workspace is unconfigured, not assumed', () => {
  const db = openDb();
  const policy = listPolicies()[0];
  assert.equal(statusFor(db, policy.policy_id, 'ws-1'), POLICY_STATUS.UNCONFIGURED);
  assert.equal(missingFields(db, policy.policy_id, 'ws-1').length, policy.required_fields.length);
});

test('a partial submission is refused with the missing fields named', () => {
  const db = openDb();
  const policy = listPolicies()[0];
  const firstField = policy.required_fields[0];
  const result = configurePolicy(db, {
    policyId: policy.policy_id, workspaceId: 'ws-1', values: { [firstField]: 'set' }, at: now,
  });
  assert.equal(result.ok, false);
  assert.equal(result.reason, 'POLICY_INCOMPLETE');
  assert.deepEqual(result.missing_fields, policy.required_fields.slice(1));
  assert.equal(statusFor(db, policy.policy_id, 'ws-1'), POLICY_STATUS.UNCONFIGURED,
    'a refused submission must not create a row');
});

test('an unknown field is refused rather than stored silently', () => {
  const db = openDb();
  const policy = listPolicies()[0];
  const values = Object.fromEntries(policy.required_fields.map((f) => [f, 'x']));
  values.not_a_real_field = 'x';
  const result = configurePolicy(db, { policyId: policy.policy_id, workspaceId: 'ws-1', values, at: now });
  assert.equal(result.ok, false);
  assert.equal(result.reason, 'UNKNOWN_FIELDS');
  assert.deepEqual(result.unknown_fields, ['not_a_real_field']);
});

test('a complete submission configures the policy and versions on rewrite', () => {
  const db = openDb();
  const policy = listPolicies()[0];
  const values = Object.fromEntries(policy.required_fields.map((f) => [f, 'configured']));
  const first = configurePolicy(db, { policyId: policy.policy_id, workspaceId: 'ws-1', values, approvedBy: 'owner-1', at: now });
  assert.equal(first.ok, true);
  assert.equal(first.version, 1);
  assert.equal(statusFor(db, policy.policy_id, 'ws-1'), POLICY_STATUS.CONFIGURED);

  const second = configurePolicy(db, { policyId: policy.policy_id, workspaceId: 'ws-1', values, approvedBy: 'owner-1', at: now });
  assert.equal(second.version, 2, 'a rewrite must version, never overwrite identity');
});

test('readiness reports every policy for a setup surface', () => {
  const db = openDb();
  const rows = readiness(db, 'ws-1');
  assert.equal(rows.length, 11);
  assert.ok(rows.every((r) => r.status === POLICY_STATUS.UNCONFIGURED));
});

test('policy without workflow context is not gated, and says why', () => {
  const db = openDb();
  const check = checkWorkflowPolicies(db, { workflowId: null, workspaceId: 'ws-1' });
  assert.equal(check.gated, false);
  assert.match(check.note, /no transition-to-workflow edge/);
});

test('an unconfigured governing policy refuses the command and changes nothing', () => {
  const db = openDb();
  const policy = listPolicies().find((p) => p.workflows.length);
  const workflowId = policy.workflows[0];
  const tr = findTransition('CompleteWorkspaceSetup');
  insertRow(db, tr.entity_table, {
    id: 'rec-2', status: tr.from_state, version: 1,
    created_at: now, updated_at: now, workspace_id: 'ws-1', gym_id: 'gym-1',
  });

  assert.throws(() => executeCommand({
    db, command: tr.command, recordId: 'rec-2', actor: actor([...tr.requires]),
    operationId: 'op-policy-1', workflowId,
  }), /policy not configured/);

  const row = getRow(db, tr.entity_table, 'rec-2');
  assert.equal(row.status, tr.from_state, 'state must not advance past an unconfigured policy');
  assert.equal(row.version, 1);
  assert.equal(db.prepare('SELECT count(*) c FROM _audit_event').get().c, 0,
    'a refused command must not leave an audit acceptance');
});

test('configuring every governing policy lets the same command through', () => {
  const db = openDb();
  const policy = listPolicies().find((p) => p.workflows.length);
  const workflowId = policy.workflows[0];
  const tr = findTransition('CompleteWorkspaceSetup');
  insertRow(db, tr.entity_table, {
    id: 'rec-3', status: tr.from_state, version: 1,
    created_at: now, updated_at: now, workspace_id: 'ws-1', gym_id: 'gym-1',
  });

  for (const p of policiesForWorkflow(workflowId)) {
    const values = Object.fromEntries(p.required_fields.map((f) => [f, 'configured']));
    assert.equal(configurePolicy(db, { policyId: p.policy_id, workspaceId: 'ws-1', values, at: now }).ok, true);
  }

  const out = executeCommand({
    db, command: tr.command, recordId: 'rec-3', actor: actor([...tr.requires]),
    operationId: 'op-policy-2', workflowId,
  });
  assert.equal(out.outcome, OUTCOMES.ACCEPTED);
});

test('policy configuration is per workspace and does not leak across tenants', () => {
  const db = openDb();
  const policy = listPolicies()[0];
  const values = Object.fromEntries(policy.required_fields.map((f) => [f, 'configured']));
  configurePolicy(db, { policyId: policy.policy_id, workspaceId: 'ws-1', values, at: now });
  assert.equal(statusFor(db, policy.policy_id, 'ws-1'), POLICY_STATUS.CONFIGURED);
  assert.equal(statusFor(db, policy.policy_id, 'ws-2'), POLICY_STATUS.UNCONFIGURED,
    'one tenant configuring a policy must not configure it for another');
});

test('every governing rule resolves in the decisions register', () => {
  // Governing rules live in two registers: operational decisions carry DEC-GR-*,
  // extension decisions carry OG-EXT-*. Each id must resolve in its own register.
  const operational = readFileSync(join(REPO, 'docs/decisions/operational-decisions.md'), 'utf8');
  const extensions = readFileSync(join(REPO, 'docs/source-extension-register.md'), 'utf8');
  for (const p of POLICIES) {
    assert.match(p.governing_rule, /^(DEC-GR-\d+|OG-EXT-\d+)$/, `${p.policy_id} rule ${p.governing_rule} is malformed`);
    const register = p.governing_rule.startsWith('DEC-') ? operational : extensions;
    assert.ok(register.includes(p.governing_rule),
      `${p.policy_id} cites ${p.governing_rule}, absent from its own register`);
  }
  assert.ok(policyById('approval.routing'), 'lookup by policy id works');
});
