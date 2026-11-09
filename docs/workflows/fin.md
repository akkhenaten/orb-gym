# Finance, Analytics and Reports

Repository 0.21. 5 source-backed primary and exception workflows for this domain. IDs are stable feature/workflow references, not delivery-card sequence numbers.

## Sources and receiving specifications

[11-finance-reports-and-analytics.md](../modules/11-finance-reports-and-analytics.md); [10-data-integration-and-verification.md](../modules/10-data-integration-and-verification.md); [03-classes-coaches-and-attendance.md](../modules/03-classes-coaches-and-attendance.md)

[finance-reports](../../spec/finance-reports.md)

Planned cross-module acceptance: AC25, AC41, AC45, AC46. Decision references: GAP02, GAP07, GAP12, GAP14, GAP15. Read the [common contract](README.md#common-workflow-contract).

## Module surface, state boundaries and ownership

Company/gym finance and report filters, source drilldown, exception ownership, private exports and definitions/data freshness.

Charge/collection/allocation/refund, commitment/invoice/payment, report requested/generated/failed/delivered retain their own state.

Owning financial domain → authorised finance/reconciliation owner → permitted owner/manager/report recipient.

The lifecycle words below are business checkpoints. The builder must resolve exact enum values and actor/action/field tables before implementation, with all open policy branches retained. Existing authority and source-specific review rules apply; no new approval gate or access right is created merely by this catalogue.

## WF-FIN-01

**FEAT-FIN-01 — Financial source reconciliation**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised finance reviews charges and collected/spent money |
| Preconditions | Owning membership/PT/class/POS/rent/job records, correct entity/currency and trusted events |
| Ordered journey / checkpoints | Load source charges → allocate confirmed receipts/payments/credits → identify exceptions → resolve → report |
| Source records / result / handoff | Billed/collected/outstanding/commitment/invoiced/paid distinct; internal split not second revenue |
| Exception / decision branch | Partial payment, duplicate invoice/callback and shared-cost allocation cannot double count; transaction date/basis explicit |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC25, AC41, AC45, AC46 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-FIN-02

**FEAT-FIN-02 — Portfolio and gym financial oversight**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Owner/delegated manager filters finances |
| Preconditions | Authorised gyms/fields, agreed definitions and data completeness |
| Ordered journey / checkpoints | Select period/gym/category → show income/cost/arrears → compare → drill to source → assign exception action |
| Source records / result / handoff | Same metric definitions across dashboard/report/AI; expense versus replacement basis configured |
| Exception / decision branch | Profit unavailable/incomplete without costs/basis; brand logo never chooses billing entity; no statutory accounts claim |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC25, AC41, AC45, AC46 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-FIN-03

**FEAT-FIN-03 — Operational report and analytic review**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Management reviews membership/class/staff/facility/stock metrics |
| Preconditions | Permission-filtered sources, period and freshness |
| Ordered journey / checkpoints | Select catalogue measure → compute defined projection → show gaps → inspect evidence → act on owned source record |
| Source records / result / handoff | Report catalogue includes conversion/attendance/utilisation/coverage/training/overdue/downtime/stock |
| Exception / decision branch | Incomplete attendance or draft rota cannot be represented as certain inactivity/presence; recommendations not facts |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC25, AC41, AC45, AC46 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-FIN-04

**FEAT-FIN-04 — Export, AI report and optional scheduled delivery**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised user requests report output |
| Preconditions | Field/audience permission and approved output/delivery configuration |
| Ordered journey / checkpoints | Request → generate scoped job → recheck access → deliver link/result → audit/handle retry |
| Source records / result / handoff | Export uses same metrics/source IDs and current grants; approved schedule separately configured |
| Exception / decision branch | Old grant or email preference cannot authorise sensitive export; scheduled outbound reporting is not assumed first-release scope |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC25, AC41, AC45, AC46 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-FIN-05

**FEAT-FIN-01 — Partial, duplicate or misallocated payment resolution**

Exception/lifecycle subflow of WF-FIN-01; review finding GR10. Existing source-grounded behaviour is clarified; new policy alternatives are not approved.

| Contract | Required behaviour |
|---|---|
| Actors/trigger | Authorised finance reviews charges and collected/spent money |
| Preconditions | Authoritative original charges/invoices, payment amounts/currency, customer/supplier/gym/entity ownership and current allocations. |
| Authoritative outcome/handoff | Reconcile only to valid charge balances; identify unapplied/excess/wrong-source amounts, preserve adjustments and prevent separate service/POS paths collecting the same debt twice. |
| Exception/policy boundary | An unmatched amount is not automatic new revenue, automatic credit entitlement or permission to refund. Allocation and reconciliation approvals require explicit scope. |

Business checkpoints below describe behaviour, not mandatory API enum spellings. Each decision uses current delegated authority.

| Actor | Before/after checkpoint | Guard/action | Record and next owner | Failure/return path |
|---|---|---|---|---|
| Finance adapter/reviewer | Payment received → source matching | Verify entity/company/customer/currency and exact existing debt | Candidate allocations or unmatched-money exception | Do not match merely by display name, gym logo or free-text description |
| Trusted allocation command | Candidate → valid committed allocation | Check version, outstanding amount and concurrent allocation | Traceable partial/full allocation and remaining balance | Over-allocation/duplicate source event rejected or reviewed; no invisible rounding invention |
| Authorised finance role | Mismatch/excess → approved resolution | Investigate duplicate capture, wrong source or split payment and selected remedy | Versioned correction/unallocated amount/approved adjustment linked to originals | No silent overwrite of paid history or unapproved refund |
| Finance reporting | Corrected → reconciled | Recompute source balance, membership/PT/rent/job views and reports | Consistent receivables/payables and owned remaining exception | Repeated events do not create second revenue/payment/stock effect |

Planned acceptance: AC25, AC41, AC45, AC46, AC68. Operational decisions: DEC-GR-06. See [decision discussion](../decisions/operational-decisions.md).


## Dashboard and reporting definitions — 0.27

Use the [metric/reporting contract](../reporting/metric-contract.md) with canonical metric/report catalogues, source maps, setup inputs, synthetic worked reconciliation and planned acceptance. Figures and Orb use identical definitions and scope. Charges/credits/collections/refunds/reversals/allocations/costs are separate. Overlapping gym membership rows cannot be summed as company distinct people. Missing costs/basis are unavailable/incomplete, not zero/profit. Old generic report-catalogue-to-be-prepared wording now means OpenKBS maps the supplied product catalogue to actual schema/providers/queries and verifies it; do not replace settled definitions silently.
