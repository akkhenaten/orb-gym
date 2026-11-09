#!/usr/bin/env python3
from pathlib import Path
import re as _edition_re
_PACKAGE_ROOT=Path(__file__).resolve().parents[1]
_PACKAGE_EDITION=_edition_re.search(r'0\.\d+',(_PACKAGE_ROOT/'CURRENT_BASELINE.md').read_text().splitlines()[0]).group(0)
from pathlib import Path
import json,csv,sys
R=Path(__file__).resolve().parents[1];D=R/'docs/notifications'
def read(p):return json.loads(p.read_text())
events=read(D/'event-catalogue.json')['events'];wfs={w['workflow_id'] for w in read(R/'docs/workflows/catalogue.json')['workflows']};screens={s['screen_id'] for s in read(R/'docs/design/screen-inventory.json')['screens']};policy=read(D/'policy-settings.json');perms={p['permission_id'] for p in read(R/'docs/access/permission-catalogue.json')['permissions']};errors=[]
def ck(v,m):
 if not v:errors.append(m)
ck(len({e['event_id'] for e in events})==len(events),'Duplicate event IDs')
with (D/'event-matrix.csv').open() as f:rows=list(csv.DictReader(f))
ck(len(rows)==len(events),'CSV count mismatch')
for row,event in zip(rows,events):ck(all(row[k]==event[k] for k in row),'CSV differs from canonical JSON '+event['event_id'])
for e in events:
 ck(bool(e['workflow_ids']) and set(e['workflow_ids'])<=wfs,'Invalid workflows '+e['event_id'])
 ck(bool(e['candidate_screen_ids']) and set(e['candidate_screen_ids'])<=screens,'Invalid screens '+e['event_id'])
 for field in ['trigger','recipients','stop_or_supersede_condition','deep_link_contract','privacy','deduplication_key','reminder_policy','escalation_policy','delivery_recovery','read_ack_completion']:ck(bool(e[field]),'Missing field '+field)
ck(policy['values'] is None and policy['safe_defaults']['read_is_completion'] is False and policy['safe_defaults']['retry_is_business_command'] is False,'Invented setup values or incorrect semantic state')
for action in ['configure_policy','view_delivery_status','retry_delivery','manage_templates','edit_own_preferences']:ck('notifications.'+action in perms,'Missing communication permission')
source=read(D/'source-map.json')
for path in source['contract_paths']+source['specification_paths']:ck((R/path).is_file(),'Missing source map path')
for ident in source['acceptance_ids']:ck(ident in (D/'acceptance.md').read_text(),'Missing planned case '+ident)
print(json.dumps({'package_edition': _PACKAGE_EDITION, 'validator_contract_version': '0.26','notification_events':len(events),'event_domains':len({e['domain'] for e in events}),'planned_acceptance_cases':24,'errors':errors,'actual_provider_delivery_tested':False,'live_messages_sent':False},indent=2));sys.exit(bool(errors))
