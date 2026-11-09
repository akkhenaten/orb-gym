#!/usr/bin/env python3
"""Gate: capability readiness is computed, never stored, and POS stays refused."""
import json, re, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
APP = ROOT / "app"
err = []

def read(p):
    return json.loads((ROOT / p).read_text(encoding="utf-8"))

pack = read("docs/setup/capability-readiness.json")
report = read("app/generated/capabilities-report.json")
registry = (APP / "generated/capabilities.mjs").read_text(encoding="utf-8")

m = re.search(r"export const CAPABILITIES = (\[.*?\]);\n", registry, re.S)
if not m:
    print("CAPABILITY RUNTIME FAILED: cannot read CAPABILITIES")
    sys.exit(1)
compiled = json.loads(m.group(1))

declared = {c["capability_id"]: c for c in pack["capabilities"]}
if len(compiled) != len(declared):
    err.append(f"compiled {len(compiled)} capabilities, pack declares {len(declared)}")
if {c["capability_id"] for c in compiled} != set(declared):
    err.append("compiled capability ids differ from the pack")

for c in compiled:
    cid = c["capability_id"]
    if c["states"] != declared[cid]["state_contract"]:
        err.append(f"{cid}: state contract altered during compilation")
    if not c.get("specification_path"):
        err.append(f"{cid}: no specification path")
    if not c.get("evaluation"):
        err.append(f"{cid}: no evaluation rule")

cap_src = (APP / "src/capabilities.mjs").read_text(encoding="utf-8")
if "NO_EDITABLE_READINESS" not in cap_src:
    err.append("runtime does not refuse an editable readiness flag")
if "FORBIDDEN_FLAGS" not in cap_src:
    err.append("runtime has no forbidden-flag list")
for forbidden in ("is_ready", "isReady"):
    if f"'{forbidden}'" not in cap_src and f'"{forbidden}"' not in cap_src:
        err.append(f"forbidden flag {forbidden} is not named in the runtime")

int_src = (APP / "src/integrations.mjs").read_text(encoding="utf-8")
if "LIVE_TILL_PROVIDER_UNTESTED" not in int_src:
    err.append("POS refusal for an untested provider is missing")
if "timingSafeEqual" not in int_src:
    err.append("signature comparison is not constant time")

# Behavioural assertion: a till sale can never report success.
probe = """
import { recordTillSale } from './src/integrations.mjs';
const sale = { currency: 'GBP', lines: [{ description: 'x', amount_minor: 100 }], payments: [{ method: 'cash', amount_minor: 100 }] };
const facts = { enabled: true, requirements: [{ key: 'till_provider', satisfied: true }], service_tested: true };
const r = recordTillSale({ sale, capabilityFacts: facts });
if (r.ok !== false) { console.error('POS SALE RETURNED OK'); process.exit(1); }
console.log(r.reasons.map(x => x.code).join(','));
"""
try:
    out = subprocess.run(["node", "--input-type=module", "-e", probe], cwd=APP, capture_output=True, text=True, timeout=60)
    if out.returncode != 0:
        err.append(f"POS behavioural probe failed: {(out.stderr or out.stdout).strip()[:200]}")
    elif "LIVE_TILL_PROVIDER_UNTESTED" not in out.stdout:
        err.append("POS probe did not end in the provider refusal")
except Exception as exc:  # noqa: BLE001
    err.append(f"POS behavioural probe could not run: {exc}")

if report["counts"]["capabilities"] != len(compiled):
    err.append("report count disagrees with the registry")

if err:
    print(f"CAPABILITY RUNTIME FAILED with {len(err)} errors:")
    for e in err[:20]:
        print("  -", e)
    sys.exit(1)
print(f"OK  {len(compiled)} capabilities computed from evidence, editable readiness refused, POS sale never succeeds")
