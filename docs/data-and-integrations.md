# Data and Integration Boundaries

Use the logical data and cross-module sections in product-architecture.md and modules/10-data-integration-and-verification.md as the authoritative domain contracts. This document is an index of required technical planning outputs, not a concrete SQL schema or selected stack.

Identity/workspace/gym assignment gates all modules. Profile/onboarding and versioned documents supply membership activation/PT eligibility. Membership and payment policy issue entitlements consumed by booking, entry and member-facing audiences. Class/PT bookings and rota/resources share availability/conflict rules, but gym visits and class attendance remain distinct. Corrections update derived reporting/retention with history preserved.

One typed task/case engine links cleaning/admin/maintenance, asset faults, suppliers, evidence, decisions, commitments/invoices and explicit closure. Quotes, invoices, payment allocations and status projections keep stable identities; job tabs are views of those records. POS sales have their own tender and stock ledger. Coaching payments and internal revenue shares are not two revenues. Documents/publishing read approved versioned sources and never override owning business commands.

Prepare actual entity/relationship diagrams, tenant/gym keys, lifecycle tables, commands/API contracts, events/outbox/retry, concurrency/version checks, private-file grants, migration/rollback and integration adapter boundaries. Use transactions for capacity/entitlement/stock effects, authenticated provider events and idempotent consumption. Explain pending/late/failure outcomes rather than claiming exactly-once transport or silently retrying charges.

Background jobs, caches, analytics, exports, AI and subscriptions must preserve scope/revocation. Module sources own calculations/states; dashboard/calendar/reports are permission-filtered projections with freshness and source links. Provider/data ownership, currency/tax/rounding, retention and measurable recovery targets remain decision records before production use.

The current [data/permission/reporting extension](data-extension-contracts.md) specifies trial grants, dependent/guardian relationships, import provenance, auth assurance, readiness ownership and beneficiary-versus-payer reporting.


## Shared records and lifecycle contract — 0.28

Read the [current shared model](data/lifecycle-contract.md) and its ENT/REL/SM/TR catalogues, workflow-record map, typed field/command contracts, transition CSV and planned acceptance. This supplies logical record/state/guard/effect/recovery design; OpenKBS must map actual schema/provider status/API/concurrency and evidence. Independent account/employment/membership/payment/entitlement/booking/attendance/task/asset/invoice/publication states cannot be collapsed. No arbitrary status editor or guessed business input is authorised. Original source extracts remain retained.
