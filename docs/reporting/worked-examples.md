# Worked report reconciliation — synthetic only

All amounts here use fictional GBP values on one consistent unspecified tax-display basis. This does not select a real company's currency/tax/accounting policy. All listed flows are in one example period; actual date-boundary behaviour still needs runtime tests. Source IDs and raw facts are in [fixtures](synthetic-fixtures.json).

## Charge, cash and balance

Charges C1£100,C2£60,C3£50 total£210. Credit CR1£20 reduces charge activity to£190. Reviewed opening debt O1£40 is carried separately; it is not new-period charge or cash.

Incoming P1£100,P2£60,P3£30,P4£10 total£200. P1 callback occurs twice but references the same payment, so collections remain£200. Confirmed refund RF1£20 and confirmed reversal RV1£60 give net collections£120. Internal coach allocation£10 on C3 is not another customer collection.

Retained allocations: C1£100−£20=£80; C2£60−£60=£0; C3£30. Total£110. After charge credit, debt is£190+£40 opening=£230. Outstanding£230−£110=£120, comprising C2£60,C3£20 and opening£40. P4£10 remains unapplied, so net retained customer cash£120 = charge allocations£110 + unapplied£10. No double-adding reversal to debt.

Gym charge allocations: A£100+£30−£20=£110; B£60+£20=£80; total£190. C3's all-gym association does not duplicate its£50 into both gyms. The payment allocation and supplier cost allocation are separate facts, not new revenue.

## Supplier commitment and invoice

Approved quote£300, linked verified invoice£180, confirmed supplier payment£60. Open commitment£120; outstanding invoice£120. Invoice gym allocations£108+£72=£180. These are different measures: do not sum£300+£180+£60 as expenditure. Any future cash forecast can explicitly combine open commitment and unpaid verified invoice as its own defined obligation measure; it is not current expense/profit.

## People and class registers

Three active beneficiaries include one person with two active plans. Home gym counts A2+B1=3. Entitlement gym counts A2+B3=5 overlap, while company unique beneficiaries stay 3. Frozen/PT-only/guardian-only people are not active members merely because accounts exist.

Class capacity 10,confirmed bookings 8 -> booking utilisation 80%. Register: attended 5,no-show reviewed 1,unresolved 2. Reviewed attendance rate 5/6=83.33%, with register resolution 6/8=75% and 2 unresolved. Showing83.33% as attendance among all booked people without its denominator/coverage would mislead.

## Stock and missing cost

Gym A receives 20 bars; sells 3; physically returns 1 as sellable => 18 sellable units at gym A. A refund without physical return adds no stock. Dispatch 4 from gym A => gym A has 14, in transit 4. Gym B receives 2 => gym B has 2, in transit 2. Sellable network total 16; total including transit 18. Do not count dispatched units as available in both gyms.

Stock valuation is unavailable without approved cost/method. Profit is unavailable without agreed income/cost basis and required coverage, even though some collections and supplier amounts are known. Null/unavailable is not zero.

The documentation validator recomputes these arithmetic examples and checks source linkage. This is not execution against a built financial/stock system, provider or production database.
