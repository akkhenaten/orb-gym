# Trial and Guest Visits

Repository 0.22 · OG-EXT-001. 4 concrete feature workflows; status PRODUCT_DESIGN_SPECIFIED / IMPLEMENTATION_NOT_STARTED.

Member journey: limited prospect/guest, with authorised staff review

Company-enabled optional service, disabled until its setup contract passes. Reuse identity, onboarding, document, payment/entitlement and visit records. A guest is not forced to buy membership or given unrelated member data. Limited app destinations are own visit/status/forms/receipts/pass/profile/contact; no ordinary member feed or all-gym access by implication. A public trial CTA exists only for a published ready offer. Guest invitations and individual entry passes use separate contracts. The offer defines price or explicit zero/free, time/visit limit, purpose, gym/activity eligibility, review and refund/cancellation rules. No trial duration, age or free entitlement is invented.

See the [detailed module](../modules/13-trials-and-guests.md), [feature specification](../../spec/trials-guests.md), [setup gates](../setup-and-readiness.md) and [source extension](../source-extension-register.md). Common scope/audit/retry/notification/responsive acceptance in [workflow index](README.md) applies to every pipeline.

## WF-TRIAL-01

**FEAT-TRIAL-01 — Trial offer setup and publication**

| Contract | Required behaviour |
|---|---|
| Actor/trigger | Membership manager enables a gym-specific trial/guest service |
| Required setup/preconditions | Required offer, eligibility, forms/reviewer, explicit price/free and time/visit policy complete |
| Ordered checkpoints | Disabled → draft offer → readiness review → publish → suspend/archive with impact review |
| Source record/outcome/handoff | Controlled offer linked to gym/services/public CTA and limited access conditions |
| Exception or denied path | Missing values keep offer unpublished; no implied free entry, unlimited visits, junior eligibility or full member feed |

Planned acceptance AC71: demonstrate the specified source outcome and the exception/denied path; validate current scoped grants, failed/repeated submissions and exact readiness gates. Use synthetic data. No production implementation/test is implied.

## WF-TRIAL-02

**FEAT-TRIAL-02 — Guest application, review and pass issue**

| Contract | Required behaviour |
|---|---|
| Actor/trigger | Visitor accepts trial invite or selected public offer |
| Required setup/preconditions | Verified same identity, permitted gym/window and applicable guardian relationship if required |
| Ordered checkpoints | Signup/link → own profile/emergency/forms/rules → review → required payment → approve limited grant → issue personal pass |
| Source record/outcome/handoff | Guest person/application, checklist, source payment and individual time/visit-limited access grant |
| Exception or denied path | Invitation is not a pass; incomplete forms/payment/review leave holding status; repeat/over-limit visits follow explicit offer rule |

Planned acceptance AC72: demonstrate the specified source outcome and the exception/denied path; validate current scoped grants, failed/repeated submissions and exact readiness gates. Use synthetic data. No production implementation/test is implied.

## WF-TRIAL-03

**FEAT-TRIAL-03 — Trial entry and activity attendance**

| Contract | Required behaviour |
|---|---|
| Actor/trigger | Guest presents own authorised pass |
| Required setup/preconditions | Current personal grant, gym/time/visit count and any specific eligible class/appointment |
| Ordered checkpoints | Scan/lookup → entitlement check → entry/exit visit → specific activity register where applicable → record outcome |
| Source record/outcome/handoff | Reception shows guest purpose/window; actual visit and class attendance remain independent |
| Exception or denied path | Expired/revoked/wrong-gym pass denied; repeated scans do not consume another allowed visit; no access to unrelated membership tools |

Planned acceptance AC73: demonstrate the specified source outcome and the exception/denied path; validate current scoped grants, failed/repeated submissions and exact readiness gates. Use synthetic data. No production implementation/test is implied.

## WF-TRIAL-04

**FEAT-TRIAL-04 — Guest expiry, cancellation and membership upgrade**

| Contract | Required behaviour |
|---|---|
| Actor/trigger | Guest/staff ends or extends relationship |
| Required setup/preconditions | Existing grant/offer, future trial bookings and permitted payment/cancellation conditions |
| Ordered checkpoints | Cancel/expire/revoke → resolve future reservations/payment under policy → retain visit/forms → same-account membership setup/approval |
| Source record/outcome/handoff | Historical trial evidence retained; new member privileges appear only after normal membership gates |
| Exception or denied path | No automatic DD/renewal/full membership; invalid or changed forms require appropriate new review; legitimate new member rights independent of old expired trial |

Planned acceptance AC74: demonstrate the specified source outcome and the exception/denied path; validate current scoped grants, failed/repeated submissions and exact readiness gates. Use synthetic data. No production implementation/test is implied.
