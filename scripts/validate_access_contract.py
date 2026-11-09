#!/usr/bin/env python3
from pathlib import Path
import re as _edition_re
_PACKAGE_ROOT=Path(__file__).resolve().parents[1]
_PACKAGE_EDITION=_edition_re.search(r'0\.\d+',(_PACKAGE_ROOT/'CURRENT_BASELINE.md').read_text().splitlines()[0]).group(0)
"""Documentation consistency checks, not a runtime policy engine."""
from pathlib import Path
import json,csv,sys,re
R=Path(__file__).resolve().parents[1];D=R/'docs/access'
def read(p):return json.loads(p.read_text())
roles=read(D/'role-catalogue.json')['roles'];perms=read(D/'permission-catalogue.json')['permissions'];policy=read(D/'policy-contract.json');mapping=read(D/'source-map.json')['clarifications'];wfs=read(R/'docs/workflows/catalogue.json')['workflows']
errors=[]
def ck(v,m):
 if not v:errors.append(m)
rids={r['role_id'] for r in roles};pids={p['permission_id'] for p in perms};wids={w['workflow_id'] for w in wfs}
ck(len(rids)==len(roles),'Duplicate role');ck(len(pids)==len(perms),'Duplicate permission')
ck({'platform-admin','company-owner','senior-management','local-gym-manager','payroll-admin'}<=rids,'Missing confirmed hierarchy')
ck(policy['default']=='deny' and set(policy['individual_effects'])=={'allow','deny'},'Invalid individual/default contract')
fields=set(re.findall(r'FLD-[A-Z-]+',(D/'field-access.md').read_text()))
for p in perms:
 ck(bool(p['workflow_ids']) and set(p['workflow_ids'])<=wids,'Invalid workflow mapping '+p['permission_id'])
 ck(bool(p['field_bundle_candidates']) and set(p['field_bundle_candidates'])<=fields,'Unknown field bundle '+p['permission_id'])
with (D/'role-permission-matrix.csv').open() as f:
 rows=list(csv.DictReader(f));header=set(rows[0])
ck(set(rids)<=header,'Matrix missing roles');ck({r['permission_id'] for r in rows}==pids and len(rows)==len(perms),'Matrix missing/duplicated permission')
for row in rows:
 if row['permission_id'].startswith('platform.'):
  ck(row['company-owner']=='DENY_PLATFORM_ROLE','Owner can assign platform authority')
for source in mapping:
 ck(set(source['workflow_ids'])<=wids,'Unknown clarification workflow')
 for p in source['specification_paths']+source['contract_paths']:ck((R/p).is_file(),'Missing contract '+p)
 for a in source['acceptance_ids']:ck(a in (D/'acceptance.md').read_text(),'Missing scenario '+a)
result={'package_edition': _PACKAGE_EDITION, 'validator_contract_version': '0.25','roles':len(roles),'logical_permissions':len(perms),'template_matrix_rows':len(rows),'source_clarifications':len(mapping),'planned_access_scenarios':22,'errors':errors,'runtime_enforcement_tested':False,'live_grants_changed':False}
print(json.dumps(result,indent=2));sys.exit(bool(errors))
