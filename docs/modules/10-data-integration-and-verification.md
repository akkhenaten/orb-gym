# data integration and verification

Detailed extracted scope from baseline 0.17. Read with product-architecture.md and decisions-and-open-items.md. Each source reference is traceable; no requirement is removed by this grouping.

# Logical data and service architecture

<!-- OG-SRC-0186 -->
Recommend a modular application with shared transactional records, private evidence storage and durable background processing. These responsibilities do not imply separate microservices or a selected hosting platform.

<!-- OG-SRC-0187 -->
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

<!-- OG-SRC-0188 -->
Stable identities preserve history across gym changes and membership renewals. Organisation/gym scopes are enforced on requests, joins, files, exports and background jobs. Dashboards are derived views; underlying records remain authoritative.

<!-- OG-SRC-0189 -->
Separate client input from trusted decisions. Payment provider events are authenticated and reconciled; duplicate or delayed events cannot activate a membership twice or reverse a newer state incorrectly. Physical access hardware, accounting, payroll, messaging and payment providers connect through bounded adapters and remain unselected.

<!-- OG-SRC-0190 -->
Use transactional updates for final-place reservations, activation conditions and staff access changes. Durable jobs/outbox records handle reminders, recurring tasks, AI analysis and exports. Retry safely and show failed/pending work rather than implying completion.

# Cross module integration baseline

<!-- OG-SRC-0218 -->
Review date 6 November 2026. Module relationships are scoped and applied in principle through the ownership, command and lifecycle contracts below. This is architecture consistency review, not proof of working integrations. No built app routes, payment devices or provider callbacks exist to test here. Current Page references comprise the supplied logo attachment and Orb Solutions design URLs; they are source references, not app navigation routes.

## Authoritative records and handoffs

<!-- OG-SRC-0219 -->
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

<!-- OG-SRC-0220 -->
Calendar and dashboard are views, not alternate databases. Editing from them invokes the owning module command. Attachments are stored once with explicit links and access rules; reuse across records must not widen visibility. Notifications link to current authorised records, not permanently accessible copies.

## End to end journeys

<!-- OG-SRC-0221 -->
Owner: signup → workspace/owner role → add gym → configure/publicise gym → assign staff/coaches → operate modules → company calendar and finance → scoped reports/AI actions. Gym archive must expose outstanding staff, bookings, jobs, stock and balances for resolution; it does not silently cancel or delete them.

<!-- OG-SRC-0222 -->
Member: public gym/offer context → verified account → onboarding/forms → Membership queue → configured payment and approval → active entitlement → booking → gym visit and class register → receipt/feedback. A freeze/cancellation explicitly determines future bookings, billing, access and notifications. Attendance and receipts remain historical.

<!-- OG-SRC-0223 -->
PT-only client: coach invitation → account/form review → individual authorised PT pass/appointment → scan and attendance → charge/receipt → optional same-account membership upgrade. A shared invitation is not an entry pass. Rental-coach client handling stays minimal unless an approved class/visit requires data.

<!-- OG-SRC-0224 -->
Staff: scoped invite → required documents/training → assignment → published rota → actual clock-in/duty view → classes/tasks → approved timesheet/payslip → leaver revocation and reassignment. Staff departure or coach absence flags upcoming classes/PT and open tasks for management rather than leaving them unowned.

<!-- OG-SRC-0225 -->
Contractor: invitation → assigned job → accept/clarify → quote → authorised decision → visit → work evidence → invoice → verification → reconciliation/payment. The contractor can submit evidence of completion but cannot approve their own quote or certify management closure.

<!-- OG-SRC-0226 -->
Retail: receive stock → barcode basket or quick sale → tender confirmation → sale/stock ledger → branded print/app receipt → till reconciliation. Refunds refer to original lines and separate financial reversal from return-to-stock. Coaching/rent charges are service items, never physical-stock movements.

## Common command and event rules

<!-- OG-SRC-0227 -->
Consequential commands carry company scope, entity ID, expected version and stable operation ID. Use atomic transactions for capacity reservations, entitlement state changes, inventory movements and associated audit/outbox events. Reject stale edits with a recoverable conflict instead of last-write-wins. Job processing is retryable with deduplicated effects; do not claim exactly-once transport.

<!-- OG-SRC-0228 -->
Events include GymPublished, BrandingPublished, MembershipActivated/Frozen, PaymentConfirmed/Refunded, BookingConfirmed/Cancelled, RotaPublished, AttendanceCorrected, CoachAssignmentEnded, JobApproved/Completed, AssetStatusChanged and ReceiptIssued. Each event includes stable source/version and occurrence time. Consumers ignore duplicate effects and detect obsolete versions. No public client may forge a payment or approval event.

<!-- OG-SRC-0229 -->
For payment-required bookings, reserve capacity for a bounded hold and release it on expiry; duration/policy must be configured. An uncertain payment remains pending until reconciled, not charged again blindly. Late success after hold expiry creates a management/payment-resolution case; it must not oversell the class. Regular bookings show unavailable occurrences before confirmation; accepted policy defines partial success. Changes to published class time/coach/room notify affected people and revisit conflicts.

<!-- OG-SRC-0230 -->
Resource availability is checked across classes, PT, coach rental reservations and maintenance. Out-of-service equipment does not automatically cancel every related class; flag affected sessions for authorised action. A replacement coach must have the appropriate assignment/qualification and availability. Returning an asset to service requires explicit authority distinct from closing an invoice.

## Navigation and link contract

<!-- OG-SRC-0231 -->
Desktop sidebar, mobile bottom bars and contextual links address the same scoped records. Company calendar → event → gym/module detail; member profile → membership/bookings/attendance/receipts; scan result → member/asset detail; job → quote/decision/invoice/asset; landing coach card → eligible service/booking; every detail provides a consistent back route preserving filters and selected gym.

<!-- OG-SRC-0232 -->
Resolve the record and authorise before displaying any deep link, including email, QR, @mention and AI-generated links. Handle expired, revoked, archived, inaccessible and missing targets with a useful message and permitted next step. Never switch company silently. Entry QR codes, onboarding tokens and public URLs have different token contracts. Open media in app with return/focus restoration; printer/download links do not create new financial records.

<!-- OG-SRC-0233 -->
Store public slugs separately from stable IDs. Gym rename retains canonical routing or an authorised redirect; unpublishing removes public content without exposing archived private details. Sender/domain and map integrations remain selected-provider work. The literal footer URL is https://orbsolutions.co.uk; sentence punctuation must not be part of the link target.

## Cross module proof required before release

<!-- OG-SRC-0234 -->
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

<!-- OG-SRC-0235 -->
In-principle scope is complete for these relationships. Outstanding build dependencies are identity/payment/terminal/printer/domain/map/payroll integrations, configurable commercial and retention policies, detailed screen designs, and executed security/concurrency/recovery tests. No production-readiness or link-functionality certification is implied.

# Reconciliation and acceptance coverage

<!-- OG-SRC-0236 -->
This revision explicitly covers four customer journeys, dashboard/calendar/feed, shared gym modules, full HR tools, classes/RSVP/registers/feedback, member receipt/profile access, common task cards, contractor workflow, retention/offers and stock-controlled POS. Earlier details remain in force, including workspace isolation, branding, themes, QR attendance and who is on duty. Hourly employed-coach PT, coach-specific rates and PT-only access are included; prepaid PT packages/session bundles remain excluded.

<!-- OG-SRC-0237 -->
Validate each journey end to end, including denied access: owner creates two gyms and delegates a gym manager; staff completes HR acknowledgement and an evidenced task; member joins, pays, books, scans, leaves feedback and raises a case; contractor quotes, receives approval, completes and invoices. Additional checks cover private calendar leakage, card feed/tab consistency, till retry and reconciliation, cross-gym stock transfer and permission-restricted finance/HR exports. Detailed screen designs and provider integrations remain delivery work, not implemented capability.

# Decisions to resolve and next steps

<!-- OG-SRC-0238 -->
The following decisions remain open without changing the established product direction.

<!-- OG-SRC-0239 -->
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

<!-- OG-SRC-0240 -->
Suggested delivery sequence: validate the owner dashboard and company/gym structure; establish people, permissions and membership onboarding; connect payments and entitlements; deliver classes and scanning; complete rota/HR and recurring operations; then evaluate AI against the live workflow requirements in a controlled environment. This sequence is a recommendation, not a reduction in agreed scope.

<!-- OG-SRC-0241 -->
Before release, demonstrate cross-gym access isolation, safe payment-event retries, final-place booking concurrency, QR duplicate handling, leaver access removal, job-sheet completeness, document version preservation and readable mobile/desktop experiences. Validate AI suggestions against representative records rather than assuming accuracy.

<!-- OG-SRC-0242 -->
This Page is the editable architecture baseline for Orb Gym. Subsequent changes should update the relevant sections and preserve settled decisions. No application has been built or deployed, and the document is not scheduled for automatic updates.


