/**
 * Contract tests for the compiled UI, theme and delivery-board artefacts.
 * These assert the specification's own rules (OG-REV-011 numbering, preset
 * selectability, screen/workflow referential integrity) against what was
 * actually generated, not against intent.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { SCREENS } from '../generated/screens.mjs';
import { PRESETS, THEMES, DEFERRED_THEMES } from '../generated/theme.mjs';
import { CARDS } from '../generated/cards.mjs';
import { SCREEN_COMMANDS } from '../generated/screen-commands.mjs';
import { renderIndex, renderScreen, screenByRoute, findTheme } from '../src/ui.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, '..', '..');
const workflows = JSON.parse(readFileSync(join(REPO, 'docs/workflows/catalogue.json'), 'utf8'));
const features = JSON.parse(readFileSync(join(REPO, 'docs/workflows/feature-register.json'), 'utf8'));

test('114 screens compiled with unique, absolute routes', () => {
  assert.equal(SCREENS.length, 114);
  const routes = SCREENS.map((s) => s.route);
  assert.equal(new Set(routes).size, routes.length, 'duplicate screen route');
  for (const r of routes) assert.ok(r.startsWith('/'), `route ${r} is not absolute`);
});

test('every bound workflow exists in the workflow catalogue', () => {
  const ids = new Set(workflows.workflows.map((w) => w.workflow_id));
  for (const s of SCREENS) {
    for (const w of s.workflow_ids) assert.ok(ids.has(w), `${s.screen_id} binds unknown ${w}`);
  }
});

test('five selectable presets, each with both modes', () => {
  assert.equal(PRESETS.length, 5);
  assert.equal(THEMES.length, 10);
  assert.equal(DEFERRED_THEMES.length, 2, 'deferred preset should keep its two token sets');
  for (const p of PRESETS) {
    for (const mode of ['light', 'dark']) {
      assert.ok(THEMES.some((t) => t.preset_id === p.preset_id && t.mode === mode), `missing ${p.preset_id}/${mode}`);
    }
  }
});

test('presets differ where the contract says they differ', () => {
  const light = THEMES.filter((t) => t.mode === 'light');
  const distinct = (pick) => new Set(light.map(pick)).size;

  // Each preset is a different treatment: canvas, shape and effects are all distinct.
  assert.equal(distinct((t) => t.semantic?.canvas), 5, 'two presets share a canvas token');
  assert.equal(distinct((t) => JSON.stringify(t.shape)), 5, 'two presets share a shape contract');
  assert.equal(distinct((t) => JSON.stringify(t.effects)), 5, 'two presets share an effects contract');
  assert.ok(distinct((t) => JSON.stringify(t.typography)) >= 4, 'typography barely differs');

  // Brand inheritance: the accent is the customer's brand, so presets must NOT change it.
  assert.equal(distinct((t) => t.semantic?.accent), 1, 'a preset overrode the brand accent');

  // These groups are shared by design; changing them per preset would be a spec deviation.
  for (const group of ['spacing', 'size', 'motion']) {
    assert.equal(distinct((t) => JSON.stringify(t[group])), 1, `${group} must be shared across presets`);
  }
});

test('theme lookup falls back instead of returning undefined', () => {
  assert.ok(findTheme('not-a-preset', 'light'));
  assert.ok(findTheme('glass-04', 'dark'));
});

test('screen renderer emits the screen it was given', () => {
  const s = screenByRoute('/design/style-and-branding');
  assert.ok(s, 'SCR-075 route not found');
  const html = renderScreen(s, { preset: 'console-05', mode: 'light' });
  assert.match(html, /Style and branding/);
  assert.match(html, /SCR-075/);
  assert.match(html, /--canvas:/);
});

test('index renders one tile per screen', () => {
  const html = renderIndex({ preset: 'basic-01', mode: 'dark' });
  assert.equal((html.match(/class="tile"/g) ?? []).length, 114);
});

test('OG-REV-011: numbers are unique and contiguous from 00', () => {
  const numbers = CARDS.map((c) => Number(c.number));
  assert.equal(new Set(numbers).size, numbers.length, 'duplicate card number');
  numbers.forEach((n, i) => assert.equal(n, i, `gap at position ${i}`));
});

test('OG-REV-011: every parent is numbered before its children', () => {
  const numOf = new Map(CARDS.map((c) => [c.card_id, Number(c.number)]));
  for (const parent of CARDS.filter((c) => c.kind === 'parent')) {
    for (const fid of parent.feature_ids ?? []) {
      const child = CARDS.find((c) => c.kind === 'child' && c.feature_id === fid);
      assert.ok(child, `parent ${parent.card_id} lists ${fid} with no child card`);
      assert.ok(Number(child.number) > Number(parent.number), `${child.card_id} numbered before parent`);
    }
  }
});

test('OG-REV-011: every prerequisite is numbered before its dependent', () => {
  const numOf = new Map(CARDS.map((c) => [c.card_id, Number(c.number)]));
  for (const c of CARDS) {
    for (const dep of c.depends_on ?? []) {
      assert.ok(numOf.has(dep), `${c.card_id} depends on unknown ${dep}`);
      assert.ok(numOf.get(dep) < Number(c.number), `${c.card_id} not after prerequisite ${dep}`);
    }
  }
});

test('every feature in the register has exactly one child card', () => {
  const childFeatures = CARDS.filter((c) => c.kind === 'child').flatMap((c) => c.feature_ids);
  assert.equal(childFeatures.length, features.features.length);
  for (const f of features.features) {
    assert.equal(childFeatures.filter((x) => x === f.feature_id).length, 1, `${f.feature_id} card count`);
  }
});

test('the board index is written for OpenKBS intake and lists every card', () => {
  const p = join(REPO, 'docs/board-index.md');
  assert.ok(existsSync(p), 'docs/board-index.md missing');
  const md = readFileSync(p, 'utf8');
  const rows = md.split('\n').filter((l) => /^\| \d+ \| OG-CARD-/.test(l));
  assert.equal(rows.length, CARDS.length, 'board index row count differs from compiled cards');
  assert.match(md, /no dependency field/, 'the missing-dependency limitation must be stated');
});

test('screen-to-command binding reaches every command', () => {
  const reachable = new Set(SCREEN_COMMANDS.flatMap((s) => s.commands.map((c) => c.command)));
  // every compiled command, source (233) plus derived (2), must be reachable from a screen
  assert.equal(reachable.size, TRANSITIONS.length, 'not every command is reachable from a screen');
  assert.equal(TRANSITIONS.filter((t) => t.source !== 'derived').length, 233);
  assert.ok(SCREEN_COMMANDS.filter((s) => s.commands.length).length >= 100, 'too few screens bound to commands');
});

test('every bound command carries its authorization requirements', () => {
  const permissions = new Set(JSON.parse(readFileSync(join(REPO, 'docs/access/permission-catalogue.json'), 'utf8'))
    .permissions.map((p) => p.permission_id));
  const modes = new Set();
  for (const s of SCREEN_COMMANDS) {
    for (const c of s.commands) {
      modes.add(c.mode);
      for (const p of c.requires) assert.ok(permissions.has(p), `${c.command} requires unknown ${p}`);
      // Only permission_all_of needs named permissions. verified_source_actor is
      // proof-based and context_routes is route-based, so an empty list is correct.
      if (c.mode === 'permission_all_of') {
        assert.ok(c.requires.length > 0, `${c.command} is permission_all_of with no permission`);
      }
    }
  }
  assert.deepEqual([...modes].sort(), ['context_routes', 'permission_all_of', 'verified_source_actor'],
    'all three authorization modes must appear across bound commands');
});

// ---------------------------------------------------------------- live records data plane
import { openDb } from '../src/db.mjs';
import { listRecords, createFixture, nextActions, screenTables, RecordError } from '../src/records.mjs';
import { executeCommand } from '../src/engine.mjs';
import { TRANSITIONS } from '../generated/transitions.mjs';

test('screen tables are derived from bound commands only', () => {
  for (const b of SCREEN_COMMANDS) {
    const expected = [...new Set(b.commands.map((c) => c.entity_table))].sort();
    assert.deepEqual(screenTables(b.screen_id), expected, b.screen_id);
  }
  assert.deepEqual(screenTables('SCR-NOPE'), []);
});

test('fixture creation is refused outside dev mode', () => {
  const db = openDb();
  assert.throws(() => createFixture(db, 'workspace', {}, { workspaceId: 'ws-1' }), (e) => e.code === 'CREATION_COMMAND_ABSENT');
});

test('a dev fixture lands in the initial state and lists with valid next actions', () => {
  const db = openDb();
  const r = createFixture(db, 'customer_charge', { amount_minor: 1200, currency: 'GBP' }, { workspaceId: 'ws-1', dev: true });
  assert.equal(r.provenance, 'dev-fixture');
  assert.equal(r.record.status, 'POSTED');
  assert.deepEqual(r.record.next_actions.map((a) => a.command), ['VoidCustomerCharge']);
  const list = listRecords(db, 'customer_charge', { workspaceId: 'ws-1' });
  assert.equal(list.count, 1);
  assert.equal(list.records[0].next_actions[0].reason_field, 'void_reason');
});

test('fixtures refuse managed, unknown and cross-tenant fields', () => {
  const db = openDb();
  const dev = { workspaceId: 'ws-1', dev: true };
  assert.throws(() => createFixture(db, 'customer_charge', { status: 'VOID' }, dev), (e) => e.code === 'MANAGED_FIELDS');
  assert.throws(() => createFixture(db, 'customer_charge', { workspace_id: 'ws-2' }, dev), (e) => e.code === 'MANAGED_FIELDS');
  assert.throws(() => createFixture(db, 'customer_charge', { nonsense: 1 }, dev), (e) => e.code === 'UNKNOWN_FIELDS');
  assert.throws(() => createFixture(db, 'sqlite_master', {}, dev), (e) => e.code === 'UNKNOWN_TABLE');
});

test('listing is tenant-scoped and refuses unknown tables', () => {
  const db = openDb();
  createFixture(db, 'customer_charge', {}, { workspaceId: 'ws-1', dev: true });
  assert.equal(listRecords(db, 'customer_charge', { workspaceId: 'ws-2' }).count, 0);
  assert.throws(() => listRecords(db, 'customer_charge', {}), (e) => e.code === 'WORKSPACE_REQUIRED');
  assert.throws(() => listRecords(db, 'users; DROP TABLE x', { workspaceId: 'ws-1' }), (e) => e.code === 'UNKNOWN_TABLE');
});

test('next actions match the state machine for every compiled transition', () => {
  for (const t of TRANSITIONS) {
    assert.ok(nextActions(t.entity_table, t.from_state).some((a) => a.transition_id === t.transition_id), t.transition_id);
  }
  assert.deepEqual(nextActions('customer_charge', 'VOID'), []);
});

test('a row action moves state and the list reflects it', () => {
  const db = openDb();
  const { record } = createFixture(db, 'customer_charge', {}, { workspaceId: 'ws-1', dev: true });
  const act = record.next_actions[0];
  executeCommand({ db, command: act.command, recordId: record.id, expectedVersion: record.version,
    actor: { id: 'a', kind: 'user', grants: act.requires, denied: [], workspace_id: 'ws-1' }, payload: { void_reason: 'test' } });
  const after = listRecords(db, 'customer_charge', { workspaceId: 'ws-1' }).records[0];
  assert.equal(after.status, 'VOID');
  assert.equal(after.version, 2);
  assert.deepEqual(after.next_actions, []);
});

test('rendered screens carry the live records panel only when tables are bound', () => {
  const bound = SCREEN_COMMANDS.find((b) => b.commands.length);
  const unbound = SCREENS.find((s) => !screenTables(s.screen_id).length);
  assert.match(renderScreen(SCREENS.find((s) => s.screen_id === bound.screen_id), { preset: 'basic-01', mode: 'light' }), /Live records/);
  if (unbound) assert.doesNotMatch(renderScreen(unbound, { preset: 'basic-01', mode: 'light' }), /id="live"/);
});
