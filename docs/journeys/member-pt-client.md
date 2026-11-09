# Member and PT-Only Client

Scope: Own profile/forms/records and entitled gym content. Pending and PT-only access are distinct limited states; no full-access leak.

| Stage | User action and result | Handoff / boundary |
|---|---|---|
| Apply | Join selected public gym/offer or accept staff invite/temporary setup; verify/link same identity. | Context retained; user does not inadvertently create owner workspace. |
| Complete onboarding | Profile/emergency contacts/PAR-Q/rules/signatures; holding status and requests. | Membership staff owns setup/payment/review; mandate is not collected funds. |
| Activate | Plan/entitlements, required forms, approval and configured payment condition satisfied. | Single/all-gym rights; retain login to resolve payment without active privileges. |
| Attend | View classes/spaces, one-off/regular/course bookings; show/scan pass; register class attendance. | Entry/exit and class/PT attendance separate, corrected history retained. |
| Participate | Use scoped feed/calendar/team/duty, receipts/profile, reviews and query/case replies. | Private staff notes never appear; members can see current duty remotely. |
| PT-only path | Coach invite → signup/forms → eligible appointment and personal timed pass → limited PT app. | Invitation QR cannot grant entry; same-account membership upgrade after setup. |
| Change membership | Freeze/cancel/upgrade per explicit billing/booking/access policy, retain history and documents. | AI retention suggestions are reviewed actions; no auto-offer/message. |

## Navigation and connected specifications

Mobile-first Home/Classes/My Bookings/Profile with always-accessible QR-pass action; Calendar/Feed within Home and permitted modules. Desktop/tablet adapt under shared navigation rule. Connected specifications: [onboarding-membership](../../spec/onboarding-membership.md), [classes-courses-attendance](../../spec/classes-courses-attendance.md), [coaching-pt](../../spec/coaching-pt.md), [reception-entry-exit](../../spec/reception-entry-exit.md).

## Shared interruption and recovery rules

Show pending/failed/denied/expired states truthfully. Recheck access on submission and deep links; retain recoverable drafts and selected gym where permitted. Notify only current authorised audiences; read state is not approval. Acceptance cases are in [acceptance-scenarios.md](../acceptance-scenarios.md). Exact policies and providers remain in [planning-gap-register.md](../planning-gap-register.md); these journeys do not resolve them silently.

Detailed [source-to-spec handoffs](../journey-architecture-trace.md) and [exception/recovery branches](../journey-exceptions-and-handoffs.md) form part of this journey. They supplement the full module sources without selecting unresolved policies.

For feature-level detail across these journey stages, read the [workflow catalogue](../workflows/README.md). Actor journeys and feature pipelines are complementary; both must map to implementation and acceptance.

Operational exceptions and unresolved choices are consolidated in the [0.21 review](../reviews/operational-gap-review-0.21.md) and [decision discussion](../decisions/operational-decisions.md). They affect handoffs, not a new customer journey.

## Trials and guardian/dependent subjourneys — 0.22

Trial/guest: choose a ready published offer or permitted staff invitation → verify/link identity → required forms/review/payment → limited personal pass → actual visit/activity register → expiry/cancellation or same-account normal membership setup. No ordinary member feed/all-gym access is implied. [Trial specification](../../spec/trials-guests.md).

Guardian/junior: select a ready programme → verify adult and reviewed relationship grants → create/link distinct dependent person → required forms/plan/payer/review → eligible junior entitlement → authorised dependent booking/pass/attendance → review relationship/age transitions. A guardian may be only payer/booker/signatory/contact/collector and is not automatically a gym member. Each grant is separate. Dependent selection does not leak siblings/other guardians. [Junior specification](../../spec/juniors-guardians.md).

Both are limited contexts inside the member journey. Company setup controls eligible age/activity, reviewed forms and participation/collection policy. Junior login/public/social/direct-message access is disabled by default until an appropriate reviewed programme permits the specific capability.


## Access clarification 0.25

[Granular access model](../access/access-model.md) specifies company role and individual grants. These controls do not bypass member eligibility, verified guardian relationships, assigned vendor audiences or prohibited self-approval. Current roles and grants are reviewed in context; account type alone is not blanket access.
