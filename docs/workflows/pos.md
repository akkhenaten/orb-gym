# POS, Till, Inventory and Receipts

Repository 0.21. 9 source-backed primary and exception workflows for this domain. IDs are stable feature/workflow references, not delivery-card sequence numbers.

## Sources and receiving specifications

[06-pos-and-inventory.md](../modules/06-pos-and-inventory.md)

[pos-stock](../../spec/pos-stock.md); [finance-reports](../../spec/finance-reports.md)

Planned cross-module acceptance: AC26, AC27, AC28, AC45, AC47. Decision references: GAP02, GAP08, GAP09, GAP13, GAP14. Read the [common contract](README.md#common-workflow-contract).

## Module surface, state boundaries and ownership

Till/basket/tender, product/barcode catalogue, gym inventory, returns, receipt delivery and cash-shift reconciliation.

Basket/tender pending/confirmed/failed/uncertain, completed sale/refund/credit; stock receipt/dispatch/in-transit/receipt/adjustment distinct.

Authorised till/stock operator → payment adapter/reconciliation owner → receipt recipient; manager/finance reviews exceptions and reversals.

The lifecycle words below are business checkpoints. The builder must resolve exact enum values and actor/action/field tables before implementation, with all open policy branches retained. Existing authority and source-specific review rules apply; no new approval gate or access right is created merely by this catalogue.

## WF-POS-01

**FEAT-POS-01 — Product catalogue and barcode setup**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised stock/till user adds item |
| Preconditions | SKU/barcode, description/category, price/tax configuration and gym availability |
| Ordered journey / checkpoints | Create/link barcode → validate → set versioned price as designed → make sellable |
| Source records / result / handoff | Product lookup uses one controlled item definition; optional cost/photo |
| Exception / decision branch | Unknown/duplicate barcode needs authorised resolution; arbitrary cashier change cannot alter all historical sales |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC26, AC27, AC28, AC45, AC47 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-POS-02

**FEAT-POS-02 — Receive live stock and adjustments**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised user adds batch quantity or repeated scan |
| Preconditions | Product, gym/location and permitted movement reason |
| Ordered journey / checkpoints | Scan item → enter quantity (e.g. 20) or repeated scans → confirm receipt → update balance/history |
| Source records / result / handoff | Append-only gym stock movements; batches/expiry/damage where configured |
| Exception / decision branch | Duplicate submission cannot add quantity twice; corrections retain reversal/reason rather than erasing history |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC26, AC27, AC28, AC45, AC47 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-POS-03

**FEAT-POS-03 — Basket and confirmed tender sale**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Till user sells stocked items or permitted services |
| Preconditions | Applicable product/charge, quantity/price, member/anonymous context and tender capability |
| Ordered journey / checkpoints | Scan/search → basket → authorised discount/override → tender pending/confirmed → finalise → stock/cash effects |
| Source records / result / handoff | Sale/line/tender/payment and existing service charge links; one effective stock effect |
| Exception / decision branch | Uncertain terminal result reconciles before retry; split/partial/offline options require explicit scope/policy |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC26, AC27, AC28, AC45, AC47 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-POS-04

**FEAT-POS-04 — One-off description sale**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised till user records unstocked service/item |
| Preconditions | Description, quantity, configured price/tax and permitted tender |
| Ordered journey / checkpoints | Add quick line → confirm totals → collect/record payment appropriately → issue receipt |
| Source records / result / handoff | Sale without inventing stock product or physical movement; optional member link |
| Exception / decision branch | Recording external payment differs from capturing it; quick sale cannot bypass approval/tax or create duplicate coaching debt |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC26, AC27, AC28, AC45, AC47 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-POS-05

**FEAT-POS-05 — Print, share and member-app receipt**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Till user issues transaction evidence |
| Preconditions | Confirmed source sale, recipient context, published brand/legal entity and device capability |
| Ordered journey / checkpoints | Generate frozen branded receipt → print/provide permitted delivery → place member receipt → reprint if needed |
| Source records / result / handoff | All outputs reference same transaction identity/issued snapshot |
| Exception / decision branch | Anonymous buyer need not be made a member; reprint/delivery never creates sale; printer failure keeps clear delivery status |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC26, AC27, AC28, AC45, AC47 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-POS-06

**FEAT-POS-06 — Refund, void and return to stock**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised manager/till user reverses transaction |
| Preconditions | Original lines/tender, reason, policy and rights |
| Ordered journey / checkpoints | Request → approve where required → refund/credit or pre-sale void → decide stock return → reconcile |
| Source records / result / handoff | Financial reversal and physical saleable stock movement separate; history preserved |
| Exception / decision branch | Returned damaged/expired item not automatically saleable; failed refund pending until reconciled; duplicate callback safe |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC26, AC27, AC28, AC45, AC47 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-POS-07

**FEAT-POS-07 — Stock transfer, count and low-stock review**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised inventory user moves/counts gym stock |
| Preconditions | Source/destination gym, quantity and movement permission |
| Ordered journey / checkpoints | Dispatch → in transit → receive; count → discrepancy → authorised adjustment; thresholds → review replenishment |
| Source records / result / handoff | Per-gym balance/movement and traceable shortages, not a duplicated received inventory |
| Exception / decision branch | Dispatch/receipt cannot both count available stock twice; valuation/expiry/threshold rules configured |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC26, AC27, AC28, AC45, AC47 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-POS-08

**FEAT-POS-08 — Till shift and financial reconciliation**

| Contract | Required behaviour |
|---|---|
| Actor / trigger | Authorised till/finance role closes shift |
| Preconditions | Opening float, confirmed tender records and count permissions |
| Ordered journey / checkpoints | Open shift → record sales/cash effects → count → compare expected → explain/approve variance → close/report |
| Source records / result / handoff | Cash movement, sales, refunds and stock valuation shown separately |
| Exception / decision branch | Incomplete/uncertain tender remains exception; cash drawers/multiple sessions/closing rules require chosen integration/policy |

Local acceptance: demonstrate the stated result and its exception branch, with current scoped access and truthful committed/pending/failed state. Apply the [common acceptance](README.md#common-acceptance-for-every-workflow) and AC26, AC27, AC28, AC45, AC47 where relevant. Record policy-dependent branches as blocked until their referenced choice is resolved.

## WF-POS-09

**FEAT-POS-03 — Tender succeeded but sale, stock or device confirmation failed**

Exception/lifecycle subflow of WF-POS-03; review finding GR10. Existing source-grounded behaviour is clarified; new policy alternatives are not approved.

| Contract | Required behaviour |
|---|---|
| Actors/trigger | Till user sells stocked items or permitted services |
| Preconditions | Original basket/operation/tender provider references, actual merchant, current stock/charge state and authorised till/finance reviewer. |
| Authoritative outcome/handoff | Recover the existing payment/sale operation; determine fulfilment/stock allocation or authorised financial remedy, with one effective charge and movement. |
| Exception/policy boundary | A payment, device response and inventory transaction are not one atomic external event. Never ask for a second charge just because the till failed to show its receipt. |

Business checkpoints below describe behaviour, not mandatory API enum spellings. Each decision uses current delegated authority.

| Actor | Before/after checkpoint | Guard/action | Record and next owner | Failure/return path |
|---|---|---|---|---|
| Till/payment adapter | Pending result → uncertain or confirmed tender | Retain operation and provider references; retrieve/reconcile authoritative status | Visible payment/sale exception, owned by till/finance | No blind retry capture from a failed UI, timeout or duplicated callback |
| Sale/stock coordinator | Paid/unfinalised → fulfilment decision-ready | Check committed sale and stock allocation/concurrent changes | One reconciled intent and actual availability | If item unavailable, expose exception rather than negative stock or fabricated completed sale |
| Authorised operator | Decision-ready → fulfilled or approved remedy | Apply explicit fulfilment/refund/alternative policy and rights | Sale/stock/financial adjustment with reason and correct receipt history | No automatic unauthorised refund/substitution; partial results remain assigned |
| Reconciliation owner | Recovered → verified | Check tender, source charge, movements, cash totals and delivered/reprint status | One source transaction and evidence of reconciliation | Receipt failure is delivery failure, not a new sale; repeated resolution cannot refund or deduct twice |

Planned acceptance: AC26, AC27, AC28, AC45, AC47, AC67. Operational decisions: DEC-GR-06. See [decision discussion](../decisions/operational-decisions.md).
