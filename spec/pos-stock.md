# POS, payments, live stock and receipts

Status: populated product specification brief; detailed technical completion pending actual OpenKBS project inspection. Repository 0.20. No application implementation or executed test evidence is implied.

## Product sources

[06-pos-and-inventory.md](../docs/modules/06-pos-and-inventory.md); [02-onboarding-membership-retention.md](../docs/modules/02-onboarding-membership-retention.md)

Relevant source blocks: OG-SRC-0028, OG-SRC-0213, OG-SRC-0214, OG-SRC-0215, OG-SRC-0216. Review additions apply through docs/delivery/source-map.json and the linked active decision/gap records. Source blocks can contain several atomic requirements; do not collapse them into one test or treat illustrative values as configuration.

## Journey and required behaviour

Authorised till user receives product quantities by barcode/lookup, prices an eligible basket, takes a configured tender and issues a branded print/member receipt. Unknown barcode offers authorised product linkage/creation; quick sale records description/quantity/price without stocking a product. Support anonymous and member-linked customers.

## Authoritative records and lifecycle

Product/SKU/barcode/price/tax configuration, gym stock/movement ledger, sale/lines/tender/payment, discount/void/refund/credit, till shift and reconciliation. Sale confirmation drives one effective stock deduction; pending/ambiguous tender is reconciled before recollection. Transfers track dispatch/receipt and stocktakes/adjustments retain reasons.

## Controls and connected consequences

Cash/card recording versus actual capture are explicit. Refund and saleable return-to-stock are separate choices. Reprint/delivery never creates another sale. Receipts freeze actual transaction/billing/brand data and link to the same member history. Limit overrides/discounts/refunds and reveal expected versus counted cash differences.

## Decisions and dependencies

Terminal/scanner/printer, insufficient stock, split/partial tenders, exchanges/offline and cash-drawer options require GAP02, GAP08, GAP14. No offline financial mode or new provider is assumed. Confirm stock/cash/callback concurrency and device evidence before real sales.

## Acceptance and implementation completion

Planned cross-module criteria: AC26, AC27, AC28, AC47 in [acceptance-scenarios.md](../docs/acceptance-scenarios.md). The builder decomposes these and source requirements into measurable local success/denied/failure/retry/concurrency/responsive outcomes. Exact values that depend on a policy remain blocked until that choice is resolved.

Before implementation, add inspected current state, precise entities/relations and scoped fields, state transition table/actors/prerequisites, commands/events/provider contracts, screen/component/token states, migration/rollback/recovery, numbered real board references and test evidence requirements. Keep proposed and approved choices separate. Record actual tests only after they run. Follow [AGENTS.md](../AGENTS.md), [planning gaps](../docs/planning-gap-register.md) and [card contract](../docs/board-card-contract.md).

## Feature pipelines — repository 0.20

[POS, Till, Inventory and Receipts](../docs/workflows/pos.md)

The linked workflows are required product-level journeys. Complete their state/actor/guard/notification/exception tables in the technical specification and map FEAT/WF IDs to actual numbered cards and local evidence. Read the [coverage contract](../docs/delivery/workflow-coverage.md); do not implement only the navigation page.

## Operational exception review — edition 0.21

- [WF-POS-09 — Tender succeeded but sale, stock or device confirmation failed](../docs/workflows/pos.md#wf-pos-09)

Keep these subflows linked to the existing feature/source record. Read [operational decisions](../docs/decisions/operational-decisions.md); Current product routes/defaults are specified; exact tenant values/modes requiring setup and real provider proof must satisfy readiness before activation. Local planned acceptance was extended through AC70.

Connected operational handoff: [WF-SPACE-05 — Archive one gym without abandoning its obligations](../docs/workflows/space.md#wf-space-05). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-FIN-05 — Partial, duplicate or misallocated payment resolution](../docs/workflows/fin.md#wf-fin-05). Apply its current authority/decision/record boundaries; it does not invent a new policy.


## Shared records and lifecycle contract — 0.28

Read the [current shared model](../docs/data/lifecycle-contract.md) and its ENT/REL/SM/TR catalogues, workflow-record map, typed field/command contracts, transition CSV and planned acceptance. This supplies logical record/state/guard/effect/recovery design; OpenKBS must map actual schema/provider status/API/concurrency and evidence. Independent account/employment/membership/payment/entitlement/booking/attendance/task/asset/invoice/publication states cannot be collapsed. No arbitrary status editor or guessed business input is authorised. Original source extracts remain retained.


## Recovery-path corrections — 0.33

Read docs/data/recovery-path-contract.md at repository root. Current source grant restoration, actual full/partial/discrepancy transfer resolution, provider late-failure/configured retry and separate training submit/review authority override earlier incomplete transition examples. Actual source evidence/policy/current permission and all prior business guards still apply. No extra provider capability or automatic unreviewed service activation is promised.
