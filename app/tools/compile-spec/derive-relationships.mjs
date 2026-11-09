#!/usr/bin/env node
/**
 * Derived relationship overlay.
 *
 * 11 entities in v0.35 have no relationship row, which breaks the ID graph at the
 * edges. This tool does NOT invent rules or prose: it reads each orphan's declared
 * `*_id` fields and records the edge that field necessarily implies, with the field
 * named as evidence. Source rows stay authoritative and are never modified or
 * duplicated here.
 *
 * `ENT-AuditEvent` has no referencing field (`workspace_id_or_platform` is a union),
 * so its edge cannot be derived and is reported for an owner decision instead of
 * being guessed.
 */
import { GENERATED_AT } from './build-clock.mjs';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = resolve(HERE, '..', '..');
const REPO_ROOT = resolve(APP_ROOT, '..');
const OUT_GEN = resolve(APP_ROOT, 'generated');
const OUT_DOC = resolve(REPO_ROOT, 'docs', 'derived');

const read = (p) => JSON.parse(readFileSync(join(REPO_ROOT, p), 'utf8'));
const entities = read('docs/data/entity-catalogue.json').entities;
const source = read('docs/data/relationships.json').relationships;

const byId = new Map(entities.map((e) => [e.entity_id, e]));
const norm = (s) => s.replace(/^ENT-/, '').replace(/[^a-z0-9]/gi, '').toLowerCase();

const nameToEntity = new Map();
for (const e of entities) {
  const key = norm(e.entity_id);
  if (!nameToEntity.has(key)) nameToEntity.set(key, e.entity_id);
}

const edgesOf = new Set();
for (const r of source) { edgesOf.add(r.from_entity); edgesOf.add(r.to_entity); }
const orphans = entities.filter((e) => !edgesOf.has(e.entity_id)).map((e) => e.entity_id);

const sourcePairs = new Set(source.map((r) => `${r.from_entity}->${r.to_entity}`));
const inferred = [];
const unresolved = [];
const rejected = [];
let seq = 0;

for (const orphanId of orphans) {
  const entity = byId.get(orphanId);
  const candidates = [];

  for (const field of entity.logical_fields ?? []) {
    const m = /^(.*?)_id$/.exec(field);
    if (!m) continue;
    const stem = m[1].replace(/_/g, '');
    let target = nameToEntity.get(stem);
    if (!target) {
      // prefix match, longest wins, deterministic order
      const matches = [...nameToEntity.entries()]
        .filter(([name]) => name !== norm(orphanId) && (name.startsWith(stem) || stem.startsWith(name)))
        .sort((a, b) => b[0].length - a[0].length || a[0].localeCompare(b[0]));
      target = matches[0]?.[1];
    }
    if (!target || target === orphanId) continue;
    if (sourcePairs.has(`${orphanId}->${target}`)) continue;
    candidates.push({ field, target });
  }

  // de-duplicate targets, keeping the first (most specific) evidence field
  const seenTarget = new Set();
  const unique = candidates.filter((c) => (seenTarget.has(c.target) ? false : seenTarget.add(c.target)));

  if (!unique.length) {
    unresolved.push({
      entity_id: orphanId,
      reason: 'no declared field references another entity; the edge cannot be derived without a product decision',
      fields_reviewed: entity.logical_fields ?? [],
    });
    continue;
  }

  for (const c of unique) {
    if (!byId.has(c.target)) { rejected.push({ orphanId, field: c.field, target: c.target }); continue; }
    seq += 1;
    inferred.push({
      relationship_id: `REL-I-${String(seq).padStart(3, '0')}`,
      from_entity: orphanId,
      to_entity: c.target,
      cardinality: 'many-to-one',
      authority: 'derived-field-evidence',
      evidence_field: c.field,
      evidence_note: `derived from declared field ${c.field}; the source register has no row for this pair`,
      strength: c.field === 'workspace_id' ? 'tenant-scope'
        : c.field === 'gym_id' ? 'gym-scope' : 'direct',
      rule: null,
      scope_rule: null,
    });
  }
}

/**
 * Entities whose prose names another entity but which declare no field for it are
 * under-specified, not merely unlinked. Turning that prose into a relationship row
 * would invent a column, so it is reported as an open decision with its evidence.
 */
const semanticGaps = [];
for (const orphanId of orphans) {
  const entity = byId.get(orphanId);
  const prose = [entity.name, entity.invariant, entity.requiredness, entity.scope].filter(Boolean).join(' ');
  const mentions = [];
  for (const other of entities) {
    if (other.entity_id === orphanId) continue;
    const bare = other.entity_id.replace(/^ENT-/, '');
    if (new RegExp(`\\b${bare}\\b`, 'i').test(prose)) mentions.push(other.entity_id);
  }
  if (mentions.length) {
    semanticGaps.push({
      entity_id: orphanId,
      evidence: entity.invariant ?? entity.requiredness ?? entity.scope ?? null,
      implied_targets: [...new Set(mentions)],
      why_not_an_edge: 'no declared field references these entities; adding an edge would require inventing a column',
    });
  }
}

const covered = new Set([...edgesOf, ...inferred.flatMap((r) => [r.from_entity, r.to_entity])]);
const stillOrphan = entities.filter((e) => !covered.has(e.entity_id)).map((e) => e.entity_id);

const report = {
  generated_at: GENERATED_AT,
  counts: {
    entities: entities.length,
    source_relationships: source.length,
    orphans_in_source: orphans.length,
    inferred: inferred.length,
    orphans_remaining: stillOrphan.length,
    tenant_scope_edges: inferred.filter((r) => r.strength === 'tenant-scope').length,
    gym_scope_edges: inferred.filter((r) => r.strength === 'gym-scope').length,
    direct_edges: inferred.filter((r) => r.strength === 'direct').length,
  },
  authority_note: 'Inferred rows carry evidence_field and no rule prose. They close the graph mechanically; they do not supersede or edit docs/data/relationships.json.',
  unresolved,
  semantic_gaps: semanticGaps,
  open_decisions: [...unresolved.map((u) => u.entity_id)],
  still_orphan: stillOrphan,
  rejected,
  errors: [],
};

mkdirSync(OUT_GEN, { recursive: true });
mkdirSync(OUT_DOC, { recursive: true });
writeFileSync(join(OUT_DOC, 'relationships-inferred.json'), JSON.stringify({ edition: read('docs/data/relationships.json').edition, inferred, report }, null, 1));
writeFileSync(join(OUT_GEN, 'relationships-inferred.mjs'),
  '// GENERATED by tools/compile-spec/derive-relationships.mjs. Do not edit by hand.\n'
  + `export const INFERRED_RELATIONSHIPS = ${JSON.stringify(inferred, null, 2)};\n`);
writeFileSync(join(OUT_GEN, 'relationships-inferred-report.json'), JSON.stringify(report, null, 1));

console.log(JSON.stringify(report.counts, null, 1));
for (const u of unresolved) console.error(`  unresolved: ${u.entity_id} — ${u.reason}`);
// Fail only when an orphan is neither linked nor explicitly recorded as an open
// decision. A documented decision is a legitimate end state; a silent orphan is not.
const undocumented = stillOrphan.filter((id) => !report.open_decisions.includes(id));
if (undocumented.length) {
  console.error(`FAIL: ${undocumented.length} orphaned without an open decision: ${undocumented.join(', ')}`);
  process.exit(1);
}
if (stillOrphan.length) {
  console.log(`\nOK  overlay derived; ${stillOrphan.length} orphan(s) recorded as open decisions, ${semanticGaps.length} semantic gap(s) reported`);
} else {
  console.log('\nOK  relationship overlay derived, zero entities left orphaned');
}
