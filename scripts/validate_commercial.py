#!/usr/bin/env python3
"""Gate: commercial policies must be registered and unconfigured, never fabricated."""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
err = []

def read(p):
    return json.loads((ROOT / p).read_text(encoding="utf-8"))

contract = read("docs/policy-settings-contract.json")["policies"]
compiled = read("app/generated/commercial.mjs".replace("app/generated/commercial.mjs", "app/generated/commercial-report.json"))
registry_txt = (ROOT / "app/generated/commercial.mjs").read_text(encoding="utf-8")
match = re.search(r"export const POLICIES = (\[.*?\]);\n", registry_txt, re.S)
if not match:
    err.append("could not read the compiled policy registry")
    policies = []
else:
    policies = json.loads(match.group(1))

by_id = {p["policy_id"]: p for p in policies}
contract_ids = {p["policy_id"] for p in contract}

if len(policies) != len(contract):
    err.append(f"registry has {len(policies)} policies, contract declares {len(contract)}")
for missing in sorted(contract_ids - set(by_id)):
    err.append(f"{missing} missing from the registry")
for extra in sorted(set(by_id) - contract_ids):
    err.append(f"{extra} is not in the contract")

for p in policies:
    pid = p["policy_id"]
    if p.get("configured_in_spec") is not False:
        err.append(f"{pid}: must not claim configured values in the specification")
    if p.get("status") != "SETUP_REQUIRED":
        err.append(f"{pid}: status is {p.get('status')}, expected SETUP_REQUIRED")
    fields = p.get("required_fields") or []
    if not fields:
        err.append(f"{pid}: no required fields")
    if len(set(fields)) != len(fields):
        err.append(f"{pid}: duplicate required fields")
    if not p.get("workflows"):
        err.append(f"{pid}: governs no workflow")
    rule = p.get("governing_rule", "")
    if not re.fullmatch(r"(DEC-GR-\d+|OG-EXT-\d+)", rule):
        err.append(f"{pid}: malformed governing rule {rule}")

operational = (ROOT / "docs/decisions/operational-decisions.md").read_text(encoding="utf-8")
extensions = (ROOT / "docs/source-extension-register.md").read_text(encoding="utf-8")
for p in policies:
    reg = operational if p["governing_rule"].startswith("DEC-") else extensions
    if p["governing_rule"] not in reg:
        err.append(f"{p['policy_id']}: {p['governing_rule']} absent from its register")

readiness = ROOT / "docs/derived/commercial-readiness.md"
if not readiness.exists():
    err.append("docs/derived/commercial-readiness.md missing")
else:
    text = readiness.read_text(encoding="utf-8")
    for pid in contract_ids:
        if pid not in text:
            err.append(f"readiness table does not list {pid}")

if compiled.get("counts", {}).get("policies") != len(policies):
    err.append("report count does not match the registry")

if err:
    print(f"COMMERCIAL FAILED with {len(err)} errors:")
    for e in err[:25]:
        print("  -", e)
    sys.exit(1)
print(f"OK  {len(policies)} policies registered, 0 fabricated values, every governing rule resolves")
