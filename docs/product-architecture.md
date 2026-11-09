# Orb Gym Product Architecture

Source baseline 0.17, reviewed handoff r2; repository edition 0.22, retaining earlier reviews and completing the identified capability/operational designs · 7 November 2026. Known contradictions corrected in this working copy; original retained in history/. The live Page has not been edited by this pack review. Planning handoff; not a build authorisation.

Living architecture draft · Version 0.17 · 6 November 2026

Orb Gym is a configurable platform for an owner to manage several gyms remotely. It connects finances, memberships, staffing, classes, attendance and daily operations in one company workspace, while giving each gym its own identity and operating environment.

Orb Gym is a general multi-company platform. Any gym owner can register, create their own company workspace and add as many gyms as they need. Primal and Valkyrie are illustrative customer gyms, not fixed product configuration. Orb Gym remains the product name; companies and individual gyms can apply their own branding with the mandatory footer Orb Gym - powered by orbsolutions.co.uk.

This baseline consolidates the agreed product direction. Technical mechanisms below are recommendations for later validation. The default Orb Gym logo and Orb Solutions design reference are supplied; detailed visual specifications, prices, employment and membership terms, payment integrations and hosting have not been selected for Orb Gym. OpenKBS is the selected builder for Orb Gym, as explicitly confirmed by the founder. Its actual project configuration and supported implementation capabilities still require inspection.

# Company and gym structure

The first layer is the company workspace. Its owner uploads the company logo and configures company details, contact information, default branding and operating policies. Within it, authorised management can add multiple gyms, including additional brands or locations.

| Level | Responsibility |
|---|---|
| Platform | Default Orb Gym identity, service administration and controlled support access. |
| Company workspace | Company profile, gym portfolio, shared people, reporting, policies and default design. |
| Gym | Local brand, location, facilities, memberships, timetable, reception and operations. |
| Area or resource | Rooms, training spaces, equipment and operational zones within a gym. |

A brand and a physical gym are separate concepts: the same brand could later operate several locations. Each gym can inherit company settings or override permitted fields. One person has one account with explicit member entitlements or staff assignments; visiting another permitted gym does not require a duplicate profile.

The company workspace is the access boundary. A person with access to several workspaces switches context explicitly. Company-wide permissions and individual gym assignments are distinct.

# Owner signup and platform administration

Owner onboarding is self-service: create account → verify email → create company workspace → enter company details and optional branding → add first gym → configure services and invite staff. Subsequent gyms are added through Add gym. There is no fixed product-level gym-count limit; capacity, performance and any future commercial limits must be stated separately rather than assumed.

Workspace creation and owner membership commit together with retry-safe onboarding so repeated signup callbacks do not create duplicates. Incomplete onboarding resumes. An invited staff member or joining member follows the invitation/application flow instead of becoming a workspace owner automatically. One identity can hold roles in several workspaces through explicit grants and context switching.

Every gym belongs to one company workspace. Membership plans, staff, POS, inventory, classes, attendance, HR, cases, maintenance, evidence and finances carry that workspace scope and applicable gym scope. Owners manage all their gyms; delegated managers manage selected gyms. All existing tools remain available within the appropriate company/gym permissions. No customer can discover another company’s people or records through search, AI, exports, notifications, files or guessed identifiers.

## Platform admin console

Orb Gym platform administrators have a separate console covering workspace directory, owner contacts, onboarding status, active/suspended/archived workspace states, gym counts, service health, usage, configuration and support cases. Platform administration is distinct from customer ownership and does not require adding Orb staff to every gym rota.

Support authorised workspace inspection through explicit workspace selection, recorded reason and scoped temporary support access. Keep privileged role assignment, suspension, restoration and configuration changes audited. No silent impersonation, customer signatures, payment approvals or professional decisions. Sensitive HR/health/financial content requires specifically granted access rather than automatic inclusion in a portfolio summary. Administrative exports and background jobs follow the same access boundary.

Workspace suspension is separate from a member’s payment-linked membership suspension. Preserve data and display a clear service/account message under the agreed policy. Workspace closure, retention, export and deletion remain explicit processes; do not cascade-delete company histories from an owner account action. Ownership transfer must preserve an active owner.

## White label configuration

Brand inheritance is Orb Gym default → company workspace brand → permitted gym overrides. Company owners can set company logo, display name, contact details and theme; each gym can inherit or override its own identity. Keep billing entities separate from decorative branding. Orb Gym remains the platform identity in administration and product records. Company/gym white labelling does not rename the underlying product or create separate data silos.

Validate onboarding retries, isolation between two unrelated owners, creation of multiple gyms, scoped staff/member invitations, theme inheritance, platform support access logging and safe suspension/restoration before release. Hosting, identity provider, subscription pricing and any platform payment model remain unselected.

# Four user journeys and role based access

| Journey | Access scope | Primary experience |
|---|---|---|
| Owner administration and management | Workspace-wide oversight of all gyms; owner/admin/management permissions determine actions and sensitive fields | Desktop first with responsive mobile; finances, reports, analytics, calendar, approvals and operations. |
| Staff | Assigned gym or gyms only, with manager, supervisor, reception, cleaner and coach role permissions | Desktop/mobile; relevant gym modules and own HR self-service. |
| Member | Own profile/membership and member-facing content for entitled gyms | Mobile first; feed, calendar, bookings, receipts, attendance and feedback. |
| Vendor or contractor | Explicitly assigned jobs, visits and shared records | Responsive portal; accept work, communicate, quote, invoice and submit evidence. |

Owners can oversee all their gyms remotely. Company administrators and management receive delegated company-level rights; a gym manager is a staff role limited to assigned gyms unless separately granted company-level access. RBAC combines role, company, gym assignment, record audience, field sensitivity and permitted action. A person can hold several roles without merging their private views. Platform administrators remain a separate service-administration role outside these four customer journeys.

All users have sign-in/out, password recovery, profile management and personal appearance settings. Company membership roles, financial permissions and professional qualifications are managed separately from self-edited profile details.

# Settings profile and confirmed onboarding rules

Company Settings is the central control for the company’s style and feel, theme preset, logo/icon and company details. Publish one versioned configuration consumed by the entire application, with permitted gym overrides and existing template version rules. Documents remains the template composer, not a second branding authority. This supersedes earlier placement of white-label controls within Documents.

Personal Profile contains avatar, name, permitted contact details, notification settings, password/security controls and personal light/dark/system preference. Notifications can be configured by supported channel and event category; essential service/account information remains available in app. Changing a profile never changes company branding or assigned permissions.

## Member account creation and membership setup

There are three entry routes: self-signup from the selected company/gym landing page; staff creation of a pending member followed by an email invitation to register; or staff provisioning of an email-bound temporary credential where supported. Invitations and credential emails contain no health or financial data. Prefer single-use setup links; any temporary password must expire, be changeable immediately and require replacement before ordinary use. Never store plaintext passwords in member records or show permanent credentials to staff.

Existing identities link to the pending member after verified email acceptance rather than creating duplicates. Route company/gym context explicitly. The member signs in, sets/resets their password as appropriate, completes their profile, emergency contacts and PAR-Q, signs required documents and sees a holding page.

The new application appears in Membership management with its source, gym, assigned membership officer and checklist. Membership staff review onboarding, resolve required follow-up and arrange Direct Debit or other agreed payment setup. Track mandate/payment-method setup, payment confirmation and staff approval separately: a DD mandate alone does not prove collection.

Only after required onboarding, membership configuration, approval and the configured payment condition are satisfied does the member receive full access to their entitled app features. Until then they can complete onboarding, respond, resolve payment and view status. Record who approved activation and when. Full access still follows single/all-gym entitlement and member RBAC.

## Delegated staff creation

Company administrators can add/invite staff and assign them to any authorised gym. Gym managers and supervisors can also add/invite staff within their assigned gym, according to their delegated role permissions. They cannot grant company-owner/admin rights, assign another gym or create a role with privileges beyond their delegation. Record invitation, acceptance, role changes and inviter. A person working at several gyms keeps one identity with explicit assignments.

## Owner calendar and gym drilldown

The company owner’s calendar includes all scheduled operational records across their company’s gyms: rotas, classes, visits, tasks, meetings and other schedules. Sensitive records retain their detailed-field controls. Selecting a gym or calendar event opens the matching local context without losing the company-wide view, filters or date. Member/staff/contractor calendars remain role-filtered.

## POS receipts and mandatory attribution

At checkout, authorised till staff can issue a branded receipt immediately for printing and place a member-linked receipt in that member’s app. Anonymous customers can receive print or an explicitly requested delivery option without inventing a membership. Capture the company’s published logo/details and correct billing entity in the receipt version; reprints preserve the original transaction identity. Repeated delivery never creates a duplicate sale. Printer/terminal capabilities require integration testing.

Every application page and public landing page displays the exact footer **Orb Gym - powered by orbsolutions.co.uk**, with orbsolutions.co.uk linked to https://orbsolutions.co.uk. Apply it to all four journeys, onboarding, login/recovery, portals and white-labelled pages. It remains present when company/gym branding is active; company settings do not remove it. Receipt/document attribution is separately templated; company branding on a receipt does not alter transaction details.

Acceptance: test all three member entry routes, password setup/recovery, PAR-Q and pending membership queue, DD/payment states, authorised activation, scoped manager/supervisor invitations, owner-to-gym calendar navigation, printed/app receipts and footer presence across themes and white-labelled pages.

# Public website and joining pipeline

The default public landing page is Orb Gym, using the supplied Orb Gym logo and Orb Gym Basic 01 direction based on orbsolutions.co.uk: cobalt #044EFC, Inter Tight headings, Manrope body, white/cool-grey surfaces and rounded cards. It markets Orb Gym and provides owner signup and sign-in. Preserve the logo proportions and maintain legibility in light/dark modes.

Company and gym landing pages initially inherit Orb Gym branding, with content drawn from their public gym records. Company branding and permitted gym-logo overrides activate only when the company deliberately publishes white labelling. Creating a gym or uploading assets alone does not replace the default identity. The central Orb Gym marketing page remains separate from customer pages.

Owner signup creates a workspace; member joining from a company/gym page creates an application within that company. Every page retains Orb Gym - powered by orbsolutions.co.uk.

| Stage | Member experience | Business responsibility |
|---|---|---|
| Account creation | Register, verify email and create basic profile. | Create an identifiable prospect without active access. |
| Interests | Select gym, activities, package interests and contact preferences. | Capture structured enquiry details. |
| Holding stage | See application status, next steps and outstanding requests. | Assign a sales owner and follow-up date. |
| Consultation | Discuss options, arrange a visit/trial and agree a package. | Record communication and proposed membership. |
| Onboarding | Complete emergency contacts, required PAR-Q/health information, safety acknowledgements and agreements. | Review required information and exceptions. |
| Approval and payment | Complete the agreed payment process. | Confirm approval, documents and qualifying payment separately. |
| Activation | Receive the features and access included in the membership. | Issue the entitlement and record activation. |

Proposed lead stages: New enquiry, Contact attempted, Consultation or trial, Offer agreed, Onboarding, Awaiting payment, Active, with Withdrawn, Declined and No response outcomes. Every open lead has an owner and next action.

The holding account permits onboarding, requests, contact and payment resolution, but not active-member privileges. Health responses requiring review go to an authorised person. A questionnaire submission or signature does not itself establish fitness to participate.

Store signed document versions, signatory, signing time and acknowledgement evidence. Material changes require an appropriate new agreement or acknowledgement; they do not overwrite previous signatures.

# Owner control workspace and navigation

The dashboard provides Overview, Calendar and Feed tabs. Overview shows role-appropriate operational summaries; Calendar consolidates permitted scheduled work; Feed provides the Facebook-style community/announcement experience. The member Home foregrounds next booking and QR pass alongside these views. Gym-level dashboards use the same modules filtered to that gym.

| Left navigation | Contents |
|---|---|
| Dashboard | Portfolio performance, today’s operations, exceptions and approvals. |
| Feed | Company/gym announcements and permitted community activity. |
| Company tools | Combined rota, people, finance/reporting, approvals, Documents, landing-page management and settings. |
| First gym expandable button | Configured gym name/logo and local modules. |
| Additional gym expandable buttons | Each configured gym’s name/logo and local modules. |
| Add gym | Authorised creation and configuration of another gym. |

Each expanded gym contains Dashboard/Calendar/Feed, User management, Staff and HR, Classes, Coaching, Members, Membership management, Facilities, POS/Till, Finance/Reports, Documents, Landing-page management and Settings, subject to company/gym scope and RBAC. Company-level views aggregate authorised records rather than duplicating gym modules. The same module definitions power every gym; permissions change available records and commands, not the underlying source of truth. The current company, gym and module remain visible in the heading.

The owner’s dashboard highlights missing opening checks, unfilled shifts, payment exceptions, unresolved incidents, overdue work and approvals. Each exception links to the underlying records, responsible person and next action. Show data freshness and distinguish unknown information from confirmed completion.

Financial views separate membership charges, money collected, POS sales, refunds, expenses and staffing costs. Profit requires defined and sufficiently complete costs; incomplete income data must not be labelled profit.

# Membership and account control

| Membership tier | Entitlement |
|---|---|
| Single gym | One nominated gym at its configured rate. |
| All gyms | Participating company gyms at the configured network rate. |

Define explicitly whether specialist courses, premium classes and future gyms are included. Prices remain configurable and have not been agreed. Changes of package preserve effective dates, previous terms and payment history.

Keep identity account, membership lifecycle, payment state and entry/booking entitlement separate. A payment problem can restrict entitlements under company policy while preserving login for payment resolution and access to records.

Membership states include pending, active, frozen, suspended, cancelled and expired. Record reason, effective dates, author and consequences. A freeze specifies billing treatment, existing bookings and membership end-date treatment. Automatic access changes require confirmed payment events and configured rules; authorised exceptions are visible and audited.

Profiles show membership, payment history, receipts, signed documents, attendance, bookings and no-shows. Members can update their own permitted details and emergency contacts. Health information, management notes and payment administration have separate access scopes. Members also have a receipt/document file, class feedback history and permission-filtered calendar access. Payment receipts are sourced from confirmed financial records; uploaded payment evidence is labelled pending verification rather than treated as receipt confirmation.

# Classes and booking architecture

## Coach led classes and booking rules

Independent rental coaches can run classes when explicitly enabled by the gym. This adds class tools to their otherwise limited role: create/propose schedules within permitted gyms/resources, manage their own class occurrences and registers, communicate with authorised attendees and view relevant class feedback. Gym management controls publication, permitted capacity/resources and whether proposed classes require review. Running a class does not confer general staff HR, financial or member-directory access.

Classes retain organiser/operating arrangement separately from the instructor. Specify whether a rental-coach class is included in gym membership or separately charged, who collects any payment and whether an agreed gym fee/share applies. Do not automatically impose the employed-coach split on rental classes. Rental coaches see only necessary enrolled-participant information; their independent client records remain separate.

At class setup define title, description, coach, gym/room, dates/recurrence, duration, capacity, eligibility, price/inclusion, booking opening/cutoff, waiting-list behaviour and one-off versus regular enrolment. Members can join a single class or reserve a defined recurring sequence; each occurrence has its own booking, capacity and attendance. Regular enrolment must show included dates, conflicts, exceptions and any end date. Do not promise places in unavailable occurrences or create an indefinite financial commitment silently.

Configure class-level cancellation/no-show policy from a company default: cancellation cutoff, allowed cancellation method, late cancellation/no-show outcomes, permitted charge or credit treatment, repeated-event thresholds and any booking restriction. Show applicable rules before confirmation and retain the version accepted. Charges/restrictions require defined authority and payment/entitlement rules; they cannot arise from an unstructured note. Staff corrections and authorised waivers retain reasons. Coach/gym cancellation has its own notification and refund/credit treatment.

The coach responsible for the occurrence completes its attendance register by authorised QR scanning or manual entry. Record attended, late, cancelled, late-cancelled, no-show or unresolved as appropriate, with actor/time and correction history. Finalise no-shows after the register is reviewed rather than assuming every unscanned person was absent. Each result links to the member profile and class history; gym entry and class attendance remain distinct. Regular bookings do not auto-mark attendance.

## Public staff and coach flip cards

Published staff/coach profiles appear automatically on the relevant landing page as flip cards. The front shows the approved photograph, name and role; the reverse shows approved specialities, introduction, offered classes/PT and public fees where enabled. Show an explicit contact/book/details action tied to the correct gym and service.

Flip by click/tap and keyboard as well as optional desktop hover; provide a labelled details alternative on mobile and with reduced motion. Important fees and booking terms must remain available on the linked service page, not solely hidden behind an animation. Profile fees are sourced from approved price records; distinguish per-hour PT rates, per-class prices and membership-included services.

Owners/managers control profile publication and fields. Payroll rates, rent, private contact details, HR/health records and internal revenue shares are never public. Unpublishing a profile or ending a gym assignment updates the page without erasing past attendance or transactions.

Acceptance: a rental coach schedules an authorised class but cannot access unrelated gym records; members book one-off and regular dates; capacity and policy versions remain correct; coach records/corrects attendance and member histories agree; published flip cards update photos/specialities/fees and work with touch/keyboard/reduced motion.

Recurring class definitions generate dated class occurrences, each with its own capacity, instructor, room and register. Courses and blocks are distinct products rather than repeated single bookings without shared rules.

| Booking type | Behaviour |
|---|---|
| Single session | Reserve one occurrence. |
| Recurring block | Reserve a defined sequence, with unavailable dates disclosed. |
| Course | Enrol in the programme according to its completion/enrolment rules. |
| Last-minute booking | Permit until the configured cutoff where capacity and entitlement allow. |
| Waiting list | Queue for a place and receive a time-limited offer under a defined policy. |

Booking checks membership rights, class eligibility, capacity, time conflicts and any configured prerequisites. Concurrent attempts cannot both take the same final place. Blocks require an explicit all-or-partial booking policy; no silent partial enrolment.

Cancellations, refunds, no-show rules, booking windows and waiting-list priority are company-configured decisions. Notify affected members when an instructor, room, time or session changes.

Gym entry does not prove class attendance. Instructors open the particular class register and scan each member’s pass, with manual attendance and authorised corrections available. Finalised non-attendance becomes a no-show with a query/correction process. RSVP expresses interest unless the class policy explicitly makes it a confirmed booking; capacity is consumed only by the defined reservation state. Completed classes can invite star/text/media feedback with a private/public audience choice, moderation and follow-up cases.

# Entry exit and live occupancy

Members have a digital membership pass and profile photograph. Entry checks entitlement and records a visit. Exit closes the visit. The gym register shows who is currently recorded inside, arrival time and identification information for authorised staff; the owner can inspect all gyms.

Two supported journey options are envisaged: a member presents their QR pass to a reception device or staff phone; or an authenticated member scans a designated gym entry/exit code with their phone. Final scanning hardware and integrations remain open.

Entry and exit are explicit events, not an uncontrolled toggle. Repeated scans return the known state. A scan identifies the account or checkpoint; anti-sharing controls, short-lived passes and checkpoint verification need delivery design. A static QR alone does not establish physical presence.

Forgotten checkout creates a reconciliation exception. Distinguish confirmed departure from an administratively closed visit, preserving actor and reason. Live occupancy is a recorded operational view whose reliability depends on scan completion; do not silently treat stale visits as confirmed presence or an emergency headcount guarantee.

# Coach arrangements and permissions

## Hourly PT pricing and PT only clients

Gym-employed coaches deliver PT charged at configured hourly rates. Management can set a company/gym default for all employed coaches or an effective-dated override per coach. Each appointment snapshots the applied rate, duration, price and rule version; later rate changes do not rewrite existing charges. Define billable increments, minimum duration, rounding, cancellation treatment and permitted discounts before use. Customer PT rates are separate from coach wages/payroll rates and any internal revenue-share arrangement; do not infer one from another. Prepaid PT packages remain excluded.

### Automatic coach listing

Company/gym landing pages automatically display published coach profiles from the approved staff/coaching records: name, photo, introduction, relevant specialisms, gym assignment, PT offering and approved public rate where enabled. New or updated approved public profiles propagate without manual page duplication; private HR, personal contacts, earnings and client information never publish. Unpublished, departed or unavailable coaches are removed or appropriately marked. Rental coaches appear only where explicitly enabled by management.

### Coach shared onboarding and access

A coach can generate/share a gym-scoped PT invitation QR for a non-member. Scanning it prompts account signup or sign-in and links the client to the inviting coach and gym. An invitation QR is not itself an entry credential. Use expiring/revocable invite tokens, prevent unintended reuse where individual invitations are intended and link existing accounts after verified acceptance rather than duplicating them.

The client completes profile, emergency contacts, PAR-Q, house rules and other required PT acknowledgements. Track outstanding review and payment requirements explicitly. Once the gym’s configured PT eligibility conditions are met and an appointment/access window is authorised, issue the client’s own scannable PT access pass. The coach can share the access-pass delivery link with the intended client; possession of a general invitation must never bypass onboarding or create unrestricted gym entry.

Reception scans the client’s pass, sees PT-only status, photograph where supplied, coach, appointment/gym, allowed time and unresolved restrictions, then records entry/exit through the normal register. Expired, cancelled or revoked appointments/passes cannot create new entry. Define a permitted buffer around appointments; do not grant all-day/open-gym access by implication. Manual overrides require authority and a reason.

### Limited PT account and membership upgrade

PT-only clients receive limited app access: own PT appointments, authorised messaging with coach/gym, QR pass, onboarding/forms, PT receipts/payment history, relevant instructions, profile/security and notifications. Ordinary gym classes, open-gym access, unrelated member directories and full member-only feeds remain unavailable unless separately granted. Public announcements and PT-specific notices can be shared deliberately.

Store PT-client status, gym membership and access entitlements separately from the identity account and staff roles. A person may hold PT access alongside a gym membership, including different entitlements at different gyms. Upgrading should not replace the account or erase PT records.

Membership staff can convert/extend a PT-only client into an active gym member by selecting the gym/plan, confirming required current onboarding/agreements, setting up DD/payment and approving activation. Reuse still-valid forms where appropriate, requesting updated acknowledgements when scope/terms changed. Preserve coach links, QR/attendance history, receipts and identity. New member features unlock only when the membership activation conditions are met; no second signup is required.

Acceptance: default and coach-specific hourly rates calculate correctly and preserve earlier bookings; public coach edits update the correct gym pages; a shared invitation creates limited PT onboarding; incomplete forms cannot produce unrestricted entry; valid PT passes admit only the permitted visit; Membership upgrades the same account with correct payments and permissions.

Support two explicitly configured coach arrangements: independent rental coach and gym-employed coach with revenue share. Store the arrangement by company/gym assignment, with effective dates and agreed terms; one coach may have different arrangements at different gyms. Commercial labels do not determine legal employment status. This extends coaching management without reinstating the previously excluded paid personal-training-package/session-bundle module.

## Independent rental coach

The coach pays the gym an agreed rental charge and manages their own client relationship. Provide limited access: own profile, qualifications/insurance where required by company policy, agreement, gym instructions/SOP acknowledgements, permitted facility calendar, own room/space reservations, notifications, rent invoices/receipts and issue reporting. No staff disciplinary/payroll tools merely because they coach at the premises.

Configure rent frequency, amount, applicable gyms/resources, effective dates and payment status. Record approved adjustments and reconcile payments. Outstanding rent can trigger management review and configured access rules; it must not silently remove a client's unrelated membership.

Default client handling is minimal: the coach can submit necessary guest/access details or link an existing consenting member for an authorised visit. Owning a coaching relationship does not grant access to the gym member database, payment history, health questionnaires or another coach's clients. Clients still require their own gym entry entitlement, pass or approved visitor arrangement. Full independent-business CRM, coaching sales and progress records are outside this limited tier.

Journey: management invites coach → verifies required documents/agreement → configures rental terms and permitted facilities → coach accepts → payments/access follow the agreement → coach reserves space and registers permitted visits → renewal/offboarding. Rent and resource permissions remain auditable.

## Gym-employed coach with revenue share

Provide staff onboarding, HR/contract/payslip access, rota, availability, training and SOPs, plus assigned-client and delivered-session tools. Management sets who can allocate clients, schedule sessions, adjust charges, approve work and review earnings. Coaches see their own assignments and earnings statements, not other coaches' earnings or unrestricted financial reports.

Features include consultation requests, assigned client records, goals/notes where authorised, coaching appointments, recurring appointments, room/equipment reservations, class links, attendance/no-shows, session completion, member feedback and follow-up tasks. Client-facing information and private coaching notes have separate visibility. Sensitive data uses explicit role/relationship grants. AI can summarise authorised records or draft guidance for coach review; it does not prescribe autonomous clinical advice.

A coaching appointment links coach, client(s), gym, resource, duration, price/charge reference, completion and payment records. It checks staff rota, teaching commitments, availability and cross-gym travel. Session charges can be recorded as individual approved services through POS or invoicing; prepaid package balances and PT bundles remain excluded pending a separate founder decision.

Configure the commercial split precisely: gym percentage or fixed share, coach allocation, applicable services, effective dates, calculation basis and earning trigger. Define whether the basis excludes tax, discounts, refunds and processing fees; no universal net/gross assumption. Separate collected revenue, delivered work, provisional allocation, approved earnings and actual payroll/payment. The phrase gym takes a cut does not itself specify how the employee is paid.

Calculation illustration only: with an agreed 30% gym share on a £50 eligible basis, allocate £15 to the gym and £35 to the coach before any separately configured employment/payroll treatment. This is a reporting allocation, not an automatic payroll instruction. Version the rule used for each transaction. Refunds, partial payments, cancellations, credits and disputes create traceable adjustments rather than rewriting paid history.

Management reviews session/collection exceptions and approves period statements. Export approved payroll inputs to the chosen payroll process where appropriate; calculation or filing of payroll is not implied. An employed coach's contract determines how salary and variable earnings interact.

## Shared controls and owner reporting

Both arrangements have gym-scoped profiles, required credential expiry reminders, facility rules, conflict-aware booking, relevant announcements, feedback and incident reporting. Publish member-facing coach profiles only through authorised profile settings. Rental coaches and employed coaches have separate role presets, not an unrestricted coach role.

Owner reporting separates rental income/arrears from gym coaching sales, gym share, coach earnings allocations, refunds and approved/unpaid amounts. Do not double count the member's payment and its internal allocation as two revenues. Show source transactions, rule version and approval history.

Changing arrangement creates an effective-dated assignment and access review. Revoke obsolete client/resource access, resolve future bookings and outstanding rent/earnings, and preserve old contracts/statements. A move from rental to employment does not automatically copy private client data into company records.

Acceptance: rental coach cannot open member/HR/earnings lists; their own rent and resources work; employed coach sees assigned clients and own staff records; scheduling rejects conflicts; commercial allocations reconcile to source charges and adjustments; payroll approval is separate; arrangement changes preserve history.

# Staff HR contracts and rotas

Staff profiles include photo, contact/emergency details, employment assignments, qualifications, training, document history and restricted HR records. Contracts may be uploaded or prepared from controlled templates, reviewed, signed and amended through versioned records. Template content and legal review are separate delivery dependencies. Full HR scope includes payslips, secure messages, mandatory training, SOP/assignment acknowledgements, disciplinary cases, one-to-ones and development actions. Staff can see their own permitted documents; supervisors/managers receive explicitly delegated HR access. General staff-directory access never grants access to disciplinary or pay records. Payslips may be securely uploaded or imported; payroll calculation, tax submissions and payroll-provider integration are separate capabilities requiring definition. Training records track assignments, completion, certificates and expiry; SOPs retain versions and acknowledgement history. Disciplinary and one-to-one records use restricted participants, notes, attachments, follow-up dates and auditable outcomes.

Full rota functionality covers recurring shifts, availability, leave, sickness, breaks, cover requests, shift swaps, management cover, cross-gym assignments, publishing and acknowledgement. Check overlaps, qualification requirements, travel between locations and configured staffing levels. Instructor allocations connect the staff rota to the class timetable.

Clock-in/out records actual attendance separately from planned shifts. Managers correct missed punches with reasons and approve timesheets. Payroll-ready exports or integrations are a later integration decision.

| Staff stage | Behaviour |
|---|---|
| Invited/onboarding | Account and documents prepared; assigned access remains controlled. |
| Active | Staff tools available for current roles and gym assignments. |
| Suspended | Specified access restricted with reason and review. |
| Left/archived | Access revoked, future work reassigned and records retained. |
| Rehired/reactivated | Deliberate review of assignments, qualifications and access. |
| Eligible deletion | Separate retention review and authorised removal/anonymisation. |

Leaving staff must not remain assigned to future classes or opening shifts unnoticed. Reactivation does not automatically restore every historical permission. Sole workspace owners cannot be removed without ownership transfer or an authorised closure process.

# Recurring work and gym operations

Cleaning staff and authorised supervisors can schedule recurring tasks and group them into job sheets within their delegated scope. Reusable templates generate distinct dated occurrences. The same mechanism supports opening, closing, safety checks and equipment inspections.

| Record | Purpose |
|---|---|
| Job-sheet template | Instructions, tasks, recurrence, expected duration and evidence requirements. |
| Scheduled job sheet | Gym/area, assigned staff, due time and progress. |
| Individual task | Completion state, notes, photographs, exceptions and review. |
| Follow-up action | Fault, shortage or issue requiring another responsible person. |

Tasks support complete, partial, blocked and not completed outcomes. Record staff-reported completion separately from manager verification. Require evidence selectively; capture photographs and notes against the exact task. A job sheet showing eight completed and two outstanding cannot appear fully complete.

Preserve occurrence history when a recurring template changes. Schedule recurrence in the gym’s timezone and prevent duplicate generation during retries or daylight-saving changes.

Facilities and equipment maintenance follow the asset and job-card workflow below. Incidents and handovers connect to accountable actions with an owner, due date, status and review history.

# Equipment assets and maintenance

Prepaid PT packages and session-bundle balances remain excluded. Hourly PT appointments, PT-only onboarding/access, coach-specific rates and explicitly agreed internal revenue allocations are included by later founder decisions. Rental coaches may also run authorised classes. This replaces the earlier broader PT exclusion.

Orb Gym includes a compact facilities and maintenance module for equipment breakdowns, technical faults and premises issues. A fault becomes an accountable job with evidence, contractor assignment, approvals, costs and verified resolution.

## Asset register and QR access

Each asset has a stable ID, gym/area, name, category, manufacturer/model, serial number where available, photographs, operating status, documents and service history. Optional purchase details, warranty and service information connect costs and maintenance to the correct equipment. Keep location history when moving an asset between gyms.

Authorised staff can create assets and print QR labels. Scanning opens the asset record and role-permitted actions: report a fault, see existing issues, view instructions, or change operating status. QR labels identify assets; they do not confer edit rights or expose private records. Members can receive a limited authenticated reporting view without contractor quotes, internal notes or financial details. Provide manual asset lookup and readable references if a label is damaged.

Asset states include available, restricted use, out of service and retired. An authorised person records state changes and reasons. Reporting a fault does not automatically certify equipment safe or unsafe; urgent concerns can be escalated and equipment taken out of service by designated roles. Existing open faults are shown during reporting to reduce duplicate jobs.

## Job card and activity feed

The desktop job workspace has a top issue summary with gym/location, linked asset, original report, photographs, priority, owner and current status. Below it, the left column is the chronological activity feed and the right column contains organised record tabs. Photographs open in an in-app viewer with zoom. On mobile, Summary, Activity and Records become accessible views of the same job.

The feed is the source of the job’s recorded activity: updates, messages, photos, attachments, mentions, quotations, approval requests, decisions, visits, invoices and completion submissions. Financial and approval actions are structured events, not conclusions inferred from free-text messages.

| Record tab | Contents |
|---|---|
| Quotes and approvals | Submitted quote versions, requests, decisions, approved limits and variations. |
| Attachments | Original photographs, documents, certificates and other evidence. |
| Decisions | Authorised decisions, reasons, actor, date and the exact records considered. |
| Tasks and visits | Assignments, appointments, dependencies and follow-up actions. |
| Costs and invoices | Estimates, approved commitments, invoices, payments and credits. |
| Asset and history | Asset details, previous faults, repairs, warranty and servicing. |

Tabs are views of the same structured records linked from feed events, not independent copies. One attachment or decision keeps one identity. Editing an ordinary post cannot alter a recorded financial approval. Mentions use a permitted people picker and create scoped notifications; tagging a contractor never grants access. Separate internal, contractor-visible and member-visible discussion and attachment audiences.

## Assignment approval and completion

Recommended job stages: reported → triaged → assigned → awaiting quote/approval where needed → scheduled → in progress → completion submitted → verified closed. Waiting for parts, access or information is an explicit blocked reason; cancellation and reopening preserve history.

Contractors receive only assigned jobs and necessary asset/location information. They can acknowledge, propose visits, add updates/photos, submit quotes and invoices, and supply completion evidence. Assignment, notification delivery and contractor acceptance remain distinct.

Quotes carry supplier, scope, line items, net/tax/gross where relevant, validity, attachments and version. A quote requiring approval creates a pending approval record and management alert. Only an authorised approver can approve/reject; retain reasons. Revised scope or amount produces a variation/new version and any required new approval. AI can extract a draft from a document but cannot approve it.

On completion, the contractor submits work notes and evidence. The manager verifies or returns the submission. Closing the job and returning the asset to service are separate explicit decisions; one repair may leave another fault outstanding. Capture temporary repairs, further work and any required specialist evidence. Retain a full correction/reopening trail.

## Maintenance finances and announcements

Link financial records to company, gym, job, supplier and asset where applicable. Show quoted estimate, approved commitment, invoiced amount and paid amount separately; do not count them all as expenditure. Match invoices to approved work, record partial payments, credits and variations, and flag discrepancies. Payment recording/reconciliation follows the chosen finance integration; adding an invoice attachment alone does not prove payment.

Owner reporting can show spend by gym/asset/category/supplier, repeat breakdowns, downtime and outstanding commitments. Distinguish repair expense from replacement purchase according to the configured accounting treatment rather than assuming a classification.

Taking an asset out of service can prepare a member announcement identifying the gym/equipment, restriction and alternatives. An authorised person confirms publication unless an explicit automation policy is later approved. Publish only safe public information, not quotes or internal discussion. When service is restored, prompt a corresponding update and resolve the active notice. Link related class/room restrictions for review without cancelling bookings silently.

Acceptance cases: scan a label and report a fault; assign a contractor; receive a quote and obtain approval; reject an unauthorised approval; handle a variation; record invoice/payment without double counting; verify repair and asset status; publish and clear a member notice; preserve evidence and permissions across desktop/mobile.

# Member staff directory and who is on duty

Signed-in members can view each gym’s member-facing staff directory and current duty team without being physically at the gym or checked in. Place a Team or Who is on duty entry on the gym home view. Gym visibility follows the member’s existing permitted gym scope; it does not grant access to another company or restricted location.

The staff directory shows all published staff profiles for that gym, including photograph, member-facing name, role and optional introduction or relevant specialism. Distinguish the wider team from those currently on duty. Archived or departed staff are removed from the current directory while historical records remain intact.

The live duty view highlights the duty manager or responsible lead, reception team, instructors and other published on-duty roles. Derive scheduled duty from the published rota; distinguish scheduled from checked-in/on-duty confirmation using attendance and authorised updates. A rota alone does not prove presence. Show last-updated information and an explicit unconfirmed state rather than falsely presenting someone as present. A staff clock-out, approved replacement or shift change updates the view; preserve who is responsible during cover changes.

Members see current gym responsibilities, not private HR records, pay, personal contact details, absence reasons or a full employee tracking history. Use in-app gym contact or permitted case creation rather than exposing personal numbers. Keep detailed future rotas and staff location history within staff/management permissions.

The owner and gym managers control profile publication and duty-role assignment. This is a current-service view, not continuous location tracking. Verify that members can open it remotely, duty cover updates correctly, scheduled/unconfirmed status is truthful, and staff-only fields never appear in the member response.

# Feed communications and member experience

The member home view combines the next booking, digital pass and outstanding requests with a Facebook-style feed underneath. Posts can target the company, selected gyms, classes or permitted groups. Management navigation retains Dashboard and Feed as separate destinations.

Announcements, community posts, comments and reactions require audience rules, moderation and reporting. Public marketing content is separate from member-only feed content. Internal staff posts and sensitive information must never enter the member feed through a reused component.

Support targeted booking changes, payment requests, rota notifications and task reminders. Distinguish notification delivery, reading and acceptance. Notification preferences do not suppress essential in-app account state. Marketing permissions and notification channels require configuration before launch.

# Documents templates and white label control

The Documents module designs and composes reusable document templates. Company Settings owns the shared company/gym branding configuration; Documents consumes those published settings when composing and generating documents. Other modules use the same brand source rather than independent copies.

Support composing templates for contracts, membership agreements, invoices/receipts, letters, forms, policies/SOPs, reports and communication layouts. Templates combine controlled static content with typed dynamic fields linked to company, gym, billing entity, member, staff, transaction or job records. Provide a variable picker, required-field validation, document preview and role-controlled editing/review/publication. Never populate an unresolved field with invented text. Issuing invoices and collecting signatures remain governed by their source module, not by template editing.

Template lifecycle: draft → preview/review → published → revised or archived. Keep versions, permissions, source data references and generated-document history. Existing issued/signed documents retain the content, data and brand version originally used. Uploading or replacing a template does not rewrite those records. Template publication does not imply legal approval of contract wording.

## Default identity and optional white labelling

Every new workspace starts with the complete Orb Gym branding, supplied logo and default visual direction, including light/dark modes. A company logo upload alone does not activate white labelling. The company deliberately configures, previews and publishes the White label option in Company Settings to activate its identity.

Once activated, the published company brand supplies application identity, member/contractor portals, landing pages, document and communication presentation, and assistant icon, with permitted gym overrides. Maintain one versioned brand configuration consumed by those surfaces. Preserve surface-specific design tokens and separately assigned legal/billing entities. Use the exact mandatory footer Orb Gym - powered by orbsolutions.co.uk on app and public pages; document/receipt attribution remains separately templated.

Allow a company to disable white labelling and return to Orb Gym defaults without deleting its saved brand drafts, gym records or history. Previously issued documents retain their issued appearance. A gym override is effective only within the company’s enabled white-label policy; otherwise the default Orb Gym identity applies. Existing per-user theme preferences remain independent.

## Orb AI assistant identity

The assistant’s display name is **Orb**. Before white labelling is activated, Orb uses the Orb Gym emblem. After activation, Orb uses the company’s approved icon mark derived from or supplied alongside its company logo. The name remains Orb; branding changes do not rename the assistant or change its permissions.

Provide an icon upload/selection and preview in the Company Settings branding workspace. If a suitable separate mark is unavailable, prepare a candidate crop/extraction for review; do not distort the full wordmark or silently publish an unsuitable crop. Retain the Orb Gym icon as fallback until a company icon is approved. The assistant uses company identity even within a gym with a different logo, unless the founder later changes that policy.

The same identity applies to assistant panels, messages and background insight cards. Clearly identify generated suggestions as coming from Orb; never present them as a human employee’s signed decision. Brand configuration cannot modify access controls, AI safety boundaries or financial approval rights.

Acceptance: create a new workspace and verify Orb Gym defaults; compose and preview a template; upload company branding without activation and confirm defaults persist; publish white labelling and verify all surfaces plus Orb’s company icon; disable it and restore defaults; confirm old issued documents are unchanged.

# Design system and branding inheritance

## Design tokens as a platform foundation

## Five UI preset rules

Orb Gym Basic 01 is the default for new workspaces. The generated previews illustrate direction only; their invented logos, sample dates/figures and stray PT label are not implementation requirements. Use the approved Orb Gym assets. All five presets support four journeys, every module, mobile adaptation, white labelling and light/dark modes.

### Orb Gym Basic 01

Use the Bento structure with Orb Solutions’ actual design language. Source tokens: brand #044EFC; light background #F2F4F7; surface #FFFFFF; text #0B1220; muted #5B6472; border #E5E7EB; accent surface #E8F0FF. Use cobalt as the sole decorative accent. Semantic warnings/errors/success remain distinguishable; do not copy the generated preview’s purple/gold/teal decorative KPI palette.

Typography: Inter Tight 700 headings with restrained negative tracking; Manrope 500 body and 600/700 controls. Website hero sizes apply to public heroes, not operational form headings. Source card radius 22px; button radius 14px; icon tile radius 14px; pills fully rounded. Source cards use white surfaces, subtle borders and soft shadows. Adapt marketing hover lifts to genuinely clickable app cards; static KPI cards must not imply clickability.

Use a responsive modular grid with varied card spans, a prominent schedule and compact action summaries. Keep detail forms and tables orderly rather than making every field a card. Desktop sidebar expands gym modules; mobile uses the agreed navigation map. Source website buttons are 48px high with a 42px small variant; app dense controls may differ through explicit component tokens while preserving usable touch targets.

Motion follows the source’s restrained easing cubic-bezier(.22,1,.36,1); use short feedback/transitions, disable ornamental motion under reduced-motion preference. No giant bouncing panels or automatic dashboard rearrangement.

Proposed dark mapping: background #0B1220, surface #151E2E, raised surface #1D293B, text #F8FAFC, muted #B7C1D1 and border #334155. Retain cobalt identity, validate text/focus/action contrast separately and adjust semantic tokens where required. These dark values require visual/accessibility review.

### Flat Studio 02

Use flat solid surfaces, strict alignment, sharp 0–4px radii and strong section rules. No glass, blurred backgrounds, gradients or decorative shadows. Use large sans-serif headings/numerals with a clear hierarchy and restrained operational body sizes. Initial tokens: background #F7F7F2, surface #FFFFFF, text #111111, brand #044EFC, strong rule #111111. Proposed dark: background #101010, surface #1A1A1A, text #F5F5F0, rule #737373.

Organise metrics in a connected horizontal band; schedules and data tables form the main structure. Strong borders identify major groups, not every text line. Navigation selection uses a solid rectangular accent. Mobile stacks meaningful groups in reading order without retaining oversized poster typography. Motion is minimal, with immediate state changes and short fades. White labelling changes brand tokens without introducing rounded/glass components.

### Minimal Editorial 03

Use generous spacing, typography-led hierarchy, thin dividers and predominantly card-free lists. Use an approved serif display face for major headings only (proposed Georgia fallback); retain a readable sans-serif body and tabular numerals for operational data. Initial tokens: background #FAF7F0, surface #FFFDFA, text #20201D, border #D8D5CD, accent #044EFC. Proposed dark: background #171817, surface #20221F, text #F4F1E8 and border #4C5048.

Prefer aligned summaries, ledger rows, subtle links and quiet navigation; avoid thick rules, large coloured tiles and floating shadows. Forms still have explicit boundaries, validation and clear primary actions. Whitespace contracts on mobile to preserve usable content. Animation is limited to fades and gentle disclosure. Editorial refinement must not obscure operational urgency or decrease contrast.

### Soft Glass 04

Use rounded grouped surfaces, translucent supporting navigation, pill selectors, soft elevation and depth hierarchy. Body uses system sans-serif for an iOS-inspired feel. Initial tokens: base #EFF4FC, opaque surface #FFFFFF, ink #152033 and accent #044EFC; proposed dark base #101725, opaque surface #1B273B and text #F5F8FF. Blur/opacity are component tokens with opaque fallback.

Keep forms, financial tables and dense text on stable high-contrast surfaces. Limit translucency to selected navigation/overlays; avoid layering several blurred panes. Card radii 20–24px, control radii 12–16px, pills fully rounded. Use restrained depth and short transitions, never glowing neon. Respect reduced-motion/transparency preferences where available and maintain an opaque usable fallback. Mobile reduces visual layers and keeps touch controls prominent.

### Performance Console 05

Use compact grids, narrow but labelled navigation, precise schedules, status chips and information-rich tables. Standard sans-serif body with monospace labels/IDs; do not set all long-form HR or member content in monospace. Radii 4–8px, small consistent gaps, subtle borders and little shadow. Dark baseline: background #0B1018, surface #141D29, text #F1F5F9, muted #A9B6C8, border #354255 and brand #044EFC. Light counterpart: background #EEF1F5, surface #FFFFFF, text #172133 and border #CCD3DD.

Density is optional and role-appropriate: management can compare more records; member mobile screens remain comfortable and touch-friendly. Use colour for limited accents and semantic states, with labels/icons accompanying status. No neon glow or continuous animated decoration. Tables can scroll within a controlled region while summaries/forms reflow; mobile becomes prioritised lists and detail views, not a shrunken terminal.

### Preset validation and publication

Each preset defines the same complete semantic/component token contract, including disabled/loading/error/focus/selected states, charts, forms, calendar, feed, job-card columns, POS, Documents and landing pages. Fonts, radii, density, surface treatment and layout variants change coherently. Do not hard-code one preset into a module.

Validate all presets across owner, staff, member and contractor screens, light/dark modes, keyboard use, zoom, reduced motion, mobile navigation and long content. Present the same demo dataset for comparative previews. Allow draft/preview/publish/rollback and company/gym overrides through Company Settings; personal mode does not change the company’s published style. Final contrast and responsive checks are implementation acceptance requirements, not established by the concept images.

From the first implementation, every visual component consumes a versioned token system. The complete application can change visual direction without rebuilding business workflows. Cover colour/semantic states, typography, spacing, density, sizes, radii, borders, shadows, elevation, icon treatments, navigation, cards, tables, forms, charts, calendars, hero sections and motion. Avoid hard-coded theme styling in product screens; document any necessary exceptions.

The five style presets are full theme configurations, not accent-colour swaps. Light/dark modes are paired configurations for each preset. Theme switching preserves account permissions, navigation destinations, data, selected gym and unsaved work. Support preview across roles/devices/modes, save draft, publish, version history and rollback. Validate contrast, focus, reflow and usable control sizes before publishing; configurable branding cannot silently remove accessibility.

Inheritance remains platform defaults → company workspace theme/brand → permitted gym overrides, with personal light/dark/system preference separate. Owners can reset overrides to inheritance. Theme changes publish as complete versions to avoid mixed configurations. Product UI, landing pages, member portals and document/email templates share brand sources but retain surface-specific tokens. Existing issued documents preserve their original brand version.

## White label configuration and management

Company Settings contains Style and feel, Branding and White label, and Company details, with delegated gym settings where permitted. Manage logos, approved icons, names, colours, fonts, contact details and communication identity with inherited-result previews. Published settings apply throughout the app, portals, landing pages and communications. Orb Gym defaults remain active until white labelling is deliberately published. Custom domains and sender domains require separate configuration.

Only authorised roles can publish company or gym branding; gym permissions cannot alter other gyms or company defaults. Validate uploaded assets and retain original/versioned derivatives. Branding never changes billing entity, data ownership or security scope.

## Landing page management

Include a management module for company landing pages and individual gym pages, separate from the Orb Gym platform marketing site. Company owners manage their portfolio presentation; delegated gym managers can edit permitted gym content. Pages use the selected theme and brand inheritance from the outset.

Manage hero text/media, gym logos/cards, facilities, services, coach introductions from published profiles, opening hours, contact/location, announcements, galleries, FAQs and joining calls to action. Configure section order/visibility and supported layout variants without introducing arbitrary scripts or hard-coded one-off pages. Offer mobile/desktop and light/dark previews where relevant.

Membership prices and deals come from controlled plan/offer versions, and public timetables come from published class data. Do not maintain conflicting manual copies. Calls to action retain company/gym/offer context through enquiry/signup; owner platform signup remains a distinct journey. Public pages expose no private staff rota, member data, HR records or operational attachments.

Page lifecycle: draft → preview → authorised publication → revision/archive, with version history and rollback. Record author, reviewer/publisher and publication time. Support page titles/descriptions, readable URLs, image alternative text, validated links and approved public contact details. Domain mapping, search indexing and any analytics/consent integration need delivery configuration.

Acceptance: switch the complete app between contrasting presets; publish company branding with one gym override; verify all four role experiences and both modes; roll back safely; edit and publish a gym landing page; confirm price/timetable consistency and correct signup context; test public/private isolation. These requirements are foundational scope, not post-launch cosmetic work.

Orb Gym provides the default product identity. The company can upload its logo and details at the first platform layer; each gym can use those defaults or supply its own logo, name, contacts and approved theme overrides. Keep the exact footer Orb Gym - powered by orbsolutions.co.uk throughout the white-labelled app and public pages.

## Default Orb Gym identity and design reference

![Orb Gym supplied logo](../assets/orb-gym-logo.png)

The supplied Orb Gym logo is the canonical default platform lockup: a blue orb emblem and dark wordmark. Preserve its proportions and artwork. Maintain separate product, company and gym brand assets; a company logo must not overwrite the Orb Gym original. Version derived sizes and report assets so existing documents retain their issued identity.

The default Orb Gym Basic 01 direction is grounded in the HTML and stylesheet retrieved from [Orb Solutions](https://orbsolutions.co.uk) on 6 November 2026, including [styles.css version 10](https://orbsolutions.co.uk/assets/styles.css?v=10). Confirmed source values include Inter Tight headings, Manrope body, cobalt #044EFC, background #F2F4F7, white surfaces, ink #0B1220 and 22px cards. The website is the visual source, adapted to operational app layouts rather than copying marketing-page proportions. Dark-mode values and app-specific dimensions below are proposed mappings, not extracted website tokens.

This default direction coexists with the company-specific branded presentation and the five selectable style presets. Company and gym configuration can override permitted presentation tokens while keeping shared usability and the exact footer Orb Gym - powered by orbsolutions.co.uk.

Both light and dark modes are required across management, staff and member experiences and all presets. Each user can save light, dark or system preference. Define background, surface, text, border, icon, focus and action tokens for each mode. Keep semantic status colours distinct from decorative accents. The supplied dark wordmark needs a suitable light surface in dark mode until an approved reversed asset exists; do not invert or redraw it automatically.

Validate logo legibility, colour contrast, focus and mobile reflow in both modes. The original asset is preserved as a native Page attachment; its visual rendering still requires preview verification.

| Style preset | Distinct visual treatment |
|---|---|
| Orb Gym Basic 01 | Default Bento layout using Orb Solutions typography, cobalt, white/cool-grey surfaces and rounded cards. |
| Flat Studio 02 | Crisp surfaces, solid colour blocks and restrained depth. |
| Minimal Editorial 03 | Typography-led hierarchy, generous spacing and fine dividers. |
| Soft Glass 04 | Rounded controls, grouped surfaces and subtle depth. |
| Performance Console 05 | Compact operational layouts, strong contrast and structured tables. |

Token layers cover foundations, semantic colours, components and brand surfaces. Expose controlled settings for buttons, icons, typography, backgrounds, navigation and hero treatments. All presets support the same workflows. Allow preview, save, publish and restore, with light/dark previews and readability checks.

Inheritance order: platform default → company published theme → permitted gym override. Personal light/dark/system mode applies independently and follows the user. Personal preferences do not overwrite company branding. Changing style preserves records and work in progress.

Invoice and contract identity uses a configured legal/billing entity, not whichever decorative logo was last uploaded. Issued invoices and signed contracts freeze the identity/template version used.

Desktop uses the expandable left sidebar. iPad/tablet and mobile use a gym switcher and role-specific navigation. Reception prioritises fast member lookup, check-in and POS; instructors prioritise registers; cleaning staff prioritise job sheets. Management retains access to approvals and cross-gym oversight on mobile.

# Automatic gym landing pages and owner assistant

Adding a gym automatically creates its linked page, card and navigation entry on the company’s landing site. Use gym Settings as the source for logo, name, description, address, opening hours, contacts, facilities, services and social links. This does not publish customer gyms on the central Orb Gym marketing website.

Draft/incomplete/private gyms remain unpublished. Once the owner marks a gym public, validated public details appear automatically and subsequent changes propagate without maintaining duplicate content. Preserve the last valid page if an update fails; archive/unpublish removes active promotion while preserving history and handling existing links.

Gym Settings accepts brand guidelines and approved social/brand assets and URLs. Orb can extract suggested colours, fonts, images and descriptions into a preview with source references. Preserve manual edits on refresh; uncertain or conflicting values require review. Social links alone do not authorise private account access or republishing third-party media. Use supported authorised integrations where needed. Uploaded private guidelines and internal information must not become publicly downloadable. Logo/guideline upload does not itself activate white labelling; apply the existing company/gym branding rules and defaults.

## Orb for the owner

The owner has an interactive Orb assistant across authorised gyms for reports, analysis, advice and execution. Orb can produce sourced reports, compare performance, explain trends, investigate exceptions and recommend next actions. Responses identify reporting period, source records and material missing information.

Execution uses the same authorised business commands as the app. A clear owner instruction can authorise supported routine actions such as creating/assigning tasks, generating reports, preparing rotas and updating permitted records. Record the gym, affected records, command and outcome; return links to results. Avoid repeat confirmation for routine work already authorised.

Payments/refunds, contracts/signatures, access suspension/deletion, external publication and consequential rota changes follow their established approval rules. Prepare concrete actions for any required decision; never invent authority or bypass RBAC. Automatic gym-page updates follow the owner’s explicit public-status configuration.

Use operation IDs and outcome receipts to prevent duplicates on retries. Explain partial success and failures. Recheck access on pending work; keep normal tools usable if AI fails. AI advice remains distinct from verified facts and recorded approvals.

Acceptance: create and publish a gym, verify page/card/logo/detail propagation, preview brand extraction without overwriting manual choices, prevent private-data publication, generate a sourced owner report, execute an authorised task assignment and verify approval/duplicate safeguards.

# AI responsibilities

For management, AI acts as an operations assistant over authorised business information. It can answer questions, summarise handovers, identify missing cover, propose rota changes, highlight repeated faults, analyse class utilisation and explain financial exceptions.

For staff and members, AI mainly supports background organisation, prompts and relevant summaries. A chat interface is not required for ordinary tasks.

AI answers link to supporting records, state the period analysed and identify missing data. Routine supported actions may execute under the owner's clear instruction and existing authority. Financial, access, contract, externally published and consequential scheduling actions follow their defined approval rules; an existing authorised automation is not re-approved on every run. Models cannot grant permissions, create signatures or bypass approval.

Photograph analysis can flag possible issues and help organise evidence; it does not prove cleaning quality, fitness to participate or legal compliance. Separate AI proposals, staff statements and human verification. Record model/prompt versions and source record versions for consequential outputs.

Use role-scoped retrieval and task-specific tools. Uploaded documents and comments are untrusted data. Restrict HR, health and financial information even when the user can access ordinary gym operations.

# Logical data and service architecture

Recommend a modular application with shared transactional records, private evidence storage and durable background processing. These responsibilities do not imply separate microservices or a selected hosting platform.

| Domain | Main records |
|---|---|
| Identity and access | User, profile, preferences, workspace membership, role, gym assignment and invitation. |
| Company structure | Workspace, brand, gym, area, resource and billing entity. |
| Sales/onboarding | Lead, contact event, application, onboarding requirement and approval. |
| Membership | Plan version, agreement, membership, freeze and entitlement. |
| Money/POS | Product, sale, line item, invoice, payment event, refund and stock movement. |
| Classes | Class definition, occurrence, course/block, booking, waiting-list entry and attendance. |
| Staff | Employment assignment, qualification, contract version, availability, leave, shift and timesheet. |
| Presence | Scan event, visit, correction and class attendance event. |
| Operations | Job-sheet template, occurrence, task result, incident, action and verification. |
| Maintenance | Asset, QR label, operating-status event, fault/job, contractor assignment, feed event, quote version, approval, visit, completion and verification. |
| Maintenance finance | Supplier, commitment, variation, invoice, payment allocation, credit and asset/job cost link. |
| Community | Post, audience, comment, moderation case and notification. |
| Evidence/AI | File manifest, evidence link, AI job, proposal and review decision. |
| Coaching | Effective-dated coach arrangement, rental terms, hourly rate version, PT appointment, PT-only access grant, revenue allocation and approved statement. |
| Cases and feedback | Query/case, typed activity, audience, feedback/review, decision request and resolution. |
| HR development | Training assignment, SOP version/acknowledgement, disciplinary/one-to-one record and restricted payslip. |
| Publishing | Landing-page version, public gym/coach projection, media approval and publication state. |
| Configuration | Theme version, brand asset, policy version and document snapshot. |

Stable identities preserve history across gym changes and membership renewals. Organisation/gym scopes are enforced on requests, joins, files, exports and background jobs. Dashboards are derived views; underlying records remain authoritative.

Separate client input from trusted decisions. Payment provider events are authenticated and reconciled; duplicate or delayed events cannot activate a membership twice or reverse a newer state incorrectly. Physical access hardware, accounting, payroll, messaging and payment providers connect through bounded adapters and remain unselected.

Use transactional updates for final-place reservations, activation conditions and staff access changes. Durable jobs/outbox records handle reminders, recurring tasks, AI analysis and exports. Retry safely and show failed/pending work rather than implying completion.

# Permissions records and recovery

Owners see the authorised portfolio. Gym managers have delegated locations. Reception sees necessary membership and sales information. Instructors see class participants and relevant instructions; cleaning staff see assigned job sheets. HR, full health questionnaires and financial administration require separate permissions. Members see their own private records and explicitly shared content.

Retain actor, time, reason and before/after state for payment overrides, freezes, refunds, rota amendments, attendance corrections, contract revisions and access changes. Sensitive documents/photos use private delivery. Profile updates must not rewrite signed or issued documents.

Autosave states distinguish local draft, server saved, pending attachment and failed upload. Responsive layout changes preserve the active gym, item and draft. Full offline operation is not agreed; do not assume local drafts have reached the server.

Account deactivation, archiving and deletion are different operations. Set retention and deletion policies before customer use, including employment, financial, health and signed records. Backups must cover both database records and evidence, with restore checks that reconcile bookings, payments, access and pending jobs.

# Shared calendar and navigation contract

The role-filtered calendar aggregates staff shifts, classes, courses, bookings, job-sheet occurrences, contractor visits, maintenance appointments, meetings, one-to-ones and task deadlines. Each event retains a link to its authoritative record. Moving a calendar entry invokes that module’s permission, conflict and notification rules; it must not bypass rota publishing or class-change approval.

Owners can filter company/gym/person/type. Staff see own shifts and delegated gym schedules; private HR event titles and absence reasons are concealed from unauthorised viewers. Members see published classes, their bookings and member-facing events, not staff rotas or contractor details. Contractors see their appointments and assigned deadlines. Handle timezone, recurrence edits, cancelled instances and stale updates consistently.

Desktop uses the left sidebar with company tools and expandable gym buttons. iPad/tablet and mobile use a gym switcher and bottom navigation: management Overview/Gyms/Approvals/More; staff Home/My Shifts/Tasks/More; members Home/Classes/My Bookings/Profile; contractors Jobs/Visits/Updates/Account. These are the baseline destination map, with relevant Feed and Calendar views within Home/Dashboard and other modules accessible through More or gym navigation. Members have an always-accessible QR-pass action; staff have an authorised scan action. Local card tabs are distinct from global bottom navigation. Preserve selected gym, record, filters and drafts through resizing and navigation.

# User administration and reception identity

User management covers invitations, approval, gym assignments, role changes, activation, suspension, archive, reactivation and eligible deletion for all four journeys. Account identity, staff employment, membership and contractor assignment states remain distinct. Record reasons and dates; role changes apply to files, search, AI, calendar and exports as well as the visible interface.

On member scan, reception sees an ID-style card with photograph left and name, membership, entitlement and scan outcome right. Highlight outstanding payment, missing onboarding, induction or a request to speak to staff. Distinguish an advisory from a genuine entry restriction. Offer authorised profile, query, payment and attendance actions. Clear the previous person’s card for the next scan; do not expose sensitive health information on the shared screen.

# Common facilities and case card engine

Cleaning, maintenance and administrative tasks share one item/card engine and form schema, with type-specific fields and lifecycle rules. Each item holds company/gym, category, requester, owner, priority, due/scheduled dates, location, optional asset, description and evidence. Templates support recurrence, checklists, required notes/photos, assignment and completion review. A grouped job sheet retains each child task’s proof and status.

Tasks have stable references and one authoritative history across all three categories. A task can have child tasks, each with its own assignee, dates, status, evidence and verification. Prevent circular parent/child relationships. Group independent tasks into a job sheet/work package without duplicating them; separately link related tasks and explicit blocking dependencies. Grouping, parentage and dependency are distinct relationships. Joining tasks preserves original references, feeds and audit trails rather than flattening or deleting them.

Parent/group progress is derived from child states with visible counts. Required incomplete or unverified children prevent a fully completed parent; waived/cancelled children require an authorised reason. Parent closure cannot silently close children. Each task retains responsibility and financial links; aggregate costs once per underlying financial record to avoid counting the same invoice through several tasks. Shared rollups respect each viewer’s permissions.

Log creation, assignment, grouping/ungrouping, parent changes, dependencies, evidence, decisions, status changes, verification and reopening with actor/time/reason. Recurring templates generate distinct occurrences and child tasks, preserving previous cycles. Notifications and calendar entries refer to the underlying task rather than creating copies.

Navigation rule: desktop uses the left sidebar; iPad/tablet and mobile use bottom navigation, including tablet landscape. Adapt content panes to available space independently of navigation placement. Keep role destinations consistent, support safe areas/soft keyboards, and preserve gym context, drafts and selection on resize/rotation. Larger tablets can show two content panes with the bottom bar retained; narrow desktop windows collapse content/sidebar appropriately. Provide equivalent access to all permitted modules through More/gym selection. Verify parent/child progress, grouped evidence, audit history, nonduplicated costs and responsive navigation across all four journeys.

Desktop card structure: the top row contains issue/task details, asset/location, owner/status and original evidence. The second row has two visually distinct but accessible columns: left is the live activity feed and composer; right is the organised record panel. Tokenised surfaces separate columns in light/dark mode; colour is not the only identifying cue. Compact tablet/mobile uses Details/Activity/Records views of the same item.

The composer supports notes, replies, attachments, permitted @mentions, decision requests, quotes, invoices, assignment changes and completion evidence. Each structured update can include notes and attachments. Right-side tabs include Attachments, Decisions/Approvals, Quotes, Invoices/Costs and Audit trail, with Tasks/Asset history where relevant. These are projections of the original typed records/events, not copied interpretations. Audit history includes who changed what, when and why; corrections append history. AI may suggest classification but cannot turn a casual comment into an approved spend or decision.

Member queries and feedback use the same case foundation with appropriate forms and visibility. Feedback supports stars, text, photos and files; distinguish a public review from a private complaint. Staff internal notes never appear in member replies. Closing records resolution; reopening preserves the previous outcome. Image/file viewing happens in app with zoom and navigation.

# Vendor and contractor journey

Management creates or invites a supplier organisation/contact, assigns job/site scope and shares necessary documents. Contractor onboarding records company details and any required credentials/expiry, with acceptance of relevant instructions. Contractor users can accept/decline assignments, request clarification, propose visits, update work, submit versioned quotes/variations, invoices and completion evidence. Managers approve costs and verify closure.

Contractors see only explicitly shared assigned work, not member lists, staff HR, company-wide spending or unrelated jobs. Supplier administrators may allocate their own operatives only within granted scope. Access can be revoked without deleting job evidence. Notifications, assignment acceptance, quote approval, payment and completion verification remain separate states.

# Membership administration and retention

Members is the people/service view; Membership management governs plan versions, prices, deals, payments, entitlements, renewals, freezes and cancellations using those same profiles. Promotions published on company/gym landing pages link to controlled offers with eligibility, dates, terms, applicable gyms and price versions. Preview and approve publication; historical transactions retain the offer accepted.

Retention views identify members whose attendance has declined or who have not visited for a configurable period. Show last confirmed visit, compared period, missed bookings and data completeness, accounting for freezes and known checkout/attendance gaps. Treat risk as an operational indicator, not a certainty about intent.

AI suggests reviewable actions such as a check-in message, conversation or complimentary coach-led introduction where the business permits it. Management selects an action, assigns ownership, approves any offer and records response/outcome. No automatic discount, message or access change. This does not reintroduce the excluded paid personal-training-package module.

# POS till and live stock

Each gym has a role-controlled till with barcode or camera product lookup, search, basket quantities, configured pricing/tax treatment, discounts, cash/card or other configured tenders, receipts and authorised refunds. Support member-linked and anonymous sales. Exact terminal/payment-provider integration remains open; recording an external payment is distinct from capturing it.

Create products with SKU/barcode, description, category, price, optional cost/photo and gym availability. Receive stock by scanning once and entering quantity (for example 20 bars) or repeated scans. Maintain stock per gym and an append-only movement ledger for receipts, sales, returns, damage, expiry, adjustments, transfers and stocktakes. Transfers track dispatch and receipt. Low-stock alerts and expiry/batch tracking apply where configured. An unknown barcode opens authorised product creation/linking.

A quick sale accepts description, quantity and price without creating a stocked product. Restrict price overrides, discounts, voids and refunds by permission and record reasons. Refund and return-to-saleable-stock are separate choices.

Confirm stock deductions with the sale’s successful tender outcome, using concurrency protection and idempotent payment events. Handle pending/ambiguous payments before retrying collection; prevent double charges and duplicate stock movements. Configure out-of-stock handling explicitly. End-of-day/till-shift reconciliation records opening float, expected cash, counted cash, differences and approval. Reports distinguish sales, cash movement, refunds and stock valuation; accounting treatment is configured separately.

# Community feed features

The Facebook-style experience includes posts, photo galleries/video/files, links, reactions, comments/threaded replies, saved posts, polls, events, pinned announcements, audience filtering/search and reporting/moderation. Typed @mentions resolve an authorised user ID, render as an accent-colour link and notify without granting access. Location attachment supports selected gym/place or permission-based current location with manual fallback; map/place provider and costs remain to be chosen. Posting location is deliberate. A reported problem can become a linked case while preserving source and audience boundaries.

# Cross module integration baseline

Review date 6 November 2026. Module relationships are scoped and applied in principle through the ownership, command and lifecycle contracts below. This is architecture consistency review, not proof of working integrations. No built app routes, payment devices or provider callbacks exist to test here. Current Page references comprise the supplied logo attachment and Orb Solutions design URLs; they are source references, not app navigation routes.

## Authoritative records and handoffs

| Source of truth | Consumers | Required handoff |
|---|---|---|
| Company/Gym Settings | All app shells, landing pages, Documents, receipts and Orb icon | Published brand/configuration version; defaults until white labelling active; exact mandatory footer. |
| Identity and scoped role assignments | Every module, search, files, AI, calendar and exports | Current actor/company/gym/action permission checked on each command. |
| Profile and onboarding | Membership, coaching, reception and permitted staff views | One identity, context-specific person records and versioned forms; no duplicated signup on upgrade. |
| Membership and entitlement | Classes, QR entry, member portal and feed audience | Approved effective access based on plan, forms and payment policy; login remains separate. |
| Coach assignment and hourly rates | Public coach cards, PT bookings, class allocation and finance | Effective arrangement, assigned gyms, approved public fields and snapshotted rate. |
| Classes/PT bookings | Calendar, registers, payment charges and member history | Stable occurrence/appointment IDs; confirmed capacity and resource allocation. |
| Staff rota/availability | Calendar, classes/PT scheduling and duty view | Published shift version, conflicts, cover and confirmed attendance state. |
| Attendance events | Registers, profiles, occupancy, analytics and retention | Separate gym visit and class/PT attendance; corrections propagate without erasing history. |
| Facilities/card engine | Contractors, approvals, calendar, asset status and announcements | One job/task with typed feed events, evidence audience and follow-up ownership. |
| Quote/approval and invoice/payment records | Job tabs and company finance | Versioned decision and allocation; estimates, commitments, invoices and actual payments distinct. |
| POS and stock ledger | Till, member receipts, finance and inventory | Confirmed tender/sale with exactly one effective stock movement per item transaction. |
| Documents | HR, membership, supplier records, receipts and reports | Published template plus frozen source/brand data at issue; signed versions never silently updated. |
| Feed/cases/feedback | Notifications, assigned tasks and management reporting | Explicit audience and linked source case/task; tab organisation never duplicates records. |
| Operational modules | Dashboard/calendar/reports and Orb | Permission-filtered derived views with source IDs, event time and freshness. |

Calendar and dashboard are views, not alternate databases. Editing from them invokes the owning module command. Attachments are stored once with explicit links and access rules; reuse across records must not widen visibility. Notifications link to current authorised records, not permanently accessible copies.

## End to end journeys

Owner: signup → workspace/owner role → add gym → configure/publicise gym → assign staff/coaches → operate modules → company calendar and finance → scoped reports/AI actions. Gym archive must expose outstanding staff, bookings, jobs, stock and balances for resolution; it does not silently cancel or delete them.

Member: public gym/offer context → verified account → onboarding/forms → Membership queue → configured payment and approval → active entitlement → booking → gym visit and class register → receipt/feedback. A freeze/cancellation explicitly determines future bookings, billing, access and notifications. Attendance and receipts remain historical.

PT-only client: coach invitation → account/form review → individual authorised PT pass/appointment → scan and attendance → charge/receipt → optional same-account membership upgrade. A shared invitation is not an entry pass. Rental-coach client handling stays minimal unless an approved class/visit requires data.

Staff: scoped invite → required documents/training → assignment → published rota → actual clock-in/duty view → classes/tasks → approved timesheet/payslip → leaver revocation and reassignment. Staff departure or coach absence flags upcoming classes/PT and open tasks for management rather than leaving them unowned.

Contractor: invitation → assigned job → accept/clarify → quote → authorised decision → visit → work evidence → invoice → verification → reconciliation/payment. The contractor can submit evidence of completion but cannot approve their own quote or certify management closure.

Retail: receive stock → barcode basket or quick sale → tender confirmation → sale/stock ledger → branded print/app receipt → till reconciliation. Refunds refer to original lines and separate financial reversal from return-to-stock. Coaching/rent charges are service items, never physical-stock movements.

## Common command and event rules

Consequential commands carry company scope, entity ID, expected version and stable operation ID. Use atomic transactions for capacity reservations, entitlement state changes, inventory movements and associated audit/outbox events. Reject stale edits with a recoverable conflict instead of last-write-wins. Job processing is retryable with deduplicated effects; do not claim exactly-once transport.

Events include GymPublished, BrandingPublished, MembershipActivated/Frozen, PaymentConfirmed/Refunded, BookingConfirmed/Cancelled, RotaPublished, AttendanceCorrected, CoachAssignmentEnded, JobApproved/Completed, AssetStatusChanged and ReceiptIssued. Each event includes stable source/version and occurrence time. Consumers ignore duplicate effects and detect obsolete versions. No public client may forge a payment or approval event.

For payment-required bookings, reserve capacity for a bounded hold and release it on expiry; duration/policy must be configured. An uncertain payment remains pending until reconciled, not charged again blindly. Late success after hold expiry creates a management/payment-resolution case; it must not oversell the class. Regular bookings show unavailable occurrences before confirmation; accepted policy defines partial success. Changes to published class time/coach/room notify affected people and revisit conflicts.

Resource availability is checked across classes, PT, coach rental reservations and maintenance. Out-of-service equipment does not automatically cancel every related class; flag affected sessions for authorised action. A replacement coach must have the appropriate assignment/qualification and availability. Returning an asset to service requires explicit authority distinct from closing an invoice.

## Navigation and link contract

Desktop sidebar, mobile bottom bars and contextual links address the same scoped records. Company calendar → event → gym/module detail; member profile → membership/bookings/attendance/receipts; scan result → member/asset detail; job → quote/decision/invoice/asset; landing coach card → eligible service/booking; every detail provides a consistent back route preserving filters and selected gym.

Resolve the record and authorise before displaying any deep link, including email, QR, @mention and AI-generated links. Handle expired, revoked, archived, inaccessible and missing targets with a useful message and permitted next step. Never switch company silently. Entry QR codes, onboarding tokens and public URLs have different token contracts. Open media in app with return/focus restoration; printer/download links do not create new financial records.

Store public slugs separately from stable IDs. Gym rename retains canonical routing or an authorised redirect; unpublishing removes public content without exposing archived private details. Sender/domain and map integrations remain selected-provider work. The literal footer URL is https://orbsolutions.co.uk; sentence punctuation must not be part of the link target.

## Cross module proof required before release

| Scenario | Evidence required |
|---|---|
| Two owners, several gyms | No cross-company reads/writes/files/AI retrieval; delegated staff cannot enlarge grants. |
| Membership payment and PT upgrade | Duplicate/late payment events reconcile; activation checks forms/rules; one account retains old receipts and visits. |
| Class/rota/resource conflict | Final-place race, coach cover, regular-series exceptions and maintenance restrictions produce correct outcomes. |
| Attendance and retention | Corrections update member/class reports; incomplete capture is not presented as certain inactivity. |
| Contractor job finance | Revised quote invalidates inappropriate approval; invoice/payment totals reconcile without double counting. |
| POS refund and transfer | Pending tender, duplicate callbacks, returns and dispatch/receipt preserve stock/cash history. |
| Settings and Documents | Theme/branding propagates to pages, Orb and new receipts; old signed/issued artifacts are unchanged. |
| Routing and notifications | All four roles reach permitted destinations; expired/private links fail safely; no hidden-tab data leak. |
| Offline interruption/recovery | Pending uploads and drafts remain truthful; revoked access checked at submission; restore reconciles records and evidence. |

In-principle scope is complete for these relationships. Outstanding build dependencies are identity/payment/terminal/printer/domain/map/payroll integrations, configurable commercial and retention policies, detailed screen designs, and executed security/concurrency/recovery tests. No production-readiness or link-functionality certification is implied.

# Reconciliation and acceptance coverage

This revision explicitly covers four customer journeys, dashboard/calendar/feed, shared gym modules, full HR tools, classes/RSVP/registers/feedback, member receipt/profile access, common task cards, contractor workflow, retention/offers and stock-controlled POS. Earlier details remain in force, including workspace isolation, branding, themes, QR attendance and who is on duty. Hourly employed-coach PT, coach-specific rates and PT-only access are included; prepaid PT packages/session bundles remain excluded.

Validate each journey end to end, including denied access: owner creates two gyms and delegates a gym manager; staff completes HR acknowledgement and an evidenced task; member joins, pays, books, scans, leaves feedback and raises a case; contractor quotes, receives approval, completes and invoices. Additional checks cover private calendar leakage, card feed/tab consistency, till retry and reconciliation, cross-gym stock transfer and permission-restricted finance/HR exports. Detailed screen designs and provider integrations remain delivery work, not implemented capability.

# Decisions to resolve and next steps

The following decisions remain open without changing the established product direction.

| Decision | Needed outcome |
|---|---|
| Client identity and assets | Confirm company, gym names, brands, locations and actual logos. |
| Membership rules | Prices, cross-gym access, specialist activities, freezes, cancellations and new-gym inclusion. |
| Joining and safety | Required forms, review responsibility, age eligibility and guardian journey if applicable. |
| Booking policies | Capacity, block partial booking, waiting lists, cancellation cutoffs and no-show handling. |
| Payment and finance | Provider, collection methods, cash/POS reconciliation, billing entities and accounting scope. |
| Staff administration | Employment arrangements, contract templates, approval roles and retention. |
| Attendance devices | Reception scanning, self-scan policy, pass security and any physical entry integration. |
| Design delivery | Default Orb Gym Basic 01 is settled; client assets, permitted preset overrides, configurable limits and exact responsive layouts remain delivery work. |
| Technical delivery | Hosting, identity provider, processing terms, recovery objectives and integration capabilities. |

Suggested delivery sequence: validate the owner dashboard and company/gym structure; establish people, permissions and membership onboarding; connect payments and entitlements; deliver classes and scanning; complete rota/HR and recurring operations; then evaluate AI against the live workflow requirements in a controlled environment. This sequence is a recommendation, not a reduction in agreed scope.

Before release, demonstrate cross-gym access isolation, safe payment-event retries, final-place booking concurrency, QR duplicate handling, leaver access removal, job-sheet completeness, document version preservation and readable mobile/desktop experiences. Validate AI suggestions against representative records rather than assuming accuracy.

This Page is the editable architecture baseline for Orb Gym. Subsequent changes should update the relevant sections and preserve settled decisions. No application has been built or deployed, and the document is not scheduled for automatic updates.


# Reviewed handoff additions — revision r1

The complete existing product scope remains above. Read the source-linked details in modules/11-finance-reports-and-analytics.md and modules/12-access-navigation-and-notifications.md, the planning-gap-register.md, design-and-token-deliverables.md and platform-evidence-and-delivery-gates.md. These make missing planning detail explicit; they do not approve unchosen prices, policies, providers or additional social/POS options. OG-REV-001 through OG-REV-011 identify review requirements in addition to the stable OG-SRC IDs. Include both namespaces in delivery coverage.

## Delivery planning — confirmed founder instruction, r2

All delivery cards use one global numbered sequence from 00, 01, 02 onward in logical prerequisite order. The full rule, including parent/child handling and stable board IDs, is OG-REV-011 in board-card-contract.md. This governs implementation planning; it does not number customers' operational tasks or authorise building.

# Feature pipeline catalogue — repository edition 0.20

All four role journeys are supplemented by docs/workflows/README.md and its 115 feature-level workflows across seventeen domains. Each one identifies actors, prerequisites, ordered checkpoints, authoritative outcome/handoff and exception/policy branches. The catalogue, structured feature register and docs/delivery/workflow-coverage.md must be used with all original source blocks during atomic requirements/spec/card planning. Exact implementation states and open policies are not settled by this addition; no app behaviour has been tested.

# Operational gap review — repository 0.21

Read docs/reviews/operational-gap-review-0.21.md and docs/decisions/operational-decisions.md. Fifteen exception/lifecycle subflows clarify existing features, producing 130 workflows for the same 115 feature IDs. Payment reversals, disruption after publication/payment, unavailable approvers, supplier operatives, workspace-private person data, gym closure, till reconciliation and public projection invalidation have explicit handoffs. Proposed policies and optional feature scope are not accepted by this addition. No original source block or settled decision is removed.

# Completed capability and operational design — 0.22

Current source extensions OG-EXT-001–005 specify optional trials/guests, junior/guardian relationships, controlled import/reconciliation and privileged authentication/recovery, alongside DEC-GR-01–07 default routing/guards and versioned company setup/readiness. They reuse existing identity/person/entitlement/forms/payment/visit/booking/task/document/audit foundations and stay within the four customer journeys. See docs/source-extension-register.md, docs/setup-and-readiness.md and the twenty feature briefs. Trials/junior offerings stay disabled until configured; imports do not bypass onboarding/payment approval; privileged production actions need supported MFA/recovery evidence. No age, rate, statutory content or provider credential is invented. The prior proposal status is superseded at product-design level; actual implementation and tenant activation remain separate.
