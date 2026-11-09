#!/usr/bin/env python3
"""Gate: derived creation commands are evidence-backed proposals, and stay blocked unless approved."""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
err = []
def read(p):
    return json.loads((ROOT / p).read_text(encoding="utf-8"))

ov = read("docs/derived/creation-overlay.json")
sources = {
    "docs/workflows/catalogue.json": {w["workflow_id"]: w for w in read("docs/workflows/catalogue.json")["workflows"]},
    "docs/data/entity-catalogue.json": {e["entity_id"]: e for e in read("docs/data/entity-catalogue.json")["entities"]},
    "docs/access/role-catalogue.json": {r["role_id"]: r for r in read("docs/access/role-catalogue.json")["roles"]},
    "docs/design/screen-inventory.json": {s["screen_id"]: s for s in read("docs/design/screen-inventory.json")["screens"]},
}
source_commands = {t["command"] for t in read("docs/data/transitions.json")["transitions"]}
state_cmds = {t["command"] for t in read("docs/derived/state-overlay.json").get("transitions", [])}
perm_doc = read("docs/access/permission-catalogue.json")
perm_ids = {p["permission_id"] for p in (perm_doc.get("permissions") or perm_doc.get("matrix"))}
schema = (ROOT / "app/generated/schema.sql").read_text(encoding="utf-8")
tables = {m.group(1): m.group(2) for m in re.finditer(r"CREATE TABLE IF NOT EXISTS (\w+) \(([\s\S]*?)\n\);", schema)}
generated = (ROOT / "app/generated/creations.mjs").read_text(encoding="utf-8")
runtime = (ROOT / "app/src/creation.mjs").read_text(encoding="utf-8")

ids = set()
for c in ov["creations"]:
    cid = c["creation_id"]
    if cid in ids: err.append(f"{cid}: duplicate id")
    ids.add(cid)
    if c["command"] in source_commands or c["command"] in state_cmds:
        err.append(f"{cid}: command collides with an existing transition")
    st = c.get("approval", {}).get("status")
    if st not in ("proposed", "approved"):
        err.append(f"{cid}: approval.status must be proposed or approved")
    if st == "proposed" and not c["approval"].get("owner_question"):
        err.append(f"{cid}: a proposal must carry the owner question")
    if st == "approved" and not (c["approval"].get("by") and c["approval"].get("date")):
        err.append(f"{cid}: approved without by/date")
    for p in c["authorization"]["requires"]:
        if p not in perm_ids: err.append(f"{cid}: unknown permission {p}")
    if c["authorization"]["mode"] not in ("permission_all_of", "verified_identity"):
        err.append(f"{cid}: unsupported authorization mode")
    if not c.get("evidence"): err.append(f"{cid}: no evidence")
    for ev in c.get("evidence", []):
        rec = sources.get(ev["source"], {}).get(ev["id"])
        if rec is None or ev["quote"] not in json.dumps(rec.get(ev["field"], ""), ensure_ascii=False):
            err.append(f"{cid}: quote not verbatim in {ev['id']}.{ev['field']}")
    for ins in c["inserts"]:
        body = tables.get(ins["table"])
        if body is None: err.append(f"{cid}: table {ins['table']} missing"); continue
        for f in ins["fields"]:
            if not re.search(rf"^\s+{f} ", body, re.M): err.append(f"{cid}: {ins['table']}.{f} not a column")
    if f'"creation_id": "{cid}"' not in generated:
        err.append(f"{cid}: not present in app/generated/creations.mjs")

if "PROPOSAL_NOT_APPROVED" not in runtime or "ORB_ALLOW_PROPOSED" not in runtime or "production" not in runtime:
    err.append("app/src/creation.mjs no longer gates proposals on ORB_ALLOW_PROPOSED outside production")
if ov.get("errors"):
    err.append(f"overlay recorded errors: {ov['errors']}")

if err:
    print(f"CREATION OVERLAY FAILED with {len(err)} errors:")
    for e in err[:20]: print("  -", e)
    sys.exit(1)
n = len(ov["creations"]); p = sum(1 for c in ov["creations"] if c["approval"]["status"] == "proposed")
print(f"OK  {n} derived creation commands evidence-backed; {p} proposed and blocked outside ORB_ALLOW_PROPOSED")
