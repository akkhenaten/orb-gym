# User Management, Accounts and Permissions

Repository 0.21. 11 source-backed primary and exception workflows for this domain. IDs are stable feature/workflow references, not delivery-card sequence numbers.

## Sources and receiving specifications

[01-workspaces-and-access.md](../modules/01-workspaces-and-access.md); [02-onboarding-membership-retention.md](../modules/02-onboarding-membership-retention.md); [12-access-navigation-and-notifications.md](../modules/12-access-navigation-and-notifications.md)

[workspace-access](../../spec/workspace-access.md); [onboarding-membership](../../spec/onboarding-membership.md); [shell-settings-branding](../../spec/shell-settings-branding.md)

Planned cross-module acceptance: AC01, AC02, AC03, AC04, AC08, AC37, AC38. Decision references: GAP01, GAP09, GAP11, GAP13, GAP15. Read the [common contract](README.md#common-workflow-contract).

## Module surface, state boundaries and ownership

User management with scoped search, invites/roles/gym assignments/state; personal Profile for avatar/name/security/preferences; signup/recovery/holding views.

Account/invitation/session, gym assignment, employment, membership and supplier states are independent. Restricted login is not automatically a cancelled membership.

Authorised inviter/admin → intended user → appropriate membership/HR/vendor team; platform support only under a separate audited scope.

The lifecycle words below are business checkpoints. The builder must resolve exact enum values and actor/action/field tables before implementation, with all open policy branches retained. Existing authority and source-specific review rules apply; no new approval gate or access right is created merely by this catalogue.

## WF-USER-01

**FEAT-USER-01 — Create user in correct journey**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Owner/staff invites staff/member/vendor or person self-signs |
| Preconditions | Target workspace, intended role/application and appropriate entry route |
| Ordered journey / checkpoints | Choose journey → create pending assignment/application → issue context-bound setup → verify/link identity → route to limited/full permitted home |
| Source records / result / handoff | One account may hold separate assignments; user management does not activate paid access by itself |
| Exception / decision branch | Wrong context or existing email must not duplicate identity, create owner role or reveal another company profile |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC01, AC02, AC03, AC04, AC08, AC37, AC38 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-USER-02

**FEAT-USER-02 — Invitation, resend, expiry and revocation**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised inviter manages outstanding setup |
| Preconditions | Current scoped invite and recipient, no private data in email |
| Ordered journey / checkpoints | Create token → deliver → accept/expire/revoke → resend with controlled validity → audit |
| Source records / result / handoff | Invitation acceptance links intended role/gym/person record; notification delivery separate |
| Exception / decision branch | Exact TTL/provider mechanics selected by builder; reused/revoked token cannot restore privileges or bypass forms |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC01, AC02, AC03, AC04, AC08, AC37, AC38 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-USER-03

**FEAT-USER-03 — First login and temporary credential replacement**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Invited person completes secure account setup |
| Preconditions | Verified acceptance and permitted setup mechanism |
| Ordered journey / checkpoints | Open setup → set/replace expiring credential where supported → sign in → required profile/forms → appropriate holding/home state |
| Source records / result / handoff | Password material belongs to auth service, not member/staff record |
| Exception / decision branch | No plaintext/permanent password displayed to staff; setup failure leaves recoverable pending state |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC01, AC02, AC03, AC04, AC08, AC37, AC38 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-USER-04

**FEAT-USER-04 — Sign-in, sign-out and recovery**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Any user authenticates or requests reset |
| Preconditions | Chosen identity provider and supported verified recovery channel |
| Ordered journey / checkpoints | Sign in → choose authorised context → access tools; request recovery → verify → replace credential; sign out ends session as implemented |
| Source records / result / handoff | Session/recovery events without leaking sensitive records; context privileges checked separately |
| Exception / decision branch | No credential flow is claimed configured; expired session/link cannot grant access; exact revocation behaviour requires technical design |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC01, AC02, AC03, AC04, AC08, AC37, AC38 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-USER-05

**FEAT-USER-05 — Profile, avatar and contact management**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | User edits own allowed details |
| Preconditions | Current profile and allowed field scope |
| Ordered journey / checkpoints | Open profile → edit/upload → validate → save → update permitted display projection |
| Source records / result / handoff | Personal name/avatar/contacts separate from company brand and signed historical documents |
| Exception / decision branch | Editing a job title or certificate image cannot grant permissions/qualification; failed upload remains visibly pending |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC01, AC02, AC03, AC04, AC08, AC37, AC38 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-USER-06

**FEAT-USER-06 — Notification and appearance preferences**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | User chooses personal channels and light/dark/system |
| Preconditions | Supported channels and account policy |
| Ordered journey / checkpoints | Choose category/channel/mode → save → apply preference → retain essential in-app account state |
| Source records / result / handoff | User preference follows user; company theme/logo remains company-owned |
| Exception / decision branch | Opting out does not change role or erase account warnings; marketing consent and acknowledgement are separate |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC01, AC02, AC03, AC04, AC08, AC37, AC38 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-USER-07

**FEAT-USER-07 — Gym assignments and role delegation**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised administrator changes a user’s grants |
| Preconditions | Delegation ceiling, company/gym/action/field scope and effective assignment |
| Ordered journey / checkpoints | Select permitted role/gyms → review impact → save/audit → reauthorise views/jobs/files |
| Source records / result / handoff | Updated grants propagate to search, API, AI, exports and subscription audiences |
| Exception / decision branch | Cannot self-elevate or grant another company/gym without authority; multiple roles never union unrelated workspaces |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC01, AC02, AC03, AC04, AC08, AC37, AC38 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-USER-08

**FEAT-USER-08 — Account restrict, archive, reactivate and eligible delete**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised admin reviews user lifecycle |
| Preconditions | Account/member/employment/supplier states and retention obligations distinguished |
| Ordered journey / checkpoints | Record reason/date → apply authorised state → resolve assignments/sessions → preserve history → review reactivation/deletion |
| Source records / result / handoff | User-account state is not automatically membership cancellation or HR deletion |
| Exception / decision branch | Financial/health/signed records and sole-owner constraints prevent casual cascade deletion; policies remain open |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC01, AC02, AC03, AC04, AC08, AC37, AC38 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-USER-09

**FEAT-USER-09 — Explicit workspace and gym switching**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Multi-role person selects working context |
| Preconditions | Existing authorised memberships/assignments |
| Ordered journey / checkpoints | Choose workspace → show scoped gyms/roles → select gym/module → retain permitted navigation context |
| Source records / result / handoff | Record links resolve within explicit selected context and current grants |
| Exception / decision branch | Never silently switch company from a QR/link; inaccessible target gives safe next step rather than leaked details |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC01, AC02, AC03, AC04, AC08, AC37, AC38 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-USER-10

**FEAT-USER-10 — User search, exports and privileged support**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Delegated admin/support searches or investigates |
| Preconditions | Appropriate scoped fields and recorded support authority where applicable |
| Ordered journey / checkpoints | Search/select → authorise record/fields → inspect/export via scoped command → record audit → end temporary support grant |
| Source records / result / handoff | Search/exports/background outputs use same scope as app; platform admin not automatically a customer owner |
| Exception / decision branch | Guessed IDs, revoked grants and historical download links cannot bypass restrictions; private info excluded from cards/logs |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC01, AC02, AC03, AC04, AC08, AC37, AC38 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-USER-11

**FEAT-USER-05 — Personal identity versus company-specific person records**

Exception/lifecycle subflow of WF-USER-05; review finding GR08. Existing source-grounded behaviour is clarified; new policy alternatives are not approved.

| Contract | Required behaviour |
|---|---|
| Actors/trigger | User edits own allowed details |
| Preconditions | One verified identity with explicit membership/employment/PT/supplier records in one or more workspaces; field ownership defined. |
| Authoritative outcome/handoff | Update only the field’s owning identity or company/gym person record; preserve private form/HR/contact data and document snapshots across explicit context switches. |
| Exception/policy boundary | Sharing a global login/avatar is not permission to copy health answers, emergency contacts, private notes or employment data into another company. Which fields are global must be specified before implementation. |

Business checkpoints below describe behaviour, not mandatory API enum spellings. Each decision uses current delegated authority.

| Actor | Before/after checkpoint | Guard/action | Record and next owner | Failure/return path |
|---|---|---|---|---|
| User/authorised profile editor | Current context → editable fields resolved | Classify identity-owned display/security field versus workspace person field | Explicit scoped form and owning record/version | No field is treated global simply because two memberships share an email |
| Trusted profile command | Draft edit → scoped save | Check actor/field/record ownership and write only selected source | Audit and permitted local projection update | Cross-company joins/cache/export cannot inherit private person data by common user ID |
| User | Saved context → another authorised context | Switch workspace and retrieve that workspace’s permitted profile/forms | Correct separate person data and unresolved onboarding requirements | No silent migration of PAR-Q/HR evidence or autofill from another company |
| Record consumer | New data → current display only | Refresh allowed current views while preserving issued/signed snapshots | Published/public fields reviewed separately | Past contracts/receipts retain original data; approved public profile edits do not expose private contacts |

Planned acceptance: AC01, AC02, AC03, AC04, AC08, AC37, AC38, AC65. Operational decisions: no new policy choice; existing scoped rules still require technical completion. See [decision discussion](../decisions/operational-decisions.md).


## Access refinement — edition 0.25

WF-USER-07 now includes role-template editing and per-person allow/deny, scope/action/field constraints, effective-access preview, policy version conflict and audited revocation. WF-USER-09 keeps explicit company/gym context and prohibits cross-assignment scope combination. WF-USER-10 exposes broad platform inspection only through the logged separate platform context. Read [current access contract](../access/access-model.md).
