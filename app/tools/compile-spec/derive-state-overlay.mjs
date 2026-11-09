#!/usr/bin/env node
/**
 * Derived state overlay.
 *
 * Finding being resolved: the reporting catalogue defines MET-FIN-01 as "posted
 * non-void customer charge amounts" and MET-FIN-02 as "valid credit-note amounts ...
 * exclude void/draft credits", yet ENT-CustomerCharge and ENT-CreditNote have no state
 * machine and no state field. The metric definitions presuppose a lifecycle the data
 * model never declares.
 *
 * This tool does not edit the source spec. It records, per entity, the minimum state
 * vocabulary the cited metric text requires, and verifies every citation verbatim
 * against the catalogue so nothing is asserted without evidence. It also verifies the
 * entity really has no machine, so the overlay can never shadow a source machine.
 *
 * What it cannot do is make VOID reachable: no transition in transitions.json creates,
 * voids or issues a charge or credit note. That is reported as an owner decision.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = resolve(HERE, '..', '..');
const REPO_ROOT = resolve(APP_ROOT, '..');
const read = (p) => JSON.parse(readFileSync(join(REPO_ROOT, p), 'utf8'));

const entities = new Map(read('docs/data/entity-catalogue.json').entities.map((e) => [e.entity_id, e]));
const machines = read('docs/data/state-machines.json').machines;
const transitions = read('docs/data/transitions.json').transitions;
const metrics = new Map(read('docs/reporting/metric-catalogue.json').metrics.map((m) => [m.metric_id, m]));

/**
 * Each overlay row: states the cited text names, the initial state a newly stored
 * record represents, and the exact quotation that justifies it.
 */
const OVERLAY = [
  {
    overlay_id: 'DSM-CUSTOMER-CHARGE',
    entity_id: 'ENT-CustomerCharge',
    states: ['POSTED', 'VOID'],
    initial_state: 'POSTED',
    initial_rationale: 'MET-FIN-01 dates charges by "charge-posted time"; a stored charge is a posted charge. No draft stage is named.',
    evidence: [{ metric_id: 'MET-FIN-01', quote: 'posted non-void customer charge amounts' }],
  },
  {
    overlay_id: 'DSM-CREDIT-NOTE',
    entity_id: 'ENT-CreditNote',
    states: ['DRAFT', 'ISSUED', 'VOID'],
    initial_state: 'ISSUED',
    initial_rationale: 'No command drafts a credit note, so a stored credit note represents an issued one. DRAFT is kept in the vocabulary because MET-FIN-02 names it, and stays unreachable until a source transition exists.',
    evidence: [
      { metric_id: 'MET-FIN-02', quote: 'valid credit-note amounts issued in period' },
      { metric_id: 'MET-FIN-02', quote: 'exclude void/draft credits' },
    ],
  },
];

/**
 * Derived transitions (owner-approved 2026-11-09): void is allowed only before anything
 * points at the record; every later correction is a credit note. Permission reuses the
 * existing `finance.reconcile` because the catalogue has no charge-correction permission,
 * and inventing one would extend the authority model without a source row.
 */
const TRANSITIONS = [
  {
    transition_id: 'DTR-001',
    overlay_id: 'DSM-CUSTOMER-CHARGE',
    command: 'VoidCustomerCharge',
    approval: { status: 'approved', by: 'founder', date: '2026-11-09', ref: 'void-before-reference policy' },
    from_state: 'POSTED',
    to_state: 'VOID',
    requires: ['finance.reconcile'],
    reason_field: 'void_reason',
    guards: [
      { type: 'no_referencing_rows', table: 'payment_allocation', column: 'charge_or_invoice_id', code: 'CHARGE_HAS_ALLOCATION' },
      { type: 'no_referencing_rows', table: 'credit_note', column: 'charge_or_invoice_id', code: 'CHARGE_HAS_CREDIT' },
    ],
    effects: 'Void an unallocated, uncredited charge; any charge with a payment allocation or credit note must be corrected by credit note instead',
  },
  {
    transition_id: 'DTR-002',
    overlay_id: 'DSM-CREDIT-NOTE',
    command: 'VoidCreditNote',
    approval: { status: 'approved', by: 'founder', date: '2026-11-09', ref: 'void-before-reference policy' },
    from_state: 'ISSUED',
    to_state: 'VOID',
    requires: ['finance.reconcile'],
    reason_field: 'void_reason',
    guards: [],
    guard_gap: 'No entity references a credit note (PaymentAllocation.charge_or_invoice_id targets charges/invoices), so no allocation guard is derivable; void requires a reason only.',
    effects: 'Void an issued credit note with a recorded reason',
  },
];

const errors = [];
const machineEntities = new Set(machines.map((m) => m.entity_id));

const rows = OVERLAY.map((row) => {
  if (!entities.has(row.entity_id)) errors.push(`${row.overlay_id}: unknown entity ${row.entity_id}`);
  if (machineEntities.has(row.entity_id)) errors.push(`${row.overlay_id}: ${row.entity_id} already has a source machine; overlay would shadow it`);
  if (!row.states.includes(row.initial_state)) errors.push(`${row.overlay_id}: initial ${row.initial_state} not in states`);
  for (const ev of row.evidence) {
    const m = metrics.get(ev.metric_id);
    if (!m) errors.push(`${row.overlay_id}: cites unknown metric ${ev.metric_id}`);
    else if (!m.definition.includes(ev.quote)) errors.push(`${row.overlay_id}: quote not found verbatim in ${ev.metric_id}: "${ev.quote}"`);
  }
  const fields = entities.get(row.entity_id)?.logical_fields ?? [];
  if (fields.some((f) => /^(status|state)$|_status$|_state$/.test(f))) {
    errors.push(`${row.overlay_id}: entity already declares a state-like field`);
  }
  const entityToken = row.entity_id.replace(/^ENT-/, '');
  const reaching = transitions.filter((t) => JSON.stringify(t).includes(entityToken));
  return {
    ...row,
    source: 'derived',
    reachable_states: [row.initial_state],
    unreachable_states: row.states.filter((s) => s !== row.initial_state),
    source_transitions: reaching.map((t) => t.transition_id),
    owner_decision: reaching.length ? null
      : `No transition in transitions.json reaches ${row.entity_id}; ${row.states.filter((s) => s !== row.initial_state).join(', ')} cannot occur until source transitions are added.`,
  };
});

const permissionIds = new Set((read('docs/access/permission-catalogue.json').permissions
  ?? read('docs/access/permission-catalogue.json').matrix).map((p) => p.permission_id));
const sourceCommands = new Set(transitions.map((t) => t.command));
const overlayById = new Map(rows.map((r) => [r.overlay_id, r]));
for (const tr of TRANSITIONS) {
  const o = overlayById.get(tr.overlay_id);
  if (!o) { errors.push(`${tr.transition_id}: unknown overlay ${tr.overlay_id}`); continue; }
  if (!o.states.includes(tr.from_state) || !o.states.includes(tr.to_state)) errors.push(`${tr.transition_id}: state outside ${tr.overlay_id}`);
  if (!tr.approval || !['approved', 'proposed'].includes(tr.approval.status)) errors.push(`${tr.transition_id}: approval.status must be approved or proposed`);
  if (sourceCommands.has(tr.command)) errors.push(`${tr.transition_id}: command ${tr.command} collides with a source transition`);
  for (const p of tr.requires) if (!permissionIds.has(p)) errors.push(`${tr.transition_id}: unknown permission ${p}`);
  for (const g of tr.guards) {
    const ent = [...entities.values()].find((e) => e.entity_id.replace(/^ENT-/, '').replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase() === g.table);
    if (!ent) errors.push(`${tr.transition_id}: guard table ${g.table} unknown`);
    else if (!(ent.logical_fields ?? []).includes(g.column)) errors.push(`${tr.transition_id}: guard column ${g.table}.${g.column} not declared`);
  }
}
// reachability is now computed from derived transitions, not asserted
for (const r of rows) {
  const reach = new Set([r.initial_state]);
  for (const tr of TRANSITIONS.filter((x) => x.overlay_id === r.overlay_id)) if (reach.has(tr.from_state)) reach.add(tr.to_state);
  r.reachable_states = r.states.filter((s) => reach.has(s));
  r.unreachable_states = r.states.filter((s) => !reach.has(s));
  r.derived_transitions = TRANSITIONS.filter((x) => x.overlay_id === r.overlay_id).map((x) => x.transition_id);
  r.owner_decision = r.unreachable_states.length
    ? `${r.unreachable_states.join(', ')} unreachable: no source or derived transition reaches ${r.unreachable_states.length > 1 ? 'them' : 'it'}.`
    : null;
}

const out = {
  edition: '0.35-derived',
  transitions: TRANSITIONS,
  authority: 'Derived overlay. Source spec files are not modified. Each state is justified by a verbatim metric quotation.',
  overlays: rows,
  errors,
};

writeFileSync(join(REPO_ROOT, 'docs', 'derived', 'state-overlay.json'), JSON.stringify(out, null, 2) + '\n');
console.log(JSON.stringify(rows.map((r) => ({ id: r.overlay_id, reachable: r.reachable_states, unreachable: r.unreachable_states, derived: r.derived_transitions })), null, 1));
if (errors.length) { console.error('STATE OVERLAY FAILED:\n  - ' + errors.join('\n  - ')); process.exit(1); }
console.log('OK  overlay derived; every state is quoted from the metric catalogue');
