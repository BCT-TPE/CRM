/* Shared task side panel (2026-11-27): New / edit task for Tasks and the account page (old TaskFormDrawer).
   CRM.taskForm(task | null, { acc, onSaved(task, 'new' | 'edit') }). Needs crm.js and crm-data.js first. */
(() => {
const { toast } = CRM, DAY = 864e5;
const iso = (d) => new Date(d).toISOString().slice(0, 10);
const PEOPLE = [...new Set([ME, ...Object.values(TEAMS).flatMap(t => t.people), ...Object.keys(FUNC)])].sort((a, b) => a === ME ? -1 : b === ME ? 1 : a.localeCompare(b));
const nameOf = (p) => p === ME ? `${p} (you)` : p;
const STATUS_LABEL = { ns: 'Not started', ip: 'In progress', done: 'Completed', cxl: 'Cancelled' };
const fld = (label, ctl, { req, hint, err, id } = {}) => `<div class="tf ${err ? 'bad' : ''}" ${id ? `data-f="${id}"` : ''}><span class="tf-l">${label}${req ? '<span class="rq">*</span>' : ''}</span>${ctl}${err ? `<span class="tf-e">${err}</span>` : hint ? `<span class="tf-h">${hint}</span>` : ''}</div>`;
function taskForm(t, { acc = '', onSaved = () => {} } = {}) {
  const isNew = !t, final = !!t && !taskOpen(t);
  const v = isNew ? { acc, si: '', title: '', to: ME, due: iso(TODAY.getTime() + DAY), status: 'ns', note: '', desc: '' }
    : { acc: t.acc, si: t.si || '', title: t.title, to: t.to, due: t.due || '', status: t.status, note: t.note || '', desc: t.desc || '' };
  let errs = {};
  // Side panel: the same .drill panel as the Pipeline / Performance drill-downs (slides in from the right)
  const scrim = document.createElement('aside'); scrim.className = 'drill tf-panel'; scrim.setAttribute('role', 'dialog'); scrim.setAttribute('aria-labelledby', 'tf-t');
  const prev = document.activeElement;
  const close = () => { document.removeEventListener('keydown', key, true); document.body.classList.remove('drill-open'); setTimeout(() => scrim.remove(), 300); prev && prev.focus && prev.focus(); };
  // Cancel, × and Esc ask first when something was entered or changed (design review D3, same dialog as the record page)
  const start = JSON.stringify(v);
  const askClose = async () => { if (final || JSON.stringify(v) === start) return close();
    const r = await CRM.confirm({ title: isNew ? 'Discard this task?' : 'Discard your changes?', body: '<p>What you entered will be lost.</p>',
      actions: [{ label: 'Discard', value: 'discard', kind: 'quiet' }, { label: 'Keep editing', value: null, kind: 'primary' }] });
    if (r === 'discard') close(); };
  const key = (e) => { if (e.key === 'Escape' && !document.body.classList.contains('dlg-open')) { e.preventDefault(); askClose(); } };
  const changing = !isNew && v.status !== t.status && (v.status === 'done' || v.status === 'cxl');
  const draw = () => {
    const sis = INITS.filter(o => o.kind === 'open' && (!v.acc || o.acc === v.acc));
    const closing = !isNew && v.status !== t.status && (v.status === 'done' || v.status === 'cxl');
    const ctx = !isNew && (t.siName || t.acc) ? `<p class="tf-ctx"><b>${esc(t.siName || t.acc)}</b>${t.act ? ` · from ${t.act}` : ''}</p>` : '';
    scrim.innerHTML = `<form class="tf-form" novalidate>
      <header class="dr-head"><div><p class="dr-kind">${isNew ? 'Tasks' : t.id}</p><h2 id="tf-t">${isNew ? 'New task' : esc(t.title)}</h2>
      ${isNew ? '<p class="dr-sub">Follow-ups for anyone: Sales, Presales, Delivery, Finance, Legal.</p>' : `<p class="tf-sub"><span class="sb ${t.status}">${STATUS_LABEL[t.status]}</span>${taskLate(t) ? '<span class="sb late">Overdue</span>' : ''} ${t.id} · assigned by ${t.by === ME ? 'you' : esc(t.by)}</p>`}
      </div><button type="button" class="icon-btn" data-x="close" aria-label="Close panel">${CRM.icon('x')}</button></header>
      <div class="dr-body"><div class="tf-g">
        ${isNew ? fld('Account', `<label class="select fsel"><select data-v="acc"><option value="">No account</option>${ACCOUNTS.map(a => `<option ${a.name === v.acc ? 'selected' : ''}>${esc(a.name)}</option>`).join('')}</select></label>`, { hint: 'Optional.' })
          + fld('Sales initiative', `<label class="select fsel"><select data-v="si"><option value="">No initiative</option>${sis.map(o => `<option value="${o.id}" ${o.id === v.si ? 'selected' : ''}>${esc(o.name)}</option>`).join('')}</select></label>`, { hint: 'Optional; sets the account.' }) : ctx}
        ${fld('What needs doing?', `<input class="in" data-v="title" value="${esc(v.title)}" ${final ? 'disabled' : ''} aria-label="What needs doing?">`, { req: !final, err: errs.title, id: 'title' })}
        <div class="tf-2">
          ${fld('Who should do it?', `<label class="select fsel"><select data-v="to" ${final ? 'disabled' : ''}>${PEOPLE.map(x => `<option value="${esc(x)}" data-short="${esc(nameOf(x))}" ${x === v.to ? 'selected' : ''}>${esc(nameOf(x))} · ${funcOf(x)}</option>`).join('')}</select></label>`, { req: !final, hint: !isNew && !final ? 'Reassigning keeps the previous owner in the history.' : '' })}
          ${fld('When is it due?', `<input class="in" type="date" data-v="due" value="${v.due}" ${final ? 'disabled' : ''} aria-label="When is it due?">`, { req: !final, err: errs.due, id: 'due' })}
        </div>
        ${isNew ? '' : fld('Status', `<div class="seg tf-seg" role="radiogroup" aria-label="Status">${Object.entries(STATUS_LABEL).map(([k, l]) => `<button type="button" role="radio" aria-checked="${v.status === k}" class="${v.status === k ? 'on' : ''}" data-st="${k}" ${final ? 'disabled' : ''}>${l}</button>`).join('')}</div>`)}
        ${closing ? fld(v.status === 'cxl' ? 'Why is it cancelled?' : 'Outcome', `<textarea class="in" data-v="note" aria-label="${v.status === 'cxl' ? 'Why is it cancelled?' : 'Outcome'}">${esc(v.note)}</textarea>`, { req: v.status === 'cxl', hint: v.status === 'done' ? 'Optional.' : '', err: errs.note, id: 'note' }) : ''}
        ${final && t.note ? fld(t.status === 'cxl' ? 'Why it was cancelled' : 'Outcome', `<p class="tf-ro">${esc(t.note)}</p>`) : ''}
        ${fld('Details', `<textarea class="in" data-v="desc" ${final ? 'disabled' : ''} aria-label="Details">${esc(v.desc)}</textarea>`, { hint: final ? '' : 'Optional: context, progress notes.' })}
      </div>
      </div></div>
      <div class="dr-foot">${final ? '<button type="button" class="btn primary" data-x="close">Close</button>' : `<button type="button" class="btn ghost" data-x="close">Cancel</button><button type="submit" class="btn primary">${isNew ? 'Create task' : 'Save'}</button>`}</div>
    </form>`;
    CRM.enhanceSelects(scrim); CRM.enhanceDates(scrim);
  };
  scrim.addEventListener('click', (e) => {
    if (e.target.closest('[data-x="close"]')) { askClose(); return; }
    const b = e.target.closest('[data-st]'); if (b && !final) { v.status = b.dataset.st; draw(); }
  });
  scrim.addEventListener('change', (e) => { const k = e.target.dataset.v; if (!k) return; v[k] = e.target.value;
    if (k === 'si') { const o = INITS.find(x => x.id === v.si); if (o) v.acc = o.acc; draw(); } else if (k === 'acc') { v.si = ''; draw(); } });
  scrim.addEventListener('input', (e) => { const k = e.target.dataset.v; if (k) v[k] = e.target.value; });
  scrim.addEventListener('submit', (e) => {
    e.preventDefault();
    const closing = !isNew && v.status !== t.status && (v.status === 'done' || v.status === 'cxl');
    errs = {};
    if (!v.title.trim()) errs.title = 'Say what needs doing.';
    if (!v.due) errs.due = 'Pick a due date.';
    if (closing && v.status === 'cxl' && !v.note.trim()) errs.note = 'Say why it is cancelled.';
    if (Object.keys(errs).length) { draw(); scrim.querySelector('.tf.bad .in, .tf.bad .dt-btn')?.focus(); return; }
    const o = INITS.find(x => x.id === v.si);
    if (isNew) {
      const n = String(Math.max(...TASKS.map(x => +x.id.slice(-4))) + 1).padStart(4, '0');
      const nt = { id: 'TSK-2026-' + n, title: v.title.trim(), si: o ? o.id : null, siName: o ? o.name : '', acc: o ? o.acc : v.acc, to: v.to, by: ME, status: 'ns', due: v.due, act: null, done: null, desc: v.desc };
      TASKS.unshift(nt); close(); CRM.refreshTaskBadge(); onSaved(nt, 'new'); toast(`${nt.id} added for ${nt.to === ME ? 'you' : nt.to}.`, 'ok'); return;
    }
    const moved = v.to !== t.to;
    Object.assign(t, { title: v.title.trim(), to: v.to, due: v.due, status: v.status, desc: v.desc, note: closing ? v.note.trim() : t.note, done: v.status === 'done' ? (t.done || TODAY_ISO) : null });
    close(); CRM.refreshTaskBadge(); onSaved(t, 'edit'); toast(v.status === 'cxl' && closing ? `${t.id} cancelled.` : moved ? `${t.id} reassigned to ${v.to}.` : `${t.id} saved.`, 'ok');
  });
  document.querySelectorAll('.tf-panel').forEach(x => x.remove());
  draw(); document.body.appendChild(scrim); document.addEventListener('keydown', key, true);
  requestAnimationFrame(() => { document.body.classList.add('drill-open'); setTimeout(() => scrim.querySelector(final ? '[data-x="close"]' : '[data-v="title"]')?.focus(), 280); });
}

Object.assign(CRM, { taskForm, TASK_STATUS: STATUS_LABEL });
})();
