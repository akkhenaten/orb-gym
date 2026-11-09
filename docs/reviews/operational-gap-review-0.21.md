> Historical review at its named edition. Current 0.22 gap resolution and capability scope are in [gap-resolution-status.md](../gap-resolution-status.md); earlier PROPOSED/out-of-catalogue statements below do not override current source extensions.

# Operational Gap Review — Orb Gym 0.21

7 November 2026. Reviewed the actual stored v0.20 archive and its 115 primary workflows against the founder discussion, complete source architecture and cross-module consequences. No real app/runtime, external repository or OpenKBS board was inspected/changed. This review challenges completeness rather than treating workflow counts or field checks as proof.

## Findings, recommendations and action

| ID | Gap in previous documentation and consequence | Applied correction / remaining decision |
|---|---|---|
| GR01 | WF-MEM-04 covered setup/collection/activation and generic failures, but not a complete post-activation reversal/late-failure handoff. | Added WF-MEM-08 and AC56. Preserve ledger/history, identify affected bookings/earnings and assign finance/Membership resolution. Automatic entitlement/grace/retry policy is DEC-GR-02, not chosen. |
| GR02 | Documents/forms were versioned, but the journey from new form publication to current-member re-review and access consequences was not explicit. | Added WF-MEM-09 and AC57. Applicability/effective dates/current rights remain DEC-GR-03; no automatic blanket restriction or assumed annual form cycle. |
| GR03 | Booking changes and staff availability existed, but the sequence from disruption after publication/payment to validated cover, member handling and finance closure was too distributed. | Added WF-CLASS-07/WF-STAFF-16 and AC58/60. DEC-GR-04 owns substitution/reschedule/cancellation/acceptance/refund rules. |
| GR04 | Final-place concurrency was explicit, but same-member duplicate reservations and queue/hold/cancellation races were not a named verification path. | Added WF-CLASS-08 and AC59. Reconcile existing reservation/charge and queue ownership; preserve chosen eligibility/overlap policy. |
| GR05 | Task/approval ownership and leaver handling existed separately; unavailable approver and stale/expired quote handover were not complete. | Added WF-TASK-18 and AC61; backup/threshold/conflict policy DEC-GR-01. Never grant new power by a mention or auto-approve. |
| GR06 | Recurrence changes preserved historical work generally; selecting scope for already-issued/in-progress tasks and partial generator recovery needed explicit treatment. | Added WF-TASK-19 and AC62, as a subflow of existing recurrence. Preview exact affected IDs; no reset of performed work. |
| GR07 | Supplier onboarding and operative delegation existed in source/journey prose but not full feature-level pipelines. | Added WF-TASK-20/21 and AC63/64. Scoped organisation/contact/credentials, allocation/revocation and historical performer identity remain distinct. |
| GR08 | One identity across workspaces plus editable profile could be misimplemented as shared private person/health/HR fields. | Added WF-USER-11 and AC65. Define field ownership and keep company-specific person records separate; signed snapshots unchanged. |
| GR09 | Gym archive was described as needing obligation review, but the operating sequence for future bookings, people, stock/assets and balances was absent. | Added WF-SPACE-05 and AC66. Exact transfer/access/cancellation/settlement outcomes remain DEC-GR-05. |
| GR10 | Till retries and stock ledger were explicit, but paid-tender/failed-sale recovery and unmatched/over-allocated money were not complete handoffs. | Added WF-POS-09/WF-FIN-05 and AC67/68. Recover original operations and resolve through current authority; chosen remedy/allocations are DEC-GR-06. |
| GR11 | Rental coaches could run classes, but the collector/issuer/refund/settlement choice could be confused with employee earnings. | Added WF-COACH-07 and AC69 with a blocking DEC-GR-07. Do not infer gym collection, independent-coach payout or employee payroll allocation. |
| GR12 | Public auto-updates existed, but source withdrawal/expiry through projections/cache/old CTAs needed an explicit verified path. | Added WF-LAND-11 and AC70. Current booking/price checks remain authoritative; refresh targets are technical planning choices. |

## New-feature choices kept separate

Trial/guest passes, junior/guardian accounts, legacy business-data import and stronger privileged-login/recovery controls are plausible product gaps. Their minimal proposed journeys and consequences are in proposals/feature-options.md. They are not silently approved, not implemented and not included in the feature count. Decide with the founder whether they are now/later/out of scope.

## What changed in the repository

Preserved all 115 existing feature IDs and their primary workflows. Added fifteen exception/lifecycle subflows for those same features: **130 workflows across seventeen domains, still 115 declared features**. Added explicit actor/state/guard/record/next-owner/failure tables for these subflows, seven proposed operational decision records, four optional feature proposals and fifteen planned acceptance criteria (AC56–AC70). Original source blocks, role journeys, sixteen feature briefs, UI/brand rules and numbered-card contract remain.

The builder must map every applicable primary/subflow to real cards and acceptance, decide policy branches, investigate actual feasibility and complete precise technical contracts. A word-count, workflow count or successful structural validator is not a semantic completeness or production claim.

## Provider evidence relevant to GR01/GR10

Research date 7 November 2026. Official GoCardless scenario documentation describes a confirmed payment later failing and a collected/paid-out payment later charged back. Official Stripe webhook documentation covers asynchronous outcomes, duplicate events and non-guaranteed event ordering. This validates the need for post-success reconciliation and idempotent event handling; it does not select either provider, determine the gym's refund/access policy or assert any service is configured.

- https://docs.gocardless.com/docs/developer-resources/scenario-simulators
- https://docs.stripe.com/webhooks

No provider examples, test bank details, credentials or real payment actions are copied into the product configuration.

## Review limits

Source-backed invariants are clarified; material business policies remain PROPOSED in the decision queue. No legal, clinical or payroll rules are inferred. Underlying auth/payment/device/provider capabilities, exact UI/token contracts, performance/retention/recovery targets, final release boundary and executed tests remain open. The repository ZIP is updated; no GitHub remote, live Page, account, payment, message or deployed app was changed.

## Exception record ownership

Use existing operational task/case records and dashboard exception views, linked to the authoritative financial/booking/HR source. Do not introduce a second ledger or separate competing issue engine just to display an exception queue. Resolution outcomes are written through the source module command; a feed reply or exception-card closure cannot itself move money, alter an entitlement or verify a repair.
