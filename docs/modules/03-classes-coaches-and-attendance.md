# classes coaches and attendance

Detailed extracted scope from baseline 0.17. Read with product-architecture.md and decisions-and-open-items.md. Each source reference is traceable; no requirement is removed by this grouping.

# Classes and booking architecture

## Coach led classes and booking rules

<!-- OG-SRC-0048 -->
Independent rental coaches can run classes when explicitly enabled by the gym. This adds class tools to their otherwise limited role: create/propose schedules within permitted gyms/resources, manage their own class occurrences and registers, communicate with authorised attendees and view relevant class feedback. Gym management controls publication, permitted capacity/resources and whether proposed classes require review. Running a class does not confer general staff HR, financial or member-directory access.

<!-- OG-SRC-0049 -->
Classes retain organiser/operating arrangement separately from the instructor. Specify whether a rental-coach class is included in gym membership or separately charged, who collects any payment and whether an agreed gym fee/share applies. Do not automatically impose the employed-coach split on rental classes. Rental coaches see only necessary enrolled-participant information; their independent client records remain separate.

<!-- OG-SRC-0050 -->
At class setup define title, description, coach, gym/room, dates/recurrence, duration, capacity, eligibility, price/inclusion, booking opening/cutoff, waiting-list behaviour and one-off versus regular enrolment. Members can join a single class or reserve a defined recurring sequence; each occurrence has its own booking, capacity and attendance. Regular enrolment must show included dates, conflicts, exceptions and any end date. Do not promise places in unavailable occurrences or create an indefinite financial commitment silently.

<!-- OG-SRC-0051 -->
Configure class-level cancellation/no-show policy from a company default: cancellation cutoff, allowed cancellation method, late cancellation/no-show outcomes, permitted charge or credit treatment, repeated-event thresholds and any booking restriction. Show applicable rules before confirmation and retain the version accepted. Charges/restrictions require defined authority and payment/entitlement rules; they cannot arise from an unstructured note. Staff corrections and authorised waivers retain reasons. Coach/gym cancellation has its own notification and refund/credit treatment.

<!-- OG-SRC-0052 -->
The coach responsible for the occurrence completes its attendance register by authorised QR scanning or manual entry. Record attended, late, cancelled, late-cancelled, no-show or unresolved as appropriate, with actor/time and correction history. Finalise no-shows after the register is reviewed rather than assuming every unscanned person was absent. Each result links to the member profile and class history; gym entry and class attendance remain distinct. Regular bookings do not auto-mark attendance.

## Public staff and coach flip cards

<!-- OG-SRC-0053 -->
Published staff/coach profiles appear automatically on the relevant landing page as flip cards. The front shows the approved photograph, name and role; the reverse shows approved specialities, introduction, offered classes/PT and public fees where enabled. Show an explicit contact/book/details action tied to the correct gym and service.

<!-- OG-SRC-0054 -->
Flip by click/tap and keyboard as well as optional desktop hover; provide a labelled details alternative on mobile and with reduced motion. Important fees and booking terms must remain available on the linked service page, not solely hidden behind an animation. Profile fees are sourced from approved price records; distinguish per-hour PT rates, per-class prices and membership-included services.

<!-- OG-SRC-0055 -->
Owners/managers control profile publication and fields. Payroll rates, rent, private contact details, HR/health records and internal revenue shares are never public. Unpublishing a profile or ending a gym assignment updates the page without erasing past attendance or transactions.

<!-- OG-SRC-0056 -->
Acceptance: a rental coach schedules an authorised class but cannot access unrelated gym records; members book one-off and regular dates; capacity and policy versions remain correct; coach records/corrects attendance and member histories agree; published flip cards update photos/specialities/fees and work with touch/keyboard/reduced motion.

<!-- OG-SRC-0057 -->
Recurring class definitions generate dated class occurrences, each with its own capacity, instructor, room and register. Courses and blocks are distinct products rather than repeated single bookings without shared rules.

<!-- OG-SRC-0058 -->
| Booking type | Behaviour |
|---|---|
| Single session | Reserve one occurrence. |
| Recurring block | Reserve a defined sequence, with unavailable dates disclosed. |
| Course | Enrol in the programme according to its completion/enrolment rules. |
| Last-minute booking | Permit until the configured cutoff where capacity and entitlement allow. |
| Waiting list | Queue for a place and receive a time-limited offer under a defined policy. |

<!-- OG-SRC-0059 -->
Booking checks membership rights, class eligibility, capacity, time conflicts and any configured prerequisites. Concurrent attempts cannot both take the same final place. Blocks require an explicit all-or-partial booking policy; no silent partial enrolment.

<!-- OG-SRC-0060 -->
Cancellations, refunds, no-show rules, booking windows and waiting-list priority are company-configured decisions. Notify affected members when an instructor, room, time or session changes.

<!-- OG-SRC-0061 -->
Gym entry does not prove class attendance. Instructors open the particular class register and scan each member’s pass, with manual attendance and authorised corrections available. Finalised non-attendance becomes a no-show with a query/correction process. RSVP expresses interest unless the class policy explicitly makes it a confirmed booking; capacity is consumed only by the defined reservation state. Completed classes can invite star/text/media feedback with a private/public audience choice, moderation and follow-up cases.

# Entry exit and live occupancy

<!-- OG-SRC-0062 -->
Members have a digital membership pass and profile photograph. Entry checks entitlement and records a visit. Exit closes the visit. The gym register shows who is currently recorded inside, arrival time and identification information for authorised staff; the owner can inspect all gyms.

<!-- OG-SRC-0063 -->
Two supported journey options are envisaged: a member presents their QR pass to a reception device or staff phone; or an authenticated member scans a designated gym entry/exit code with their phone. Final scanning hardware and integrations remain open.

<!-- OG-SRC-0064 -->
Entry and exit are explicit events, not an uncontrolled toggle. Repeated scans return the known state. A scan identifies the account or checkpoint; anti-sharing controls, short-lived passes and checkpoint verification need delivery design. A static QR alone does not establish physical presence.

<!-- OG-SRC-0065 -->
Forgotten checkout creates a reconciliation exception. Distinguish confirmed departure from an administratively closed visit, preserving actor and reason. Live occupancy is a recorded operational view whose reliability depends on scan completion; do not silently treat stale visits as confirmed presence or an emergency headcount guarantee.

# Coach arrangements and permissions

## Hourly PT pricing and PT only clients

<!-- OG-SRC-0066 -->
Gym-employed coaches deliver PT charged at configured hourly rates. Management can set a company/gym default for all employed coaches or an effective-dated override per coach. Each appointment snapshots the applied rate, duration, price and rule version; later rate changes do not rewrite existing charges. Define billable increments, minimum duration, rounding, cancellation treatment and permitted discounts before use. Customer PT rates are separate from coach wages/payroll rates and any internal revenue-share arrangement; do not infer one from another. Prepaid PT packages remain excluded.

### Automatic coach listing

<!-- OG-SRC-0067 -->
Company/gym landing pages automatically display published coach profiles from the approved staff/coaching records: name, photo, introduction, relevant specialisms, gym assignment, PT offering and approved public rate where enabled. New or updated approved public profiles propagate without manual page duplication; private HR, personal contacts, earnings and client information never publish. Unpublished, departed or unavailable coaches are removed or appropriately marked. Rental coaches appear only where explicitly enabled by management.

### Coach shared onboarding and access

<!-- OG-SRC-0068 -->
A coach can generate/share a gym-scoped PT invitation QR for a non-member. Scanning it prompts account signup or sign-in and links the client to the inviting coach and gym. An invitation QR is not itself an entry credential. Use expiring/revocable invite tokens, prevent unintended reuse where individual invitations are intended and link existing accounts after verified acceptance rather than duplicating them.

<!-- OG-SRC-0069 -->
The client completes profile, emergency contacts, PAR-Q, house rules and other required PT acknowledgements. Track outstanding review and payment requirements explicitly. Once the gym’s configured PT eligibility conditions are met and an appointment/access window is authorised, issue the client’s own scannable PT access pass. The coach can share the access-pass delivery link with the intended client; possession of a general invitation must never bypass onboarding or create unrestricted gym entry.

<!-- OG-SRC-0070 -->
Reception scans the client’s pass, sees PT-only status, photograph where supplied, coach, appointment/gym, allowed time and unresolved restrictions, then records entry/exit through the normal register. Expired, cancelled or revoked appointments/passes cannot create new entry. Define a permitted buffer around appointments; do not grant all-day/open-gym access by implication. Manual overrides require authority and a reason.

### Limited PT account and membership upgrade

<!-- OG-SRC-0071 -->
PT-only clients receive limited app access: own PT appointments, authorised messaging with coach/gym, QR pass, onboarding/forms, PT receipts/payment history, relevant instructions, profile/security and notifications. Ordinary gym classes, open-gym access, unrelated member directories and full member-only feeds remain unavailable unless separately granted. Public announcements and PT-specific notices can be shared deliberately.

<!-- OG-SRC-0072 -->
Store PT-client status, gym membership and access entitlements separately from the identity account and staff roles. A person may hold PT access alongside a gym membership, including different entitlements at different gyms. Upgrading should not replace the account or erase PT records.

<!-- OG-SRC-0073 -->
Membership staff can convert/extend a PT-only client into an active gym member by selecting the gym/plan, confirming required current onboarding/agreements, setting up DD/payment and approving activation. Reuse still-valid forms where appropriate, requesting updated acknowledgements when scope/terms changed. Preserve coach links, QR/attendance history, receipts and identity. New member features unlock only when the membership activation conditions are met; no second signup is required.

<!-- OG-SRC-0074 -->
Acceptance: default and coach-specific hourly rates calculate correctly and preserve earlier bookings; public coach edits update the correct gym pages; a shared invitation creates limited PT onboarding; incomplete forms cannot produce unrestricted entry; valid PT passes admit only the permitted visit; Membership upgrades the same account with correct payments and permissions.

<!-- OG-SRC-0075 -->
Support two explicitly configured coach arrangements: independent rental coach and gym-employed coach with revenue share. Store the arrangement by company/gym assignment, with effective dates and agreed terms; one coach may have different arrangements at different gyms. Commercial labels do not determine legal employment status. This extends coaching management without reinstating the previously excluded paid personal-training-package/session-bundle module.

## Independent rental coach

<!-- OG-SRC-0076 -->
The coach pays the gym an agreed rental charge and manages their own client relationship. Provide limited access: own profile, qualifications/insurance where required by company policy, agreement, gym instructions/SOP acknowledgements, permitted facility calendar, own room/space reservations, notifications, rent invoices/receipts and issue reporting. No staff disciplinary/payroll tools merely because they coach at the premises.

<!-- OG-SRC-0077 -->
Configure rent frequency, amount, applicable gyms/resources, effective dates and payment status. Record approved adjustments and reconcile payments. Outstanding rent can trigger management review and configured access rules; it must not silently remove a client's unrelated membership.

<!-- OG-SRC-0078 -->
Default client handling is minimal: the coach can submit necessary guest/access details or link an existing consenting member for an authorised visit. Owning a coaching relationship does not grant access to the gym member database, payment history, health questionnaires or another coach's clients. Clients still require their own gym entry entitlement, pass or approved visitor arrangement. Full independent-business CRM, coaching sales and progress records are outside this limited tier.

<!-- OG-SRC-0079 -->
Journey: management invites coach → verifies required documents/agreement → configures rental terms and permitted facilities → coach accepts → payments/access follow the agreement → coach reserves space and registers permitted visits → renewal/offboarding. Rent and resource permissions remain auditable.

## Gym-employed coach with revenue share

<!-- OG-SRC-0080 -->
Provide staff onboarding, HR/contract/payslip access, rota, availability, training and SOPs, plus assigned-client and delivered-session tools. Management sets who can allocate clients, schedule sessions, adjust charges, approve work and review earnings. Coaches see their own assignments and earnings statements, not other coaches' earnings or unrestricted financial reports.

<!-- OG-SRC-0081 -->
Features include consultation requests, assigned client records, goals/notes where authorised, coaching appointments, recurring appointments, room/equipment reservations, class links, attendance/no-shows, session completion, member feedback and follow-up tasks. Client-facing information and private coaching notes have separate visibility. Sensitive data uses explicit role/relationship grants. AI can summarise authorised records or draft guidance for coach review; it does not prescribe autonomous clinical advice.

<!-- OG-SRC-0082 -->
A coaching appointment links coach, client(s), gym, resource, duration, price/charge reference, completion and payment records. It checks staff rota, teaching commitments, availability and cross-gym travel. Session charges can be recorded as individual approved services through POS or invoicing; prepaid package balances and PT bundles remain excluded pending a separate founder decision.

<!-- OG-SRC-0083 -->
Configure the commercial split precisely: gym percentage or fixed share, coach allocation, applicable services, effective dates, calculation basis and earning trigger. Define whether the basis excludes tax, discounts, refunds and processing fees; no universal net/gross assumption. Separate collected revenue, delivered work, provisional allocation, approved earnings and actual payroll/payment. The phrase gym takes a cut does not itself specify how the employee is paid.

<!-- OG-SRC-0084 -->
Calculation illustration only: with an agreed 30% gym share on a £50 eligible basis, allocate £15 to the gym and £35 to the coach before any separately configured employment/payroll treatment. This is a reporting allocation, not an automatic payroll instruction. Version the rule used for each transaction. Refunds, partial payments, cancellations, credits and disputes create traceable adjustments rather than rewriting paid history.

<!-- OG-SRC-0085 -->
Management reviews session/collection exceptions and approves period statements. Export approved payroll inputs to the chosen payroll process where appropriate; calculation or filing of payroll is not implied. An employed coach's contract determines how salary and variable earnings interact.

## Shared controls and owner reporting

<!-- OG-SRC-0086 -->
Both arrangements have gym-scoped profiles, required credential expiry reminders, facility rules, conflict-aware booking, relevant announcements, feedback and incident reporting. Publish member-facing coach profiles only through authorised profile settings. Rental coaches and employed coaches have separate role presets, not an unrestricted coach role.

<!-- OG-SRC-0087 -->
Owner reporting separates rental income/arrears from gym coaching sales, gym share, coach earnings allocations, refunds and approved/unpaid amounts. Do not double count the member's payment and its internal allocation as two revenues. Show source transactions, rule version and approval history.

<!-- OG-SRC-0088 -->
Changing arrangement creates an effective-dated assignment and access review. Revoke obsolete client/resource access, resolve future bookings and outstanding rent/earnings, and preserve old contracts/statements. A move from rental to employment does not automatically copy private client data into company records.

<!-- OG-SRC-0089 -->
Acceptance: rental coach cannot open member/HR/earnings lists; their own rent and resources work; employed coach sees assigned clients and own staff records; scheduling rejects conflicts; commercial allocations reconcile to source charges and adjustments; payroll approval is separate; arrangement changes preserve history.

# Member staff directory and who is on duty

<!-- OG-SRC-0117 -->
Signed-in members can view each gym’s member-facing staff directory and current duty team without being physically at the gym or checked in. Place a Team or Who is on duty entry on the gym home view. Gym visibility follows the member’s existing permitted gym scope; it does not grant access to another company or restricted location.

<!-- OG-SRC-0118 -->
The staff directory shows all published staff profiles for that gym, including photograph, member-facing name, role and optional introduction or relevant specialism. Distinguish the wider team from those currently on duty. Archived or departed staff are removed from the current directory while historical records remain intact.

<!-- OG-SRC-0119 -->
The live duty view highlights the duty manager or responsible lead, reception team, instructors and other published on-duty roles. Derive scheduled duty from the published rota; distinguish scheduled from checked-in/on-duty confirmation using attendance and authorised updates. A rota alone does not prove presence. Show last-updated information and an explicit unconfirmed state rather than falsely presenting someone as present. A staff clock-out, approved replacement or shift change updates the view; preserve who is responsible during cover changes.

<!-- OG-SRC-0120 -->
Members see current gym responsibilities, not private HR records, pay, personal contact details, absence reasons or a full employee tracking history. Use in-app gym contact or permitted case creation rather than exposing personal numbers. Keep detailed future rotas and staff location history within staff/management permissions.

<!-- OG-SRC-0121 -->
The owner and gym managers control profile publication and duty-role assignment. This is a current-service view, not continuous location tracking. Verify that members can open it remotely, duty cover updates correctly, scheduled/unconfirmed status is truthful, and staff-only fields never appear in the member response.


