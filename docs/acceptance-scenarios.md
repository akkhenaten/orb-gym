# Cross Module Acceptance Scenarios

All are planned verification requirements, not executed tests. Use synthetic data and capture expected/actual outcome, environment/build, role, source requirement IDs and evidence.

| ID | Scenario and expected outcome |
|---|---|
| AC01 | Two companies each have multiple gyms; API, search, files, calendar, AI and exports cannot cross their boundary. |
| AC02 | Owner signup retry resumes one workspace; invited staff/member does not accidentally create an owner workspace. |
| AC03 | Manager/supervisor invites staff only within delegated gym/role scope; privilege escalation denied. |
| AC04 | Avatar/name/notifications/theme preference update without altering roles or signed records. |
| AC05 | Company brand publishes across app/pages/Orb/new documents; draft uploads do not activate white labelling. |
| AC06 | Gym override inherits/reset correctly; disable white labelling restores defaults; exact footer stays visible. |
| AC07 | All five selectable presets work across roles and modes; desktop left/iPad-mobile bottom navigation preserves context. |
| AC08 | Self signup, invitation and temporary credential routes complete verification, forms and holding-state onboarding. |
| AC09 | PAR-Q review, payment-method/DD setup, collection and membership approval remain distinct; premature activation denied. |
| AC10 | Member entitlement single/all gyms and PT-only status enforce correct booking, feed and entry access. |
| AC11 | Coach invite is not an entry pass; approved individual PT pass is gym/time-bound and duplicate scans are safe. |
| AC12 | PT-only upgrade reuses identity, valid forms and history while new member access waits for activation. |
| AC13 | Rental coach sees only own permitted class/resource/client-access scope; no member-directory/HR leak. |
| AC14 | Employed coach hourly override/default snapshots correctly; wages/internal revenue allocation are separate. |
| AC15 | Final-place concurrent class booking cannot oversell; pending tender/expired hold/late confirmation reconcile. |
| AC16 | One-off and regular classes show dates/capacity exceptions and accepted cancellation/no-show policy version. |
| AC17 | Coach/class/PT/room/rota reservations detect cross-gym overlaps, maintenance and travel conflicts. |
| AC18 | Coach register finalisation/correction updates member history; gym entry is not automatic class attendance. |
| AC19 | Current duty view distinguishes scheduled and confirmed staff; leaver disappears from current directory. |
| AC20 | Staff HR, payslips, disciplinary and one-to-one records have field/participant restrictions and retained history. |
| AC21 | Shared task templates create recurring occurrences and children; grouping preserves original IDs/evidence. |
| AC22 | Parent closure respects required unfinished children; dependency cycles rejected; group costs not duplicated. |
| AC23 | Card feed/attachments/decisions/audit tabs show the same typed records; private notes never reach member/vendor. |
| AC24 | Asset QR reports/links faults; contractor quote revision/approval and completion verification preserve versions. |
| AC25 | Invoice/commitment/payment totals reconcile; repair closure and asset return-to-service remain distinct. |
| AC26 | Barcode receiving, sale, stocktake, transfer, return and adjustment preserve per-gym stock ledger. |
| AC27 | Till retries cannot double charge/deduct; quick sale has no stocked item; refund/stock return separate. |
| AC28 | Branded receipt prints/appears in member app; repeated delivery does not duplicate sale or rewrite issued data. |
| AC29 | Public gym/coach page auto-update uses approved records; private documents and unapproved prices never publish. |
| AC30 | Flip cards usable by keyboard/touch/reduced motion; all public booking links preserve gym/offer context. |
| AC31 | Feed mentions/location/moderation obey audience; post-to-case conversion retains original visibility. |
| AC32 | Attendance corrections/freeze/data gaps affect retention interpretation; outreach/offer uses authorised action. |
| AC33 | Calendar events deep-link correctly for every role; private HR titles are concealed; stale/revoked links fail safely. |
| AC34 | Orb sources reports and executes authorised routine commands; approvals and retry protection remain enforced. |
| AC35 | Upload failure, session expiry, resize and rotation do not create false saved states or lose recoverable draft context. |
| AC36 | Database/evidence restore reconciles financial records, issued files and pending jobs; recovery evidence recorded. |

Each feature spec adds detailed local checks and maps these cross-module cases. Agree measurable accessibility, performance, capacity and recovery targets rather than claiming generic production readiness.


## Review r1 additional scenarios

These are required planning checks, not tests already run. Select exact policy values through the gap register before writing outcome assertions that depend on them.

| ID | Scenario and expected outcome |
|---|---|
| AC37 | Owner transfer preserves an owner; workspace suspension/restoration respects scoped access; support access is bounded and audited. |
| AC38 | Member recovery/invite tokens expire/revoke correctly; verified existing account links without duplicate profile; revoked sessions cannot complete old grants. |
| AC39 | Membership freeze/cancel/reactivate produces explicit effective billing, booking and entry changes without erasing receipts/history. |
| AC40 | Course/block and waiting-list acceptance respect chosen partial/expiry rules and concurrent places; RSVP never consumes capacity unexpectedly. |
| AC41 | Rental-coach rent/arrears and employed-coach earnings/adjustments reconcile to separate source charges; arrangement change resolves future bookings and access. |
| AC42 | Leave/swap/cover approval, cross-gym travel, published shift changes and timesheet correction maintain rota history and the truthful duty view. |
| AC43 | Training/SOP revisions, expiry, signed contracts and restricted payslip delivery preserve access and version evidence; staff archive/reactivation reviews permissions. |
| AC44 | Supplier accept/decline, operative delegation/revocation, quote variation and partial invoice/payment remain distinct; contractor cannot self-approve. |
| AC45 | Company/gym finance aggregates reconcile to charges, collections, credits, internal allocations and costs once; incomplete profit is labelled unavailable/incomplete. |
| AC46 | Report/AI/export metric definitions agree across periods/gyms; private fields remain restricted during asynchronous generation and after role revocation. |
| AC47 | Till cash shift reconciliation, pending/failed tender, authorised void/discount, unknown barcode and insufficient stock follow explicit policy; no phantom completed sale. |
| AC48 | Required notifications target authorised recipients once, honour channel preferences, distinguish acknowledgement and recover from failed sending; sensitive data is absent from message previews. |
| AC49 | Template required fields, preview/review/publication and signature/issued snapshot work; template editing alone cannot issue financial records or assert legal approval. |
| AC50 | Landing publication/rollback, gym rename/archive and invalid auto-update preserve correct public links/content; central Orb Gym site never becomes a private customer gym directory automatically. |
| AC51 | All role/module routes including Documents, coaching, publishing and finance are reachable within permission on desktop/tablet/mobile; exact footer is visible without obscuring bottom controls. |
| AC52 | Every preset resolves its token contract across all major components/states; theme changes preserve data/drafts and do not unexpectedly activate a brand. |
| AC53 | Full feed inventory, media replies, reporting/moderation and feedback resolution obey audience rules; additional social features are not claimed without scoped acceptance. |
| AC54 | File validation/private delivery, unavailable providers, duplicate background work, monitoring and rollback/restore are verified against agreed measurable targets before release. |

| ID | Delivery-plan verification outcome |
|---|---|
| AC55 | Initial Orb Gym delivery cards have unique contiguous numbers from 00, prerequisite-before-dependent order, parent/child rollups distinguished from blockers, stable platform IDs and matching file references; board ordering or its explicit indexed fallback is verified. |

## Operational gap-review acceptance — edition 0.21

Planned criteria only. Policy-dependent expected outcomes use the resolved operational decision, not a guessed rule.

| ID | Required scenario/result |
|---|---|
| AC56 | Post-activation payment reversal/late failure updates the financial source/history and creates owned Membership review; no duplicate collection or implicit unapproved access/cancellation rule. |
| AC57 | New form/policy version targets the decided cohort; preserves old signatures/answers and applies only selected effective entitlement/bookings rules while review is pending. |
| AC58 | Confirmed/paid service disruption validates replacement or chosen cancellation/reschedule, resolves every affected booking and financial outcome, and sends consistent scoped notices without duplicate charges/refunds. |
| AC59 | Same-member repeated/concurrent booking, cancellation, waitlist offer and hold/payment expiry cannot allocate a duplicate person-occurrence place, oversell or charge twice. |
| AC60 | Approved leave/credential/departure after rota publication creates owned cover/service-impact exceptions; published amendments, actual presence and private reasons remain correct. |
| AC61 | Unavailable approver is reassigned/escalated only within existing authority; current quote validity/version is rechecked, stale/concurrent decisions do not create duplicate commitments and contractor self-approval is denied. |
| AC62 | Recurring-template change previews affected future/issued/in-progress work, preserves performed evidence and resumes partial generation without duplicate sheets/children or silent closure. |
| AC63 | Supplier organisation/contact onboarding verifies correct scope, credentials/instructions and assignments; upload/invite alone grants no unrestricted job/member/HR access. |
| AC64 | Operative delegation is within supplier grants; revocation blocks future file/export/queued actions while preserving original performer and completion evidence. |
| AC65 | One user in two companies can edit only the field-owning identity/workspace record; private health/HR/contact data do not propagate through common identity, cache, export or AI; issued snapshots remain unchanged. |
| AC66 | One-gym archive exposes and resolves/assigns future services/people/resources/balances; chosen access/settlement outcomes preserve unrelated gyms and historical records. |
| AC67 | Confirmed tender with failed sale/stock/device state is recovered using its original references; correct authorised fulfilment/remedy has one effective charge/movement and no blind recapture. |
| AC68 | Partial/duplicate/mismatched/over-allocated payment is matched to correct entity/customer/currency/debt or remains owned and unallocated; reports and source balances reconcile without extra revenue. |
| AC69 | Rental-class collector/issuer/inclusion/refund/settlement follows the explicit chosen mode; public terms and historical records agree, without automatic employee allocation or unauthorised payout. |
| AC70 | Withdrawn coach/expired offer/archived gym refreshes dependent public projection/CTA within specified targets; old links revalidate current source, no private archived content leaks and failures remain owned. |

## Completed gap capabilities — edition 0.22

Planned only. Capability setup/rights/content/provider requirements must be supplied and verified before live use.

| ID | Required feature outcome and exception |
|---|---|
| AC71 | Trial offer setup and publication: Controlled offer linked to gym/services/public CTA and limited access conditions. Missing values keep offer unpublished; no implied free entry, unlimited visits, junior eligibility or full member feed |
| AC72 | Guest application, review and pass issue: Guest person/application, checklist, source payment and individual time/visit-limited access grant. Invitation is not a pass; incomplete forms/payment/review leave holding status; repeat/over-limit visits follow explicit offer rule |
| AC73 | Trial entry and activity attendance: Reception shows guest purpose/window; actual visit and class attendance remain independent. Expired/revoked/wrong-gym pass denied; repeated scans do not consume another allowed visit; no access to unrelated membership tools |
| AC74 | Guest expiry, cancellation and membership upgrade: Historical trial evidence retained; new member privileges appear only after normal membership gates. No automatic DD/renewal/full membership; invalid or changed forms require appropriate new review; legitimate new member rights independent of old expired trial |
| AC75 | Junior programme setup: Company/gym/activity settings with explicit age bands and approved forms; no universal legal age hard-coded. Unconfigured programme cannot accept bookable junior memberships; direct login/social/coach DM disabled by default |
| AC76 | Guardian invitation and authority review: Effective-dated guardian relation with separate book/pay/sign/contact/collect permissions and audit. Family name/emergency contact does not prove authority; disputes/unclear restrictions remain private review cases, not automatic sharing |
| AC77 | Junior membership, forms and billing: Junior has own member/person/attendance record; payer and permitted signatory are separate linked identities. Parent payment is not parent gym entitlement; one dependent’s forms or receipts do not leak to siblings/unrelated guardians |
| AC78 | Dependent booking, pass and attendance: Bookings/visits/register belong to junior; scoped billing/notice routed to the authorised responsible person. Never mark guardian attended or use their membership QR for child; expired grants, ineligible activity or unauthorised collection handled via review |
| AC79 | Junior privacy, communications and safeguarding: Private-by-default dependent profile, restricted health/HR-like case visibility and age-appropriate information where needed. No public child directory/location sharing, general feed or direct coach messaging by default; guardian link is not unrestricted clinical/legal authority |
| AC80 | Age-band or guardian relationship transition: Same dependent history retained; new independent account/changed guardian only through reviewed authorised linking. No birthday auto-promotion to unrestricted app, deletion of old evidence, silent billing transfer or automatic regrant of revoked guardian access |
| AC81 | Authorised source and mapping setup: Versioned import definition, source provenance and retention/private staging controls. Initial file-based import does not imply a live legacy API connector or permission to access another platform; no passwords/card secrets imported |
| AC82 | Staging, validation and duplicate matching: Inert rows with proposed creates/links/errors and exact counts; no live rights or notifications. Ambiguous person/guardian/company match is reviewed, never silently merged; invalid financial/health/signed data not fabricated into trusted records |
| AC83 | Preview approval and controlled commit: Stable batch/row IDs, auditable source links and controlled source-module writes. Changed file/mapping requires fresh preview; commit retry cannot duplicate profiles/balances; failure does not claim whole batch succeeded |
| AC84 | Post-import invitations, balances and activation: Imported history marked with provenance; ordinary onboarding gates and finance reconciliations remain authoritative. No mass-email/activation from a CSV checkbox; imported payment/mandate/signature metadata does not configure a provider, collect money or recreate a legal signature |
| AC85 | Import repair, compensation and audit: Pre-commit staging can be discarded under policy; committed history uses auditable corrections/compensation. Do not promise rollback can unsend emails, undo payments or erase signed/audited records; dependent real actions need their own authorised resolution |
| AC86 | Privileged role policy and factor enrolment: Provider-held credentials/factors and policy/enrolment state; owner/platform admin MFA required before privileged production use. No homemade factor storage or claimed MFA from two knowledge questions; missing capability blocks privileged production readiness |
| AC87 | Sign-in and sensitive-action step-up: Authentication assurance and business authorisation remain distinct; factor success does not grant a new role. Failed/expired challenge does not approve money/access action; session/trusted-device duration must be defined and rechecked, not unlimited bypass |
| AC88 | Lost factor and sole-owner recovery: Audited bounded recovery separate from membership/financial approval; verified owner continuity retained. Never reset from a casual email/feed message or delete sole owner; support cannot sign/approve as customer; actual recovery flow must be tested before launch |
| AC89 | Role change, compromise and revocation: Revocation affects app, private files, background work, exports and AI; business data/history retained. Sign-out/device loss is not membership cancellation or HR record deletion; provider failure keeps privileged actions blocked and offers safe recovery status |
| AC90 | Missing or invalid required policy/content/provider setup keeps the affected service unpublished/unbookable or action restricted with an exact next owner; filling/publishing a version activates only that permitted scope, never unrelated data/access or historical document changes. |
