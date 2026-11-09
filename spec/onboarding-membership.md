# Member joining, membership lifecycle and retention

Status: populated product specification brief; detailed technical completion pending actual OpenKBS project inspection. Repository 0.20. No application implementation or executed test evidence is implied.

## Product sources

[02-onboarding-membership-retention.md](../docs/modules/02-onboarding-membership-retention.md)

Relevant source blocks: OG-SRC-0022, OG-SRC-0023, OG-SRC-0024, OG-SRC-0025, OG-SRC-0031, OG-SRC-0032, OG-SRC-0033, OG-SRC-0034, OG-SRC-0035, OG-SRC-0036, OG-SRC-0037, OG-SRC-0043, OG-SRC-0044, OG-SRC-0045, OG-SRC-0046, OG-SRC-0047, OG-SRC-0210, OG-SRC-0211, OG-SRC-0212. Review additions apply through docs/delivery/source-map.json and the linked active decision/gap records. Source blocks can contain several atomic requirements; do not collapse them into one test or treat illustrative values as configuration.

## Journey and required behaviour

Member self-signs from selected gym/offer, accepts staff email invite or replaces an expiring temporary credential. Verify/link the existing identity, collect profile/emergency contacts/PAR-Q/agreements and show holding status. Membership staff owns the queue, follow-up, plan/payment setup and approval; activation checks every required condition.

## Authoritative records and lifecycle

Lead/application, assigned officer/contact history, onboarding/form versions, signed snapshot, plan/offer version, membership/freeze, payment-method/mandate/collection, approval and entitlement. Single/all-gym rights are explicit; freeze/cancel/reactivate preserves dates/reasons/history and applies chosen booking/billing/access consequences.

## Controls and connected consequences

Pending users retain login/onboarding/payment resolution without active-member tools. Separate full health answers, operational restrictions and member-facing history. Retention uses confirmed attendance and known freezes/data gaps; Orb proposes reviewable action/offer, never silently discounts or messages.

## Decisions and dependencies

Payment/DD and merchant/billing design, first-collection activation, grace/freeze/cancel/renewal/prorating, new-gym eligibility and form/age/review rules require GAP02–03, GAP11, GAP13–14. No mandate/payment screenshot is collection proof.

## Acceptance and implementation completion

Planned cross-module criteria: AC08, AC09, AC10, AC12, AC32, AC38, AC39 in [acceptance-scenarios.md](../docs/acceptance-scenarios.md). The builder decomposes these and source requirements into measurable local success/denied/failure/retry/concurrency/responsive outcomes. Exact values that depend on a policy remain blocked until that choice is resolved.

Before implementation, add inspected current state, precise entities/relations and scoped fields, state transition table/actors/prerequisites, commands/events/provider contracts, screen/component/token states, migration/rollback/recovery, numbered real board references and test evidence requirements. Keep proposed and approved choices separate. Record actual tests only after they run. Follow [AGENTS.md](../AGENTS.md), [planning gaps](../docs/planning-gap-register.md) and [card contract](../docs/board-card-contract.md).

## Feature pipelines — repository 0.20

[User Management, Accounts and Permissions](../docs/workflows/user.md), [Membership, Joining and Retention](../docs/workflows/mem.md), [Reception, QR Access and Occupancy](../docs/workflows/entry.md)

The linked workflows are required product-level journeys. Complete their state/actor/guard/notification/exception tables in the technical specification and map FEAT/WF IDs to actual numbered cards and local evidence. Read the [coverage contract](../docs/delivery/workflow-coverage.md); do not implement only the navigation page.

## Operational exception review — edition 0.21

- [WF-MEM-08 — Payment reversal or late failure after membership activation](../docs/workflows/mem.md#wf-mem-08)
- [WF-MEM-09 — New forms or policy versions affecting existing members](../docs/workflows/mem.md#wf-mem-09)
- [WF-USER-11 — Personal identity versus company-specific person records](../docs/workflows/user.md#wf-user-11)

Keep these subflows linked to the existing feature/source record. Read [operational decisions](../docs/decisions/operational-decisions.md); Current product routes/defaults are specified; exact tenant values/modes requiring setup and real provider proof must satisfy readiness before activation. Local planned acceptance was extended through AC70.

Connected operational handoff: [WF-CLASS-08 — Same-member repeat booking and waitlist/cancellation races](../docs/workflows/class.md#wf-class-08). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-SPACE-05 — Archive one gym without abandoning its obligations](../docs/workflows/space.md#wf-space-05). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-FIN-05 — Partial, duplicate or misallocated payment resolution](../docs/workflows/fin.md#wf-fin-05). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-LAND-11 — Published page loses an approved source record](../docs/workflows/land.md#wf-land-11). Apply its current authority/decision/record boundaries; it does not invent a new policy.

## Connected completed gap capabilities — 0.22

[trials-guests](trials-guests.md), [juniors-guardians](juniors-guardians.md), [imports-reconciliation](imports-reconciliation.md). Apply the same source records, grants and activation/readiness gates; no duplicated account/task/financial truth or automatic privileges.


## Shared records and lifecycle contract — 0.28

Read the [current shared model](../docs/data/lifecycle-contract.md) and its ENT/REL/SM/TR catalogues, workflow-record map, typed field/command contracts, transition CSV and planned acceptance. This supplies logical record/state/guard/effect/recovery design; OpenKBS must map actual schema/provider status/API/concurrency and evidence. Independent account/employment/membership/payment/entitlement/booking/attendance/task/asset/invoice/publication states cannot be collapsed. No arbitrary status editor or guessed business input is authorised. Original source extracts remain retained.


## Document and form catalogue — 0.29

Use the [current document contract](../docs/documents/document-contract.md) with DCT type catalogue, typed fields, declarative layouts, content-readiness gates and planned acceptance. Upload/form/acknowledgement/signature/issued financial snapshot remain distinct. Company-reviewed legal/health/safety wording and actual original documents remain required inputs; placeholders do not become approved content. Owning source commands control issue/sign/review/payment, and historical issued/signed data/brand versions stay frozen.


## Recovery-path corrections — 0.33

Read docs/data/recovery-path-contract.md at repository root. Current source grant restoration, actual full/partial/discrepancy transfer resolution, provider late-failure/configured retry and separate training submit/review authority override earlier incomplete transition examples. Actual source evidence/policy/current permission and all prior business guards still apply. No extra provider capability or automatic unreviewed service activation is promised.
