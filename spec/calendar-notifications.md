# Shared calendar, scheduled work and notifications

Status: populated product specification brief; detailed technical completion pending actual OpenKBS project inspection. Repository 0.20. No application implementation or executed test evidence is implied.

## Product sources

[09-navigation-calendar-ai.md](../docs/modules/09-navigation-calendar-ai.md); [12-access-navigation-and-notifications.md](../docs/modules/12-access-navigation-and-notifications.md)

Relevant source blocks: OG-SRC-0027, OG-SRC-0124, OG-SRC-0195, OG-SRC-0196, OG-SRC-0197, OG-SRC-0228, OG-SRC-0232, OG-SRC-0233. Review additions apply through docs/delivery/source-map.json and the linked active decision/gap records. Source blocks can contain several atomic requirements; do not collapse them into one test or treat illustrative values as configuration.

## Journey and required behaviour

Owner sees all permitted company schedules and drills into gyms/events without losing filters/date. Staff see own/delegated work; members see published classes/own bookings/events; contractors see assigned visits/deadlines. Dashboard Calendar/Feed are consistent scoped views. Notifications direct recipients to authorised current records.

## Authoritative records and lifecycle

Derived event/projection linked to class/booking/shift/task/visit/meeting/one-to-one, recurrence/cancellation and notification delivery/acknowledgement records. Calendar edits invoke the owning module and its conflict/publication rules; they never bypass rota or class approval.

## Controls and connected consequences

Conceal private HR titles/reasons and unrelated staff/member work. Define event → recipient/audience → channel → link → acknowledgement/retry/escalation. Mentions/notifications do not grant access; delayed jobs recheck permissions. Reading is not acceptance. Preserve timezone, stale/cancelled/archived targets and back context.

## Decisions and dependencies

Actual notification channels, verified sender, reminder/escalation intervals and real-time capability remain GAP01, GAP09, GAP13, GAP15. Delivery failures need owned recovery. Personal preferences must not hide essential in-app account state.

## Acceptance and implementation completion

Planned cross-module criteria: AC17, AC19, AC33, AC42, AC48, AC51 in [acceptance-scenarios.md](../docs/acceptance-scenarios.md). The builder decomposes these and source requirements into measurable local success/denied/failure/retry/concurrency/responsive outcomes. Exact values that depend on a policy remain blocked until that choice is resolved.

Before implementation, add inspected current state, precise entities/relations and scoped fields, state transition table/actors/prerequisites, commands/events/provider contracts, screen/component/token states, migration/rollback/recovery, numbered real board references and test evidence requirements. Keep proposed and approved choices separate. Record actual tests only after they run. Follow [AGENTS.md](../AGENTS.md), [planning gaps](../docs/planning-gap-register.md) and [card contract](../docs/board-card-contract.md).

## Feature pipelines — repository 0.20

[Staff Management, HR and Rota](../docs/workflows/staff.md), [Calendar, Dashboard and Notifications](../docs/workflows/cal.md)

The linked workflows are required product-level journeys. Complete their state/actor/guard/notification/exception tables in the technical specification and map FEAT/WF IDs to actual numbered cards and local evidence. Read the [coverage contract](../docs/delivery/workflow-coverage.md); do not implement only the navigation page.

## Operational exception review — edition 0.21

- [WF-STAFF-16 — Leave, qualification change or departure after rota publication](../docs/workflows/staff.md#wf-staff-16)

Keep these subflows linked to the existing feature/source record. Read [operational decisions](../docs/decisions/operational-decisions.md); Current product routes/defaults are specified; exact tenant values/modes requiring setup and real provider proof must satisfy readiness before activation. Local planned acceptance was extended through AC70.

Connected operational handoff: [WF-TASK-19 — Change a recurring template with already-issued or active work](../docs/workflows/task.md#wf-task-19). Apply its current authority/decision/record boundaries; it does not invent a new policy.

## Connected completed gap capabilities — 0.22

[trials-guests](trials-guests.md), [juniors-guardians](juniors-guardians.md). Apply the same source records, grants and activation/readiness gates; no duplicated account/task/financial truth or automatic privileges.


## Notification and escalation contract — 0.26

Read the [current notification contract](../docs/notifications/notification-contract.md) and canonical event catalogue, generated CSV, policy settings, safe templates and planned acceptance checks. Resolve exact event recipients/source transitions and stop conditions in OpenKBS planning. Owner/company and platform-admin scope follows the current docs/access contract, superseding old generic company-admin wording. No arbitrary reminder intervals or unsupported channels are approved. Personal preferences do not erase required source actions; delivered/read/acknowledged/completed remain distinct. No live delivery is configured or authorised by this file.


## Recovery-path corrections — 0.33

Read docs/data/recovery-path-contract.md at repository root. Current source grant restoration, actual full/partial/discrepancy transfer resolution, provider late-failure/configured retry and separate training submit/review authority override earlier incomplete transition examples. Actual source evidence/policy/current permission and all prior business guards still apply. No extra provider capability or automatic unreviewed service activation is promised.
