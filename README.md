# Orb Gym

**Builders: start with [HANDOVER.md](HANDOVER.md).** It states current authority, the merge rule, what is generated, and the open owner decisions.

Repository edition 0.35 · 9 November 2026. Source architecture 0.17/reviewed r2, with current OG-EXT-001–005 gap-fill requirements.

Orb Gym is a general multi-company platform for owners managing multiple gyms remotely. Four customer journeys share scoped modules: owner/admin/management, staff/coaches, member (including limited PT/trial/guardian-dependent contexts) and vendor/contractor. Platform administration is separate.

This is a populated product repository, not a runnable app. It contains sixteen module briefs, twenty feature specifications, 134 declared feature records, 149 primary/exception workflows, ninety planned acceptance cases, brand assets, builder instructions and configuration/readiness contracts. No actual board cards, runtime/provider configuration, app tests, GitHub remote or deployment are created here.

## Read first

1. [AGENTS.md](AGENTS.md) — current authority, product rules, numbered delivery and verification.
2. [Documentation index](docs/README.md), [architecture](docs/product-architecture.md) and [four journeys](docs/journeys/README.md).
3. [Gap resolution](docs/gap-resolution-status.md), [source extensions](docs/source-extension-register.md), [specified operational rules](docs/decisions/operational-decisions.md) and [setup gates](docs/setup-and-readiness.md).
4. [Detailed modules](docs/modules/README.md), [feature specifications](spec/README.md) and [workflow catalogue](docs/workflows/README.md).
5. [Delivery priorities](docs/delivery-priorities.md), [card contract](docs/board-card-contract.md), [coverage rules](docs/delivery/workflow-coverage.md) and [acceptance](docs/acceptance-scenarios.md).

## Repository structure

| Location | Populated content |
|---|---|
| app/ | Required implementation responsibilities and actual-runtime inspection boundary. |
| assets/ and public/ | Supplied master logo, five reference-only UI concepts and safe public-asset rules. |
| docs/ | Full source architecture, module/journey/design/data/access/decision/configuration/readiness/delivery records. |
| spec/ | Twenty bounded feature briefs, including trials, juniors, imports and privileged authentication/recovery. |
| tests/ and scripts/ | Planned app verification strategy and executable documentation consistency checker. |
| prompts/ | Repository import, then actual-project planning and numbered-card instructions. |
| .github/ | Source/card/evidence-aware pull-request template. |
| Root files | README/AGENTS, contribution/security guidance, .gitignore, blank illustrative .env.example and assembly manifest. |

## Settled product direction

Company Settings selects one of six complete styles and its logo/colours; permitted gym overrides inherit. Orb Gym Basic 01 is default until deliberate white-label activation. Personal light/dark/system is separate. Documents composes templates from the one brand source; issued/signed snapshots remain unchanged. Orb keeps its name with approved company icon. Every app/public page retains **Orb Gym - powered by orbsolutions.co.uk**.

Desktop uses left navigation; iPad/tablet/mobile uses bottom navigation including landscape. Cleaning/maintenance/admin share one typed task/card engine with distinct groups, children and dependencies, per-item evidence and auditable decisions. Hourly employed-coach PT, coach-specific rates, limited PT pass and same-account membership upgrade are included; prepaid PT packages/bundles remain excluded.

## Completed product gaps

Optional company-enabled trials/guests and junior/guardian services now have full limited-access/form/payment/booking/pass/attendance/expiry/relationship journeys. They stay unpublished until required company setup is supplied. Import has authorisation, private staging, dry-run/matching/quarantine, review/commit and reconciliation/compensating repair; it does not transfer working mandates/passwords/signatures or auto-activate people. Privileged login has provider-supported MFA, step-up, lost-factor/sole-owner recovery and revocation requirements.

The seven operational routes are specified: bounded backup approval, review-first payment reversal, targeted form/policy revision, manager-led service disruption, obligation-aware gym archive, original-operation till/money reconciliation and explicit rental-class collection modes. [Policy inventory](docs/policy-settings-contract.json) identifies required company values instead of inventing prices, ages, penalties, retention or reviewed legal/safety terms.

## Next step and validation

Import into the correct Orb Gym project, issue [prompt 01](prompts/01-store-and-audit.md), then [prompt 02](prompts/02-plan-and-create-delivery-cards.md) separately. OpenKBS inspects its real runtime, completes technical contracts and creates a single logical prerequisite-ordered **00, 01, 02…** delivery-card sequence with actual platform IDs, source/workflow/acceptance links and configuration/feasibility blockers. Review that concrete plan before building.

Run `python3 scripts/validate_repository.py` from root for document/source/asset linkage checks. This is not an app test. Actual install/run/build/test commands are defined only after framework/project inspection. See [implementation status](docs/implementation-status.md), [configuration](docs/configuration-inventory.md), [validation](docs/repository-validation.md) and [complete inventory](docs/repository-inventory.md).

[Earlier reviews](docs/reviews/operational-gap-review-0.21.md), history/ and docs/baselines/ preserve lineage. Their old proposal statuses/counts do not override current extensions. The live architecture Page and remote repositories have not been changed. The [five UI concepts](assets/ui-concepts/README.md) are visual references; active written rules and supplied logo take precedence over their sample logos/figures.


## Frontend blueprint addition — repository 0.23

Read the [frontend master](docs/design/frontend-ui-specification.md). The new screen/action inventory, shared components, ten proposed resolved preset/mode mappings, asset/motion catalogues and annotated wireframes extend the 0.22 product baseline. They do not implement the app or prove interactive/accessibility checks. Existing product policies and source IDs are preserved; new visual measurements require receiving-stage verification.


## Dashboard comparison references — 0.24

Use the [five dashboard concepts](assets/ui-dashboard-comparisons/README.md) to compare the same owner surface across Basic01, Flat02, Editorial03, Glass04 and Console05. Basic01 remains default; all five are company-selectable. Images are visual references; written rules, tokens and supplied master artwork govern generated deviations. The folder README lists known differences. Both modes and responsive behaviour still require implementation verification.


## Current granular access clarification — 0.25

Read the [access model](docs/access/access-model.md) and its source clarification, role/action/field catalogues, individual allow/deny policy, editable template matrix and planned access scenarios. Admin means platform admin; owner covers all own-company gyms, senior management covers assigned multiple gyms and local management is gym-specific. Owner/platform admin can grant by role/user type and individual. Explicit scoped individual deny prevails over a matching role allow. Earlier company administrator wording means delegated company management, never platform privilege. Existing business, privacy, self-approval and authentication guards remain. The detailed product permission contract is specified; actual schema/command bindings, configured tenant roles and enforcement evidence remain builder work.


## Notification and escalation contract — 0.26

Read the [current notification contract](docs/notifications/notification-contract.md) and canonical event catalogue, generated CSV, policy settings, safe templates and planned acceptance checks. Resolve exact event recipients/source transitions and stop conditions in OpenKBS planning. Owner/company and platform-admin scope follows the current docs/access contract, superseding old generic company-admin wording. No arbitrary reminder intervals or unsupported channels are approved. Personal preferences do not erase required source actions; delivered/read/acknowledged/completed remain distinct. No live delivery is configured or authorised by this file.


## Dashboard and reporting definitions — 0.27

Use the [metric/reporting contract](docs/reporting/metric-contract.md) with canonical metric/report catalogues, source maps, setup inputs, synthetic worked reconciliation and planned acceptance. Figures and Orb use identical definitions and scope. Charges/credits/collections/refunds/reversals/allocations/costs are separate. Overlapping gym membership rows cannot be summed as company distinct people. Missing costs/basis are unavailable/incomplete, not zero/profit. Old generic report-catalogue-to-be-prepared wording now means OpenKBS maps the supplied product catalogue to actual schema/providers/queries and verifies it; do not replace settled definitions silently.


## Shared records and lifecycle contract — 0.28

Read the [current shared model](docs/data/lifecycle-contract.md) and its ENT/REL/SM/TR catalogues, workflow-record map, typed field/command contracts, transition CSV and planned acceptance. This supplies logical record/state/guard/effect/recovery design; OpenKBS must map actual schema/provider status/API/concurrency and evidence. Independent account/employment/membership/payment/entitlement/booking/attendance/task/asset/invoice/publication states cannot be collapsed. No arbitrary status editor or guessed business input is authorised. Original source extracts remain retained.


## Document and form catalogue — 0.29

Use the [current document contract](docs/documents/document-contract.md) with DCT type catalogue, typed fields, declarative layouts, content-readiness gates and planned acceptance. Upload/form/acknowledgement/signature/issued financial snapshot remain distinct. Company-reviewed legal/health/safety wording and actual original documents remain required inputs; placeholders do not become approved content. Owning source commands control issue/sign/review/payment, and historical issued/signed data/brand versions stay frozen.


## Current setup and handoff — 0.30

Start with CURRENT_BASELINE.md at repository root and the current BUILD_BRIEF.md. The [setup hub](docs/setup/setup-hub.md) combines resumable scoped sections, responsibility delegation, capability-specific current gates and new-gym inheritance. Optional/missing setup does not create a global block or bypass source requirements. Remaining inputs and actual OpenKBS evidence are enumerated in docs/delivery/remaining-inputs.csv and the current handoff audit. Current brief is planning/cards only, not build/deployment authority.


Current error review: docs/reviews/error-review-0.31.md records eight corrected specification/validation groups. Transition count at that point: 217 (superseded; the current catalogue has 233); original WF/feature/source IDs remain stable. Refer to the corrected current catalogues, not old audit quantity summaries, for implementation.


Current second review: docs/reviews/error-review-0.32.md and docs/data/authorization-contract.md resolve remaining action/lifecycle ambiguities. Read these before interpreting older permission-index wording. Original source/feature/workflow IDs stay stable.


Current recovery-path review: docs/reviews/error-review-0.33.md and docs/data/recovery-path-contract.md. Use current 233-transition catalogue; prior review counts are historical. Preserve all earlier public/signature/typed-authority corrections. Read the new explicit service-restoration/transfer/late-delivery/credential paths before implementing recovery.


Current actor/default-role review: docs/reviews/error-review-0.34.md and docs/access/role-journey-contract.md. Use narrow assigned start/limited fault reporting and actual source-scoped self-service; no task edit/HR escalation to make a default journey work. Existing authority/recovery/signature/source guards remain.

Current appearance extension 0.35: docs/design/style-options.json, docs/design/appearance-settings-contract.json and docs/design/ui-direction-settings.md govern five selectable options. Flat02 and Glass04 retain IDs with expanded rules; Neumorphic06 is deferred and not selectable. Historical five comparison images are not a five-style limit. The five selectable presets are the original five; Neumorphic06 is recorded but deferred and is not selectable until a rendered reference exists. docs/design/style-options.json is authoritative. The preserved source blocks in docs/source-requirement-register.md and docs/modules/ state “all five presets”, which now agrees with this rule. Run scripts/validate_ui_styles.py alongside all other validators.
