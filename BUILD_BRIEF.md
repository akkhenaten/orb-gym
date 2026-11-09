# OpenKBS planning brief — Orb Gym 0.35

> **Current authority, 9 November 2026: read [HANDOVER.md](HANDOVER.md) first.** The owner has authorised
> implementation of one complete working application in `app/`, not delivered slice by slice. The planning-only
> steps below are retained as the 0.35 brief; where they conflict (planning only, "first build slice"),
> HANDOVER.md governs. Deployment, live providers and business-policy changes remain unauthorised.

Read CURRENT_BASELINE.md and AGENTS.md first. Import this repository into the correct target project non-destructively, preserving unrelated existing code/config/cards and source history. The earlier Opulence/Security screenshots were builder references, not the target app. Reading this file is not an instruction to build, deploy, configure providers or send messages.

## Requested next work

1. Inspect actual project/framework/schema/auth/files/jobs/email/payment/board capabilities and existing implementation. Distinguish documented capability, project configuration and verified evidence. Preserve unknown target/provider/tenant values; use remaining-inputs.csv to assign receiving owners.
2. Reconcile full architecture, four journeys, source registers/extensions/current clarification maps, 20 feature briefs, 149 workflows and current UI/access/notification/report/data/document/setup contracts. Resolve material conflicts explicitly; preserve business policy rather than choosing a convenient UI/provider shortcut.
3. Prepare detailed implementation plan with real data/command/API/state/permission/field/integration mappings, migrations/restore, responsive/token/component work and meaningful verification. Initial domain-level maps must become atomic source/checkpoint/exception-to-card coverage. Include the five selectable styles (Neumorphic06 deferred), limited member/coach/vendor contexts and platform administration.
4. Build dependency graph, then create Backlog delivery cards with unique global prefixes 00,01,02… for every parent and child; no module reset or invented board IDs/card count. Parentage is a rollup, not a blocker for its own children. Follow docs/board-card-contract.md and delivery priorities. Return actual IDs/links and preserve existing card states/unrelated work.
5. Present the concrete plan, missing company inputs/provider findings, dependency-ordered card index, first build slice and evidence gates for review. Do not start implementation just because a spec or board card exists.

## Required saved outputs

Under docs/delivery/: implementation-plan.md, requirements-coverage.csv, decision-log.md, card-index.md, platform-capability-matrix.md, access-matrix.md, screen-and-notification-matrix.md, design-token-map.md, report-catalogue.md, verification-plan.md and workflow-coverage.csv. The report catalogue maps the supplied metric/report contracts to actual queries/fields; it does not replace settled definitions. Include physical schema/ER, source/provider status mapping, exact source-permission variants, event recipient queries, setup gates and actual routes in the relevant plan/spec.

Every delivery card links applicable source/feature/WF/SCR/CMP/permission/NOT/MET/DCT/ENT/SM/TR/SET/CAP IDs, prerequisites, data/source/field actions, errors/negative/retry/concurrency scenarios, blocked inputs and required actual evidence. User-facing mockups, structural validators and synthetic arithmetic are not proof of payments, entry, legal signatures, security or working integrations.

## Boundaries

Company owner/admin choices are current product decisions, not invitations to add unrestricted self-escalation or remove mandatory guards. Do not introduce prepaid PT packages, universal public data access, guessed legal/medical content/age/tax/rates/timing, or claimed live provider modes. Optional selected capability gates are independent; setup progress cannot override actual source eligibility. Preserve issued/signed source records and unique money/capacity/stock effects.

Implementation, actual testing and release happen only under subsequent build authority and their specific evidence gates. Do not mark cards Done from documentation. Definition of Ready/Done is in docs/platform-evidence-and-delivery-gates.md. No GitHub target/runtime/board/deployment was verified by authoring this repository.


## Error corrections — 0.31

Before binding APIs, read docs/reviews/error-review-0.31.md and docs/data/canonical-operations.json. Treat paired records as one owning operation; verify signer completion and public/auth/guardian/cancellation boundaries. Run self-contained cross-contract checks; do not assume the authoring sibling folders exist.


Current error review: docs/reviews/error-review-0.31.md records eight corrected specification/validation groups. Transition count at that point: 217 (superseded; the current catalogue has 233); original WF/feature/source IDs remain stable. Refer to the corrected current catalogues, not old audit quantity summaries, for implementation.


Run scripts/validate_review_regressions.py with the other documentation checks. Use docs/reviews/error-review-0.31.md, error-review-acceptance.md and data/canonical-operations.json for corrected boundaries. Earlier successful structural reviews did not verify these semantic contracts; actual API/signature/access/concurrency evidence is still required.


## Authorisation corrections — 0.32

Read docs/data/authorization-contract.md at repository root. The transition authorization object is canonical: no default permission alongside alternate routes, no generic SYSTEM bypass, and unknown context denies. Tenant scope and lifecycle are separate; retained histories/reconciliation/recovery remain explicitly permitted where authorised without reopening service. Setup is not collection; booking is not PT management/cancellation or dependent payment authority. Current actual source/business/field/consent guards still apply.


Current second review: docs/reviews/error-review-0.32.md and docs/data/authorization-contract.md resolve remaining action/lifecycle ambiguities. Read these before interpreting older permission-index wording. Original source/feature/workflow IDs stay stable.


Run scripts/validate_authorization_contract.py with the other documentation checks; use docs/data/authorization-contract.md and docs/reviews/error-review-0.32.md before API binding. Any direct transition check using permission_id alone is incomplete. Actual scope/identity/provider/consent/business evidence must still be proven.


Current recovery-path review: docs/reviews/error-review-0.33.md and docs/data/recovery-path-contract.md. Use current 233-transition catalogue; prior review counts are historical. Preserve all earlier public/signature/typed-authority corrections. Read the new explicit service-restoration/transfer/late-delivery/credential paths before implementing recovery.


Run scripts/validate_recovery_paths.py with the other documentation checks. This verifies targeted recovery/outcome contract coverage, not only that state names exist. Actual stock/pass/provider/credential flows and negative/concurrent cases remain implementation evidence requirements.


Current actor/default-role review: docs/reviews/error-review-0.34.md and docs/access/role-journey-contract.md. Use narrow assigned start/limited fault reporting and actual source-scoped self-service; no task edit/HR escalation to make a default journey work. Existing authority/recovery/signature/source guards remain.

Run scripts/validate_role_journeys.py with all other validate_*.py checks. Verify the assigned-work, reporting, self-service and actor-specific booking journeys against real source permissions during implementation. Documentation checks do not prove runtime access.

Current appearance extension 0.35: docs/design/style-options.json, docs/design/appearance-settings-contract.json and docs/design/ui-direction-settings.md govern five selectable options. Flat02 and Glass04 retain IDs with expanded rules; Neumorphic06 is deferred and not selectable. Historical five comparison images are not a five-style limit. The five selectable presets are the original five; Neumorphic06 is recorded but deferred and is not selectable until a rendered reference exists. docs/design/style-options.json is authoritative. The preserved source blocks in docs/source-requirement-register.md and docs/modules/ state “all five presets”, which now agrees with this rule. Run scripts/validate_ui_styles.py alongside all other validators.
