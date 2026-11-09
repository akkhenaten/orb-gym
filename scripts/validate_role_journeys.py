#!/usr/bin/env python3
"""Validate proposed role/default journeys, not deployed application authorisation."""
import csv,json,sys
from pathlib import Path
R=Path(__file__).resolve().parents[1]
def read(p):return json.loads((R/p).read_text())
errors=[]
def ck(ok,msg):
 if not ok:errors.append(msg)
t={x['command']:x for x in read('docs/data/transitions.json')['transitions']}
rows=list(csv.DictReader((R/'docs/access/role-permission-matrix.csv').open()));m={x['permission_id']:x for x in rows}
def granted(p,r):return m.get(p,{}).get(r,'').startswith('PROPOSED')
a=t['StartAssignedWork'];ck(a['authorization'].get('requires_all')==['work.start_assigned'] and a['permission_id']=='work.start_assigned','Assigned work requires separate start permission')
for role in ['cleaner','vendor-operative']:
 for p in ['work.start_assigned','work.submit_completion']:ck(granted(p,role),role+' cannot progress assigned work: '+p)
 for p in ['work.edit','work.verify_completion']:ck(not granted(p,role),role+' gained broad edit/verification')
a=t['SubmitTask'];auth=a['authorization'];routes={x['context']:x for x in auth.get('routes',[])}
ck(auth.get('mode')=='context_routes' and auth.get('unknown_context')=='deny_unmapped' and a.get('permission_id') is None,'Fault reporting route lacks explicit context boundary')
for ctx,p in [('limited_fault_reporter','work.report_fault'),('internal_work_author','work.create')]:ck(routes.get(ctx,{}).get('requires_all')==[p],'Wrong reporting route '+ctx)
f=a.get('reporter_field_contract',{});allowed=set(f.get('allowed_reporter_inputs',[]));forbidden={'assignee','parent_id','dependencies','approval','quote','invoice','cost','private_audience','internal_note'}
ck(allowed=={'description','permitted_asset_reference','permitted_area_reference','own_evidence_upload_references'},'Reporter input allowlist widened or missing')
ck(forbidden.issubset(set(f.get('forbidden_reporter_controls',[]))) and not allowed.intersection(forbidden),'Reporter controls internal fields')
ck({'task_type','triage_queue','internal_audience','actual_reporter_identity'}.issubset(f.get('source_supplied',[])),'Reporter triage not source-owned')
ck(granted('work.report_fault','member') and not granted('work.create','member'),'Member lacks limited report or gains internal create')
s=read('docs/access/self-service-contract.json')
roles=[r for r in rows[0] if r not in ['permission_id','platform-admin','company-owner','status_and_guard']]
for role in roles:
 for p in s['account_self_service']['permissions']:ck(granted(p,role),'Missing account self service '+role+' '+p)
for role in ['senior-management','local-gym-manager','supervisor','payroll-admin','finance','hr','membership','reception','cleaner','coach-employed']:
 for p in s['assigned_staff_self_service']['permissions']:ck(granted(p,role),'Missing own employment service '+role+' '+p)
ck('without requiring active paid membership' in s['account_self_service']['condition'],'Self service tied to paid membership')
ck('Actual own current employment/onboarding' in s['assigned_staff_self_service']['condition'] and 'retained-history' in s['assigned_staff_self_service']['after_leaving'],'Employment/retained service boundary missing')
for old in read('docs/reviews/role-template-preservation-0.33.json')['preserved_delegated_rules']:ck(m.get(old['permission_id'],{}).get(old['role'],'').startswith(old['prior_proposed_scope']),'Delegated prior scope narrowed '+old['permission_id']+' '+old['role'])
expected={'self':['classes.cancel_booking'],'verified_guardian':['family.book','classes.cancel_booking'],'staff_other':['classes.book_other','classes.cancel_booking']}
for cmd in ['DeclineOffer','WithdrawBookingRequest']:
 a=t[cmd];au=a['authorization'];rs={x['context']:x for x in au.get('routes',[])}
 ck(au.get('mode')=='context_routes' and au.get('unknown_context')=='deny_unmapped' and a.get('permission_id') is None,'Unsafe actor route '+cmd)
 for ctx,ps in expected.items():ck(rs.get(ctx,{}).get('requires_all')==ps,'Missing actor authority '+cmd+' '+ctx)
source=read('docs/reviews/fourth-review-source-map.json');accept=(R/'docs/reviews/fourth-review-acceptance.md').read_text();wf={w['workflow_id'] for w in read('docs/workflows/catalogue.json')['workflows']}
# Paths and acceptance references must remain directly resolvable.
for ident in source['workflow_ids']:ck(ident in wf,'Missing workflow '+ident)
for p in source['contract_paths']:ck((R/p).is_file(),'Missing source contract '+p)
for x in source['acceptance_ids']:ck(x in accept,'Missing acceptance '+x)
print(json.dumps({'status':'FAIL' if errors else 'PASS','scope':'Proposed defaults and source contracts; assumes actual assignment/relationship proof, not app execution','errors':errors},indent=2))
sys.exit(bool(errors))
