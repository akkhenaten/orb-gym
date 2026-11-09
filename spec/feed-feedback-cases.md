# Community, communications, queries and feedback

Status: populated product specification brief; detailed technical completion pending actual OpenKBS project inspection. Repository 0.20. No application implementation or executed test evidence is implied.

## Product sources

[07-community-cases-and-feedback.md](../docs/modules/07-community-cases-and-feedback.md); [05-task-engine-facilities-contractors.md](../docs/modules/05-task-engine-facilities-contractors.md)

Relevant source blocks: OG-SRC-0122, OG-SRC-0123, OG-SRC-0124, OG-SRC-0207, OG-SRC-0217. Review additions apply through docs/delivery/source-map.json and the linked active decision/gap records. Source blocks can contain several atomic requirements; do not collapse them into one test or treat illustrative values as configuration.

## Journey and required behaviour

Home/Dashboard offers Feed with scoped posts, approved announcements, media/files/links, reactions, threaded replies, saves, polls/events and moderation/reporting. Typed @mentions render distinct permitted profile links and notify; explicit location attachment uses gym/place/current-location permission with manual fallback.

## Authoritative records and lifecycle

Post/audience/media, comment/reaction/poll/event, report/moderation, notification and linked query/feedback/case. Cases use the shared typed feed/card foundation: initial details/evidence, activity and record tabs. Users submit stars/text/photos/files and follow a response/action/resolution cycle.

## Controls and connected consequences

Company/gym/class/group audiences are explicit; private staff notes and contractor-only evidence never enter member/public content. Turning a post into a case preserves source and audiences. Distinguish public reviews from private complaints. Deleting/editing a post cannot rewrite financial/audit history. Keep in-app zoom/viewer and correction/reopen behaviour.

## Decisions and dependencies

GAP04 defines the Facebook-style boundary; unscoped stories/live/calls/marketplace/sharing are not claimed delivered. Confirm moderation authority, retention/channels/map provider and notification preferences before production. No built-in marketing broadcast permission is inferred.

## Acceptance and implementation completion

Planned cross-module criteria: AC23, AC31, AC48, AC53 in [acceptance-scenarios.md](../docs/acceptance-scenarios.md). The builder decomposes these and source requirements into measurable local success/denied/failure/retry/concurrency/responsive outcomes. Exact values that depend on a policy remain blocked until that choice is resolved.

Before implementation, add inspected current state, precise entities/relations and scoped fields, state transition table/actors/prerequisites, commands/events/provider contracts, screen/component/token states, migration/rollback/recovery, numbered real board references and test evidence requirements. Keep proposed and approved choices separate. Record actual tests only after they run. Follow [AGENTS.md](../AGENTS.md), [planning gaps](../docs/planning-gap-register.md) and [card contract](../docs/board-card-contract.md).

## Class-feedback source linkage — review 0.19

OG-SRC-0061 supplies completed-class feedback: stars/text/media, audience choice, moderation and follow-up. Reuse the feedback/case record with occurrence/member links; [class/register](classes-courses-attendance.md) is the initiating workflow. Do not copy private feedback into a public feed merely to display class history. AC18 and AC53 apply.

## Feature pipelines — repository 0.20

[Classes, Courses, Bookings and Attendance](../docs/workflows/class.md), [Community, Queries, Feedback and Case Work](../docs/workflows/feed.md)

The linked workflows are required product-level journeys. Complete their state/actor/guard/notification/exception tables in the technical specification and map FEAT/WF IDs to actual numbered cards and local evidence. Read the [coverage contract](../docs/delivery/workflow-coverage.md); do not implement only the navigation page.

## Operational exception review — edition 0.21

- [WF-CLASS-07 — Resolve disruption after a class or PT booking is confirmed](../docs/workflows/class.md#wf-class-07)
- [WF-CLASS-08 — Same-member repeat booking and waitlist/cancellation races](../docs/workflows/class.md#wf-class-08)

Keep these subflows linked to the existing feature/source record. Read [operational decisions](../docs/decisions/operational-decisions.md); Current product routes/defaults are specified; exact tenant values/modes requiring setup and real provider proof must satisfy readiness before activation. Local planned acceptance was extended through AC70.
