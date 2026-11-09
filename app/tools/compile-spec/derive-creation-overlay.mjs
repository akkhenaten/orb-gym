#!/usr/bin/env node
/**
 * Derived creation overlay: PROPOSALS ONLY.
 *
 * Finding being resolved: transitions.json moves existing records between states but
 * contains no command that creates a workspace, its owner grant or a gym, although
 * WF-SPACE-01/02 start with exactly those steps. Without them the onboarding and
 * portfolio screens can only display rows that a dev fixture inserted.
 *
 * Each entry below names the records it inserts, the initial state each lands in and
 * the verbatim source text that justifies it. Nothing here is approved: every entry is
 * `approval.status: 'proposed'` and carries the owner question that would approve it.
 * The runtime (src/creation.mjs) refuses a proposed entry unless ORB_ALLOW_PROPOSED=1
 * outside production, so the screens can be exercised in development while the
 * product behaviour stays blocked on the owner's decision (HANDOVER decision 1).
 *
 * The source spec is not modified. Every citation, table, column, state, role and
 * permission is checked against the catalogues and the compiled schema; one mismatch
 * fails the build.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = resolve(HERE, '..', '..');
const REPO_ROOT = resolve(APP_ROOT, '..');
const read = (p) => JSON.parse(readFileSync(join(REPO_ROOT, p), 'utf8'));

const SOURCES = {
  'docs/workflows/catalogue.json': new Map(read('docs/workflows/catalogue.json').workflows.map((w) => [w.workflow_id, w])),
  'docs/data/entity-catalogue.json': new Map(read('docs/data/entity-catalogue.json').entities.map((e) => [e.entity_id, e])),
  'docs/access/role-catalogue.json': new Map(read('docs/access/role-catalogue.json').roles.map((r) => [r.role_id, r])),
  'docs/design/screen-inventory.json': new Map(read('docs/design/screen-inventory.json').screens.map((s) => [s.screen_id, s])),
};
const machines = read('docs/data/state-machines.json').machines;
const sourceCommands = new Set(read('docs/data/transitions.json').transitions.map((t) => t.command));
const permDoc = read('docs/access/permission-catalogue.json');
const permissionIds = new Set((permDoc.permissions ?? permDoc.matrix).map((p) => p.permission_id));
const schema = readFileSync(join(APP_ROOT, 'generated', 'schema.sql'), 'utf8');
const tableColumns = new Map([...schema.matchAll(/CREATE TABLE IF NOT EXISTS (\w+) \(([\s\S]*?)\n\);/g)]
  .map(([, t, body]) => [t, new Set(body.split('\n').map((l) => l.trim().split(/\s+/)[0]).filter((c) => /^[a-z_]+$/.test(c)))]));

const OWNER_QUESTION = 'Approve this creation command as product behaviour? Record your name and the date in approval to enable it outside development.';

const CREATIONS = [
  {
    creation_id: 'DTR-003',
    command: 'CreateWorkspaceWithOwner',
    workflow_id: 'WF-SPACE-01',
    approval: { status: 'proposed', owner_question: OWNER_QUESTION },
    authorization: {
      mode: 'verified_identity',
      requires: [],
      rationale: 'A new owner holds no workspace grant yet; the command requires a signed-in identity whose contact is verified instead.',
    },
    input: [
      { field: 'display_name', target: 'workspace.display_name', required: true, max_length: 120 },
      { field: 'owner_display_name', target: 'company_person.display_name', required: true, max_length: 120 },
    ],
    inserts: [
      { table: 'identity', reuse_when: 'provider_subject already mirrored', fields: ['provider_subject', 'verified_contact_reference'] },
      { table: 'workspace', initial_state: 'ONBOARDING', fields: ['display_name', 'owner_assignment_id', 'workspace_id'] },
      { table: 'company_person', initial_state: 'ACTIVE', fields: ['workspace_id', 'identity_id_optional', 'display_name', 'contact_reference'] },
      {
        table: 'role_assignment', initial_state: 'ACTIVE', fields: ['workspace_id', 'person_id', 'role_template_id', 'scope'],
        fixed: { role_template_id: 'company-owner', scope: 'workspace' },
        state_rationale: 'Inserted ACTIVE, not PENDING: the owner grant is created atomically with the workspace, and a pending owner grant would leave a workspace without a legitimate owner.',
      },
    ],
    idempotency: 'operation id; a replay returns the first result and inserts nothing',
    evidence: [
      { source: 'docs/workflows/catalogue.json', id: 'WF-SPACE-01', field: 'ordered_checkpoints', quote: 'workspace/owner grant atomically' },
      { source: 'docs/workflows/catalogue.json', id: 'WF-SPACE-01', field: 'authoritative_outcome_and_handoff', quote: 'One workspace with at least one legitimate owner' },
      { source: 'docs/workflows/catalogue.json', id: 'WF-SPACE-01', field: 'exceptions_and_policy_branches', quote: 'Retry cannot duplicate workspace' },
      { source: 'docs/workflows/catalogue.json', id: 'WF-SPACE-01', field: 'preconditions', quote: 'Account verification and explicit owner journey' },
      { source: 'docs/data/entity-catalogue.json', id: 'ENT-Workspace', field: 'invariant', quote: 'Owner creation and workspace creation retry-safe together' },
      { source: 'docs/data/entity-catalogue.json', id: 'ENT-Identity', field: 'invariant', quote: 'Unique identity-provider subject' },
      { source: 'docs/access/role-catalogue.json', id: 'company-owner', field: 'scope_kind', quote: 'workspace' },
    ],
    gaps: [
      'Company details after creation: no command edits workspace.display_name, so the name is captured here and is not editable yet.',
      'role_template_id references the baseline role column in docs/access/role-permission-matrix.csv; no tenant role_template row is created.',
    ],
  },
  {
    creation_id: 'DTR-004',
    command: 'CreateGym',
    workflow_id: 'WF-SPACE-02',
    approval: { status: 'proposed', owner_question: OWNER_QUESTION },
    authorization: { mode: 'permission_all_of', requires: ['workspace.create_gym'] },
    workspace_states: ['ONBOARDING', 'ACTIVE'],
    workspace_states_rationale: 'WF-SPACE-01 adds the first gym during onboarding; a suspended, closing or archived workspace is not expanding its portfolio.',
    input: [
      { field: 'display_name', target: 'gym.display_name', required: true, max_length: 120 },
      { field: 'location', target: 'gym.location', required: false, max_length: 200 },
      { field: 'timezone', target: 'gym.timezone', required: false, max_length: 64, format: 'IANA zone name' },
    ],
    inserts: [
      { table: 'gym', initial_state: 'DRAFT', fields: ['workspace_id', 'display_name', 'location', 'timezone', 'gym_id'] },
    ],
    idempotency: 'operation id; a replay returns the first result and inserts nothing',
    evidence: [
      { source: 'docs/workflows/catalogue.json', id: 'WF-SPACE-02', field: 'ordered_checkpoints', quote: 'Create gym' },
      { source: 'docs/workflows/catalogue.json', id: 'WF-SPACE-01', field: 'ordered_checkpoints', quote: 'add first gym' },
      { source: 'docs/workflows/catalogue.json', id: 'WF-SPACE-02', field: 'authoritative_outcome_and_handoff', quote: 'public page begins as draft' },
      { source: 'docs/workflows/catalogue.json', id: 'WF-SPACE-02', field: 'exceptions_and_policy_branches', quote: 'gym creation not a data silo/security bypass' },
      { source: 'docs/data/entity-catalogue.json', id: 'ENT-Gym', field: 'invariant', quote: 'Each gym belongs to exactly one workspace' },
    ],
    gaps: ['No fixed product gym-count limit is applied; WF-SPACE-01 says none is assumed.'],
  },
  {
    creation_id: 'DTR-005',
    command: 'UpdateGymDetails',
    workflow_id: 'WF-SPACE-02',
    approval: { status: 'proposed', owner_question: OWNER_QUESTION },
    authorization: { mode: 'permission_all_of', requires: ['workspace.edit_gym'] },
    kind: 'update',
    table: 'gym',
    record_states: ['DRAFT', 'ACTIVE'],
    record_states_rationale: 'Details of a gym under closure review or archived stay as recorded for its obligation inventory.',
    input: [
      { field: 'display_name', target: 'gym.display_name', required: true, max_length: 120 },
      { field: 'location', target: 'gym.location', required: false, max_length: 200 },
      { field: 'timezone', target: 'gym.timezone', required: false, max_length: 64, format: 'IANA zone name' },
    ],
    inserts: [],
    idempotency: 'operation id plus required expected version; a stale version is refused',
    evidence: [
      { source: 'docs/workflows/catalogue.json', id: 'WF-SPACE-02', field: 'preconditions', quote: 'gym details' },
      { source: 'docs/design/screen-inventory.json', id: 'SCR-016', field: 'name', quote: 'Gym settings' },
    ],
    gaps: ['billing_entity_id is not editable here: assigning a billing entity belongs to the finance setup cards.'],
  },
];

const errors = [];
const stateOf = (table) => machines.find((m) => m.entity_id.replace(/^ENT-/, '').replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase() === table);
for (const c of CREATIONS) {
  const where = `${c.creation_id} ${c.command}`;
  if (sourceCommands.has(c.command)) errors.push(`${where}: collides with a source transition`);
  if (!['proposed', 'approved'].includes(c.approval?.status)) errors.push(`${where}: approval.status must be proposed or approved`);
  if (c.approval?.status === 'approved' && !(c.approval.by && c.approval.date)) errors.push(`${where}: an approval needs by and date`);
  if (!SOURCES['docs/workflows/catalogue.json'].has(c.workflow_id)) errors.push(`${where}: unknown workflow ${c.workflow_id}`);
  for (const p of c.authorization.requires) if (!permissionIds.has(p)) errors.push(`${where}: unknown permission ${p}`);
  if (!c.evidence.length) errors.push(`${where}: no evidence`);
  for (const ev of c.evidence) {
    const rec = SOURCES[ev.source]?.get(ev.id);
    const text = rec ? JSON.stringify(rec[ev.field] ?? '') : '';
    if (!rec) errors.push(`${where}: cites unknown ${ev.source} ${ev.id}`);
    else if (!text.includes(ev.quote)) errors.push(`${where}: quote not verbatim in ${ev.id}.${ev.field}: "${ev.quote}"`);
  }
  const touched = [...c.inserts.map((i) => i.table), ...(c.table ? [c.table] : [])];
  for (const t of touched) if (!tableColumns.has(t)) errors.push(`${where}: no compiled table ${t}`);
  for (const ins of c.inserts) {
    const cols = tableColumns.get(ins.table) ?? new Set();
    for (const f of ins.fields) if (!cols.has(f)) errors.push(`${where}: ${ins.table}.${f} is not a compiled column`);
    if (ins.initial_state) {
      const m = stateOf(ins.table);
      if (!m) errors.push(`${where}: ${ins.table} has no state machine for ${ins.initial_state}`);
      else if (!m.states.includes(ins.initial_state)) errors.push(`${where}: ${ins.initial_state} not in ${m.machine_id}`);
      else if (ins.initial_state !== m.initial_state && !ins.state_rationale) errors.push(`${where}: ${ins.table} lands in ${ins.initial_state}, not ${m.initial_state}, without a rationale`);
    }
    if (ins.fixed?.role_template_id && !SOURCES['docs/access/role-catalogue.json'].has(ins.fixed.role_template_id)) {
      errors.push(`${where}: unknown role ${ins.fixed.role_template_id}`);
    }
  }
  for (const f of c.input) {
    const [t, col] = f.target.split('.');
    if (!tableColumns.get(t)?.has(col)) errors.push(`${where}: input ${f.field} targets unknown column ${f.target}`);
  }
  for (const s of [...(c.workspace_states ?? []), ...(c.record_states ?? [])]) {
    const m = stateOf(c.workspace_states?.includes(s) ? 'workspace' : c.table);
    if (!m?.states.includes(s)) errors.push(`${where}: state ${s} unknown`);
  }
}

const out = {
  edition: '0.36-derived',
  authority: 'PROPOSALS. Not approved product behaviour. Source spec files are not modified; each entry is justified by verbatim quotations checked at build time.',
  runtime_gate: 'src/creation.mjs refuses a proposed entry with PROPOSAL_NOT_APPROVED unless ORB_ALLOW_PROPOSED=1 and NODE_ENV is not production.',
  creations: CREATIONS,
  errors,
};
writeFileSync(join(REPO_ROOT, 'docs', 'derived', 'creation-overlay.json'), JSON.stringify(out, null, 2) + '\n');
writeFileSync(join(APP_ROOT, 'generated', 'creations.mjs'),
  `// GENERATED by tools/compile-spec/derive-creation-overlay.mjs. Do not edit by hand.\nexport const CREATIONS = ${JSON.stringify(CREATIONS, null, 2)};\n`);
if (errors.length) { console.error('CREATION OVERLAY FAILED:\n  - ' + errors.join('\n  - ')); process.exit(1); }
console.log(`OK  ${CREATIONS.length} creation commands derived, ${CREATIONS.filter((c) => c.approval.status === 'proposed').length} proposed`);
