# Portfolio finances, operational reports and analytics

Status: populated product specification brief; detailed technical completion pending actual OpenKBS project inspection. Repository 0.20. No application implementation or executed test evidence is implied.

## Product sources

[11-finance-reports-and-analytics.md](../docs/modules/11-finance-reports-and-analytics.md); [10-data-integration-and-verification.md](../docs/modules/10-data-integration-and-verification.md)

Relevant source blocks: OG-SRC-0042, OG-SRC-0088, OG-SRC-0089, OG-SRC-0114, OG-SRC-0115, OG-SRC-0186, OG-SRC-0187, OG-SRC-0222, OG-SRC-0223, OG-SRC-0224. Review additions apply through docs/delivery/source-map.json and the linked active decision/gap records. Source blocks can contain several atomic requirements; do not collapse them into one test or treat illustrative values as configuration.

## Journey and required behaviour

Owner/authorised management filters company/gym/period to inspect membership/class/PT/POS/rent charges, collections, credits/refunds, expenses/commitments and available staff costs. Report and Orb summary link to the actual owning records with definitions, source/freshness and incomplete-data warnings.

## Authoritative records and lifecycle

Financial source records and allocations, commitments/invoices/payment/credit, report definition/period/filter and restricted export job. Do not count a sale/payment/internal split or estimate/commitment/invoice/payment as multiple revenues/expenses. Existing charge collected at till references that debt rather than creating another one.

## Controls and connected consequences

Produce metric catalogue for pipeline/membership/retention, class/PT utilisation/attendance, rota/training, tasks/faults/downtime, stock/till and portfolio comparison. Separate billed/collected/outstanding and planned/actual costs. Profit stays unavailable/incomplete without an agreed basis and complete relevant costs; no statutory accounts claim.

## Decisions and dependencies

GAP02, GAP07, GAP12, GAP14 determine entity/currency/tax/rounding/allocation/accounting basis. Shared invoice/partial payment/refund and async export/AI field scope need explicit evidence. Payroll and accounting integrations are separately scoped.

## Acceptance and implementation completion

Planned cross-module criteria: AC25, AC41, AC45, AC46 in [acceptance-scenarios.md](../docs/acceptance-scenarios.md). The builder decomposes these and source requirements into measurable local success/denied/failure/retry/concurrency/responsive outcomes. Exact values that depend on a policy remain blocked until that choice is resolved.

Before implementation, add inspected current state, precise entities/relations and scoped fields, state transition table/actors/prerequisites, commands/events/provider contracts, screen/component/token states, migration/rollback/recovery, numbered real board references and test evidence requirements. Keep proposed and approved choices separate. Record actual tests only after they run. Follow [AGENTS.md](../AGENTS.md), [planning gaps](../docs/planning-gap-register.md) and [card contract](../docs/board-card-contract.md).

## Feature pipelines — repository 0.20

[Coaches, Rental Arrangements and Hourly PT](../docs/workflows/coach.md), [POS, Till, Inventory and Receipts](../docs/workflows/pos.md), [Finance, Analytics and Reports](../docs/workflows/fin.md), [Orb Assistant and Background Insights](../docs/workflows/ai.md)

The linked workflows are required product-level journeys. Complete their state/actor/guard/notification/exception tables in the technical specification and map FEAT/WF IDs to actual numbered cards and local evidence. Read the [coverage contract](../docs/delivery/workflow-coverage.md); do not implement only the navigation page.

## Operational exception review — edition 0.21

- [WF-POS-09 — Tender succeeded but sale, stock or device confirmation failed](../docs/workflows/pos.md#wf-pos-09)
- [WF-FIN-05 — Partial, duplicate or misallocated payment resolution](../docs/workflows/fin.md#wf-fin-05)
- [WF-COACH-07 — Who sells and collects for a rental-coach class](../docs/workflows/coach.md#wf-coach-07)

Keep these subflows linked to the existing feature/source record. Read [operational decisions](../docs/decisions/operational-decisions.md); Current product routes/defaults are specified; exact tenant values/modes requiring setup and real provider proof must satisfy readiness before activation. Local planned acceptance was extended through AC70.

Connected operational handoff: [WF-MEM-08 — Payment reversal or late failure after membership activation](../docs/workflows/mem.md#wf-mem-08). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-CLASS-07 — Resolve disruption after a class or PT booking is confirmed](../docs/workflows/class.md#wf-class-07). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-SPACE-05 — Archive one gym without abandoning its obligations](../docs/workflows/space.md#wf-space-05). Apply its current authority/decision/record boundaries; it does not invent a new policy.

## Connected completed gap capabilities — 0.22

[imports-reconciliation](imports-reconciliation.md), [juniors-guardians](juniors-guardians.md). Apply the same source records, grants and activation/readiness gates; no duplicated account/task/financial truth or automatic privileges.

Apply the [logical data, field-grant and reporting extension](../docs/data-extension-contracts.md) when completing entities, permissions, metrics and recovery. These are shared responsibilities, not a second account/task/financial engine.


## Dashboard and reporting definitions — 0.27

Use the [metric/reporting contract](../docs/reporting/metric-contract.md) with canonical metric/report catalogues, source maps, setup inputs, synthetic worked reconciliation and planned acceptance. Figures and Orb use identical definitions and scope. Charges/credits/collections/refunds/reversals/allocations/costs are separate. Overlapping gym membership rows cannot be summed as company distinct people. Missing costs/basis are unavailable/incomplete, not zero/profit. Old generic report-catalogue-to-be-prepared wording now means OpenKBS maps the supplied product catalogue to actual schema/providers/queries and verifies it; do not replace settled definitions silently.


## Shared records and lifecycle contract — 0.28

Read the [current shared model](../docs/data/lifecycle-contract.md) and its ENT/REL/SM/TR catalogues, workflow-record map, typed field/command contracts, transition CSV and planned acceptance. This supplies logical record/state/guard/effect/recovery design; OpenKBS must map actual schema/provider status/API/concurrency and evidence. Independent account/employment/membership/payment/entitlement/booking/attendance/task/asset/invoice/publication states cannot be collapsed. No arbitrary status editor or guessed business input is authorised. Original source extracts remain retained.
