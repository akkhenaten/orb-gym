/**
 * Synthetic records for the dev personas (ORB_DEV=1 only). Rows are inserted in each
 * machine's initial state and then moved by the real commands, so the seed exercises
 * the engine instead of writing finished states directly. Every name and contact is
 * labelled synthetic and uses the reserved .invalid domain.
 */
import { insertRow } from '../db.mjs';
import { executeCommand } from '../engine.mjs';
import { DEV_PERSONAS } from './index.mjs';
import { resolveSessionActor } from './actor.mjs';

const WS = 'ws-dev';

export function seedDevPersonas(db) {
  if (db.prepare('SELECT id FROM workspace WHERE id = ?').get(WS)) return { seeded: false, workspace_id: WS };
  const now = new Date().toISOString();
  const base = { version: 1, created_at: now, updated_at: now };
  const persona = (k) => DEV_PERSONAS.find((p) => p.persona === k);

  for (const p of DEV_PERSONAS) {
    insertRow(db, 'identity', { id: `id-${p.persona}`, ...base, provider_subject: p.subject, verified_contact_reference: p.contact });
  }
  insertRow(db, 'workspace', { id: WS, ...base, workspace_id: WS, display_name: 'Synthetic Fitness Group (dev)', owner_assignment_id: 'ra-dev-owner' });
  insertRow(db, 'gym', { id: 'gym-dev-north', ...base, workspace_id: WS, gym_id: 'gym-dev-north', display_name: 'North Studio (synthetic)', location: 'Synthetic location A', timezone: 'Europe/London' });
  insertRow(db, 'gym', { id: 'gym-dev-south', ...base, workspace_id: WS, gym_id: 'gym-dev-south', display_name: 'South Studio (synthetic)', location: 'Synthetic location B', timezone: 'Europe/London' });
  for (const [k, role, gym] of [['owner', 'company-owner', null], ['gym-manager', 'local-gym-manager', 'gym-dev-north']]) {
    const p = persona(k);
    insertRow(db, 'company_person', { id: `cp-dev-${k}`, ...base, workspace_id: WS, identity_id_optional: `id-${k}`, display_name: p.display_name, contact_reference: p.contact, gym_id: gym });
    insertRow(db, 'role_assignment', { id: `ra-dev-${k}`, ...base, workspace_id: WS, person_id: `cp-dev-${k}`, role_template_id: role, scope: gym ? 'gym' : 'workspace', gym_id: gym });
  }

  // PENDING -> ACTIVE through PublishRoleAssignment, then the owner completes setup and opens one gym
  const bootstrap = { id: 'dev-seed', kind: 'user', grants: ['access.assign_role'], denied: [], workspace_id: WS };
  for (const k of ['owner', 'gym-manager']) executeCommand({ db, command: 'PublishRoleAssignment', recordId: `ra-dev-${k}`, actor: bootstrap, operationId: `seed-ra-${k}` });
  const owner = resolveSessionActor(db, { subject: persona('owner').subject, verified: true, contact: persona('owner').contact });
  executeCommand({ db, command: 'ActivateGym', recordId: 'gym-dev-north', actor: owner, operationId: 'seed-gym-north' });
  executeCommand({ db, command: 'CompleteWorkspaceSetup', recordId: WS, actor: owner, operationId: 'seed-ws' });
  return { seeded: true, workspace_id: WS };
}
