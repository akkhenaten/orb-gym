# Documentation Index

Repository edition 0.22 · 7 November 2026. Active architecture source 0.17, reviewed r2. The complete detailed source is retained; repository organisation adds explicit root instructions, journeys, feature specification briefs and source mapping. No implementation or runtime readiness is implied.

## Authority and current state

Read [root AGENTS](../AGENTS.md), [implementation status](implementation-status.md), [settled decisions](decisions-and-open-items.md), [planning gaps](planning-gap-register.md) and [change log](../CHANGELOG.md). Explicit founder decisions override superseded source wording. Open choices, examples and proposed mappings remain distinct. Original architecture/register snapshots are in history/ at repository root; the immutable prior handoff ZIP is in baselines/. Those old prompts/paths never override active repository instructions.

## Complete product sources

- [Product architecture](product-architecture.md) — all retained product behaviour, data and cross-module contracts.
- [Source register](source-requirement-register.md) — 242 stable source blocks; decompose into atomic requirements during planning.
- [Detailed modules](modules/README.md) — sixteen populated briefs, including all non-intro source blocks plus review detail.
- [Conversation scope checklist](conversation-scope-checklist.md) — the founder's features and reviewed disposition.
- [Four journeys](journeys/README.md) — owner, staff/coaches, member/PT-only and contractor paths.
- [Feature specification briefs](../spec/README.md) — twenty bounded product-backed specifications to complete technically.
- [Data/integration boundaries](data-and-integrations.md) and [configuration inventory](configuration-inventory.md).

## Design, branding and evidence

- [Design index](design/README.md), [branding/settings](design/branding-and-settings.md) and [token contract](design-and-token-deliverables.md).
- [Original logo](../assets/orb-gym-logo.png) and [asset guidance](../assets/README.md).
- [Review report](review-report.md), [historical review evidence](audit-evidence.json) and [platform evidence/gates](platform-evidence-and-delivery-gates.md). Historical verification counts describe their named editions, not a built app.
- [Acceptance criteria](acceptance-scenarios.md) and [future app test strategy](../tests/README.md).

## Delivery and builder handoff

- [Priorities](delivery-priorities.md) and [board-card contract](board-card-contract.md): one global sequence 00, 01, 02… in dependency order.
- [Active delivery workspace](delivery/README.md), [card template](delivery/card-template.md), [card index](delivery/card-index.md) and [source map](delivery/source-map.json).
- [Ingestion prompt](../prompts/01-store-and-audit.md), then [planning/card prompt](../prompts/02-plan-and-create-delivery-cards.md), issued separately.

Source map coverage is block-level only: the builder must produce atomic requirements, actual numbered cards, technical implementation plan and all matrices/catalogues. No app code/provider selection/real data or actual board IDs are invented in this repository.

## Assembly checks

See [complete inventory](repository-inventory.md), [assembly verification](repository-validation.md) and [machine-readable verification](repository-validation.json). The root repository-manifest.json checks file hashes. These are documentation checks, not passing application tests.

## Review of journeys and architecture — edition 0.19

Read the [review findings](reviews/repository-review-0.19.md), [journey/module trace](journey-architecture-trace.md), [exception handoffs](journey-exceptions-and-handoffs.md) and the explicit [reception/entry/exit brief](../spec/reception-entry-exit.md). All original source categories remain; these additions make cross-module implementation responsibilities harder to overlook.

## Complete feature workflow catalogue

Start with [workflow index](workflows/README.md), [completeness review](workflows/completeness-review.md), [feature register](workflows/feature-register.json) and [coverage contract](delivery/workflow-coverage.md). TASK, STAFF, USER and LAND provide the requested detailed operational pipelines; thirteen further domain files cover connected modules. These supplement the four role journeys and full original sources.

## Operational gap review — 0.21

Read [findings/corrections](reviews/operational-gap-review-0.21.md), [operational decisions](decisions/operational-decisions.md) and [optional feature proposals](proposals/feature-options.md). Existing feature IDs are preserved; added subflows close cross-module exception handoffs without inflating approved scope.

## Current gap-fill baseline — 0.22

Read [resolution status](gap-resolution-status.md), [source extensions](source-extension-register.md), [company setup gates](setup-and-readiness.md), [policy field inventory](policy-settings-contract.json) and [current operational rules](decisions/operational-decisions.md). Four new module/spec/workflow sets add optional/configurable trials, juniors, imports and stronger privileged auth. The current totals are sixteen module briefs, twenty feature specifications, 134 declared features, 149 workflows, twenty-one domains and ninety planned acceptance cases. Older review totals/statuses are historical evidence.

The current [data/permission/reporting extension](data-extension-contracts.md) specifies trial grants, dependent/guardian relationships, import provenance, auth assurance, readiness ownership and beneficiary-versus-payer reporting.


## Frontend blueprint addition — repository 0.23

Read the [frontend master](design/frontend-ui-specification.md). The new screen/action inventory, shared components, ten proposed resolved preset/mode mappings, asset/motion catalogues and annotated wireframes extend the 0.22 product baseline. They do not implement the app or prove interactive/accessibility checks. Existing product policies and source IDs are preserved; new visual measurements require receiving-stage verification.


## Current granular access clarification — 0.25

Read the [access model](access/access-model.md) and its source clarification, role/action/field catalogues, individual allow/deny policy, editable template matrix and planned access scenarios. Admin means platform admin; owner covers all own-company gyms, senior management covers assigned multiple gyms and local management is gym-specific. Owner/platform admin can grant by role/user type and individual. Explicit scoped individual deny prevails over a matching role allow. Earlier company administrator wording means delegated company management, never platform privilege. Existing business, privacy, self-approval and authentication guards remain. The detailed product permission contract is specified; actual schema/command bindings, configured tenant roles and enforcement evidence remain builder work.


## Notification and escalation contract — 0.26

Read the [current notification contract](notifications/notification-contract.md) and canonical event catalogue, generated CSV, policy settings, safe templates and planned acceptance checks. Resolve exact event recipients/source transitions and stop conditions in OpenKBS planning. Owner/company and platform-admin scope follows the current docs/access contract, superseding old generic company-admin wording. No arbitrary reminder intervals or unsupported channels are approved. Personal preferences do not erase required source actions; delivered/read/acknowledged/completed remain distinct. No live delivery is configured or authorised by this file.


## Dashboard and reporting definitions — 0.27

Use the [metric/reporting contract](reporting/metric-contract.md) with canonical metric/report catalogues, source maps, setup inputs, synthetic worked reconciliation and planned acceptance. Figures and Orb use identical definitions and scope. Charges/credits/collections/refunds/reversals/allocations/costs are separate. Overlapping gym membership rows cannot be summed as company distinct people. Missing costs/basis are unavailable/incomplete, not zero/profit. Old generic report-catalogue-to-be-prepared wording now means OpenKBS maps the supplied product catalogue to actual schema/providers/queries and verifies it; do not replace settled definitions silently.


## Shared records and lifecycle contract — 0.28

Read the [current shared model](data/lifecycle-contract.md) and its ENT/REL/SM/TR catalogues, workflow-record map, typed field/command contracts, transition CSV and planned acceptance. This supplies logical record/state/guard/effect/recovery design; OpenKBS must map actual schema/provider status/API/concurrency and evidence. Independent account/employment/membership/payment/entitlement/booking/attendance/task/asset/invoice/publication states cannot be collapsed. No arbitrary status editor or guessed business input is authorised. Original source extracts remain retained.


## Document and form catalogue — 0.29

Use the [current document contract](documents/document-contract.md) with DCT type catalogue, typed fields, declarative layouts, content-readiness gates and planned acceptance. Upload/form/acknowledgement/signature/issued financial snapshot remain distinct. Company-reviewed legal/health/safety wording and actual original documents remain required inputs; placeholders do not become approved content. Owning source commands control issue/sign/review/payment, and historical issued/signed data/brand versions stay frozen.


## Current setup and handoff — 0.30

Start with CURRENT_BASELINE.md at repository root and the current BUILD_BRIEF.md. The [setup hub](setup/setup-hub.md) combines resumable scoped sections, responsibility delegation, capability-specific current gates and new-gym inheritance. Optional/missing setup does not create a global block or bypass source requirements. Remaining inputs and actual OpenKBS evidence are enumerated in docs/delivery/remaining-inputs.csv and the current handoff audit. Current brief is planning/cards only, not build/deployment authority.
