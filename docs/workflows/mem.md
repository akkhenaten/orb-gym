# Membership, Joining and Retention

Repository 0.21. 9 source-backed primary and exception workflows for this domain. IDs are stable feature/workflow references, not delivery-card sequence numbers.

## Sources and receiving specifications

[02-onboarding-membership-retention.md](../modules/02-onboarding-membership-retention.md)

[onboarding-membership](../../spec/onboarding-membership.md)

Planned cross-module acceptance: AC08, AC09, AC10, AC12, AC32, AC38, AC39. Decision references: GAP02, GAP03, GAP11, GAP13, GAP14. Read the [common contract](README.md#common-workflow-contract).

## Module surface, state boundaries and ownership

Public join/invite → limited holding/onboarding account → Membership queue → entitled member app, private receipts/documents/history.

Application/enquiry progression, document review, payment-method, collection, approval, membership and entry/booking entitlement each retain distinct states.

Prospect/member → sales/member officer → health/document reviewer as needed → payment/approval owner → member and permitted reception/booking consumers.

The lifecycle words below are business checkpoints. The builder must resolve exact enum values and actor/action/field tables before implementation, with all open policy branches retained. Existing authority and source-specific review rules apply; no new approval gate or access right is created merely by this catalogue.

## WF-MEM-01

**FEAT-MEM-01 — Joining routes and sales pipeline**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Prospect self-signs or staff prepares invite/temp setup |
| Preconditions | Correct company/gym, intended interests and context |
| Ordered journey / checkpoints | Account/verify → interests/enquiry → assigned follow-up → consultation/trial/offer where configured → onboarding |
| Source records / result / handoff | Lead/application owner and next action; pending member uses holding account |
| Exception / decision branch | No duplicate identity or owner role; no-response/withdrawn/declined outcomes retained with reason under policy |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC08, AC09, AC10, AC12, AC32, AC38, AC39 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-MEM-02

**FEAT-MEM-02 — PAR-Q, emergency contacts and agreements**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Pending member completes joining checklist |
| Preconditions | Required form/document versions and authorised reviewer |
| Ordered journey / checkpoints | Fill profile/contacts → submit PAR-Q → review follow-up → sign rules/terms → satisfy applicable checklist |
| Source records / result / handoff | Versioned answers/signatures and review status; health scope limited |
| Exception / decision branch | Submission alone not fitness approval; missing answer/new terms need follow-up; age/guardian/review rules not guessed |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC08, AC09, AC10, AC12, AC32, AC38, AC39 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-MEM-03

**FEAT-MEM-03 — Plans, prices and single/all-gym entitlement**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Membership manager configures member package |
| Preconditions | Controlled plan version/rate/eligibility and applicable gyms |
| Ordered journey / checkpoints | Select/create approved plan → show terms → assign effective membership → derive permitted entitlements |
| Source records / result / handoff | Historical price/offer retained; specialist courses/future gyms explicitly included or excluded |
| Exception / decision branch | Changing plan does not rewrite prior receipts; rate/new-gym treatment remain business configuration |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC08, AC09, AC10, AC12, AC32, AC38, AC39 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-MEM-04

**FEAT-MEM-04 — Payment setup, review and activation**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Membership staff completes DD/payment and approval |
| Preconditions | Required current onboarding, approved plan and configured qualifying payment |
| Ordered journey / checkpoints | Set method/mandate → await confirmed collection where required → review approval → activate eligible rights → notify |
| Source records / result / handoff | Payment setup, collection, staff decision and entitlement are separate records |
| Exception / decision branch | Provider pending/failure/late callbacks reconcile; mandate or screenshot cannot itself prove collected funds |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC08, AC09, AC10, AC12, AC32, AC38, AC39 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-MEM-05

**FEAT-MEM-05 — Renewal, freeze, cancellation and reinstatement**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Member requests/management reviews lifecycle change |
| Preconditions | Terms, dates, future bookings, payments and authority |
| Ordered journey / checkpoints | Request/review → determine effective policy → change membership/billing/access → notify → preserve history |
| Source records / result / handoff | Explicit frozen/suspended/cancelled/expired/active states and reason/author |
| Exception / decision branch | No silent booking cancellation or guaranteed refunds; billing/end date/arrears consequences need chosen policy |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC08, AC09, AC10, AC12, AC32, AC38, AC39 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-MEM-06

**FEAT-MEM-06 — Member records, receipts and self-service**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Member views their account |
| Preconditions | Own identity, current entitlement and record visibility |
| Ordered journey / checkpoints | View profile/plan/payments/bookings/attendance/feedback → update allowed contacts → download own documents |
| Source records / result / handoff | Same authoritative finance/booking/issued-document sources, own records only |
| Exception / decision branch | Uploaded payment evidence labelled pending; access problem retains permitted payment/status resolution without full privileges |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC08, AC09, AC10, AC12, AC32, AC38, AC39 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-MEM-07

**FEAT-MEM-07 — Retention indicators and reviewed outreach**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised manager reviews inactivity |
| Preconditions | Confirmed visit history, freezes, data completeness and configurable period |
| Ordered journey / checkpoints | Identify potential risk → inspect evidence → Orb suggests action → manager approves/assigns → record contact/outcome |
| Source records / result / handoff | Owned follow-up/offer/task and auditable result, not certainty of churn |
| Exception / decision branch | No auto-message/discount/access change; incomplete scanning cannot be treated as proven absence |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC08, AC09, AC10, AC12, AC32, AC38, AC39 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-MEM-08

**FEAT-MEM-04 — Payment reversal or late failure after membership activation**

Exception/lifecycle subflow of WF-MEM-04; review finding GR01. Existing source-grounded behaviour is clarified; new policy alternatives are not approved.

| Contract | Required behaviour |
|---|---|
| Actors/trigger | Membership staff completes DD/payment and approval |
| Preconditions | Existing source payment, member/plan/entitlements, authenticated provider event and current transaction version; no new automatic access policy. |
| Authoritative outcome/handoff | Append confirmed reversal/failure/dispute evidence; reconcile the charge/arrears and any earnings/allocations; assign finance/Membership review and apply only an explicitly chosen entitlement rule. |
| Exception/policy boundary | An earlier successful collection is not a guarantee of permanent settlement. Reversal is not automatically membership cancellation, refund approval or permission to collect again. Retain original receipt/status history. |

Business checkpoints below describe behaviour, not mandatory API enum spellings. Each decision uses current delegated authority.

| Actor | Before/after checkpoint | Guard/action | Record and next owner | Failure/return path |
|---|---|---|---|---|
| Payment adapter | Previously confirmed/paid → adverse event received | Authenticate merchant/event and retrieve authoritative current provider state | Durable deduplicated event; finance exception owner | Reject unauthenticated/wrong-company event; hold uncertain state for reconciliation |
| Finance/Membership | Exception unreviewed → impact reviewed | Match original charge, current membership, future bookings and any coach allocation | Versioned financial adjustment and reviewed affected records; Membership owner | Do not let older duplicate success overwrite a newer reconciled reversal |
| Authorised membership/finance role | Policy decision pending → authorised action or monitored exception | Apply chosen arrears/grace/access/bookings/notice policy without inventing thresholds | Reasoned action/notification/task and retained original payment/receipt history | Without a resolved policy, affected automation stays blocked and assigned; no automatic second charge |
| Reconciliation owner | Unresolved → reconciled or escalated | Verify authoritative balance and downstream entitlement/report state agree | Closed or owned exception with outcome/evidence | Retry deduplicates adjustments/notices; dispute and refund retain separate states |

Planned acceptance: AC08, AC09, AC10, AC12, AC32, AC38, AC39, AC56. Operational decisions: DEC-GR-02. See [decision discussion](../decisions/operational-decisions.md).

## WF-MEM-09

**FEAT-MEM-02 — New forms or policy versions affecting existing members**

Exception/lifecycle subflow of WF-MEM-02; review finding GR02. Existing source-grounded behaviour is clarified; new policy alternatives are not approved.

| Contract | Required behaviour |
|---|---|
| Actors/trigger | Pending member completes joining checklist |
| Preconditions | Approved form/policy version, targeted people and valid historical acknowledgements; authorised reviewer and applicability decision. |
| Authoritative outcome/handoff | Keep old versions; determine which members need new review/acknowledgement and what existing rights/bookings remain; track completion and owned follow-up. |
| Exception/policy boundary | Publishing an edited PAR-Q/house rule cannot silently invalidate every member, erase an old signature or automatically make bookings unsafe. Applicability and temporary restrictions require an explicit rule. |

Business checkpoints below describe behaviour, not mandatory API enum spellings. Each decision uses current delegated authority.

| Actor | Before/after checkpoint | Guard/action | Record and next owner | Failure/return path |
|---|---|---|---|---|
| Document/policy owner | Draft revision → approved published version | Review material change and proposed affected scope | Versioned source and applicability proposal; Membership reviewer | Do not substitute publication for approval of impact on existing members |
| Membership reviewer | Current users → identified affected cohort | Evaluate valid existing forms and decided applicability/effective dates | Scoped review/acknowledgement requests linked to person and version | Unknown eligibility becomes a review exception; never copy health answers across companies |
| Member and authorised reviewer | Requested → submitted/reviewed | Complete required new acknowledgement or approved follow-up | New evidence/version plus reviewed status; existing history unchanged | Outstanding review remains visible; privileges follow the chosen rule rather than a blanket invented block |
| Membership owner | Outstanding cohort → resolved or escalated | Check pending bookings/entitlements and required notices under selected policy | Auditable resolution and next owner for remaining exceptions | Do not overwrite previous agreements or claim fitness from questionnaire submission |

Planned acceptance: AC08, AC09, AC10, AC12, AC32, AC38, AC39, AC57. Operational decisions: DEC-GR-03. See [decision discussion](../decisions/operational-decisions.md).
