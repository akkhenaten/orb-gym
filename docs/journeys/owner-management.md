# Owner, Admin and Management

Scope: Company-wide oversight; delegated admin/management actions and sensitive fields follow RBAC. Platform administration remains separate.

| Stage | User action and result | Handoff / boundary |
|---|---|---|
| Create workspace | Verify account; retry-safe workspace/owner membership; enter company identity and add first gym. | Identity, workspace and gym setup; resume incomplete onboarding. |
| Configure company and gyms | Select UI preset; configure logo/colours/details and permitted gym overrides; preview and publish white label when ready. | Settings publishes one version; Documents/Orb/public/app consume it. |
| Delegate and open operations | Invite staff/managers/coaches, configure memberships/classes/resources, add assets and task templates. | Scoped assignments and required onboarding; no privilege escalation. |
| Run portfolio remotely | Dashboard Overview/Calendar/Feed, all-gym schedules, finance/reports, exceptions, approvals and source drilldowns. | Same scoped modules at gym level; freshness and missing data remain visible. |
| Use Orb | Ask for sourced reports/advice or supported authorised actions; inspect result links. | Ordinary commands and approval rules remain authoritative; retries deduplicated. |
| Change or close | Review settings, arrangements, future obligations, owner transfer/archive and retention. | No silent cancellation/deletion of bookings, contracts, balances or evidence. |

## Navigation and connected specifications

Desktop left company/gym navigation; tablet/mobile bottom Overview/Gyms/Approvals/More plus scoped gym modules, Calendar/Feed and profile. All screens retain exact attribution. Connected specifications: [workspace-access](../../spec/workspace-access.md), [shell-settings-branding](../../spec/shell-settings-branding.md), [finance-reports](../../spec/finance-reports.md), [ai-operations](../../spec/ai-operations.md).

## Shared interruption and recovery rules

Show pending/failed/denied/expired states truthfully. Recheck access on submission and deep links; retain recoverable drafts and selected gym where permitted. Notify only current authorised audiences; read state is not approval. Acceptance cases are in [acceptance-scenarios.md](../acceptance-scenarios.md). Exact policies and providers remain in [planning-gap-register.md](../planning-gap-register.md); these journeys do not resolve them silently.

Detailed [source-to-spec handoffs](../journey-architecture-trace.md) and [exception/recovery branches](../journey-exceptions-and-handoffs.md) form part of this journey. They supplement the full module sources without selecting unresolved policies.

For feature-level detail across these journey stages, read the [workflow catalogue](../workflows/README.md). Actor journeys and feature pipelines are complementary; both must map to implementation and acceptance.

Operational exceptions and unresolved choices are consolidated in the [0.21 review](../reviews/operational-gap-review-0.21.md) and [decision discussion](../decisions/operational-decisions.md). They affect handoffs, not a new customer journey.

## Company readiness, import and privileged controls — 0.22

Owner/delegated staff can configure the new trial/junior services and review their setup gates; incomplete services stay unpublished. Authorised operators stage/import existing-gym records using dry-run/quarantine/review/commit, then separately invite/onboard people. Actual privileges still follow assigned roles. Owners/platform admins enrol supported MFA/recovery before privileged production use; factor success does not grant finance/HR rights. See [setup readiness](../setup-and-readiness.md), [imports](../../spec/imports-reconciliation.md) and [auth/recovery](../../spec/privileged-auth-recovery.md).


## Current granular access clarification — 0.25

Read the [access model](../access/access-model.md) and its source clarification, role/action/field catalogues, individual allow/deny policy, editable template matrix and planned access scenarios. Admin means platform admin; owner covers all own-company gyms, senior management covers assigned multiple gyms and local management is gym-specific. Owner/platform admin can grant by role/user type and individual. Explicit scoped individual deny prevails over a matching role allow. Earlier company administrator wording means delegated company management, never platform privilege. Existing business, privacy, self-approval and authentication guards remain. The detailed product permission contract is specified; actual schema/command bindings, configured tenant roles and enforcement evidence remain builder work.


## Current setup and handoff — 0.30

Start with CURRENT_BASELINE.md at repository root and the current BUILD_BRIEF.md. The [setup hub](../setup/setup-hub.md) combines resumable scoped sections, responsibility delegation, capability-specific current gates and new-gym inheritance. Optional/missing setup does not create a global block or bypass source requirements. Remaining inputs and actual OpenKBS evidence are enumerated in docs/delivery/remaining-inputs.csv and the current handoff audit. Current brief is planning/cards only, not build/deployment authority.
