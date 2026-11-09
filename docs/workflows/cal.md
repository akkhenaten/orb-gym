# Calendar, Dashboard and Notifications

Repository 0.21. 4 source-backed primary and exception workflows for this domain. IDs are stable feature/workflow references, not delivery-card sequence numbers.

## Sources and receiving specifications

[09-navigation-calendar-ai.md](../modules/09-navigation-calendar-ai.md); [12-access-navigation-and-notifications.md](../modules/12-access-navigation-and-notifications.md)

[calendar-notifications](../../spec/calendar-notifications.md); [shell-settings-branding](../../spec/shell-settings-branding.md)

Planned cross-module acceptance: AC17, AC19, AC33, AC42, AC48, AC51. Decision references: GAP01, GAP09, GAP13, GAP15. Read the [common contract](README.md#common-workflow-contract).

## Module surface, state boundaries and ownership

Role-filtered Overview/Calendar/Feed, scoped event details, current notification centre/preferences and reliable deep links.

Source item states drive calendar; notification queued/delivered/failed/read/acknowledged/action taken are distinct.

Source event owner → scoped schedule viewer/recipient → owning module for edits/approvals → retry/escalation owner if needed.

The lifecycle words below are business checkpoints. The builder must resolve exact enum values and actor/action/field tables before implementation, with all open policy branches retained. Existing authority and source-specific review rules apply; no new approval gate or access right is created merely by this catalogue.

## WF-CAL-01

**FEAT-CAL-01 — Dashboard and cross-gym calendar drilldown**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Owner/staff/member/vendor opens home |
| Preconditions | Explicit role/workspace/gym/filter context |
| Ordered journey / checkpoints | Overview/Calendar/Feed → filter relevant dates/people/type → select source event → authorised detail → back preserving context |
| Source records / result / handoff | Calendar aggregates owning rota/classes/PT/tasks/visits/events without creating duplicate schedules |
| Exception / decision branch | Member cannot inspect private HR title/contractor details; stale/missing/revoked links show permitted next step |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC17, AC19, AC33, AC42, AC48, AC51 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-CAL-02

**FEAT-CAL-02 — Edit scheduled item and recurrence**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised scheduler moves/amends event |
| Preconditions | Owning module authority, current version and conflict rules |
| Ordered journey / checkpoints | Open event → invoke source edit → preview occurrence/series impact → validate → publish/update → notify |
| Source records / result / handoff | Source shift/booking/visit/task owns change; projection refreshes with version/history |
| Exception / decision branch | Calendar drag cannot bypass approval, capacity or staff availability; DST/partial series/stale edit handled explicitly |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC17, AC19, AC33, AC42, AC48, AC51 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-CAL-03

**FEAT-CAL-03 — Notification routing and acknowledgement**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Owning module emits assignment/payment/booking/expiry/mention event |
| Preconditions | Current recipient scope, supported channel and preference/policy |
| Ordered journey / checkpoints | Create deduplicated notification → deliver → open authorised deep link → read/acknowledge/act as distinct states |
| Source records / result / handoff | Matrix identifies event/recipient/channel/link/retry/escalation and next owner |
| Exception / decision branch | Email/push/SMS not assumed configured; sensitive content redacted; delivery/read never equals approval |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC17, AC19, AC33, AC42, AC48, AC51 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-CAL-04

**FEAT-CAL-04 — Failed delivery and personal channel changes**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | User updates preferences or notification delivery fails |
| Preconditions | Current profile options, essential in-app state and verified provider |
| Ordered journey / checkpoints | Save options → apply to future supported events → surface failure → retry/escalate under configured rule |
| Source records / result / handoff | Normal in-app account/approval state remains available independent of outbound delivery |
| Exception / decision branch | Marketing consent separate; revoked user no longer receives private notices; intervals/escalation authority remain defined choices |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC17, AC19, AC33, AC42, AC48, AC51 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.


## Notification and escalation contract — 0.26

Read the [current notification contract](../notifications/notification-contract.md) and canonical event catalogue, generated CSV, policy settings, safe templates and planned acceptance checks. Resolve exact event recipients/source transitions and stop conditions in OpenKBS planning. Owner/company and platform-admin scope follows the current docs/access contract, superseding old generic company-admin wording. No arbitrary reminder intervals or unsupported channels are approved. Personal preferences do not erase required source actions; delivered/read/acknowledged/completed remain distinct. No live delivery is configured or authorised by this file.
