/**
 * Capability tests.
 *
 * The rule under defence is the pack's own sentence: state is computed from evidence and
 * "no editable is_ready boolean". A caller that supplies one must be refused, not honoured.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  capabilities, evaluateCapability, requireCapability, unreachableStates, CapabilityError,
} from '../src/capabilities.mjs';
import { CAPABILITIES, CAPABILITY_STATES, OPTIONAL_CAPABILITIES } from '../generated/capabilities.mjs';

test('all 22 capabilities compile with their declared state contracts', () => {
  assert.equal(CAPABILITIES.length, 22);
  assert.equal(CAPABILITY_STATES.length, 7);
  for (const c of CAPABILITIES) {
    assert.equal(c.states.length, 7, `${c.capability_id}`);
    for (const s of c.states) assert.ok(CAPABILITY_STATES.includes(s), `${c.capability_id}: ${s}`);
    assert.ok(c.specification_path, `${c.capability_id} has no specification path`);
    assert.deepEqual(unreachableStates(c.capability_id), [], `${c.capability_id} declares unreachable states`);
  }
  assert.equal(capabilities().length, 22);
});

test('an editable readiness flag is refused outright', () => {
  const r = evaluateCapability('CAP-POS', { is_ready: true, enabled: true });
  assert.equal(r.ok, false);
  assert.equal(r.state, 'blocked');
  assert.equal(r.reason, 'NO_EDITABLE_READINESS');
  assert.match(r.detail, /computed from evidence only/);
});

test('optional capabilities start disabled, including POS', () => {
  assert.ok(OPTIONAL_CAPABILITIES.includes('CAP-POS'));
  const r = evaluateCapability('CAP-POS', { requirements: [{ key: 'till_provider', satisfied: true }] });
  assert.equal(r.state, 'disabled_optional');
  assert.equal(r.ok, false);
  assert.equal(r.optional, true);
});

test('evidence gaps block with the unmet requirements named', () => {
  const r = evaluateCapability('CAP-MEMBERSHIP', {
    requirements: [{ key: 'published_plan', satisfied: true }, { key: 'payment_setup', satisfied: false }],
  });
  assert.equal(r.state, 'blocked');
  assert.deepEqual(r.unmet, ['payment_setup']);
});

test('no evidence yet is draft, not ready', () => {
  assert.equal(evaluateCapability('CAP-MEMBERSHIP', {}).state, 'draft');
});

test('complete evidence without an exercised service is ready, never enabled', () => {
  const facts = { requirements: [{ key: 'published_plan', satisfied: true }] };
  const r = evaluateCapability('CAP-MEMBERSHIP', facts);
  assert.equal(r.state, 'ready');
  assert.equal(r.ok, false);
  assert.match(r.detail, /no service has been exercised/);
});

test('enabled requires both evidence and an exercised service', () => {
  const r = evaluateCapability('CAP-MEMBERSHIP', {
    requirements: [{ key: 'published_plan', satisfied: true }],
    service_tested: true,
  });
  assert.equal(r.state, 'enabled');
  assert.equal(r.ok, true);
});

test('expired evidence forces revalidation over a live state', () => {
  const r = evaluateCapability('CAP-MEMBERSHIP', {
    requirements: [{ key: 'published_plan', satisfied: true }],
    service_tested: true,
    evidence_valid_until: '2020-01-01T00:00:00Z',
  });
  assert.equal(r.state, 'needs_revalidation');
});

test('suspension outranks complete evidence', () => {
  const r = evaluateCapability('CAP-MEMBERSHIP', {
    requirements: [{ key: 'published_plan', satisfied: true }],
    service_tested: true,
    suspended: true,
  });
  assert.equal(r.state, 'suspended');
});

test('unknown capability is reported, not silently allowed', () => {
  const r = evaluateCapability('CAP-NOPE', {});
  assert.equal(r.state, 'UNKNOWN_CAPABILITY');
  assert.equal(r.ok, false);
});

test('requireCapability throws the blocker with its state', () => {
  assert.throws(() => requireCapability('CAP-POS', {}), (err) => {
    assert.ok(err instanceof CapabilityError);
    assert.equal(err.code, 'CAPABILITY_BLOCKED');
    assert.equal(err.details.state, 'disabled_optional');
    assert.equal(err.details.readiness_is_not_permission, true);
    return true;
  });
  assert.equal(requireCapability('CAP-MEMBERSHIP', {
    requirements: [{ key: 'published_plan', satisfied: true }], service_tested: true,
  }).state, 'enabled');
});
