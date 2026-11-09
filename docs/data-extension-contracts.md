# Data, Permission and Reporting Extensions — 0.22

These are logical responsibilities for the completed gap capabilities. They reuse the existing modular application; they do not select a database, identity provider, SQL schema or independent microservices. Implement actual keys, constraints, server-side grants, transactions and file rules after project inspection.

## Logical records and ownership

| Record/responsibility | Required relationships and history | Source of truth / consumers |
|---|---|---|
| Trial offer/application | Workspace/gym, purpose/activity, versioned explicit price/free and eligibility/forms, allowed dates/visits, reviewer, participant, source enquiry and status. | Membership/onboarding owns application; public page consumes only ready published offer. |
| Typed limited access grant | Participant, gym, purpose, appointment/activity where relevant, effective/expiry/revocation, usage/visit identity, source approval and policy version. | Existing entitlement/access foundation; pass/reception consumes current grant. Invitation is a different token. |
| Dependent person | Workspace-scoped person with individual membership/beneficiary identity, optional separate login linkage, age eligibility data only as needed, own forms/attendance/visits and restricted fields. | Existing profile/membership foundation; no fake email or use of guardian's participant identity. |
| Guardian relationship | Verified adult identity, dependent, workspace, independent book/pay/sign/contact/collect/read grants, evidence/reviewer, effective dates/revocation and reason. | Relationship/permission source; UI, bookings, documents, notifications and exports check current grants. |
| Junior programme policy | Gym/activity eligibility, reviewed form/authority requirements, communication/privacy/collection/transition settings and versioned applicability. | Company/gym settings plus approved programme; no universal age/custody/clinical decision encoded from a label. |
| Import definition/batch/row | Workspace, operator/source authorisation, format/mapping version, protected staged source reference/hash, dry-run/validation/match/quarantine, approved scope, idempotent commit result and linked source records. | Import workspace owns provenance/staging; source domain commands own actual created records and corrections. |
| Imported history/opening balance | Original source/type/date/reference and verified/review status, beneficiary/biller, amount/currency and explicit imported-history/adjustment classification. | Finance/person record with provenance; never a new capture, newly issued signature or silently confirmed receipt. |
| Privileged assurance policy | Platform minimum versus permitted company extension, role/action requirement, supported factor/step-up/session/revocation/recovery settings and verification evidence. | Platform/auth policy; trusted command authorisation consumes current assurance as well as business grants. |
| Factor/session/recovery references | Identity/provider handles, enrolment/verification state, bounded recovery case, revoked factor/session references, bootstrap eligibility and audit. | Auth provider holds actual secrets; Orb stores necessary protected references, not raw factors or reusable recovery secrets in notes/files. |
| Policy version/readiness result | Company/gym/service scope, required field/owner/value/version, validation evidence, affected records, publication/applicability and missing-field errors. | Settings/owning module; readiness is rechecked on trusted publication/activation, not only a disabled frontend button. |

Company/gym scope applies to every join, private file, notification, search, report, import stage, AI request and background job. One global login does not combine unrelated company person records, junior health data or guardian grants. Public images and documents require explicit approved projections; templates and issued snapshots preserve source ownership/version.

## Default action/field boundaries for new contexts

| Context | Permitted product surface | Explicit boundary |
|---|---|---|
| Trial/guest | Own application/checklist/visit/pass/receipt/profile/contact and offered eligible activity. | No general member feed, unrelated directory, all-gym/open-ended access or self-approval. |
| Guardian | Selected linked dependent tools only for individually approved relationship grants. | Payer is not automatically signatory/collector/health viewer or member; do not reveal another guardian's payment instrument/private conversation. |
| Junior | Own scoped participant record and approved age-appropriate tools if separate login is deliberately enabled. | Direct login, public profile/social/location and coach direct messages default off; no automatic access widening on birthday. |
| Reception | Participant photo/identity, current grant, visit outcome and permitted operational/collection instructions. | No complete questionnaire, guardian dispute evidence, private billing instrument or unrestricted relationship editing. |
| Coach | Assigned class/PT participants and relevant authorised operational instructions; their own role/earning tools. | No blanket guardian/member health access, private family data, approval rights or rental coach employee-payroll access. |
| Import operator/reviewer | Explicit authorised entities/fields/batches in their workspace. | No source-provider access by assumption, automatic identity merges, activation/invitation/payment or unrestricted raw-file export. |
| Privileged owner/platform admin | Current business grant plus required provider-backed authentication assurance. | MFA success does not add company/HR/finance rights; bootstrap/recovery is not unrestricted production access or impersonation. |

The concrete role/action/field matrix must implement these boundaries and record any permitted company-specific grant. Exceptions must be deliberate and reviewed, never inferred from a UI role label or a common email.

## Financial beneficiary and report definitions

The person using a service, person booking, payer and permitted signatory may differ. Store those relationships explicitly. A child's class register/pass identifies the child; a guardian's payment does not make the guardian attended or give them gym entry. A receipt is sourced from the actual transaction and issuer; views expose only the appropriate fields to each authorised party.

Count active membership beneficiaries separately from app accounts, payers, guardians, trials and staff. A guardian counts as an active gym member only if they separately hold that entitlement. Repeat trial visits do not create another person; trial-to-member conversion follows the existing same-identity/person linkage and explicit reporting period definition. Imported opening balances/history are distinct from new cash collected. Imported visit data is labelled with provenance and included in verified-attendance metrics only under the defined review/source-quality rule.

Staff/coach payroll amounts, rental income and internal allocations remain separate from customer collection. No dependent/guardian or import relationship creates a second revenue entry, a synthetic signed document or an automatically working payment mandate. Currency/tax/rounding and metric period/basis remain explicit company/report configuration.

## Change, revocation and recovery

Relationship, offer, policy and authentication changes re-evaluate future actions/notifications/files/background work under current grants. Keep previous actor/version evidence; do not rewrite historical bookings, payments, attendance or signed records. Import rollback distinguishes discardable staging from committed records needing compensating source actions. Restores must reconcile these new relationships/grants/provider references without reviving revoked access or replaying invitations/charges.

Existing original signed agreements/receipts and their source evidence may be retained as protected imported copies with provenance and review status. Import must not fabricate a new signature, issue a misleading replacement receipt or mark old terms valid without the required review. A verified original may satisfy a current evidence requirement only under its explicit applicability rule. Any real payment-mandate migration is a separately authorised, provider-supported process, never a consequence of uploading a reference in a file.
