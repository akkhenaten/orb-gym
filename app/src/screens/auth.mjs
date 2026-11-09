/**
 * AUTH screens SCR-006..012 (cards 02-05). Every credential, factor, session and
 * recovery call goes to the identity adapter; with no provider configured each screen
 * shows the IDENTITY_PROVIDER_UNCONFIGURED blocked state instead of a fake form.
 * Errors stay generic ("sign-in did not succeed") so no screen reveals which accounts exist.
 */
import { esc, statePanel, form, table, status, rowActions } from './components.mjs';
import { can } from '../identity/actor.mjs';

const app = (route) => `/app${route}`;

export function unconfigured(what) {
  return statePanel('blocked', 'Identity provider not configured',
    `${what} needs the chosen identity provider. Orb Gym never stores passwords or factors itself, so this stays unavailable until a provider is configured and verified.`,
    '<p class="muted">Refusal code: IDENTITY_PROVIDER_UNCONFIGURED</p>');
}

const syntheticNote = (caps) => (caps.synthetic
  ? statePanel('blocked', 'Development identity (synthetic)', 'You are using the development adapter: fixed synthetic personas, no passwords, no factors, nothing is sent. It refuses to run in production.')
  : '');

function signedInPanel(ctx) {
  const who = ctx.actor?.display_name ?? ctx.session.contact ?? 'this account';
  return `<section class="card"><h2>Signed in</h2><p>You are signed in as <b>${esc(who)}</b>.</p>
    <p><a class="btn linkbtn" href="${app('/space/portfolio-overview')}">Go to portfolio</a></p>
    ${form({ endpoint: '/api/auth/sign-out', kind: 'auth', submit: 'Sign out', next: app('/auth/sign-in') })}</section>`;
}

export function signIn(ctx) {
  const caps = ctx.identity.capabilities();
  if (!caps.sign_in) return unconfigured('Sign-in');
  if (ctx.session) return signedInPanel(ctx);
  const personas = ctx.identity.personas();
  return `${syntheticNote(caps)}
  <section class="card"><h2>Sign in</h2>
    ${form({
      endpoint: '/api/auth/sign-in', kind: 'auth', submit: 'Sign in', next: app('/space/portfolio-overview'),
      fields: [{ name: 'persona', label: 'Synthetic persona', required: true, options: personas.map((p) => ({ value: p.persona, label: `${p.label} — ${p.display_name}` })) }],
    })}
    <p class="muted">No account yet? <a href="${app('/auth/sign-up')}"><u>Sign up</u></a> · <a href="${app('/auth/password-recovery')}"><u>Can't sign in?</u></a></p>
  </section>`;
}

export function signUp(ctx) {
  const caps = ctx.identity.capabilities();
  if (!caps.sign_up) return unconfigured('Sign-up');
  if (ctx.session) return signedInPanel(ctx);
  return `${syntheticNote(caps)}
  <section class="card"><h2>Create an account</h2>
    ${form({
      endpoint: '/api/auth/sign-up', kind: 'auth', submit: 'Create account', next: app('/auth/email-verification'),
      fields: [{ name: 'contact', label: 'Email', type: 'email', required: true, autocomplete: 'email', help: caps.synthetic ? 'Development only accepts reserved addresses ending in .invalid, e.g. you@example.invalid' : '' }],
    })}
    <p class="muted">Creating an account gives no company access. A workspace or an invitation does that.</p>
  </section>`;
}

export function emailVerification(ctx) {
  const caps = ctx.identity.capabilities();
  if (!caps.verify_contact) return unconfigured('Email verification');
  if (!ctx.session) return statePanel('denied', 'Sign in first', 'Verification continues the account you signed up with.', `<p><a href="${app('/auth/sign-in')}"><u>Sign in</u></a></p>`);
  if (ctx.session.verified) {
    return `<section class="card"><h2>Email verified</h2><p>${esc(ctx.session.contact)} is verified.</p>
      <p><a class="btn linkbtn" href="${app('/space/workspace-onboarding')}">Continue to workspace setup</a></p></section>`;
  }
  return `${syntheticNote(caps)}
  <section class="card"><h2>Verify your email</h2><p>We need to confirm ${esc(ctx.session.contact)} before you can create a workspace.</p>
    ${form({ endpoint: '/api/auth/verify', kind: 'auth', submit: caps.synthetic ? 'Confirm (synthetic, nothing is sent)' : 'Confirm', next: app('/space/workspace-onboarding') })}
  </section>`;
}

export function passwordRecovery(ctx) {
  const caps = ctx.identity.capabilities();
  if (!caps.sign_in) return unconfigured('Account recovery');
  return `${syntheticNote(caps)}
  <section class="card"><h2>Recover your account</h2>
    ${form({ endpoint: '/api/auth/recovery', kind: 'auth', submit: 'Send recovery instructions', fields: [{ name: 'contact', label: 'Email', type: 'email', required: true, autocomplete: 'email' }] })}
    <p class="muted">The response is the same whether or not an account exists.</p>
  </section>`;
}

export function mfa(ctx) {
  const caps = ctx.identity.capabilities();
  if (!caps.configured) return unconfigured('Factor enrolment');
  if (!ctx.session) return statePanel('denied', 'Sign in first', 'Factors are enrolled on your own signed-in account.');
  const assurance = ctx.sessions?.find((s) => s.current)?.assurance ?? 'unknown';
  return `${caps.mfa ? '' : statePanel('blocked', 'Factors not supported by this provider',
    'The configured identity adapter has no factor support, so privileged production use stays blocked (WF-AUTH-01: missing capability blocks privileged production readiness). No factor is simulated.',
    '<p class="muted">Refusal code: FACTOR_UNSUPPORTED</p>')}
  <section class="card"><h2>This session</h2><dl class="kv"><dt>Assurance</dt><dd>${esc(assurance)}</dd><dt>Privileged use</dt><dd>${caps.mfa ? 'available after verified enrolment' : 'blocked'}</dd></dl></section>`;
}

export function lostFactor(ctx) {
  const caps = ctx.identity.capabilities();
  const provider = caps.recovery ? '' : statePanel('blocked', 'Factor reset needs the identity provider',
    'Resetting a lost factor happens at the provider. This page only handles the company side: holding a person\'s company access in review until the provider confirms recovery.',
    `<p class="muted">Refusal code: ${caps.configured ? 'FACTOR_UNSUPPORTED' : 'IDENTITY_PROVIDER_UNCONFIGURED'}</p>`);
  if (!ctx.actor?.workspace_id) return provider + statePanel('denied', 'No company context', 'Owner recovery review is opened by an authorised company owner.');
  if (!can(ctx.actor, 'auth.recover_owner')) return provider + statePanel('denied', 'Not available to you', 'Opening a privileged recovery review needs auth.recover_owner.');
  const people = ctx.db.prepare('SELECT * FROM company_person WHERE workspace_id = ? ORDER BY display_name, id').all(ctx.actor.workspace_id);
  return `${provider}
  <section class="card"><h2>Company people</h2>
    ${table([
      { label: 'Person', value: (r) => r.display_name },
      { label: 'Status', html: (r) => status(r.status) },
      { label: 'Next action', html: (r) => (r.status === 'RECOVERY_REVIEW'
        ? '<span class="muted">Completes only from the provider\'s verified recovery result (TR-164)</span>'
        : rowActions(ctx.actor, 'company_person', r, { only: ['OpenPrivilegedRecovery'] })) },
    ], people, { empty: 'No company people.' })}
  </section>`;
}

export function sessionsAndSecurity(ctx) {
  const caps = ctx.identity.capabilities();
  if (!caps.sessions) return unconfigured('Sessions and security');
  if (!ctx.session) return statePanel('denied', 'Sign in first', 'Sessions and security shows your own account only.', `<p><a href="${app('/auth/sign-in')}"><u>Sign in</u></a></p>`);
  const a = ctx.actor;
  const sessions = ctx.sessions ?? [];
  const mine = a?.person_id ? ctx.db.prepare('SELECT * FROM role_assignment WHERE person_id = ? ORDER BY created_at, id').all(a.person_id) : [];
  let company = '';
  if (a?.workspace_id && (can(a, 'access.revoke_grant') || can(a, 'people.restrict'))) {
    const ras = ctx.db.prepare(`SELECT ra.*, cp.display_name AS person FROM role_assignment ra LEFT JOIN company_person cp ON cp.id = ra.person_id
      WHERE ra.workspace_id = ? ORDER BY cp.display_name, ra.id`).all(a.workspace_id);
    const people = ctx.db.prepare('SELECT * FROM company_person WHERE workspace_id = ? ORDER BY display_name, id').all(a.workspace_id);
    // "at least one legitimate owner": the owner grant is not offered for revocation here; ownership transfer has no transition yet
    const ownerRa = ctx.db.prepare('SELECT owner_assignment_id FROM workspace WHERE id = ?').get(a.workspace_id)?.owner_assignment_id;
    company = `
    <section class="card"><h2>Company role assignments</h2>
      ${table([
        { label: 'Person', value: (r) => r.person ?? r.person_id },
        { label: 'Role', value: (r) => r.role_template_id },
        { label: 'Scope', value: (r) => (r.gym_id ? `gym ${r.gym_id}` : r.scope) },
        { label: 'Status', html: (r) => status(r.status) },
        { label: 'Next action', html: (r) => (r.id === ownerRa ? '<span class="muted">Owner grant (transfer not yet specified)</span>' : rowActions(a, 'role_assignment', r, { only: ['RevokeRoleAssignment'] })) },
      ], ras)}
      <p class="muted">Revoking a role takes effect on the person's next request. Ending their provider sessions needs the identity provider.</p>
    </section>
    <section class="card"><h2>Company access</h2>
      ${table([
        { label: 'Person', value: (r) => r.display_name },
        { label: 'Status', html: (r) => status(r.status) },
        { label: 'Next action', html: (r) => (r.id === a.person_id ? '<span class="muted">Your own access</span>'
          : rowActions(a, 'company_person', r, { only: ['RestrictCompanyAccountContext', 'RestoreReviewedAccountContext', 'ArchiveCompanyPersonAccess'] })) },
      ], people)}
    </section>`;
  }
  return `${syntheticNote(caps)}
  <section class="card"><h2>Your account</h2><dl class="kv">
    <dt>Email</dt><dd>${esc(ctx.session.contact ?? '—')}</dd>
    <dt>Verified</dt><dd>${ctx.session.verified ? 'yes' : `no — <a href="${app('/auth/email-verification')}"><u>verify</u></a>`}</dd>
    <dt>Access basis</dt><dd>${esc((a?.grant_basis ?? []).join('; ') || 'no company role')}</dd></dl></section>
  <section class="card"><h2>Your sessions</h2>
    ${table([
      { label: 'Started', value: (r) => r.created_at },
      { label: 'Device', value: (r) => r.user_agent || 'unknown' },
      { label: 'Assurance', value: (r) => r.assurance },
      { label: '', html: (r) => (r.current
        ? form({ endpoint: '/api/auth/sign-out', kind: 'auth', submit: 'Sign out', next: app('/auth/sign-in') })
        : `<form class="orb-form" data-orb data-kind="auth" data-endpoint="/api/auth/revoke-session"><input type="hidden" name="token_id" value="${esc(r.token_id)}"><div class="actions"><button class="btn danger" type="submit">End session</button></div><p class="result" role="status" data-status></p></form>`) },
    ], sessions)}
  </section>
  <section class="card"><h2>Your roles</h2>
    ${table([
      { label: 'Role', value: (r) => r.role_template_id },
      { label: 'Scope', value: (r) => (r.gym_id ? `gym ${r.gym_id}` : r.scope) },
      { label: 'Status', html: (r) => status(r.status) },
    ], mine, { empty: 'You hold no company role.' })}
  </section>${company}`;
}
