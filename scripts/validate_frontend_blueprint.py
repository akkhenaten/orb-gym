#!/usr/bin/env python3
from pathlib import Path
import re as _edition_re
_PACKAGE_ROOT=Path(__file__).resolve().parents[1]
_PACKAGE_EDITION=_edition_re.search(r'0\.\d+',(_PACKAGE_ROOT/'CURRENT_BASELINE.md').read_text().splitlines()[0]).group(0)
"""Structural design checks, not browser or accessibility certification."""
from pathlib import Path
import json,sys
R=Path(__file__).resolve().parents[1]; D=R/'docs/design'
def read(p):return json.loads(p.read_text())
s=read(D/'screen-inventory.json'); c=read(D/'component-catalogue.json'); t=read(D/'theme-tokens.json'); w=read(R/'docs/workflows/catalogue.json')['workflows'];m=read(D/'workflow-screen-coverage.json')['workflows']
errors=[]
def ck(v,msg):
 if not v:errors.append(msg)
sids={x['screen_id'] for x in s['screens']};cids={x['component_id'] for x in c['components']};wids={x['workflow_id'] for x in w}
ck(len(sids)==len(s['screens']),'Duplicate screen IDs');ck(len(cids)==len(c['components']),'Duplicate components')
ck({x['workflow_id'] for x in m}==wids,'Missing workflow map');ck(len(m)==len(w),'Duplicate workflow map')
ck({x['workflow_id'] for x in s['workflow_action_variants']}==wids,'Missing action variant')
for x in s['screens']:
 ck(set(x['components'])<=cids,'Unknown component '+x['screen_id']);ck(set(x['workflow_ids'])<=wids,'Unknown workflow')
for x in m:ck(bool(x['screen_ids']) and set(x['screen_ids'])<=sids,'Invalid mapped screen')
ck({(x['preset_id'],x['mode']) for x in t['themes']}=={(p,mo) for p in [x['preset_id'] for x in read(D/'style-options.json')['presets']] for mo in ['light','dark']},'Missing theme mode')
def lum(h):
 vals=[int(h[i:i+2],16)/255 for i in [1,3,5]];v=[a/12.92 if a<=.04045 else ((a+.055)/1.055)**2.4 for a in vals];return sum(a*b for a,b in zip(v,[.2126,.7152,.0722]))
def contrast(a,b):
 a,b=sorted([lum(a),lum(b)]);return (b+.05)/(a+.05)
ratios=[]
for th in t['themes']:
 sem=th['semantic']
 for a,b in [('text','surface'),('textMuted','surface'),('actionText','action'),('selectedText','selectedSurface'),('danger','surface'),('success','surface'),('warning','surface'),('link','surface')]:
  r=contrast(sem[a],sem[b]);ratios.append({'preset':th['preset_id'],'mode':th['mode'],'pair':a+'/'+b,'ratio':round(r,2)});ck(r>=4.5,'Low selected text contrast '+str(ratios[-1]))
 for ref in th['components'].values():
  typ,key=ref.split('.');ck(typ=='semantic' and key in sem,'Unresolved alias '+ref)
import hashlib
integrity=read(R/'docs/baselines/source-integrity.json')
for entry in integrity['files']:
 ck(hashlib.sha256((R/entry['path']).read_bytes()).hexdigest()==entry['sha256'],'Changed preserved source '+entry['path'])
current=read(R/'docs/workflows/catalogue.json');current.pop('edition',None)
for item in current['workflows']:
 item.pop('access_clarification_ids',None);item.pop('permission_contract',None)
ck(hashlib.sha256(json.dumps(current,sort_keys=True,separators=(',',':')).encode()).hexdigest()==integrity['workflow_business_sha256'],'Changed original workflow business contract')
result={'validator_contract_version':'0.31','screens':len(sids),'components':len(cids),'workflow_action_variants':len(m),'resolved_theme_modes':len(t['themes']),'selected_contrast_pairs':ratios,'errors':errors,'evidence_scope':'Structural references and selected token text pairs only. No browser, keyboard, screen reader, final-font or user testing.'}
print(json.dumps(result,indent=2));sys.exit(bool(errors))
