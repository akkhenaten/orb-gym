# Orb Gym — Repository Instructions for AI Builders

## Purpose and current authority

> **Superseded in part, 9 November 2026: read [HANDOVER.md](HANDOVER.md) first.** The owner has authorised
> implementing one complete working application in `app/`. Deployment, live providers, real messages or
> payments, and business-policy changes remain unauthorised. The paragraph below is the 0.35 authority and
> is retained for provenance.

Work on Orb Gym, a multi-company workspace platform for owners with multiple gyms. The current handoff authorises documentation ingestion, project inspection, detailed planning/specifications and delivery backlog cards. Do not implement app code, configure live services, send invitations, migrate data, charge/refund payments or deploy until the user authorises the appropriate implementation scope. Creating this repository is not that authorisation.

Read CURRENT_BASELINE.md, BUILD_BRIEF.md, README.md, docs/README.md, docs/decisions-and-open-items.md, docs/implementation-status.md and docs/planning-gap-register.md first. Read the full architecture during initial planning; then read each relevant spec and detailed module before its card. Read docs/board-card-contract.md and docs/delivery-priorities.md before planning delivery. Reading a prompt file does not issue it. Existing project/user instructions take precedence where applicable; report a material source conflict without silently changing policy.

Authority order: current explicit founder instructions; settled decision record and documented corrections; active product architecture and source-linked review additions; feature briefs; builder-authored technical recommendations. A proposed value, example calculation or unresolved decision is not approved business policy. history/ and docs/baselines/ are provenance only. Preserve source IDs and version history. The architecture source is 0.17, reviewed handoff r2; repository edition is 0.35. Do not mark implementation verified based on documentation.

## Product invariants

- One workspace owns multiple gyms. Tenant/gym/action/field scope applies to APIs, search, files, events, exports and AI, not only navigation. Platform support is a separate audited boundary.
- Four customer journeys: owner/admin/management, assigned staff, member (including limited trial and guardian/dependent contexts) and vendor/contractor. Rental and employed coaches have separate scope; pending/PT-only users have limited access. Identity, membership, employment, assignment and payment states remain distinct.
- Company Settings owns style/brand/logo/colours and white-label activation; permitted gym overrides inherit. Five full presets, tokens from the start, all role surfaces and light/dark modes. Basic 01 is default. Documents is the template composer, not a second brand authority.
- Keep the exact page footer: Orb Gym - powered by orbsolutions.co.uk. Keep the AI name Orb and use the approved company icon only under the established branding rule.
- Desktop left nav; iPad/tablet/mobile bottom nav including tablet landscape. Preserve context/drafts and provide all permitted modules through scoped navigation.
- Cleaning/maintenance/admin use one shared task engine with distinct grouping, hierarchy and dependencies. Typed feed records power tabs; notes never imply financial approval. Member/vendor/private audiences stay separated.
- Hourly employed-coach PT, defaults/per-coach rates, PT-only signup/pass and same-account membership upgrade are included. Prepaid PT packages/bundles are excluded. Rental coach rent, customer prices, wages and internal earnings allocation are separate records.
- No mock, attractive screen, uploaded payment proof, DD mandate or provider toggle proves a working paid/approved workflow. Preserve issued/signed document snapshots.

## Delivery cards and traceability

Apply OG-REV-011 in docs/board-card-contract.md. Every parent/child delivery card has a unique global prefix 00, 01, 02…; no per-module restarts. Build the dependency graph before numbering. Prerequisites come first; parentage is a rollup rather than a blocker for the parent's own children. Validate cycles and numeric display order. Use actual returned OpenKBS IDs alongside sequence numbers. Preserve unrelated work and existing card states. New planning cards remain Backlog. Later reordering follows the documented alias/change rules.

Map all 242 OG-SRC source blocks, 11 OG-REV requirements and 5 OG-EXT source extensions. docs/delivery/source-map.json is an initial source-block-to-spec index, not an atomic coverage claim. Decompose compound paragraphs, retain context/supersession dispositions, link acceptance criteria and record affected decisions. Every card links its spec, scope, findings, data/access, prerequisites, decision blockers and evidence required. Do not choose an arbitrary card count or silently drop phased work.

## Implementation conduct after authorisation

Inspect the real framework and capabilities before technical choices. Keep shared domain boundaries from app/README.md; do not introduce a framework or independent microservices merely because a folder exists. All theme-dependent UI uses the agreed token contract. Recheck permissions on consequential commands and background work. Use idempotent effects, explicit pending/failure states, version checks and auditable corrections for money/bookings/stock/access.

Use synthetic records in development. Never commit credentials, real PAR-Q/HR/payslip files, private uploads, signed URLs or production data. Company brand uploads are workspace records in private storage with controlled approved derivatives, not Git commits. No live sender/domain/payment setup during planning. The project must prove its mail/recovery/invite integration before real onboarding.

Keep requirements, technical proposals and executed evidence distinct. If a rule affects commercial, safety, privacy, approval or release behaviour and is unresolved, document a recommendation plus blocked cards; continue independent work. Do not invent rates, thresholds, retention periods, policies or legal/clinical compliance.

## Verification and maintenance

Run python3 scripts/validate_repository.py for documentation changes. Once code exists, document and run meaningful feature/permission/failure/concurrency/responsive checks appropriate to the change. Record actual commands/results and limitations; do not fabricate passing tests. Definition of Ready/Done is in docs/platform-evidence-and-delivery-gates.md.

Update the affected architecture/module/spec, decisions, source mappings, card index, tests and CHANGELOG when authorised changes alter behaviour. Do not duplicate an authoritative rule in contradictory documents. Keep old source history immutable. Complete review evidence before marking a delivery card Done; build, deployment and release status are separate.

## Current gap-fill baseline 0.22

Read docs/source-extension-register.md, docs/gap-resolution-status.md, docs/setup-and-readiness.md, docs/policy-settings-contract.json and docs/decisions/operational-decisions.md. Current operational routes/defaults are DESIGN_SPECIFIED. Exact tenant values/content and actual provider evidence are SETUP_REQUIRED. Older review proposals are history; do not omit the newly specified capability because an old review called it proposed. Conversely, no arbitrary rate, age, legal/safety wording or production configuration is approved by inclusion in a workflow.

There are sixteen detailed module briefs, twenty feature specifications, 134 declared features, 149 primary/exception workflows across twenty-one domains and ninety planned acceptance cases. Trials/junior offerings are optional company capabilities, disabled until required setup is complete. Imports are controlled staging/dry-run/review/commit and never auto-activate or mass-message. Owner/platform-admin privileged production access requires actual supported MFA/recovery verification. Platform controls cannot be silently weakened by a company theme or role setting.

Use docs/journey-architecture-trace.md, docs/journey-exceptions-and-handoffs.md and docs/workflows/README.md. Every feature retains its FEAT/WF/source IDs, actor, preconditions, checkpoints/states, exception/denied/failure paths, owning records, next owner/notification, evidence/audit and acceptance. Reception/entry/exit is distinct from class attendance; trial/guardian rights and imported records cannot bypass ordinary gates. No screen/module card alone proves a working journey.

Use docs/delivery/source-map.json plus docs/delivery/extension-source-map.json. Complete atomic requirements and map them through specs/workflows to actual numbered delivery cards and evidence. Save workflow-coverage.csv; retain many-to-many links and stable actual platform IDs beside the global 00, 01, 02… sequence. Preserve missing runtime/tenant inputs as explicit blocked work, not guessed values or silently dropped scope.

Historical reviews accurately describe earlier states but cannot override current source extensions. If current material authority remains genuinely unclear, expose the exact conflict and complete independent planning. No GitHub/OpenKBS target or runtime was verified by creating this repository. Application implementation inside this repository is authorised as of 9 November 2026 (see HANDOVER.md); deployment is not.


## Frontend blueprint addition — repository 0.23

Read the [frontend master](docs/design/frontend-ui-specification.md). The new screen/action inventory, shared components, ten proposed resolved preset/mode mappings, asset/motion catalogues and annotated wireframes extend the 0.22 product baseline. They do not implement the app or prove interactive/accessibility checks. Existing product policies and source IDs are preserved; new visual measurements require receiving-stage verification.


Repository0.24 adds assets/ui-dashboard-comparisons/README.md and five current dashboard concepts. Treat them as comparison references with recorded deviations, not business authority or replacements for original supplied artwork.


## Current granular access clarification — 0.25

Read the [access model](docs/access/access-model.md) and its source clarification, role/action/field catalogues, individual allow/deny policy, editable template matrix and planned access scenarios. Admin means platform admin; owner covers all own-company gyms, senior management covers assigned multiple gyms and local management is gym-specific. Owner/platform admin can grant by role/user type and individual. Explicit scoped individual deny prevails over a matching role allow. Earlier company administrator wording means delegated company management, never platform privilege. Existing business, privacy, self-approval and authentication guards remain. The detailed product permission contract is specified; actual schema/command bindings, configured tenant roles and enforcement evidence remain builder work.


Run python3 scripts/validate_access_contract.py alongside the existing repository/frontend validators. Use docs/access/source-map.json in addition to original and extension source maps. Do not count editable role templates as actual issued customer grants.


## Notification and escalation contract — 0.26

Read the [current notification contract](docs/notifications/notification-contract.md) and canonical event catalogue, generated CSV, policy settings, safe templates and planned acceptance checks. Resolve exact event recipients/source transitions and stop conditions in OpenKBS planning. Owner/company and platform-admin scope follows the current docs/access contract, superseding old generic company-admin wording. No arbitrary reminder intervals or unsupported channels are approved. Personal preferences do not erase required source actions; delivered/read/acknowledged/completed remain distinct. No live delivery is configured or authorised by this file.


Run python3 scripts/validate_notifications.py after communication-spec edits, alongside repository/frontend/access checks. Include docs/notifications/source-map.json in planning traceability. CSV is regenerated from event-catalogue.json. Values in policy-settings.json remain unconfigured; company/provider setup is required before automation.


## Dashboard and reporting definitions — 0.27

Use the [metric/reporting contract](docs/reporting/metric-contract.md) with canonical metric/report catalogues, source maps, setup inputs, synthetic worked reconciliation and planned acceptance. Figures and Orb use identical definitions and scope. Charges/credits/collections/refunds/reversals/allocations/costs are separate. Overlapping gym membership rows cannot be summed as company distinct people. Missing costs/basis are unavailable/incomplete, not zero/profit. Old generic report-catalogue-to-be-prepared wording now means OpenKBS maps the supplied product catalogue to actual schema/providers/queries and verifies it; do not replace settled definitions silently.


Run python3 scripts/validate_reporting.py with the existing documentation checks. Include docs/reporting/source-map.json in delivery traceability. New reporting catalogue is product-level; actual provider/status/schema/history/query mapping and financial evidence remain mandatory. Do not claim synthetic arithmetic as production verification.


## Shared records and lifecycle contract — 0.28

Read the [current shared model](docs/data/lifecycle-contract.md) and its ENT/REL/SM/TR catalogues, workflow-record map, typed field/command contracts, transition CSV and planned acceptance. This supplies logical record/state/guard/effect/recovery design; OpenKBS must map actual schema/provider status/API/concurrency and evidence. Independent account/employment/membership/payment/entitlement/booking/attendance/task/asset/invoice/publication states cannot be collapsed. No arbitrary status editor or guessed business input is authorised. Original source extracts remain retained.


Run python3 scripts/validate_data_contract.py with the existing five documentation validators. Use docs/data/source-map.json and workflow-record-map.json in card planning. UI read/health or booking rights cannot be reused as evidence-review/PT-delivery authority. All source state labels are logical mappings until actual provider/schema/API evidence exists.


## Document and form catalogue — 0.29

Use the [current document contract](docs/documents/document-contract.md) with DCT type catalogue, typed fields, declarative layouts, content-readiness gates and planned acceptance. Upload/form/acknowledgement/signature/issued financial snapshot remain distinct. Company-reviewed legal/health/safety wording and actual original documents remain required inputs; placeholders do not become approved content. Owning source commands control issue/sign/review/payment, and historical issued/signed data/brand versions stay frozen.


Run python3 scripts/validate_documents.py with the existing six documentation validators. Use docs/documents/source-map.json and DCT/field/layout IDs for source/card mapping. Do not let template placeholders or AI drafts satisfy reviewed legal/health content readiness. Verify actual rendering/signing/provider/file access during authorised implementation.


## Current setup and handoff — 0.30

Start with CURRENT_BASELINE.md at repository root and the current BUILD_BRIEF.md. The [setup hub](docs/setup/setup-hub.md) combines resumable scoped sections, responsibility delegation, capability-specific current gates and new-gym inheritance. Optional/missing setup does not create a global block or bypass source requirements. Remaining inputs and actual OpenKBS evidence are enumerated in docs/delivery/remaining-inputs.csv and the current handoff audit. Current brief is planning/cards only, not build/deployment authority.


Run python3 scripts/validate_setup_hub.py with the existing seven documentation validators. Include docs/setup/source-map.json, SET/CAP IDs and remaining-inputs.csv in actual delivery planning. Setup review/evidence is not a source business approval, provider proof or permission grant. Ready for technical planning does not mean ready for deployment.


Current error review: docs/reviews/error-review-0.31.md records eight corrected specification/validation groups. Transition count at that point: 217 (superseded; the current catalogue has 233); original WF/feature/source IDs remain stable. Refer to the corrected current catalogues, not old audit quantity summaries, for implementation.


Run scripts/validate_review_regressions.py with the other documentation checks. Use docs/reviews/error-review-0.31.md, error-review-acceptance.md and data/canonical-operations.json for corrected boundaries. Earlier successful structural reviews did not verify these semantic contracts; actual API/signature/access/concurrency evidence is still required.


Current second review: docs/reviews/error-review-0.32.md and docs/data/authorization-contract.md resolve remaining action/lifecycle ambiguities. Read these before interpreting older permission-index wording. Original source/feature/workflow IDs stay stable.


Run scripts/validate_authorization_contract.py with the other documentation checks; use docs/data/authorization-contract.md and docs/reviews/error-review-0.32.md before API binding. Any direct transition check using permission_id alone is incomplete. Actual scope/identity/provider/consent/business evidence must still be proven.


Current recovery-path review: docs/reviews/error-review-0.33.md and docs/data/recovery-path-contract.md. Use current 233-transition catalogue; prior review counts are historical. Preserve all earlier public/signature/typed-authority corrections. Read the new explicit service-restoration/transfer/late-delivery/credential paths before implementing recovery.


Run scripts/validate_recovery_paths.py with the other documentation checks. This verifies targeted recovery/outcome contract coverage, not only that state names exist. Actual stock/pass/provider/credential flows and negative/concurrent cases remain implementation evidence requirements.


Current actor/default-role review: docs/reviews/error-review-0.34.md and docs/access/role-journey-contract.md. Use narrow assigned start/limited fault reporting and actual source-scoped self-service; no task edit/HR escalation to make a default journey work. Existing authority/recovery/signature/source guards remain.

Run scripts/validate_role_journeys.py with all other validate_*.py checks. Verify the assigned-work, reporting, self-service and actor-specific booking journeys against real source permissions during implementation. Documentation checks do not prove runtime access.

Current appearance extension 0.35: docs/design/style-options.json, docs/design/appearance-settings-contract.json and docs/design/ui-direction-settings.md govern five selectable options. Flat02 and Glass04 retain IDs with expanded rules; Neumorphic06 is deferred and not selectable. Historical five comparison images are not a five-style limit. The five selectable presets are the original five; Neumorphic06 is recorded but deferred and is not selectable until a rendered reference exists. docs/design/style-options.json is authoritative. The preserved source blocks in docs/source-requirement-register.md and docs/modules/ state “all five presets”, which now agrees with this rule. Run scripts/validate_ui_styles.py alongside all other validators.
