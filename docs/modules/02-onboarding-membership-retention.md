# onboarding membership retention

Detailed extracted scope from baseline 0.17. Read with product-architecture.md and decisions-and-open-items.md. Each source reference is traceable; no requirement is removed by this grouping.

# Settings profile and confirmed onboarding rules

<!-- OG-SRC-0020 -->
Company Settings is the central control for the company’s style and feel, theme preset, logo/icon and company details. Publish one versioned configuration consumed by the entire application, with permitted gym overrides and existing template version rules. Documents remains the template composer, not a second branding authority. This supersedes earlier placement of white-label controls within Documents.

<!-- OG-SRC-0021 -->
Personal Profile contains avatar, name, permitted contact details, notification settings, password/security controls and personal light/dark/system preference. Notifications can be configured by supported channel and event category; essential service/account information remains available in app. Changing a profile never changes company branding or assigned permissions.

## Member account creation and membership setup

<!-- OG-SRC-0022 -->
There are three entry routes: self-signup from the selected company/gym landing page; staff creation of a pending member followed by an email invitation to register; or staff provisioning of an email-bound temporary credential where supported. Invitations and credential emails contain no health or financial data. Prefer single-use setup links; any temporary password must expire, be changeable immediately and require replacement before ordinary use. Never store plaintext passwords in member records or show permanent credentials to staff.

<!-- OG-SRC-0023 -->
Existing identities link to the pending member after verified email acceptance rather than creating duplicates. Route company/gym context explicitly. The member signs in, sets/resets their password as appropriate, completes their profile, emergency contacts and PAR-Q, signs required documents and sees a holding page.

<!-- OG-SRC-0024 -->
The new application appears in Membership management with its source, gym, assigned membership officer and checklist. Membership staff review onboarding, resolve required follow-up and arrange Direct Debit or other agreed payment setup. Track mandate/payment-method setup, payment confirmation and staff approval separately: a DD mandate alone does not prove collection.

<!-- OG-SRC-0025 -->
Only after required onboarding, membership configuration, approval and the configured payment condition are satisfied does the member receive full access to their entitled app features. Until then they can complete onboarding, respond, resolve payment and view status. Record who approved activation and when. Full access still follows single/all-gym entitlement and member RBAC.

## Delegated staff creation

<!-- OG-SRC-0026 -->
Company administrators can add/invite staff and assign them to any authorised gym. Gym managers and supervisors can also add/invite staff within their assigned gym, according to their delegated role permissions. They cannot grant company-owner/admin rights, assign another gym or create a role with privileges beyond their delegation. Record invitation, acceptance, role changes and inviter. A person working at several gyms keeps one identity with explicit assignments.

## Owner calendar and gym drilldown

<!-- OG-SRC-0027 -->
The company owner’s calendar includes all scheduled operational records across their company’s gyms: rotas, classes, visits, tasks, meetings and other schedules. Sensitive records retain their detailed-field controls. Selecting a gym or calendar event opens the matching local context without losing the company-wide view, filters or date. Member/staff/contractor calendars remain role-filtered.

## POS receipts and mandatory attribution

<!-- OG-SRC-0028 -->
At checkout, authorised till staff can issue a branded receipt immediately for printing and place a member-linked receipt in that member’s app. Anonymous customers can receive print or an explicitly requested delivery option without inventing a membership. Capture the company’s published logo/details and correct billing entity in the receipt version; reprints preserve the original transaction identity. Repeated delivery never creates a duplicate sale. Printer/terminal capabilities require integration testing.

<!-- OG-SRC-0029 -->
Every application page and public landing page displays the exact footer **Orb Gym - powered by orbsolutions.co.uk**, with orbsolutions.co.uk linked to https://orbsolutions.co.uk. Apply it to all four journeys, onboarding, login/recovery, portals and white-labelled pages. It remains present when company/gym branding is active; company settings do not remove it. Receipt/document attribution is separately templated; company branding on a receipt does not alter transaction details.

<!-- OG-SRC-0030 -->
Acceptance: test all three member entry routes, password setup/recovery, PAR-Q and pending membership queue, DD/payment states, authorised activation, scoped manager/supervisor invitations, owner-to-gym calendar navigation, printed/app receipts and footer presence across themes and white-labelled pages.

# Public website and joining pipeline

<!-- OG-SRC-0031 -->
The default public landing page is Orb Gym, using the supplied Orb Gym logo and Orb Gym Basic 01 direction based on orbsolutions.co.uk: cobalt #044EFC, Inter Tight headings, Manrope body, white/cool-grey surfaces and rounded cards. It markets Orb Gym and provides owner signup and sign-in. Preserve the logo proportions and maintain legibility in light/dark modes.

<!-- OG-SRC-0032 -->
Company and gym landing pages initially inherit Orb Gym branding, with content drawn from their public gym records. Company branding and permitted gym-logo overrides activate only when the company deliberately publishes white labelling. Creating a gym or uploading assets alone does not replace the default identity. The central Orb Gym marketing page remains separate from customer pages.

<!-- OG-SRC-0033 -->
Owner signup creates a workspace; member joining from a company/gym page creates an application within that company. Every page retains Orb Gym - powered by orbsolutions.co.uk.

<!-- OG-SRC-0034 -->
| Stage | Member experience | Business responsibility |
|---|---|---|
| Account creation | Register, verify email and create basic profile. | Create an identifiable prospect without active access. |
| Interests | Select gym, activities, package interests and contact preferences. | Capture structured enquiry details. |
| Holding stage | See application status, next steps and outstanding requests. | Assign a sales owner and follow-up date. |
| Consultation | Discuss options, arrange a visit/trial and agree a package. | Record communication and proposed membership. |
| Onboarding | Complete emergency contacts, required PAR-Q/health information, safety acknowledgements and agreements. | Review required information and exceptions. |
| Approval and payment | Complete the agreed payment process. | Confirm approval, documents and qualifying payment separately. |
| Activation | Receive the features and access included in the membership. | Issue the entitlement and record activation. |

<!-- OG-SRC-0035 -->
Proposed lead stages: New enquiry, Contact attempted, Consultation or trial, Offer agreed, Onboarding, Awaiting payment, Active, with Withdrawn, Declined and No response outcomes. Every open lead has an owner and next action.

<!-- OG-SRC-0036 -->
The holding account permits onboarding, requests, contact and payment resolution, but not active-member privileges. Health responses requiring review go to an authorised person. A questionnaire submission or signature does not itself establish fitness to participate.

<!-- OG-SRC-0037 -->
Store signed document versions, signatory, signing time and acknowledgement evidence. Material changes require an appropriate new agreement or acknowledgement; they do not overwrite previous signatures.

# Membership and account control

<!-- OG-SRC-0043 -->
| Membership tier | Entitlement |
|---|---|
| Single gym | One nominated gym at its configured rate. |
| All gyms | Participating company gyms at the configured network rate. |

<!-- OG-SRC-0044 -->
Define explicitly whether specialist courses, premium classes and future gyms are included. Prices remain configurable and have not been agreed. Changes of package preserve effective dates, previous terms and payment history.

<!-- OG-SRC-0045 -->
Keep identity account, membership lifecycle, payment state and entry/booking entitlement separate. A payment problem can restrict entitlements under company policy while preserving login for payment resolution and access to records.

<!-- OG-SRC-0046 -->
Membership states include pending, active, frozen, suspended, cancelled and expired. Record reason, effective dates, author and consequences. A freeze specifies billing treatment, existing bookings and membership end-date treatment. Automatic access changes require confirmed payment events and configured rules; authorised exceptions are visible and audited.

<!-- OG-SRC-0047 -->
Profiles show membership, payment history, receipts, signed documents, attendance, bookings and no-shows. Members can update their own permitted details and emergency contacts. Health information, management notes and payment administration have separate access scopes. Members also have a receipt/document file, class feedback history and permission-filtered calendar access. Payment receipts are sourced from confirmed financial records; uploaded payment evidence is labelled pending verification rather than treated as receipt confirmation.

# Membership administration and retention

<!-- OG-SRC-0210 -->
Members is the people/service view; Membership management governs plan versions, prices, deals, payments, entitlements, renewals, freezes and cancellations using those same profiles. Promotions published on company/gym landing pages link to controlled offers with eligibility, dates, terms, applicable gyms and price versions. Preview and approve publication; historical transactions retain the offer accepted.

<!-- OG-SRC-0211 -->
Retention views identify members whose attendance has declined or who have not visited for a configurable period. Show last confirmed visit, compared period, missed bookings and data completeness, accounting for freezes and known checkout/attendance gaps. Treat risk as an operational indicator, not a certainty about intent.

<!-- OG-SRC-0212 -->
AI suggests reviewable actions such as a check-in message, conversation or complimentary coach-led introduction where the business permits it. Management selects an action, assigns ownership, approves any offer and records response/outcome. No automatic discount, message or access change. This does not reintroduce the excluded paid personal-training-package module.


