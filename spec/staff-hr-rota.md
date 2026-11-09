# Staff HR, contracts, training and rota

Status: populated product specification brief; detailed technical completion pending actual OpenKBS project inspection. Repository 0.20. No application implementation or executed test evidence is implied.

## Product sources

[04-staff-hr-and-rotas.md](../docs/modules/04-staff-hr-and-rotas.md); [03-classes-coaches-and-attendance.md](../docs/modules/03-classes-coaches-and-attendance.md)

Relevant source blocks: OG-SRC-0026, OG-SRC-0090, OG-SRC-0091, OG-SRC-0092, OG-SRC-0093, OG-SRC-0094, OG-SRC-0117, OG-SRC-0118, OG-SRC-0119, OG-SRC-0120, OG-SRC-0121. Review additions apply through docs/delivery/source-map.json and the linked active decision/gap records. Source blocks can contain several atomic requirements; do not collapse them into one test or treat illustrative values as configuration.

## Journey and required behaviour

Company/admin or delegated gym manager/supervisor invites staff within scope. Staff complete required versioned onboarding/contracts/training/SOP acknowledgement, receive scoped tools and own documents. Management builds recurring rota, handles availability/leave/sickness/swaps/cover, publishes and records actual clocking/approved timesheets.

## Authoritative records and lifecycle

Employment/gym assignment, restricted HR documents, contract/signature versions, training/certification/expiry, SOP acknowledgement, disciplinary/one-to-one participants/actions, availability/leave, shifts/publish versions, actual attendance and timesheets. Payslips can be securely uploaded/imported; payroll calculation/filing is a separate decision.

## Controls and connected consequences

Only authorised participants access sensitive HR/pay/health. Public member duty view shows published profiles and responsible lead, distinguishing planned rota from confirmed presence; members can view it remotely. Leavers lose access and future work is reassigned; rehire explicitly reviews assignments and credentials.

## Decisions and dependencies

Contract/template review, retention/access, payroll interfaces/approvals and staffing/qualification/travel policies require GAP09, GAP11–12. Public directory never reveals private absence reasons/pay/contact history. Rota/class/PT/resource conflicts share availability contracts.

## Acceptance and implementation completion

Planned cross-module criteria: AC19, AC20, AC42, AC43 in [acceptance-scenarios.md](../docs/acceptance-scenarios.md). The builder decomposes these and source requirements into measurable local success/denied/failure/retry/concurrency/responsive outcomes. Exact values that depend on a policy remain blocked until that choice is resolved.

Before implementation, add inspected current state, precise entities/relations and scoped fields, state transition table/actors/prerequisites, commands/events/provider contracts, screen/component/token states, migration/rollback/recovery, numbered real board references and test evidence requirements. Keep proposed and approved choices separate. Record actual tests only after they run. Follow [AGENTS.md](../AGENTS.md), [planning gaps](../docs/planning-gap-register.md) and [card contract](../docs/board-card-contract.md).

## Feature pipelines — repository 0.20

[Staff Management, HR and Rota](../docs/workflows/staff.md), [Coaches, Rental Arrangements and Hourly PT](../docs/workflows/coach.md)

The linked workflows are required product-level journeys. Complete their state/actor/guard/notification/exception tables in the technical specification and map FEAT/WF IDs to actual numbered cards and local evidence. Read the [coverage contract](../docs/delivery/workflow-coverage.md); do not implement only the navigation page.

## Operational exception review — edition 0.21

- [WF-STAFF-16 — Leave, qualification change or departure after rota publication](../docs/workflows/staff.md#wf-staff-16)
- [WF-COACH-07 — Who sells and collects for a rental-coach class](../docs/workflows/coach.md#wf-coach-07)

Keep these subflows linked to the existing feature/source record. Read [operational decisions](../docs/decisions/operational-decisions.md); Current product routes/defaults are specified; exact tenant values/modes requiring setup and real provider proof must satisfy readiness before activation. Local planned acceptance was extended through AC70.

Connected operational handoff: [WF-CLASS-07 — Resolve disruption after a class or PT booking is confirmed](../docs/workflows/class.md#wf-class-07). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-TASK-18 — Approver or task owner unavailable while a decision is pending](../docs/workflows/task.md#wf-task-18). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-USER-11 — Personal identity versus company-specific person records](../docs/workflows/user.md#wf-user-11). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-SPACE-05 — Archive one gym without abandoning its obligations](../docs/workflows/space.md#wf-space-05). Apply its current authority/decision/record boundaries; it does not invent a new policy.

## Connected completed gap capabilities — 0.22

[imports-reconciliation](imports-reconciliation.md), [privileged-auth-recovery](privileged-auth-recovery.md). Apply the same source records, grants and activation/readiness gates; no duplicated account/task/financial truth or automatic privileges.


## Current granular access clarification — 0.25

Read the [access model](../docs/access/access-model.md) and its source clarification, role/action/field catalogues, individual allow/deny policy, editable template matrix and planned access scenarios. Admin means platform admin; owner covers all own-company gyms, senior management covers assigned multiple gyms and local management is gym-specific. Owner/platform admin can grant by role/user type and individual. Explicit scoped individual deny prevails over a matching role allow. Earlier company administrator wording means delegated company management, never platform privilege. Existing business, privacy, self-approval and authentication guards remain. The detailed product permission contract is specified; actual schema/command bindings, configured tenant roles and enforcement evidence remain builder work.


## Document and form catalogue — 0.29

Use the [current document contract](../docs/documents/document-contract.md) with DCT type catalogue, typed fields, declarative layouts, content-readiness gates and planned acceptance. Upload/form/acknowledgement/signature/issued financial snapshot remain distinct. Company-reviewed legal/health/safety wording and actual original documents remain required inputs; placeholders do not become approved content. Owning source commands control issue/sign/review/payment, and historical issued/signed data/brand versions stay frozen.


## Recovery-path corrections — 0.33

Read docs/data/recovery-path-contract.md at repository root. Current source grant restoration, actual full/partial/discrepancy transfer resolution, provider late-failure/configured retry and separate training submit/review authority override earlier incomplete transition examples. Actual source evidence/policy/current permission and all prior business guards still apply. No extra provider capability or automatic unreviewed service activation is promised.


## Actor journey/default corrections — 0.34

Read docs/access/role-journey-contract.md at repository root. Work start is separate from task edit; limited authenticated fault report is separate from internal work creation. Safe own-account/staff-source prerequisites remain accessible under exact source/assignment/field/deny guards without widening HR/private work. Booking decline/withdraw uses actual self/guardian/staff relation routes.
