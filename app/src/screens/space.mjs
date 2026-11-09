/**
 * SPACE screens SCR-013..017 (cards 24-27). Creation and gym-detail edits use the
 * derived proposals DTR-003..005, which stay blocked until the owner approves them.
 * Lifecycle buttons are the source transitions TR-001..008, offered only when the row's
 * state and the actor's grants allow them; the server rechecks both.
 */
import { esc, statePanel, form, table, status, rowActions, proposalBlocked } from './components.mjs';
import { can } from '../identity/actor.mjs';

const app = (route) => `/app${route}`;
const creation = (ctx, command) => ctx.creations.find((c) => c.command === command);

function needCompany(ctx) {
  if (!ctx.session) {
    return statePanel('denied', 'Sign in first', 'Workspace screens need a signed-in account.', `<p><a href="${app('/auth/sign-in')}"><u>Sign in</u></a></p>`);
  }
  if (!ctx.actor?.workspace_id) {
    return statePanel('empty', 'No workspace yet', 'You are not a member of a company workspace.', `<p><a href="${app('/space/workspace-onboarding')}"><u>Create a workspace</u></a></p>`);
  }
  return null;
}

/** Gyms visible to the actor: all company gyms, or only the assigned gym for gym-scoped roles. */
function gyms(ctx) {
  const a = ctx.actor;
  return a.gym_id
    ? ctx.db.prepare('SELECT * FROM gym WHERE workspace_id = ? AND id = ? ORDER BY display_name').all(a.workspace_id, a.gym_id)
    : ctx.db.prepare('SELECT * FROM gym WHERE workspace_id = ? ORDER BY display_name, id').all(a.workspace_id);
}

const workspaceRow = (ctx) => ctx.db.prepare('SELECT * FROM workspace WHERE id = ?').get(ctx.actor.workspace_id);

function gymForm(ctx, { gym = null } = {}) {
  const cmd = gym ? 'UpdateGymDetails' : 'CreateGym';
  const c = creation(ctx, cmd);
  const perm = gym ? 'workspace.edit_gym' : 'workspace.create_gym';
  if (!can(ctx.actor, perm)) return statePanel('denied', 'Not available to you', `${gym ? 'Editing gym details' : 'Adding a gym'} needs ${perm}.`);
  if (!c.enabled) return proposalBlocked(c, gym ? 'Edit gym details' : 'Add a gym');
  return form({
    endpoint: `/api/create/${cmd}`, submit: gym ? 'Save gym details' : 'Add gym', recordId: gym?.id ?? null, version: gym?.version ?? null,
    fields: [
      { name: 'display_name', label: 'Gym name', required: true, max: 120, value: gym?.display_name },
      { name: 'location', label: 'Location', max: 200, value: gym?.location },
      { name: 'timezone', label: 'Time zone', max: 64, value: gym?.timezone, help: 'IANA zone name, e.g. Europe/London' },
    ],
    note: c.approval === 'proposed' ? `Drafted proposal ${esc(c.creation_id)}, running because ORB_ALLOW_PROPOSED=1 in development.` : '',
  });
}

export function onboarding(ctx) {
  const caps = ctx.identity.capabilities();
  if (!caps.configured) {
    return statePanel('blocked', 'Identity provider not configured',
      'Workspace setup starts with a verified account, and no identity provider is configured.', '<p class="muted">Refusal code: IDENTITY_PROVIDER_UNCONFIGURED</p>');
  }
  const a = ctx.actor;
  const ws = a?.workspace_id ? workspaceRow(ctx) : null;
  const gymCount = ws ? ctx.db.prepare('SELECT COUNT(*) AS n FROM gym WHERE workspace_id = ?').get(ws.id).n : 0;
  const isOwner = ws && ctx.db.prepare("SELECT 1 FROM role_assignment WHERE id = ? AND person_id = ? AND status = 'ACTIVE'").get(ws.owner_assignment_id, a.person_id);
  const create = creation(ctx, 'CreateWorkspaceWithOwner');

  const steps = [
    { title: 'Create account', done: Boolean(ctx.session), body: () => `<a class="btn linkbtn" href="${app('/auth/sign-up')}">Sign up</a> <a href="${app('/auth/sign-in')}"><u>or sign in</u></a>` },
    { title: 'Verify your email', done: Boolean(ctx.session?.verified), body: () => `<a class="btn linkbtn" href="${app('/auth/email-verification')}">Verify</a>` },
    {
      title: 'Create the workspace and your owner access', done: Boolean(ws),
      body: () => (!create.enabled ? proposalBlocked(create, 'Create workspace') : form({
        endpoint: '/api/create/CreateWorkspaceWithOwner', submit: 'Create workspace',
        fields: [
          { name: 'display_name', label: 'Company name', required: true, max: 120 },
          { name: 'owner_display_name', label: 'Your name', required: true, max: 120 },
        ],
        note: 'Creates the workspace, your company person record and your owner role together. Submitting twice cannot create two workspaces.',
      })),
    },
    { title: 'Company details', done: Boolean(ws?.display_name), body: () => '<p class="muted">Company branding and setup sections live in Company Settings and the setup hub.</p>' },
    { title: 'Add your first gym', done: gymCount > 0, body: () => gymForm(ctx) },
    {
      title: 'Finish setup', done: ws?.status && ws.status !== 'ONBOARDING',
      body: () => (gymCount ? rowActions(a, 'workspace', ws, { only: ['CompleteWorkspaceSetup'], next: app('/space/portfolio-overview') }) : '<p class="muted">Add a gym first.</p>'),
    },
  ];
  const current = steps.findIndex((s) => !s.done);
  const list = steps.map((s, i) => `<li class="${s.done ? 'done' : ''}"${i === current ? ' aria-current="step"' : ''}>
      <span class="n" aria-hidden="true">${s.done ? '✓' : i + 1}</span>
      <div class="body"><b>${esc(s.title)}</b>${s.done ? ' <span class="muted">done</span>' : ''}${i === current ? `<div style="margin-top:8px">${s.body()}</div>` : ''}</div></li>`).join('');

  let lifecycle = '';
  if (ws && ws.status !== 'ONBOARDING') {
    lifecycle = `<section class="card"><h2>Workspace lifecycle</h2>
      <dl class="kv"><dt>Workspace</dt><dd>${esc(ws.display_name)}</dd><dt>Status</dt><dd>${status(ws.status)}</dd></dl>
      ${isOwner ? rowActions(a, 'workspace', ws, { only: ['RequestWorkspaceClosure', 'CompleteWorkspaceClosure'] }) : '<p class="muted">Closure is an owner action.</p>'}
      <p class="muted">Ownership transfer is not yet specified: the source defines no transition for it, so it is not offered.</p></section>`;
  }
  return `<section class="card"><h2>${current === -1 ? 'Setup complete' : `Step ${current + 1} of ${steps.length}`}</h2><ol class="steps">${list}</ol>
    ${ws?.status === 'ONBOARDING' ? '<p class="muted">You can leave and come back; setup resumes here.</p>' : ''}</section>${lifecycle}`;
}

export function portfolio(ctx) {
  const stop = needCompany(ctx);
  if (stop) return stop;
  const a = ctx.actor;
  const ws = workspaceRow(ctx);
  const list = gyms(ctx);
  const counts = list.reduce((m, g) => ({ ...m, [g.status]: (m[g.status] ?? 0) + 1 }), {});
  const switcher = a.memberships.length > 1 ? `<section class="card"><h2>Switch company</h2>
    ${form({ endpoint: '/api/auth/workspace', kind: 'auth', submit: 'Switch', fields: [{ name: 'workspace_id', label: 'Company', options: a.memberships.map((m) => ({ value: m.workspace_id, label: `${m.display_name} (${m.status})` })), value: a.workspace_id }] })}</section>` : '';
  return `<section class="card"><h2>${esc(ws.display_name)}</h2>
    <dl class="kv"><dt>Status</dt><dd>${status(ws.status)}</dd><dt>Your access</dt><dd>${esc(a.grant_basis.join('; '))}${a.gym_id ? ` · gym ${esc(a.gym_id)} only` : ''}</dd></dl>
    ${ws.status === 'ONBOARDING' ? `<p><a class="btn linkbtn" href="${app('/space/workspace-onboarding')}">Resume setup</a></p>` : ''}
  </section>
  <div class="grid">${['DRAFT', 'ACTIVE', 'CLOSURE_REVIEW', 'ARCHIVED'].map((s) => `<div class="tile"><b>${counts[s] ?? 0}</b><span class="muted">${esc(s.replace('_', ' ').toLowerCase())} gyms</span></div>`).join('')}</div>
  <section class="card" style="margin-top:14px"><h2>Gyms</h2>
    ${table([
      { label: 'Gym', html: (g) => `<a href="${app('/space/gym-settings')}?gym=${encodeURIComponent(g.id)}"><u>${esc(g.display_name)}</u></a>` },
      { label: 'Location', value: (g) => g.location ?? '—' },
      { label: 'Status', html: (g) => status(g.status) },
    ], list, { empty: 'No gyms yet.' })}
    <p><a href="${app('/space/gym-directory-and-creation')}"><u>Gym directory</u></a></p>
  </section>${switcher}`;
}

function obligationsPanel(ctx, gym) {
  const inv = ctx.obligations(gym.id);
  return `<details class="obligations"${gym.status === 'CLOSURE_REVIEW' ? ' open' : ''}><summary>Open obligations: ${inv.open_total}</summary>
    ${inv.tables.length ? table([
      { label: 'Record type', value: (t) => t.table.replace(/_/g, ' ') },
      { label: 'Open', value: (t) => t.open },
      { label: 'By state', value: (t) => Object.entries(t.by_state).map(([k, v]) => `${k} ${v}`).join(', ') },
    ], inv.tables) : '<p class="muted">No open records reference this gym.</p>'}
    <p class="muted">Every listed obligation should be resolved or deliberately assigned before the archive completes (WF-SPACE-05). This list informs the review; it does not resolve anything.</p>
  </details>`;
}

export function gymDirectory(ctx) {
  const stop = needCompany(ctx);
  if (stop) return stop;
  const list = gyms(ctx);
  return `<section class="card"><h2>Gyms</h2>
    ${table([
      { label: 'Reference', value: (g) => g.id },
      { label: 'Gym', html: (g) => `<a href="${app('/space/gym-settings')}?gym=${encodeURIComponent(g.id)}"><u>${esc(g.display_name)}</u></a>` },
      { label: 'Status', html: (g) => status(g.status) },
      { label: 'Next action', html: (g) => `${rowActions(ctx.actor, 'gym', g)}${['ACTIVE', 'CLOSURE_REVIEW'].includes(g.status) && can(ctx.actor, 'workspace.archive_gym') ? obligationsPanel(ctx, g) : ''}` },
    ], list, { empty: 'No gyms yet. Add the first one below.' })}
  </section>
  ${ctx.actor.gym_id ? '' : `<section class="card"><h2>Add a gym</h2>${gymForm(ctx)}<p class="muted">A new gym starts as a draft and becomes operational only when activated.</p></section>`}`;
}

export function gymSettings(ctx, query) {
  const stop = needCompany(ctx);
  if (stop) return stop;
  const list = gyms(ctx);
  if (!list.length) return statePanel('empty', 'No gyms yet', 'Add a gym first.', `<p><a href="${app('/space/gym-directory-and-creation')}"><u>Gym directory</u></a></p>`);
  const wanted = query.get('gym');
  const gym = list.find((g) => g.id === wanted) ?? (wanted ? null : list[0]);
  if (!gym) return statePanel('denied', 'Gym not available', 'That gym is not in your scope.');
  const picker = list.length > 1 ? `<form method="get" class="actions" style="margin-bottom:12px"><label for="gympick" class="muted">Gym</label>
    <select id="gympick" name="gym">${list.map((g) => `<option value="${esc(g.id)}"${g.id === gym.id ? ' selected' : ''}>${esc(g.display_name)}</option>`).join('')}</select>
    <button type="submit">Open</button></form>` : '';
  const editable = ['DRAFT', 'ACTIVE'].includes(gym.status);
  return `${picker}<section class="card"><h2>${esc(gym.display_name)}</h2>
    <dl class="kv"><dt>Reference</dt><dd>${esc(gym.id)}</dd><dt>Status</dt><dd>${status(gym.status)}</dd><dt>Version</dt><dd>${esc(gym.version)}</dd></dl></section>
  <section class="card"><h2>Gym details</h2>
    ${editable ? gymForm(ctx, { gym }) : statePanel('blocked', 'Details are fixed', `Gym details cannot change while the gym is ${gym.status}.`)}
  </section>
  <section class="card"><h2>Lifecycle</h2>${rowActions(ctx.actor, 'gym', gym)}</section>`;
}

export function platformSupport(ctx) {
  if (!ctx.session) return statePanel('denied', 'Sign in first', 'Platform support needs a signed-in platform operator.', `<p><a href="${app('/auth/sign-in')}"><u>Sign in</u></a></p>`);
  const a = ctx.actor;
  if (!a.platform_admin || !can(a, 'platform.list_workspaces')) {
    return statePanel('denied', 'Platform operators only', 'This console is separate from company access. Company roles, including owner, do not open it.');
  }
  const rows = ctx.db.prepare('SELECT * FROM workspace ORDER BY display_name, id').all();
  return `${statePanel('blocked', 'Service lifecycle only', 'Platform access here covers listing, suspending and restoring workspace service. Entering a company\'s data needs a temporary audited support grant, which no transition defines yet, so none is offered. Suspension and restoration need a reason under TR-002/003 preconditions, but the transitions declare no reason field to record it: a recorded gap.')}
  <section class="card"><h2>Workspaces</h2>
    ${table([
      { label: 'Reference', value: (w) => w.id },
      { label: 'Workspace', value: (w) => w.display_name },
      { label: 'Status', html: (w) => status(w.status) },
      { label: 'Next action', html: (w) => rowActions(a, 'workspace', w, { only: ['SuspendWorkspace', 'RestoreWorkspace'] }) },
    ], rows, { empty: 'No workspaces.' })}
  </section>`;
}
