/**
 * Session -> actor. The only path by which a signed-in person gets grants.
 *
 *   identity.provider_subject = session.subject
 *   company_person.identity_id_optional = identity.id, status ACTIVE
 *   role_assignment.person_id = company_person.id, status ACTIVE
 *   grants = baseline role grants (settled cells only; proposed template cells in dev)
 *            + individual ALLOW overrides, minus nothing: DENY overrides go to `denied`,
 *            and the engine lets an individual deny win over any allow.
 *
 * Platform admin comes from a provider-held claim, never from a customer record, and
 * yields only `platform.*` grants: the matrix allows workspace actions "in audited
 * platform context", which needs a temporary support grant that no transition creates.
 */
import { ROLE_GRANTS } from '../../generated/role-grants.mjs';

export function resolveSessionActor(db, session, { workspaceId = null, dev = false } = {}) {
  if (!session?.subject) return null;
  const identity = db.prepare('SELECT * FROM identity WHERE provider_subject = ?').get(session.subject) ?? null;
  const platformAdmin = (session.claims?.platform_roles ?? []).includes('platform-admin');

  const persons = identity
    ? db.prepare("SELECT * FROM company_person WHERE identity_id_optional = ? AND status = 'ACTIVE' ORDER BY created_at, id").all(identity.id)
    : [];
  const memberships = persons.map((p) => {
    const ws = db.prepare('SELECT id, display_name, status FROM workspace WHERE id = ?').get(p.workspace_id);
    const roles = db.prepare("SELECT * FROM role_assignment WHERE person_id = ? AND status = 'ACTIVE' ORDER BY created_at, id").all(p.id);
    return { person: p, workspace: ws, roles };
  }).filter((m) => m.workspace && m.roles.length);

  const chosen = memberships.find((m) => m.workspace.id === workspaceId) ?? memberships[0] ?? null;

  const grants = new Set();
  const denied = new Set();
  let gymId = null;
  const basis = [];
  if (platformAdmin) {
    for (const g of ROLE_GRANTS['platform-admin'].settled) if (g.startsWith('platform.')) grants.add(g);
    basis.push('platform-admin claim (platform.* only; no support grant)');
  }
  if (chosen) {
    for (const ra of chosen.roles) {
      const role = ROLE_GRANTS[ra.role_template_id];
      if (!role) { basis.push(`${ra.role_template_id}: unknown role, no grants`); continue; }
      for (const g of role.settled) grants.add(g);
      if (dev) for (const g of role.proposed) grants.add(g);
      basis.push(`${ra.role_template_id}${dev && role.proposed.length ? ' (+ proposed template, dev only)' : ''}`);
      // a gym-scoped assignment narrows the actor; multiple roles do not union unrelated scopes
      if (ra.gym_id && ra.role_template_id !== 'company-owner') gymId = gymId ?? ra.gym_id;
    }
    const overrides = db.prepare('SELECT permission_id, effect FROM individual_override WHERE person_id = ? AND workspace_id = ?')
      .all(chosen.person.id, chosen.workspace.id);
    for (const o of overrides) {
      const effect = String(o.effect ?? '').toUpperCase();
      if (effect === 'DENY') denied.add(o.permission_id);
      else if (effect === 'ALLOW') grants.add(o.permission_id);
    }
  }

  return {
    id: chosen?.person.id ?? identity?.id ?? `subject:${session.subject}`,
    kind: 'user',
    identity: { subject: session.subject, verified: session.verified === true, contact: session.contact ?? null, identity_id: identity?.id ?? null },
    display_name: chosen?.person.display_name ?? null,
    person_id: chosen?.person.id ?? null,
    workspace_id: chosen?.workspace.id ?? null,
    workspace_status: chosen?.workspace.status ?? null,
    gym_id: gymId,
    platform_admin: platformAdmin,
    grants: [...grants].sort(),
    denied: [...denied].sort(),
    grant_basis: basis,
    memberships: memberships.map((m) => ({ workspace_id: m.workspace.id, display_name: m.workspace.display_name, status: m.workspace.status, roles: m.roles.map((r) => r.role_template_id) })),
  };
}

export const can = (actor, permission) => Boolean(actor) && actor.grants.includes(permission) && !actor.denied.includes(permission);
