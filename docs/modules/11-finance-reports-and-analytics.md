# Finance, Reports and Analytics — Planning Detail

Review revision r1, source architecture 0.17. These requirements elaborate the founder's existing owner finance/reporting scope. They do not authorise a payroll engine, statutory accounts, new commercial rules or selected payment providers. Read with OG-SRC-0042, the Money/POS and Maintenance finance domains, coaching reporting and cross-module contracts.

## OG-REV-001 — Financial workspace and reconciliation

Provide company-wide and gym-filtered views with period, status and source-record drilldowns. Cover membership/PT/class charges, POS sales, rental-coach rent, refunds/credits, contractor expenses/commitments and available staffing costs. Charges, cash collected, outstanding amounts, allocation and costs remain distinct measures. Do not count both a coaching payment and its internal split as separate revenue.

The implementation specification must identify which module owns each charge, invoice, payment, credit, allocation and reconciliation status. Define service date, transaction date, payment date, gym attribution and currency/precision. A booking charge collected through POS must reference the existing charge rather than create a second independent debt. Finance consumes confirmed records; a manually uploaded receipt or bank screenshot is evidence awaiting verification.

Report receivables/arrears and outstanding supplier amounts from applicable authoritative records; drill down to the responsible membership, coach, supplier, job or transaction. Distinguish recorded external payments from provider-confirmed collection. Record reconciliation exceptions and their assigned owner. A split-payment event or retry must not over-allocate the source charge.

Decide company billing entities, currencies, tax/rounding treatment, cross-gym revenue attribution, cost allocation, accounting basis and accounting integration before treating reports as formal accounts. Do not infer the invoice issuer from a gym logo. Profit is unavailable or clearly incomplete until relevant costs and the calculation basis are established. Bank-feed connection and statutory filing are not silently included.

## OG-REV-002 — Report catalogue and metric definitions

OpenKBS must prepare a report catalogue, definition of each measure, source records, access scope, date basis, freshness and missing-data treatment. Cover these existing operational areas:

| Area | Expected reporting coverage |
|---|---|
| Membership and pipeline | Active/pending/frozen/cancelled status, conversion, renewals, failed/overdue collections and reviewed retention indicators. |
| Classes and PT | Bookings/capacity, attendance/no-shows, cancellations, coach delivery and applicable charges. |
| Staff | Planned versus actual cover/hours, leave, unfilled shifts, qualification/training expiry and available approved staffing costs. |
| Operations | Overdue/blocked tasks, completion versus verification, repeat faults, asset downtime, contractor commitments and costs. |
| Retail | Sales/refunds, tender reconciliation, stock movements/availability and valuation only under an agreed method. |
| Portfolio | Compare gyms consistently with period, definitions, data completeness and source drilldowns. |

Reports/exports must enforce role and field scope, including when generated asynchronously or by Orb. Define whether scheduled reports are in the first release; do not infer outbound mail authority from a dashboard action. Charts, exports and AI summaries use the same definitions and permission filters.

Plan acceptance for net sales versus receipts, partial payments, credits, shared invoices, cross-gym attribution and incomplete cost data. Synthetic examples must reconcile to source records; no invented financial precision or real customer values.
