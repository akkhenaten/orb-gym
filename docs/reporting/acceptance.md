# Planned reporting acceptance

These supplement AC25/41/45/46 and FIN/source workflows; not executed application tests.

| ID | Required result |
|---|---|
| MET-AC01 | Distinguish posted charges/credits/collections/refunds/reversals and verify signed source drilldowns against fixture. |
| MET-AC02 | Duplicate provider callback, receipt reprint, till collection of existing debt and coach allocation do not add charge/collection. |
| MET-AC03 | Partial allocation, refund with credit, reversal and unapplied funds reconcile debt and cash without double effects. |
| MET-AC04 | Import opening debt affects balance only; imported cash history does not become new-period collection. |
| MET-AC05 | Split gym allocations sum to source; all-gym members/payments never duplicate company money. |
| MET-AC06 | Supplier quote/invoice/payment are distinct; linked invoice reduces commitment and payment reduces invoice due. |
| MET-AC07 | Multiple plans and guardian/child/payer/account identities count correct distinct beneficiary. Entitlement rows disclose overlap. |
| MET-AC08 | Cohort conversion uses linked submitted applications and observation cutoff, not unrelated period activations. |
| MET-AC09 | Frozen/PT/trial/staff-only accounts excluded from active membership unless independently entitled; unknown imported history unclassified. |
| MET-AC10 | Class booked/waitlist/RSVP/attended/no-show/visit separate; incomplete register coverage visible with correct denominator. |
| MET-AC11 | PT rate snapshots retained; utilisation uses identical interval/scope and unknown availability is unavailable. |
| MET-AC12 | Staff planned/actual/matched hours/breaks distinct; missing pay/cost evidence does not silently show zero cost/profit. |
| MET-AC13 | Task submission/verification/rework/reopen and parent/group/child cost links do not inflate completion or expenses. |
| MET-AC14 | Downtime unions overlapping asset intervals and clips period/cutoff; restored status independent of invoice payment. |
| MET-AC15 | Stock refund versus actual return distinct; transfers/in-transit and pre-adjustment variance reconcile per SKU. |
| MET-AC16 | Zero-known scope, zero denominator, missing source, incomplete data, stale refresh and failed query have different presentation. |
| MET-AC17 | Mixed currencies remain separate; unconfigured tax/valuation/contribution basis blocks dependent result. |
| MET-AC18 | Source period boundaries, local timezone/DST, late events and correction restatement preserve stated as-of/version. |
| MET-AC19 | Owner sees own company only; local/senior/payroll/source-field grants and individual denial constrain queries/counts/drilldowns. |
| MET-AC20 | Export/AI report uses same definition/snapshot/predicate; revocation during job prevents future unauthorised download. |
| MET-AC21 | Chart table alternative and drilldown reconcile with displayed total; long values/device/theme/keyboard retain context. |
| MET-AC22 | Scheduled mail remains disabled/unselected until approved release/configuration; report view alone sends nothing. |
| MET-AC23 | Actual API/history lacking prior state cannot fabricate historical metric; unknown freshness remains explicit. |
| MET-AC24 | Dashboard label and Orb summary name exact money/attendance/cost basis, never misleading generic revenue/profit claim. |

Builder records actual source/query definitions and result evidence, high-risk boundary/permission failures and reconciliation before marking report cards Done. Fixture arithmetic checks are documentation evidence only.
