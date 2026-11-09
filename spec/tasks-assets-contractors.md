# Shared task engine, assets and contractor work

Status: populated product specification brief; detailed technical completion pending actual OpenKBS project inspection. Repository 0.20. No application implementation or executed test evidence is implied.

## Product sources

[05-task-engine-facilities-contractors.md](../docs/modules/05-task-engine-facilities-contractors.md)

Relevant source blocks: OG-SRC-0095, OG-SRC-0096, OG-SRC-0097, OG-SRC-0098, OG-SRC-0099, OG-SRC-0100, OG-SRC-0101, OG-SRC-0102, OG-SRC-0103, OG-SRC-0104, OG-SRC-0105, OG-SRC-0106, OG-SRC-0107, OG-SRC-0108, OG-SRC-0109, OG-SRC-0110, OG-SRC-0111, OG-SRC-0112, OG-SRC-0113, OG-SRC-0114, OG-SRC-0115, OG-SRC-0116, OG-SRC-0200, OG-SRC-0201, OG-SRC-0202, OG-SRC-0203, OG-SRC-0204, OG-SRC-0205, OG-SRC-0206, OG-SRC-0207, OG-SRC-0208, OG-SRC-0209. Review additions apply through docs/delivery/source-map.json and the linked active decision/gap records. Source blocks can contain several atomic requirements; do not collapse them into one test or treat illustrative values as configuration.

## Journey and required behaviour

Cleaning, maintenance and admin share one form/card engine. Staff create scheduled/recurring templates, group job sheets or assign parent/child tasks. Capture per-item notes/photos/outcome and verification. Asset QR opens role-permitted fault/history actions; triage assigns contractor/visits and quotes/decisions before evidenced work and verified closure.

## Authoritative records and lifecycle

Task/template/occurrence, checklist/evidence, group/hierarchy/dependency, asset/status/location history, fault, supplier/operative assignment, typed feed, versioned quote/variation/approval, commitment/invoice/payment link and closure. Preserve original IDs/history when joining tasks; prevent hierarchy/dependency cycles and duplicate recurrence.

## Controls and connected consequences

Top summary with details/asset/evidence; lower feed left and record tabs right; compact Details/Activity/Records views. Tabs project the same records. Each update may have a note/attachment; @mention grants no access. Required unfinished children prevent parent completion; aggregate each underlying cost once. Contractors submit but cannot approve their own spend/management closure.

## Decisions and dependencies

Configure evidence/review/approval limits, supplier credentials, retention and provider payment handoff. Asset return-to-service is separate from job closure and invoice payment; member equipment notice is separately approved. Recurrence/timezone/DST, reopening/retry and audience boundaries require explicit checks.

## Acceptance and implementation completion

Planned cross-module criteria: AC21, AC22, AC23, AC24, AC25, AC44 in [acceptance-scenarios.md](../docs/acceptance-scenarios.md). The builder decomposes these and source requirements into measurable local success/denied/failure/retry/concurrency/responsive outcomes. Exact values that depend on a policy remain blocked until that choice is resolved.

Before implementation, add inspected current state, precise entities/relations and scoped fields, state transition table/actors/prerequisites, commands/events/provider contracts, screen/component/token states, migration/rollback/recovery, numbered real board references and test evidence requirements. Keep proposed and approved choices separate. Record actual tests only after they run. Follow [AGENTS.md](../AGENTS.md), [planning gaps](../docs/planning-gap-register.md) and [card contract](../docs/board-card-contract.md).

## Feature pipelines — repository 0.20

[Shared Tasks — Cleaning, Maintenance and Admin](../docs/workflows/task.md), [Community, Queries, Feedback and Case Work](../docs/workflows/feed.md)

The linked workflows are required product-level journeys. Complete their state/actor/guard/notification/exception tables in the technical specification and map FEAT/WF IDs to actual numbered cards and local evidence. Read the [coverage contract](../docs/delivery/workflow-coverage.md); do not implement only the navigation page.

## Operational exception review — edition 0.21

- [WF-TASK-18 — Approver or task owner unavailable while a decision is pending](../docs/workflows/task.md#wf-task-18)
- [WF-TASK-19 — Change a recurring template with already-issued or active work](../docs/workflows/task.md#wf-task-19)
- [WF-TASK-20 — Supplier organisation and credential onboarding before assignment](../docs/workflows/task.md#wf-task-20)
- [WF-TASK-21 — Supplier operative delegation and revocation during work](../docs/workflows/task.md#wf-task-21)

Keep these subflows linked to the existing feature/source record. Read [operational decisions](../docs/decisions/operational-decisions.md); Current product routes/defaults are specified; exact tenant values/modes requiring setup and real provider proof must satisfy readiness before activation. Local planned acceptance was extended through AC70.

Connected operational handoff: [WF-CLASS-07 — Resolve disruption after a class or PT booking is confirmed](../docs/workflows/class.md#wf-class-07). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-STAFF-16 — Leave, qualification change or departure after rota publication](../docs/workflows/staff.md#wf-staff-16). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-SPACE-05 — Archive one gym without abandoning its obligations](../docs/workflows/space.md#wf-space-05). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-FIN-05 — Partial, duplicate or misallocated payment resolution](../docs/workflows/fin.md#wf-fin-05). Apply its current authority/decision/record boundaries; it does not invent a new policy.


## Shared records and lifecycle contract — 0.28

Read the [current shared model](../docs/data/lifecycle-contract.md) and its ENT/REL/SM/TR catalogues, workflow-record map, typed field/command contracts, transition CSV and planned acceptance. This supplies logical record/state/guard/effect/recovery design; OpenKBS must map actual schema/provider status/API/concurrency and evidence. Independent account/employment/membership/payment/entitlement/booking/attendance/task/asset/invoice/publication states cannot be collapsed. No arbitrary status editor or guessed business input is authorised. Original source extracts remain retained.


## Document and form catalogue — 0.29

Use the [current document contract](../docs/documents/document-contract.md) with DCT type catalogue, typed fields, declarative layouts, content-readiness gates and planned acceptance. Upload/form/acknowledgement/signature/issued financial snapshot remain distinct. Company-reviewed legal/health/safety wording and actual original documents remain required inputs; placeholders do not become approved content. Owning source commands control issue/sign/review/payment, and historical issued/signed data/brand versions stay frozen.


## Actor journey/default corrections — 0.34

Read docs/access/role-journey-contract.md at repository root. Work start is separate from task edit; limited authenticated fault report is separate from internal work creation. Safe own-account/staff-source prerequisites remain accessible under exact source/assignment/field/deny guards without widening HR/private work. Booking decline/withdraw uses actual self/guardian/staff relation routes.
