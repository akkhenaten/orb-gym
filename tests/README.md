# Verification Strategy

There is no implemented app test suite yet. The 90 scenarios in docs/acceptance-scenarios.md are required planned criteria, not passing results. Feature specs identify local and cross-module checks. No synthetic passing framework/config is supplied without the actual code/runtime.

After authorised implementation, select tests that demonstrate outcomes rather than duplicate implementation detail. Use synthetic tenants, gyms, role assignments, members/PT-only clients, staff/coaches/vendors, classes, payments, stock and tasks.

## Required layers

| Layer | Meaningful evidence |
|---|---|
| Domain/state | Correct transitions, prerequisites, price/version snapshots and corrections. |
| Access/API/storage | Cross-company/gym and sensitive-field denial; revoked/deep-link/export/AI access and private-file isolation. |
| Financial/booking concurrency | Final-place races, late/duplicate callbacks, partial payments/refunds/stock movements and consistent allocation. |
| Integration | Verified sandbox provider/device/mail behaviour, pending/failure/retry paths; mocks labelled explicitly. |
| Journey/end-to-end | Owner setup, pending-member activation, class/PT booking/entry/register, staff rota/tasks, contractor quote-to-payment and POS receipt/refund. |
| UI/device | Four journeys, all presets/modes, desktop left/tablet-mobile bottom, focus/keyboard/touch, long content and preserved drafts. |
| Operations/release | Migration/rollback, monitoring, background recovery, database/evidence restore and owned support procedures. |

Record environment/build, source/card/spec IDs, inputs, expected/actual results, actual commands, evidence and limits. Security/payment/restore criteria are not satisfied by screenshots. Release requires agreed measurable targets and actual verification, not the word production-ready.

Run python3 scripts/validate_repository.py now to validate documentation/source coverage and asset integrity. That checker is not app test evidence.

## Feature pipeline verification

Apply the common and local criteria in docs/workflows/README.md to all 149 defined primary/exception workflows for 134 features. Tests must demonstrate the step transitions and authoritative downstream handoffs, including blocked/returned/denied/failed/expired/retried branches, not merely that a page loads. Map WF/FEAT IDs through the builder’s workflow-coverage.csv to actual evidence. The documentation validator checks structural completeness only.

Operational gap-review rule (0.21): docs/reviews/operational-gap-review-0.21.md identifies fifteen additional exception/lifecycle subflows. Map all 149 primary/subflows for 134 specified features to actual numbered cards and relevant acceptance through AC70. DEC-GR-01–07 now specify product routing/guard defaults in the current operational rules. Tenant values and reviewed content are SETUP_REQUIRED; the four optional/configurable capabilities are specified by OG-EXT-001–004. Do not invent tenant inputs or bypass readiness, access, refund, supplier payment or approval controls. Preserve all source/feature/workflow IDs and the global 00, 01, 02… card order.
