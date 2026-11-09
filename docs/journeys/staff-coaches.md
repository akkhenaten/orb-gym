# Staff, Managers and Coaches

Scope: Assigned gym(s), own staff documents and delegated role/action/field permissions. Rental coaches are a limited separate arrangement.

| Stage | User action and result | Handoff / boundary |
|---|---|---|
| Join staff | Accept scoped invite; verify identity; complete required profile/contracts/training/SOPs. | Company admin or authorised gym manager/supervisor delegates within ceiling. |
| Plan work | View shifts/availability; request leave/swaps/cover; manager reviews/publishes changes. | Planned rota, actual clocking and approved timesheet stay separate. |
| Deliver work | Reception scans/checks members and till; cleaner completes evidenced tasks; coach runs registers/PT. | Role-specific tools and shared tasks/attendance sources; private data restricted. |
| Handle issues | Raise linked fault/case, attach photos/notes, request a decision and follow outcomes. | Typed feed drives records; messages do not imply approval. |
| Manage coaching | Rental sees own agreement/rent/resources and authorised classes; employed sees allocated PT clients and own earnings. | Customer hourly rate, wage, rent and allocation remain separate; PT packages excluded. |
| Leave or reactivate | Revoke access/reassign future shifts/classes/tasks; preserve history; deliberate review on rehire. | Leaver absent from current published directory/duty view. |

## Navigation and connected specifications

Desktop left nav; tablet/mobile bottom Home/My Shifts/Tasks/More with authorised Scan and gym switching. Coaching/class registers and own staff records remain reachable; rental coach tools stay limited. Connected specifications: [staff-hr-rota](../../spec/staff-hr-rota.md), [coaching-pt](../../spec/coaching-pt.md), [tasks-assets-contractors](../../spec/tasks-assets-contractors.md), [reception-entry-exit](../../spec/reception-entry-exit.md).

## Shared interruption and recovery rules

Show pending/failed/denied/expired states truthfully. Recheck access on submission and deep links; retain recoverable drafts and selected gym where permitted. Notify only current authorised audiences; read state is not approval. Acceptance cases are in [acceptance-scenarios.md](../acceptance-scenarios.md). Exact policies and providers remain in [planning-gap-register.md](../planning-gap-register.md); these journeys do not resolve them silently.

Detailed [source-to-spec handoffs](../journey-architecture-trace.md) and [exception/recovery branches](../journey-exceptions-and-handoffs.md) form part of this journey. They supplement the full module sources without selecting unresolved policies.

For feature-level detail across these journey stages, read the [workflow catalogue](../workflows/README.md). Actor journeys and feature pipelines are complementary; both must map to implementation and acceptance.

Operational exceptions and unresolved choices are consolidated in the [0.21 review](../reviews/operational-gap-review-0.21.md) and [decision discussion](../decisions/operational-decisions.md). They affect handoffs, not a new customer journey.

## Company readiness, import and privileged controls — 0.22

Owner/delegated staff can configure the new trial/junior services and review their setup gates; incomplete services stay unpublished. Authorised operators stage/import existing-gym records using dry-run/quarantine/review/commit, then separately invite/onboard people. Actual privileges still follow assigned roles. Owners/platform admins enrol supported MFA/recovery before privileged production use; factor success does not grant finance/HR rights. See [setup readiness](../setup-and-readiness.md), [imports](../../spec/imports-reconciliation.md) and [auth/recovery](../../spec/privileged-auth-recovery.md).


## Current granular access clarification — 0.25

Read the [access model](../access/access-model.md) and its source clarification, role/action/field catalogues, individual allow/deny policy, editable template matrix and planned access scenarios. Admin means platform admin; owner covers all own-company gyms, senior management covers assigned multiple gyms and local management is gym-specific. Owner/platform admin can grant by role/user type and individual. Explicit scoped individual deny prevails over a matching role allow. Earlier company administrator wording means delegated company management, never platform privilege. Existing business, privacy, self-approval and authentication guards remain. The detailed product permission contract is specified; actual schema/command bindings, configured tenant roles and enforcement evidence remain builder work.
