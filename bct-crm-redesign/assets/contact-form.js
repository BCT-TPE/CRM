/* Shared New / Edit contact side panel (2026-11-27): one form for Contacts and the account page, so both open the same panel.
   CRM.contactForm(contact | null, { acc, onSaved(contact, 'new' | 'edit') }). Needs crm.js and crm-data.js first.
   CRM.deptNote and CRM.CONTACT_ROLES are the Contacts page's title / department hint and role list. */
(() => {
const ROLE_ALL = [...ROLES, 'Primary contact', 'Other'];
// old CRMpulse contact-hints.ts: the title points at another department than the recorded one (first matching rule)
const TITLE_DEPTS = [['Finance', /\b(cfo|finance|financial|accountant|accounts|accounting|treasur\w*|controller|risk)\b/i],
  ['Procurement', /\b(procurement|purchas\w*|sourcing|buyer)\b/i], ['IT', /\b(cio|cto|ciso|it|information|infrastructure|security|technology)\b/i]];
const deptNote = (c) => { const r = c.dept === 'Other' ? null : TITLE_DEPTS.find(([, re]) => re.test(c.title));
  return r && r[0] !== c.dept ? `The title ${c.title} usually sits in ${r[0]}, not ${c.dept}. Check the department.` : ''; };
// New / edit contact (old ContactFormDrawer): account first with the people already there, title and email checks, who holds each role
const { fld, pick, inp, head, put } = CRM.form, { toast } = CRM, DEPTS = ['IT', 'Business', 'Finance', 'Procurement', 'Operations', 'Other'];
const ACC_ALL = [...ACCOUNTS, ...FRESH_ACCOUNTS];
const siteOf = (acc) => acc ? acc.replace(/^Al /, '').split(' ')[0].toLowerCase() + '.example' : ''; // the account's website domain, as in the demo emails
function contactForm(c, { acc = '', onSaved = () => {} } = {}) {
  const [first, ...rest] = c ? c.n.split(' ') : [''];
  const blank = (acc) => ({ acc, first: '', last: '', title: '', dept: '', email: '', mobile: '', office: '', role: '', active: true, remarks: '' });
  const v = c ? { acc: c.acc, first, last: rest.join(' '), title: c.title, dept: c.dept, email: c.email, mobile: c.mobile, office: c.office, role: c.role, active: c.status === 'Active', remarks: c.remarks || '' } : blank(acc); // from an account page the account is filled in (old ContactFormDrawer accountId), still changeable
  let dups = [];
  const people = () => CONTACTS.filter(p => p.acc === v.acc && p !== c);
  const mailOwner = () => { const m = v.email.trim().toLowerCase(); return m && CONTACTS.find(p => p !== c && p.email.toLowerCase() === m); };
  const foreign = () => { const d = v.email.includes('@') ? v.email.split('@').pop().trim().toLowerCase() : '', s = siteOf(v.acc); return d && d.includes('.') && s && d !== s && !d.endsWith('.' + s) ? d : ''; };
  const ready = () => v.acc && v.first.trim() && v.last.trim() && !mailOwner();
  const hint = () => mailOwner() ? 'Fix the duplicate email first' : !v.acc ? 'Choose the account first' : 'Account, first and last name are required';
  const exist = () => { if (!v.acc) return ''; const l = people(); return `<span class="tf-h">${l.length ? `<b>${l.length} ${l.length === 1 ? 'contact' : 'contacts'} already:</b> ${l.map(p => esc(p.n) + (p.role ? ` (${p.role})` : '') + (p.status === 'Inactive' ? ' · inactive' : '')).join(', ')}` : 'No contacts at this account yet.'}</span>`; };
  const titleNote = () => { const n = v.title.trim() && v.dept ? deptNote({ title: v.title.trim(), dept: v.dept }) : ''; return n ? `<span class="tf-warn">${esc(n)}</span>` : ''; };
  const mailNote = () => { const o = mailOwner(), f = foreign(); return o ? `<span class="tf-e">This email already belongs to another contact: ${esc(o.n)} (${esc(o.acc)}).</span>` : f ? `<span class="tf-warn">The domain ${esc(f)} isn't the account website's. That's fine for personal or partner emails; otherwise check it.</span>` : '<span class="tf-h">Unique across contacts.</span>'; };
  const dupBox = () => dups.length ? `<div class="op-why" role="status"><p><b>Possible duplicates. Review before saving:</b></p><ul>${dups.map(p => `<li>${esc(p.n)} <small>· ${p.id} · ${esc(p.acc)}</small></li>`).join('')}</ul><p>Save again to create the record anyway.</p></div>` : '';
  const foot = () => `<div class="op-r1"><span class="op-msg" role="status">${ready() ? '' : hint()}</span></div><button type="button" class="btn ghost" data-x="close">Cancel</button>${c ? '' : `<button type="button" class="btn" data-x="another" ${ready() ? '' : 'disabled'}>Save &amp; add another</button>`}<button type="submit" class="btn primary" ${ready() ? '' : 'disabled'}>${c ? 'Save changes' : dups.length ? 'Create anyway' : 'Add contact'}</button>`;
  const draw = () => `<form class="tf-form" novalidate>${head('Contacts', c ? `Edit ${esc(c.n)}` : 'New contact', c ? `${c.id} · ${esc(c.acc)}` : 'A contact belongs to exactly one account. Someone who moves to another organization gets a new contact there.')}
    <div class="dr-body"><div class="tf-g">
      <div data-dup>${dupBox()}</div>
      <h3 class="op-h" style="margin:0">Account</h3>
      ${fld('Account', pick('acc', [['', 'Select account…'], ...ACC_ALL.map(a => [a.name, a.name])], v.acc, 'Account', !!c), { req: true, hint: c ? 'The account cannot change.' : '' })}
      ${exist()}
      <h3 class="op-h">Person</h3>
      <div class="tf-2">${fld('First Name', inp('first', v.first, 'First Name'), { req: true })}${fld('Last Name', inp('last', v.last, 'Last Name'), { req: true })}</div>
      ${fld('Designation / Job Title', inp('title', v.title, 'Designation / Job Title', { ph: 'e.g. Head of Digital' }))}
      <div class="tf"><span class="tf-l">Department</span>${pick('dept', [['', 'Not set'], ...DEPTS.map(d => [d, d])], v.dept, 'Department')}<span data-title>${titleNote()}</span></div>
      <h3 class="op-h">How to reach them</h3>
      <div class="tf" data-mail><span class="tf-l">Business Email</span>${inp('email', v.email, 'Business Email', { type: 'email', ph: `name@${siteOf(v.acc) || 'company.com'}` })}<span data-note>${mailNote()}</span></div>
      <div class="tf-2">${fld('Mobile Number', inp('mobile', v.mobile, 'Mobile Number', { type: 'tel' }), { hint: 'Include the country code.' })}${fld('Office Phone', inp('office', v.office, 'Office Phone', { type: 'tel' }), { hint: 'Include the country code.' })}</div>
      <h3 class="op-h">Role at the account</h3><span class="tf-h">Roles on a specific deal are set inside each initiative's Contacts tab.</span>
      <div class="rc" role="radiogroup" aria-label="Account-level role">${ROLE_ALL.map(r => { const h = people().filter(p => p.status === 'Active' && p.role === r); return `<button type="button" role="radio" aria-checked="${v.role === r}" class="${v.role === r ? 'on' : ''}" data-role="${r}"><b>${r}${r === 'Decision maker' ? '<span class="chip role dm">Key</span>' : ''}</b>${h.length ? `<small>Already: ${h.map(p => esc(p.n)).join(', ')}</small>` : ''}</button>`; }).join('')}</div>
      ${c ? `<label class="tf-chk"><input type="checkbox" data-c="active" ${v.active ? 'checked' : ''}><span>Active <small>Untick when they leave the company. Their history stays.</small></span></label>` : ''}
      <h3 class="op-h">Notes</h3>
      ${fld('Remarks', `<textarea class="in" data-v="remarks" aria-label="Remarks" placeholder="e.g. Prefers WhatsApp, met at GITEX">${esc(v.remarks)}</textarea>`)}
    </div></div><div class="dr-foot op-foot">${foot()}</div></form>`;
  const P = CRM.openPanel(v, draw, c ? 'Discard changes to this contact?' : 'Discard this contact?');
  const q = (s) => P.el.querySelector(s);
  const live = () => { put(q('[data-dup]'), dupBox()); put(q('[data-title]'), titleNote()); put(q('[data-note]'), mailNote()); q('[data-mail]').classList.toggle('bad', !!mailOwner()); put(q('.op-foot'), foot()); };
  P.el.addEventListener('input', (e) => { const k = e.target.dataset.v; if (!k) return; v[k] = e.target.value; if (k === 'first' || k === 'last') dups = []; live(); });
  P.el.addEventListener('change', (e) => { if (e.target.dataset.c) { v.active = e.target.checked; return; } const k = e.target.dataset.v; if (!k) return; v[k] = e.target.value; if (k === 'acc') { v.role = ''; dups = []; P.redraw(); } else live(); });
  P.el.addEventListener('click', (e) => { const b = e.target.closest('[data-role]');
    if (b) { v.role = v.role === b.dataset.role ? '' : b.dataset.role; P.el.querySelectorAll('[data-role]').forEach(x => { const on = x.dataset.role === v.role; x.classList.toggle('on', on); x.setAttribute('aria-checked', String(on)); }); } // a second click clears it: the role is optional
    else if (e.target.closest('[data-x="another"]')) save(true); });
  P.el.addEventListener('submit', () => save(false));
  function save(again) {
    if (!ready()) return;
    const n = `${v.first.trim()} ${v.last.trim()}`, body = { n, title: v.title.trim(), dept: v.dept, role: v.role, email: v.email.trim(), mobile: v.mobile.trim(), office: v.office.trim(), remarks: v.remarks };
    if (c) { Object.assign(c, body, { status: v.active ? 'Active' : 'Inactive' }); P.close(); onSaved(c, 'edit'); toast('Contact updated.', 'ok'); return; }
    if (!dups.length) { dups = people().filter(p => p.n.toLowerCase() === n.toLowerCase()); if (dups.length) { live(); q('.dr-body').scrollTop = 0; toast('Potential duplicate contacts found. Review them, then save again to create anyway.', 'warn'); return; } }
    const x = { id: 'CON-2026-' + String(Math.max(...CONTACTS.map(p => +p.id.slice(-4))) + 1).padStart(4, '0'), acc: v.acc, accId: ACC_ALL.find(a => a.name === v.acc).id, status: 'Active', ...body };
    CONTACTS.push(x); onSaved(x, 'new'); toast(`${n} added.`, 'ok');
    if (!again) return P.close();
    Object.assign(v, blank(v.acc)); dups = []; P.clean(); P.redraw(); q('.dr-body').scrollTop = 0; q('[data-v="first"]').focus({ preventScroll: true }); // same account, a clean slate for the next person
  }
}

Object.assign(CRM, { contactForm, deptNote, CONTACT_ROLES: ROLE_ALL });
})();
