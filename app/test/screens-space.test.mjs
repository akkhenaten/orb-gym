/**
 * Workspace and gym screens (cards 24-27) and the derived creation proposals DTR-003..005.
 * Proposals must be refused unless ORB_ALLOW_PROPOSED=1 outside production; with the flag
 * they keep the engine's rules: grants, tenant and gym scope, replay, stale version.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { executeCommand, OUTCOMES } from '../src/engine.mjs';
import { executeCreation, creationStatus, proposalsEnabled } from '../src/creation.mjs';
import { resolveSessionActor } from '../src/identity/actor.mjs';
import { obligationInventory, terminalStates } from '../src/obligations.mjs';
import { renderScreen, screenById, FOOTER_TEXT } from '../src/ui.mjs';
import { PRESETS } from '../generated/theme.mjs';
import { CREATIONS } from '../generated/creations.mjs';
import { devContext, product } from './support/screen-context.mjs';

const SPACE_SCREENS = ['SCR-013', 'SCR-014', 'SCR-015', 'SCR-016', 'SCR-017'];
const ON = { ORB_DEV: '1', ORB_ALLOW_PROPOSED: '1' };
const render = (id, ctx, query = '') => product(renderScreen(screenById(id), { preset: 'basic-01', mode: 'light', ctx: { ...ctx, query: new URLSearchParams(query) } }));
const create = (ctx, command, extra, env = ON) => executeCreation({ db: ctx.db, command, actor: ctx.actor, env, ...extra });

/** A newly signed-up, verified person with no company yet. */
async function newcomer(env = ON) {
  const ctx = await devContext(null, { env });
  const { token } = await ctx.identity.signUp({ contact: 'founder@example.invalid' });
  await ctx.identity.verifyContact(token);
  const session = ctx.identity.session(token);
  return { ...ctx, token, session, actor: resolveSessionActor(ctx.db, session, { dev: true }), sessions: await ctx.identity.listSessions(token), creations: creationStatus(env) };
}

test('all three creation commands are drafted proposals, blocked by default and in production', () => {
  assert.equal(CREATIONS.length, 3);
  for (const c of CREATIONS) assert.equal(c.approval.status, 'proposed', c.creation_id);
  assert.equal(proposalsEnabled({}), false);
  assert.equal(proposalsEnabled({ ORB_ALLOW_PROPOSED: '1', NODE_ENV: 'production' }), false);
  assert.equal(proposalsEnabled(ON), true);
});

test('blocked proposal refuses with the owner question and writes nothing', async () => {
  const ctx = await devContext('owner');
  const before = ctx.db.prepare('SELECT COUNT(*) AS n FROM gym').get().n;
  assert.throws(() => create(ctx, 'CreateGym', { operationId: 'b1', payload: { display_name: 'X' } }, { ORB_DEV: '1' }),
    (e) => e.outcome === 'PROPOSAL_NOT_APPROVED' && /Approve this creation command/.test(e.details.owner_question));
  assert.equal(ctx.db.prepare('SELECT COUNT(*) AS n FROM gym').get().n, before);
  assert.match(render('SCR-015', ctx), /PROPOSAL_NOT_APPROVED/);
  assert.doesNotMatch(render('SCR-015', ctx), /\/api\/create\/CreateGym/);
});

test('onboarding: verified identity required; workspace, person and owner grant created together; retry replays', async () => {
  const unverified = await devContext(null, { env: ON });
  const { token } = await unverified.identity.signUp({ contact: 'u@example.invalid' });
  const actor = resolveSessionActor(unverified.db, unverified.identity.session(token), { dev: true });
  assert.throws(() => executeCreation({ db: unverified.db, command: 'CreateWorkspaceWithOwner', actor, env: ON, operationId: 'u1', payload: { display_name: 'A', owner_display_name: 'B' } }),
    (e) => e.outcome === OUTCOMES.DENIED);

  const ctx = await newcomer();
  assert.match(render('SCR-013', ctx), /Step 3 of 6/);
  const payload = { display_name: 'Synthetic Co', owner_display_name: 'Synthetic Founder' };
  const out = create(ctx, 'CreateWorkspaceWithOwner', { operationId: 'w1', payload });
  assert.equal(out.outcome, OUTCOMES.ACCEPTED);
  const again = create(ctx, 'CreateWorkspaceWithOwner', { operationId: 'w1', payload });
  assert.equal(again.outcome, OUTCOMES.REPLAYED);
  assert.equal(again.record_id, out.record_id);
  assert.throws(() => create(ctx, 'CreateWorkspaceWithOwner', { operationId: 'w1', payload: { ...payload, display_name: 'Other' } }),
    (e) => e.outcome === OUTCOMES.CONFLICT, 'same operation id with a changed payload conflicts');
  assert.equal(ctx.db.prepare("SELECT COUNT(*) AS n FROM workspace WHERE display_name = 'Synthetic Co'").get().n, 1);

  const ws = ctx.db.prepare('SELECT * FROM workspace WHERE id = ?').get(out.record_id);
  const ra = ctx.db.prepare('SELECT * FROM role_assignment WHERE id = ?').get(ws.owner_assignment_id);
  assert.equal(ws.status, 'ONBOARDING');
  assert.equal(ra.role_template_id, 'company-owner');
  assert.equal(ra.status, 'ACTIVE');
  const audit = ctx.db.prepare('SELECT entity_table FROM _audit_event WHERE operation_id = ? ORDER BY entity_table').all('w1').map((r) => r.entity_table);
  assert.deepEqual(audit, ['company_person', 'identity', 'role_assignment', 'workspace']);

  const owner = { ...ctx, actor: resolveSessionActor(ctx.db, ctx.session, { dev: true }) };
  assert.match(render('SCR-013', owner), /Step 5 of 6/, 'setup resumes at the first unfinished step');
  const gym = create(owner, 'CreateGym', { operationId: 'g1', payload: { display_name: 'First gym', timezone: 'Europe/London' } });
  assert.equal(gym.to_state, 'DRAFT');
  assert.match(render('SCR-013', owner), /Step 6 of 6/);
  executeCommand({ db: ctx.db, command: 'CompleteWorkspaceSetup', recordId: ws.id, actor: owner.actor, operationId: 's1' });
  const done = render('SCR-013', { ...owner, actor: resolveSessionActor(ctx.db, ctx.session, { dev: true }) });
  assert.match(done, /Setup complete/);
  assert.match(done, /RequestWorkspaceClosure/);
  assert.match(done, /Ownership transfer is not yet specified/);
});

test('create gym validates input and refuses unknown fields', async () => {
  const ctx = await devContext('owner', { env: ON });
  assert.throws(() => create(ctx, 'CreateGym', { payload: { display_name: '', timezone: 'Mars/Base', colour: 'red' } }), (e) => {
    const fields = e.details.problems.map((p) => p.field).sort();
    return e.outcome === OUTCOMES.VALIDATION && fields.join() === 'colour,display_name,timezone';
  });
});

test('gym manager: own gym only, no create, no archive; cross-gym and cross-tenant writes denied', async () => {
  const mgr = await devContext('gym-manager', { env: ON });
  const dir = render('SCR-015', mgr);
  assert.match(dir, /North Studio/);
  assert.doesNotMatch(dir, /South Studio/);
  assert.doesNotMatch(dir, /Add a gym/);
  assert.doesNotMatch(dir, /StartGymArchive/);
  assert.throws(() => create(mgr, 'CreateGym', { payload: { display_name: 'Rogue' } }), (e) => e.outcome === OUTCOMES.DENIED);
  assert.throws(() => executeCommand({ db: mgr.db, command: 'ActivateGym', recordId: 'gym-dev-south', actor: mgr.actor, operationId: 'm1' }),
    (e) => e.outcome === OUTCOMES.DENIED);
  assert.match(render('SCR-016', mgr, 'gym=gym-dev-south'), /Gym not available/);

  const ctx = await newcomer();
  create(ctx, 'CreateWorkspaceWithOwner', { payload: { display_name: 'Other Co', owner_display_name: 'Other' } });
  const other = resolveSessionActor(ctx.db, ctx.session, { dev: true });
  // the dev seed shares this database, so ws-dev's north gym belongs to another tenant
  assert.throws(() => executeCreation({ db: ctx.db, command: 'UpdateGymDetails', actor: other, env: ON, recordId: 'gym-dev-north', expectedVersion: 2, payload: { display_name: 'pwn' } }),
    (e) => e.outcome === OUTCOMES.DENIED && /another workspace/.test(e.message));
});

test('gym details: stale version refused, archived gym details fixed', async () => {
  const ctx = await devContext('owner', { env: ON });
  const g = ctx.db.prepare("SELECT * FROM gym WHERE id = 'gym-dev-north'").get();
  const ok = create(ctx, 'UpdateGymDetails', { recordId: g.id, expectedVersion: g.version, operationId: 'e1', payload: { display_name: 'North Renamed' } });
  assert.equal(ok.version, g.version + 1);
  assert.throws(() => create(ctx, 'UpdateGymDetails', { recordId: g.id, expectedVersion: g.version, operationId: 'e2', payload: { display_name: 'Stale' } }),
    (e) => e.outcome === OUTCOMES.CONFLICT);
  assert.throws(() => create(ctx, 'UpdateGymDetails', { recordId: g.id, operationId: 'e3', payload: { display_name: 'No version' } }),
    (e) => e.outcome === OUTCOMES.VALIDATION);

  executeCommand({ db: ctx.db, command: 'StartGymArchive', recordId: g.id, actor: ctx.actor, operationId: 'a1' });
  executeCommand({ db: ctx.db, command: 'CompleteGymArchive', recordId: g.id, actor: ctx.actor, operationId: 'a2' });
  const row = ctx.db.prepare('SELECT * FROM gym WHERE id = ?').get(g.id);
  assert.throws(() => create(ctx, 'UpdateGymDetails', { recordId: g.id, expectedVersion: row.version, operationId: 'e4', payload: { display_name: 'Too late' } }),
    (e) => e.outcome === OUTCOMES.INVALID_STATE);
  assert.match(render('SCR-016', ctx, `gym=${g.id}`), /Details are fixed/);
});

test('archive review lists open obligations derived from terminal states', async () => {
  const ctx = await devContext('owner');
  assert.deepEqual(terminalStates('role_assignment').sort(), ['EXPIRED', 'REVOKED']);
  const inv = obligationInventory(ctx.db, 'gym-dev-north');
  const tables = inv.tables.map((t) => t.table);
  assert.ok(tables.includes('role_assignment'), 'the manager assignment on north is an open obligation');
  assert.equal(obligationInventory(ctx.db, 'gym-dev-south').open_total, 0);
  assert.match(render('SCR-015', ctx), new RegExp(`Open obligations: ${inv.open_total}`));
});

test('platform console: platform admin only, service lifecycle only', async () => {
  assert.match(render('SCR-017', await devContext('owner')), /Platform operators only/);
  const plat = await devContext('platform-admin');
  const html = render('SCR-017', plat);
  assert.match(html, /SuspendWorkspace/);
  assert.match(html, /temporary audited support grant/);
  const out = executeCommand({ db: plat.db, command: 'SuspendWorkspace', recordId: 'ws-dev', actor: plat.actor, operationId: 'p1' });
  assert.equal(out.to_state, 'SUSPENDED');
  assert.equal(executeCommand({ db: plat.db, command: 'SuspendWorkspace', recordId: 'ws-dev', actor: plat.actor, operationId: 'p1' }).outcome, OUTCOMES.REPLAYED);
  assert.throws(() => executeCommand({ db: plat.db, command: 'ActivateGym', recordId: 'gym-dev-south', actor: plat.actor, operationId: 'p2' }),
    (e) => e.outcome === OUTCOMES.DENIED, 'platform admin has no company grant without a support grant');
  assert.match(render('SCR-017', plat), /RestoreWorkspace/);
});

test('signed-out and company-less visitors get explicit states, not empty pages', async () => {
  const anon = await devContext(null);
  for (const id of ['SCR-014', 'SCR-015', 'SCR-016', 'SCR-017']) assert.match(render(id, anon), /Sign in first/, id);
  const ctx = await newcomer();
  assert.match(render('SCR-014', ctx), /No workspace yet/);
});

test('every SPACE screen renders in all ten preset/mode combinations with the exact footer', async () => {
  for (const persona of ['owner', 'gym-manager', 'platform-admin']) {
    const ctx = await devContext(persona, { env: ON });
    for (const id of SPACE_SCREENS) {
      for (const p of PRESETS) {
        for (const mode of ['light', 'dark']) {
          const html = renderScreen(screenById(id), { preset: p.preset_id, mode, ctx });
          assert.ok(html.includes(`<a href="https://orbsolutions.co.uk">${FOOTER_TEXT}</a>`), `${persona} ${id} ${p.preset_id} ${mode}`);
          assert.doesNotMatch(product(html), /Something went wrong/, `${persona} ${id} failed to build`);
        }
      }
    }
  }
});
