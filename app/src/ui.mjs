/**
 * Screen shell renderer.
 *
 * Every screen here comes from docs/design/screen-inventory.json via the
 * compiler: nothing is hand-authored. The five selectable presets are applied
 * from docs/design/theme-tokens.json, so switching preset in the UI switches real
 * generated token values, not a stylesheet guess.
 *
 * Rendering deliberately shows only what the specification actually declares per
 * screen: components, bound workflows, permission rule, device rule. It does not
 * invent form fields or fake records.
 */
import { SCREENS } from '../generated/screens.mjs';
import { PRESETS, THEMES } from '../generated/theme.mjs';
import { CARDS } from '../generated/cards.mjs';
import { SCREEN_COMMANDS } from '../generated/screen-commands.mjs';
import { EVENTS } from '../generated/notifications.mjs';
import { ENUMS } from '../generated/enums.mjs';
import { TRANSITIONS } from '../generated/transitions.mjs';
import { screenTables } from './records.mjs';
import { PRODUCT_SCREENS, SCREEN_CSS, FORM_SCRIPT } from './screens/index.mjs';

const DOMAIN_ORDER = ['PUBLIC', 'AUTH', 'SPACE', 'DESIGN', 'RELEASE', 'USER', 'MEM', 'JUNIOR', 'CLASS',
  'COACH', 'TRIAL', 'ENTRY', 'TASK', 'STAFF', 'CAL', 'POS', 'FIN', 'DOC', 'FEED', 'AI', 'IMPORT', 'LAND'];

const DOMAIN_LABEL = {
  PUBLIC: 'Public site', AUTH: 'Identity and access', SPACE: 'Workspace and gym', DESIGN: 'Design and branding',
  RELEASE: 'Release', USER: 'Account', MEM: 'Membership', JUNIOR: 'Juniors', CLASS: 'Classes',
  COACH: 'Coaching', TRIAL: 'Trials', ENTRY: 'Entry and check-in', TASK: 'Tasks and assets',
  STAFF: 'Staff and rota', CAL: 'Calendar', POS: 'Point of sale', FIN: 'Finance', DOC: 'Documents',
  FEED: 'Community', AI: 'Assistance', IMPORT: 'Import', LAND: 'Landing',
};

export const DEFAULT_PRESET = 'basic-01';
/** CMP-FOOTER: exact protected attribution, on every app/auth page. */
export const FOOTER_TEXT = 'Orb Gym - powered by orbsolutions.co.uk';
const FOOTER = `<footer class="foot"><a href="https://orbsolutions.co.uk">${FOOTER_TEXT}</a></footer>`;
export const DEFAULT_MODE = 'light';

export function screenById(id) {
  return SCREENS.find((s) => s.screen_id === id) ?? null;
}

export function screenByRoute(route) {
  return SCREENS.find((s) => s.route === route) ?? null;
}

export function findTheme(presetId = DEFAULT_PRESET, mode = DEFAULT_MODE) {
  return THEMES.find((t) => t.preset_id === presetId && t.mode === mode)
    ?? THEMES.find((t) => t.preset_id === DEFAULT_PRESET && t.mode === DEFAULT_MODE);
}

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

/** CSS custom properties from the compiled theme. */
function tokenCss(theme) {
  const s = theme?.semantic ?? {};
  const v = (k, fb) => s[k] ?? fb;
  return `
  --canvas:${v('canvas', '#F2F4F7')};--surface:${v('surface', '#fff')};--raised:${v('raised', '#fff')};
  --text:${v('text', '#0B1220')};--muted:${v('textMuted', '#5B6472')};--border:${v('border', '#E5E7EB')};
  --control:${v('controlBorder', '#737D8F')};--accent:${v('accent', '#044EFC')};--action:${v('action', '#044EFC')};
  --actionText:${v('actionText', '#fff')};--selectedSurface:${v('selectedSurface', '#E8F0FF')};
  --selectedText:${v('selectedText', '#153E91')};--danger:${v('danger', '#9F1239')};
  --success:${v('success', '#166534')};--focus:${v('focus', '#044EFC')};`;
}

function navGroups() {
  const groups = new Map();
  for (const s of SCREENS) {
    if (!groups.has(s.domain)) groups.set(s.domain, []);
    groups.get(s.domain).push(s);
  }
  return [...groups.entries()].sort((a, b) => {
    const ia = DOMAIN_ORDER.indexOf(a[0]); const ib = DOMAIN_ORDER.indexOf(b[0]);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a[0].localeCompare(b[0]);
  });
}

export function shell({ title, preset, mode, body, activeScreen, account = null, extraCss = '', script = '' }) {
  const theme = findTheme(preset, mode);
  const groups = navGroups();
  const nav = groups.map(([domain, screens]) => `
    <div class="navgroup">
      <p class="navlabel">${esc(DOMAIN_LABEL[domain] ?? domain)}</p>
      ${screens.map((s) => `<a class="navlink${activeScreen === s.screen_id ? ' on' : ''}" href="/app${s.route}?preset=${preset}&mode=${mode}">${esc(s.name)}</a>`).join('')}
    </div>`).join('');

  const presetOpts = PRESETS.map((p) => `<option value="${esc(p.preset_id)}"${p.preset_id === preset ? ' selected' : ''}>${esc(p.label)}</option>`).join('');

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)} · Orb Gym</title>
<style>
*{box-sizing:border-box}
body{margin:0;font:15px/1.55 system-ui,-apple-system,'Segoe UI',sans-serif;background:var(--canvas);color:var(--text)}
a{color:inherit;text-decoration:none}
.top{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;padding:10px 18px;background:var(--surface);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:5}
.brand{font-weight:700;letter-spacing:-.01em;margin-right:auto}
select,button,input,textarea{font:inherit;padding:7px 10px;border:1px solid var(--control);border-radius:8px;background:var(--surface);color:var(--text);max-width:100%}
:focus-visible{outline:2px solid var(--focus);outline-offset:2px}
button{cursor:pointer}
.wrap{display:grid;grid-template-columns:264px 1fr;min-height:calc(100vh - 57px)}
aside{background:var(--surface);border-right:1px solid var(--border);padding:14px 10px;overflow:auto}
.navgroup{margin-bottom:14px}
.navlabel{margin:0 0 4px 8px;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.navlink{display:block;padding:6px 8px;border-radius:7px;font-size:13.5px;color:var(--text)}
.navlink:hover{background:var(--selectedSurface);color:var(--selectedText)}
.navlink.on{background:var(--selectedSurface);color:var(--selectedText);font-weight:600}
main{padding:22px 26px 24px;max-width:1100px;min-width:0;display:flex;flex-direction:column}
main>.content{flex:1}
.foot{margin-top:32px;padding-top:14px;border-top:1px solid var(--border);font-size:12.5px;color:var(--muted)}
.foot a{text-decoration:underline}
.acct{font-size:13px;color:var(--muted)}
.scroll{overflow-x:auto;max-width:100%}
pre{white-space:pre-wrap;word-break:break-word}
h1{font-size:22px;margin:0 0 4px;letter-spacing:-.01em}
.crumb{color:var(--muted);font-size:12.5px;margin-bottom:18px}
.card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px 18px;margin-bottom:14px;overflow-x:auto}
.card h2{font-size:13px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);margin:0 0 12px}
.chips{display:flex;flex-wrap:wrap;gap:6px}
.chip{font-size:12px;padding:3px 9px;border-radius:99px;background:var(--selectedSurface);color:var(--selectedText);border:1px solid var(--border)}
.chip.plain{background:transparent;color:var(--muted)}
.btn{background:var(--action);color:var(--actionText);border:0;font-weight:600}
table{width:100%;border-collapse:collapse;font-size:13.5px}
th,td{text-align:left;padding:8px 6px;border-bottom:1px solid var(--border);vertical-align:top}
th{font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--muted)}
.muted{color:var(--muted);font-size:13px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px}
.tile{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:14px}
.tile b{display:block;margin-bottom:4px;font-size:14px}
.badge{font-size:11px;padding:2px 8px;border-radius:99px;background:var(--selectedSurface);color:var(--selectedText)}
.bottom{display:none}
@media(max-width:860px){
 .wrap{grid-template-columns:1fr}
 aside{display:none}
 main{padding:16px 14px 88px}
 .top{padding:10px 14px}
 .top .hide-sm{display:none}
 #preset{flex:1 1 140px;min-width:0}
 .bottom{display:flex;position:fixed;bottom:0;left:0;right:0;background:var(--surface);border-top:1px solid var(--border);z-index:6}
 .bottom a{flex:1;text-align:center;padding:11px 4px;font-size:11.5px;color:var(--muted)}
 .bottom a.on{color:var(--accent);font-weight:600}
}
${extraCss}
</style></head><body style="${tokenCss(theme)}">
<header class="top">
  <span class="brand">Orb Gym</span>
  <select id="preset" aria-label="UI preset">${presetOpts}</select>
  <button class="btn" id="mode">${mode === 'light' ? 'Dark' : 'Light'}</button>
  ${account ? `<span class="acct">${account}</span>` : ''}
  <a class="muted hide-sm" href="/">Console</a>
</header>
<div class="wrap">
  <aside>${nav}</aside>
  <main><div class="content">${body}</div>${FOOTER}</main>
</div>
<nav class="bottom">
  <a class="on" href="/app${activeScreen && screenById(activeScreen) ? screenById(activeScreen).route : '/public/landing'}?preset=${preset}&mode=${mode}">Screen</a>
  <a href="/app?preset=${preset}&mode=${mode}">All ${SCREENS.length}</a>
  <a href="/api/commands">Commands ${TRANSITIONS.length}</a>
  <a href="/">Console</a>
</nav>
<script>
const p=document.getElementById('preset'),m=document.getElementById('mode');
p.addEventListener('change',()=>{const u=new URL(location.href);u.searchParams.set('preset',p.value);location.assign(u)});
m.addEventListener('click',()=>{const u=new URL(location.href);u.searchParams.set('mode',m.textContent.trim().toLowerCase());location.assign(u)});
</script>
${script ? `<script>${script}</script>` : ''}
</body></html>`;
}

export function renderIndex({ preset, mode }) {
  const groups = navGroups();
  const body = `
    <h1>Application screens</h1>
    <p class="crumb">${SCREENS.length} screens compiled from docs/design/screen-inventory.json · ${PRESETS.length} selectable presets · ${CARDS.length} delivery cards</p>
    ${groups.map(([domain, screens]) => `
      <section class="card">
        <h2>${esc(DOMAIN_LABEL[domain] ?? domain)} <span class="badge">${screens.length}</span></h2>
        <div class="grid">
          ${screens.map((s) => `<a class="tile" href="/app${s.route}?preset=${preset}&mode=${mode}">
            <b>${esc(s.name)}</b>
            <span class="muted">${esc(s.route)}</span><br>
            <span class="muted">${(s.workflow_ids ?? []).length} workflows · ${(s.components ?? []).length} components</span>
          </a>`).join('')}
        </div>
      </section>`).join('')}`;
  return shell({ title: 'Screens', preset, mode, body, activeScreen: null });
}


/**
 * Live command runner. Wired to the real engine, not a mock: the derived
 * screen-to-command binding decides what this screen may run, and the response is
 * whatever the engine returned, including a refusal.
 *
 * The development actor echoes the command's own required grants and is labelled
 * as such. It exists to exercise the engine locally; it is not authentication.
 */
function commandCard(screen, { preset, mode }) {
  const binding = SCREEN_COMMANDS.find((x) => x.screen_id === screen.screen_id);
  const commands = binding?.commands ?? [];
  if (!commands.length) {
    return `<section class="card"><h2>Commands</h2>
      <p class="muted">No command is bound to this screen by domain derivation. It is a projection or public surface.</p></section>`;
  }
  const domains = new Set(binding.domains);
  const candidates = EVENTS.filter((e) => domains.has(e.domain));
  const rows = commands.map((c) => `<tr>
      <td><b>${esc(c.command)}</b></td>
      <td class="muted">${esc(c.entity_table)}</td>
      <td class="muted">${esc(c.from_state)} → ${esc(c.to_state)}</td>
      <td class="muted">${esc(c.mode)}</td>
    </tr>`).join('');

  return `<section class="card">
    <h2>Commands <span class="badge">${commands.length}</span></h2>
    <p class="muted">Bound by shared domain (${esc(binding.domains.join(', '))}); the specification declares no screen-to-command edge.</p>
    <table><thead><tr><th>Command</th><th>Table</th><th>Transition</th><th>Authorization</th></tr></thead><tbody>${rows}</tbody></table>

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin-top:14px">
      <label class="muted">Command<select id="cmd">${commands.map((c) => `<option value="${esc(c.command)}">${esc(c.command)}</option>`).join('')}</select></label>
      <label class="muted">Record ID<input id="rec" value=""></label>
      <label class="muted">Expected version<input id="ver" value="1"></label>
      <label class="muted">Operation ID<input id="op" value=""></label>
      <label class="muted">Notify event (optional)<select id="evt"><option value="">none</option>
        ${candidates.map((e) => `<option value="${esc(e.event_id)}">${esc(e.event_id)} ${esc(e.name)}</option>`).join('')}
      </select></label>
      <label class="muted">Recipient (optional)<input id="rcp" value=""></label>
    </div>
    <p><button class="btn" id="run">Execute command</button>
       <span class="muted" id="note"> dev actor grants are echoed from the command's own requirement</span></p>
    <pre id="result" style="background:var(--canvas);border:1px solid var(--border);border-radius:8px;padding:12px;font-size:12.5px;overflow:auto">—</pre>

    <script>
    (function(){
      const cmds = ${JSON.stringify(commands)};
      document.getElementById('op').value = crypto.randomUUID();
      const out = document.getElementById('result');
      document.getElementById('run').addEventListener('click', async () => {
        const name = document.getElementById('cmd').value;
        const spec = cmds.find(c => c.command === name);
        const recipient = document.getElementById('rcp').value.trim();
        const evt = document.getElementById('evt').value;
        const recordId = document.getElementById('rec').value.trim();
        const body = {
          recordId,
          expectedVersion: Number(document.getElementById('ver').value) || undefined,
          operationId: document.getElementById('op').value.trim(),
          actor: { id: 'ui-actor', kind: 'user', grants: spec.requires, denied: [],
                   workspace_id: 'ws-demo', gym_id: 'gym-demo' },
          notifications: evt ? [{ event_id: evt, dedup_key: evt + ':' + recordId,
                                  recipient_id: recipient || null,
                                  payload: { recipient_id: recipient || null } }] : []
        };
        const r = await fetch('/api/commands/' + encodeURIComponent(name), {
          method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
        out.textContent = JSON.stringify(await r.json(), null, 2);
      });
    })();
    </script>
  </section>`;
}

/**
 * Live records: one panel per table the screen's commands act on. Each row offers only
 * the transitions whose from_state matches its current status, and every action sends
 * the row's own version as expectedVersion, so a stale tab is refused (INVALID_STATE when
 * the state moved, CONFLICT when only the version did), never a lost update. The actor is a labelled dev actor whose grants equal the command's
 * requirement; it proves wiring, not authorisation policy.
 */
function recordsCard(screen) {
  const tables = screenTables(screen.screen_id);
  if (!tables.length) return '';
  return `<section class="card" id="live">
    <h2>Live records <span class="badge">${tables.length} table${tables.length > 1 ? 's' : ''}</span></h2>
    <p class="muted">Tables derived from this screen's bound commands. Actions shown per row are the
      transitions valid from that row's current state. <b>DEV ACTOR</b>: grants equal each command's requirement.</p>
    <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:end;margin:8px 0 12px">
      <label class="muted">Workspace<input id="ws" value="ws-demo"></label>
      <label class="muted">Table<select id="tbl">${tables.map((x) => `<option>${esc(x)}</option>`).join('')}</select></label>
      <button class="btn" id="reload" type="button">Refresh</button>
      <button class="btn" id="mk" type="button" title="Dev fixture path; disabled unless ORB_DEV=1">Create dev fixture</button>
    </div>
    <div id="rows" role="region" aria-live="polite" class="muted">Loading…</div>
    <pre id="actres" style="background:var(--canvas);border:1px solid var(--border);border-radius:8px;padding:12px;font-size:12.5px;overflow:auto;max-height:260px">—</pre>
    <script>
    (function(){
      const $ = (id) => document.getElementById(id);
      const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
      let current = [];
      async function load(){
        const r = await fetch('/api/records/' + $('tbl').value + '?workspace_id=' + encodeURIComponent($('ws').value));
        const d = await r.json();
        if (!r.ok) { $('rows').textContent = d.reason || 'refused'; return; }
        current = d.records;
        if (!d.records.length) { $('rows').innerHTML = '<p>No records in this workspace. Seed, or create a dev fixture.</p>'; return; }
        $('rows').innerHTML = '<table><thead><tr><th>Record</th><th>State</th><th>v</th><th>Updated</th><th>Valid actions</th></tr></thead><tbody>'
          + d.records.map((row, i) => '<tr><td><code>' + esc(row.id.slice(0, 12)) + '</code></td><td><span class="chip">' + esc(row.status ?? '—')
          + '</span></td><td>' + row.version + '</td><td class="muted">' + esc((row.updated_at || '').slice(0, 19).replace('T', ' ')) + '</td><td>'
          + (row.next_actions.length ? row.next_actions.map((a, j) => '<button class="btn" type="button" data-i="' + i + '" data-j="' + j + '" title="'
              + esc(a.transition_id + ' → ' + a.to_state + (a.source === 'derived' ? ' (derived)' : '')) + '">' + esc(a.command) + '</button>').join(' ')
             : '<span class="muted">terminal for this table</span>')
          + '</td></tr>').join('') + '</tbody></table>';
      }
      $('rows').addEventListener('click', async (e) => {
        const b = e.target.closest('button[data-i]'); if (!b) return;
        const row = current[+b.dataset.i], act = row.next_actions[+b.dataset.j];
        const payload = {};
        if (act.reason_field) {
          const why = prompt(act.command + ' requires a reason'); if (!why) return;
          payload[act.reason_field] = why;
        }
        const r = await fetch('/api/commands/' + encodeURIComponent(act.command), { method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ recordId: row.id, expectedVersion: row.version, operationId: crypto.randomUUID(), payload,
            actor: { id: 'ui-dev-actor', kind: 'user', grants: act.requires, denied: [], workspace_id: $('ws').value } }) });
        $('actres').textContent = JSON.stringify(await r.json(), null, 2);
        load();
      });
      $('reload').addEventListener('click', load);
      $('tbl').addEventListener('change', load);
      $('mk').addEventListener('click', async () => {
        const r = await fetch('/api/records/' + $('tbl').value, { method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ workspace_id: $('ws').value, fields: {} }) });
        $('actres').textContent = JSON.stringify(await r.json(), null, 2);
        load();
      });
      load();
    })();
    </script>
  </section>`;
}

/**
 * A screen with a product renderer (src/screens/) gets a working page when request
 * context is supplied; the spec preview stays underneath in a collapsed section. Without
 * context, or for screens no card has built yet, the spec preview renders as before.
 */
export function renderScreen(screen, { preset, mode, ctx = null }) {
  const product = ctx && PRODUCT_SCREENS[screen.screen_id];
  if (product) {
    let inner;
    try {
      inner = product.render(ctx, ctx.query ?? new URLSearchParams());
    } catch (err) {
      inner = `<section class="card state state-failed" role="alert" data-state="failed"><p class="state-kind">Something went wrong</p><p>This page could not be built. Nothing was changed.</p></section>`;
      console.error(err);
    }
    const who = ctx.actor?.display_name ?? ctx.session?.contact ?? null;
    const account = who
      ? `${esc(who)}${ctx.identity.capabilities().synthetic ? ' · synthetic' : ''} · <a href="/app/auth/sessions-and-security?preset=${esc(preset)}&mode=${esc(mode)}"><u>Account</u></a>`
      : `<a href="/app/auth/sign-in?preset=${esc(preset)}&mode=${esc(mode)}"><u>Sign in</u></a>`;
    const body = `<h1>${esc(screen.name)}</h1>
      <p class="crumb">${esc(DOMAIN_LABEL[screen.domain] ?? screen.domain)} · card ${esc(product.card)}</p>
      ${inner}
      <details class="spec card"><summary>Specification: ${esc(screen.screen_id)} ${esc(screen.route)}</summary>${specPreview(screen, { preset, mode })}</details>`;
    return shell({ title: screen.name, preset, mode, body, activeScreen: screen.screen_id, account, extraCss: SCREEN_CSS, script: FORM_SCRIPT });
  }
  return shell({ title: screen.name, preset, mode, body: specPreview(screen, { preset, mode }, true), activeScreen: screen.screen_id });
}

function specPreview(screen, { preset, mode }, standalone = false) {
  const machine = ENUMS.find((m) => m.machine_id === `SM-${(screen.domain ?? '').toUpperCase()}`);
  return `${standalone ? `
    <h1>${esc(screen.name)}</h1>
    <p class="crumb">${esc(screen.screen_id)} · ${esc(DOMAIN_LABEL[screen.domain] ?? screen.domain)} · ${esc(screen.route)}</p>` : ''}

    <section class="card">
      <h2>Declared components</h2>
      <div class="chips">${(screen.components ?? []).map((c) => `<span class="chip">${esc(c)}</span>`).join('') || '<span class="muted">none declared</span>'}</div>
    </section>

    <section class="card">
      <h2>Bound workflows</h2>
      ${(screen.workflow_ids ?? []).length
        ? `<table><thead><tr><th>Workflow</th><th>Layout</th></tr></thead><tbody>
           ${(screen.workflow_ids ?? []).map((w) => `<tr><td>${esc(w)}</td><td class="muted">${esc(screen.layout ?? '')}</td></tr>`).join('')}
           </tbody></table>`
        : '<p class="muted">No workflow bound; this screen is a projection only.</p>'}
    </section>

    <section class="card">
      <h2>Access contract</h2>
      <p class="muted">${esc(screen.permission_rule ?? 'not specified')}</p>
      ${screen.access_mode ? `<p class="muted">Access mode: ${esc(screen.access_mode)}</p>` : ''}
    </section>

    <section class="card">
      <h2>Device rule</h2>
      <p class="muted">${esc(screen.device_rule ?? 'not specified')}</p>
      ${machine ? `<p class="muted">${esc(machine.machine_id)} states: ${machine.states.map((s) => `<span class="chip plain">${esc(s)}</span>`).join(' ')}</p>` : ''}
    </section>

    ${recordsCard(screen)}
    ${commandCard(screen, { preset, mode })}

    <section class="card">
      <h2>Preset in force</h2>
      <p class="muted">${esc(preset)} · ${esc(mode)} mode, values compiled from docs/design/theme-tokens.json</p>
      <div class="chips">
        <span class="chip">accent</span><span class="chip">action</span><span class="chip">selected</span>
        <span class="chip">success</span><span class="chip plain">danger</span>
      </div>
      <p><button class="btn" disabled style="opacity:.55;cursor:not-allowed">Primary action (wired in the next stage)</button></p>
    </section>`;
}
