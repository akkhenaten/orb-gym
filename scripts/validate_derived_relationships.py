#!/usr/bin/env python3
"""Gate: the derived relationship overlay must be evidence, not invention."""
import json, re, sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
err = []

def read(p):
    return json.loads((ROOT / p).read_text(encoding="utf-8"))

source = read("docs/data/relationships.json")["relationships"]
doc = read("docs/derived/relationships-inferred.json")
inferred = doc["inferred"]
report = doc["report"]
entities = {e["entity_id"]: e for e in read("docs/data/entity-catalogue.json")["entities"]}

source_pairs = {(r["from_entity"], r["to_entity"]) for r in source}
seen_ids, seen_pairs = set(), set()

for r in inferred:
    rid = r["relationship_id"]
    if rid in seen_ids:
        err.append(f"duplicate inferred id {rid}")
    seen_ids.add(rid)
    if not re.fullmatch(r"REL-I-\d{3}", rid):
        err.append(f"{rid}: malformed id")
    for side in ("from_entity", "to_entity"):
        if r[side] not in entities:
            err.append(f"{rid}: unknown {side} {r[side]}")
    pair = (r["from_entity"], r["to_entity"])
    if pair in source_pairs:
        err.append(f"{rid}: duplicates a source relationship {pair}")
    if pair in seen_pairs:
        err.append(f"{rid}: duplicate pair {pair}")
    seen_pairs.add(pair)
    if r["from_entity"] == r["to_entity"]:
        err.append(f"{rid}: self-referencing edge")
    field = r.get("evidence_field")
    if not field:
        err.append(f"{rid}: no evidence field")
    elif r["from_entity"] in entities and field not in entities[r["from_entity"]].get("logical_fields", []):
        err.append(f"{rid}: evidence field {field} is not declared on {r['from_entity']}")
    if r.get("authority") != "derived-field-evidence":
        err.append(f"{rid}: authority must be derived-field-evidence")
    if r.get("rule") is not None:
        err.append(f"{rid}: must not invent rule prose")
    if r.get("cardinality") != "many-to-one":
        err.append(f"{rid}: cardinality must follow from a single-valued reference field")
    if r.get("strength") not in {"direct", "gym-scope", "tenant-scope"}:
        err.append(f"{rid}: unknown strength {r.get('strength')}")

nums = sorted(int(r["relationship_id"].split("-")[-1]) for r in inferred)
if nums and nums != list(range(1, len(nums) + 1)):
    err.append("inferred ids are not contiguous from 001")

covered = {r["from_entity"] for r in source} | {r["to_entity"] for r in source}
covered |= {r["from_entity"] for r in inferred} | {r["to_entity"] for r in inferred}
open_decisions = set(report.get("open_decisions", []))
for eid in entities:
    if eid not in covered and eid not in open_decisions:
        err.append(f"{eid}: orphaned with no inferred edge and no recorded open decision")

for eid in open_decisions - set(entities):
    err.append(f"open decision names unknown entity {eid}")

if report.get("counts", {}).get("inferred") != len(inferred):
    err.append("report count does not match the emitted rows")

if err:
    print(f"DERIVED RELATIONSHIPS FAILED with {len(err)} errors:")
    for e in err[:25]:
        print("  -", e)
    sys.exit(1)
print(f"OK  {len(inferred)} inferred edges are field-evidenced; "
      f"{len(open_decisions)} orphan(s) documented as open decisions; no invented prose")
