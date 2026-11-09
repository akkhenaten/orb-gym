#!/usr/bin/env python3
from pathlib import Path
import re as _edition_re
_PACKAGE_ROOT=Path(__file__).resolve().parents[1]
_PACKAGE_EDITION=_edition_re.search(r'0\.\d+',(_PACKAGE_ROOT/'CURRENT_BASELINE.md').read_text().splitlines()[0]).group(0)
"""Setup catalogue/dependency/reference checks, not live readiness verification."""
from pathlib import Path
import json,csv,sys
R=Path(__file__).resolve().parents[1];P=R/'docs/setup'
def read(p):return json.loads(p.read_text())
sections=read(P/'section-catalogue.json')['sections'];caps=read(P/'capability-readiness.json')['capabilities'];ids={s['section_id'] for s in sections};policies={p['policy_id'] for p in read(R/'docs/policy-settings-contract.json')['policies']};errors=[]
def ck(v,m):
 if not v:errors.append(m)
ck(len(ids)==len(sections),'Duplicate sections');ck(len({c['capability_id'] for c in caps})==len(caps),'Duplicate capability')
byid={s['section_id']:s for s in sections}
for s in sections:
 ck(set(s['section_dependencies'])<=ids,'Unknown section dependency');ck((R/s['specification_path']).is_file(),'Missing section spec '+s['section_id'])
 ck(s['policy_contract_id'] is None or s['policy_contract_id'] in policies,'Unknown policy reference')
 for k in ['requirements','incomplete_behaviour','responsible_role','save_resume']:ck(bool(s[k]),'Missing section contract')
def walk(s,stack):
 if s in stack:errors.append('Section cycle '+s);return
 for dep in byid[s]['section_dependencies']:walk(dep,stack+[s])
for sid in ids:walk(sid,[])
for c in caps:
 ck(set(c['context_sections'])<=ids,'Unknown capability context');ck((R/c['specification_path']).is_file(),'Missing capability spec '+c['capability_id']);ck(bool(c['safe_independence_rule']) and bool(c['conditional_requirements']),'Missing conditional gate')
source=read(P/'source-map.json')
for p in source['contract_paths']+source['specification_paths']:ck((R/p).is_file(),'Missing setup source path')
for ident in source['acceptance_ids']:ck(ident in (P/'acceptance.md').read_text(),'Missing planned setup case')
with (R/'docs/delivery/remaining-inputs.csv').open() as f:inputs=list(csv.DictReader(f))
ck(len({i['input_id'] for i in inputs})==len(inputs)==13,'Invalid remaining input groups');ck(all(all(row.values()) for row in inputs),'Unowned remaining input')
ck((R/'CURRENT_BASELINE.md').is_file() and _PACKAGE_EDITION in (R/'BUILD_BRIEF.md').read_text().splitlines()[0],'Stale current entry point')
ck((R/'history/BUILD_BRIEF-v0.29.md').is_file(),'Previous accumulated brief not retained')
result={'package_edition': _PACKAGE_EDITION, 'validator_contract_version': '0.30','setup_sections':len(sections),'capability_gates':len(caps),'remaining_input_groups':len(inputs),'planned_setup_cases':20,'errors':errors,'actual_live_setup_or_provider_readiness_tested':False,'actual_target_project_or_board_inspected':False}
print(json.dumps(result,indent=2));sys.exit(bool(errors))
