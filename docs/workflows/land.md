# Landing Pages and Public Content

Repository 0.21. 11 source-backed primary and exception workflows for this domain. IDs are stable feature/workflow references, not delivery-card sequence numbers.

## Sources and receiving specifications

[08-design-branding-documents-pages.md](../modules/08-design-branding-documents-pages.md); [03-classes-coaches-and-attendance.md](../modules/03-classes-coaches-and-attendance.md); [02-onboarding-membership-retention.md](../modules/02-onboarding-membership-retention.md)

[public-pages](../../spec/public-pages.md); [shell-settings-branding](../../spec/shell-settings-branding.md); [documents](../../spec/documents.md)

Planned cross-module acceptance: AC05, AC06, AC29, AC30, AC49, AC50. Decision references: GAP04, GAP09, GAP10, GAP11, GAP13. Read the [common contract](README.md#common-workflow-contract).

## Module surface, state boundaries and ownership

Platform landing, company directory and individual gym pages; controlled editor/preview/publication workspace and accessible staff/coach flip cards.

Gym/public profile draft/private/public/unpublished/archived; page revision draft/preview/review/published/rolled back; a public gym does not activate white labelling.

Authorised company/gym editor → relevant source owner (membership/classes/coaching) → permitted publisher → public user/lead officer.

The lifecycle words below are business checkpoints. The builder must resolve exact enum values and actor/action/field tables before implementation, with all open policy branches retained. Existing authority and source-specific review rules apply; no new approval gate or access right is created merely by this catalogue.

## WF-LAND-01

**FEAT-LAND-01 — Platform landing and owner signup**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Prospective owner opens default Orb Gym site |
| Preconditions | Platform-public content and approved default logo/design |
| Ordered journey / checkpoints | View platform offer → sign in or owner signup → verify/create workspace → onboarding |
| Source records / result / handoff | Platform marketing stays distinct from a company’s gym directory/member joining |
| Exception / decision branch | Member CTA must not create workspace ownership; platform pricing/business terms are not guessed |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC05, AC06, AC29, AC30, AC49, AC50 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-LAND-02

**FEAT-LAND-02 — New gym creates public-page draft**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Company owner adds gym record |
| Preconditions | Company ownership, draft gym details and permitted public status |
| Ordered journey / checkpoints | Add gym → create linked nav/card/page draft → complete public details → preview → explicitly make public |
| Source records / result / handoff | One gym source drives company listing and linked gym page; no central marketing auto-listing |
| Exception / decision branch | Incomplete/private gym remains unpublished; adding a logo does not enable white labelling |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC05, AC06, AC29, AC30, AC49, AC50 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-LAND-03

**FEAT-LAND-03 — Gym details, facilities and socials**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Owner/delegated gym editor updates approved public fields |
| Preconditions | Selected gym, content edit authority and source data |
| Ordered journey / checkpoints | Edit name/address/hours/contacts/services/socials → validate → preview → publish accepted update |
| Source records / result / handoff | Same approved values feed page/cards and correct signup context, without manual conflicting duplicates |
| Exception / decision branch | Reject invalid/private values; failed update preserves last valid published page; legal billing entity independent of display address |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC05, AC06, AC29, AC30, AC49, AC50 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-LAND-04

**FEAT-LAND-04 — Brand guidelines and AI-assisted extraction**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised company/gym editor uploads guidelines or social links |
| Preconditions | Rights/authorised sources and private original storage |
| Ordered journey / checkpoints | Upload/link → extract candidate colours/fonts/content → show provenance → preserve manual edits → approve permitted fields |
| Source records / result / handoff | Suggested brand/content becomes a reviewed draft, not automatic publication |
| Exception / decision branch | Link alone does not authorise private access/republication; uncertain/missing facts never become invented marketing claims |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC05, AC06, AC29, AC30, AC49, AC50 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-LAND-05

**FEAT-LAND-05 — Page composition, section order and preview**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised page editor manages presentation |
| Preconditions | Controlled layouts/theme, approved media and content sources |
| Ordered journey / checkpoints | Compose hero/sections/gallery/FAQ/CTA → reorder/visibility → responsive/mode preview → review → publish |
| Source records / result / handoff | Versioned public page with approved theme and exact attribution |
| Exception / decision branch | Arbitrary scripts/unvalidated uploads are not allowed by a page editor; inaccessible layout must be corrected before publication |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC05, AC06, AC29, AC30, AC49, AC50 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-LAND-06

**FEAT-LAND-06 — Public membership prices and deals**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised Membership/marketing role publishes a controlled offer |
| Preconditions | Plan/offer version, dates/eligibility/participating gyms and terms |
| Ordered journey / checkpoints | Prepare offer → approve public version → render price/deal → CTA carries gym/offer → preserve accepted version |
| Source records / result / handoff | Landing displays owning membership prices; transaction retains historical accepted offer |
| Exception / decision branch | Expired/ineligible offer not silently bookable; page copy cannot change price/terms independently |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC05, AC06, AC29, AC30, AC49, AC50 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-LAND-07

**FEAT-LAND-07 — Public timetable and class joining links**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Member/prospect views published classes |
| Preconditions | Approved class occurrences and audience/eligibility rules |
| Ordered journey / checkpoints | Browse relevant gym/time/service → view availability/terms → join/sign in → validate entitlement → reserve |
| Source records / result / handoff | Timetable derived from classes; place confirmation happens in booking module |
| Exception / decision branch | Public availability is not guaranteed reservation; private participant/register/rota details never publish |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC05, AC06, AC29, AC30, AC49, AC50 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-LAND-08

**FEAT-LAND-08 — Staff and coach flip cards**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Manager publishes member-facing profile |
| Preconditions | Approved photo/name/role/specialities/services/public price and gym assignment |
| Ordered journey / checkpoints | Publish profile → show front/back card → tap/keyboard details → book/contact correct service → auto-refresh edits/unpublish |
| Source records / result / handoff | Public coach data comes from staff/coaching and controlled price records |
| Exception / decision branch | No payroll/rent/private contacts/client data; fake concept photos/fees not production; reduced-motion and accessible alternative required |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC05, AC06, AC29, AC30, AC49, AC50 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-LAND-09

**FEAT-LAND-09 — Lead enquiry and member joining from site**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Prospect selects interests/gym/offer |
| Preconditions | Public company context and permitted account/application flow |
| Ordered journey / checkpoints | Submit enquiry/signup → verify → assign sales/member officer → capture interests → holding/onboarding/payment follow-up |
| Source records / result / handoff | Traceable source/owner/next action; one identity retained through approval |
| Exception / decision branch | Enquiry is not membership activation; communication/consent policies and age/guardian requirements remain explicit decisions |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC05, AC06, AC29, AC30, AC49, AC50 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-LAND-10

**FEAT-LAND-10 — Publish rollback, rename and archive**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised publisher changes public availability |
| Preconditions | Current page version, stable gym ID/slug and pending obligations |
| Ordered journey / checkpoints | Preview revision → publish or rollback → rename with authorised routing → unpublish/archive promotion → retain history |
| Source records / result / handoff | Public projection/version and existing link handling; records/bookings do not vanish |
| Exception / decision branch | Unpublish does not cancel memberships/classes or expose private archived data; domains/indexing require verified configuration |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC05, AC06, AC29, AC30, AC49, AC50 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-LAND-11

**FEAT-LAND-10 — Published page loses an approved source record**

Exception/lifecycle subflow of WF-LAND-10; review finding GR12. Existing source-grounded behaviour is clarified; new policy alternatives are not approved.

| Contract | Required behaviour |
|---|---|
| Actors/trigger | Authorised publisher changes public availability |
| Preconditions | Published gym/coach/offer/class projection, changed source publication/eligibility state and defined refresh/invalidation target. |
| Authoritative outcome/handoff | Remove or update the affected public projection and CTAs consistently, preserving valid page history and safe link outcomes without exposing private records. |
| Exception/policy boundary | The old price, archived gym or departed coach cannot remain presented as an unqualified current bookable offer. Refresh targets and provider/caching mechanics require implementation evidence. |

Business checkpoints below describe behaviour, not mandatory API enum spellings. Each decision uses current delegated authority.

| Actor | Before/after checkpoint | Guard/action | Record and next owner | Failure/return path |
|---|---|---|---|---|
| Source owner | Published data → source withdrawn/expired/archived | Record effective source change and relevant public consumers | Versioned publication event with source ID/time | Private source fields or uploaded guidelines are never copied into a public event payload |
| Publication worker | Change pending → public projection refreshed | Update dependent page/card/timetable/price and invalidate appropriate cached representation | Current approved public projection or unavailable state | Retry safely; report lag/failure rather than claim automatic update already completed |
| Public booking/link resolver | Old link → current permitted outcome | Resolve stable gym/service/offer and validate current eligibility before joining/booking | Safe current detail, unavailable message or authorised redirect | Stale page cannot bypass final booking/price/entitlement checks |
| Publisher/operations owner | Refresh → verified or assigned failure | Check affected links/assets/projections within specified target | Evidence and owned exception if delayed | Do not remove valid historical receipts/bookings or publish private archived data while repairing public content |

Planned acceptance: AC05, AC06, AC29, AC30, AC49, AC50, AC70. Operational decisions: no new policy choice; existing scoped rules still require technical completion. See [decision discussion](../decisions/operational-decisions.md).
