#!/usr/bin/env node
/**
 * UI + delivery-board compiler.
 *
 * Projects two contracts the app needs at runtime and OpenKBS needs at intake:
 *
 *   screens.mjs   the 114 screen registry, routes, components and workflow bindings
 *   theme.mjs     the ten selectable preset modes (five presets x light/dark)
 *   cards.mjs     the OG-REV-011 numbered delivery index, 00..N contiguous
 *   board-index.md  the same index in the human-readable form OpenKBS Board consumes
 *
 * OG-REV-011 requires a contiguous global sequence with parents before children.
 * It also requires prerequisites before dependents. The source feature register
 * carries NO dependency edge (no depends_on field), so prerequisites cannot be
 * derived honestly. This compiler therefore orders by a declared domain
 * precedence and records that limitation in generated/board-report.json instead
 * of inventing edges.
 */
import { GENERATED_AT } from './build-clock.mjs';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = resolve(HERE, '..', '..');
const REPO_ROOT = resolve(APP_ROOT, '..');
const OUT = resolve(APP_ROOT, 'generated');

const read = (p) => JSON.parse(readFileSync(join(REPO_ROOT, p), 'utf8'));
const errors = [];
const notes = [];

const inventory = read('docs/design/screen-inventory.json');
const coverage = read('docs/design/workflow-screen-coverage.json');
const workflows = read('docs/workflows/catalogue.json');
const features = read('docs/workflows/feature-register.json');
const tokens = read('docs/design/theme-tokens.json');
const styles = read('docs/design/style-options.json');
// Read the specification directly: parsing the generated .mjs was fragile and
// silently produced an empty array, which zeroed every screen's command binding.
// Derived overlay transitions bind exactly like source rows, so a screen in their domain
// can act on them. Without this the void policy compiled but no screen could reach it.
const overlayDoc = read('docs/derived/state-overlay.json');
const transitions = [
  ...read('docs/data/transitions.json').transitions,
  ...(overlayDoc.transitions ?? []).map((d) => ({
    transition_id: d.transition_id, command: d.command, machine_id: d.overlay_id,
    from_state: d.from_state, to_state: d.to_state, workflow_domain: 'FIN',
    authorization: { mode: 'permission_all_of', requires_all: d.requires }, source: 'derived',
  })),
];

// ---------------------------------------------------------------- screens
const workflowIds = new Set(workflows.workflows.map((w) => w.workflow_id));
const featureIds = new Set(features.features.map((f) => f.feature_id));

const seenRoutes = new Map();
const screens = inventory.screens.map((s) => {
  let route = (s.route_proposal ?? '').trim();
  if (!route.startsWith('/')) route = `/${route}`;
  route = route.replace(/\/{2,}/g, '/').replace(/\/$/, '') || '/';
  if (seenRoutes.has(route)) {
    errors.push(`duplicate route ${route}: ${seenRoutes.get(route)} and ${s.screen_id}`);
    route = `${route}/${s.screen_id.toLowerCase()}`;
  }
  seenRoutes.set(route, s.screen_id);

  for (const wf of s.workflow_ids ?? []) {
    if (!workflowIds.has(wf)) errors.push(`${s.screen_id}: unknown workflow ${wf}`);
  }

  return {
    screen_id: s.screen_id,
    name: s.name,
    domain: s.domain,
    audience: s.audience,
    route,
    route_status: s.route_status,
    layout: s.layout,
    components: s.components ?? [],
    workflow_ids: s.workflow_ids ?? [],
    device_rule: s.device_rule,
    permission_rule: s.permission_rule,
    access_mode: s.access_mode ?? null,
    status: s.status ?? null,
  };
});
if (screens.length !== 114) errors.push(`expected 114 screens, compiled ${screens.length}`);

// ------------------------------------------------- command bindings per screen
// The specification has no screen -> command edge either. The only defensible
// join is the shared domain vocabulary: a screen's own domain plus the domains of
// its bound workflows. This is a derived binding and is labelled as such.
const snakeName = (s) => s
  .replace(/^ENT-/, '')
  .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
  .replace(/[^A-Za-z0-9]+/g, '_')
  .toLowerCase()
  .replace(/^_|_$/g, '');
const entitiesDoc = read('docs/data/entity-catalogue.json');
const entityTable = new Map(entitiesDoc.entities.map((e) => [e.entity_id, snakeName(e.entity_id)]));
const machinesDoc = read('docs/data/state-machines.json');

const machineEntity = new Map([
  ...machinesDoc.machines.map((m) => [m.machine_id, m.entity_id]),
  ...(overlayDoc.overlays ?? []).map((o) => [o.overlay_id, o.entity_id]),
]);
const machineTable = (machineId) => {
  const entityId = machineEntity.get(machineId);
  return entityId ? (entityTable.get(entityId) ?? null) : null;
};

const wfDomains = new Map(workflows.workflows.map((w) => [w.workflow_id, w.domain]));
const screenCommands = [];
for (const s of screens) {
  const domains = new Set([s.domain, ...[...s.workflow_ids].map((w) => wfDomains.get(w))].filter(Boolean));
  const commands = transitions
    .filter((t) => t.workflow_domain && domains.has(t.workflow_domain))
    .map((t) => ({
      command: t.command,
      transition_id: t.transition_id,
      entity_table: machineTable(t.machine_id),
      from_state: t.from_state,
      to_state: t.to_state,
      mode: t.authorization?.mode ?? 'permission_all_of',
      // the spec stores requirements under authorization.requires_all, not as a
      // flat field; normalise exactly as compile.mjs does so both agree.
      requires: t.authorization?.requires_all ?? t.required_all_permissions
        ?? (t.permission_id ? [t.permission_id] : []),
    }));
  screenCommands.push({ screen_id: s.screen_id, domains: [...domains], commands });
}
const boundCommands = new Set(screenCommands.flatMap((x) => x.commands.map((c) => c.command)));
const commandsPerScreen = screenCommands.map((x) => x.commands.length).sort((a, b) => a - b);
const medianCommands = commandsPerScreen[Math.floor(commandsPerScreen.length / 2)];
const screensWithoutCommands = screenCommands.filter((x) => !x.commands.length).map((x) => x.screen_id);

// ---------------------------------------------------------------- themes
const selectable = new Set(styles.selectable_preset_ids);
const themes = tokens.themes.filter((t) => selectable.has(t.preset_id));
const deferredThemes = tokens.themes.filter((t) => !selectable.has(t.preset_id));
if (themes.length !== selectable.size * 2) {
  errors.push(`expected ${selectable.size * 2} selectable theme modes, got ${themes.length}`);
}
for (const p of selectable) {
  for (const mode of ['light', 'dark']) {
    if (!themes.some((t) => t.preset_id === p && t.mode === mode)) errors.push(`missing theme ${p}/${mode}`);
  }
}

const presets = styles.presets
  .filter((p) => selectable.has(p.preset_id))
  .map((p) => ({ preset_id: p.preset_id, label: p.label }));

// ---------------------------------------------------------------- delivery cards
/**
 * Domain precedence. Foundation domains must land before anything that stores,
 * secures or renders tenant data; operational modules follow.
 * This is a declared ordering, not a derived dependency graph. See header note.
 */
const DOMAIN_ORDER = [
  'AUTH', 'IMPORT', 'LAND', 'SPACE', 'DESIGN', 'RELEASE', 'USER',
  'MEM', 'JUNIOR', 'CLASS', 'COACH', 'TRIAL', 'ENTRY',
  'TASK', 'STAFF', 'CAL', 'POS', 'FIN', 'DOC', 'FEED', 'AI',
];
const domainRank = (d) => {
  const i = DOMAIN_ORDER.indexOf(d);
  if (i === -1) { notes.push(`domain ${d} not in declared precedence, sorted last`); return DOMAIN_ORDER.length; }
  return i;
};

const DOMAIN_LABEL = {
  AUTH: 'Identity, tenancy and access', IMPORT: 'Data import and migration', LAND: 'Public site and landing',
  SPACE: 'Workspace and gym setup', DESIGN: 'Design system, branding and publication',
  RELEASE: 'Release, rollout and feature gating', USER: 'Member and account self-service',
  MEM: 'Membership and billing', JUNIOR: 'Junior and guardian journeys', CLASS: 'Classes, courses and sessions',
  COACH: 'Coaching and PT', TRIAL: 'Trials and onboarding offers', ENTRY: 'Entry, check-in and attendance',
  TASK: 'Tasks, assets and contractors', STAFF: 'Staff, HR and rota', CAL: 'Calendar and resource booking',
  POS: 'Point of sale and retail', FIN: 'Finance, reporting and reconciliation', DOC: 'Documents, signing and evidence',
  FEED: 'Community feed and cases', AI: 'Assisted features',
};

const byDomain = new Map();
for (const f of features.features) {
  if (!byDomain.has(f.domain)) byDomain.set(f.domain, []);
  byDomain.get(f.domain).push(f);
}

const cards = [];
let seq = 0;
const num = () => String(seq++).padStart(2, '0');

const FOUND_ID = 'OG-CARD-FOUND';
cards.push({
  number: num(),
  card_id: FOUND_ID,
  kind: 'parent',
  title: 'Foundations: repository validation and build integrity',
  objective: 'Prove the specification package is internally consistent before any runtime work is trusted.',
  domain: null,
  feature_ids: [],
  workflow_ids: [],
  depends_on: [],
  evidence: ['scripts/validate_*.py (13 gates)', 'repository-manifest.json inventory'],
});

const domainParents = [...byDomain.keys()].sort((a, b) => domainRank(a) - domainRank(b) || a.localeCompare(b));

for (const domain of domainParents) {
  const feats = byDomain.get(domain).slice().sort((a, b) => a.feature_id.localeCompare(b.feature_id, undefined, { numeric: true }));
  const parentNumber = num();
  const parentId = `OG-CARD-${domain}`;
  cards.push({
    number: parentNumber,
    card_id: parentId,
    kind: 'parent',
    title: DOMAIN_LABEL[domain] ?? domain,
    objective: `Deliver the ${domain} area: ${feats.length} feature${feats.length === 1 ? '' : 's'}.`,
    domain,
    feature_ids: feats.map((f) => f.feature_id),
    workflow_ids: feats.flatMap((f) => f.workflow_ids ?? []),
    depends_on: [FOUND_ID],
    evidence: [],
  });
  for (const f of feats) {
    const wfs = f.workflow_ids ?? [];
    const screensForFeature = screens.filter((s) => s.workflow_ids.some((w) => wfs.includes(w)));
    cards.push({
      number: num(),
      card_id: `OG-CARD-${f.feature_id}`,
      kind: 'child',
      title: f.feature,
      objective: f.feature,
      domain,
      feature_id: f.feature_id,
      feature_ids: [f.feature_id],
      workflow_ids: wfs,
      screen_ids: screensForFeature.map((s) => s.screen_id),
      depends_on: [parentId],
      pipeline_document: f.pipeline_document,
      specification_paths: f.specification_paths ?? [],
      coverage_status: f.coverage_status ?? null,
      evidence: [],
    });
  }
}

// OG-REV-011 checks
const numbers = cards.map((c) => c.number);
const unique = new Set(numbers);
if (unique.size !== numbers.length) errors.push('card numbers are not unique');
const contiguous = numbers.every((n, i) => Number(n) === i);
if (!contiguous) errors.push('card numbers are not contiguous from 00');
const numOf = new Map(cards.map((c) => [c.card_id, Number(c.number)]));
for (const c of cards) {
  for (const dep of c.depends_on) {
    const target = cards.find((x) => x.card_id === dep);
    if (!target) { errors.push(`${c.card_id} depends on unknown ${dep}`); continue; }
    if (numOf.get(dep) >= Number(c.number)) errors.push(`${c.card_id} (#${c.number}) is not after its prerequisite ${dep} (#${target.number})`);
  }
  if (c.kind === 'parent') {
    for (const fid of c.feature_ids) {
      const child = cards.find((x) => x.feature_id === fid && x.kind === 'child');
      if (child && Number(child.number) < Number(c.number)) errors.push(`parent ${c.card_id} numbered after its child ${fid}`);
    }
  }
}
const coveredFeatures = new Set(cards.filter((c) => c.kind === 'child').flatMap((c) => c.feature_ids));
for (const f of features.features) {
  if (!coveredFeatures.has(f.feature_id)) errors.push(`feature ${f.feature_id} has no delivery card`);
}

// ---------------------------------------------------------------- coverage honesty
const commandDomains = new Set(transitions.map((t) => t.workflow_domain).filter(Boolean));
const screenDomains = new Set(screens.map((s) => s.domain));
const unmappedDomains = [...commandDomains].filter((d) => !screenDomains.has(d));

// ---------------------------------------------------------------- write
mkdirSync(OUT, { recursive: true });
const banner = '// GENERATED by tools/compile-spec/compile-ui.mjs. Do not edit by hand.\n';

writeFileSync(join(OUT, 'screens.mjs'), `${banner}export const SCREENS = ${JSON.stringify(screens, null, 2)};\n`);
writeFileSync(join(OUT, 'theme.mjs'), `${banner}export const PRESETS = ${JSON.stringify(presets, null, 2)};\nexport const THEMES = ${JSON.stringify(themes, null, 2)};\nexport const DEFERRED_THEMES = ${JSON.stringify(deferredThemes, null, 2)};\n`);
writeFileSync(join(OUT, 'screen-commands.mjs'), `${banner}export const SCREEN_COMMANDS = ${JSON.stringify(screenCommands, null, 2)};\n`);
writeFileSync(join(OUT, 'cards.mjs'), `${banner}export const CARDS = ${JSON.stringify(cards, null, 2)};\n`);

const report = {
  generated_at: GENERATED_AT,
  counts: {
    screens: screens.length,
    presets: presets.length,
    selectable_theme_modes: themes.length,
    deferred_theme_modes: deferredThemes.length,
    cards: cards.length,
    parent_cards: cards.filter((c) => c.kind === 'parent').length,
    child_cards: cards.filter((c) => c.kind === 'child').length,
    features_covered: coveredFeatures.size,
    workflows_total: workflows.workflows.length,
    workflows_bound_to_screen: new Set(screens.flatMap((s) => s.workflow_ids)).size,
  },
  ordering: {
    rule: 'contiguous 00..N, foundations first, parents before their children, domains in declared precedence',
    dependency_edges_in_source: false,
    limitation: 'feature-register.json exposes no depends_on/blocked_by field, so prerequisite ordering between features cannot be derived without inventing data. Ordering is by declared domain precedence and feature_id sequence.',
    domain_precedence: DOMAIN_ORDER,
  },
  coverage: {
    command_domains_without_a_screen: unmappedDomains,
    screen_command_binding: {
      method: 'derived by shared domain vocabulary (screen domain + its workflow domains); the specification declares no screen-to-command edge',
      commands_per_screen_median: medianCommands,
      commands_reachable: boundCommands.size,
      commands_total: transitions.length,
      screens_with_commands: screenCommands.filter((x) => x.commands.length).length,
      screens_without_commands: screensWithoutCommands,
    },
  },
  notes,
  errors,
};
writeFileSync(join(OUT, 'board-report.json'), JSON.stringify(report, null, 1));

// human-readable index for OpenKBS Board intake
const md = [];
md.push('# OpenKBS delivery card index (OG-REV-011)');
md.push('');
md.push('Generated by `app/tools/compile-spec/compile-ui.mjs`. Do not edit by hand.');
md.push('');
md.push(`Global sequence ${cards[0].number} to ${cards[cards.length - 1].number}: ${cards.length} cards `
  + `(${report.counts.parent_cards} parent, ${report.counts.child_cards} child), each number unique and contiguous.`);
md.push('');
md.push('Ordering rule: foundations first, then domains in declared precedence, each parent before its children.');
md.push('');
md.push('**Limitation.** `docs/workflows/feature-register.json` carries no dependency field, so prerequisites between');
md.push('features are not machine-derivable. The sequence is a stable delivery order, not a proven dependency sort.');
md.push('Closing that gap requires adding `depends_on` to the feature register.');
md.push('');
md.push('| # | Card | Kind | Title | Features | Workflows | Screens |');
md.push('|---|------|------|-------|----------|-----------|---------|');
for (const c of cards) {
  md.push(`| ${c.number} | ${c.card_id} | ${c.kind} | ${c.title} | ${(c.feature_ids ?? []).length} | ${(c.workflow_ids ?? []).length} | ${(c.screen_ids ?? []).length} |`);
}
md.push('');
writeFileSync(join(REPO_ROOT, 'docs', 'board-index.md'), md.join('\n'));

console.log(JSON.stringify(report.counts, null, 1));
if (errors.length) {
  console.error(`\nUI COMPILE FAILED with ${errors.length} errors:`);
  for (const e of errors.slice(0, 20)) console.error('  - ' + e);
  process.exit(1);
}
console.log('\nOK  screens, themes and card index compiled with 0 errors');
