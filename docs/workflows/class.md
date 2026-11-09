# Classes, Courses, Bookings and Attendance

Repository 0.21. 8 source-backed primary and exception workflows for this domain. IDs are stable feature/workflow references, not delivery-card sequence numbers.

## Sources and receiving specifications

[03-classes-coaches-and-attendance.md](../modules/03-classes-coaches-and-attendance.md)

[classes-courses-attendance](../../spec/classes-courses-attendance.md); [feed-feedback-cases](../../spec/feed-feedback-cases.md)

Planned cross-module acceptance: AC15, AC16, AC17, AC18, AC40, AC53. Decision references: GAP02, GAP05, GAP06, GAP09, GAP13. Read the [common contract](README.md#common-workflow-contract).

## Module surface, state boundaries and ownership

Class/course setup, public/member timetable, booking terms/capacity/waitlist, coach register and linked feedback.

Definition/occurrence publication; interest/held/confirmed/waitlisted/offered/cancelled booking; reviewed attendance/no-show/correction separate from gym visit.

Organiser/coach → management publication where required → eligible member → attendance instructor → feedback/case owner and finance if applicable.

The lifecycle words below are business checkpoints. The builder must resolve exact enum values and actor/action/field tables before implementation, with all open policy branches retained. Existing authority and source-specific review rules apply; no new approval gate or access right is created merely by this catalogue.

## WF-CLASS-01

**FEAT-CLASS-01 — Class definition and publication**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised gym organiser or enabled rental coach proposes class |
| Preconditions | Coach assignment, resource/capacity, eligibility, dates and price/inclusion |
| Ordered journey / checkpoints | Draft → conflict check → management review where required → publish occurrences → expose timetable |
| Source records / result / handoff | Class organiser/arrangement and instructor separate; correct resources and public fields |
| Exception / decision branch | Rental coach lacks general management rights; publication is not an attendance/payment record |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC15, AC16, AC17, AC18, AC40, AC53 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-CLASS-02

**FEAT-CLASS-02 — Single and last-minute booking**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Entitled member requests available occurrence |
| Preconditions | Membership/eligibility, window/cutoff, current capacity and policy |
| Ordered journey / checkpoints | View terms → RSVP/booking as defined → hold if payment-required → confirm place → notify/calendar |
| Source records / result / handoff | Reservation consumes capacity only at defined state; accepted policy version retained |
| Exception / decision branch | Final-place race resolved atomically; late/uncertain payment cannot oversell or charge twice |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC15, AC16, AC17, AC18, AC40, AC53 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-CLASS-03

**FEAT-CLASS-03 — Regular block or course enrolment**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Member chooses a defined sequence/programme |
| Preconditions | Included dates/end, prerequisites, prices and available occurrences |
| Ordered journey / checkpoints | Preview all dates/conflicts → disclose exceptions → accept all/partial policy → enrol → create per-occurrence bookings |
| Source records / result / handoff | Block/course identity plus distinct capacity/attendance for each occurrence |
| Exception / decision branch | No silent partial or indefinite financial commitment; courses not merely unrelated repeated bookings |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC15, AC16, AC17, AC18, AC40, AC53 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-CLASS-04

**FEAT-CLASS-04 — Waitlist and offered place**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Eligible member joins full-class queue |
| Preconditions | Chosen priority/expiry policy and eligible occurrence |
| Ordered journey / checkpoints | Join queue → place available → offer → accept before expiry → confirm or return/reallocate |
| Source records / result / handoff | Queue/offer/booking states and scoped notifications; capacity protected |
| Exception / decision branch | Offer delivery is not acceptance; exact priority/expiry and payment timing need explicit policy |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC15, AC16, AC17, AC18, AC40, AC53 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-CLASS-05

**FEAT-CLASS-05 — Cancel, reschedule and no-show rules**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Member cancels or coach/gym changes occurrence |
| Preconditions | Accepted policy, authority, future dependencies and payment status |
| Ordered journey / checkpoints | Request change → evaluate cutoff/fee/refund/waiver → update booking/occurrence → notify/reconcile |
| Source records / result / handoff | Versioned cancellations/credits/penalties and manager waiver reasons |
| Exception / decision branch | Casual note cannot impose charge; gym/coach cancellation has distinct policy; resource/rota conflicts rechecked |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC15, AC16, AC17, AC18, AC40, AC53 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-CLASS-06

**FEAT-CLASS-06 — Class register and feedback**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised instructor runs occurrence |
| Preconditions | Correct class, enrolment list and scan/manual rights |
| Ordered journey / checkpoints | Open register → scan/mark attended/late/unresolved → review/finalise → correct no-shows → invite feedback/case |
| Source records / result / handoff | Member history, class attendance and feedback link; gym entry remains independent |
| Exception / decision branch | Unscanned is not automatically absent; private/public feedback and moderation rules retained; correction does not erase original |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC15, AC16, AC17, AC18, AC40, AC53 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-CLASS-07

**FEAT-CLASS-05 — Resolve disruption after a class or PT booking is confirmed**

Exception/lifecycle subflow of WF-CLASS-05; review finding GR03. Existing source-grounded behaviour is clarified; new policy alternatives are not approved.

| Contract | Required behaviour |
|---|---|
| Actors/trigger | Member cancels or coach/gym changes occurrence |
| Preconditions | Published occurrence/appointment, actual booked people/payments, new coach/resource/gym restriction and authorised change role. |
| Authoritative outcome/handoff | Create an owned resolution for each affected booking: validated replacement/reschedule or explicit cancellation and chosen financial/entitlement treatment; source-linked notices and registers agree. |
| Exception/policy boundary | No silent class deletion, inferred refund or cancellation of every related session. A member notification alone does not resolve the booking or its money. |

Business checkpoints below describe behaviour, not mandatory API enum spellings. Each decision uses current delegated authority.

| Actor | Before/after checkpoint | Guard/action | Record and next owner | Failure/return path |
|---|---|---|---|---|
| Manager/coaching lead | Confirmed schedule → disruption flagged | Identify unavailable coach/room/asset/gym and actual affected occurrences | Owned disruption case with booked/paid/series impact; scheduling owner | Do not expose private sickness/HR reason in member notices |
| Authorised scheduler | Impact flagged → proposed remedy | Validate replacement qualifications, rota/travel/resources/capacity and series exceptions | Proposal and selected permitted remedy; approver/member response as chosen | No valid alternative leaves an explicit blocked case with next action |
| Authorised source-module role | Remedy pending → booking change committed | Apply permitted reschedule or cancellation through booking command; apply selected payment rules separately | Updated occurrence/bookings, adjustment requests and recipient-specific notices | Do not duplicate places/charges or silently enrol a member into a materially changed service |
| Manager/finance | Changed → reconciled | Verify attendee registers, capacity, receipt/credit/refund and calendar/public view | Per-booking resolution/evidence and unresolved exception owner | Failed financial action stays pending; retries cannot send a second refund or inconsistent notice |

Planned acceptance: AC15, AC16, AC17, AC18, AC40, AC53, AC58. Operational decisions: DEC-GR-04. See [decision discussion](../decisions/operational-decisions.md).

## WF-CLASS-08

**FEAT-CLASS-02 — Same-member repeat booking and waitlist/cancellation races**

Exception/lifecycle subflow of WF-CLASS-02; review finding GR04. Existing source-grounded behaviour is clarified; new policy alternatives are not approved.

| Contract | Required behaviour |
|---|---|
| Actors/trigger | Entitled member requests available occurrence |
| Preconditions | Verified person, occurrence, current booking/waitlist/hold and policy allowing or denying overlapping bookings. |
| Authoritative outcome/handoff | Return the existing reservation on duplicate requests; resolve place ownership and queue offers once; keep all confirmed capacity and payments traceable. |
| Exception/policy boundary | Two devices or retries must not create a second place/charge for the same person and occurrence. Actual overlap eligibility, multi-attendee and waitlist priority policies remain explicit choices. |

Business checkpoints below describe behaviour, not mandatory API enum spellings. Each decision uses current delegated authority.

| Actor | Before/after checkpoint | Guard/action | Record and next owner | Failure/return path |
|---|---|---|---|---|
| Booking command | No booking/current hold → request checked | Resolve current person-occurrence reservation and request identity before new hold | Existing state returned or one valid reservation intent | Unauthorised/duplicate/stale request cannot consume another seat |
| Booking/queue coordinator | Hold/offer/cancellation concurrent → consistent capacity transition | Reconcile release, offer acceptance and expiration under chosen policy/version | One effective place allocation and correct queue/booking states | Final-place race cannot oversell; an unaccepted notification is not a booking |
| Payment adapter | Reservation payment pending → reconciled confirmation or exception | Apply confirmed financial event to its existing charge/reservation | Single source charge and correct place or owned late-payment exception | Late success after expired hold never promises an unavailable seat or recollects blindly |
| Booking owner | Result committed → profile/calendar consistent | Refresh source projections and affected notifications | One member history/register entry per reservation | Replayed/out-of-order events cannot reinstate a cancelled obsolete booking |

Planned acceptance: AC15, AC16, AC17, AC18, AC40, AC53, AC59. Operational decisions: no new policy choice; existing scoped rules still require technical completion. See [decision discussion](../decisions/operational-decisions.md).
