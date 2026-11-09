/**
 * Creation commands from the derived creation overlay (docs/derived/creation-overlay.json).
 *
 * transitions.json has no command that creates a workspace, its owner grant or a gym.
 * The overlay drafts them with verbatim evidence, but they are PROPOSALS: a proposed
 * entry is refused with PROPOSAL_NOT_APPROVED unless ORB_ALLOW_PROPOSED=1 and the
 * process is not running in production. Approving one (approval.status 'approved' with
 * by/date) is the owner's decision, not the builder's.
 *
 * Everything else follows the engine's rules: authorization with individual deny,
 * tenant and gym scope, idempotent operation id, expected version on update, and an
 * audit event per record written, all inside one transaction.
 */
import { randomUUID, createHash } from 'node:crypto';
import { insertRow, getRow, updateRow, transaction } from './db.mjs';
import { CommandError, OUTCOMES, authorize } from './engine.mjs';
import { CREATIONS } from '../generated/creations.mjs';

const BY_COMMAND = new Map(CREATIONS.map((c) => [c.command, c]));

export function proposalsEnabled(env = process.env) {
  return env.ORB_ALLOW_PROPOSED === '1' && env.NODE_ENV !== 'production';
}

export function findCreation(command) {
  return BY_COMMAND.get(command) ?? null;
}

/** Status of every creation command, for screens that must say why an action is blocked. */
export function creationStatus(env = process.env) {
  return CREATIONS.map((c) => ({
    creation_id: c.creation_id, command: c.command, workflow_id: c.workflow_id,
    approval: c.approval.status, requires: c.authorization.requires,
    enabled: c.approval.status === 'approved' || proposalsEnabled(env),
  }));
}

function cleanInput(spec, payload) {
  const out = {};
  const problems = [];
  for (const f of spec.input) {
    const raw = payload[f.field];
    const v = typeof raw === 'string' ? raw.trim() : raw;
    if (v === undefined || v === null || v === '') {
      if (f.required) problems.push({ field: f.field, problem: 'required' });
      else out[f.field] = null;
      continue;
    }
    if (typeof v !== 'string') { problems.push({ field: f.field, problem: 'must be text' }); continue; }
    if (f.max_length && v.length > f.max_length) { problems.push({ field: f.field, problem: `at most ${f.max_length} characters` }); continue; }
    if (f.format === 'IANA zone name') {
      try { new Intl.DateTimeFormat('en', { timeZone: v }); } catch { problems.push({ field: f.field, problem: 'not a recognised time zone' }); continue; }
    }
    out[f.field] = v;
  }
  const unknown = Object.keys(payload).filter((k) => !spec.input.some((f) => f.field === k));
  for (const k of unknown) problems.push({ field: k, problem: 'not an input of this command' });
  if (problems.length) throw new CommandError(OUTCOMES.VALIDATION, `${spec.command}: invalid input`, { problems });
  return out;
}

function audit(db, { opId, spec, table, recordId, from = null, to = null, actor, now, extra = {} }) {
  insertRow(db, '_audit_event', {
    audit_id: randomUUID(), operation_id: opId, transition_id: spec.creation_id, entity_table: table,
    record_id: recordId, from_state: from, to_state: to, actor_id: actor.id, actor_kind: actor.kind ?? 'user',
    detail: JSON.stringify({ command: spec.command, source: 'derived-creation', approval: spec.approval.status, ...extra }),
    created_at: now,
  });
}

/** "changed payload with same operation key conflicts": the key is bound to command, actor, record and input. */
const fingerprint = (command, actor, recordId, input) =>
  createHash('sha256').update(JSON.stringify([command, actor.id, recordId ?? null, input])).digest('hex');

function finish(db, opId, spec, table, recordId, result, fp) {
  insertRow(db, '_operation', {
    operation_id: opId, transition_id: spec.creation_id, entity_table: table, record_id: recordId,
    outcome: result.outcome, result_json: JSON.stringify({ ...result, request_fingerprint: fp }), created_at: result.at,
  });
  return result;
}

const HANDLERS = {
  CreateWorkspaceWithOwner(db, spec, { actor, input, opId, now, fp }) {
    const ident = actor.identity;
    if (!ident?.subject || ident.verified !== true) {
      throw new CommandError(OUTCOMES.DENIED, 'a signed-in identity with a verified contact is required to create a workspace');
    }
    return transaction(db, () => {
      let identityRow = db.prepare('SELECT * FROM identity WHERE provider_subject = ?').get(ident.subject);
      if (!identityRow) {
        insertRow(db, 'identity', {
          id: randomUUID(), version: 1, created_at: now, updated_at: now,
          provider_subject: ident.subject, verified_contact_reference: ident.contact ?? null,
        });
        identityRow = db.prepare('SELECT * FROM identity WHERE provider_subject = ?').get(ident.subject);
        audit(db, { opId, spec, table: 'identity', recordId: identityRow.id, actor, now });
      }
      const wsId = randomUUID(); const personId = randomUUID(); const raId = randomUUID();
      insertRow(db, 'workspace', {
        id: wsId, version: 1, status: 'ONBOARDING', created_at: now, updated_at: now,
        display_name: input.display_name, owner_assignment_id: raId, workspace_id: wsId,
      });
      insertRow(db, 'company_person', {
        id: personId, version: 1, status: 'ACTIVE', created_at: now, updated_at: now, workspace_id: wsId,
        identity_id_optional: identityRow.id, display_name: input.owner_display_name, contact_reference: ident.contact ?? null,
      });
      const ra = spec.inserts.find((i) => i.table === 'role_assignment');
      insertRow(db, 'role_assignment', {
        id: raId, version: 1, status: ra.initial_state, created_at: now, updated_at: now, workspace_id: wsId,
        person_id: personId, ...ra.fixed,
      });
      audit(db, { opId, spec, table: 'workspace', recordId: wsId, to: 'ONBOARDING', actor, now });
      audit(db, { opId, spec, table: 'company_person', recordId: personId, to: 'ACTIVE', actor, now });
      audit(db, { opId, spec, table: 'role_assignment', recordId: raId, to: ra.initial_state, actor, now, extra: { role: ra.fixed.role_template_id } });
      return finish(db, opId, spec, 'workspace', wsId, {
        ok: true, outcome: OUTCOMES.ACCEPTED, operation_id: opId, transition_id: spec.creation_id, approval: spec.approval.status,
        entity_table: 'workspace', record_id: wsId, to_state: 'ONBOARDING', version: 1, at: now,
        records: { identity: identityRow.id, workspace: wsId, company_person: personId, role_assignment: raId },
      }, fp);
    });
  },

  CreateGym(db, spec, { actor, input, opId, now, fp }) {
    if (!actor.workspace_id) throw new CommandError(OUTCOMES.DENIED, 'creating a gym requires a workspace context');
    return transaction(db, () => {
      const ws = getRow(db, 'workspace', actor.workspace_id);
      if (!ws) throw new CommandError(OUTCOMES.NOT_FOUND, `workspace ${actor.workspace_id} not found`);
      if (!spec.workspace_states.includes(ws.status)) {
        throw new CommandError(OUTCOMES.INVALID_STATE, `a gym cannot be added while the workspace is ${ws.status}`, { actual: ws.status, allowed: spec.workspace_states });
      }
      const id = randomUUID();
      insertRow(db, 'gym', {
        id, version: 1, status: 'DRAFT', created_at: now, updated_at: now, workspace_id: ws.id, gym_id: id,
        display_name: input.display_name, location: input.location, timezone: input.timezone,
      });
      audit(db, { opId, spec, table: 'gym', recordId: id, to: 'DRAFT', actor, now });
      return finish(db, opId, spec, 'gym', id, {
        ok: true, outcome: OUTCOMES.ACCEPTED, operation_id: opId, transition_id: spec.creation_id, approval: spec.approval.status,
        entity_table: 'gym', record_id: id, to_state: 'DRAFT', version: 1, at: now,
      }, fp);
    });
  },

  UpdateGymDetails(db, spec, { actor, input, opId, now, fp, recordId, expectedVersion }) {
    if (expectedVersion === undefined || expectedVersion === null) {
      throw new CommandError(OUTCOMES.VALIDATION, 'UpdateGymDetails requires expectedVersion');
    }
    return transaction(db, () => {
      const row = getRow(db, 'gym', recordId);
      if (!row) throw new CommandError(OUTCOMES.NOT_FOUND, `gym ${recordId} not found`);
      if (!actor.platform_admin && row.workspace_id !== actor.workspace_id) throw new CommandError(OUTCOMES.DENIED, 'record belongs to another workspace');
      if (actor.gym_id && row.gym_id !== actor.gym_id) throw new CommandError(OUTCOMES.DENIED, 'record belongs to another gym');
      if (!spec.record_states.includes(row.status)) {
        throw new CommandError(OUTCOMES.INVALID_STATE, `gym details are fixed while ${row.status}`, { actual: row.status, allowed: spec.record_states });
      }
      if (Number(expectedVersion) !== Number(row.version)) {
        throw new CommandError(OUTCOMES.CONFLICT, `stale version: expected ${expectedVersion}, record is ${row.version}`, { expected_version: expectedVersion, current_version: row.version });
      }
      const version = Number(row.version) + 1;
      updateRow(db, 'gym', recordId, { ...input, version, updated_at: now });
      audit(db, { opId, spec, table: 'gym', recordId, from: row.status, to: row.status, actor, now, extra: { fields: Object.keys(input) } });
      return finish(db, opId, spec, 'gym', recordId, {
        ok: true, outcome: OUTCOMES.ACCEPTED, operation_id: opId, transition_id: spec.creation_id, approval: spec.approval.status,
        entity_table: 'gym', record_id: recordId, to_state: row.status, version, at: now,
      }, fp);
    });
  },
};

export function executeCreation({ db, command, actor, operationId, payload = {}, recordId, expectedVersion, env = process.env }) {
  const spec = findCreation(command);
  if (!spec) throw new CommandError(OUTCOMES.UNKNOWN_COMMAND, `unknown creation command ${command}`);
  if (spec.approval.status !== 'approved' && !proposalsEnabled(env)) {
    throw new CommandError('PROPOSAL_NOT_APPROVED', `${spec.creation_id} ${command} is a proposal awaiting owner approval`, {
      creation_id: spec.creation_id, owner_question: spec.approval.owner_question,
    });
  }
  if (!actor || !actor.id) throw new CommandError(OUTCOMES.DENIED, 'no actor on the command');

  if (spec.authorization.mode === 'permission_all_of') {
    const decision = authorize(actor, { requires: spec.authorization.requires, mode: 'permission_all_of' });
    if (!decision.allowed) throw new CommandError(OUTCOMES.DENIED, decision.reason);
  }
  const input = cleanInput(spec, payload);
  const fp = fingerprint(command, actor, recordId, input);

  const opId = operationId ?? randomUUID();
  const prior = db.prepare('SELECT * FROM _operation WHERE operation_id = ?').get(opId);
  if (prior) {
    const { request_fingerprint: priorFp, ...result } = JSON.parse(prior.result_json);
    if (priorFp !== fp) {
      throw new CommandError(OUTCOMES.CONFLICT, 'this operation id was already used for a different request', { operation_id: opId });
    }
    return { ...result, outcome: OUTCOMES.REPLAYED, replayed: true };
  }
  return HANDLERS[command](db, spec, { actor, input, opId, fp, now: new Date().toISOString(), recordId, expectedVersion });
}
