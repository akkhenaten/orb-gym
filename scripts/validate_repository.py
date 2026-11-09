#!/usr/bin/env python3
from pathlib import Path
import re as _edition_re
_PACKAGE_ROOT=Path(__file__).resolve().parents[1]
_PACKAGE_EDITION=_edition_re.search(r'0\.\d+',(_PACKAGE_ROOT/'CURRENT_BASELINE.md').read_text().splitlines()[0]).group(0)
"""Validate the product documentation; this is not an application test suite."""
from pathlib import Path
import hashlib
import json
import re
import sys
import zipfile

ROOT = Path(__file__).resolve().parents[1]
errors = []
checked_links = 0


def check(condition, message):
    if not condition:
        errors.append(message)


def normalise_asset_path(text):
    return re.sub(r'\.\./(?:\.\./)?assets/orb-gym-logo\.png', 'ASSET:orb-gym-logo', text).strip()


required = ['README.md', 'AGENTS.md', 'CONTRIBUTING.md', 'SECURITY.md', 'CHANGELOG.md',
            '.env.example', '.gitignore', 'app/README.md', 'assets/orb-gym-logo.png',
            'public/README.md', 'tests/README.md', 'spec/README.md', 'docs/README.md',
            'prompts/01-store-and-audit.md', 'prompts/02-plan-and-create-delivery-cards.md']
for path in required:
    check((ROOT / path).is_file(), 'Missing required file: ' + path)

register = (ROOT / 'docs/source-requirement-register.md').read_text()
blocks = {m.group(1): m.group(2).strip() for m in re.finditer(
    r'^### (OG-SRC-\d+)\n\n(.*?)(?=^### OG-SRC-|^## |\Z)', register, re.M | re.S)}
check(set(blocks) == {f'OG-SRC-{i:04}' for i in range(1, 243)}, 'Source IDs missing/changed')
arch = (ROOT / 'docs/product-architecture.md').read_text()
for key, body in blocks.items():
    check(body in arch, 'Architecture/register mismatch: ' + key)
seen = []
for path in (ROOT / 'docs/modules').glob('[0-9][0-9]-*.md'):
    for m in re.finditer(r'^<!-- (OG-SRC-\d+) -->\n(.*?)(?=^<!-- OG-SRC-|^#{1,3} |\Z)',
                         path.read_text(), re.M | re.S):
        seen.append(m.group(1))
        check(normalise_asset_path(m.group(2)) == normalise_asset_path(blocks[m.group(1)]),
              'Module/register mismatch: ' + m.group(1))
check(len(seen) == len(set(seen)) == 238, 'Module source count/duplicates invalid')
check(set(blocks) - set(seen) == {f'OG-SRC-{i:04}' for i in range(1, 5)}, 'Unexpected module omission')

mapping = json.loads((ROOT / 'docs/delivery/source-map.json').read_text())
expected = set(blocks) | {f'OG-REV-{i:03}' for i in range(1, 12)}
mapped = [entry['source_id'] for entry in mapping['entries']]
check(len(mapped) == len(set(mapped)) == 253 and set(mapped) == expected, 'Source map incomplete/duplicated')
for entry in mapping['entries']:
    check(bool(entry['specification_paths']), 'No specification for ' + entry['source_id'])
    for path in entry['specification_paths']:
        check((ROOT / path).is_file(), 'Missing mapped specification: ' + path)
    check(entry['platform_card_id'] is None and entry['delivery_sequence'] is None,
          'Unexpected assigned board identity in initial map: ' + entry['source_id'])

acs = re.findall(r'^\| (AC\d+) \|', (ROOT / 'docs/acceptance-scenarios.md').read_text(), re.M)
check(acs == [f'AC{i:02}' for i in range(1, 91)], 'Acceptance IDs incomplete/duplicated')
for path in ROOT.rglob('*.md'):
    if 'history' in path.relative_to(ROOT).parts:
        continue
    text = path.read_text()
    for target in re.findall(r'!?\[[^\]]*\]\(([^)]+)\)', text):
        if '://' in target or target.startswith(('#', 'mailto:')):
            continue
        target_path = target.split('#')[0]
        checked_links += 1
        check((path.parent / target_path).is_file(), f'Broken local link: {path.relative_to(ROOT)} -> {target}')
    if path.parent == ROOT / 'spec' and path.name != 'README.md':
        for ident in re.findall(r'OG-SRC-\d{4}', text):
            check(ident in blocks, 'Unknown source ID: ' + ident)
        for ident in re.findall(r'AC\d{2}', text):
            check(ident in acs, 'Unknown acceptance ID: ' + ident)

spec_count = len([p for p in (ROOT / 'spec').glob('*.md') if p.name != 'README.md'])
journey_count = len([p for p in (ROOT / 'docs/journeys').glob('*.md') if p.name != 'README.md'])
check(spec_count == 20 and journey_count == 4, 'Specification/journey counts invalid')
logo_hash = hashlib.sha256((ROOT / 'assets/orb-gym-logo.png').read_bytes()).hexdigest()
check(logo_hash == '20b47e4822ba7f240ea1a655fa404b7772e3544372d05dccb1a46a40d3157e41', 'Original logo changed')

baseline = ROOT / 'docs/baselines/Orb_Gym_OpenKBS_Handoff_v0.17-r2.zip'
with zipfile.ZipFile(baseline) as z:
    check(z.testzip() is None, 'Historical handoff ZIP integrity failed')
    for path in ['docs/source-requirement-register.md'] + [name for name in z.namelist()
                 if name.startswith('docs/modules/') and re.match(r'docs/modules/[0-9][0-9]-.*\.md$', name)]:
        check((ROOT / path).read_bytes() == z.read(path), 'Retained source content changed: ' + path)

contract = (ROOT / 'docs/board-card-contract.md').read_text()
check('OG-REV-011' in contract and '00, 01, 02' in contract, 'Numbered delivery-card requirement missing')
check('00, 01, 02' in (ROOT / 'AGENTS.md').read_text(), 'Root instructions omit numbering')
check('00, 01, 02' in (ROOT / 'prompts/02-plan-and-create-delivery-cards.md').read_text(),
      'Planning prompt omits numbering')
check(not (ROOT / '.env').exists(), 'Unexpected secret environment file')

for name in ['docs/journey-architecture-trace.md', 'docs/journey-exceptions-and-handoffs.md', 'spec/reception-entry-exit.md']:
    check((ROOT / name).is_file(), 'Missing reviewed journey artifact: ' + name)
catalogue = json.loads((ROOT / 'docs/workflows/catalogue.json').read_text())
features = json.loads((ROOT / 'docs/workflows/feature-register.json').read_text())
workflows = catalogue['workflows']
wf_ids = [w['workflow_id'] for w in workflows]
feature_ids = [w['feature_id'] for w in workflows]
check(len(workflows) == 149 and len(set(wf_ids)) == 149, 'Workflow count or duplicate IDs')
check(len(set(w['domain'] for w in workflows)) == 21, 'Workflow domain count')
check(len(features['features']) == 134 and {f['feature_id'] for f in features['features']} == set(feature_ids),
      'Feature register incomplete or invalid')
all_specs = set()
for w in workflows:
    for field in ['actors_and_trigger', 'preconditions', 'authoritative_outcome_and_handoff',
                  'exceptions_and_policy_branches', 'next_owners', 'source_module_paths',
                  'specification_paths', 'cross_module_acceptance_ids', 'open_decision_references']:
        check(bool(w.get(field)), 'Incomplete workflow ' + w['workflow_id'] + ': ' + field)
    check(len(w['ordered_checkpoints']) >= 3 and all(w['ordered_checkpoints']),
          'Insufficient ordered checkpoints: ' + w['workflow_id'])
    doc = ROOT / w['document_path']
    check(doc.is_file() and ('## ' + w['workflow_id']) in doc.read_text(),
          'Missing workflow pipeline text: ' + w['workflow_id'])
    for path in w['specification_paths'] + w['source_module_paths']:
        check((ROOT / path).is_file(), 'Missing workflow reference: ' + path)
    for ident in w['source_block_references']:
        check(ident in blocks, 'Unknown workflow source: ' + ident)
    for ident in w['cross_module_acceptance_ids']:
        check(ident in acs, 'Unknown workflow acceptance: ' + ident)
    for ident in w['open_decision_references']:
        check(re.fullmatch(r'GAP(?:0[1-9]|1[0-6])', ident) is not None,
              'Unknown workflow decision: ' + ident)
    check(w['delivery_sequence'] is None and w['actual_board_card_id'] is None,
          'Unexpected actual card identity in workflow catalogue')
    all_specs.update(w['specification_paths'])
for f in features['features']:
    check(bool(f['workflow_ids']) and all(i in wf_ids for i in f['workflow_ids']),
          'Feature has missing pipeline: ' + f['feature_id'])
check(all_specs == {p.relative_to(ROOT).as_posix() for p in (ROOT / 'spec').glob('*.md') if p.name != 'README.md'},
      'A feature brief is not linked to the workflow catalogue')
for entry in mapping['entries']:
    check(bool(entry.get('workflow_domain_documents')), 'Source lacks workflow domains: ' + entry['source_id'])
    for path in entry.get('workflow_domain_documents', []):
        check((ROOT / path).is_file(), 'Missing source-to-workflow domain document: ' + path)


primary = [w for w in workflows if w.get('workflow_kind') == 'primary product workflow']
subflows = [w for w in workflows if w.get('workflow_kind') == 'exception or lifecycle subflow']
check(len(primary) == 134 and len(subflows) == 15, 'Primary/subflow count invalid')
for w in subflows:
    check(w.get('parent_workflow_id') in wf_ids, 'Missing primary link: ' + w['workflow_id'])
    check(len(w.get('state_handoff_table', [])) >= 4, 'Incomplete exception state table: ' + w['workflow_id'])
    for row in w.get('state_handoff_table', []):
        check(all(row.values()) and len(row) == 5, 'Incomplete state/handoff row: ' + w['workflow_id'])
    feature = next((f for f in features['features'] if f['feature_id'] == w['feature_id']), None)
    check(feature is not None and w['workflow_id'] in feature['workflow_ids'], 'Subflow absent from feature register')
decision_text = (ROOT / 'docs/decisions/operational-decisions.md').read_text()
check('DESIGN_SPECIFIED' in decision_text and 'SETUP_REQUIRED' in decision_text and 'DEC-GR-07' in decision_text, 'Specified operational rule boundary missing')
proposal_text = (ROOT / 'docs/proposals/feature-options.md').read_text()
check('Superseded' in proposal_text and '0.22' in proposal_text, 'Old proposal status not superseded')


extensions = json.loads((ROOT / 'docs/delivery/extension-source-map.json').read_text())
ext_ids = {e['extension_id'] for e in extensions['entries']}
check(ext_ids == {f'OG-EXT-{i:03}' for i in range(1, 6)}, 'Extension sources missing/changed')
for e in extensions['entries']:
    for path in e['specification_paths']:
        check((ROOT / path).is_file(), 'Missing extension spec: ' + path)
    for ident in e['workflow_ids']:
        check(ident in wf_ids, 'Missing extension workflow: ' + ident)
    for ident in e['acceptance_ids']:
        check(ident in acs, 'Missing extension acceptance: ' + ident)
for w in workflows:
    for ext in w.get('extension_source_ids', []):
        check(ext in ext_ids, 'Unknown workflow extension: ' + ext)
policy = json.loads((ROOT / 'docs/policy-settings-contract.json').read_text())
check(len(policy['policies']) == 11 and all(p['status'] == 'SETUP_REQUIRED' and p['tenant_values'] is None for p in policy['policies']), 'Missing setup contracts or invented tenant values')
for p in policy['policies']:
    check(bool(p['owner']) and bool(p['required_fields']) and bool(p['required_when']), 'Incomplete readiness contract')
    for ident in p['workflows']:
        check(ident in wf_ids, 'Readiness rule references unknown workflow: ' + ident)
check(len([w for w in workflows if w.get('extension_source_ids') and w['domain'] in ['TRIAL','JUNIOR','IMPORT','AUTH']]) == 19, 'New capability workflow count invalid')

manifest_path = ROOT / 'repository-manifest.json'
if manifest_path.exists():
    manifest = json.loads(manifest_path.read_text())
    listed = [item['path'] for item in manifest['files']]
    actual = {p.relative_to(ROOT).as_posix() for p in ROOT.rglob('*') if p.is_file() and p != ROOT / 'repository-manifest.json' and '.git' not in p.relative_to(ROOT).parts and '__pycache__' not in p.relative_to(ROOT).parts}
    check(len(listed) == len(set(listed)), 'Duplicate manifest paths')
    check(set(listed) == actual, 'Manifest inventory differs from actual source files')
    for name in listed:
        check(not Path(name).is_absolute() and '..' not in Path(name).parts, 'Invalid manifest path: ' + name)
    for item in manifest['files']:
        path = ROOT / item['path']
        if not path.is_file():
            errors.append('Manifest missing file: ' + item['path'])
            continue
        data = path.read_bytes()
        check(len(data) == item['size_bytes'] and hashlib.sha256(data).hexdigest() == item['sha256'],
              'Manifest mismatch: ' + item['path'])

result = {'source_blocks': len(blocks), 'review_requirements': 11, 'source_map_entries': len(mapped),
          'feature_specification_briefs': spec_count, 'customer_journeys': journey_count,
          'planned_acceptance_scenarios': len(acs), 'local_links_checked': checked_links,
          'original_logo_verified': logo_hash, 'errors': errors,
          'defined_feature_workflows': len(workflows), 'workflow_domains': 21,
          'feature_register_entries': len(features['features']), 'extension_source_units': len(ext_ids), 'required_setup_contracts': len(policy['policies']),
          'application_tests_run': False, 'actual_board_cards_created': False}
result['package_edition'] = _PACKAGE_EDITION
print(json.dumps(result, indent=2))
sys.exit(bool(errors))
