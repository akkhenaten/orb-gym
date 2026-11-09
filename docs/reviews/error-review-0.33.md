# Third review — undiscovered error search, 0.33

7November2026. Scope: cross-module lifecycle recovery and negative-path completeness in 0.32. Six further workflow defects/ambiguities and one validation blind spot identified. The first and second review corrections remain intact.

| ID | Severity | Finding | Correction |
|---|---|---|---|
| REV3-01 | High | Membership could be reinstated but the SUSPENDED entitlement dimension had no restoration path. | Add guarded source-backed suspended-grant restoration within original current eligible purpose/window; never revive expired/revoked rights or cancelled bookings. |
| REV3-02 | High | Transfer had no direct full-receipt or EXCEPTION resolution path; partial receipt allowed the full remainder; approved discrepancy could be labelled RECEIVED. | Explicit full/partial/exception/recovery/draft-cancel branches and separate RESOLVED_WITH_ADJUSTMENT. Physical receipt, loss and actual origin return quantities/effects distinct. |
| REV3-03 | High | Negative delivery results after provider ACCEPTED/UNKNOWN lacked transitions; configured scheduler retry had only an operator-permission transition. | Authenticated late-failure paths with exact attempt correlation, preserved evidence, and separate policy-bound scheduler retry. Unknown submission never blind-resends; stale old attempt cannot regress newer delivery. |
| REV3-04 | High | Same hr.record_training action submitted and accepted credential evidence, weakening explicit upload-versus-verification separation. | Separate own assigned evidence submission and actual delegated review grants; keep SOP acknowledgement distinct and expired evidence linked to reviewed renewal. |
| REV3-05 | High | A definitively failed tender left Sale TENDER_PENDING without a safe editable-basket return. | Proof-bound draft reset only when all tenders definitely failed and no funds/unknown/fulfilment; retain source debt/history and require fresh authorised next attempt. |
| REV3-06 | Medium | Application withdrawal existed only from SUBMITTED, leaving pre-approval draft/information/review stages without that actor path. | Actual subject withdrawal paths close prompts while preserving evidence/financial obligations; approved membership uses its own lifecycle. |
| REV3-07 | Medium | Earlier validators checked that every state was mentioned but not that selected nonterminal/recovery states had safe usable outcomes. | Add targeted recovery-path assertions, quantity/outcome/source-window fixtures and negative probes, alongside earlier checks. |

Current baseline now has 233 transitions in the existing 40 dimensions; the transfer dimension adds adjusted-resolution and draft-cancel outcomes. Original149 WF/134 feature/source IDs remain stable. Existing specialised catalogues retain scope; review is not a new product feature phase.

Evidence: all eleven documentation validators, isolated checkout and controlled mutations recorded in third-review-validation.json/repository-validation.md. Simplified fixture results do not establish runtime permissions, stock/entry restore, actual delivery evidence, medical/professional suitability, API isolation or transaction correctness. No claim every possible specification or implementation error has been eliminated.
