# Recovery and negative-path corrections — 0.33

This third review follows actual successful/failed journeys, not just whether state names and IDs exist. Existing source/permission/payment/terms guards still apply. New transitions below fill specified workflows; they do not add new paid products or select business values.

## Membership and service-right restoration

ReinstateMembership restores the governing membership only after applicable review/payment/forms/current terms. A previously SUSPENDED purpose grant now has RestoreSuspendedServiceGrant to ACTIVE when the exact current restriction-resolution/source approval is committed and its existing window/person/gym/purpose remains eligible. Preserve previous restriction/evidence/version. Do not extend a trial/PT window, revive EXPIRED/REVOKED grants, recreate cancelled bookings or blindly reuse old policy. If old grant ended, use the normal new reviewed purpose grant, not restoration. Source eligibility is checked at command time even before projections refresh.

## Physical transfer truth

ReceivePartialTransfer requires positive actual receipt strictly less than remaining outstanding quantity. ReceiveFullTransfer handles direct complete receipt. CompleteStockReceipt/ReceiveAllExceptionRemainder sets RECEIVED only when cumulative actual destination receipt equals dispatched quantity, without loss adjustment substituting for missing goods. Every real receipt has one source movement identity.

A discrepancy can be opened from DISPATCHED or PART_RECEIVED. EXCEPTION has owned recovery: actual later arrival may receive part/all current remainder; an approved actual loss/damage/physical-return resolution ends as RESOLVED_WITH_ADJUSTMENT, never falsely RECEIVED. Loss resolution consumes in-transit quantity once without crediting destination or deducting source again. Actual return to origin credits source only on actual reviewed return/sellability evidence. Unknown remainder is not simply written off without configured source authority/evidence/limits. Draft cancellation is allowed only before any dispatch; in-transit goods need real receipt/return/adjustment, not undo UI.

Quantity equation per transfer line: dispatched = actual destination received + still in transit + approved loss/damage + evidenced returned-to-origin quantity. Show these separately, exact SKU/unit/source/destination/cost references and review status. This does not choose a valuation/tax/write-off approval limit.

Synthetic example, quantities per location not identifiers. Start: source 20, in transit 0, destination 0. Dispatch 4 => source 16, in transit 4, destination 0. Receive 2 => source 16, in transit 2, destination 2. Approve loss of 2 => source 16, in transit 0, destination 2, loss 2; status RESOLVED_WITH_ADJUSTMENT. Never record source 14 (a second deduction), destination 4 (a fake receipt), or RECEIVED for a loss. If all 4 physically arrive instead, the outcome is source 16, in transit 0, destination 4, status RECEIVED.

## Notifications after provider acceptance

Provider ACCEPTED is not delivered. Authenticated definitive transient/permanent failure can arrive from ACCEPTED or reconcile UNKNOWN, so these now have explicit failure transitions. Preserve the previous observation and actual attempt/provider evidence. Only matching current_attempt_id moves current attempt state; late evidence for an older attempt updates its history and cannot overwrite a newer delivered/current attempt. Contradictory supposedly terminal delivery evidence is an owned provider reconciliation issue, not blind status regression.

Manual RetryEligibleDelivery remains current notifications.retry_delivery authority. RequeueConfiguredDeliveryRetry is the separate trusted scheduler route, requiring actual published bounded policy, current source/recipient/purpose/preferences/deadline, supported provider mode and unique retry slot. Definitive failure may create a new controlled attempt identity as required by the provider while retaining the same logical notification/history. UNKNOWN is never treated as known failure just to permit a resend. No arbitrary intervals, unbounded loops or business payment/booking replay. Permanent failure remains owned operator work.

## Credential submission and review

hr.submit_training_evidence submits/resubmits own or explicitly assigned evidence. hr.review_training_evidence accepts/returns evidence under actual reviewer scope/applicability/issuer/expiry/independence rules. hr.record_training remains administrative record/applicability authority, not an automatic credential verification grant. Staff upload alone cannot declare qualified; SOP self-acknowledgement remains its separate actual intended-actor command. Reviewer competence is not created by a permission.

Expired evidence is retained. Renewal creates/assigns the current applicable requirement/version linked by renewal_of_requirement_id and fresh source evidence under ordinary REQUIRED -> SUBMITTED -> reviewed flow. Do not overwrite the expired certificate or treat a replacement upload as already accepted. Qualification expiry still creates owned impact review for future rota/classes/PT under existing policy.

## What the checks establish

Current recovery validator verifies required source paths, safe guards, authority separation and finite synthetic stock/restoration/delivery propositions. Earlier source/manifest/permission/signature tests remain active. These are specification checks, not a running inventory/entry/provider/credential system. OpenKBS must still bind actual schema/transaction/adapter/role/query state and execute concurrency, denied, stale/duplicate and restoration tests.


## Known failed tender and applicant withdrawal

A declined/definitively failed sale tender must not leave the basket permanently TENDER_PENDING. ReturnBasketAfterDefinitiveTenderFailure returns it to DRAFT only when every tender attempt is definitively failed, no funds/unknown result/fulfilment exists and exact provider source proof is current. Retain attempts and any existing unpaid service charge. A new tender requires fresh explicit operator/customer intent and attempt identity; no automatic recapture. Partial/confirmed/unknown outcome remains original reconciliation rather than draft reset.

Pre-approval applicants can withdraw while in DRAFT, SUBMITTED, ACTION_REQUIRED or UNDER_REVIEW using actual subject/authorised source identity and current version. Withdrawal closes obsolete application prompts, not the global account/actual debt/signature/receipt history. Financial remedies/deletion follow their own authority and retention policy. APPROVED/active membership uses membership/service lifecycle, not application withdrawal.
