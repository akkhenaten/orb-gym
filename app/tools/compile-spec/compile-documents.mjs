#!/usr/bin/env node
/**
 * Document compiler.
 *
 * 34 template types, 52 typed fields, 34 declarative layouts. Two facts shape the
 * runtime and are recorded rather than smoothed over:
 *
 * 1. Every template payload field (162 bindings) resolves to the field catalogue, so
 *    the ID graph between templates and fields is sound.
 * 2. Only 1 of 52 field `source` strings resolves to a real schema column. The other 51
 *    are prose ("published Company Settings contact fields"), so a renderer cannot
 *    resolve values from the database. It must accept a typed payload, which the
 *    contract already requires: allowlisted bindings, required fields, optional fields
 *    omitted rather than invented.
 *
 * Content approval is false in the pack's own validation record and every template is
 * SETUP_REQUIRED, so nothing may be issued. Drafts are permitted and are marked.
 */
import { GENERATED_AT } from './build-clock.mjs';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = resolve(HERE, '..', '..');
const REPO_ROOT = resolve(APP_ROOT, '..');
const read = (p) => JSON.parse(readFileSync(join(REPO_ROOT, p), 'utf8'));

const templates = read('docs/documents/template-catalogue.json').templates;
const fields = read('docs/documents/field-catalogue.json').fields;
const layouts = read('docs/documents/template-layouts.json').layouts;
const readiness = read('docs/documents/content-readiness.json');
const validation = read('docs/documents/validation.json');
const schemaSql = readFileSync(join(APP_ROOT, 'generated', 'schema.sql'), 'utf8');

const tables = new Map();
for (const m of schemaSql.matchAll(/CREATE TABLE IF NOT EXISTS (\w+) \(([\s\S]*?)\);/g)) {
  tables.set(m[1].toLowerCase(), new Set([...m[2].matchAll(/^\s*(\w+)\s+[A-Z]/gm)].map((c) => c[1])));
}

const errors = [];
const fieldById = new Map(fields.map((f) => [f.field_id, f]));

if (templates.length !== 34) errors.push(`expected 34 templates, found ${templates.length}`);
if (fields.length !== 52) errors.push(`expected 52 fields, found ${fields.length}`);
if (layouts.length !== 34) errors.push(`expected 34 layouts, found ${layouts.length}`);

const layoutByTemplate = new Map();
for (const l of layouts) {
  if (layoutByTemplate.has(l.template_type_id)) errors.push(`duplicate layout for ${l.template_type_id}`);
  layoutByTemplate.set(l.template_type_id, l);
}

/** Binding resolution: is the field's declared source machine-resolvable? */
const bindingFor = (field) => {
  const src = field.source ?? '';
  const m = /^(\w+)\.(\w+)$/.exec(src);
  if (m) {
    const table = m[1].toLowerCase();
    if (tables.has(table) && tables.get(table).has(m[2])) {
      return { kind: 'schema', table, column: m[2], source: src };
    }
    return { kind: 'prose', source: src, note: 'dotted source does not match a generated table and column' };
  }
  return { kind: 'prose', source: src, note: 'source is a prose description, not a machine-resolvable path' };
};

const compiledFields = fields.map((f) => ({
  field_id: f.field_id,
  type: f.type,
  sensitivity: f.sensitivity,
  required_rule: f.validation ?? null,
  binding: bindingFor(f),
}));

const compiledTemplates = templates.map((t) => {
  const layout = layoutByTemplate.get(t.template_type_id);
  if (!layout) errors.push(`${t.template_type_id} has no layout`);
  const payload = t.required_payload_fields ?? [];
  for (const p of payload) {
    if (!fieldById.has(p)) errors.push(`${t.template_type_id} requires ${p}, absent from the field catalogue`);
  }
  if (!payload.length) errors.push(`${t.template_type_id} requires no payload fields`);
  if (!t.content_readiness_gate) errors.push(`${t.template_type_id} has no content readiness gate`);
  return {
    template_type_id: t.template_type_id,
    name: t.name,
    owner_domain: t.owner_domain,
    representation: t.representation,
    content_readiness_gate: t.content_readiness_gate,
    required_payload_fields: payload,
    // Fields the template lists but the layout never places stay bound, not dropped.
    layout_blocks: layout?.blocks ?? [],
    visibility: t.visibility ?? null,
    issue_requirements: t.issue_requirements ?? null,
    review_or_signing_authority: t.review_or_signing_authority ?? null,
    status: t.status,
  };
});

const schemaBound = compiledFields.filter((f) => f.binding.kind === 'schema').length;
const report = {
  generated_at: GENERATED_AT,
  counts: {
    templates: compiledTemplates.length,
    fields: compiledFields.length,
    layouts: layouts.length,
    payload_bindings: compiledTemplates.reduce((n, t) => n + t.required_payload_fields.length, 0),
    layout_blocks: layouts.reduce((n, l) => n + (l.blocks?.length ?? 0), 0),
  },
  binding_reality: {
    schema_resolvable: schemaBound,
    prose_only: compiledFields.length - schemaBound,
    consequence: 'The renderer accepts a typed payload supplied by the caller. It cannot resolve document values from the database, so it never manufactures one.',
  },
  issuance: {
    content_approved: validation.actual_legal_medical_content_approved === true,
    signature_provider_tested: validation.actual_signature_render_provider_tested === true,
    live_documents_issued: validation.live_documents_issued === true,
    ready_template_status: readiness.status ?? null,
    rule: 'A draft may be rendered and is marked unreviewed. Issue is refused while content is unapproved, the signature provider is untested, or any required field is missing.',
  },
  gates: [...new Set(compiledTemplates.map((t) => t.content_readiness_gate))].sort(),
  errors,
};

writeFileSync(join(APP_ROOT, 'generated', 'documents.mjs'),
  '// GENERATED by tools/compile-spec/compile-documents.mjs. Do not edit by hand.\n'
  + `export const DOCUMENT_TEMPLATES = ${JSON.stringify(compiledTemplates, null, 1)};\n`
  + `export const DOCUMENT_FIELDS = ${JSON.stringify(compiledFields, null, 1)};\n`
  + `export const DOCUMENT_ISSUANCE = ${JSON.stringify(report.issuance, null, 1)};\n`);
writeFileSync(join(APP_ROOT, 'generated', 'documents-report.json'), JSON.stringify(report, null, 1));

const mdLines = [
  '# Document template readiness', '',
  `${compiledTemplates.length} template types, ${compiledFields.length} typed fields, ${layouts.length} declarative layouts.`, '',
  `Binding reality: ${schemaBound} field source resolves to a generated column, ${compiledFields.length - schemaBound} are prose, so values arrive as a validated caller payload.`, '',
  `Issuance: content approved = ${report.issuance.content_approved}, signature provider tested = ${report.issuance.signature_provider_tested}. Drafts render and are marked \`${'DRAFT \u2014 UNREVIEWED CONTENT \u2014 NOT FOR ISSUE'}\`; issue is refused while either flag is false or a required field is missing.`, '',
  '| Template | Name | Representation | Gate | Fields |', '| --- | --- | --- | --- | --- |',
  ...compiledTemplates.map((t) => `| \`${t.template_type_id}\` | ${t.name} | ${t.representation} | ${t.content_readiness_gate} | ${t.required_payload_fields.length} |`),
  '',
];
writeFileSync(join(REPO_ROOT, 'docs', 'derived', 'document-readiness.md'), mdLines.join('\n'));

console.log(JSON.stringify(report.counts, null, 1));
console.log(`bindings: ${schemaBound} schema-resolvable, ${compiledFields.length - schemaBound} prose-only`);
if (errors.length) { console.error(`\nDOCUMENT COMPILE FAILED (${errors.length}):`); errors.slice(0, 10).forEach((e) => console.error('  - ' + e)); process.exit(1); }
console.log('OK  documents compiled, payload bindings all resolve to the field catalogue');
