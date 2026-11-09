#!/usr/bin/env node
/**
 * Reporting compiler.
 *
 * The pack declares 62 metrics and 10 report views but records
 * `actual_schema_queries_tested: false`: nothing had ever run the definitions against
 * real tables. This compiler projects the catalogue and pairs each metric with an
 * implementation status, so a report can never present an unimplemented metric as a
 * zero. Only metrics whose source records and fields actually exist in the generated
 * schema are marked implemented; the rest carry the blocking reason.
 */
import { GENERATED_AT } from './build-clock.mjs';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = resolve(HERE, '..', '..');
const REPO_ROOT = resolve(APP_ROOT, '..');
const read = (p) => JSON.parse(readFileSync(join(REPO_ROOT, p), 'utf8'));

const metrics = read('docs/reporting/metric-catalogue.json').metrics;
const reports = read('docs/reporting/report-catalogue.json').reports;
const fixtures = read('docs/reporting/synthetic-fixtures.json');

/**
 * Implemented metrics. Each entry states the concrete schema basis, so the claim is
 * auditable rather than aspirational.
 */
export const IMPLEMENTED = [
  { key: 'posted_charges', metric_id: 'MET-FIN-01', basis: 'SUM(customer_charge.amount_minor) where status is not VOID (derived overlay DSM-CUSTOMER-CHARGE)' },
  { key: 'posted_credits', metric_id: 'MET-FIN-02', basis: 'SUM(credit_note.amount_minor) where status is ISSUED (derived overlay DSM-CREDIT-NOTE)' },
  { key: 'net_charge_activity', metric_id: 'MET-FIN-03', basis: 'posted charges less posted credits' },
  { key: 'confirmed_collections', metric_id: 'MET-FIN-04', basis: 'SUM(payment_allocation.signed_amount_minor) for confirmed attempts, deduplicated by provider_reference so repeated provider callbacks count once' },
  { key: 'refunds', metric_id: 'MET-FIN-05', basis: 'SUM(refund_request.amount_minor) for confirmed refunds' },
];

const unimplemented = [
  { key: 'reversals', reason: 'no reversal movement entity or column exists in the generated schema; a reversal cannot be distinguished from a refund' },
  { key: 'net_collections', reason: 'depends on reversals, which the schema cannot represent' },
  { key: 'retained_allocations', reason: 'requires allocation-vs-collection reconciliation the schema does not expose' },
  { key: 'outstanding_customer_balance', reason: 'opening_debts have no entity; the fixture models them with provenance prose only' },
  { key: 'unapplied_customer_funds', reason: 'payment_attempt carries no amount column, so an unapplied payment cannot be valued' },
  { key: 'gym_net_charge_A', reason: 'charge gym allocation lines are not a schema entity; gym_id is single-valued per charge' },
  { key: 'gym_net_charge_B', reason: 'charge gym allocation lines are not a schema entity, so the second gym share of a split charge cannot be read back' },
  { key: 'supplier_open_commitment', reason: 'supplier commitment amount is not declared on supplier_assignment' },
  { key: 'supplier_outstanding_invoice', reason: 'supplier_invoice exists but no approved commitment basis is declared' },
  { key: 'company_active_beneficiaries', reason: 'beneficiary status basis requires a people-state field the schema does not carry' },
  { key: 'home_gym_A', reason: 'home gym versus entitlement scope requires a declared selection the schema does not carry' },
  { key: 'home_gym_B', reason: 'home gym versus entitlement scope needs a declared per-member selection that the schema does not carry' },
  { key: 'entitled_gym_A', reason: 'entitlement scope is not a generated relation' },
  { key: 'entitled_gym_B', reason: 'entitlement scope is not a generated relation, so a second gym entitlement cannot be counted' },
  { key: 'class_booking_percent', reason: 'no class booking entity in the generated schema' },
  { key: 'reviewed_attendance_percent', reason: 'no attendance register entity in the generated schema' },
  { key: 'register_coverage_percent', reason: 'no register coverage entity in the generated schema' },
  { key: 'stock_source_sellable', reason: 'stock_movement carries no quantity column' },
  { key: 'stock_destination_sellable', reason: 'stock_movement stores no quantity, so sellable destination units cannot be summed' },
  { key: 'stock_in_transit', reason: 'stock_transfer records dispatch evidence but no unit quantities, so in-transit stock cannot be valued' },
  { key: 'stock_network_sellable', reason: 'a network total needs per-location quantities, and no quantity column exists on any stock table' },
];

const errors = [];
const metricIds = new Set(metrics.map((m) => m.metric_id));
const LABEL_GUARD = {
  posted_charges: /posted charges/i,
  posted_credits: /posted credits/i,
  net_charge_activity: /net charge/i,
  confirmed_collections: /collection/i,
  refunds: /refund/i,
};
const metricById = new Map(metrics.map((m) => [m.metric_id, m]));
for (const impl of IMPLEMENTED) {
  if (!metricIds.has(impl.metric_id)) { errors.push(`implemented metric ${impl.metric_id} is not in the catalogue`); continue; }
  // An ID that exists is not enough: the catalogue label must describe what the SQL computes.
  const label = metricById.get(impl.metric_id).label;
  const guard = LABEL_GUARD[impl.key];
  if (!guard) errors.push(`${impl.key} has no label guard`);
  else if (!guard.test(label)) errors.push(`${impl.key} is bound to ${impl.metric_id} "${label}", which does not describe it`);
}
const implKeys = new Set(IMPLEMENTED.map((i) => i.key));
const expectedKeys = Object.keys(fixtures.expected ?? {});
const unavailable = expectedKeys.filter((k) => typeof fixtures.expected[k] === 'string' && fixtures.expected[k].startsWith('unavailable'));

const covered = new Set([...implKeys, ...unimplemented.map((u) => u.key), ...unavailable]);
for (const k of expectedKeys) {
  if (!covered.has(k)) errors.push(`fixture expectation "${k}" has neither an implementation nor a recorded reason`);
}

const report = {
  generated_at: GENERATED_AT,
  counts: {
    metrics: metrics.length,
    report_views: reports.length,
    implemented: IMPLEMENTED.length,
    requires_field_mapping: unimplemented.length,
    unavailable_by_design: unavailable.length,
    fixture_expectations: expectedKeys.length,
  },
  schema_query_testing: {
    previously_recorded: false,
    now: 'five money metrics execute as real SQL against generated tables and are asserted against the pack\u2019s own synthetic fixtures',
    still_false_for: [...unimplemented.map((u) => u.key), ...unavailable],
  },
  report_views: reports.map((r) => ({
    report_id: r.report_id,
    name: r.name,
    metric_ids: r.metric_ids,
    metric_count: r.metric_ids.length,
    implemented_count: r.metric_ids.filter((id) => IMPLEMENTED.some((i) => i.metric_id === id)).length,
  })),
  unimplemented,
  errors,
};

writeFileSync(join(APP_ROOT, 'generated', 'reporting.mjs'),
  '// GENERATED by tools/compile-spec/compile-reporting.mjs. Do not edit by hand.\n'
  + `export const METRICS = ${JSON.stringify(metrics.map((m) => ({ metric_id: m.metric_id, label: m.label, domain: m.domain, unit: m.unit, date_basis: m.date_basis ?? null, definition: m.definition })), null, 2)};\n`
  + `export const REPORT_VIEWS = ${JSON.stringify(report.report_views, null, 2)};\n`
  + `export const IMPLEMENTED_METRICS = ${JSON.stringify(IMPLEMENTED, null, 2)};\n`
  + `export const UNIMPLEMENTED_METRICS = ${JSON.stringify(unimplemented, null, 2)};\n`);
writeFileSync(join(APP_ROOT, 'generated', 'reporting-report.json'), JSON.stringify(report, null, 1));

console.log(JSON.stringify(report.counts, null, 1));
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('\nOK  reporting compiled; no metric is silently zero');
