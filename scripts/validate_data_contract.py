#!/usr/bin/env python3
from pathlib import Path
import re as _edition_re
_PACKAGE_ROOT=Path(__file__).resolve().parents[1]
_PACKAGE_EDITION=_edition_re.search(r'0\.\d+',(_PACKAGE_ROOT/'CURRENT_BASELINE.md').read_text().splitlines()[0]).group(0)
"""Cross-reference/guard completeness checks; no runtime state engine tested."""
from pathlib import Path
import json,csv,sys
R=Path(__file__).resolve().parents[1];P=R/'docs/data'
def read(p):return json.loads(p.read_text())
ents=read(P/'entity-catalogue.json')['entities'];rels=read(P/'relationships.json')['relationships'];machines=read(P/'state-machines.json')['machines'];trs=read(P/'transitions.json')['transitions'];maps=read(P/'workflow-record-map.json')['workflows'];wids={w['workflow_id'] for w in read(R/'docs/workflows/catalogue.json')['workflows']};perms={p['permission_id'] for p in read(R/'docs/access/permission-catalogue.json')['permissions']};eids={e['entity_id'] for e in ents};mids={m['machine_id'] for m in machines};errors=[]
def ck(v,m):
 if not v:errors.append(m)
ck(len(eids)==len(ents),'Duplicate entities');ck(len(mids)==len(machines),'Duplicate machines');ck(len({t['transition_id'] for t in trs})==len(trs),'Duplicate transitions')
for rel in rels:ck(rel['from_entity'] in eids and rel['to_entity'] in eids and bool(rel['scope_rule']),'Invalid relationship '+rel['relationship_id'])
for m in machines:
 ck(m['entity_id'] in eids,'Unknown state entity');ck(m['initial_state'] in m['states'],'Unknown initial state');ck(len(set(m['states']))==len(m['states']),'Duplicate state')
 used=set()
 for t in trs:
  if t['machine_id']==m['machine_id']:used.update([t['from_state'],t['to_state']])
 ck(set(m['states'])<=used,'Unspecified declared states '+m['machine_id']+': '+str(set(m['states'])-used))
for t in trs:
 machine=next((m for m in machines if m['machine_id']==t['machine_id']),None)
 ck(machine is not None and t['from_state'] in machine['states'] and t['to_state'] in machine['states'],'Invalid transition state '+t['transition_id'])
 auth=t.get('authorization',{})
 ck(auth.get('mode') in ['permission_all_of','verified_source_actor','context_routes'],'Unknown transition authority '+t['transition_id'])
 if auth.get('mode')=='permission_all_of':
  ck(bool(auth.get('requires_all')) and set(auth['requires_all'])<=perms,'Unknown required permission '+t['transition_id'])
 elif auth.get('mode')=='verified_source_actor':
  ck(bool(auth.get('proof_rule')) and bool(auth.get('proof_constraints')),'Missing verified source proof '+t['transition_id'])
 elif auth.get('mode')=='context_routes':
  ck(t['permission_id'] is None and auth.get('unknown_context')=='deny_unmapped' and bool(auth.get('selector')),'Unsafe route fallback '+t['transition_id'])
  contexts=[r.get('context') for r in auth.get('routes',[])]
  ck(bool(contexts) and len(contexts)==len(set(contexts)),'Missing/duplicate context '+t['transition_id'])
  for route in auth.get('routes',[]):
   if route.get('actor_kind')=='permission_holder':
    ck(bool(route.get('requires_all')) and set(route['requires_all'])<=perms,'Unknown route permission '+t['transition_id'])
   elif route.get('actor_kind')=='verified_source_service':
    ck(bool(route.get('proof_rule')) and set(route.get('parent_permission_evidence',[]))<=perms,'Missing route source proof '+t['transition_id'])
   else:ck(route.get('actor_kind')=='unmapped_blocked','Unknown actor route '+t['transition_id'])
 for k in ['preconditions','authoritative_changes_and_effects','concurrency','invalid_or_repeated','failure_recovery','audit']:ck(bool(t[k]),'Missing transition contract '+t['transition_id']+' '+k)
 for variant,permission in t.get('source_permission_variants',{}).items():
  if not permission.startswith('Resolve to '):ck(permission in perms,'Unknown source permission variant '+permission)
ck({w['workflow_id'] for w in maps}==wids and len(maps)==len(wids),'Missing workflow record mapping')
for w in maps:
 ck(bool(w['entity_ids']) and set(w['entity_ids'])<=eids,'Invalid workflow entities');ck(bool(w['machine_ids']) and set(w['machine_ids'])<=mids,'Invalid workflow machines')
with (P/'transition-matrix.csv').open() as f:rows=list(csv.DictReader(f))
ck(len(rows)==len(trs),'Transition CSV count mismatch')
for row,t in zip(rows,trs):ck(all(row[k]==(json.dumps(t[k],sort_keys=True) if isinstance(t[k],dict) else str(t[k] if t[k] is not None else '')) for k in row),'CSV mismatch '+t['transition_id'])
commands=read(P/'command-index.json')['commands'];tids={t['transition_id'] for t in trs};ck({ident for c in commands for ident in c['transition_ids']}==tids,'Command index missing transition')
source=read(P/'source-map.json')
for p in source['specification_paths']+source['contract_paths']:ck((R/p).is_file(),'Missing source path '+p)
for ident in source['acceptance_ids']:ck(ident in (P/'acceptance.md').read_text(),'Missing planned case '+ident)
print(json.dumps({'package_edition': _PACKAGE_EDITION, 'validator_contract_version': '0.28','core_logical_entities':len(ents),'core_relationships':len(rels),'state_dimensions':len(machines),'guarded_transitions':len(trs),'logical_commands':len(commands),'mapped_workflows':len(maps),'planned_acceptance_cases':28,'errors':errors,'runtime_database_or_state_engine_tested':False,'actual_board_cards_created':False},indent=2));sys.exit(bool(errors))
