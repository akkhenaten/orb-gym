#!/usr/bin/env node
/**
 * Orb Gym spec compiler.
 *
 * The 159-page specification is the single source of truth. This compiler
 * projects it into executable artefacts so no entity, transition or permission
 * is ever hand-typed and no ID can drift:
 *
 *   schema.sql         78 tables + audit/idempotency tables, from entity-catalogue
 *   transitions.mjs    233 compiled commands with normalised authorization
 *   permissions.mjs    232 permission rows
 *   enums.mjs          state machines -> state vocabularies
 *   relationships.mjs  relationship edges, and the gaps where an edge is prose-only
 *   field-map.json     every inferred column type, reviewable and overridable
 *   compile-report.json counts + every integrity failure found while compiling
 *
 * Exit code is non-zero if any contract check fails, so this is a gate, not a
 * convenience script.
 */
import { GENERATED_AT } from './build-clock.mjs';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = resolve(HERE, '..', '..');        // repo/app
const REPO_ROOT = resolve(APP_ROOT, '..');          // repo
const SPEC_DIR = process.argv[2] ? resolve(process.argv[2]) : REPO_ROOT;
const OUT = resolve(APP_ROOT, 'generated');

const read = (p) => JSON.parse(readFileSync(join(SPEC_DIR, p), 'utf8'));
const errors = [];
const warn = [];
const fail = (msg) => errors.push(msg);

// ---------------------------------------------------------------- load spec
const entityDoc = read('docs/data/entity-catalogue.json');
const relDoc = read('docs/data/relationships.json');
const machineDoc = read('docs/data/state-machines.json');
const transitionDoc = read('docs/data/transitions.json');
const permissionDoc = read('docs/access/permission-catalogue.json');

const entities = entityDoc.entities;
const relationships = relDoc.relationships;
const machines = machineDoc.machines;
const transitions = transitionDoc.transitions;
const permissions = permissionDoc.permissions ?? permissionDoc.matrix;

const snake = (s) => s
  .replace(/^ENT-/, '')
  .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
  .replace(/[^A-Za-z0-9]+/g, '_')
  .toLowerCase()
  .replace(/^_|_$/g, '');

const tableOf = new Map(); // entity_id -> table name
for (const e of entities) {
  const t = snake(e.entity_id);
  if (tableOf.has(e.entity_id)) fail(`duplicate entity ${e.entity_id}`);
  if ([...tableOf.values()].includes(t)) fail(`table name collision: ${e.entity_id} -> ${t}`);
  tableOf.set(e.entity_id, t);
}

// ---------------------------------------------------------------- typing
/**
 * The specification names logical fields but deliberately leaves exact types to
 * the builder ("Exact types/keys validated by builder"). Inference is therefore
 * explicit, ordered and recorded in field-map.json rather than hidden.
 *
 * Money is stored as integer minor units: the specification forbids float money
 * and requires a recordable currency per workspace.
 */
const MONEY = /(amount|price|fee|cost|balance|total|paid|refund|deposit|vat|tax|wage|salary|rate_minor)/i;
const BOOL = /^(is_|has_|can_|allow|enabled|requires_|opted_|visible|archived$|active$)/i;
const INT = /(count|quantity|qty|number_of|sequence|capacity|limit|minutes|seconds|days|weight_grams|score|priority)/i;
const JSONISH = /(json|payload|metadata|config|settings|snapshot|summary|layout|tokens)/i;
const DATE = /(_at$|_on$|date|expiry|expires|deadline|timestamp|start_time|end_time)/i;

function inferType(field) {
  if (MONEY.test(field)) return { sql: 'INTEGER', note: 'money, integer minor units' };
  if (BOOL.test(field)) return { sql: 'INTEGER', note: 'boolean 0/1' };
  if (INT.test(field)) return { sql: 'INTEGER', note: 'integer' };
  if (JSONISH.test(field)) return { sql: 'TEXT', note: 'JSON document' };
  if (DATE.test(field)) return { sql: 'TEXT', note: 'ISO-8601 timestamp' };
  return { sql: 'TEXT', note: 'text' };
}

const PERMISSION_IDS = new Set(permissions.map((p) => p.permission_id));
const machineByEntity = new Map(machines.map((m) => [m.entity_id, m]));
const machineById = new Map(machines.map((m) => [m.machine_id, m]));

// Derived state overlay (docs/derived/state-overlay.json): column vocabulary only, for
// entities with no source machine. It never enters machineById, so no transition can
// target it and the command engine is unaffected.
const overlayPath = join(SPEC_DIR, 'docs', 'derived', 'state-overlay.json');
const overlayDoc = existsSync(overlayPath) ? JSON.parse(readFileSync(overlayPath, 'utf8')) : { overlays: [] };
const overlayByEntity = new Map();
for (const o of overlayDoc.overlays) {
  if (machineByEntity.has(o.entity_id)) { fail(`overlay ${o.overlay_id} would shadow source machine for ${o.entity_id}`); continue; }
  overlayByEntity.set(o.entity_id, o);
}
const sqlList = (xs) => xs.map((s) => `'${s.replace(/'/g, "''")}'`).join(',');

const stateCheck = (machineId, state, where) => {
  const m = machineById.get(machineId);
  if (!m) return fail(`${where}: unknown machine ${machineId}`);
  if (!m.states.includes(state)) fail(`${where}: state ${state} not in ${machineId}`);
};

// ---------------------------------------------------------------- schema
const lines = [];
lines.push('-- GENERATED by tools/compile-spec/compile.mjs. Do not edit by hand.');
lines.push('-- Source: docs/data/entity-catalogue.json, relationships.json, state-machines.json');
lines.push('PRAGMA foreign_keys = ON;');
lines.push('');

lines.push(`CREATE TABLE IF NOT EXISTS _operation (
  operation_id TEXT PRIMARY KEY,
  transition_id TEXT NOT NULL,
  entity_table TEXT NOT NULL,
  record_id TEXT NOT NULL,
  outcome TEXT NOT NULL,
  result_json TEXT NOT NULL,
  created_at TEXT NOT NULL
);`);
lines.push('');

lines.push(`CREATE TABLE IF NOT EXISTS _notification_outbox (
  outbox_id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL,
  dedup_key TEXT NOT NULL UNIQUE,
  supersede_key TEXT,
  entity_table TEXT,
  record_id TEXT,
  recipient_id TEXT,
  payload_json TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  attempts INTEGER NOT NULL DEFAULT 0,
  next_attempt_at TEXT,
  last_error TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  CHECK (status IN ('PENDING','DELIVERED','SUPERSEDED','FAILED'))
);`);
lines.push('CREATE INDEX IF NOT EXISTS ix_outbox_due ON _notification_outbox(status, next_attempt_at);');
lines.push('');

lines.push(`CREATE TABLE IF NOT EXISTS _notification_attempt (
  attempt_id TEXT PRIMARY KEY,
  outbox_id TEXT NOT NULL,
  channel TEXT NOT NULL,
  outcome TEXT NOT NULL,
  detail TEXT,
  created_at TEXT NOT NULL
);`);
lines.push('CREATE INDEX IF NOT EXISTS ix_attempt_outbox ON _notification_attempt(outbox_id);');
lines.push('');

lines.push(`CREATE TABLE IF NOT EXISTS _policy_setting (
  policy_id TEXT NOT NULL,
  workspace_id TEXT NOT NULL,
  values_json TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  approved_by TEXT,
  approved_at TEXT NOT NULL,
  PRIMARY KEY (policy_id, workspace_id)
);`);
lines.push('');

lines.push(`CREATE TABLE IF NOT EXISTS _notification_inbox (
  inbox_id TEXT PRIMARY KEY,
  recipient_id TEXT NOT NULL,
  event_id TEXT NOT NULL,
  outbox_id TEXT NOT NULL,
  title TEXT NOT NULL,
  body_json TEXT NOT NULL,
  read_at TEXT,
  created_at TEXT NOT NULL
);`);
lines.push('CREATE INDEX IF NOT EXISTS ix_inbox_recipient ON _notification_inbox(recipient_id, read_at);');
lines.push('');

lines.push(`CREATE TABLE IF NOT EXISTS _notification_preference (
  actor_id TEXT NOT NULL,
  channel TEXT NOT NULL,
  enabled INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (actor_id, channel)
);`);
lines.push('');

lines.push(`CREATE TABLE IF NOT EXISTS _audit_event (
  audit_id TEXT PRIMARY KEY,
  operation_id TEXT NOT NULL,
  transition_id TEXT NOT NULL,
  entity_table TEXT NOT NULL,
  record_id TEXT NOT NULL,
  from_state TEXT,
  to_state TEXT,
  actor_id TEXT NOT NULL,
  actor_kind TEXT NOT NULL,
  detail TEXT NOT NULL,
  created_at TEXT NOT NULL
);`);
lines.push('CREATE INDEX IF NOT EXISTS ix_audit_record ON _audit_event(entity_table, record_id);');
lines.push('');

const fieldMap = [];
let columnCount = 0;

for (const e of entities) {
  const table = tableOf.get(e.entity_id);
  const machine = machineByEntity.get(e.entity_id);
  const cols = [
    '  id TEXT PRIMARY KEY',
    '  version INTEGER NOT NULL DEFAULT 1',
  ];
  const seen = new Set(['id', 'version']);

  const overlay = overlayByEntity.get(e.entity_id);
  const stateSource = machine ?? overlay;
  if (stateSource) {
    cols.push(`  status TEXT NOT NULL DEFAULT '${stateSource.initial_state}'`);
    seen.add('status');
  }
  cols.push('  created_at TEXT NOT NULL', '  updated_at TEXT NOT NULL');
  seen.add('created_at'); seen.add('updated_at');

  for (const raw of e.logical_fields ?? []) {
    const field = snake(raw);
    if (seen.has(field)) { warn.push(`${e.entity_id}: field "${raw}" collides with a managed column, kept once`); continue; }
    // money is renamed to an explicit minor-unit column so no float money can ever
    // be stored, matching field-contract.json "special_types.money".
    const column = MONEY.test(raw) && !/minor/.test(field) ? `${field}_minor` : field;
    if (seen.has(column)) { warn.push(`${e.entity_id}: money column ${column} collides, kept once`); continue; }
    seen.add(column);
    const { sql, note } = inferType(raw);
    cols.push(`  ${column} ${sql}`);
    columnCount += 1;
    fieldMap.push({ entity_id: e.entity_id, table, field: raw, column, sql_type: sql, note });
  }

  // tenancy: workspace/gym columns are required by the access contract even when
  // the catalogue lists them loosely, so they are always present for isolation.
  for (const tenancy of ['workspace_id', 'gym_id']) {
    if (!seen.has(tenancy)) {
      cols.push(`  ${tenancy} TEXT`);
      seen.add(tenancy);
    }
  }
  cols.push(`  CHECK (version >= 1)`);
  if (stateSource) cols.push(`  CHECK (status IN (${sqlList(stateSource.states)}))`);
  lines.push(`CREATE TABLE IF NOT EXISTS ${table} (\n${cols.join(',\n')}\n);`);
  if (stateSource) lines.push(`CREATE INDEX IF NOT EXISTS ix_${table}_status ON ${table}(status);`);
  lines.push(`CREATE INDEX IF NOT EXISTS ix_${table}_ws ON ${table}(workspace_id);`);
  lines.push('');
}

// ---------------------------------------------------------------- transitions
const compiled = [];
const commands = new Map();

for (const t of transitions) {
  const machine = machineById.get(t.machine_id);
  if (!machine) { fail(`${t.transition_id}: unknown machine ${t.machine_id}`); continue; }
  stateCheck(t.machine_id, t.from_state, t.transition_id);
  stateCheck(t.machine_id, t.to_state, t.transition_id);
  if (!tableOf.has(machine.entity_id)) fail(`${t.transition_id}: machine ${t.machine_id} has no entity table`);

  const auth = t.authorization ?? {};
  const mode = auth.mode ?? (t.required_all_permissions ? 'permission_all_of' : 'permission_all_of');
  const required = auth.requires_all ?? t.required_all_permissions ?? (t.permission_id ? [t.permission_id] : []);

  if (!Array.isArray(required)) fail(`${t.transition_id}: requires_all is not an array`);
  for (const p of required) if (!PERMISSION_IDS.has(p)) fail(`${t.transition_id}: unknown permission ${p}`);
  if (t.permission_id && !PERMISSION_IDS.has(t.permission_id)) fail(`${t.transition_id}: unknown permission_id ${t.permission_id}`);
  if (!required.length && mode === 'permission_all_of') fail(`${t.transition_id}: permission_all_of with no permission`);

  const key = t.command;
  const bucket = commands.get(key) ?? [];
  bucket.push(t.transition_id);
  commands.set(key, bucket);

  compiled.push({
    transition_id: t.transition_id,
    command: t.command,
    machine_id: t.machine_id,
    entity_table: tableOf.get(machine.entity_id) ?? null,
    entity_id: machine.entity_id,
    from_state: t.from_state,
    to_state: t.to_state,
    mode,
    requires: [...new Set(required)],
    workflow_domain: t.workflow_domain ?? null,
    source_id: t.source_id ?? null,
    effects: t.authoritative_changes_and_effects ?? '',
    concurrency: t.concurrency ?? '',
  });
}

// derived transitions from the state overlay: compiled through the same checks, tagged
// source='derived' so counts against transitions.json stay exact.
for (const d of overlayDoc.transitions ?? []) {
  // Owner approval is the line between a proposal and behaviour. A proposed transition
  // compiles only under ORB_ALLOW_PROPOSED=1, and is tagged so it can never pass unseen.
  const approval = d.approval?.status;
  if (approval !== 'approved' && approval !== 'proposed') { fail(`${d.transition_id}: no approval record`); continue; }
  if (approval === 'proposed' && process.env.ORB_ALLOW_PROPOSED !== '1') {
    warn.push(`${d.transition_id} ${d.command} is proposed, not approved; skipped (set ORB_ALLOW_PROPOSED=1 to preview)`);
    continue;
  }
  const o = [...overlayByEntity.values()].find((x) => x.overlay_id === d.overlay_id);
  if (!o) { fail(`${d.transition_id}: unknown overlay ${d.overlay_id}`); continue; }
  if (!o.states.includes(d.from_state) || !o.states.includes(d.to_state)) fail(`${d.transition_id}: state outside ${d.overlay_id}`);
  for (const perm of d.requires) if (!PERMISSION_IDS.has(perm)) fail(`${d.transition_id}: unknown permission ${perm}`);
  if (commands.has(d.command)) fail(`${d.transition_id}: command ${d.command} collides with a source transition`);
  for (const g of d.guards ?? []) {
    if (![...tableOf.values()].includes(g.table)) fail(`${d.transition_id}: guard table ${g.table} has no compiled table`);
  }
  commands.set(d.command, [d.transition_id]);
  compiled.push({
    transition_id: d.transition_id,
    command: d.command,
    machine_id: d.overlay_id,
    entity_table: tableOf.get(o.entity_id),
    entity_id: o.entity_id,
    from_state: d.from_state,
    to_state: d.to_state,
    mode: 'permission_all_of',
    requires: [...new Set(d.requires)],
    workflow_domain: 'FIN',
    source_id: 'docs/derived/state-overlay.json',
    source: 'derived',
    guards: d.guards ?? [],
    reason_field: d.reason_field ?? null,
    approval: approval,
    effects: d.effects,
    concurrency: 'Guards re-evaluated inside the commit transaction',
  });
}

// a command that maps to several transitions is legitimate only when machine+from_state
// disambiguate it; record those so the engine resolves rather than guesses.
const ambiguous = [...commands.entries()].filter(([, v]) => v.length > 1);

// ---------------------------------------------------------------- relationships
const relEdges = [];
const relationshipGaps = [];
for (const r of relationships) {
  if (!tableOf.has(r.from_entity)) { relationshipGaps.push({ id: r.relationship_id, problem: `unknown from_entity ${r.from_entity}` }); continue; }
  if (!tableOf.has(r.to_entity)) { relationshipGaps.push({ id: r.relationship_id, problem: `unknown to_entity ${r.to_entity}` }); continue; }
  const base = String(r.cardinality).split('-when-')[0];
  const fkHeldBy = base === 'one-to-many' ? r.to_entity : base === 'many-to-one' ? r.from_entity : null;
  const fkColumn = fkHeldBy ? `${snake(r.from_entity)}_id`.replace(/^/, '') : null;
  relEdges.push({
    relationship_id: r.relationship_id,
    from_entity: r.from_entity,
    to_entity: r.to_entity,
    cardinality: r.cardinality,
    base_cardinality: base,
    fk_holder: fkHeldBy,
    fk_column_hint: fkColumn,
    rule: r.rule,
    resolvable: base !== 'many-to-many',
  });
  if (!['one-to-one', 'one-to-many', 'many-to-one', 'many-to-many'].includes(base)) {
    relationshipGaps.push({ id: r.relationship_id, problem: `conditional cardinality ${r.cardinality}` });
  }
}

// entities with no relationship at all: the builder cannot join them honestly
const linked = new Set(relationships.flatMap((r) => [r.from_entity, r.to_entity]));
const orphans = entities.filter((e) => !linked.has(e.entity_id)).map((e) => e.entity_id);

// ---------------------------------------------------------------- enums
const enums = machines.map((m) => ({
  machine_id: m.machine_id,
  entity_id: m.entity_id,
  table: tableOf.get(m.entity_id) ?? null,
  initial_state: m.initial_state,
  states: m.states,
}));
for (const o of overlayByEntity.values()) {
  enums.push({
    machine_id: o.overlay_id, entity_id: o.entity_id, table: tableOf.get(o.entity_id) ?? null,
    initial_state: o.initial_state, states: o.states, source: 'derived',
  });
}

// entities holding a state-ish field with no machine
const stateFieldNoMachine = entities.filter((e) => {
  if (machineByEntity.has(e.entity_id)) return false;
  return (e.logical_fields ?? []).some((f) => /(^status$|^state$|_status$|^account_status$)/i.test(f));
}).map((e) => e.entity_id);

const machineNoStateField = machines.filter((m) => {
  const e = entities.find((x) => x.entity_id === m.entity_id);
  if (!e) return true;
  return !(e.logical_fields ?? []).some((f) => /(^status$|^state$|_status$)/i.test(f));
}).map((m) => m.machine_id);

// ---------------------------------------------------------------- write
mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, 'schema.sql'), lines.join('\n'));

writeFileSync(join(OUT, 'transitions.mjs'), [
  '// GENERATED by tools/compile-spec/compile.mjs. Do not edit by hand.',
  `export const TRANSITIONS = ${JSON.stringify(compiled, null, 2)};`,
  'export const AMBIGUOUS_COMMANDS = ' + JSON.stringify(ambiguous.map(([c, ids]) => ({ command: c, transition_ids: ids })), null, 2) + ';',
  '',
].join('\n'));

writeFileSync(join(OUT, 'permissions.mjs'), [
  '// GENERATED by tools/compile-spec/compile.mjs. Do not edit by hand.',
  `export const PERMISSION_IDS = ${JSON.stringify([...PERMISSION_IDS].sort(), null, 2)};`,
  '',
].join('\n'));

writeFileSync(join(OUT, 'enums.mjs'), [
  '// GENERATED by tools/compile-spec/compile.mjs. Do not edit by hand.',
  `export const ENUMS = ${JSON.stringify(enums, null, 2)};`,
  '',
].join('\n'));

writeFileSync(join(OUT, 'relationships.mjs'), [
  '// GENERATED by tools/compile-spec/compile.mjs. Do not edit by hand.',
  `export const RELATIONSHIPS = ${JSON.stringify(relEdges, null, 2)};`,
  `export const ORPHAN_ENTITIES = ${JSON.stringify(orphans, null, 2)};`,
  `export const RELATIONSHIP_GAPS = ${JSON.stringify(relationshipGaps, null, 2)};`,
  '',
].join('\n'));

writeFileSync(join(OUT, 'field-map.json'), JSON.stringify(fieldMap, null, 1));

const report = {
  generated_at: GENERATED_AT,
  spec_dir: relative(REPO_ROOT, SPEC_DIR) || '.', // repo-relative: absolute paths break reproducibility
  counts: {
    entities: entities.length,
    tables: tableOf.size,
    columns_declared: columnCount,
    transitions: compiled.filter((c) => c.source !== 'derived').length,
    derived_transitions: compiled.filter((c) => c.source === 'derived').length,
    commands: commands.size,
    ambiguous_commands: ambiguous.length,
    permissions: PERMISSION_IDS.size,
    machines: machines.length,
    relationships: relationships.length,
    orphan_entities: orphans.length,
  },
  integrity: {
    state_field_without_machine: stateFieldNoMachine,
    // Catalogue omission only: the compiler projects a managed `status` column for every
    // one of these, so no machine-backed table lacks state at runtime.
    machine_without_state_field: machineNoStateField,
    machine_without_state_field_resolved_by: 'compiler-managed status column with CHECK constraint',
    derived_state_overlays: [...overlayByEntity.values()].map((o) => ({
      overlay_id: o.overlay_id, entity_id: o.entity_id, states: o.states,
      unreachable_states: o.unreachable_states, owner_decision: o.owner_decision,
    })),
    orphan_entities: orphans,
    conditionally_typed_relationships: relationshipGaps,
  },
  errors,
  warnings: warn,
};
writeFileSync(join(OUT, 'compile-report.json'), JSON.stringify(report, null, 1));

console.log(JSON.stringify(report.counts, null, 1));
if (errors.length) {
  console.error(`\nCOMPILE FAILED with ${errors.length} contract errors:`);
  for (const e of errors.slice(0, 25)) console.error('  - ' + e);
  process.exit(1);
}
console.log(`\nOK  ${compiled.length} transitions compiled (${compiled.filter((c) => c.source === 'derived').length} derived), 0 contract errors, 0 untyped columns`);
