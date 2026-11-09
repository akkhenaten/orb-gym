# Trial and Guest Visits

Repository 0.22. Product capability specified from OG-EXT-001; no runnable implementation or executed evidence is claimed. It remains within the existing four customer journeys, not an additional isolated product.

## Behaviour and records

Company-enabled optional service, disabled until its setup contract passes. Reuse identity, onboarding, document, payment/entitlement and visit records. A guest is not forced to buy membership or given unrelated member data. Limited app destinations are own visit/status/forms/receipts/pass/profile/contact; no ordinary member feed or all-gym access by implication. A public trial CTA exists only for a published ready offer. Guest invitations and individual entry passes use separate contracts. The offer defines price or explicit zero/free, time/visit limit, purpose, gym/activity eligibility, review and refund/cancellation rules. No trial duration, age or free entitlement is invented.

The detailed [module](../docs/modules/13-trials-and-guests.md) and [workflows](../docs/workflows/trial.md) contain every defined feature's actor, preconditions, ordered checkpoints, source result/handoff and exception. Common identity, company/gym/field/action scope, typed evidence, versioned issued documents, money/access/booking records and audit/retry rules are reused. No second ledger, account store or independent task engine is introduced.

## Readiness and current authority

Use [setup-and-readiness.md](../docs/setup-and-readiness.md), [policy settings contract](../docs/policy-settings-contract.json) and [operational rules](../docs/decisions/operational-decisions.md). Company-specific rates, age eligibility, reviewed content, exact access windows and real provider features are explicit required inputs. A disabled/draft/holding/setup-restricted view is a deliberate state, not a missing workflow or successful activation.

## UI and integration

Use the same tokens, company/gym branding, exact footer and desktop-left/tablet-mobile-bottom navigation. Trial users receive limited own-visit/pass/profile views. Guardians use member-context dependent selection and scoped Family/Bookings/Profile tools; choosing a dependent never grants access to another guardian or person. Staff import and security configuration are delegated company/platform tools. Exact routes/component bindings/auth/API/data/events and device/provider capabilities are completed from actual project inspection.

## Implementation and acceptance

Planned local criteria: AC71, AC72, AC73, AC74; common tenant/identity/receipt/attendance/access/retry/backup/responsive tests still apply. Complete state/actor/guard/field tables, ownership/notifications, API/events, migration/rollback/privacy and actual evidence requirements before implementation. Map OG-EXT-001, every FEAT/WF and acceptance to real numbered delivery cards in one global 00, 01, 02… prerequisite order. No arbitrary one-card-per-workflow rule. Do not claim reviewed legal/safety wording or configured provider support from these files.

Apply the [logical data, field-grant and reporting extension](../docs/data-extension-contracts.md) when completing entities, permissions, metrics and recovery. These are shared responsibilities, not a second account/task/financial engine.
