#!/usr/bin/env python3
"""Gate: every state column is constrained, and the derived overlay is evidence-backed."""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
err = []
def read(p):
    return json.loads((ROOT / p).read_text(encoding="utf-8"))

machines = read("docs/data/state-machines.json")["machines"]
entities = {e["entity_id"]: e for e in read("docs/data/entity-catalogue.json")["entities"]}
metrics = {m["metric_id"]: m for m in read("docs/reporting/metric-catalogue.json")["metrics"]}
overlay = read("docs/derived/state-overlay.json")
schema = (ROOT / "app/generated/schema.sql").read_text(encoding="utf-8")

def snake(eid):
    s = re.sub(r"^ENT-", "", eid)
    s = re.sub(r"([a-z0-9])([A-Z])", r"\1_\2", s)
    return re.sub(r"[^A-Za-z0-9]+", "_", s).lower().strip("_")

tables = {m.group(1): m.group(2) for m in re.finditer(r"CREATE TABLE IF NOT EXISTS (\w+) \(([\s\S]*?)\n\);", schema)}

def check_table(eid, states, initial, label):
    t = snake(eid)
    body = tables.get(t)
    if body is None:
        err.append(f"{label}: table {t} missing"); return
    if f"status TEXT NOT NULL DEFAULT '{initial}'" not in body:
        err.append(f"{label}: {t}.status missing or wrong default (expected {initial})")
    m = re.search(r"CHECK \(status IN \(([^)]*)\)\)", body)
    if not m:
        err.append(f"{label}: {t}.status has no CHECK constraint"); return
    declared = [s.strip().strip("'") for s in m.group(1).split(",")]
    if declared != states:
        err.append(f"{label}: {t} CHECK {declared} differs from declared {states}")

machine_entities = set()
for mc in machines:
    machine_entities.add(mc["entity_id"])
    check_table(mc["entity_id"], mc["states"], mc["initial_state"], mc["machine_id"])

for o in overlay["overlays"]:
    oid = o["overlay_id"]
    if o["entity_id"] in machine_entities:
        err.append(f"{oid}: shadows a source machine")
    if o["entity_id"] not in entities:
        err.append(f"{oid}: unknown entity")
    if not o.get("evidence"):
        err.append(f"{oid}: no evidence")
    for ev in o.get("evidence", []):
        m = metrics.get(ev["metric_id"])
        if not m or ev["quote"] not in m["definition"]:
            err.append(f"{oid}: quote not verbatim in {ev['metric_id']}")
    if o.get("unreachable_states") and not o.get("owner_decision") and not o.get("source_transitions"):
        err.append(f"{oid}: unreachable states without a recorded owner decision")
    check_table(o["entity_id"], o["states"], o["initial_state"], oid)

source_commands = {t["command"] for t in read("docs/data/transitions.json")["transitions"]}
perm_doc = read("docs/access/permission-catalogue.json")
perm_ids = {p["permission_id"] for p in (perm_doc.get("permissions") or perm_doc.get("matrix"))}
overlay_ids = {o["overlay_id"]: o for o in overlay["overlays"]}
compiled_src = (ROOT / "app/generated/transitions.mjs").read_text(encoding="utf-8")
for tr in overlay.get("transitions", []):
    tid = tr["transition_id"]
    o = overlay_ids.get(tr["overlay_id"])
    if not o:
        err.append(f"{tid}: unknown overlay"); continue
    if tr["from_state"] not in o["states"] or tr["to_state"] not in o["states"]:
        err.append(f"{tid}: state outside {tr['overlay_id']}")
    if tr["command"] in source_commands:
        err.append(f"{tid}: command collides with a source transition")
    for p in tr["requires"]:
        if p not in perm_ids:
            err.append(f"{tid}: unknown permission {p}")
    if not tr.get("reason_field"):
        err.append(f"{tid}: a void must record a reason")
    if f'"transition_id": "{tid}"' not in compiled_src:
        err.append(f"{tid}: not present in compiled transitions")
    if not tr["guards"] and not tr.get("guard_gap"):
        err.append(f"{tid}: no guards and no recorded reason why none are derivable")

if overlay.get("errors"):
    err.append(f"overlay recorded errors: {overlay['errors']}")

constrained = len(re.findall(r"CHECK \(status IN", schema))
expected = len(machines) + len(overlay["overlays"])
# the notification outbox carries its own status CHECK, outside the entity contract
if constrained != expected + 1:
    err.append(f"{constrained} status CHECKs in schema, expected {expected} entity + 1 outbox")

if err:
    print(f"STATE OVERLAY FAILED with {len(err)} errors:")
    for e in err[:20]:
        print("  -", e)
    sys.exit(1)
print(f"OK  {len(machines)} machine and {len(overlay['overlays'])} overlay state columns CHECK-constrained; {len(overlay.get('transitions', []))} derived transitions guarded, permissioned and compiled")
