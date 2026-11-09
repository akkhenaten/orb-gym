# Workspace, identity and platform administration

Status: populated product specification brief; detailed technical completion pending actual OpenKBS project inspection. Repository 0.20. No application implementation or executed test evidence is implied.

## Product sources

[01-workspaces-and-access.md](../docs/modules/01-workspaces-and-access.md)

Relevant source blocks: OG-SRC-0001, OG-SRC-0002, OG-SRC-0003, OG-SRC-0004, OG-SRC-0005, OG-SRC-0006, OG-SRC-0007, OG-SRC-0008, OG-SRC-0009, OG-SRC-0010, OG-SRC-0011, OG-SRC-0012, OG-SRC-0013, OG-SRC-0014, OG-SRC-0015, OG-SRC-0016, OG-SRC-0017, OG-SRC-0018, OG-SRC-0019, OG-SRC-0191, OG-SRC-0192, OG-SRC-0193, OG-SRC-0194, OG-SRC-0198. Review additions apply through docs/delivery/source-map.json and the linked active decision/gap records. Source blocks can contain several atomic requirements; do not collapse them into one test or treat illustrative values as configuration.

## Journey and required behaviour

Owner verifies an account and creates one retry-safe workspace/owner grant, adds multiple gyms and delegates staff. Invited people join their intended context instead of becoming owners. Switching workspace is explicit. Platform admin uses a separate service console and bounded audited support access.

## Authoritative records and lifecycle

Workspace, gym, user/profile, invitation, scoped role/assignment and support grant. Keep account state separate from membership, employment and contractor assignments. Ownership transfer retains an active owner; suspension/archive/eligible deletion follow deliberate lifecycle processes.

## Controls and connected consequences

Owners oversee their portfolio; assigned staff/member/vendor see only their authorised contexts and fields. Role grants cannot enlarge the inviter’s delegation. Private health/HR/finance requires explicit scope. Apply revocation to files, search, exports, AI and pending/background work.

## Decisions and dependencies

Hosting/auth/session/recovery provider and exact role/action/field matrix require inspection. GAP01, GAP09, GAP11 and GAP15 apply. Do not guess retention or support impersonation rights.

## Acceptance and implementation completion

Planned cross-module criteria: AC01, AC02, AC03, AC37, AC38 in [acceptance-scenarios.md](../docs/acceptance-scenarios.md). The builder decomposes these and source requirements into measurable local success/denied/failure/retry/concurrency/responsive outcomes. Exact values that depend on a policy remain blocked until that choice is resolved.

Before implementation, add inspected current state, precise entities/relations and scoped fields, state transition table/actors/prerequisites, commands/events/provider contracts, screen/component/token states, migration/rollback/recovery, numbered real board references and test evidence requirements. Keep proposed and approved choices separate. Record actual tests only after they run. Follow [AGENTS.md](../AGENTS.md), [planning gaps](../docs/planning-gap-register.md) and [card contract](../docs/board-card-contract.md).

## Feature pipelines — repository 0.20

[User Management, Accounts and Permissions](../docs/workflows/user.md), [Workspace, Gym Portfolio and Platform Administration](../docs/workflows/space.md)

The linked workflows are required product-level journeys. Complete their state/actor/guard/notification/exception tables in the technical specification and map FEAT/WF IDs to actual numbered cards and local evidence. Read the [coverage contract](../docs/delivery/workflow-coverage.md); do not implement only the navigation page.

## Operational exception review — edition 0.21

- [WF-USER-11 — Personal identity versus company-specific person records](../docs/workflows/user.md#wf-user-11)
- [WF-SPACE-05 — Archive one gym without abandoning its obligations](../docs/workflows/space.md#wf-space-05)

Keep these subflows linked to the existing feature/source record. Read [operational decisions](../docs/decisions/operational-decisions.md); Current product routes/defaults are specified; exact tenant values/modes requiring setup and real provider proof must satisfy readiness before activation. Local planned acceptance was extended through AC70.

Connected operational handoff: [WF-TASK-18 — Approver or task owner unavailable while a decision is pending](../docs/workflows/task.md#wf-task-18). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-TASK-20 — Supplier organisation and credential onboarding before assignment](../docs/workflows/task.md#wf-task-20). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-TASK-21 — Supplier operative delegation and revocation during work](../docs/workflows/task.md#wf-task-21). Apply its current authority/decision/record boundaries; it does not invent a new policy.

## Connected completed gap capabilities — 0.22

[juniors-guardians](juniors-guardians.md), [imports-reconciliation](imports-reconciliation.md), [privileged-auth-recovery](privileged-auth-recovery.md). Apply the same source records, grants and activation/readiness gates; no duplicated account/task/financial truth or automatic privileges.


## Current granular access clarification — 0.25

Read the [access model](../docs/access/access-model.md) and its source clarification, role/action/field catalogues, individual allow/deny policy, editable template matrix and planned access scenarios. Admin means platform admin; owner covers all own-company gyms, senior management covers assigned multiple gyms and local management is gym-specific. Owner/platform admin can grant by role/user type and individual. Explicit scoped individual deny prevails over a matching role allow. Earlier company administrator wording means delegated company management, never platform privilege. Existing business, privacy, self-approval and authentication guards remain. The detailed product permission contract is specified; actual schema/command bindings, configured tenant roles and enforcement evidence remain builder work.


## Shared records and lifecycle contract — 0.28

Read the [current shared model](../docs/data/lifecycle-contract.md) and its ENT/REL/SM/TR catalogues, workflow-record map, typed field/command contracts, transition CSV and planned acceptance. This supplies logical record/state/guard/effect/recovery design; OpenKBS must map actual schema/provider status/API/concurrency and evidence. Independent account/employment/membership/payment/entitlement/booking/attendance/task/asset/invoice/publication states cannot be collapsed. No arbitrary status editor or guessed business input is authorised. Original source extracts remain retained.


## Current setup and handoff — 0.30

Start with CURRENT_BASELINE.md at repository root and the current BUILD_BRIEF.md. The [setup hub](../docs/setup/setup-hub.md) combines resumable scoped sections, responsibility delegation, capability-specific current gates and new-gym inheritance. Optional/missing setup does not create a global block or bypass source requirements. Remaining inputs and actual OpenKBS evidence are enumerated in docs/delivery/remaining-inputs.csv and the current handoff audit. Current brief is planning/cards only, not build/deployment authority.


## Actor journey/default corrections — 0.34

Read docs/access/role-journey-contract.md at repository root. Work start is separate from task edit; limited authenticated fault report is separate from internal work creation. Safe own-account/staff-source prerequisites remain accessible under exact source/assignment/field/deny guards without widening HR/private work. Booking decline/withdraw uses actual self/guardian/staff relation routes.
