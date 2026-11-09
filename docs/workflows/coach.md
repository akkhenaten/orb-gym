# Coaches, Rental Arrangements and Hourly PT

Repository 0.21. 7 source-backed primary and exception workflows for this domain. IDs are stable feature/workflow references, not delivery-card sequence numbers.

## Sources and receiving specifications

[03-classes-coaches-and-attendance.md](../modules/03-classes-coaches-and-attendance.md)

[coaching-pt](../../spec/coaching-pt.md); [staff-hr-rota](../../spec/staff-hr-rota.md); [finance-reports](../../spec/finance-reports.md)

Planned cross-module acceptance: AC11, AC12, AC13, AC14, AC17, AC41. Decision references: GAP02, GAP06, GAP07, GAP11, GAP12. Read the [common contract](README.md#common-workflow-contract).

## Module surface, state boundaries and ownership

Separate rental and employed tools; published coach card, assigned client/appointment view, own statements and limited PT-only app.

Coach assignment effective periods; rent/invoice/collection, PT booking/completion/payment, client eligibility/access and internal allocation/approval differ.

Management/HR → scoped coach → client/member → review/access/payment owner; approved earnings hand off to payroll process separately.

The lifecycle words below are business checkpoints. The builder must resolve exact enum values and actor/action/field tables before implementation, with all open policy branches retained. Existing authority and source-specific review rules apply; no new approval gate or access right is created merely by this catalogue.

## WF-COACH-01

**FEAT-COACH-01 — Coach arrangement setup and credential review**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Management appoints rental or employed coach per gym |
| Preconditions | Identity, agreement, effective dates and required qualification/insurance |
| Ordered journey / checkpoints | Invite/link → review documents → assign arrangement/gyms → configure limited tools/rates → activate |
| Source records / result / handoff | Arrangement-specific grants; one coach can differ by gym; public fields separate |
| Exception / decision branch | Commercial label does not establish legal status; no unrestricted generic coach role or copying independent client CRM |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC11, AC12, AC13, AC14, AC17, AC41 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-COACH-02

**FEAT-COACH-02 — Rental coach rent and resources**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Rental coach manages permitted relationship with gym |
| Preconditions | Agreed rent frequency/amount/resources and own scope |
| Ordered journey / checkpoints | Accept agreement → book authorised resources → receive rent invoice → pay/reconcile → renew/review arrears |
| Source records / result / handoff | Rental income/arrears separate from member/PT revenue; optional own authorised class tools |
| Exception / decision branch | Rent issue cannot silently remove a client’s independent membership; sales/CRM/progress tools outside limited tier |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC11, AC12, AC13, AC14, AC17, AC41 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-COACH-03

**FEAT-COACH-03 — Employed coach default/override PT rates**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Manager sets hourly customer pricing |
| Preconditions | Coach assignment, service, effective date and pricing authority |
| Ordered journey / checkpoints | Set company/gym default → set permitted per-coach override → preview appointment duration → snapshot charge/version |
| Source records / result / handoff | Customer hourly rate distinct from wages and internal revenue split |
| Exception / decision branch | Later rate edits do not rewrite bookings; increments/minimums/rounding/discount/cancellation need configured rules |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC11, AC12, AC13, AC14, AC17, AC41 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-COACH-04

**FEAT-COACH-04 — PT appointment, delivery and earnings allocation**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Staff/coach and eligible client arrange session |
| Preconditions | Assigned relationship, roster/availability/travel/resources and charge rules |
| Ordered journey / checkpoints | Request/schedule → confirm → attend/deliver → record completion/collection → calculate allocation → approve period statement/payroll input |
| Source records / result / handoff | Separate appointment, revenue, provisional/approved earnings and actual payment |
| Exception / decision branch | No double-counting allocation as new revenue; refund/partial payment/dispute creates adjustment; prepaid packages/balances excluded |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC11, AC12, AC13, AC14, AC17, AC41 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-COACH-05

**FEAT-COACH-05 — Coach invite and PT-only pass**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Coach shares onboarding QR with non-member |
| Preconditions | Gym/coach-scoped invite, personal eligibility/forms and permitted appointment |
| Ordered journey / checkpoints | Invite → signup/link → PAR-Q/rules/emergency contacts → review/payment gates → individual timed pass → entry/exit |
| Source records / result / handoff | Limited PT client profile/tools/receipts and own pass; general invitation not entry entitlement |
| Exception / decision branch | Expiry/revocation, appointment cancellation and access buffer follow explicit rules; no unrestricted gym/member feed grant |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC11, AC12, AC13, AC14, AC17, AC41 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-COACH-06

**FEAT-COACH-06 — PT-only membership upgrade and coach change**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Membership staff extends existing PT client or management changes coach |
| Preconditions | Existing identity/history, new plan/agreements/payment or assignment impact |
| Ordered journey / checkpoints | Review valid forms → setup member payments → approve → add entitlements; arrangement change resolves future sessions and access |
| Source records / result / handoff | Same identity retains PT receipts/visits/client links; effective change audited |
| Exception / decision branch | No duplicate signup, automatic private-client transfer or restoration of every historical grant |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC11, AC12, AC13, AC14, AC17, AC41 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-COACH-07

**FEAT-COACH-02 — Who sells and collects for a rental-coach class**

Exception/lifecycle subflow of WF-COACH-02; review finding GR11. Existing source-grounded behaviour is clarified; new policy alternatives are not approved.

| Contract | Required behaviour |
|---|---|
| Actors/trigger | Rental coach manages permitted relationship with gym |
| Preconditions | Approved rental arrangement and class, selected merchant/collector/legal issuer and agreed gym fee/share/payment model; current DEC-GR-07 specifies modes/default; required company terms/setup must be completed. |
| Authoritative outcome/handoff | Show the selected responsible seller/collector and implement only the authorised charge, receipt, refund and any settlement boundary; retain historical terms. |
| Exception/policy boundary | Outside coach collection and gym collection with a fee/share are materially different models. Neither is inferred from rental coach status or the employed-coach earnings split. |

Business checkpoints below describe behaviour, not mandatory API enum spellings. Each decision uses current delegated authority.

| Actor | Before/after checkpoint | Guard/action | Record and next owner | Failure/return path |
|---|---|---|---|---|
| Company/coaching owner | Class proposal → commercial choice recorded | Choose supported collector/inclusion/price/issuer and refund responsibility | Versioned class commercial configuration; technical feasibility review | Without a decided mode, do not promise or activate an unspecified in-app payment path |
| Authorised publisher | Chosen mode → accurate public terms | Publish applicable fees/inclusion and responsible service/booking CTA | Member-facing terms linked to selected source version | Page cannot invent a gym-collected fee when independent coach collects outside Orb Gym |
| Owning payment/booking process | Booking → mode-consistent outcome | Confirm reservation and collect/record only what the selected model authorises | Correct transaction/receipt/financial or external-payment-reference boundary | Do not create employee payroll allocation or pay out funds merely from a rental class booking |
| Finance/coaching owner | Changed/cancelled service → reviewed settlement | Apply chosen refund/fee/settlement rules and preserve old arrangement | Traceable adjustment and correct historical issuer/source | Changing mode cannot retroactively rename a merchant, invoice or earning allocation |

Planned acceptance: AC11, AC12, AC13, AC14, AC17, AC41, AC69. Operational decisions: DEC-GR-07. See [decision discussion](../decisions/operational-decisions.md).
