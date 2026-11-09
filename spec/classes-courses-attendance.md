# Classes, RSVP, blocks/courses and registers

Status: populated product specification brief; detailed technical completion pending actual OpenKBS project inspection. Repository 0.20. No application implementation or executed test evidence is implied.

## Product sources

[03-classes-coaches-and-attendance.md](../docs/modules/03-classes-coaches-and-attendance.md)

Relevant source blocks: OG-SRC-0048, OG-SRC-0049, OG-SRC-0050, OG-SRC-0051, OG-SRC-0052, OG-SRC-0053, OG-SRC-0054, OG-SRC-0055, OG-SRC-0056, OG-SRC-0057, OG-SRC-0058, OG-SRC-0059, OG-SRC-0060, OG-SRC-0061, OG-SRC-0062, OG-SRC-0063, OG-SRC-0064, OG-SRC-0065, OG-SRC-0195, OG-SRC-0196, OG-SRC-0225, OG-SRC-0226, OG-SRC-0229, OG-SRC-0230. Review additions apply through docs/delivery/source-map.json and the linked active decision/gap records. Source blocks can contain several atomic requirements; do not collapse them into one test or treat illustrative values as configuration.

## Journey and required behaviour

Authorised organiser configures class/coach/resource, occurrence dates/capacity/eligibility, booking windows, single/regular/course options and cancellation/no-show rules. Members see availability, accept the versioned policy and reserve eligible occurrences, including permitted last-minute places. Rental coaches run their own classes only with explicit authorisation.

## Authoritative records and lifecycle

Class definition/occurrence, course/block, booking/hold, waitlist offer, resource allocation, policy version and register. Confirm capacity atomically; a late payment after expired hold requires resolution without overselling. Series changes disclose exceptions and whether partial booking is allowed.

## Controls and connected consequences

RSVP and confirmed booking are distinct unless explicitly unified by policy. Coach scans/manual-marks the occurrence register; finalised attendance/no-shows link to profile with correction history. Gym entry is a separate event. Class changes/cancellations notify affected permitted people and invoke chosen refund/credit treatment.

## Decisions and dependencies

Resolve capacity/hold/partial-course/waitlist priority/expiry, cancellation penalties/waivers and member eligibility under GAP05. Rota/PT/resource conflicts and chosen payment adapter are prerequisites. Final-place/retry/correction behaviour needs executed evidence.

## Acceptance and implementation completion

Planned cross-module criteria: AC15, AC16, AC17, AC18, AC40 in [acceptance-scenarios.md](../docs/acceptance-scenarios.md). The builder decomposes these and source requirements into measurable local success/denied/failure/retry/concurrency/responsive outcomes. Exact values that depend on a policy remain blocked until that choice is resolved.

Before implementation, add inspected current state, precise entities/relations and scoped fields, state transition table/actors/prerequisites, commands/events/provider contracts, screen/component/token states, migration/rollback/recovery, numbered real board references and test evidence requirements. Keep proposed and approved choices separate. Record actual tests only after they run. Follow [AGENTS.md](../AGENTS.md), [planning gaps](../docs/planning-gap-register.md) and [card contract](../docs/board-card-contract.md).

## Explicit feedback and presence handoff — review 0.19

After the occurrence, invite permitted class feedback with stars/text/media, private/public audience, moderation and follow-up cases, as specified by OG-SRC-0061. Link feedback to the member and occurrence without duplicating its history in a generic feed. Use [feedback/cases](feed-feedback-cases.md) for the record/audience/resolution foundation. [Reception/presence](reception-entry-exit.md) owns gym arrival/departure and the live register; this does not mark class attendance. AC18 and AC53 apply.

## Feature pipelines — repository 0.20

[Classes, Courses, Bookings and Attendance](../docs/workflows/class.md), [Reception, QR Access and Occupancy](../docs/workflows/entry.md)

The linked workflows are required product-level journeys. Complete their state/actor/guard/notification/exception tables in the technical specification and map FEAT/WF IDs to actual numbered cards and local evidence. Read the [coverage contract](../docs/delivery/workflow-coverage.md); do not implement only the navigation page.

## Operational exception review — edition 0.21

- [WF-CLASS-07 — Resolve disruption after a class or PT booking is confirmed](../docs/workflows/class.md#wf-class-07)
- [WF-CLASS-08 — Same-member repeat booking and waitlist/cancellation races](../docs/workflows/class.md#wf-class-08)

Keep these subflows linked to the existing feature/source record. Read [operational decisions](../docs/decisions/operational-decisions.md); Current product routes/defaults are specified; exact tenant values/modes requiring setup and real provider proof must satisfy readiness before activation. Local planned acceptance was extended through AC70.

Connected operational handoff: [WF-MEM-08 — Payment reversal or late failure after membership activation](../docs/workflows/mem.md#wf-mem-08). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-STAFF-16 — Leave, qualification change or departure after rota publication](../docs/workflows/staff.md#wf-staff-16). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-SPACE-05 — Archive one gym without abandoning its obligations](../docs/workflows/space.md#wf-space-05). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-COACH-07 — Who sells and collects for a rental-coach class](../docs/workflows/coach.md#wf-coach-07). Apply its current authority/decision/record boundaries; it does not invent a new policy.

Connected operational handoff: [WF-LAND-11 — Published page loses an approved source record](../docs/workflows/land.md#wf-land-11). Apply its current authority/decision/record boundaries; it does not invent a new policy.

## Connected completed gap capabilities — 0.22

[trials-guests](trials-guests.md), [juniors-guardians](juniors-guardians.md). Apply the same source records, grants and activation/readiness gates; no duplicated account/task/financial truth or automatic privileges.


## Shared records and lifecycle contract — 0.28

Read the [current shared model](../docs/data/lifecycle-contract.md) and its ENT/REL/SM/TR catalogues, workflow-record map, typed field/command contracts, transition CSV and planned acceptance. This supplies logical record/state/guard/effect/recovery design; OpenKBS must map actual schema/provider status/API/concurrency and evidence. Independent account/employment/membership/payment/entitlement/booking/attendance/task/asset/invoice/publication states cannot be collapsed. No arbitrary status editor or guessed business input is authorised. Original source extracts remain retained.
