# Feature Options Identified by Gap Review

Edition 0.21. These are discussion proposals, **not approved scope, delivered features or operational access grants**. They are excluded from the 115-feature/130-workflow catalogue totals. Keep the existing basic rental-coach tier and excluded prepaid PT packages unchanged.

## PROP-01 — Trial or guest access

Observed gap: the source joining pipeline mentions consultations/trials and rental coaching refers to an approved visitor arrangement, but only normal-member and PT-only entry paths are fully described.

PROPOSED journey if approved: enquiry → identify visit purpose/person/gym/time/sponsor → required relevant forms/rules/review → explicit limited pass → scan/visit and applicable activity register → expiry/revocation → optional same-identity member signup. The pass would not grant an ordinary member feed or all-day access by implication. Any price/age/guardian/induction conditions require decisions.

Recommendation: decide deliberately whether a trial visit is merely an enquiry/appointment or actual temporary gym access. If temporary passes are wanted, reuse the existing identity, form, access-grant and visit foundation. Until scope is decided, do not advertise a bookable trial as though the access workflow exists. This does not disable an already agreed PT-only path.

## PROP-02 — Junior members and guardians

Observed gap: age/guardian handling is explicitly open in GAP11. An ordinary account model does not define who signs, pays, books, receives notices or sees sensitive information for a junior.

PROPOSED journey if approved: guardian verifies/link authority → create protected junior person record → authorised form/permission review → choose membership/booking/payment responsibility → age-appropriate limited access → attendance/emergency handling → review when relationship/eligibility changes. Define what a coach, reception, junior and guardian may each see. Do not assume an age threshold, legal wording, consent basis or independent junior login.

Decision: adult-only initial service with an explicit joining boundary, guardian-managed juniors, or a later release. This is an important product choice before accepting a client whose services require junior participation; it is not a rule invented by this document.

## PROP-03 — Legacy member, staff and operations import

Observed gap: the current repository describes new account/setup journeys and technical migrations, but no business-user import/matching/reconciliation workflow for an already operating gym. It must not pretend historical charges, mandates or signed agreements transfer automatically.

PROPOSED journey if approved: authorised export → map fields/ownership → synthetic or controlled dry-run → validate/deduplicate/match → quarantine uncertain identities or private records → preview balances/access → owner review → import with batch provenance/rollback → reconcile totals → separately authorised invitations/activation. Preserve originals and migration source references; do not mass-email or activate from unverified imported rows.

Recommendation: for an existing-gym pilot, plan this deliberately or document a controlled manual onboarding alternative. Supported formats/source providers and financial/mandate portability require investigation and approval. No external accounts/data are accessed by this proposal.

## PROP-04 — Privileged login and account-recovery assurance

Observed gap: login/recovery and scoped permissions are described, but the actual project has not selected a multi-factor or privileged recovery policy.

PROPOSED journey if approved: choose supported auth capability → enrol additional factor/recovery method → verify → use for the chosen privileged sign-ins/actions → controlled lost-factor/recovery and session revocation. Define owner/platform-admin/financial-action applicability, staff/member options and break-glass recovery ownership. Avoid locking out the sole owner without a controlled recovery path.

Recommendation: explicitly assess stronger controls for owner/platform-admin roles when selecting the identity provider. Do not add a homemade authentication system, turn on real account factors or assume a provider supports them. This remains a proposed scope/control choice, not an implemented security guarantee.
