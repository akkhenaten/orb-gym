# Rental coaches, employed coaches and hourly PT

Status: populated product specification brief; detailed technical completion pending actual OpenKBS project inspection. Repository 0.20. No application implementation or executed test evidence is implied.

## Product sources

[03-classes-coaches-and-attendance.md](../docs/modules/03-classes-coaches-and-attendance.md)

Relevant source blocks: OG-SRC-0048, OG-SRC-0049, OG-SRC-0066, OG-SRC-0067, OG-SRC-0068, OG-SRC-0069, OG-SRC-0070, OG-SRC-0071, OG-SRC-0072, OG-SRC-0073, OG-SRC-0074, OG-SRC-0075, OG-SRC-0076, OG-SRC-0077, OG-SRC-0078, OG-SRC-0079, OG-SRC-0080, OG-SRC-0081, OG-SRC-0082, OG-SRC-0083, OG-SRC-0084, OG-SRC-0085, OG-SRC-0086, OG-SRC-0087, OG-SRC-0088, OG-SRC-0089. Review additions apply through docs/delivery/source-map.json and the linked active decision/gap records. Source blocks can contain several atomic requirements; do not collapse them into one test or treat illustrative values as configuration.

## Journey and required behaviour

Management assigns independent rental or employed arrangement per coach/gym/effective period. Rental coaches manage their limited profile/agreement/rent/resource/own-class scope. Employed coaches use staff tools plus assigned clients, appointments, attendance and own earnings. Public approved cards draw from these records.

## Authoritative records and lifecycle

Coach arrangement/agreement, rental terms/invoices/payment allocation, qualification, hourly customer-rate version/default/override, PT appointment/resource, assigned client relationship, PT-only grant and revenue-allocation statement. Snapshot rate/duration/charge/rule at appointment; customer prices, wages, rent and internal gym share stay separate.

## Controls and connected consequences

Coach invitation QR prompts signup/forms and is never a gym entry pass. Eligible PT-only client receives a personal time/gym-bound pass and limited app tools. Membership upgrades the same account after normal payment/approval, preserving history. Rental client handling does not become a full independent CRM. Prepaid PT bundles remain excluded.

## Decisions and dependencies

Resolve PT booking authority, billing increments/timing/buffers, rental rules and employed split basis/trigger/payroll handoff under GAP06–07 and GAP12. Coach changes/absence/offboarding resolve future sessions and permissions without copying private client data.

## Acceptance and implementation completion

Planned cross-module criteria: AC11, AC12, AC13, AC14, AC17, AC41 in [acceptance-scenarios.md](../docs/acceptance-scenarios.md). The builder decomposes these and source requirements into measurable local success/denied/failure/retry/concurrency/responsive outcomes. Exact values that depend on a policy remain blocked until that choice is resolved.

Before implementation, add inspected current state, precise entities/relations and scoped fields, state transition table/actors/prerequisites, commands/events/provider contracts, screen/component/token states, migration/rollback/recovery, numbered real board references and test evidence requirements. Keep proposed and approved choices separate. Record actual tests only after they run. Follow [AGENTS.md](../AGENTS.md), [planning gaps](../docs/planning-gap-register.md) and [card contract](../docs/board-card-contract.md).

## Feature pipelines — repository 0.20

[Coaches, Rental Arrangements and Hourly PT](../docs/workflows/coach.md)

The linked workflows are required product-level journeys. Complete their state/actor/guard/notification/exception tables in the technical specification and map FEAT/WF IDs to actual numbered cards and local evidence. Read the [coverage contract](../docs/delivery/workflow-coverage.md); do not implement only the navigation page.

## Operational exception review — edition 0.21

- [WF-COACH-07 — Who sells and collects for a rental-coach class](../docs/workflows/coach.md#wf-coach-07)

Keep these subflows linked to the existing feature/source record. Read [operational decisions](../docs/decisions/operational-decisions.md); Current product routes/defaults are specified; exact tenant values/modes requiring setup and real provider proof must satisfy readiness before activation. Local planned acceptance was extended through AC70.

Connected operational handoff: [WF-MEM-08 — Payment reversal or late failure after membership activation](../docs/workflows/mem.md#wf-mem-08). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-MEM-09 — New forms or policy versions affecting existing members](../docs/workflows/mem.md#wf-mem-09). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-CLASS-07 — Resolve disruption after a class or PT booking is confirmed](../docs/workflows/class.md#wf-class-07). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-STAFF-16 — Leave, qualification change or departure after rota publication](../docs/workflows/staff.md#wf-staff-16). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-SPACE-05 — Archive one gym without abandoning its obligations](../docs/workflows/space.md#wf-space-05). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-FIN-05 — Partial, duplicate or misallocated payment resolution](../docs/workflows/fin.md#wf-fin-05). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-LAND-11 — Published page loses an approved source record](../docs/workflows/land.md#wf-land-11). Apply its current authority/decision/record boundaries; it does not invent a new policy.


## Document and form catalogue — 0.29

Use the [current document contract](../docs/documents/document-contract.md) with DCT type catalogue, typed fields, declarative layouts, content-readiness gates and planned acceptance. Upload/form/acknowledgement/signature/issued financial snapshot remain distinct. Company-reviewed legal/health/safety wording and actual original documents remain required inputs; placeholders do not become approved content. Owning source commands control issue/sign/review/payment, and historical issued/signed data/brand versions stay frozen.
