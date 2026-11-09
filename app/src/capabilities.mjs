/**
 * Capability evaluation.
 *
 * The pack is explicit: state is "computed from current actual owning records/policy/
 * evidence and permissions at activation/command; no editable is_ready boolean". So this
 * module evaluates evidence on every call and refuses a caller that supplies a readiness
 * flag. Nothing is cached, because a cached readiness is how a boolean sneaks back in.
 *
 * Precedence, documented because ordering is a design choice:
 *   rejected readiness flag > suspended > disabled_optional > blocked > draft > ready > enabled
 * `needs_revalidation` overrides ready/enabled when evidence has expired.
 */
import { CAPABILITIES, OPTIONAL_CAPABILITIES, CAPABILITY_STATES } from '../generated/capabilities.mjs';

const byId = new Map(CAPABILITIES.map((c) => [c.capability_id, c]));
const optional = new Set(OPTIONAL_CAPABILITIES);
const states = new Set(CAPABILITY_STATES);

export class CapabilityError extends Error {
  constructor(code, capabilityId, extra = {}) {
    super(`${code}: ${capabilityId}`);
    this.code = code;
    this.capability_id = capabilityId;
    this.details = extra;
  }
}

export function capabilities() {
  return CAPABILITIES.map((c) => ({
    capability_id: c.capability_id,
    name: c.name,
    optional: optional.has(c.capability_id),
    states: c.states,
    specification_path: c.specification_path,
  }));
}

const FORBIDDEN_FLAGS = ['is_ready', 'ready', 'isReady', 'enabled_flag'];

export function evaluateCapability(capabilityId, facts = {}) {
  const capability = byId.get(capabilityId);
  if (!capability) return { capability_id: capabilityId, state: 'UNKNOWN_CAPABILITY', ok: false };

  const flag = FORBIDDEN_FLAGS.find((f) => Object.hasOwn(facts, f));
  if (flag) {
    return {
      capability_id: capabilityId,
      state: 'blocked',
      ok: false,
      reason: 'NO_EDITABLE_READINESS',
      detail: `the pack forbids an editable readiness flag; "${flag}" was supplied and is ignored, so state is computed from evidence only`,
    };
  }

  const base = { capability_id: capabilityId, optional: optional.has(capabilityId), declared_states: capability.states };

  if (facts.suspended === true) {
    return { ...base, state: 'suspended', ok: false, detail: 'suspended by an actor decision' };
  }

  const requirements = Array.isArray(facts.requirements) ? facts.requirements : [];
  const unmet = requirements.filter((r) => r?.satisfied !== true);

  if (optional.has(capabilityId) && facts.enabled !== true) {
    return { ...base, state: 'disabled_optional', ok: false, detail: 'optional capability is not enabled for this workspace' };
  }
  if (requirements.length === 0) {
    return { ...base, state: 'draft', ok: false, unmet: [], detail: 'nothing has been evaluated yet; supply evidence to progress' };
  }
  if (unmet.length) {
    return {
      ...base,
      state: 'blocked',
      ok: false,
      unmet: unmet.map((u) => u.key ?? u.requirement ?? 'unnamed'),
      detail: 'one or more requirements are not evidenced',
    };
  }

  const expired = facts.evidence_valid_until ? Date.parse(facts.evidence_valid_until) <= Date.now() : false;
  if (expired) {
    return { ...base, state: 'needs_revalidation', ok: false, detail: 'evidence has expired; revalidation required before use' };
  }
  if (facts.service_tested !== true) {
    return { ...base, state: 'ready', ok: false, detail: 'evidence complete but no service has been exercised, so it is not live' };
  }
  return { ...base, state: 'enabled', ok: true, detail: 'evidence complete and service exercised' };
}

/** Warn if a compiled capability declares a state the runtime cannot emit. */
export function unreachableStates(capabilityId) {
  const capability = byId.get(capabilityId);
  if (!capability) return [];
  const reachable = new Set(['blocked', 'draft', 'ready', 'enabled', 'suspended', 'needs_revalidation', 'disabled_optional']);
  return capability.states.filter((s) => !reachable.has(s) || !states.has(s));
}

export function requireCapability(capabilityId, facts = {}) {
  const result = evaluateCapability(capabilityId, facts);
  if (result.state !== 'enabled') {
    throw new CapabilityError('CAPABILITY_BLOCKED', capabilityId, {
      state: result.state,
      unmet: result.unmet ?? [],
      detail: result.detail ?? null,
      readiness_is_not_permission: true,
    });
  }
  return result;
}
