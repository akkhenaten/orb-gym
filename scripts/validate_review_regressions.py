#!/usr/bin/env python3
from pathlib import Path
import re as _edition_re
_PACKAGE_ROOT=Path(__file__).resolve().parents[1]
_PACKAGE_EDITION=_edition_re.search(r'0\.\d+',(_PACKAGE_ROOT/'CURRENT_BASELINE.md').read_text().splitlines()[0]).group(0)
"""Cross-contract error regressions and synthetic design propositions; no app tests."""
from pathlib import Path
import json,sys
R=Path(__file__).resolve().parents[1];errors=[]
def ck(v,m):
 if not v:errors.append(m)
def strict_pairs(pairs):
 out={}
 for k,v in pairs:
  if k in out:raise ValueError('duplicate JSON key '+k)
  out[k]=v
 return out
def read(p):return json.loads(p.read_text(),object_pairs_hook=strict_pairs)
for p in R.rglob('*.json'):
 if '.git' in p.relative_to(R).parts or '__pycache__' in p.relative_to(R).parts:continue
 try:read(p)
 except (ValueError,TypeError) as e:errors.append(str(p.relative_to(R))+': '+str(e))
inv=read(R/'docs/design/screen-inventory.json');ss={s['screen_id']:s for s in inv['screens']};actions={a['workflow_id']:a for a in inv['workflow_action_variants']};coverage={a['workflow_id']:a for a in read(R/'docs/design/workflow-screen-coverage.json')['workflows']}
for sid,s in ss.items():
 ck(bool(s['workflow_ids']),'Screen missing workflow binding '+sid)
 for wid in s['workflow_ids']:ck(wid in actions and sid in actions[wid]['screen_ids'],'Screen/action links disagree '+sid+' '+wid)
 if s['domain']=='PUBLIC':ck(s.get('access_mode')=='public_approved_projection' and 'no workspace membership grant required' in s['permission_rule'].lower(),'Public route incorrectly requires customer role '+sid)
for wid,a in actions.items():
 ck(set(a['screen_ids'])<=set(ss),'Action references unknown screen '+wid)
 ck(wid in coverage and set(a['screen_ids'])==set(coverage[wid]['screen_ids']),'Action/coverage maps disagree '+wid)
 for sid in a['screen_ids']:
  if sid in ss:ck(wid in ss[sid]['workflow_ids'],'Action/screen reverse map missing '+wid+' '+sid)
themes=read(R/'docs/design/theme-tokens.json')['themes'];catalogue=read(R/'docs/design/token-catalogue.json')['tokens']
for theme in themes:
 if theme['preset_id']=='basic-01':ck(theme['typography']['bodyWeight']==500,'Basic source typography must use bodyWeight500')
 for group,values in theme.items():
  if not isinstance(values,dict):continue
  for key,val in values.items():
   matches=[x for x in catalogue if x['preset_id']==theme['preset_id'] and x['mode']==theme['mode'] and x['path']==group+'.'+key]
   ck(len(matches)==1 and matches[0]['value']==val,'Token catalogue differs from canonical value '+theme['preset_id']+' '+theme['mode']+' '+group+'.'+key)
trans=read(R/'docs/data/transitions.json')['transitions'];bycmd={t['command']:t for t in trans}
for name in ['RecordActualSignature','RecordPartialSignature']:
 guard=bycmd[name].get('signature_completion_contract',{})
 ck(guard.get('aggregate_signed_only_if')=='every_required_party_has_valid_evidence' and guard.get('empty_required_party_set')=='invalid_signature_request','Missing all-signers completion guard '+name)
ck(bycmd['RecordPartialSignature']['from_state']==bycmd['RecordPartialSignature']['to_state']=='AWAITING_SIGNATURE','Partial signature prematurely completes document')
ck(set(bycmd['CancelOtherPersonBooking'].get('required_all_permissions',[]))=={'classes.cancel_booking','classes.book_other'},'Staff cancellation must require cancel and other-person scope')
for name in ['ReserveClassPlace','JoinWaitlist','AcceptWaitlistOffer','AcceptOffer']:
 auth=bycmd[name].get('authorization',{})
 guardian=next((r for r in auth.get('routes',[]) if r.get('context')=='verified_guardian'),{})
 ck(guardian.get('requires_all')==['family.book'],'Guardian booking incorrectly uses self-book permission '+name)
 ck(auth.get('mode')=='context_routes' and auth.get('unknown_context')=='deny_unmapped','Ambiguous booking permission variant '+name)
ops=read(R/'docs/data/canonical-operations.json')['operations']
ck(len(ops)==3 and {c for op in ops for c in op['component_commands']}=={'AcceptOffer','AcceptWaitlistOffer','ApproveSourceDecision','ApproveQuoteVersion','RecordPartialSignature','RecordActualSignature'},'Missing paired-record canonical operation')
fixtures=read(R/'docs/reviews/review-regression-fixtures.json')['signature_cases']
for f in fixtures:
 signed={e['party'] for e in f['evidence'] if e['issue_hash']==f['issue_hash']}
 observed='INVALID_SIGNATURE_REQUEST' if not f['required'] else 'SIGNED' if set(f['required'])<=signed else 'AWAITING_SIGNATURE'
 ck(observed==f['expected'],'Signature contract fixture mismatch '+f['id'])
print(json.dumps({'package_edition':_PACKAGE_EDITION,'screen_bindings_checked':len(ss),'workflow_maps_checked':len(actions),'synthetic_signature_propositions_checked':len(fixtures),'errors':errors,'runtime_permissions_or_signatures_tested':False},indent=2));sys.exit(bool(errors))
