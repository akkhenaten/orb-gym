#!/usr/bin/env python3
"""Gate: the document runtime must not claim approvals the pack does not record."""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
err = []
def read(p):
    return json.loads((ROOT / p).read_text(encoding="utf-8"))

templates = read("docs/documents/template-catalogue.json")["templates"]
fields = read("docs/documents/field-catalogue.json")["fields"]
layouts = read("docs/documents/template-layouts.json")["layouts"]
validation = read("docs/documents/validation.json")
report = read("app/generated/documents-report.json")

registry_txt = (ROOT / "app/generated/documents.mjs").read_text(encoding="utf-8")
def block(name):
    m = re.search(rf"export const {name} = (\[.*?\]);\n", registry_txt, re.S)
    if not m:
        err.append(f"could not read {name}")
        return []
    return json.loads(m.group(1))

compiled_templates = block("DOCUMENT_TEMPLATES")
compiled_fields = block("DOCUMENT_FIELDS")

field_ids = {f["field_id"] for f in fields}
template_ids = {t["template_type_id"] for t in templates}

if len(compiled_templates) != len(templates):
    err.append(f"compiled {len(compiled_templates)} templates, pack declares {len(templates)}")
if len(compiled_fields) != len(fields):
    err.append(f"compiled {len(compiled_fields)} fields, pack declares {len(fields)}")
if {t["template_type_id"] for t in compiled_templates} != template_ids:
    err.append("compiled template ids differ from the catalogue")

layout_by = {l["template_type_id"]: l for l in layouts}
for t in compiled_templates:
    tid = t["template_type_id"]
    if not t.get("required_payload_fields"):
        err.append(f"{tid} binds no payload fields")
    for f in t.get("required_payload_fields", []):
        if f not in field_ids:
            err.append(f"{tid} binds {f}, absent from the field catalogue")
    if not t.get("layout_blocks"):
        err.append(f"{tid} has no layout blocks")
    if len(t["layout_blocks"]) != len(layout_by.get(tid, {}).get("blocks", [])):
        err.append(f"{tid} layout blocks were altered during compilation")
    if not t.get("content_readiness_gate"):
        err.append(f"{tid} has no readiness gate")

for f in compiled_fields:
    if not f.get("binding"):
        err.append(f"{f['field_id']} has no recorded binding outcome")
    if f["binding"]["kind"] not in {"schema", "prose"}:
        err.append(f"{f['field_id']} binding kind is {f['binding']['kind']}")

issuance = report["issuance"]
if validation["actual_legal_medical_content_approved"] is not False:
    err.append("pack claims legal/medical content approved; runtime assumptions must be revisited")
if issuance["content_approved"] is not False:
    err.append("runtime claims content approval the pack does not record")
if issuance["signature_provider_tested"] is not False:
    err.append("runtime claims a tested signature provider")
if issuance["live_documents_issued"] is not False:
    err.append("runtime claims issued live documents")

schema_bound = report["binding_reality"]["schema_resolvable"]
prose = report["binding_reality"]["prose_only"]
if schema_bound + prose != len(compiled_fields):
    err.append("binding reality counts do not sum to the field count")

readiness = ROOT / "docs/derived/document-readiness.md"
if not readiness.exists():
    err.append("docs/derived/document-readiness.md missing")
else:
    text = readiness.read_text(encoding="utf-8")
    for tid in template_ids:
        if tid not in text:
            err.append(f"readiness table omits {tid}")

if err:
    print(f"DOCUMENT RUNTIME FAILED with {len(err)} errors:")
    for e in err[:20]:
        print("  -", e)
    sys.exit(1)
print(f"OK  {len(compiled_templates)} templates render as drafts, issue refused on recorded state, "
      f"{schema_bound} schema-resolvable vs {prose} prose bindings")
