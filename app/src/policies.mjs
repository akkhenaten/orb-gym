/**
 * Commercial policy configuration.
 *
 * The specification declares 11 policies and supplies none of their values, because
 * things like a cancellation window or an approval limit belong to the tenant. The
 * honest engineering answer is to fail closed: until a workspace has recorded a
 * complete, approved set of values, any command that declares a workflow governed by
 * that policy is refused. Placeholders would silently authorise real money movement
 * against a number nobody chose.
 *
 * Limitation, stated rather than papered over: the spec has no transition-to-workflow
 * edge, so this gate applies when the caller declares `workflowId`. A command that
 * omits it is not policy-gated, and the response says so.
 */
import { POLICIES } from '../generated/commercial.mjs';
import { insertRow } from './db.mjs';

const byId = new Map(POLICIES.map((p) => [p.policy_id, p]));

export const POLICY_STATUS = Object.freeze({
  CONFIGURED: 'CONFIGURED',
  UNCONFIGURED: 'UNCONFIGURED',
  INCOMPLETE: 'INCOMPLETE',
});

export function listPolicies() {
  return POLICIES;
}

export function policyById(policyId) {
  return byId.get(policyId) ?? null;
}

export function policiesForWorkflow(workflowId) {
  return POLICIES.filter((p) => p.workflows.includes(workflowId));
}

function settingRow(db, policyId, workspaceId) {
  return db.prepare(
    'SELECT * FROM _policy_setting WHERE policy_id = ? AND workspace_id = ?',
  ).get(policyId, workspaceId);
}

/** Which required fields are still missing for this workspace? */
export function missingFields(db, policyId, workspaceId) {
  const policy = policyById(policyId);
  if (!policy) throw new Error(`unknown policy ${policyId}`);
  const row = settingRow(db, policyId, workspaceId);
  if (!row) return [...policy.required_fields];
  const values = JSON.parse(row.values_json);
  return policy.required_fields.filter((f) => {
    const v = values[f];
    return v === undefined || v === null || (typeof v === 'string' && !v.trim());
  });
}

export function statusFor(db, policyId, workspaceId) {
  const missing = missingFields(db, policyId, workspaceId);
  if (!missing.length) return POLICY_STATUS.CONFIGURED;
  const row = settingRow(db, policyId, workspaceId);
  return row ? POLICY_STATUS.INCOMPLETE : POLICY_STATUS.UNCONFIGURED;
}

/** Readiness across every policy, for the setup surface. */
export function readiness(db, workspaceId) {
  return POLICIES.map((p) => ({
    policy_id: p.policy_id,
    owner: p.owner,
    required_when: p.required_when,
    status: statusFor(db, p.policy_id, workspaceId),
    missing_fields: missingFields(db, p.policy_id, workspaceId),
  }));
}

/**
 * Record tenant values. Partial submissions are refused with the missing list so a
 * policy can never sit half-configured while claiming to be configured.
 */
export function configurePolicy(db, { policyId, workspaceId, values, approvedBy, at = new Date().toISOString() }) {
  const policy = policyById(policyId);
  if (!policy) throw new Error(`unknown policy ${policyId}`);
  const missing = policy.required_fields.filter((f) => {
    const v = values?.[f];
    return v === undefined || v === null || (typeof v === 'string' && !v.trim());
  });
  if (missing.length) {
    return { ok: false, reason: 'POLICY_INCOMPLETE', missing_fields: missing };
  }
  const unknown = Object.keys(values).filter((k) => !policy.required_fields.includes(k));
  if (unknown.length) {
    return { ok: false, reason: 'UNKNOWN_FIELDS', unknown_fields: unknown };
  }

  const existing = settingRow(db, policyId, workspaceId);
  const version = (existing?.version ?? 0) + 1;
  const payload = { policy_id: policyId, workspace_id: workspaceId, values_json: JSON.stringify(values), version, approved_by: approvedBy ?? null, approved_at: at };
  if (existing) {
    db.prepare('UPDATE _policy_setting SET values_json = ?, version = ?, approved_by = ?, approved_at = ? WHERE policy_id = ? AND workspace_id = ?')
      .run(payload.values_json, version, payload.approved_by, payload.approved_at, policyId, workspaceId);
  } else {
    insertRow(db, '_policy_setting', payload);
  }
  return { ok: true, policy_id: policyId, version };
}

/**
 * Gate check used by the engine. Returns null when clear, or a refusal payload.
 * Only policies that actually govern the declared workflow are considered.
 */
export function checkWorkflowPolicies(db, { workflowId, workspaceId }) {
  if (!workflowId) {
    return { gated: false, note: 'no workflow context declared; the specification provides no transition-to-workflow edge, so policy readiness cannot be resolved for this command' };
  }
  const governing = policiesForWorkflow(workflowId);
  const blocking = governing
    .map((p) => ({ policy_id: p.policy_id, missing_fields: missingFields(db, p.policy_id, workspaceId) }))
    .filter((p) => p.missing_fields.length);
  if (blocking.length) {
    return {
      gated: true,
      reason: 'POLICY_UNCONFIGURED',
      workflow_id: workflowId,
      blocking,
    };
  }
  return { gated: true, reason: null, workflow_id: workflowId, policies_checked: governing.length };
}
