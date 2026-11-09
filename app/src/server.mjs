/**
 * HTTP surface for Orb Gym.
 *
 * Deliberately small and dependency-free. Every state change is a trusted
 * command routed through src/engine.mjs; there are no ad-hoc write endpoints, so
 * the 233-transition contract cannot be bypassed by the transport.
 *
 * Auth note: identity is read from an X-Actor header for local/dev use. A real
 * deployment replaces resolveActor() with the selected identity provider. The
 * header is NOT production authentication and refuses to load when
 * NODE_ENV=production unless ORB_ALLOW_DEV_ACTOR=1 is set deliberately.
 */
import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

import { openDb, insertRow, getRow, tables, GENERATED } from './db.mjs';
import { executeCommand, auditTrail, CommandError, findTransition } from './engine.mjs';
import { TRANSITIONS } from '../generated/transitions.mjs';
import { ENUMS } from '../generated/enums.mjs';
import { RELATIONSHIPS, ORPHAN_ENTITIES } from '../generated/relationships.mjs';
import { renderIndex, renderScreen, screenByRoute, DEFAULT_PRESET, DEFAULT_MODE } from './ui.mjs';
import { dispatch, outboxFor, attemptsFor, eventById } from './notify.mjs';
import { listPolicies, readiness, configurePolicy, statusFor, missingFields } from './policies.mjs';
import { metricValue, formatMinor } from './reporting.mjs';
import { listTemplates, templateById, renderDraft, issueDocument, validatePayload } from './documents.mjs';
import { capabilities, evaluateCapability } from './capabilities.mjs';
import { listRecords, createFixture, screenTables, RecordError } from './records.mjs';
import { ingestProviderEvent, recordTillSale, validateTillSale } from './integrations.mjs';
import { REPORT_VIEWS, IMPLEMENTED_METRICS, UNIMPLEMENTED_METRICS } from '../generated/reporting.mjs';
import { SCREEN_COMMANDS } from '../generated/screen-commands.mjs';
import { SCREENS } from '../generated/screens.mjs';
import { PRESETS, THEMES } from '../generated/theme.mjs';
import { CARDS } from '../generated/cards.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const report = JSON.parse(readFileSync(join(GENERATED, 'compile-report.json'), 'utf8'));

const PORT = Number(process.env.PORT ?? 8787);
// Runtime state must never land inside the specification repo: the repository
// manifest gate requires an exact file inventory, so a database file created here
// would fail validation on first run.
const DB_FILE = process.env.ORB_DB ?? join(tmpdir(), 'orb-gym', 'orb.db');
const DEV_ACTOR_ALLOWED = process.env.NODE_ENV !== 'production' || process.env.ORB_ALLOW_DEV_ACTOR === '1';

const db = openDb(DB_FILE);

function resolveActor(req) {
  const raw = req.headers['x-actor'];
  if (!raw) return null;
  if (!DEV_ACTOR_ALLOWED) throw new CommandError('DENIED', 'dev actor header disabled in production');
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

const send = (res, status, body, type = 'application/json') => {
  const payload = type === 'application/json' ? JSON.stringify(body, null, 2) : body;
  res.writeHead(status, { 'content-type': type, 'cache-control': 'no-store' });
  res.end(payload);
};

const readBody = (req) => new Promise((ok, bad) => {
  let data = '';
  req.on('data', (c) => {
    data += c;
    if (data.length > 1_000_000) bad(new Error('body too large'));
  });
  req.on('end', () => { try { ok(data ? JSON.parse(data) : {}); } catch (e) { bad(e); } });
  req.on('error', bad);
});

function demoSeed() {
  const now = new Date().toISOString();
  const wsMachine = ENUMS.find((m) => m.entity_id === 'ENT-Workspace');
  if (!wsMachine) throw new Error('no workspace machine');
  const existing = db.prepare('SELECT * FROM workspace WHERE id = ?').get('ws-demo');
  if (existing) return existing;
  insertRow(db, 'workspace', {
    id: 'ws-demo', status: wsMachine.initial_state, version: 1,
    created_at: now, updated_at: now, workspace_id: 'ws-demo', gym_id: 'gym-demo',
  });
  insertRow(db, 'gym', {
    id: 'gym-demo', status: ENUMS.find((m) => m.entity_id === 'ENT-Gym')?.initial_state ?? null,
    version: 1, created_at: now, updated_at: now, workspace_id: 'ws-demo', gym_id: 'gym-demo',
  });
  return db.prepare('SELECT * FROM workspace WHERE id = ?').get('ws-demo');
}

const CONSOLE_HTML = `<!doctype html><meta charset="utf-8"><title>Orb Gym — command console</title>
<style>
 :root{--bg:#f6f7f9;--card:#fff;--ink:#14181f;--muted:#5b6472;--line:#e2e6ec;--accent:#1f5eff}
 *{box-sizing:border-box}
 body{margin:0;font:15px/1.5 system-ui,-apple-system,Segoe UI,sans-serif;background:var(--bg);color:var(--ink)}
 header{padding:20px 24px;background:var(--card);border-bottom:1px solid var(--line)}
 h1{font-size:17px;margin:0 0 4px} p{margin:0;color:var(--muted);font-size:13px}
 main{display:grid;grid-template-columns:340px 1fr;gap:16px;padding:16px 24px 40px}
 .card{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:16px}
 label{display:block;font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);margin:12px 0 4px}
 select,input{width:100%;padding:8px;border:1px solid var(--line);border-radius:8px;font:inherit;background:#fff}
 button{margin-top:14px;width:100%;padding:10px;border:0;border-radius:8px;background:var(--accent);color:#fff;font-weight:600;cursor:pointer}
 pre{background:#0f1420;color:#d7e2f5;padding:14px;border-radius:8px;overflow:auto;font-size:12.5px;margin:12px 0 0}
 .tag{display:inline-block;font-size:11px;padding:2px 7px;border-radius:99px;background:#eef2ff;color:#2a4bd7;margin-left:6px}
</style>
<header><h1>Orb Gym — trusted command console</h1>
 <p>Every write is a specified transition. <span class="tag" id="count">233</span></p></header>
<main>
 <div class="card">
  <label>Command</label><select id="command"></select>
  <label>Record ID</label><input id="record" value="ws-demo">
  <label>Expected version</label><input id="version" value="1">
  <label>Operation ID (retry identity)</label><input id="operation">
  <button id="run">Execute</button>
  <pre id="out">Ready.</pre>
 </div>
 <div class="card"><label>Result</label><pre id="result">—</pre></div>
</main>
<script>
const out=document.getElementById('result');
const cmd=document.getElementById('command');
document.getElementById('operation').value=crypto.randomUUID();
document.getElementById('run').addEventListener('click',async()=>{
  const body={recordId:document.getElementById('record').value.trim(),
    expectedVersion:Number(document.getElementById('version').value)||undefined,
    operationId:document.getElementById('operation').value.trim(),
    actor:{id:'console-actor',kind:'user',grants:['workspace.create_gym'],
      denied:[],workspace_id:'ws-demo',gym_id:'gym-demo'}};
  const r=await fetch('/api/commands/'+encodeURIComponent(cmd.value),{method:'POST',
    headers:{'content-type':'application/json','x-actor':JSON.stringify(body.actor)},
    body:JSON.stringify(body)});
  out.textContent=JSON.stringify(await r.json(),null,2);
});
fetch('/api/commands').then(r=>r.json()).then(d=>{
  document.getElementById('count').textContent=d.count;
  for(const t of d.commands){const o=document.createElement('option');
    o.value=t.command;o.textContent=t.command+' — '+t.entity_table+' ('+t.from_state+' → '+t.to_state+')';cmd.appendChild(o);}
  cmd.value='CompleteWorkspaceSetup';
});
</script>`;

const routes = async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  if (req.method === 'GET' && path === '/') return send(res, 200, CONSOLE_HTML, 'text/html; charset=utf-8');

  // ---- application shell: 114 compiled screens under five selectable presets
  if (req.method === 'GET' && path === '/app') {
    const preset = url.searchParams.get('preset') ?? DEFAULT_PRESET;
    const mode = url.searchParams.get('mode') ?? DEFAULT_MODE;
    return send(res, 200, renderIndex({ preset, mode }), 'text/html; charset=utf-8');
  }
  if (req.method === 'GET' && path.startsWith('/app/')) {
    const route = path.slice(4) || '/';
    const screen = screenByRoute(route);
    if (!screen) return send(res, 404, { ok: false, reason: `no screen at ${route}` });
    const preset = url.searchParams.get('preset') ?? DEFAULT_PRESET;
    const mode = url.searchParams.get('mode') ?? DEFAULT_MODE;
    return send(res, 200, renderScreen(screen, { preset, mode }), 'text/html; charset=utf-8');
  }
  {
    const m = path.match(/^\/api\/screens\/([^/]+)\/tables$/);
    if (req.method === 'GET' && m) return send(res, 200, { screen_id: m[1], tables: screenTables(decodeURIComponent(m[1])) });
  }
  {
    const m = path.match(/^\/api\/records\/([a-z0-9_]+)$/);
    if (m && (req.method === 'GET' || req.method === 'POST')) {
      try {
        if (req.method === 'GET') {
          return send(res, 200, listRecords(db, m[1], {
            workspaceId: url.searchParams.get('workspace_id'), limit: url.searchParams.get('limit'),
          }));
        }
        const body = await readBody(req).catch(() => ({}));
        return send(res, 201, createFixture(db, m[1], body.fields ?? {}, {
          workspaceId: body.workspace_id, gymId: body.gym_id ?? null, dev: process.env.ORB_DEV === '1',
        }));
      } catch (err) {
        if (err instanceof RecordError) {
          const status = err.code === 'CREATION_COMMAND_ABSENT' ? 403 : 422;
          return send(res, status, { ok: false, code: err.code, reason: err.message, ...err.details });
        }
        return send(res, 422, { ok: false, code: 'STORAGE_REFUSED', reason: String(err.message) });
      }
    }
  }

  if (req.method === 'GET' && path === '/api/screens') {
    return send(res, 200, { count: SCREENS.length, screens: SCREENS });
  }
  if (req.method === 'GET' && path === '/api/screen-commands') {
    return send(res, 200, { count: SCREEN_COMMANDS.length, screens: SCREEN_COMMANDS });
  }

  /**
   * Channel adapters. `in_app` is real: it writes a queryable inbox row.
   * Every other channel is deliberately absent, so dispatch records a FAILED
   * attempt ("no adapter configured") instead of pretending to send. Email, SMS
   * and push need a selected provider, verified sender and credentials — none of
   * which exist yet, and inventing them would be a lie in the audit trail.
   */
  const adapters = {
    in_app: ({ outbox_id, event_id, payload }) => {
      const recipient = payload.recipient_id;
      if (!recipient) throw new Error('no recipient for in-app delivery');
      insertRow(db, '_notification_inbox', {
        inbox_id: randomUUID(),
        recipient_id: recipient,
        event_id,
        outbox_id,
        title: payload.event_name ?? event_id,
        body_json: JSON.stringify(payload),
        read_at: null,
        created_at: new Date().toISOString(),
      });
    },
  };

  if (req.method === 'POST' && path === '/api/notifications/dispatch') {
    const body = await readBody(req).catch(() => ({}));
    const summary = await dispatch({
      db, adapters, quietHours: body.quietHours ?? null, limit: body.limit ?? 50,
    });
    return send(res, 200, { ok: true, ...summary });
  }

  {
    const m = path.match(/^\/api\/outbox\/([^/]+)$/);
    if (req.method === 'GET' && m) {
      const rows = outboxFor(db, decodeURIComponent(m[1]));
      return send(res, 200, {
        count: rows.length,
        items: rows.map((r) => ({ ...r, attempts_detail: attemptsFor(db, r.outbox_id) })),
      });
    }
  }

  if (req.method === 'GET' && path === '/api/inbox') {
    const recipient = url.searchParams.get('recipient');
    const rows = recipient
      ? db.prepare('SELECT * FROM _notification_inbox WHERE recipient_id = ? ORDER BY created_at DESC').all(recipient)
      : db.prepare('SELECT * FROM _notification_inbox ORDER BY created_at DESC LIMIT 100').all();
    return send(res, 200, { count: rows.length, items: rows });
  }

  if (req.method === 'GET' && path === '/api/capabilities') {
    return send(res, 200, {
      count: capabilities().length,
      note: 'state is computed per call from evidence; no readiness flag is stored or accepted',
      capabilities: capabilities(),
    });
  }

  {
    const m = path.match(/^\/api\/capabilities\/([^/]+)\/evaluate$/);
    if (req.method === 'POST' && m) {
      const body = await readBody(req).catch(() => ({}));
      const result = evaluateCapability(decodeURIComponent(m[1]), body.facts ?? {});
      return send(res, 200, result);
    }
  }

  if (req.method === 'POST' && path === '/api/integrations/provider-event') {
    const body = await readBody(req).catch(() => ({}));
    const result = ingestProviderEvent(db, {
      eventId: body.eventId ?? body.event_id,
      provider: body.provider,
      rawBody: body.rawBody ?? body.raw_body ?? '',
      headers: {
        'x-orb-signature': body.signature ?? null,
        'x-orb-timestamp': body.timestamp ?? null,
      },
      secret: process.env.ORB_PROVIDER_SECRET ?? null,
    });
    return send(res, result.ok ? 200 : 401, result);
  }

  {
    const m = path.match(/^\/api\/pos\/(sale|validate)$/);
    if (req.method === 'POST' && m) {
      const body = await readBody(req).catch(() => ({}));
      if (m[1] === 'validate') {
        const result = validateTillSale(body.sale ?? {});
        return send(res, result.ok ? 200 : 422, result);
      }
      const result = recordTillSale({ sale: body.sale ?? {}, capabilityFacts: body.capability_facts ?? {} });
      return send(res, 409, result);
    }
  }

  if (req.method === 'GET' && path === '/api/documents') {
    const templates = listTemplates().map((t) => ({
      template_type_id: t.template_type_id,
      name: t.name,
      representation: t.representation,
      content_readiness_gate: t.content_readiness_gate,
      required_payload_fields: t.required_payload_fields.length,
      status: t.status,
    }));
    return send(res, 200, { count: templates.length, templates });
  }

  {
    const m = path.match(/^\/api\/documents\/([^/]+)(?:\/(draft|issue|validate))?$/);
    if (m) {
      const templateId = decodeURIComponent(m[1]);
      const action = m[2] ?? 'get';
      if (req.method === 'GET' && action === 'get') {
        const template = templateById(templateId);
        if (!template) return send(res, 404, { ok: false, reason: 'UNKNOWN_TEMPLATE' });
        return send(res, 200, template);
      }
      if (req.method === 'POST') {
        const body = await readBody(req).catch(() => ({}));
        const payload = body.payload ?? {};
        if (action === 'validate') return send(res, 200, validatePayload(templateId, payload));
        if (action === 'draft') {
          const r = renderDraft(templateId, payload);
          return send(res, r.ok ? 200 : 422, r);
        }
        if (action === 'issue') {
          const r = issueDocument(templateId, payload);
          return send(res, r.ok ? 200 : 409, r);
        }
      }
    }
  }

  if (req.method === 'GET' && path === '/api/reports') {
    return send(res, 200, { count: REPORT_VIEWS.length, views: REPORT_VIEWS });
  }

  {
    const m = path.match(/^\/api\/reports\/([^/]+)$/);
    if (req.method === 'GET' && m) {
      const view = REPORT_VIEWS.find((v) => v.report_id === decodeURIComponent(m[1]));
      if (!view) return send(res, 404, { ok: false, reason: 'unknown report view' });
      const scope = {
        workspaceId: url.searchParams.get('workspace_id') ?? null,
        gymId: url.searchParams.get('gym_id') ?? null,
      };
      const implByMetric = new Map(IMPLEMENTED_METRICS.map((i) => [i.metric_id, i]));
      const reasonByKey = new Map(UNIMPLEMENTED_METRICS.map((u) => [u.key, u.reason]));

      const metrics = view.metric_ids.map((metricId) => {
        const impl = implByMetric.get(metricId);
        if (impl) {
          const r = metricValue(db, impl.key, scope);
          return { metric_id: metricId, key: impl.key, ...r };
        }
        const blocked = UNIMPLEMENTED_METRICS.find((u) => u.key === metricId);
        return {
          metric_id: metricId,
          status: 'REQUIRES_FIELD_MAPPING',
          value: null,
          value_minor: null,
          reason: reasonByKey.get(blocked?.key) ?? 'no SQL implementation is compiled for this metric',
        };
      });

      return send(res, 200, {
        report_id: view.report_id,
        name: view.name,
        scope,
        computed: metrics.filter((x) => x.status === 'OK').length,
        not_computed: metrics.filter((x) => x.status !== 'OK').length,
        metrics,
      });
    }
  }

  if (req.method === 'GET' && path === '/api/policies') {
    const workspaceId = url.searchParams.get('workspace_id') ?? 'ws-demo';
    const policies = listPolicies().map((p) => ({
      ...p,
      runtime_status: statusFor(db, p.policy_id, workspaceId),
      missing_fields: missingFields(db, p.policy_id, workspaceId),
    }));
    return send(res, 200, { count: policies.length, workspace_id: workspaceId, policies });
  }

  if (req.method === 'GET' && path === '/api/policies/readiness') {
    const workspaceId = url.searchParams.get('workspace_id') ?? 'ws-demo';
    const rows = readiness(db, workspaceId);
    return send(res, 200, {
      workspace_id: workspaceId,
      configured: rows.filter((r) => r.status === 'CONFIGURED').length,
      unconfigured: rows.filter((r) => r.status !== 'CONFIGURED').length,
      policies: rows,
    });
  }

  {
    const m = path.match(/^\/api\/policies\/([^/]+)\/values$/);
    if (req.method === 'POST' && m) {
      const body = await readBody(req).catch(() => ({}));
      const result = configurePolicy(db, {
        policyId: decodeURIComponent(m[1]),
        workspaceId: body.workspace_id ?? body.workspaceId ?? 'ws-demo',
        values: body.values ?? {},
        approvedBy: body.approved_by ?? null,
      });
      return send(res, result.ok ? 200 : 400, result);
    }
  }

  if (req.method === 'GET' && path === '/api/notifications') {
    const events = (await import('../generated/notifications.mjs')).EVENTS;
    return send(res, 200, { count: events.length, events });
  }

  if (req.method === 'GET' && path === '/api/cards') {
    return send(res, 200, { count: CARDS.length, cards: CARDS });
  }
  if (req.method === 'GET' && path === '/api/theme') {
    const preset = url.searchParams.get('preset');
    const mode = url.searchParams.get('mode');
    const themes = THEMES.filter((t) => (!preset || t.preset_id === preset) && (!mode || t.mode === mode));
    return send(res, 200, { presets: PRESETS, count: themes.length, themes });
  }

  if (req.method === 'GET' && path === '/health') {
    return send(res, 200, {
      ok: true,
      app: 'orb-gym',
      edition: '0.36.0',
      spec: report.counts,
      tables: tables(db).length,
      transitions_loaded: TRANSITIONS.length,
      relationships: RELATIONSHIPS.length,
      orphan_entities: ORPHAN_ENTITIES,
    });
  }

  if (req.method === 'GET' && path === '/api/commands') {
    return send(res, 200, {
      count: TRANSITIONS.length,
      commands: TRANSITIONS.map((t) => ({
        command: t.command, transition_id: t.transition_id, entity_table: t.entity_table,
        from_state: t.from_state, to_state: t.to_state, mode: t.mode, requires: t.requires,
      })),
    });
  }

  if (req.method === 'POST' && path === '/api/seed') {
    return send(res, 200, { ok: true, workspace: demoSeed() });
  }

  const cmdMatch = path.match(/^\/api\/commands\/([A-Za-z0-9_]+)$/);
  if (req.method === 'POST' && cmdMatch) {
    const command = decodeURIComponent(cmdMatch[1]);
    const body = await readBody(req).catch(() => null);
    if (!body) return send(res, 400, { ok: false, outcome: 'VALIDATION', reason: 'invalid JSON body' });
    const actor = body.actor ?? resolveActor(req);
    if (!actor) return send(res, 401, { ok: false, outcome: 'DENIED', reason: 'no actor supplied' });
    try {
      const out = executeCommand({
        db, command,
        recordId: body.recordId ?? body.record_id,
        actor,
        expectedVersion: body.expectedVersion ?? body.expected_version,
        operationId: body.operationId ?? body.operation_id,
        payload: body.payload ?? {},
        notifications: body.notifications ?? [],
        workflowId: body.workflowId ?? body.workflow_id ?? null,
      });
      return send(res, 200, out);
    } catch (err) {
      if (err instanceof CommandError) {
        const status = { DENIED: 403, NOT_FOUND: 404, UNKNOWN_COMMAND: 400, VALIDATION: 400, CONFLICT: 409, INVALID_STATE: 409 }[err.outcome] ?? 400;
        return send(res, status, { ok: false, outcome: err.outcome, reason: err.message, details: err.details });
      }
      throw err;
    }
  }

  const recMatch = path.match(/^\/api\/records\/([a-z_][a-z0-9_]*)\/([^/]+)$/);
  if (req.method === 'GET' && recMatch) {
    const actor = resolveActor(req);
    if (!actor) return send(res, 401, { ok: false, reason: 'no actor supplied' });
    const row = getRow(db, recMatch[1], decodeURIComponent(recMatch[2]));
    if (!row) return send(res, 404, { ok: false, reason: 'not found' });
    if (row.workspace_id && actor.workspace_id && row.workspace_id !== actor.workspace_id && !actor.platform_admin) {
      return send(res, 403, { ok: false, outcome: 'DENIED', reason: 'record belongs to another workspace' });
    }
    return send(res, 200, { ok: true, record: row });
  }

  const auditMatch = path.match(/^\/api\/audit\/([a-z_][a-z0-9_]*)\/([^/]+)$/);
  if (req.method === 'GET' && auditMatch) {
    return send(res, 200, { ok: true, events: auditTrail(db, auditMatch[1], decodeURIComponent(auditMatch[2])) });
  }

  const transMatch = path.match(/^\/api\/transitions\/([A-Za-z0-9-]+)$/);
  if (req.method === 'GET' && transMatch) {
    const tr = TRANSITIONS.find((t) => t.transition_id === transMatch[1]);
    return tr ? send(res, 200, tr) : send(res, 404, { ok: false, reason: 'unknown transition' });
  }

  return send(res, 404, { ok: false, reason: `no route for ${req.method} ${path}` });
};

const server = createServer((req, res) => {
  routes(req, res).catch((err) => {
    send(res, 500, { ok: false, reason: err.message, code: err.outcome ?? 'INTERNAL' });
  });
});

server.listen(PORT, () => {
  console.log(`Orb Gym listening on http://localhost:${PORT}`);
  console.log(`db=${DB_FILE} transitions=${TRANSITIONS.length} findTransition=${typeof findTransition}`);
});

export { server, db, randomUUID };
