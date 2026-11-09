#!/usr/bin/env python3
"""Gate: the builder handover is reachable, its paths exist, and its numbers match the compiler."""
import json, re, sys
from pathlib import Path

R = Path(__file__).resolve().parent.parent
err = []
def ck(cond, msg):
    if not cond: err.append(msg)

h = (R / "HANDOVER.md").read_text(encoding="utf-8") if (R / "HANDOVER.md").is_file() else ""
ck(h, "HANDOVER.md missing")
for entry in ("BUILD_BRIEF.md", "AGENTS.md", "README.md"):
    ck("HANDOVER.md" in (R / entry).read_text(encoding="utf-8"), f"{entry} does not point at HANDOVER.md")

# every repository path named in backticks must exist
for ref in sorted(set(re.findall(r"`((?:app|docs|scripts)/[^`*\s]+)`", h))):
    ck((R / ref).exists(), f"HANDOVER.md names missing path {ref}")

c = json.loads((R / "app/generated/compile-report.json").read_text())["counts"]
facts = {
    f"{c['tables']} tables": True, f"{c['columns_declared']} typed columns": True,
    f"{c['transitions']} source transitions": True, f"{c['derived_transitions']} derived": True,
    f"{c['commands']} commands": True, f"{c['permissions']} permissions": True,
    f"{c['machines']} machine state columns": True,
}
for phrase in facts:
    ck(phrase in h, f"HANDOVER.md count drifted from compiler: expected '{phrase}'")

screens = len(json.loads((R / "docs/design/screen-inventory.json").read_text())["screens"])
ck(f"{screens} screens" in h, f"HANDOVER.md screen count drifted ({screens})")
rep = json.loads((R / "app/generated/reporting-report.json").read_text())["counts"]
ck(f"{rep['metrics']} metrics" in h and f"{rep['requires_field_mapping']} need field mapping" in h, "reporting counts drifted")

# derived transitions must carry an approval record
ov = json.loads((R / "docs/derived/state-overlay.json").read_text())
for t in ov.get("transitions", []):
    ck(t.get("approval", {}).get("status") in ("approved", "proposed"), f"{t['transition_id']} has no approval status")

# no current document may still describe six selectable presets
pat = re.compile(r"\b(?:all six|six (?:options|presets|styles|single-select|complete presets)|six-choice|six-option)\b", re.I)
for p in R.rglob("*.md"):
    rel = p.relative_to(R).as_posix()
    if rel.startswith(("history/", "docs/baselines/", "docs/reviews/")) or rel == "CHANGELOG.md":
        continue
    if p.as_posix() in {(R / e["path"]).as_posix() for e in json.loads((R / "docs/baselines/source-integrity.json").read_text())["files"]}:
        continue
    for i, line in enumerate(p.read_text(encoding="utf-8").splitlines(), 1):
        if pat.search(line):
            err.append(f"{rel}:{i} still describes six presets")

# generated output must be location-independent, or a fresh clone fails its first check
for p in list((R / "app/generated").iterdir()) + list((R / "docs/derived").iterdir()):
    if p.is_file() and str(R) in p.read_text(encoding="utf-8", errors="ignore"):
        err.append(f"{p.relative_to(R)} embeds the absolute build path")

if err:
    print(f"HANDOVER FAILED with {len(err)} errors:")
    for e in err[:25]: print("  -", e)
    sys.exit(1)
print("OK  handover reachable from all entry docs, paths exist, counts match the compiler, five presets everywhere")
