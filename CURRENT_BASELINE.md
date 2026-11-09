# Orb Gym — current product handoff 0.35

7 November2026. Start here, then BUILD_BRIEF.md and AGENTS.md. This is a product/design/architecture specification and planning handoff, not application code, runtime configuration, approved legal wording or a deployed app. The accepted work is documentation import, project inspection, detailed implementation planning and Backlog delivery cards. Actual build/deployment/live messages/payments remain separately authorised.

## Current authority and read order

Current explicit founder instructions and current source-linked clarifications govern. Original architecture/extracted source blocks remain preserved as provenance; older generic admin terminology is refined by the current access model. Existing financial/safety/source guards still apply. Proposed visual measurements, editable specialist role defaults, company inputs and runtime evidence are not silently approved by being documented.

| Product area | Active source |
|---|---|
| Full product baseline and four journeys | docs/product-architecture.md; docs/journeys/; docs/source-requirement-register.md; docs/source-extension-register.md |
| Operational policies and readiness values | docs/decisions/operational-decisions.md; docs/policy-settings-contract.json; docs/setup-and-readiness.md |
| Frontend/brand/six directions | docs/design/frontend-ui-specification.md; screen/component/token catalogues; assets/ui-dashboard-comparisons/README.md |
| Roles and individual permissions | docs/access/access-model.md; source-clarifications.md; policy/role/permission/field contracts |
| Notifications/escalation | docs/notifications/notification-contract.md and event/policy/template catalogues |
| Metrics/reporting | docs/reporting/metric-contract.md and metric/report catalogues/worked examples |
| Logical records/lifecycle | docs/data/lifecycle-contract.md and entity/relationship/state/transition/workflow catalogues |
| Documents/forms | docs/documents/document-contract.md and DCT/field/layout/readiness catalogues |
| Unified owner setup | docs/setup/setup-hub.md and SET/CAP/inheritance/evidence catalogues |
| Detailed scope | spec/; docs/workflows/catalogue.json; feature-register.json;149 workflows remain required |
| Planning/delivery and remaining inputs | docs/delivery-priorities.md; docs/board-card-contract.md; docs/delivery/remaining-inputs.csv; docs/reviews/handoff-audit-0.30.md |

Additional clarification source maps are in access/, notifications/, reporting/, data/, documents/ and setup/ alongside original docs/delivery/source-map.json and extension-source-map.json. Preserve IDs and decompose compound requirements; initial domain-level maps are not atomic test/implementation completion.

## Fixed product decisions

General multi-company/multi-gym Orb Gym. Four customer journeys plus separate platform-admin context. Owner covers all own-company gyms; senior management assigned multiple gyms; local manager gym-specific; owner/platform admin granular role and individual access, scoped deny precedence. Rental/employed coaches stay different; hourly employed PT included, prepaid bundles excluded. One typed task engine for cleaning/maintenance/admin with children/groups/dependencies and typed feed source records.

Desktop left navigation; tablet/iPad/mobile bottom including landscape. Default Basic Bento01; the five selectable styles (Neumorphic06 deferred) and light/dark, company/gym inheritance and explicit white label. Assistant name Orb; approved company icon under established rule. Exact app/public footer Orb Gym - powered by orbsolutions.co.uk. Documents consumes brand; issued/signed source snapshots frozen.

## Completion boundary

No additional broad product-document round is required before OpenKBS inspects and plans this baseline. Remaining actual company values/content, platform capabilities and implementation evidence are enumerated in remaining-inputs.csv. A genuine new material source conflict goes to the correct owner; do not reopen settled scope or treat every runtime detail as another founder design question. This is ready for bounded technical planning, not automatic Build or production release.


Current error review: docs/reviews/error-review-0.31.md records eight corrected specification/validation groups. Transition count at that point: 217 (superseded; the current catalogue has 233); original WF/feature/source IDs remain stable. Refer to the corrected current catalogues, not old audit quantity summaries, for implementation.


Run scripts/validate_review_regressions.py with the other documentation checks. Use docs/reviews/error-review-0.31.md, error-review-acceptance.md and data/canonical-operations.json for corrected boundaries. Earlier successful structural reviews did not verify these semantic contracts; actual API/signature/access/concurrency evidence is still required.


Current second review: docs/reviews/error-review-0.32.md and docs/data/authorization-contract.md resolve remaining action/lifecycle ambiguities. Read these before interpreting older permission-index wording. Original source/feature/workflow IDs stay stable.


Current recovery-path review: docs/reviews/error-review-0.33.md and docs/data/recovery-path-contract.md. Use current 233-transition catalogue; prior review counts are historical. Preserve all earlier public/signature/typed-authority corrections. Read the new explicit service-restoration/transfer/late-delivery/credential paths before implementing recovery.


Current actor/default-role review: docs/reviews/error-review-0.34.md and docs/access/role-journey-contract.md. Use narrow assigned start/limited fault reporting and actual source-scoped self-service; no task edit/HR escalation to make a default journey work. Existing authority/recovery/signature/source guards remain.

Current appearance extension 0.35: docs/design/style-options.json, docs/design/appearance-settings-contract.json and docs/design/ui-direction-settings.md govern five selectable options. Flat02 and Glass04 retain IDs with expanded rules; Neumorphic06 is deferred and not selectable. Historical five comparison images are not a five-style limit. The five selectable presets are the original five; Neumorphic06 is recorded but deferred and is not selectable until a rendered reference exists. docs/design/style-options.json is authoritative. The preserved source blocks in docs/source-requirement-register.md and docs/modules/ state “all five presets”, which now agrees with this rule. Run scripts/validate_ui_styles.py alongside all other validators.
