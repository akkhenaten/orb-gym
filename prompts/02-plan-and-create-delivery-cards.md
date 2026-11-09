# Prompt 2 — Prepare implementation plan and delivery board

Use this Orb Gym repository at its root. Read AGENTS.md and docs/README.md. Repository edition 0.22 is the active layout; docs/baselines/ holds historical provenance, not active packaging instructions. Read all active baseline files before planning, including review-report.md and review additions. History is provenance only. Our delivery priorities and architecture are constraints; you must prepare the detailed technical implementation plan from your knowledge of this actual project and current OpenKBS capabilities.

You are authorised to inspect the project, author specifications/plans and create delivery backlog cards. You are not yet authorised to implement application code or deploy. Avoid any automatic Spec/Plan approval action that triggers building. Report if the platform cannot separate these stages.

## Inspect first
Inspect actual files, configuration, runtime, existing data schema, auth, integrations, tests and deployment setup without exposing secrets. Inspect the board's real columns, card types and existing cards using supported OpenKBS capabilities/current docs. Reuse matching cards and create explicit dependency links without duplicates. Do not invent CLI commands or card IDs.

## Decompose and plan
Apply docs/delivery-priorities.md and docs/board-card-contract.md within the baseline. Create a dependency-led implementation plan covering all OG-SRC, OG-REV and OG-EXT source requirements, all four journeys, platform admin, coach/PT subjourneys and all five design presets. Stage delivery without silently dropping later scope.

For every planned capability specify current state, target behaviour, affected modules, data entities/relations, scope enforcement, state transitions, cross-module events, provider boundaries, migrations, audit, failure/retry/reversal, verification and acceptance evidence. Separate ordinary configurable business policies from decisions that genuinely block safe implementation.

Use actual platform findings to recommend architecture and integrations. Explain unsupported capabilities and alternatives. Flag unresolved choices with a recommendation, consequence and exact blocking cards. Do not guess credentials, payment terms, coach rates, retention periods or real business data.

## Save outputs
Write these implementation artifacts at project root, in the active repository, preserving previous versions/change history:
- docs/delivery/implementation-plan.md — dependencies, phases, complete scope, technical decisions, integration and verification strategy, assumptions, blockers and release criteria.
- docs/delivery/requirements-coverage.csv — atomic requirement ID, source block ID, source path/section, source status, requirement, journey, module, phase, delivery sequence number, card ID, specification path, acceptance IDs, status and decision ID. Quote/escape CSV fields correctly. Every source block needs a disposition including open decision, context or superseded wording; do not pretend each block is one requirement.
- docs/delivery/decision-log.md — settled directions, actual findings, recommendations and unresolved choices.
- docs/delivery/card-index.md — delivery sequence numbers, real card IDs, card kinds, titles, priorities, parent/child/dependency links, specification paths and state.
- docs/delivery/platform-capability-matrix.md — actual project findings and provider/device feasibility, evidence, limits, dependencies and costs.
- docs/delivery/access-matrix.md — role/action/record/field permissions, multi-role rules and negative checks.
- docs/delivery/screen-and-notification-matrix.md — all role/device routes/states and event/recipient/channel/deep-link rules.
- docs/delivery/design-token-map.md — complete preset/component/mode token definitions and resolved or explicitly pending values/assets.
- docs/delivery/report-catalogue.md — metric definitions, sources, scope, time basis, freshness and missing-data rules.
- docs/delivery/verification-plan.md — end-to-end acceptance, permission negatives, retry/concurrency, responsive UI, accessibility and recovery checks.
- spec/orb-gym/<bounded-feature>.md — detailed specifications linked by cards.

## Create board cards
Follow OG-REV-011 in docs/board-card-contract.md: every delivery parent/child card must have a unique numbered title, starting 00, 01, 02, in dependency-led logical order. Prepare the complete ordered queue before creating cards; preserve actual board IDs.
Create delivery parent cards and bounded, actionable child cards for the complete scope. Each card must follow the baseline card contract: goal, source IDs/file paths, scope/exclusions, project findings, spec/plan links, affected data/access, dependencies, migration/recovery requirements, acceptance criteria and required evidence. Link dependencies through actual board relationships when supported; otherwise record explicit IDs and blockers in card content.

Use an existing backlog-equivalent column for newly created delivery cards; nothing becomes In Progress or Done merely because it was planned. Preserve existing card states and record existing verified capability/delta work. Do not flatten the entire product into a handful of vague module cards or create redundant cards for the duplicated module extracts. Do not choose an arbitrary card count.

## Reconcile before reporting
Check every atomic requirement has a card or a reasoned disposition. Check every card has source scope, verification and correct dependency order; verify coverage of owner/staff/member/vendor, platform admin, tenancy, navigation, tokens/white label, documents/public pages, coaches/classes/PT, membership/payments, HR/rota, attendance, POS/stock, task hierarchy/facilities/contractors, feed/cases, analytics/calendar and AI.

Finish with actual saved paths, board/card counts, coverage results, unresolved decisions and recommended first delivery batch. State clearly that no application build/deployment has been performed. Pause for plan review before implementation.



## Current product baseline and gap completion

Repository 0.22 contains sixteen module briefs, twenty feature specs, 134 features and 149 primary/exception workflows across twenty-one domains. Read source-extension-register.md, gap-resolution-status.md, setup-and-readiness.md, policy-settings-contract.json and current decisions/operational-decisions.md inside docs/. DEC-GR-01–07 routes/defaults are specified; exact tenant values/reviewed content are required setup, and actual provider/runtime support still needs inspection. Earlier proposals are historical. Complete the specified optional trials/juniors, imports and privileged-auth capabilities without inventing activation data or automatically changing live accounts/services.

Use docs/delivery/source-map.json and extension-source-map.json together. Decompose compound source/extension requirements. Save workflow-coverage.csv mapping every FEAT/WF through atomic/source IDs, state/action/guard, receiving spec, actual sequence/board IDs, local acceptance, decisions/configuration and evidence. Verify coverage in both directions and show context/supersession dispositions. Use readiness failures as explicit blocked configuration/feasibility work; do not silently drop capability scope or confuse it with a required public activation.

All new parent/child delivery cards must be uniquely titled 00 — outcome, 01 — outcome, 02 — outcome and onward in one global dependency-led order. Follow OG-REV-011 for actual ID stability, parent rollups, board sort verification and later aliases. Derive count/scope from actual work, not a forced card for every feature. New cards remain Backlog; preserve unrelated/existing states. Return saved paths, coverage, missing real inputs, first delivery batch and plan for review. Do not build/deploy or run live onboarding/payment/provider actions.


Repository0.23 also requires BUILD_BRIEF.md and docs/design/frontend-ui-specification.md with its catalogues. Bind SCR/CMP IDs and workflow action variants into actual route/field permission and card planning. Treat completed token measurements as proposed implementation baselines, not business rules or evidence of a built frontend.


## Dashboard comparison references — 0.24

Use the [five dashboard concepts](../assets/ui-dashboard-comparisons/README.md) to compare the same owner surface across Basic01, Flat02, Editorial03, Glass04 and Console05. Basic01 remains default; all five are company-selectable. Images are visual references; written rules, tokens and supplied master artwork govern generated deviations. The folder README lists known differences. Both modes and responsive behaviour still require implementation verification.


## Current granular access clarification — 0.25

Read the [access model](../docs/access/access-model.md) and its source clarification, role/action/field catalogues, individual allow/deny policy, editable template matrix and planned access scenarios. Admin means platform admin; owner covers all own-company gyms, senior management covers assigned multiple gyms and local management is gym-specific. Owner/platform admin can grant by role/user type and individual. Explicit scoped individual deny prevails over a matching role allow. Earlier company administrator wording means delegated company management, never platform privilege. Existing business, privacy, self-approval and authentication guards remain. The detailed product permission contract is specified; actual schema/command bindings, configured tenant roles and enforcement evidence remain builder work.


## Notification and escalation contract — 0.26

Read the [current notification contract](../docs/notifications/notification-contract.md) and canonical event catalogue, generated CSV, policy settings, safe templates and planned acceptance checks. Resolve exact event recipients/source transitions and stop conditions in OpenKBS planning. Owner/company and platform-admin scope follows the current docs/access contract, superseding old generic company-admin wording. No arbitrary reminder intervals or unsupported channels are approved. Personal preferences do not erase required source actions; delivered/read/acknowledged/completed remain distinct. No live delivery is configured or authorised by this file.


## Dashboard and reporting definitions — 0.27

Use the [metric/reporting contract](../docs/reporting/metric-contract.md) with canonical metric/report catalogues, source maps, setup inputs, synthetic worked reconciliation and planned acceptance. Figures and Orb use identical definitions and scope. Charges/credits/collections/refunds/reversals/allocations/costs are separate. Overlapping gym membership rows cannot be summed as company distinct people. Missing costs/basis are unavailable/incomplete, not zero/profit. Old generic report-catalogue-to-be-prepared wording now means OpenKBS maps the supplied product catalogue to actual schema/providers/queries and verifies it; do not replace settled definitions silently.


## Shared records and lifecycle contract — 0.28

Read the [current shared model](../docs/data/lifecycle-contract.md) and its ENT/REL/SM/TR catalogues, workflow-record map, typed field/command contracts, transition CSV and planned acceptance. This supplies logical record/state/guard/effect/recovery design; OpenKBS must map actual schema/provider status/API/concurrency and evidence. Independent account/employment/membership/payment/entitlement/booking/attendance/task/asset/invoice/publication states cannot be collapsed. No arbitrary status editor or guessed business input is authorised. Original source extracts remain retained.


## Document and form catalogue — 0.29

Use the [current document contract](../docs/documents/document-contract.md) with DCT type catalogue, typed fields, declarative layouts, content-readiness gates and planned acceptance. Upload/form/acknowledgement/signature/issued financial snapshot remain distinct. Company-reviewed legal/health/safety wording and actual original documents remain required inputs; placeholders do not become approved content. Owning source commands control issue/sign/review/payment, and historical issued/signed data/brand versions stay frozen.


## Current setup and handoff — 0.30

Start with CURRENT_BASELINE.md at repository root and the current BUILD_BRIEF.md. The [setup hub](../docs/setup/setup-hub.md) combines resumable scoped sections, responsibility delegation, capability-specific current gates and new-gym inheritance. Optional/missing setup does not create a global block or bypass source requirements. Remaining inputs and actual OpenKBS evidence are enumerated in docs/delivery/remaining-inputs.csv and the current handoff audit. Current brief is planning/cards only, not build/deployment authority.
