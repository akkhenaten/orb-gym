/**
 * Trusted command engine.
 *
 * Every state change in Orb Gym goes through here. The specification's rules map
 * onto this module directly:
 *
 *   - transitions.json is the only source of legal state changes (233 commands)
 *   - authorization.mode is enforced, with individual deny always winning
 *   - "expected version" is enforced as optimistic concurrency
 *   - "one command operation identity" is enforced as idempotent replay
 *   - every accepted command writes an audit event
 *
 * Projections (dashboard, calendar, feed) never write here.
 */
import { randomUUID } from 'node:crypto';
import { insertRow, getRow, updateRow, transaction } from './db.mjs';
import { TRANSITIONS } from '../generated/transitions.mjs';
import { enqueue } from './notify.mjs';
import { checkWorkflowPolicies } from './policies.mjs';

const BY_COMMAND = new Map(TRANSITIONS.map((t) => [t.command, t]));

export const OUTCOMES = Object.freeze({
  ACCEPTED: 'ACCEPTED',
  REPLAYED: 'REPLAYED',
  DENIED: 'DENIED',
  CONFLICT: 'CONFLICT',
  INVALID_STATE: 'INVALID_STATE',
  NOT_FOUND: 'NOT_FOUND',
  UNKNOWN_COMMAND: 'UNKNOWN_COMMAND',
  VALIDATION: 'VALIDATION',
});

export class CommandError extends Error {
  constructor(outcome, message, extra = {}) {
    super(message);
    this.outcome = outcome;
    this.details = extra;
  }
}

export function findTransition(command) {
  return BY_COMMAND.get(command) ?? null;
}

/**
 * Authorization. Mirrors docs/data/authorization-contract.md.
 *
 *  permission_all_of     every named grant must be held; any individual deny wins
 *  verified_source_actor only a verified provider/source actor with proof
 *  context_routes        only through the declared source route
 */
export function authorize(actor, tr) {
  if (!actor || !actor.id) return { allowed: false, reason: 'no actor on the command' };

  const denied = new Set(actor.denied ?? []);
  const grants = new Set(actor.grants ?? []);

  for (const permission of tr.requires) {
    if (denied.has(permission)) return { allowed: false, reason: `individual deny on ${permission}` };
    if (!grants.has(permission)) return { allowed: false, reason: `missing grant ${permission}` };
  }

  switch (tr.mode) {
    case 'permission_all_of':
      return { allowed: true, reason: 'all required grants held' };

    case 'verified_source_actor': {
      if (actor.kind !== 'verified_source') {
        return { allowed: false, reason: `${tr.mode} requires a verified source actor, got ${actor.kind}` };
      }
      if (!actor.proof || actor.proof.verified !== true) {
        return { allowed: false, reason: 'verified source actor without verified proof' };
      }
      return { allowed: true, reason: 'verified source actor with proof' };
    }

    case 'context_routes': {
      const routes = actor.routes ?? [];
      const ok = routes.includes(tr.source_id) || routes.includes(tr.workflow_domain);
      return ok
        ? { allowed: true, reason: 'actor holds the declared source route' }
        : { allowed: false, reason: `actor lacks source route ${tr.source_id ?? tr.workflow_domain}` };
    }

    default:
      return { allowed: false, reason: `unimplemented authorization mode ${tr.mode}` };
  }
}

const replay = (db, operationId) => {
  const row = db.prepare('SELECT * FROM _operation WHERE operation_id = ?').get(operationId);
  if (!row) return null;
  return { ...JSON.parse(row.result_json), outcome: OUTCOMES.REPLAYED, replayed: true };
};

function recordOperation(db, operationId, tr, recordId, result) {
  insertRow(db, '_operation', {
    operation_id: operationId,
    transition_id: tr.transition_id,
    entity_table: tr.entity_table,
    record_id: recordId,
    outcome: result.outcome,
    result_json: JSON.stringify(result),
    created_at: new Date().toISOString(),
  });
}

/**
 * Execute one trusted command.
 *
 * @param {object} args
 * @param {import('node:sqlite').DatabaseSync} args.db
 * @param {string} args.command        transition command name, e.g. CompleteWorkspaceSetup
 * @param {string} args.recordId       entity row the transition applies to
 * @param {object} args.actor          {id, kind, grants[], denied[], workspace_id, gym_id, routes[], proof{}}
 * @param {number} [args.expectedVersion]
 * @param {string} [args.operationId]  retry identity; reused id replays the first outcome
 * @param {object} [args.payload]      field values applied with the transition
 * @param {Array<{event_id:string, dedup_key:string, supersede_key?:string, recipient_id?:string, payload?:object}>} [args.notifications]
 *        events to enqueue in the SAME transaction. Never inferred: the spec has no
 *        transition -> event edge, so the caller names each event explicitly.
 */
export function executeCommand({
  db, command, recordId, actor, expectedVersion, operationId, payload = {}, notifications = [], workflowId = null,
}) {
  const tr = findTransition(command);
  if (!tr) throw new CommandError(OUTCOMES.UNKNOWN_COMMAND, `unknown command ${command}`);

  const opId = operationId ?? randomUUID();
  const prior = replay(db, opId);
  if (prior) return prior;

  const row = getRow(db, tr.entity_table, recordId);
  if (!row) throw new CommandError(OUTCOMES.NOT_FOUND, `${tr.entity_table} ${recordId} not found`);

  // tenancy: a customer-owned row is only reachable inside its own workspace
  if (row.workspace_id && actor.workspace_id && row.workspace_id !== actor.workspace_id) {
    throw new CommandError(OUTCOMES.DENIED, 'record belongs to another workspace', {
      record_workspace: row.workspace_id,
      actor_workspace: actor.workspace_id,
    });
  }
  if (actor.workspace_id && !actor.platform_admin && row.gym_id && actor.gym_id && row.gym_id !== actor.gym_id) {
    throw new CommandError(OUTCOMES.DENIED, 'record belongs to another gym');
  }

  const decision = authorize(actor, tr);
  if (!decision.allowed) throw new CommandError(OUTCOMES.DENIED, decision.reason);

  // Commercial policy gate: fail closed. A policy value nobody chose must never
  // silently authorise the command, so an unconfigured governing policy refuses it.
  const policyCheck = checkWorkflowPolicies(db, { workflowId, workspaceId: actor.workspace_id });
  if (policyCheck.gated && policyCheck.reason) {
    throw new CommandError('POLICY_UNCONFIGURED', `policy not configured for ${policyCheck.workflow_id}`, {
      workflow_id: policyCheck.workflow_id, blocking: policyCheck.blocking,
    });
  }

  if (row.status !== tr.from_state) {
    throw new CommandError(OUTCOMES.INVALID_STATE, `expected ${tr.from_state}, record is ${row.status}`, {
      expected: tr.from_state,
      actual: row.status,
    });
  }

  if (expectedVersion !== undefined && Number(expectedVersion) !== Number(row.version)) {
    throw new CommandError(OUTCOMES.CONFLICT, `stale version: expected ${expectedVersion}, record is ${row.version}`, {
      expected_version: expectedVersion,
      current_version: row.version,
    });
  }

  const reason = tr.reason_field ? payload[tr.reason_field] : undefined;
  if (tr.reason_field && (typeof reason !== 'string' || !reason.trim())) {
    throw new CommandError('REASON_REQUIRED', `${command} requires ${tr.reason_field}`, { field: tr.reason_field });
  }

  const now = new Date().toISOString();
  const auditId = randomUUID();

  const result = transaction(db, () => {
    // Declarative guards run inside the commit transaction, so a reference written
    // between read and commit still blocks the transition.
    for (const g of tr.guards ?? []) {
      if (g.type !== 'no_referencing_rows') throw new CommandError('UNKNOWN_GUARD', `unsupported guard ${g.type}`);
      const hit = db.prepare(`SELECT id FROM ${g.table} WHERE ${g.column} = ? LIMIT 1`).get(recordId);
      if (hit) {
        throw new CommandError(g.code ?? 'GUARD_FAILED', `${g.table}.${g.column} references ${recordId}`, {
          guard: g, referencing_id: hit.id, remedy: 'correct by credit note instead of void',
        });
      }
    }

    const patch = { status: tr.to_state, version: Number(row.version) + 1, updated_at: now };
    for (const [k, v] of Object.entries(payload)) {
      if (k === 'id' || k === 'version' || k === 'status' || k === tr.reason_field) continue;
      patch[k] = v;
    }
    updateRow(db, tr.entity_table, recordId, patch);

    insertRow(db, '_audit_event', {
      audit_id: auditId,
      operation_id: opId,
      transition_id: tr.transition_id,
      entity_table: tr.entity_table,
      record_id: recordId,
      from_state: tr.from_state,
      to_state: tr.to_state,
      actor_id: actor.id,
      actor_kind: actor.kind ?? 'user',
      detail: JSON.stringify({ command, effects: tr.effects, authorization: tr.mode, source: tr.source ?? 'spec', reason: reason ?? null }),
      created_at: now,
    });

    const enqueued = [];
    for (const n of notifications) {
      const eventId = n.event_id ?? n.eventId;
      const dedupKey = n.dedup_key ?? n.dedupKey;
      const { outbox_id, deduplicated } = enqueue(db, {
        eventId, dedupKey,
        supersedeKey: n.supersede_key ?? n.supersedeKey ?? null,
        entityTable: tr.entity_table,
        recordId,
        recipientId: n.recipient_id ?? n.recipientId ?? null,
        payload: { ...(n.payload ?? {}), operation_id: opId, transition_id: tr.transition_id },
        at: now,
      });
      enqueued.push({ event_id: eventId, outbox_id, deduplicated });
    }

    const accepted = {
      ok: true,
      outcome: OUTCOMES.ACCEPTED,
      operation_id: opId,
      transition_id: tr.transition_id,
      entity_table: tr.entity_table,
      record_id: recordId,
      from_state: tr.from_state,
      to_state: tr.to_state,
      version: patch.version,
      audit_id: auditId,
      notifications: enqueued,
    };
    recordOperation(db, opId, tr, recordId, accepted);
    return accepted;
  });

  return result;
}

/** Audit trail for one record, newest first. */
export function auditTrail(db, entityTable, recordId) {
  return db.prepare(
    'SELECT * FROM _audit_event WHERE entity_table = ? AND record_id = ? ORDER BY created_at DESC',
  ).all(entityTable, recordId);
}
