#!/usr/bin/env python3
"""Gate: every metric is either implemented or has a recorded reason. No silent zeros."""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
err = []

def read(p):
    return json.loads((ROOT / p).read_text(encoding="utf-8"))

metrics = read("docs/reporting/metric-catalogue.json")["metrics"]
reports = read("docs/reporting/report-catalogue.json")["reports"]
fixtures = read("docs/reporting/synthetic-fixtures.json")["expected"]
report = read("app/generated/reporting-report.json")
registry = (ROOT / "app/generated/reporting.mjs").read_text(encoding="utf-8")

def block(name):
    m = re.search(rf"export const {name} = (\[.*?\]);\n", registry, re.S)
    if not m:
        err.append(f"could not read {name}")
        return []
    return json.loads(m.group(1))

implemented = block("IMPLEMENTED_METRICS")
unimplemented = block("UNIMPLEMENTED_METRICS")
views = block("REPORT_VIEWS")

metric_ids = {m["metric_id"] for m in metrics}
report_ids = {r["report_id"] for r in reports}

if len(metrics) != 62:
    err.append(f"expected 62 metrics, found {len(metrics)}")
if len(reports) != 10:
    err.append(f"expected 10 report views, found {len(reports)}")

for impl in implemented:
    if impl["metric_id"] not in metric_ids:
        err.append(f"{impl['key']} cites unknown metric {impl['metric_id']}")
    if not impl.get("basis") or len(impl["basis"]) < 20:
        err.append(f"{impl['key']} has no auditable basis")

for u in unimplemented:
    if not u.get("reason") or len(u["reason"]) < 20:
        err.append(f"{u['key']} has no substantive reason")

impl_keys = {i["key"] for i in implemented}
unimpl_keys = {u["key"] for u in unimplemented}
expected_keys = set(fixtures)
unavailable_by_design = {k for k, v in fixtures.items() if isinstance(v, str) and v.startswith("unavailable")}

for key in expected_keys:
    if key not in impl_keys | unimpl_keys | unavailable_by_design:
        err.append(f"fixture expectation {key} is neither implemented nor explained")
overlap = impl_keys & unimpl_keys
for key in overlap:
    if not fixtures.get(key) == fixtures.get(key):
        err.append(f"{key} is both implemented and unimplemented")
if overlap and not unavailable_by_design:
    err.append(f"keys claimed both implemented and unimplemented: {sorted(overlap)}")

for r in reports:
    for mid in r["metric_ids"]:
        if mid not in metric_ids:
            err.append(f"{r['report_id']} references unknown metric {mid}")
for v in views:
    if v["report_id"] not in report_ids:
        err.append(f"compiled view {v['report_id']} is not in the catalogue")
    if v["implemented_count"] > v["metric_count"]:
        err.append(f"{v['report_id']}: implemented exceeds declared metrics")

counts = report["counts"]
if counts["metrics"] != len(metrics):
    err.append("report metric count disagrees with the catalogue")
if counts["implemented"] != len(implemented):
    err.append("report implemented count disagrees with the registry")
if report["schema_query_testing"]["previously_recorded"] is not False:
    err.append("the pack recorded actual_schema_queries_tested as false; do not claim otherwise")

if err:
    print(f"REPORTING FAILED with {len(err)} errors:")
    for e in err[:20]:
        print("  -", e)
    sys.exit(1)
print(f"OK  {len(metrics)} metrics, {len(reports)} views, {len(implemented)} executed as SQL, "
      f"{len(unimplemented)} explained, zero silent zeros")
