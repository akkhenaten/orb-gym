/**
 * Identity adapter, session -> actor resolution and the AUTH product screens (cards 02-05).
 * Covers the refusals that must hold without a provider: no sign-in, no fake factor,
 * and the dev adapter never loading in production.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { openDb } from '../src/db.mjs';
import { executeCommand, OUTCOMES } from '../src/engine.mjs';
import { createIdentity, IDENTITY_PROVIDER_UNCONFIGURED } from '../src/identity/index.mjs';
import { resolveSessionActor, can } from '../src/identity/actor.mjs';
import { seedDevPersonas } from '../src/identity/dev-seed.mjs';
import { renderScreen, screenById, FOOTER_TEXT } from '../src/ui.mjs';
import { devContext, product } from './support/screen-context.mjs';
import { PRESETS } from '../generated/theme.mjs';

const AUTH_SCREENS = ['SCR-006', 'SCR-007', 'SCR-008', 'SCR-009', 'SCR-010', 'SCR-011', 'SCR-012'];

const render = (id, ctx, preset = 'basic-01', mode = 'light') => product(renderScreen(screenById(id), { preset, mode, ctx }));
const page = (id, ctx, preset, mode) => renderScreen(screenById(id), { preset, mode, ctx });

test('unconfigured provider refuses every identity call', async () => {
  const id = createIdentity({});
  assert.equal(id.id, 'unconfigured');
  assert.equal(id.capabilities().configured, false);
  for (const call of ['signIn', 'signUp', 'verifyContact', 'challenge', 'enrolFactor', 'listSessions', 'revokeSession', 'signOut', 'beginRecovery']) {
    await assert.rejects(id[call]({}), (e) => e.code === IDENTITY_PROVIDER_UNCONFIGURED && e.status === 503, call);
  }
  assert.equal(id.session('anything'), null);
});

test('dev adapter refuses to load in production, and needs ORB_DEV=1', () => {
  assert.throws(() => createIdentity({ ORB_DEV: '1', NODE_ENV: 'production' }), (e) => e.code === 'DEV_IDENTITY_REFUSED');
  assert.equal(createIdentity({ ORB_IDENTITY: 'dev' }).id, 'unconfigured');
});

test('dev adapter: generic sign-in failure, synthetic contacts only, no factors', async () => {
  const id = createIdentity({ ORB_DEV: '1' });
  await assert.rejects(id.signIn({ persona: 'nobody' }), (e) => e.code === 'SIGN_IN_FAILED' && e.message === 'sign-in did not succeed');
  await assert.rejects(id.signUp({ contact: 'person@gmail.com' }), (e) => e.code === 'SYNTHETIC_CONTACT_REQUIRED');
  const { token } = await id.signUp({ contact: 'new@example.invalid' });
  assert.equal(id.session(token).verified, false);
  await id.verifyContact(token);
  assert.equal(id.session(token).verified, true);
  await assert.rejects(id.challenge(token, {}), (e) => e.code === 'FACTOR_UNSUPPORTED');
  await assert.rejects(id.enrolFactor(token, {}), (e) => e.code === 'FACTOR_UNSUPPORTED');
  const r = await id.beginRecovery({ contact: 'unknown@example.invalid' });
  const r2 = await id.beginRecovery({ contact: 'owner@example.invalid' });
  assert.deepEqual(r, r2, 'recovery response must not reveal whether an account exists');
});

test('sessions: list own, revoke another, sign out ends the current one', async () => {
  const id = createIdentity({ ORB_DEV: '1' });
  const a = await id.signIn({ persona: 'owner' });
  const b = await id.signIn({ persona: 'owner' });
  const other = await id.signIn({ persona: 'gym-manager' });
  const list = await id.listSessions(a.token);
  assert.equal(list.length, 2);
  assert.ok(list.find((s) => s.current));
  await assert.rejects(id.revokeSession(a.token, other.session.token_id), (e) => e.code === 'SESSION_NOT_FOUND');
  await id.revokeSession(a.token, b.session.token_id);
  assert.equal(id.session(b.token), null);
  await id.signOut(a.token);
  assert.equal(id.session(a.token), null);
});

test('actor comes only from stored assignments; gym roles are gym-scoped; platform admin gets platform.* only', async () => {
  const owner = (await devContext('owner')).actor;
  assert.equal(owner.workspace_id, 'ws-dev');
  assert.equal(owner.gym_id, null);
  assert.ok(can(owner, 'workspace.create_gym'));

  const mgr = (await devContext('gym-manager')).actor;
  assert.equal(mgr.gym_id, 'gym-dev-north');
  assert.ok(!can(mgr, 'workspace.archive_gym'));

  const plat = (await devContext('platform-admin')).actor;
  assert.equal(plat.platform_admin, true);
  assert.equal(plat.workspace_id, null);
  assert.ok(plat.grants.length && plat.grants.every((g) => g.startsWith('platform.')));

  const db = openDb(); seedDevPersonas(db);
  assert.equal(resolveSessionActor(db, { subject: 'dev:new:unknown', verified: true }).grants.length, 0);
});

test('an individual deny wins over the role grant', async () => {
  const ctx = await devContext('owner');
  const now = new Date().toISOString();
  ctx.db.prepare(`INSERT INTO individual_override (id, version, created_at, updated_at, workspace_id, person_id, permission_id, effect)
    VALUES ('io-1', 1, ?, ?, 'ws-dev', 'cp-dev-owner', 'workspace.archive_gym', 'DENY')`).run(now, now);
  const actor = resolveSessionActor(ctx.db, ctx.session, { dev: true });
  assert.ok(!can(actor, 'workspace.archive_gym'));
  assert.throws(() => executeCommand({ db: ctx.db, command: 'StartGymArchive', recordId: 'gym-dev-north', actor, operationId: 'deny-1' }),
    (e) => e.outcome === OUTCOMES.DENIED && /individual deny/.test(e.message));
});

test('AUTH screens show the blocked state without a provider, and never a form', async () => {
  const ctx = await devContext(null, { env: {} });
  for (const id of AUTH_SCREENS) {
    const html = render(id, ctx);
    assert.match(html, /IDENTITY_PROVIDER_UNCONFIGURED/, id);
    assert.doesNotMatch(html, /data-orb/, `${id} rendered a form with no provider`);
  }
});

test('every AUTH screen renders in all ten preset/mode combinations with the exact footer', async () => {
  const ctx = await devContext('owner');
  for (const id of AUTH_SCREENS) {
    for (const p of PRESETS) {
      for (const mode of ['light', 'dark']) {
        const html = page(id, ctx, p.preset_id, mode);
        assert.ok(html.includes(`<a href="https://orbsolutions.co.uk">${FOOTER_TEXT}</a>`), `${id} ${p.preset_id} ${mode}`);
        assert.doesNotMatch(html, /Something went wrong/, `${id} failed to build`);
      }
    }
  }
  assert.equal(FOOTER_TEXT, 'Orb Gym - powered by orbsolutions.co.uk');
});

test('MFA screen states factors are unsupported instead of simulating one', async () => {
  const html = render('SCR-010', await devContext('owner'));
  assert.match(html, /FACTOR_UNSUPPORTED/);
  assert.doesNotMatch(html, /data-endpoint="\/api\/auth\/enrol-factor"/);
});

test('sessions screen: own sessions; revoke offered for others but not for the owner grant', async () => {
  const html = render('SCR-012', await devContext('owner'));
  assert.match(html, /Your sessions/);
  assert.match(html, /Owner grant \(transfer not yet specified\)/);
  assert.match(html, /data-endpoint="\/api\/commands\/RevokeRoleAssignment" data-record="ra-dev-gym-manager"/);
  const mgr = render('SCR-012', await devContext('gym-manager'));
  assert.doesNotMatch(mgr, /RevokeRoleAssignment/, 'a manager without access.revoke_grant gets no revoke button');
});

test('lost-factor recovery: company review opens; completion is left to the verified provider result', async () => {
  const ctx = await devContext('owner');
  assert.match(render('SCR-011', ctx), /OpenPrivilegedRecovery/);
  const out = executeCommand({ db: ctx.db, command: 'OpenPrivilegedRecovery', recordId: 'cp-dev-gym-manager', actor: ctx.actor, operationId: 'rec-1' });
  assert.equal(out.to_state, 'RECOVERY_REVIEW');
  assert.match(render('SCR-011', ctx), /verified recovery result \(TR-164\)/);
  assert.throws(() => executeCommand({ db: ctx.db, command: 'CompleteVerifiedRecovery', recordId: 'cp-dev-gym-manager', actor: ctx.actor, operationId: 'rec-2' }),
    (e) => e.outcome === OUTCOMES.DENIED);
  assert.match(render('SCR-011', await devContext('gym-manager')), /Not available to you/);
});
