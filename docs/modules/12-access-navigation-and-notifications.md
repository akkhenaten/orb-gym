# Access, Navigation and Notifications — Planning Detail

Review r1. This fills delivery contracts within existing journeys; it is not a fully approved permission matrix or final wireframe set. The builder must produce those as explicit planning outputs. Source: four journeys, Settings/profile, shared calendar/navigation, reception, HR and contractor sections.

## OG-REV-003 — Permission catalogue

Produce a role/action/record/field matrix and scoped role presets. Owner oversight spans the workspace; admin/management roles are delegated. Staff scope follows gym assignments. Restricted HR, health and financial grants remain separate as already specified. Do not interpret “owner sees everything” as removing those existing controls or as giving platform support routine access to all customer data.

| Role/context | Intended tools and boundary |
|---|---|
| Owner/company admin/management | Portfolio dashboard/calendar, gyms, finance/reports, users, delegated operations, approvals, Documents, publishing and Settings according to granted actions. |
| Gym manager/supervisor | Assigned-gym operations, delegated invitations and reviews; no ability to expand their own privilege or grant other gyms. Sensitive HR/finance access requires its own grant. |
| Reception | Member ID/entry, authorised member onboarding/payment/till, queries and own staff tools. Full PAR-Q/HR files are not ordinary reception data. |
| Cleaner | Own staff tools, assigned/delegated recurring tasks/job sheets, evidence and issue reporting. |
| Employed coach | Own staff tools, allocated classes/registers, authorised PT clients/appointments and own earnings view. |
| Rental coach | Limited profile/agreement/rent/resources and approved own classes/registers. No general member CRM or staff payroll/disciplinary tools. |
| Active member | Own profile/pass/bookings/receipts/forms, entitled feed/classes, gym team/duty view, feedback and cases. |
| Pending member/PT-only | Limited onboarding/status/payment or authorised PT tools respectively; no active-member feature leakage. |
| Vendor/operative | Assigned work/visits, shared evidence, quote/invoice submission and own supplier context. Cannot self-approve spend or certify management closure. |
| Platform admin | Separate service console and audited, scoped support access; not another customer owner. |

For each action define read/create/edit/assign/submit/approve/publish/export/revoke where relevant, ownership, field redaction, audience and delegation ceiling. Define effective permissions for multiple roles and context switching; no accidental union of unrelated company records. Cover direct links, API, search, files, subscriptions, exports and Orb tools. Require negative tests for each sensitive boundary. Exact approval thresholds remain business configuration, not assumed values.

## OG-REV-004 — Navigation inventory

Preserve desktop left navigation and tablet/iPad/mobile bottom navigation including tablet landscape. The existing role destination map remains the starting point. Produce a route/screen inventory covering all four journeys, limited PT/rental coach contexts, platform admin, login/recovery and holding states. Include Documents, coaching, finance/approvals and landing-page management explicitly in the appropriate company/gym navigation; these were described but absent from the short gym-module list. Do not force every module into the bottom bar: use the existing More/contextual tools pattern.

The shared Home/Dashboard exposes Overview, Calendar and Feed where permitted. Global Feed links and dashboard Feed tabs must lead to the same audience-filtered content. Contextual Details/Activity/Records tabs are separate from global navigation. Document empty, loading, denied, archived and missing-target states and return routes preserving filters/drafts. Staff scan action, member QR action, profile/settings/sign-out and gym switching must remain discoverable at each device size.

## OG-REV-005 — Notification matrix

Prepare event → recipient/audience → permitted channel → deep link → read/acknowledgement → retry/escalation rules. Cover invitations/recovery, onboarding follow-up/activation, payment failures, booking/waitlist/cancellation, class changes, rota/cover, task assignment/due/completion/approval, contractor quote/invoice, credential expiry, @mentions/replies and feedback follow-up. Deduplicate event deliveries and recheck current access; emails/push messages must not expose private health/HR information.

Personal notification settings are separate from communication marketing preferences and required in-app account state. Exact reminder intervals, escalations and channels must be explicit configurable choices, with sender/provider capability verified. Do not silently assume push, SMS or email is configured. Read status is not consent, acceptance or approval.
