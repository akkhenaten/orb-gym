# Delivery Workspace

This directory is the active location for OpenKBS planning outputs. The initial source-map.json indexes all source blocks/review requirements to the relevant existing module/spec. It is not an atomic coverage matrix, implementation plan or proof cards exist. card-index.md has no invented card records; card-template.md defines their required content.

## Required builder outputs

- implementation-plan.md: actual project findings, dependency-led phases/numbered queue, data/access/integration work, migrations/recovery, scope and release gates.
- requirements-coverage.csv: atomic requirements plus source dispositions, linked OG-SRC/OG-REV, status, module/journey, phase, sequence number, real card ID, spec, acceptance and decisions.
- decision-log.md: recommendations and exact blocked cards for GAP01–GAP16 and any material new finding; do not reopen settled choices.
- card-index.md: every actual numbered card, parent/child/prerequisites, status/evidence and change aliases.
- platform-capability-matrix.md: documented/project-configured/verified capabilities, provider/device limits, dependencies, evidence and costs.
- access-matrix.md: roles/actions/records/fields, delegation, multi-role scope and denied cases.
- screen-and-notification-matrix.md: routes/states/device/journey coverage and event/recipient/channel/link/acknowledgement/retry rules.
- design-token-map.md: complete definitions/bindings, mode/preset/component values and approved/pending status.
- report-catalogue.md: metric sources/definitions, time/currency basis, access, freshness and missing-data rules.
- verification-plan.md: local/cross-module acceptance, negatives, concurrency, integration, responsive/accessibility and recovery targets.

These files must contain inspected findings and recommendations, not fabricated completion claims. Populate them during authorised planning, maintain them during later implementation and link every delivery card to its relevant files.

## Feature and workflow mapping

Also produce workflow-coverage.csv using [workflow-coverage.md](workflow-coverage.md). Include every FEAT/WF ID, source/atomic IDs, step/state/action, receiving spec, actual global sequence/board ID, local/cross-module acceptance, unresolved decision and disposition/evidence. Reconcile atomic source coverage against the catalogue rather than treating all source paragraphs as one feature each.


Current 0.22 scope: map all 242 OG-SRC, eleven OG-REV and five OG-EXT units through the current twenty feature briefs and 149 workflows for 134 features. DEC-GR-01–07 now specify product routes/defaults; missing tenant values, reviewed content and real provider proof are readiness inputs, not automatic approval. Include extension-source-map.json alongside the original source map. workflow-coverage.csv must link each applicable source/feature/workflow and guard/exception to actual numbered cards and local/cross-module acceptance through AC90. Use source-extension-register.md, gap-resolution-status.md and setup-and-readiness.md before interpreting old review statuses. No live service, account, payment or deployment is authorised by planning files.


## Current granular access clarification — 0.25

Read the [access model](../access/access-model.md) and its source clarification, role/action/field catalogues, individual allow/deny policy, editable template matrix and planned access scenarios. Admin means platform admin; owner covers all own-company gyms, senior management covers assigned multiple gyms and local management is gym-specific. Owner/platform admin can grant by role/user type and individual. Explicit scoped individual deny prevails over a matching role allow. Earlier company administrator wording means delegated company management, never platform privilege. Existing business, privacy, self-approval and authentication guards remain. The detailed product permission contract is specified; actual schema/command bindings, configured tenant roles and enforcement evidence remain builder work.


## Notification and escalation contract — 0.26

Read the [current notification contract](../notifications/notification-contract.md) and canonical event catalogue, generated CSV, policy settings, safe templates and planned acceptance checks. Resolve exact event recipients/source transitions and stop conditions in OpenKBS planning. Owner/company and platform-admin scope follows the current docs/access contract, superseding old generic company-admin wording. No arbitrary reminder intervals or unsupported channels are approved. Personal preferences do not erase required source actions; delivered/read/acknowledged/completed remain distinct. No live delivery is configured or authorised by this file.


## Dashboard and reporting definitions — 0.27

Use the [metric/reporting contract](../reporting/metric-contract.md) with canonical metric/report catalogues, source maps, setup inputs, synthetic worked reconciliation and planned acceptance. Figures and Orb use identical definitions and scope. Charges/credits/collections/refunds/reversals/allocations/costs are separate. Overlapping gym membership rows cannot be summed as company distinct people. Missing costs/basis are unavailable/incomplete, not zero/profit. Old generic report-catalogue-to-be-prepared wording now means OpenKBS maps the supplied product catalogue to actual schema/providers/queries and verifies it; do not replace settled definitions silently.


## Shared records and lifecycle contract — 0.28

Read the [current shared model](../data/lifecycle-contract.md) and its ENT/REL/SM/TR catalogues, workflow-record map, typed field/command contracts, transition CSV and planned acceptance. This supplies logical record/state/guard/effect/recovery design; OpenKBS must map actual schema/provider status/API/concurrency and evidence. Independent account/employment/membership/payment/entitlement/booking/attendance/task/asset/invoice/publication states cannot be collapsed. No arbitrary status editor or guessed business input is authorised. Original source extracts remain retained.


## Document and form catalogue — 0.29

Use the [current document contract](../documents/document-contract.md) with DCT type catalogue, typed fields, declarative layouts, content-readiness gates and planned acceptance. Upload/form/acknowledgement/signature/issued financial snapshot remain distinct. Company-reviewed legal/health/safety wording and actual original documents remain required inputs; placeholders do not become approved content. Owning source commands control issue/sign/review/payment, and historical issued/signed data/brand versions stay frozen.


## Current setup and handoff — 0.30

Start with CURRENT_BASELINE.md at repository root and the current BUILD_BRIEF.md. The [setup hub](../setup/setup-hub.md) combines resumable scoped sections, responsibility delegation, capability-specific current gates and new-gym inheritance. Optional/missing setup does not create a global block or bypass source requirements. Remaining inputs and actual OpenKBS evidence are enumerated in docs/delivery/remaining-inputs.csv and the current handoff audit. Current brief is planning/cards only, not build/deployment authority.
