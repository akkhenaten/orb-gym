# Feature Workflow Catalogue

Repository edition 0.22 · 7 November 2026. This is the source-backed feature/pipeline catalogue, supplementing the four role journeys and twenty feature briefs. It captures the defined product features as concrete operational workflows rather than navigation pages alone. The exact technical state enums, routes, APIs and configurable business values still require builder specification; no working implementation or executed acceptance is claimed.

Every catalogue workflow has a feature ID, actor/trigger, preconditions, ordered checkpoints, authoritative outcome/handoff, explicit exception and policy references. Common controls below apply to every workflow. A single feature may cross modules and a delivery card may cover several coherent workflows; neither requires an arbitrary one-card-per-feature rule.

## Reading and authority

Read [AGENTS](../../AGENTS.md), the [architecture](../product-architecture.md), relevant full [module sources](../modules/README.md), [decisions](../decisions-and-open-items.md) and [gaps](../planning-gap-register.md). Current founder directions govern. Workflow descriptions expose intended states/handoffs but do not approve unchosen prices, permissions, penalties, retention or provider behaviour. Words such as review/approve apply only when the source or configured policy requires that gate. No common status enum is imposed on every record.

Read cleaning/maintenance/admin first in TASK, full staff/HR/rota in STAFF, account/role administration in USER, and public-page management in LAND. The same records also appear in linked workflows: a membership application is not a second user account; a calendar event is not a duplicate class; a typed feed tab is not a copied invoice.

| Domain | Defined workflows | Detailed pipeline file |
|---|---:|---|
| Shared Tasks — Cleaning, Maintenance and Admin | 21 | [TASK](task.md) |
| Staff Management, HR and Rota | 16 | [STAFF](staff.md) |
| User Management, Accounts and Permissions | 11 | [USER](user.md) |
| Landing Pages and Public Content | 11 | [LAND](land.md) |
| Workspace, Gym Portfolio and Platform Administration | 5 | [SPACE](space.md) |
| Membership, Joining and Retention | 9 | [MEM](mem.md) |
| Classes, Courses, Bookings and Attendance | 8 | [CLASS](class.md) |
| Coaches, Rental Arrangements and Hourly PT | 7 | [COACH](coach.md) |
| Reception, QR Access and Occupancy | 4 | [ENTRY](entry.md) |
| POS, Till, Inventory and Receipts | 9 | [POS](pos.md) |
| Community, Queries, Feedback and Case Work | 5 | [FEED](feed.md) |
| Documents, Templates and Signed/Issued Records | 4 | [DOC](doc.md) |
| Finance, Analytics and Reports | 5 | [FIN](fin.md) |
| Calendar, Dashboard and Notifications | 4 | [CAL](cal.md) |
| Selectable UI, Branding and Responsive Experience | 4 | [DESIGN](design.md) |
| Orb Assistant and Background Insights | 3 | [AI](ai.md) |
| Reliability, Data Lifecycle and Release | 4 | [RELEASE](release.md) |
| Trial and Guest Visits | 4 | [TRIAL](trial.md) |
| Junior Members and Guardian Relationships | 6 | [JUNIOR](junior.md) |
| Controlled Import and Existing-Gym Onboarding | 5 | [IMPORT](import.md) |
| Privileged Authentication and Recovery | 4 | [AUTH](auth.md) |

## Common workflow contract

Every workflow must retain: explicit workspace/gym and actor scope; originating record/form/version; allowed action and prerequisites; state before/after; expected version/idempotent operation where consequential; source-owning records and downstream projections; next owner and required notification; attachment/audience rules; audit actor/time/reason; cancellation/correction/reopen/retry outcome. Shared fields are an inherited contract, not independent duplicate data in every module.

Details/Activity/Records or specialised form views must describe the same record. Typed requests, decisions, quotes, invoices and attachments keep their own identities. Read/delivery/notification, submission, approval, verification, payment and closure are different events. Financial/health/HR decisions never arise from unstructured notes or AI interpretation.

For the actual build, expand each workflow into a state-transition table: checkpoint | actor/action | preconditions | command | old/new state | persisted record/event | visible response | recipient/next owner | failure/retry | policy decision | acceptance/evidence. Use source-specific fields and states; do not hide missing behaviour in a generic Save button.

## Common acceptance for every workflow

- Success: run the stated journey and confirm the authoritative outcome and linked consumers agree.
- Denied path: unauthorised company/gym/role/field/action is rejected across direct links, APIs, files, exports, AI and subscriptions as relevant.
- Exception path: exercise the named failure/return/block/expiry/cancellation branch and preserve truthful state plus an accountable next step.
- Retry/concurrency: consequential duplicate or stale actions cannot create duplicate charges/stock/places/visits/jobs/approvals; resolve conflicts without overwriting newer history.
- Evidence: required notes/photos/files/decisions retain the correct task/person/transaction and audience; corrections do not rewrite issued/signed history.
- Notifications: recipient/channel/link/retry are specified, preference and current grants applied, with read/acknowledgement/action separate. If no notification applies, document that disposition.
- UI: allowed actions exist in the relevant role/device surface, preserve drafts/context, use design tokens and the exact footer. Desktop left nav, tablet/iPad/mobile bottom.
- Verification: use synthetic data and record actual outcomes/evidence only after execution; these documents are planned requirements.

## Coverage and delivery

This edition defines **149 workflows for 134 feature-register entries across 21 domains**. [catalogue.json](catalogue.json) is the structured form; [feature register](feature-register.json) maps each declared feature to its workflow/spec/source; [coverage contract](../delivery/workflow-coverage.md) defines receiving-builder completion. The 242 original OG-SRC blocks and 11 review units remain preserved separately. Source-block indexing is not proof every compound paragraph has been decomposed into atomic requirements.

The builder must check every atomic source requirement against this catalogue, add any missing subworkflow without renumbering existing workflow IDs, and link real numbered delivery cards plus local acceptance. Context/example/open-policy blocks need explicit dispositions. Workflows do not reduce the agreed scope, invent a first-release boundary or authorise implementation.

## Operational gap review

Read the [gap findings](../reviews/operational-gap-review-0.21.md), [current specified operational rules](../decisions/operational-decisions.md) and [completed feature-option routing](../proposals/feature-options.md). In edition 0.21, fifteen exception subflows extended the original 115 features and the four proposals were excluded. Edition 0.22 includes their newly specified capabilities as described below, with required tenant setup.

## Completed capability and policy design — 0.22

The four former proposals are now specified optional/configurable capabilities under [OG-EXT-001–004](../source-extension-register.md); trials/junior offers stay disabled until their [readiness gates](../setup-and-readiness.md) pass. [DEC-GR-01–07](../decisions/operational-decisions.md) now supply concrete product routing/guard defaults; company values still require setup. Original source and feature IDs are retained. This edition has 134 primary workflows/features plus fifteen exception subflows; no actual cards or implementation evidence are invented.
