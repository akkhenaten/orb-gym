# pos and inventory

Detailed extracted scope from baseline 0.17. Read with product-architecture.md and decisions-and-open-items.md. Each source reference is traceable; no requirement is removed by this grouping.

# POS till and live stock

<!-- OG-SRC-0213 -->
Each gym has a role-controlled till with barcode or camera product lookup, search, basket quantities, configured pricing/tax treatment, discounts, cash/card or other configured tenders, receipts and authorised refunds. Support member-linked and anonymous sales. Exact terminal/payment-provider integration remains open; recording an external payment is distinct from capturing it.

<!-- OG-SRC-0214 -->
Create products with SKU/barcode, description, category, price, optional cost/photo and gym availability. Receive stock by scanning once and entering quantity (for example 20 bars) or repeated scans. Maintain stock per gym and an append-only movement ledger for receipts, sales, returns, damage, expiry, adjustments, transfers and stocktakes. Transfers track dispatch and receipt. Low-stock alerts and expiry/batch tracking apply where configured. An unknown barcode opens authorised product creation/linking.

<!-- OG-SRC-0215 -->
A quick sale accepts description, quantity and price without creating a stocked product. Restrict price overrides, discounts, voids and refunds by permission and record reasons. Refund and return-to-saleable-stock are separate choices.

<!-- OG-SRC-0216 -->
Confirm stock deductions with the sale’s successful tender outcome, using concurrency protection and idempotent payment events. Handle pending/ambiguous payments before retrying collection; prevent double charges and duplicate stock movements. Configure out-of-stock handling explicitly. End-of-day/till-shift reconciliation records opening float, expected cash, counted cash, differences and approval. Reports distinguish sales, cash movement, refunds and stock valuation; accounting treatment is configured separately.


