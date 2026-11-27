/* Shared Log activity side panel (2026-11-27): one panel for Activities and the account page (old ActivityFormDrawer).
   CRM.logActivity({ ctx: 'account' | 'initiative', to, type, who, what }, { onSaved(activity) }). Needs crm.js and crm-data.js first. */
(() => {
const { toast } = CRM, DAY = 864e5;
const fld = (label, ctl, { req, hint, err, id } = {}) => `<div class="tf ${err ? 'bad' : ''}" ${id ? `data-f="${id}"` : ''}><span class="tf-l">${label}${req ? '<span class="rq">*</span>' : ''}</span>${ctl}${err ? `<span class="tf-e">${err}</span>` : hint ? `<span class="tf-h">${hint}</span>` : ''}</div>`;
const isoDay = (d) => new Date(d).toISOString().slice(0, 10);
const TEAMMATES = [...new Set([ME, ...Object.values(TEAMS).flatMap(t => t.people), ...Object.keys(FUNC)])].sort((a, b) => a === ME ? -1 : b === ME ? 1 : a.localeCompare(b));
function logActivity(pre = {}, { onSaved = () => {} } = {}) {
  const v = { ctx: pre.ctx || 'account', to: pre.to || '', type: pre.type || 'Phone call', when: 'today', date: isoDay(TODAY), time: String(new Date().getHours()).padStart(2, '0') + ':00',
    who: pre.who || '', purpose: 'Follow-up', what: pre.what || '', subject: '', subjectTouched: false,
    doNext: false, next: '', follow: '', doTask: false, task: '', taskTo: ME, taskDue: isoDay(TODAY.getTime() + 7 * DAY) };
  let errs = {};
  const scrim = document.createElement('aside'); scrim.className = 'drill tf-panel'; scrim.setAttribute('role', 'dialog'); scrim.setAttribute('aria-labelledby', 'lf-t');
  const prev = document.activeElement;
  const close = () => { document.removeEventListener('keydown', key, true); document.body.classList.remove('drill-open'); setTimeout(() => scrim.remove(), 300); prev && prev.focus && prev.focus(); };
  const snap = () => JSON.stringify({ ...v, subject: v.subjectTouched ? v.subject : '' }); // the auto-filled subject is not an edit
  const start = snap();
  const askClose = async () => { if (snap() === start) return close();
    const r = await CRM.confirm({ title: 'Discard this activity?', body: '<p>What you entered will be lost.</p>',
      actions: [{ label: 'Discard', value: 'discard', kind: 'quiet' }, { label: 'Keep editing', value: null, kind: 'primary' }] });
    if (r === 'discard') close(); };
  const key = (e) => { if (e.key === 'Escape' && !document.body.classList.contains('dlg-open')) { e.preventDefault(); askClose(); } };
  const ctxAcc = () => v.ctx === 'initiative' ? (INITS.find(o => o.id === v.to) || {}).acc : v.to;
  const autoSubject = () => `${ACT_SUBJECT[v.type] || 'Activity with'} ${v.who || ctxAcc() || '…'}`;
  const opt = (val, label, on) => `<option value="${esc(val)}" ${on ? 'selected' : ''}>${esc(label)}</option>`;
  const draw = () => {
    if (!v.subjectTouched) v.subject = autoSubject();
    const acc = ctxAcc(), si = v.ctx === 'initiative' ? INITS.find(o => o.id === v.to) : null;
    const people = acc ? CONTACTS.filter(c => c.acc === acc && c.status === 'Active') : [];
    const targets = v.ctx === 'account' ? ACCOUNTS.map(a => [a.name, a.name]) : INITS.filter(o => o.kind === 'open').map(o => [o.id, o.name]);
    scrim.innerHTML = `<form class="tf-form" novalidate>
      <header class="dr-head"><div><p class="dr-kind">Activities</p><h2 id="lf-t">Log activity</h2><p class="dr-sub">Record what happened while it is fresh.</p></div>
        <button type="button" class="icon-btn" data-x="close" aria-label="Close panel">${CRM.icon('x')}</button></header>
      <div class="dr-body"><div class="tf-g">
        ${fld('Log against', `<div class="seg tf-seg" role="radiogroup" aria-label="Log against">${[['initiative', 'Sales initiative'], ['account', 'Account']].map(([k, l]) => `<button type="button" role="radio" aria-checked="${v.ctx === k}" class="${v.ctx === k ? 'on' : ''}" data-ctx="${k}">${l}</button>`).join('')}</div>`)}
        ${fld(v.ctx === 'account' ? 'Account' : 'Sales initiative', `<label class="select fsel"><select data-v="to" aria-label="${v.ctx === 'account' ? 'Account' : 'Sales initiative'}">${opt('', v.ctx === 'account' ? 'Select account…' : 'Select initiative…', !v.to)}${targets.map(([k, l]) => opt(k, l, k === v.to)).join('')}</select></label>`, { req: true, err: errs.to, hint: v.ctx === 'account' ? 'Approved accounts only.' : '', id: 'to' })}
        ${fld('What kind of activity?', `<label class="select fsel"><select data-v="type" aria-label="What kind of activity?">${ACT_TYPES.map(t => opt(t, t, t === v.type)).join('')}</select></label>`, { req: true })}
        ${fld('When?', `<div class="seg tf-seg" role="radiogroup" aria-label="When">${[['today', 'Today'], ['yesterday', 'Yesterday'], ['pick', 'Pick date…']].map(([k, l]) => `<button type="button" role="radio" aria-checked="${v.when === k}" class="${v.when === k ? 'on' : ''}" data-when="${k}">${l}</button>`).join('')}</div>`, { req: true })}
        <div class="tf-2">
          ${v.when === 'pick' ? fld('Date', `<input class="in" type="date" data-v="date" value="${v.date}" max="${isoDay(TODAY)}" aria-label="Activity date">`, { req: true }) : ''}
          ${fld('Time', `<input class="in" type="time" data-v="time" value="${v.time}" aria-label="Time">`)}
        </div>
        ${fld('Who was there?', `<label class="select fsel"><select data-v="who" aria-label="Who was there?" ${acc ? '' : 'disabled'}>${opt('', acc ? 'No contact' : 'Choose the context first', !v.who)}${people.map(c => opt(c.n, c.role ? `${c.n} · ${c.role}` : c.n, c.n === v.who)).join('')}</select></label>`, { hint: acc ? `Contacts at ${esc(acc)}` : '' })}
        ${fld('Purpose', `<label class="select fsel"><select data-v="purpose" aria-label="Purpose">${ACT_PURPOSES.map(p => opt(p, p, p === v.purpose)).join('')}</select></label>`)}
        ${fld('What happened?', `<textarea class="in" data-v="what" aria-label="What happened?">${esc(v.what)}</textarea>`)}
        ${fld('Subject', `<input class="in" data-v="subject" value="${esc(v.subject)}" aria-label="Subject">`, { req: true, err: errs.subject, hint: v.subjectTouched ? '' : 'Filled in for you. Edit if you like.', id: 'subject' })}
        ${si ? `<div class="tf-box"><label class="tf-chk"><input type="checkbox" data-c="doNext" ${v.doNext ? 'checked' : ''}>Update the initiative's next step</label>
          ${v.doNext ? `<div class="tf-2">${fld('Next step', `<input class="in" data-v="next" value="${esc(v.next)}" aria-label="Next step">`)}${fld('Follow-up date', `<input class="in" type="date" data-v="follow" value="${v.follow}" aria-label="Follow-up date">`)}</div>`
            : `<span class="tf-h">${si.next ? `Currently: ${esc(si.next)}${si.follow ? ` (follow up ${CRM.date(si.follow)})` : ''}` : 'The list shows "No next step" for this initiative today.'}</span>`}</div>` : ''}
        <div class="tf-box"><label class="tf-chk"><input type="checkbox" data-c="doTask" ${v.doTask ? 'checked' : ''}>Create a follow-up task</label>
          ${v.doTask ? `${fld('Task', `<input class="in" data-v="task" value="${esc(v.task)}" aria-label="Task">`, { req: true, err: errs.task, id: 'task' })}
            <div class="tf-2">${fld('Assign to', `<label class="select fsel"><select data-v="taskTo" aria-label="Assign to">${TEAMMATES.map(x => opt(x, x === ME ? `${x} (you)` : x, x === v.taskTo)).join('')}</select></label>`, { req: true })}
            ${fld('Due', `<input class="in" type="date" data-v="taskDue" value="${v.taskDue}" aria-label="Due">`, { req: true })}</div>` : ''}</div>
      </div></div>
      <div class="dr-foot"><button type="button" class="btn ghost" data-x="close">Cancel</button><button type="submit" class="btn primary">Log activity</button></div>
    </form>`;
    CRM.enhanceSelects(scrim); CRM.enhanceDates(scrim);
  };
  scrim.addEventListener('click', (e) => {
    if (e.target.closest('[data-x="close"]')) { askClose(); return; }
    const c = e.target.closest('[data-ctx]'); if (c && c.dataset.ctx !== v.ctx) { v.ctx = c.dataset.ctx; v.to = ''; v.who = ''; draw(); return; }
    const w = e.target.closest('[data-when]'); if (w) { v.when = w.dataset.when; v.date = v.when === 'yesterday' ? isoDay(TODAY.getTime() - DAY) : v.when === 'today' ? isoDay(TODAY) : v.date; draw(); }
  });
  scrim.addEventListener('change', (e) => {
    const c = e.target.dataset.c; if (c) { v[c] = e.target.checked; draw(); return; }
    const k = e.target.dataset.v; if (!k) return; v[k] = e.target.value;
    if (k === 'to' || k === 'type' || k === 'who') { if (k === 'to') v.who = ''; draw(); }
  });
  scrim.addEventListener('input', (e) => { const k = e.target.dataset.v; if (!k || e.target.tagName === 'SELECT') return; v[k] = e.target.value; if (k === 'subject') v.subjectTouched = true; });
  scrim.addEventListener('submit', (e) => {
    e.preventDefault(); errs = {};
    if (!v.to) errs.to = v.ctx === 'account' ? 'Pick the account.' : 'Pick the initiative.';
    if (!v.subject.trim()) errs.subject = 'Give it a subject.';
    if (v.doTask && !v.task.trim()) errs.task = 'Say what needs doing.';
    if (Object.keys(errs).length) { draw(); scrim.querySelector('.tf.bad .in, .tf.bad .sel-btn')?.focus(); return; }
    const o = v.ctx === 'initiative' ? INITS.find(x => x.id === v.to) : null, acc = o ? o.acc : v.to;
    const id = 'ACT-2026-' + String(Math.max(...ACTIVITIES.map(x => +x.id.slice(-4))) + 1).padStart(4, '0');
    ACTIVITIES.unshift({ id, d: `${v.date}T${v.time || '09:00'}`, type: v.type, purpose: v.purpose, acc, si: o ? o.id : null, siName: o ? o.name : '', owner: ME, who: v.who ? [v.who] : [], t: v.subject.trim(), note: v.what.trim() });
    ACTIVITIES.sort((a, b) => b.d.localeCompare(a.d));
    if (o && v.doNext) { if (v.next.trim()) o.next = v.next.trim(); if (v.follow) o.follow = v.follow; }
    let extra = '';
    if (v.doTask) { const n = String(Math.max(...TASKS.map(x => +x.id.slice(-4))) + 1).padStart(4, '0');
      TASKS.unshift({ id: 'TSK-2026-' + n, title: v.task.trim(), si: o ? o.id : null, siName: o ? o.name : '', acc, to: v.taskTo, by: ME, status: 'ns', due: v.taskDue, act: id, done: null, desc: '' });
      CRM.refreshTaskBadge(); extra = ' and a follow-up task'; }
    close(); onSaved(ACTIVITIES.find(x => x.id === id)); toast(`Logged ${id}${extra}`, 'ok');
  });
  document.querySelectorAll('.tf-panel').forEach(x => x.remove());
  draw(); document.body.appendChild(scrim); document.addEventListener('keydown', key, true);
  requestAnimationFrame(() => { document.body.classList.add('drill-open'); setTimeout(() => scrim.querySelector(v.to ? '[data-v="what"]' : '[data-v="to"]')?.closest('.tf')?.querySelector('textarea, input, .sel-btn')?.focus(), 280); });
}

Object.assign(CRM, { logActivity });
})();
