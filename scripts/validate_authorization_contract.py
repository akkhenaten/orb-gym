#!/usr/bin/env python3
"""Canonical authorisation references and synthetic design propositions, not a runtime policy engine."""
from pathlib import Path
import json,sys
R=Path(__file__).resolve().parents[1]
def read(p):return json.loads(p.read_text())
trans=read(R/'docs/data/transitions.json')['transitions'];permissions=read(R/'docs/access/permission-catalogue.json')['permissions'];pids={p['permission_id'] for p in permissions};bycmd={t['command']:t for t in trans};errors=[]
def ck(v,m):
 if not v:errors.append(m)
for p in permissions:ck('same active workspace' not in p['record_scope'],'Blanket active-workspace scope remains '+p['permission_id'])
for t in trans:
 a=t.get('authorization',{});mode=a.get('mode');ck(t.get('authorization_is_authoritative') is True,'Noncanonical transition authorisation '+t['transition_id'])
 ck(mode in ['permission_all_of','verified_source_actor','context_routes'],'Unknown authorisation mode')
 if mode=='permission_all_of':
  ck(bool(a.get('requires_all')) and set(a['requires_all'])<=pids,'Invalid all-of permission')
  ck(set(t.get('required_all_permissions',[]))==set(a['requires_all']),'Legacy all-of index conflicts '+t['transition_id'])
 elif mode=='verified_source_actor':
  ck(t['permission_id'] is None and bool(a.get('proof_rule')) and bool(a.get('proof_constraints')),'Missing actual source proof')
 else:
  ck(t['permission_id'] is None and 'source_permission_variants' not in t,'Conflicting default/alternate permission '+t['transition_id'])
  ck(a.get('unknown_context')=='deny_unmapped' and bool(a.get('selector')),'Unmapped context does not deny')
  ck(set(a.get('always_requires_all',[]))<=pids,'Unknown common route permission')
  for route in a.get('routes',[]):
   kind=route.get('actor_kind')
   if kind=='permission_holder':ck(bool(route.get('requires_all')) and set(route['requires_all'])<=pids,'Invalid exact route grants')
   elif kind=='verified_source_service':ck(bool(route.get('proof_rule')) and bool(route.get('parent_evidence_semantics')),'Missing source-service parent semantics')
   else:ck(kind=='unmapped_blocked','Unknown route actor kind')
for c in ['OpenPTDisruption','ResolvePTDisruption']:ck(bycmd[c]['authorization'].get('requires_all')==['coaching.manage_service_disruption'],'PT booking incorrectly manages service')
ck(set(bycmd['CancelPTWithRemedy']['authorization'].get('requires_all',[]))=={'coaching.manage_service_disruption','coaching.cancel_appointment'},'PT remedy lacks independent authority')
manual=next(r for r in bycmd['SubmitPaymentAttempt']['authorization']['routes'] if r['context']=='manual_customer_collection')
ck(manual['requires_all']==['finance.collect_customer_payment'],'Payment setup incorrectly authorises collection')
policy=read(R/'docs/access/policy-contract.json');ck(set(policy.get('lifecycle_scope_contract',{}).get('action_classes',{}))=={'new_operation','retained_history_read','resolution_or_recovery','trusted_source_evidence'},'Lifecycle access classes incomplete')
# Evaluate only supplied synthetic permission sets/proof booleans against the declarative shapes.
# Source truth, identity, consent, relationship, field/scope and provider proofs are NOT implemented here.
fixtures=read(R/'docs/reviews/second-review-fixtures.json')['authorization_cases']
for f in fixtures:
 a=bycmd[f['command']]['authorization'];grants=set(f['permissions']);allow=False
 if f['guards']:
  if a['mode']=='permission_all_of':allow=set(a['requires_all'])<=grants
  elif a['mode']=='context_routes':
   route=next((r for r in a['routes'] if r['context']==f.get('context')),None)
   if route and set(a.get('always_requires_all',[]))<=grants:
    if route['actor_kind']=='permission_holder':allow=set(route['requires_all'])<=grants
    elif route['actor_kind']=='verified_source_service':allow=f.get('source_proof',False)
   if f.get('dependent_payment'):allow=allow and 'family.pay_for_dependent' in grants and f.get('pay_right_verified',False)
 observed='ALLOW_CONTRACT' if allow else 'DENY';ck(observed==f['expected'],'Synthetic authorisation case mismatch '+f['id'])
print(json.dumps({'package_edition':'0.32','transitions_checked':len(trans),'permission_definitions':len(permissions),'synthetic_rule_propositions':len(fixtures),'errors':errors,'real_scope_identity_provider_consent_or_api_tested':False},indent=2));sys.exit(bool(errors))
