# Controlled Import and Existing-Gym Onboarding

Repository 0.22. Product capability specified from OG-EXT-003; no runnable implementation or executed evidence is claimed. It remains within the existing four customer journeys, not an additional isolated product.

## Behaviour and records

Start with controlled file-based import, not invented provider integrations. Formats/entity scope and exact mappings are defined in the technical plan; CSV can be an initial supported input only with validation, encoding/type handling and private staging. Preserve data ownership, privacy, source identity and batch provenance. Imported rows are untrusted inputs. Never import permanent passwords or treat a bank/card/mandate reference as a working payment method. Do not auto-transfer financial contracts/signatures. Opening balances require finance review and a distinct imported-history label. No record activates until current verified identity, onboarding, role/payment and approval gates apply. Matching/quarantine is reversible before commit; after commit use source-domain corrections/compensating actions. No promise of undoing externally completed effects.

The detailed [module](../docs/modules/15-import-and-reconciliation.md) and [workflows](../docs/workflows/import.md) contain every defined feature's actor, preconditions, ordered checkpoints, source result/handoff and exception. Common identity, company/gym/field/action scope, typed evidence, versioned issued documents, money/access/booking records and audit/retry rules are reused. No second ledger, account store or independent task engine is introduced.

## Readiness and current authority

Use [setup-and-readiness.md](../docs/setup-and-readiness.md), [policy settings contract](../docs/policy-settings-contract.json) and [operational rules](../docs/decisions/operational-decisions.md). Company-specific rates, age eligibility, reviewed content, exact access windows and real provider features are explicit required inputs. A disabled/draft/holding/setup-restricted view is a deliberate state, not a missing workflow or successful activation.

## UI and integration

Use the same tokens, company/gym branding, exact footer and desktop-left/tablet-mobile-bottom navigation. Trial users receive limited own-visit/pass/profile views. Guardians use member-context dependent selection and scoped Family/Bookings/Profile tools; choosing a dependent never grants access to another guardian or person. Staff import and security configuration are delegated company/platform tools. Exact routes/component bindings/auth/API/data/events and device/provider capabilities are completed from actual project inspection.

## Implementation and acceptance

Planned local criteria: AC81, AC82, AC83, AC84, AC85; common tenant/identity/receipt/attendance/access/retry/backup/responsive tests still apply. Complete state/actor/guard/field tables, ownership/notifications, API/events, migration/rollback/privacy and actual evidence requirements before implementation. Map OG-EXT-003, every FEAT/WF and acceptance to real numbered delivery cards in one global 00, 01, 02… prerequisite order. No arbitrary one-card-per-workflow rule. Do not claim reviewed legal/safety wording or configured provider support from these files.

Apply the [logical data, field-grant and reporting extension](../docs/data-extension-contracts.md) when completing entities, permissions, metrics and recovery. These are shared responsibilities, not a second account/task/financial engine.

Existing original signed agreements/receipts and their source evidence may be retained as protected imported copies with provenance and review status. Import must not fabricate a new signature, issue a misleading replacement receipt or mark old terms valid without the required review. A verified original may satisfy a current evidence requirement only under its explicit applicability rule. Any real payment-mandate migration is a separately authorised, provider-supported process, never a consequence of uploading a reference in a file.
