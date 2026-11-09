# Junior Members and Guardian Relationships

Repository 0.22 · OG-EXT-002. 6 concrete feature workflows; status PRODUCT_DESIGN_SPECIFIED / IMPLEMENTATION_NOT_STARTED.

Member journey: guardian-linked dependent with scoped management/coach/reception roles

Optional company programme, disabled until required operational and reviewed content is ready. A junior has a distinct person/membership/booking/pass/attendance record; a guardian may be only a payer/booker/signatory/contact/collector with independently granted rights and need not be a gym member. No fake email address is required for a non-login dependent. Direct junior login is optional and disabled until a reviewed age-appropriate access design is configured. Guardian grants are verified and effective-dated; multiple guardians never automatically share all information. Emergency contacts are not authority grants. Default public/social/location/direct-message exposure is off. The product does not infer an age threshold, legal consent basis, custody outcome, medical clearance or universal collection procedure. Staff see the minimum current operational restrictions and collection instructions they are authorised to act on. Programme-specific eligibility and transitions are mandatory setup.

See the [detailed module](../modules/14-juniors-and-guardians.md), [feature specification](../../spec/juniors-guardians.md), [setup gates](../setup-and-readiness.md) and [source extension](../source-extension-register.md). Common scope/audit/retry/notification/responsive acceptance in [workflow index](README.md) applies to every pipeline.

## WF-JUNIOR-01

**FEAT-JUNIOR-01 — Junior programme setup**

| Contract | Required behaviour |
|---|---|
| Actor/trigger | Authorised gym management configures supported activities/ages |
| Required setup/preconditions | Reviewed eligibility/forms, authority verification, guardian roles, contacts/collection, privacy and safeguarding process |
| Ordered checkpoints | Disabled → draft programme → policy/content readiness review → publish → review changes |
| Source record/outcome/handoff | Company/gym/activity settings with explicit age bands and approved forms; no universal legal age hard-coded |
| Exception or denied path | Unconfigured programme cannot accept bookable junior memberships; direct login/social/coach DM disabled by default |

Planned acceptance AC75: demonstrate the specified source outcome and the exception/denied path; validate current scoped grants, failed/repeated submissions and exact readiness gates. Use synthetic data. No production implementation/test is implied.

## WF-JUNIOR-02

**FEAT-JUNIOR-02 — Guardian invitation and authority review**

| Contract | Required behaviour |
|---|---|
| Actor/trigger | Verified adult requests/accepts a scoped relationship |
| Required setup/preconditions | Actual junior person/context and approved authority review procedure |
| Ordered checkpoints | Verify adult identity → request/link dependent → staff authority review → approve specific relationship grants → notify permitted parties |
| Source record/outcome/handoff | Effective-dated guardian relation with separate book/pay/sign/contact/collect permissions and audit |
| Exception or denied path | Family name/emergency contact does not prove authority; disputes/unclear restrictions remain private review cases, not automatic sharing |

Planned acceptance AC76: demonstrate the specified source outcome and the exception/denied path; validate current scoped grants, failed/repeated submissions and exact readiness gates. Use synthetic data. No production implementation/test is implied.

## WF-JUNIOR-03

**FEAT-JUNIOR-03 — Junior membership, forms and billing**

| Contract | Required behaviour |
|---|---|
| Actor/trigger | Authorised guardian/staff sets up dependent |
| Required setup/preconditions | Approved relationship grants, programme eligibility, required form/signature review and chosen biller |
| Ordered checkpoints | Select junior/plan → complete applicable forms/consents → review → payment setup/confirmed condition → approve entitlements |
| Source record/outcome/handoff | Junior has own member/person/attendance record; payer and permitted signatory are separate linked identities |
| Exception or denied path | Parent payment is not parent gym entitlement; one dependent’s forms or receipts do not leak to siblings/unrelated guardians |

Planned acceptance AC77: demonstrate the specified source outcome and the exception/denied path; validate current scoped grants, failed/repeated submissions and exact readiness gates. Use synthetic data. No production implementation/test is implied.

## WF-JUNIOR-04

**FEAT-JUNIOR-04 — Dependent booking, pass and attendance**

| Contract | Required behaviour |
|---|---|
| Actor/trigger | Permitted guardian/staff books for a named junior |
| Required setup/preconditions | Current relation, activity age/eligibility, capacity, access and any applicable collection rule |
| Ordered checkpoints | Select dependent → validate/book → show named personal pass → staff scans → class register → recorded handover if required |
| Source record/outcome/handoff | Bookings/visits/register belong to junior; scoped billing/notice routed to the authorised responsible person |
| Exception or denied path | Never mark guardian attended or use their membership QR for child; expired grants, ineligible activity or unauthorised collection handled via review |

Planned acceptance AC78: demonstrate the specified source outcome and the exception/denied path; validate current scoped grants, failed/repeated submissions and exact readiness gates. Use synthetic data. No production implementation/test is implied.

## WF-JUNIOR-05

**FEAT-JUNIOR-05 — Junior privacy, communications and safeguarding**

| Contract | Required behaviour |
|---|---|
| Actor/trigger | Staff/guardian uses permitted member tools or raises a concern |
| Required setup/preconditions | Approved communication/contact grants and current programme policy |
| Ordered checkpoints | Show minimal permitted profile → route operational messages → record restricted concern/case → appropriate safeguarding owner reviews → audit |
| Source record/outcome/handoff | Private-by-default dependent profile, restricted health/HR-like case visibility and age-appropriate information where needed |
| Exception or denied path | No public child directory/location sharing, general feed or direct coach messaging by default; guardian link is not unrestricted clinical/legal authority |

Planned acceptance AC79: demonstrate the specified source outcome and the exception/denied path; validate current scoped grants, failed/repeated submissions and exact readiness gates. Use synthetic data. No production implementation/test is implied.

## WF-JUNIOR-06

**FEAT-JUNIOR-06 — Age-band or guardian relationship transition**

| Contract | Required behaviour |
|---|---|
| Actor/trigger | Management reviews eligibility/relationship change or revoked authority |
| Required setup/preconditions | Programme transition rule, live bookings/forms/payer/access and verified current relationship evidence |
| Ordered checkpoints | Identify affected age/relationship change → review future rights/permissions → obtain required new evidence → apply effective changes → notify/audit |
| Source record/outcome/handoff | Same dependent history retained; new independent account/changed guardian only through reviewed authorised linking |
| Exception or denied path | No birthday auto-promotion to unrestricted app, deletion of old evidence, silent billing transfer or automatic regrant of revoked guardian access |

Planned acceptance AC80: demonstrate the specified source outcome and the exception/denied path; validate current scoped grants, failed/repeated submissions and exact readiness gates. Use synthetic data. No production implementation/test is implied.
