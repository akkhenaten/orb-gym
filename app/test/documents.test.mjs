/**
 * Document rendering tests.
 *
 * The contract being defended: nothing is invented. Absent optional fields are absent,
 * unapproved fields are refused, protected references are withheld, and no document is
 * reported as issued while the pack records content and signature as unapproved.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  listTemplates, templateById, validatePayload, renderDraft, issueDocument, DRAFT_BANNER,
} from '../src/documents.mjs';
import { DOCUMENT_TEMPLATES, DOCUMENT_FIELDS } from '../generated/documents.mjs';

const fieldById = new Map(DOCUMENT_FIELDS.map((f) => [f.field_id, f]));

/** Build a payload that satisfies every family the catalogue declares. */
const valueFor = (fieldId) => {
  const f = fieldById.get(fieldId);
  const type = f.type;
  if (type.startsWith('protected_')) return 'evidence-ref-001';
  if (type.endsWith('_references')) return ['ref-1', 'ref-2'];
  if (type.endsWith('_reference')) return 'ref-001';
  if (type.endsWith('_snapshot') || type.endsWith('_snapshots')) return { captured_at: '2026-11-09T00:00:00Z' };
  return 'value';
};
const fullPayload = (t) => Object.fromEntries(t.required_payload_fields.map((f) => [f, valueFor(f)]));

test('the compiled catalogue matches the pack', () => {
  assert.equal(DOCUMENT_TEMPLATES.length, 34);
  assert.equal(DOCUMENT_FIELDS.length, 52);
  for (const t of DOCUMENT_TEMPLATES) {
    assert.ok(t.required_payload_fields.length > 0, `${t.template_type_id} binds nothing`);
    for (const f of t.required_payload_fields) assert.ok(fieldById.has(f), `${t.template_type_id} binds unknown ${f}`);
    assert.ok(t.layout_blocks.length > 0, `${t.template_type_id} has no layout blocks`);
    assert.ok(t.content_readiness_gate, `${t.template_type_id} has no readiness gate`);
  }
});

test('every one of the 34 templates renders a draft', () => {
  for (const t of listTemplates()) {
    const r = renderDraft(t.template_type_id, fullPayload(t));
    assert.equal(r.ok, true, `${t.template_type_id} failed to draft: ${JSON.stringify(r)}`);
    assert.equal(r.complete, true, `${t.template_type_id} reported gaps with a full payload`);
    assert.equal(r.draft.banner, DRAFT_BANNER);
    assert.equal(r.draft.blocks.length, t.layout_blocks.length);
    assert.match(r.integrity.sha256, /^[0-9a-f]{64}$/);
  }
});

test('an empty payload drafts with named gaps instead of invented values', () => {
  const t = templateById('DCT-001');
  const r = renderDraft(t.template_type_id, {});
  assert.equal(r.ok, true);
  assert.equal(r.complete, false);
  assert.deepEqual(r.gaps, t.required_payload_fields);
  for (const v of r.draft.values) {
    assert.equal(v.status, 'omitted');
    assert.equal(v.value, null, `${v.field_id} must not carry a made-up value`);
    assert.match(v.note, /not invented/);
  }
});

test('an unapproved field is refused, not ignored', () => {
  const r = renderDraft('DCT-001', { 'attacker.field': 'x' });
  assert.equal(r.ok, false);
  assert.equal(r.reason, 'UNAPPROVED_FIELDS');
  assert.deepEqual(r.unknown_fields, ['attacker.field']);
});

test('type families are enforced', () => {
  const t = templateById('DCT-001');
  const payload = fullPayload(t);
  const snapshotField = t.required_payload_fields.find((f) => /_snapshot$/.test(fieldById.get(f).type));
  const refField = t.required_payload_fields.find((f) => /_reference$/.test(fieldById.get(f).type) && !fieldById.get(f).type.startsWith('protected_'));
  if (snapshotField) payload[snapshotField] = ['not', 'an', 'object'];
  if (refField) payload[refField] = 42;
  const r = renderDraft(t.template_type_id, payload);
  assert.equal(r.ok, false);
  assert.equal(r.reason, 'INVALID_PAYLOAD');
  assert.ok(r.type_errors.length >= 1);
});

test('protected references are withheld from the rendered body', () => {
  const t = listTemplates().find((x) => x.required_payload_fields.some((f) => fieldById.get(f).type.startsWith('protected_')));
  assert.ok(t, 'no template binds a protected field');
  const payload = fullPayload(t);
  const protectedField = t.required_payload_fields.find((f) => fieldById.get(f).type.startsWith('protected_'));
  payload[protectedField] = 'SECRET-EVIDENCE-ID';
  const r = renderDraft(t.template_type_id, payload);
  const rendered = JSON.stringify(r.draft);
  assert.ok(!rendered.includes('SECRET-EVIDENCE-ID'), 'protected value leaked into the body');
  assert.equal(r.draft.values.find((v) => v.field_id === protectedField).value, '[protected reference withheld]');
});

test('rendering is deterministic regardless of payload key order', () => {
  const t = templateById('DCT-001');
  const payload = fullPayload(t);
  const reversed = Object.fromEntries(Object.entries(payload).reverse());
  const a = renderDraft(t.template_type_id, payload);
  const b = renderDraft(t.template_type_id, reversed);
  assert.equal(a.integrity.sha256, b.integrity.sha256, 'key order must not change the document hash');
});

test('issue is refused on every open axis and names them', () => {
  const t = templateById('DCT-001');
  const r = issueDocument(t.template_type_id, fullPayload(t));
  assert.equal(r.ok, false);
  assert.equal(r.outcome, 'ISSUE_REFUSED');
  const codes = r.reasons.map((x) => x.code);
  assert.ok(codes.includes('CONTENT_NOT_APPROVED'));
  assert.ok(codes.includes('SIGNATURE_PROVIDER_UNTESTED'));
  assert.ok(codes.includes('TEMPLATE_SETUP_REQUIRED'));
});

test('issue reports missing fields when the payload is short', () => {
  const r = issueDocument('DCT-001', {});
  const missing = r.reasons.find((x) => x.code === 'REQUIRED_FIELDS_MISSING');
  assert.ok(missing);
  assert.equal(missing.detail.length, templateById('DCT-001').required_payload_fields.length);
});

test('unknown template is refused at every entry point', () => {
  assert.equal(validatePayload('DCT-999', {}).reason, 'UNKNOWN_TEMPLATE');
  assert.equal(renderDraft('DCT-999', {}).reason, 'UNKNOWN_TEMPLATE');
  assert.equal(issueDocument('DCT-999', {}).reason, 'UNKNOWN_TEMPLATE');
});
