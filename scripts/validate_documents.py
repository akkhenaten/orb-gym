#!/usr/bin/env python3
from pathlib import Path
import re as _edition_re
_PACKAGE_ROOT=Path(__file__).resolve().parents[1]
_PACKAGE_EDITION=_edition_re.search(r'0\.\d+',(_PACKAGE_ROOT/'CURRENT_BASELINE.md').read_text().splitlines()[0]).group(0)
"""Catalogue/field/layout/source checks only, not live legal/signing/render tests."""
from pathlib import Path
import json,csv,sys
R=Path(__file__).resolve().parents[1];P=R/'docs/documents'
def read(p):return json.loads(p.read_text())
types=read(P/'template-catalogue.json')['templates'];fields=read(P/'field-catalogue.json')['fields'];layouts=read(P/'template-layouts.json')['layouts'];wids={w['workflow_id'] for w in read(R/'docs/workflows/catalogue.json')['workflows']};tids={t['template_type_id'] for t in types};fids={f['field_id'] for f in fields};errors=[]
def ck(v,m):
 if not v:errors.append(m)
ck(len(tids)==len(types),'Duplicate document type');ck(len(fids)==len(fields),'Duplicate field');ck({l['template_type_id'] for l in layouts}==tids and len(layouts)==len(types),'Missing/duplicate layout')
with (P/'template-matrix.csv').open() as f:rows=list(csv.DictReader(f))
ck(len(rows)==len(types),'CSV row count mismatch')
for row,t in zip(rows,types):ck(all(row[k]==t[k] for k in row),'CSV differs '+t['template_type_id'])
for t in types:
 ck(bool(t['workflow_ids']) and set(t['workflow_ids'])<=wids,'Unknown workflow '+t['template_type_id'])
 ck(bool(t['required_payload_fields']) and set(t['required_payload_fields'])<=fids,'Unknown field '+t['template_type_id'])
 for field in ['content_readiness_gate','completed_or_issued_by','review_or_signing_authority','workflow_consequence','visibility','version_effect']:ck(bool(t[field]),'Missing type contract '+field)
for layout in layouts:ck(set(layout['required_binding_ids'])<=fids and bool(layout['production_content_status']),'Invalid layout binding')
policy=read(P/'content-readiness.json');ck(policy['tenant_values'] is None,'Invented reviewed content/policy');ck(policy['safe_defaults']['viewed_equals_signed'] is False and policy['safe_defaults']['template_published_equals_legal_approval'] is False and policy['safe_defaults']['template_edit_changes_existing_issued_record'] is False,'Invalid evidence/version semantics')
source=read(P/'source-map.json')
for path in source['contract_paths']+source['specification_paths']:ck((R/path).is_file(),'Missing source path '+path)
for ident in source['acceptance_ids']:ck(ident in (P/'acceptance.md').read_text(),'Missing case '+ident)
print(json.dumps({'package_edition': _PACKAGE_EDITION, 'validator_contract_version': '0.29','document_form_types':len(types),'typed_field_bindings':len(fields),'declarative_layouts':len(layouts),'planned_acceptance_cases':24,'errors':errors,'actual_legal_medical_content_approved':False,'actual_signature_render_provider_tested':False,'live_documents_issued':False},indent=2));sys.exit(bool(errors))
