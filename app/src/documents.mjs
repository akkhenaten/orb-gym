/**
 * Document rendering.
 *
 * The renderer is deliberately narrow. The pack's field catalogue binds only one field
 * to a real column, so values arrive as a caller payload, typed, and are validated
 * against the catalogue's declared type families. Nothing is looked up from the
 * database and nothing is inferred: an optional field that is absent is reported as
 * absent, and a protected reference is withheld rather than inlined.
 *
 * A draft can always be produced, because a draft is how a reviewer sees the gaps. An
 * issue cannot, while the pack records content approval as false, the signature
 * provider as untested, and every template as SETUP_REQUIRED.
 */
import { createHash } from 'node:crypto';
import { DOCUMENT_TEMPLATES, DOCUMENT_FIELDS, DOCUMENT_ISSUANCE } from '../generated/documents.mjs';

const templates = new Map(DOCUMENT_TEMPLATES.map((t) => [t.template_type_id, t]));
const fields = new Map(DOCUMENT_FIELDS.map((f) => [f.field_id, f]));

export const DRAFT_BANNER = 'DRAFT — UNREVIEWED CONTENT — NOT FOR ISSUE';

export function listTemplates() {
  return [...templates.values()];
}

export function templateById(id) {
  return templates.get(id) ?? null;
}

/** Type family the catalogue declares, mapped to a shape check. */
function familyOf(type) {
  if (type.startsWith('protected_')) return 'protected';
  if (type.endsWith('_references') || type.endsWith('_reference')) return 'reference';
  if (type.endsWith('_snapshot') || type.endsWith('_snapshots')) return 'snapshot';
  return 'primitive';
}

function shapeError(field, value) {
  const family = familyOf(field.type);
  const isObj = value !== null && typeof value === 'object' && !Array.isArray(value);
  if (family === 'reference') {
    if (typeof value === 'string' && value.trim()) return null;
    if (isObj && Object.keys(value).some((k) => /^(id|reference|reference_id|evidence_id)$/.test(k))) return null;
    return `${field.field_id}: expects a reference (id string or {id}), got ${value === null ? 'null' : typeof value}`;
  }
  if (family === 'snapshot') {
    if (isObj) return null;
    return `${field.field_id}: expects a snapshot object, got ${Array.isArray(value) ? 'array' : typeof value}`;
  }
  if (family === 'protected') {
    if (typeof value === 'string' || isObj) return null;
    return `${field.field_id}: expects a protected reference, got ${typeof value}`;
  }
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return null;
  return `${field.field_id}: expects a scalar value, got ${Array.isArray(value) ? 'array' : typeof value}`;
}

/**
 * Validate a payload against a template. Unknown keys are refused outright: the
 * contract permits allowlisted bindings only.
 */
export function validatePayload(templateId, payload = {}) {
  const template = templates.get(templateId);
  if (!template) return { ok: false, reason: 'UNKNOWN_TEMPLATE', template_id: templateId };

  const allowed = new Set(template.required_payload_fields);
  const unknown = Object.keys(payload).filter((k) => !allowed.has(k));
  const missing = template.required_payload_fields.filter((f) => {
    const v = payload[f];
    return v === undefined || v === null || (typeof v === 'string' && !v.trim());
  });
  const typeErrors = [];
  for (const [key, value] of Object.entries(payload)) {
    if (!allowed.has(key) || value === undefined || value === null) continue;
    const field = fields.get(key);
    if (!field) { typeErrors.push(`${key}: not in the field catalogue`); continue; }
    const err = shapeError(field, value);
    if (err) typeErrors.push(err);
  }

  return {
    ok: unknown.length === 0 && typeErrors.length === 0,
    template,
    unknown_fields: unknown,
    missing_fields: missing,
    type_errors: typeErrors,
    complete: missing.length === 0,
  };
}

const canonical = (o) => JSON.stringify(o, (k, v) => (v && typeof v === 'object' && !Array.isArray(v)
  ? Object.fromEntries(Object.keys(v).sort().map((key) => [key, v[key]]))
  : v));

/**
 * Render a draft. Blocks come from the declarative layout, verbatim; values are bound
 * in the template's declared order. The specification declares no block-to-field
 * assignment, so none is invented.
 */
export function renderDraft(templateId, payload = {}) {
  const check = validatePayload(templateId, payload);
  if (check.reason === 'UNKNOWN_TEMPLATE') return { ok: false, reason: check.reason };
  if (check.unknown_fields.length) {
    return { ok: false, reason: 'UNAPPROVED_FIELDS', unknown_fields: check.unknown_fields };
  }
  if (check.type_errors.length) {
    return { ok: false, reason: 'INVALID_PAYLOAD', type_errors: check.type_errors };
  }

  const template = check.template;
  const values = template.required_payload_fields.map((fieldId) => {
    const field = fields.get(fieldId);
    const supplied = payload[fieldId] !== undefined && payload[fieldId] !== null;
    const family = familyOf(field.type);
    return {
      field_id: fieldId,
      type: field.type,
      sensitivity: field.sensitivity,
      status: supplied ? 'supplied' : 'omitted',
      value: !supplied ? null
        : family === 'protected' ? '[protected reference withheld]'
          : payload[fieldId],
      note: supplied ? null : 'optional or unresolved at draft stage; not invented',
    };
  });

  const body = {
    template_type_id: template.template_type_id,
    name: template.name,
    representation: template.representation,
    banner: DRAFT_BANNER,
    content_readiness_gate: template.content_readiness_gate,
    blocks: template.layout_blocks,
    values,
    gaps: check.missing_fields,
  };
  return {
    ok: true,
    draft: body,
    complete: check.complete,
    gaps: check.missing_fields,
    integrity: { sha256: createHash('sha256').update(canonical(body)).digest('hex'), canonicalisation: 'sorted-key JSON of the rendered body' },
  };
}

/**
 * Issue a document. Refused on every axis the pack leaves open, and the refusal names
 * each one, so a reader is never told a document was issued when it was not.
 */
export function issueDocument(templateId, payload = {}) {
  const template = templates.get(templateId);
  if (!template) return { ok: false, reason: 'UNKNOWN_TEMPLATE', template_id: templateId };
  const check = validatePayload(templateId, payload);
  const reasons = [];
  if (check.unknown_fields.length) reasons.push({ code: 'UNAPPROVED_FIELDS', detail: check.unknown_fields });
  if (check.type_errors.length) reasons.push({ code: 'INVALID_PAYLOAD', detail: check.type_errors });
  if (check.missing_fields.length) reasons.push({ code: 'REQUIRED_FIELDS_MISSING', detail: check.missing_fields });
  if (!DOCUMENT_ISSUANCE.content_approved) {
    reasons.push({ code: 'CONTENT_NOT_APPROVED', detail: 'the pack records actual_legal_medical_content_approved as false' });
  }
  if (!DOCUMENT_ISSUANCE.signature_provider_tested) {
    reasons.push({ code: 'SIGNATURE_PROVIDER_UNTESTED', detail: 'no signature render provider has been exercised' });
  }
  reasons.push({ code: 'TEMPLATE_SETUP_REQUIRED', detail: `template status: ${template.status}` });

  return {
    ok: false,
    outcome: 'ISSUE_REFUSED',
    template_id: templateId,
    content_readiness_gate: template.content_readiness_gate,
    reasons,
  };
}
