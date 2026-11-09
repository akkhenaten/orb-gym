# Privileged Authentication and Recovery

Repository 0.22 · OG-EXT-004. 4 concrete feature workflows; status PRODUCT_DESIGN_SPECIFIED / IMPLEMENTATION_NOT_STARTED.

All-user account foundation with mandatory owner/platform-admin privileged controls

Use the selected identity provider's supported authenticators and recovery, with a preference for stronger phishing-resistant options where feasible; do not build a custom authentication system or choose a vendor from this document. Platform minimums require owner/platform-admin MFA and appropriate step-up for configured sensitive actions before privileged production use. Company policy can extend requirements to staff/finance roles but cannot silently weaken platform minimums. Members' optional factor support depends on provider capability. A verified MFA challenge is not permission to approve a refund or read HR fields. Lost-factor/sole-owner recovery, session expiry/revocation, alternate permitted recovery and break-glass accountability are part of acceptance, not a later support improvisation. No real credentials/factors/accounts are changed by this design.

See the [detailed module](../modules/16-privileged-auth-and-recovery.md), [feature specification](../../spec/privileged-auth-recovery.md), [setup gates](../setup-and-readiness.md) and [source extension](../source-extension-register.md). Common scope/audit/retry/notification/responsive acceptance in [workflow index](README.md) applies to every pipeline.

## WF-AUTH-01

**FEAT-AUTH-01 — Privileged role policy and factor enrolment**

| Contract | Required behaviour |
|---|---|
| Actor/trigger | Platform/company owner configures supported authentication |
| Required setup/preconditions | Actual provider supports factors, required roles/actions, revocation and controlled recovery; owner has verified identity |
| Ordered checkpoints | Inspect capability → define platform minimums → enrol supported factor/recovery → verify enrolment → allow privileged use |
| Source record/outcome/handoff | Provider-held credentials/factors and policy/enrolment state; owner/platform admin MFA required before privileged production use |
| Exception or denied path | No homemade factor storage or claimed MFA from two knowledge questions; missing capability blocks privileged production readiness |

Planned acceptance AC86: demonstrate the specified source outcome and the exception/denied path; validate current scoped grants, failed/repeated submissions and exact readiness gates. Use synthetic data. No production implementation/test is implied.

## WF-AUTH-02

**FEAT-AUTH-02 — Sign-in and sensitive-action step-up**

| Contract | Required behaviour |
|---|---|
| Actor/trigger | User with privileged rights signs in or requests a protected action |
| Required setup/preconditions | Current identity/session, required factor and applicable recent-auth rule |
| Ordered checkpoints | Authenticate → verify required additional factor/assurance → authorise role/action → execute source command → audit/outcome |
| Source record/outcome/handoff | Authentication assurance and business authorisation remain distinct; factor success does not grant a new role |
| Exception or denied path | Failed/expired challenge does not approve money/access action; session/trusted-device duration must be defined and rechecked, not unlimited bypass |

Planned acceptance AC87: demonstrate the specified source outcome and the exception/denied path; validate current scoped grants, failed/repeated submissions and exact readiness gates. Use synthetic data. No production implementation/test is implied.

## WF-AUTH-03

**FEAT-AUTH-03 — Lost factor and sole-owner recovery**

| Contract | Required behaviour |
|---|---|
| Actor/trigger | Account holder reports loss; authorised provider/support route handles verified recovery |
| Required setup/preconditions | Approved identity/recovery procedure, recorded case and no unreviewed grant expansion |
| Ordered checkpoints | Open restricted recovery → verify through approved method → review sensitive role/sole-owner continuity → recover factor → revoke obsolete sessions/factors → restore permitted access |
| Source record/outcome/handoff | Audited bounded recovery separate from membership/financial approval; verified owner continuity retained |
| Exception or denied path | Never reset from a casual email/feed message or delete sole owner; support cannot sign/approve as customer; actual recovery flow must be tested before launch |

Planned acceptance AC88: demonstrate the specified source outcome and the exception/denied path; validate current scoped grants, failed/repeated submissions and exact readiness gates. Use synthetic data. No production implementation/test is implied.

## WF-AUTH-04

**FEAT-AUTH-04 — Role change, compromise and revocation**

| Contract | Required behaviour |
|---|---|
| Actor/trigger | Owner/security role removes access or investigates suspected compromise |
| Required setup/preconditions | Current session/grant/factor records and authorised incident process |
| Ordered checkpoints | Record event → restrict/revoke grants/sessions as authorised → review pending commands/exports → notify safely → restore only reviewed rights |
| Source record/outcome/handoff | Revocation affects app, private files, background work, exports and AI; business data/history retained |
| Exception or denied path | Sign-out/device loss is not membership cancellation or HR record deletion; provider failure keeps privileged actions blocked and offers safe recovery status |

Planned acceptance AC89: demonstrate the specified source outcome and the exception/denied path; validate current scoped grants, failed/repeated submissions and exact readiness gates. Use synthetic data. No production implementation/test is implied.
