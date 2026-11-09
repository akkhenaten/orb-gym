# OpenKBS build-planning brief — Orb Gym 0.23

This repository is the product and frontend baseline. First store/read it in the actual target project without replacing unrelated implementation or target instructions. Do not build or configure live services merely because this file exists. Use the two staged prompts in prompts/; stage2 requests implementation planning and backlog cards only. Founder authorisation for actual implementation remains separate.

Read README.md and AGENTS.md, then docs/product-architecture.md, source extensions, operational decisions, setup contracts, journeys/workflows and applicable specs. Read docs/design/frontend-ui-specification.md with screen/component/token/asset/motion catalogues. Source product behaviour wins over a layout illustration. Proposed design measurements are explicit receiving-stage validation work; do not invent business policy.

Inspect the real framework, auth, tenant isolation, protected storage, email, payment, background jobs, board capabilities and deployment constraints. Prepare the detailed technical implementation plan and capability matrix. Bind every applicable source requirement -> feature/workflow -> screen/action/state/component/token -> permission/data/API -> acceptance -> actual delivery card/evidence. Initial workflow-screen mappings are domain-level starting bindings, not completed field-level enforcement. Refine specialist routes/forms and nonvisual services in planning without dropping exception paths.

Build the dependency graph before assigning global card prefixes00,01,02…; preserve actual board IDs separately. Include parent and child cards in the same sequence; no module reset. There is no prescribed card count. Plan shared identity/tenant/grants/readiness, tokenised shell and shared components before dependent workflows; sequence vertical slices with real error/recovery paths, integrations and verification. Follow docs/delivery-priorities.md and docs/board-card-contract.md for full rules.

Required outputs remain in docs/delivery/: implementation-plan.md, requirements-coverage.csv, decision-log.md, card-index.md, platform-capability-matrix.md, access-matrix.md, screen-and-notification-matrix.md, design-token-map.md, report-catalogue.md, verification-plan.md and workflow-coverage.csv. Screen matrix must bind actual routes and action/field permissions to SCR IDs and all relevant workflow variants. Record gaps and dependency owners rather than marking documentation as implementation.

For each eventual build slice specify inputs, scope, exclusions, existing components, unresolved policy/provider dependencies, meaningful acceptance scenarios and evidence. Done requires actual permitted/denied, asynchronous failure, concurrency where material, role/device/theme/input and recovery checks. Rendered screenshots alone cannot prove permissions, payments, QR admission, stock correctness or workflow completion. Do not create prepaid PT bundles; do not flatten rental coach rights into employed staff access. Preserve exact footer and approved assets.


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
