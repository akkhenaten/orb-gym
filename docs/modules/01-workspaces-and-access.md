# workspaces and access

Detailed extracted scope from baseline 0.17. Read with product-architecture.md and decisions-and-open-items.md. Each source reference is traceable; no requirement is removed by this grouping.

# Company and gym structure

<!-- OG-SRC-0005 -->
The first layer is the company workspace. Its owner uploads the company logo and configures company details, contact information, default branding and operating policies. Within it, authorised management can add multiple gyms, including additional brands or locations.

<!-- OG-SRC-0006 -->
| Level | Responsibility |
|---|---|
| Platform | Default Orb Gym identity, service administration and controlled support access. |
| Company workspace | Company profile, gym portfolio, shared people, reporting, policies and default design. |
| Gym | Local brand, location, facilities, memberships, timetable, reception and operations. |
| Area or resource | Rooms, training spaces, equipment and operational zones within a gym. |

<!-- OG-SRC-0007 -->
A brand and a physical gym are separate concepts: the same brand could later operate several locations. Each gym can inherit company settings or override permitted fields. One person has one account with explicit member entitlements or staff assignments; visiting another permitted gym does not require a duplicate profile.

<!-- OG-SRC-0008 -->
The company workspace is the access boundary. A person with access to several workspaces switches context explicitly. Company-wide permissions and individual gym assignments are distinct.

# Owner signup and platform administration

<!-- OG-SRC-0009 -->
Owner onboarding is self-service: create account → verify email → create company workspace → enter company details and optional branding → add first gym → configure services and invite staff. Subsequent gyms are added through Add gym. There is no fixed product-level gym-count limit; capacity, performance and any future commercial limits must be stated separately rather than assumed.

<!-- OG-SRC-0010 -->
Workspace creation and owner membership commit together with retry-safe onboarding so repeated signup callbacks do not create duplicates. Incomplete onboarding resumes. An invited staff member or joining member follows the invitation/application flow instead of becoming a workspace owner automatically. One identity can hold roles in several workspaces through explicit grants and context switching.

<!-- OG-SRC-0011 -->
Every gym belongs to one company workspace. Membership plans, staff, POS, inventory, classes, attendance, HR, cases, maintenance, evidence and finances carry that workspace scope and applicable gym scope. Owners manage all their gyms; delegated managers manage selected gyms. All existing tools remain available within the appropriate company/gym permissions. No customer can discover another company’s people or records through search, AI, exports, notifications, files or guessed identifiers.

## Platform admin console

<!-- OG-SRC-0012 -->
Orb Gym platform administrators have a separate console covering workspace directory, owner contacts, onboarding status, active/suspended/archived workspace states, gym counts, service health, usage, configuration and support cases. Platform administration is distinct from customer ownership and does not require adding Orb staff to every gym rota.

<!-- OG-SRC-0013 -->
Support authorised workspace inspection through explicit workspace selection, recorded reason and scoped temporary support access. Keep privileged role assignment, suspension, restoration and configuration changes audited. No silent impersonation, customer signatures, payment approvals or professional decisions. Sensitive HR/health/financial content requires specifically granted access rather than automatic inclusion in a portfolio summary. Administrative exports and background jobs follow the same access boundary.

<!-- OG-SRC-0014 -->
Workspace suspension is separate from a member’s payment-linked membership suspension. Preserve data and display a clear service/account message under the agreed policy. Workspace closure, retention, export and deletion remain explicit processes; do not cascade-delete company histories from an owner account action. Ownership transfer must preserve an active owner.

## White label configuration

<!-- OG-SRC-0015 -->
Brand inheritance is Orb Gym default → company workspace brand → permitted gym overrides. Company owners can set company logo, display name, contact details and theme; each gym can inherit or override its own identity. Keep billing entities separate from decorative branding. Orb Gym remains the platform identity in administration and product records. Company/gym white labelling does not rename the underlying product or create separate data silos.

<!-- OG-SRC-0016 -->
Validate onboarding retries, isolation between two unrelated owners, creation of multiple gyms, scoped staff/member invitations, theme inheritance, platform support access logging and safe suspension/restoration before release. Hosting, identity provider, subscription pricing and any platform payment model remain unselected.

# Four user journeys and role based access

<!-- OG-SRC-0017 -->
| Journey | Access scope | Primary experience |
|---|---|---|
| Owner administration and management | Workspace-wide oversight of all gyms; owner/admin/management permissions determine actions and sensitive fields | Desktop first with responsive mobile; finances, reports, analytics, calendar, approvals and operations. |
| Staff | Assigned gym or gyms only, with manager, supervisor, reception, cleaner and coach role permissions | Desktop/mobile; relevant gym modules and own HR self-service. |
| Member | Own profile/membership and member-facing content for entitled gyms | Mobile first; feed, calendar, bookings, receipts, attendance and feedback. |
| Vendor or contractor | Explicitly assigned jobs, visits and shared records | Responsive portal; accept work, communicate, quote, invoice and submit evidence. |

<!-- OG-SRC-0018 -->
Owners can oversee all their gyms remotely. Company administrators and management receive delegated company-level rights; a gym manager is a staff role limited to assigned gyms unless separately granted company-level access. RBAC combines role, company, gym assignment, record audience, field sensitivity and permitted action. A person can hold several roles without merging their private views. Platform administrators remain a separate service-administration role outside these four customer journeys.

<!-- OG-SRC-0019 -->
All users have sign-in/out, password recovery, profile management and personal appearance settings. Company membership roles, financial permissions and professional qualifications are managed separately from self-edited profile details.

# Permissions records and recovery

<!-- OG-SRC-0191 -->
Owners see the authorised portfolio. Gym managers have delegated locations. Reception sees necessary membership and sales information. Instructors see class participants and relevant instructions; cleaning staff see assigned job sheets. HR, full health questionnaires and financial administration require separate permissions. Members see their own private records and explicitly shared content.

<!-- OG-SRC-0192 -->
Retain actor, time, reason and before/after state for payment overrides, freezes, refunds, rota amendments, attendance corrections, contract revisions and access changes. Sensitive documents/photos use private delivery. Profile updates must not rewrite signed or issued documents.

<!-- OG-SRC-0193 -->
Autosave states distinguish local draft, server saved, pending attachment and failed upload. Responsive layout changes preserve the active gym, item and draft. Full offline operation is not agreed; do not assume local drafts have reached the server.

<!-- OG-SRC-0194 -->
Account deactivation, archiving and deletion are different operations. Set retention and deletion policies before customer use, including employment, financial, health and signed records. Backups must cover both database records and evidence, with restore checks that reconcile bookings, payments, access and pending jobs.

# User administration and reception identity

<!-- OG-SRC-0198 -->
User management covers invitations, approval, gym assignments, role changes, activation, suspension, archive, reactivation and eligible deletion for all four journeys. Account identity, staff employment, membership and contractor assignment states remain distinct. Record reasons and dates; role changes apply to files, search, AI, calendar and exports as well as the visible interface.

<!-- OG-SRC-0199 -->
On member scan, reception sees an ID-style card with photograph left and name, membership, entitlement and scan outcome right. Highlight outstanding payment, missing onboarding, induction or a request to speak to staff. Distinguish an advisory from a genuine entry restriction. Offer authorised profile, query, payment and attendance actions. Clear the previous person’s card for the next scan; do not expose sensitive health information on the shared screen.


