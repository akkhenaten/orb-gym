#!/usr/bin/env python3
"""Targeted lifecycle and synthetic quantity/outcome checks, not app execution."""
from pathlib import Path
import json,sys
R=Path(__file__).resolve().parents[1]
def read(p):return json.loads(p.read_text())
trs=read(R/'docs/data/transitions.json')['transitions'];bycmd={t['command']:t for t in trs};errors=[]
def ck(v,m):
 if not v:errors.append(m)
def require(name,frm,to):
 t=bycmd.get(name,{})
 ck(t.get('from_state')==frm and t.get('to_state')==to,'Missing safe recovery path '+name)
 return t
restore=require('RestoreSuspendedServiceGrant','SUSPENDED','ACTIVE');rc=restore.get('restoration_contract',{})
ck(rc.get('requires_current_source_eligibility') is True and rc.get('extends_effective_window') is False and rc.get('revives_revoked_or_expired') is False and rc.get('restores_cancelled_bookings') is False,'Unsafe service-right restoration')
require('ReceiveFullTransfer','DISPATCHED','RECEIVED');require('ReportPartialTransferDiscrepancy','PART_RECEIVED','EXCEPTION');require('ReceivePartOfExceptionRemainder','EXCEPTION','PART_RECEIVED');require('ReceiveAllExceptionRemainder','EXCEPTION','RECEIVED')
adjust=require('ResolveTransferWithApprovedAdjustment','EXCEPTION','RESOLVED_WITH_ADJUSTMENT');ac=adjust.get('quantity_resolution_contract',{})
ck(ac.get('source_deducted_again') is False and ac.get('discrepancy_does_not_create_destination_stock') is True,'Adjustment duplicates stock effect')
for c in ['ReceivePartialTransfer','ReceivePartOfExceptionRemainder']:ck(bycmd[c].get('quantity_guard',{}).get('comparison')=='strictly_less_than_remaining','Partial receipt includes full remaining quantity '+c)
for c in ['ReceiveFullTransfer','CompleteStockReceipt','ReceiveAllExceptionRemainder']:
 q=bycmd[c].get('quantity_guard',{});ck(q.get('final_physical_received_equals_dispatched') is True and q.get('writeoff_is_receipt') is False,'Received outcome conflates actual receipt with loss '+c)
require('CancelUndispatchedTransfer','DRAFT','CANCELLED');ck(bycmd['CancelUndispatchedTransfer'].get('quantity_guard',{}).get('no_stock_effects') is True,'Draft cancellation mutates stock')
for frm in ['ACCEPTED','UNKNOWN']:
 for kind,state in [('Transient','TRANSIENT_FAILURE'),('Permanent','PERMANENT_FAILURE')]:
  name='Record'+kind+'FailureFrom'+frm.title();t=require(name,frm,state);guard=t.get('delivery_failure_contract',{})
  ck(guard.get('definitive_evidence_required') is True and guard.get('must_match_current_attempt_for_state_transition') is True and guard.get('old_evidence_retained') is True,'Delivery failure lacks current attempt proof '+name)
retry=require('RequeueConfiguredDeliveryRetry','TRANSIENT_FAILURE','QUEUED');guard=retry.get('configured_retry_contract',{})
ck(retry.get('authorization',{}).get('mode')=='verified_source_actor' and guard.get('requires_published_policy') is True and guard.get('unknown_outcome_is_not_retryable') is True and guard.get('replays_business_command') is False,'Unsafe automatic retry authority')
for c in ['SubmitTrainingEvidence','ResubmitTrainingEvidence']:ck(bycmd[c]['authorization'].get('requires_all')==['hr.submit_training_evidence'],'Training submit authority incorrectly grants review')
for c in ['ReviewTrainingEvidence','ReturnTrainingEvidence']:ck(bycmd[c]['authorization'].get('requires_all')==['hr.review_training_evidence'],'Training record/upload authority incorrectly verifies credentials')
failed=require('ReturnBasketAfterDefinitiveTenderFailure','TENDER_PENDING','DRAFT');fc=failed.get('tender_failure_contract',{})
ck(fc.get('requires_all_tenders_definitively_failed') is True and fc.get('confirmed_or_unknown_funds_forbid_draft') is True and fc.get('preserves_original_attempts_and_debt') is True and fc.get('stock_effects') is False,'Unsafe failed-tender draft recovery')
for frm,name in [('DRAFT','WithdrawDraftApplication'),('ACTION_REQUIRED','WithdrawApplicationAwaitingInformation'),('UNDER_REVIEW','WithdrawApplicationUnderReview')]:
 t=require(name,frm,'WITHDRAWN');wc=t.get('application_withdrawal_contract',{})
 ck(wc.get('preapproval_only') is True and wc.get('actual_subject_or_authorised_actor') is True and wc.get('retains_evidence_and_financial_obligations') is True and wc.get('automatic_refund_or_account_deletion') is False,'Unsafe applicant withdrawal '+name)
fx=read(R/'docs/reviews/third-review-fixtures.json')
for f in fx['restore_cases']:
 state='ACTIVE' if f['state']=='SUSPENDED' and f['eligible'] and f['resolved'] and f['unexpired'] else 'DENY';ck(state==f['expected'],'Restore proposition mismatch '+f['id'])
for f in fx['transfer_cases']:
 source=f['source_initial']-f['dispatched']+f['returned_to_origin'];dest=f['received'];transit=f['dispatched']-dest-f['approved_loss']-f['returned_to_origin']
 state='RECEIVED' if dest==f['dispatched'] else 'RESOLVED_WITH_ADJUSTMENT' if transit==0 and (f['approved_loss'] or f['returned_to_origin']) else 'PART_RECEIVED'
 ck((source,dest,transit,state)==(f['expected_source'],f['expected_destination'],f['expected_transit'],f['expected_state']),'Stock proposition mismatch '+f['id'])
 ck(source+dest+transit+f['approved_loss']==f['source_initial'],'Source quantity not conserved '+f['id'])
for f in fx['delivery_cases']:
 state='HISTORY_ONLY' if not f['same_attempt'] else 'PERMANENT_FAILURE' if f['state'] in ['ACCEPTED','UNKNOWN'] and f['definitive_failure'] else 'AWAIT_EVIDENCE';ck(state==f['expected'],'Delivery proposition mismatch '+f['id'])
for f in fx['tender_cases']:
 state='DRAFT' if f['all_failed'] and not f['funds'] and not f['unknown'] and not f['fulfilment'] else 'RECONCILIATION_REQUIRED';ck(state==f['expected'],'Tender proposition mismatch '+f['id'])
for f in fx['withdrawal_cases']:
 state='WITHDRAWN' if f['state'] in ['DRAFT','SUBMITTED','ACTION_REQUIRED','UNDER_REVIEW'] and f['actual_subject'] else 'DENY_USE_SOURCE_LIFECYCLE';ck(state==f['expected'],'Withdrawal proposition mismatch '+f['id'])
print(json.dumps({'package_edition':'0.33','transitions_checked':len(trs),'synthetic_recovery_propositions':sum(len(fx[k]) for k in ['restore_cases','transfer_cases','delivery_cases','tender_cases','withdrawal_cases']),'errors':errors,'real_inventory_entry_qualification_provider_or_api_tested':False},indent=2));sys.exit(bool(errors))
