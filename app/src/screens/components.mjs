/**
 * Shared product-screen components (docs/design/component-catalogue.json).
 *
 *   CMP-STATE  statePanel: empty / denied / failed / blocked, each saying why and what next
 *   CMP-FORM   form: visible labels, per-field errors, one explicit submit
 *   CMP-TABLE  table: reference, name, status, gym and next action
 *
 * Forms are server-rendered and posted by one small script (FORM_SCRIPT). It keeps one
 * operation id per form until the server accepts it, so a retry after a network failure
 * replays instead of duplicating, and it sends the record version the page was rendered
 * with, so a stale page is refused rather than overwriting newer work.
 */
import { TRANSITIONS } from '../../generated/transitions.mjs';
import { nextActions } from '../records.mjs';
import { can } from '../identity/actor.mjs';

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

const STATE_LABEL = { empty: 'Nothing here yet', denied: 'Not available to you', failed: 'Something went wrong', blocked: 'Blocked' };

export function statePanel(kind, title, message, extra = '') {
  return `<section class="card state state-${esc(kind)}" role="${kind === 'failed' ? 'alert' : 'status'}" data-state="${esc(kind)}">
    <p class="state-kind">${esc(STATE_LABEL[kind] ?? kind)}</p>
    <h2 class="state-title">${esc(title)}</h2>
    <p>${esc(message)}</p>${extra}
  </section>`;
}

/** A proposal awaiting the owner: rendered disabled, with the owner's question. */
export function proposalBlocked(creation, label) {
  return statePanel('blocked', `${label}: awaiting owner approval`,
    `${creation.creation_id} ${creation.command} is a drafted proposal. It runs only after the owner approves it (or in development with ORB_ALLOW_PROPOSED=1).`,
    `<p class="muted">Refusal code: PROPOSAL_NOT_APPROVED</p>`);
}

/**
 * @param {object} o
 * @param {string} o.endpoint  /api/create/X, /api/commands/X or /api/auth/x
 * @param {'command'|'auth'} [o.kind]  command forms wrap fields in {operationId, recordId, expectedVersion, payload}
 * @param {Array} o.fields     {name, label, type, required, max, value, help, options}
 */
export function form({ endpoint, kind = 'command', fields = [], submit, recordId = null, version = null, next = null, danger = false, note = '' }) {
  const input = (f) => {
    const id = `f-${f.name}-${Math.abs(hash(endpoint + f.name))}`;
    const attrs = `id="${id}" name="${esc(f.name)}"${f.required ? ' required' : ''}${f.max ? ` maxlength="${f.max}"` : ''} aria-describedby="${id}-err${f.help ? ` ${id}-help` : ''}"`;
    const control = f.options
      ? `<select ${attrs}>${f.options.map((o) => `<option value="${esc(o.value)}"${o.value === f.value ? ' selected' : ''}>${esc(o.label)}</option>`).join('')}</select>`
      : `<input type="${esc(f.type ?? 'text')}" ${attrs} value="${esc(f.value ?? '')}"${f.autocomplete ? ` autocomplete="${esc(f.autocomplete)}"` : ''}>`;
    return `<div class="field"><label for="${id}">${esc(f.label)}${f.required ? '' : ' <span class="muted">(optional)</span>'}</label>
      ${control}
      ${f.help ? `<p class="muted" id="${id}-help">${esc(f.help)}</p>` : ''}
      <p class="err" id="${id}-err" data-for="${esc(f.name)}"></p></div>`;
  };
  return `<form class="orb-form" data-orb data-kind="${kind}" data-endpoint="${esc(endpoint)}"${recordId ? ` data-record="${esc(recordId)}"` : ''}${version !== null ? ` data-version="${esc(version)}"` : ''}${next ? ` data-next="${esc(next)}"` : ''} novalidate>
    ${fields.map(input).join('')}
    ${note ? `<p class="muted">${note}</p>` : ''}
    <div class="actions"><button class="btn${danger ? ' danger' : ''}" type="submit">${esc(submit)}</button></div>
    <p class="result" role="status" data-status></p>
  </form>`;
}

/** One state-machine command as a button; returns '' if the actor lacks the grants. */
export function commandButton(actor, action, row, { label, next = null } = {}) {
  if (action.mode === 'verified_source_actor') return '';
  if (!action.requires.every((p) => can(actor, p))) return '';
  const danger = /Archive|Suspend|Revoke|Restrict|Closure/.test(action.command);
  return form({ endpoint: `/api/commands/${action.command}`, recordId: row.id, version: row.version, submit: label ?? humanise(action.command), danger, next });
}

/** Commands a row can take now, filtered by the actor's grants (the server rechecks). */
export function rowActions(actor, table, row, { only = null, next = null } = {}) {
  const actions = nextActions(table, row.status)
    .map((a) => ({ ...a, mode: TRANSITIONS.find((t) => t.transition_id === a.transition_id)?.mode }))
    .filter((a) => !only || only.includes(a.command));
  const buttons = actions.map((a) => commandButton(actor, a, row, { next })).filter(Boolean);
  return buttons.length ? `<div class="rowactions">${buttons.join('')}</div>` : '<span class="muted">No action available to you</span>';
}

export function table(cols, rows, { empty = 'No records.' } = {}) {
  if (!rows.length) return `<p class="muted">${esc(empty)}</p>`;
  return `<div class="scroll"><table><thead><tr>${cols.map((c) => `<th scope="col">${esc(c.label)}</th>`).join('')}</tr></thead>
    <tbody>${rows.map((r) => `<tr>${cols.map((c) => `<td>${c.html ? c.html(r) : esc(c.value(r))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

export const status = (s) => `<span class="badge st-${esc(String(s).toLowerCase())}">${esc(s)}</span>`;
export const humanise = (cmd) => cmd.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (c) => c.toUpperCase());

function hash(s) { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0; return h; }

export const SCREEN_CSS = `
.field{margin:0 0 12px}.field label{display:block;font-weight:600;font-size:13.5px;margin-bottom:4px}
.field input,.field select{width:100%;max-width:420px}
.err{color:var(--danger);font-size:12.5px;margin:4px 0 0;min-height:0}.err:empty{display:none}
.result{font-size:13px;margin:8px 0 0}.result:empty{display:none}.result.bad{color:var(--danger)}.result.good{color:var(--success)}
.actions{display:flex;gap:8px;flex-wrap:wrap}
.btn.danger{background:var(--danger)}
.rowactions{display:flex;gap:6px;flex-wrap:wrap}.rowactions .orb-form{margin:0}.rowactions .result{max-width:260px}
.rowactions .btn{padding:5px 10px;font-size:13px}
.state{border-left:4px solid var(--control)}.state-denied,.state-failed{border-left-color:var(--danger)}
.state-blocked{border-left-color:var(--accent)}.state-kind{margin:0;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)}
.state-title{font-size:16px!important;text-transform:none!important;letter-spacing:0!important;color:var(--text)!important;margin:2px 0 6px!important}
.steps{list-style:none;padding:0;margin:0}.steps li{display:flex;gap:10px;align-items:flex-start;padding:10px 0;border-bottom:1px solid var(--border)}
.steps li:last-child{border-bottom:0}.steps .n{flex:0 0 26px;height:26px;border-radius:99px;display:grid;place-items:center;font-size:12px;font-weight:700;background:var(--selectedSurface);color:var(--selectedText)}
.steps li.done .n{background:var(--success);color:#fff}.steps .body{flex:1;min-width:0}
details.spec summary{cursor:pointer;color:var(--muted);font-size:13px}
.linkbtn{display:inline-block;padding:7px 12px;border-radius:8px}
.kv{display:grid;grid-template-columns:max-content 1fr;gap:4px 14px;font-size:13.5px}.kv dt{color:var(--muted)}.kv dd{margin:0;overflow-wrap:anywhere}
`;

/** One posting script for every data-orb form. No framework, no dependencies. */
export const FORM_SCRIPT = `
document.querySelectorAll('form[data-orb]').forEach(function(f){
  f.addEventListener('submit',async function(e){
    e.preventDefault();
    var out=f.querySelector('[data-status]'),btn=f.querySelector('button[type=submit]');
    f.querySelectorAll('.err').forEach(function(x){x.textContent=''});
    var fields={};new FormData(f).forEach(function(v,k){fields[k]=v});
    if(!f.dataset.op)f.dataset.op=(crypto.randomUUID?crypto.randomUUID():String(Date.now())+Math.random());
    var body=f.dataset.kind==='auth'?fields:{operationId:f.dataset.op,recordId:f.dataset.record||undefined,
      expectedVersion:f.dataset.version!==undefined?Number(f.dataset.version):undefined,payload:fields};
    btn.disabled=true;out.className='result';out.textContent='Working…';
    try{
      var r=await fetch(f.dataset.endpoint,{method:'POST',headers:{'content-type':'application/json'},credentials:'same-origin',body:JSON.stringify(body)});
      var j=await r.json().catch(function(){return {}});
      if(r.ok&&j.ok!==false){delete f.dataset.op;out.className='result good';out.textContent=j.message||'Done.';
        setTimeout(function(){f.dataset.next?location.assign(f.dataset.next):location.reload()},350);return;}
      var probs=(j.details&&j.details.problems)||[];
      probs.forEach(function(p){var el=f.querySelector('.err[data-for="'+p.field+'"]');if(el)el.textContent=p.problem});
      if(r.status<500&&r.status!==0&&j.outcome!=='CONFLICT')delete f.dataset.op;
      out.className='result bad';
      out.textContent=(j.outcome==='CONFLICT'?'This record changed since the page loaded. Reload to see the current version. ':'')+(j.reason||'The request was not accepted.')+(j.code||j.outcome?' ('+(j.code||j.outcome)+')':'');
    }catch(err){out.className='result bad';out.textContent='No response. Your request may not have been saved; submitting again is safe.';}
    finally{btn.disabled=false}
  });
});`;
