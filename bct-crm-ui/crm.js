/* BCT CRM — AI-first concept on the Gina UI base.
   All data is fictional. No backend: replies are scripted for three scenarios. */

/* ---------- Icons (subset of Gina's set + sparkle) ---------- */
const ICONS = {
  "sparkle":'<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 17l.7 1.8 1.8.7-1.8.7L19 22l-.7-1.8-1.8-.7 1.8-.7z"/>',
  "search":'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  "plus":'<path d="M5 12h14"/><path d="M12 5v14"/>',
  "chart":'<path d="M4 20h16"/><path d="M8 16v-4"/><path d="M12 16V7"/><path d="M16 16v-6"/>',
  "users":'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  "circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  "list-box":'<rect width="18" height="16" x="3" y="4" rx="2"/><path d="M7 9h.01"/><path d="M7 15h.01"/><path d="M11 9h6"/><path d="M11 15h6"/>',
  "chevron-down":'<path d="m6 9 6 6 6-6"/>',
  "panel-left":'<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/>',
  "message":'<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  "more":'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  "mail":'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  "calendar":'<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/>',
  "file-text":'<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5Z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h8"/><path d="M8 17h8"/><path d="M8 9h2"/>',
  "paperclip":'<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
  "mic":'<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',
  "arrow-up":'<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
  "check":'<path d="M20 6 9 17l-5-5"/>',
  "x":'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  "maximize":'<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M16 3h3a2 2 0 0 1 2 2v3"/><path d="M8 21H5a2 2 0 0 1-2-2v-3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>',
  "copy":'<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  "database":'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',
  "link":'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  "undo":'<path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-15-6.7L3 13"/>',
  "inbox":'<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  "layout":'<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>',
  "globe":'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',
  "pin":'<path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>',
  "chevron-right":'<path d="m9 18 6-6-6-6"/>',
  "chevron-left":'<path d="m15 18-6-6 6-6"/>',
  "arrow-ur":'<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',
  "phone":'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  "gauge":'<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  "download":'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  "pencil":'<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
  "pin-off":'<path d="M12 17v5"/><path d="M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89"/><path d="m2 2 20 20"/><path d="M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11"/>',
  "trash":'<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
  "info":'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  "logout":'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
  "briefcase":'<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'
};
const svg = n => `<svg class="i" viewBox="0 0 24 24">${ICONS[n]||''}</svg>`;
function hydrateIcons(root=document){
  root.querySelectorAll('svg[data-i]').forEach(el=>{
    el.setAttribute('viewBox','0 0 24 24'); el.setAttribute('fill','none'); el.setAttribute('stroke','currentColor');
    el.setAttribute('stroke-width','2'); el.setAttribute('stroke-linecap','round'); el.setAttribute('stroke-linejoin','round');
    el.innerHTML = ICONS[el.dataset.i]||''; el.removeAttribute('data-i');
  });
}
hydrateIcons();

/* ---------- Helpers ---------- */
/* Illustrated contacts generated for BCT (assets/gen). Anyone else gets initials. */
/* People photos. Customers: free Unsplash photos (Unsplash License), chosen 2026-10-28 from
   docs/customer-photo-candidates.html; originals and sources in assets/people/src and the README.
   BCT colleagues: real photos supplied by Candace. The signed-in demo user is Gaurav Shrotriya (2026-10-28, was Sheldon Cooper). */
const AVATARS = {
  hana:'people/hana-al-rashdi.webp', maryam:'people/maryam-al-lawati.webp', noura:'people/noura-al-shamsi.webp',
  omar:'people/omar-haddad.webp', khalid:'people/khalid-al-riyami.webp', faisal:'people/faisal-al-mazrouei.webp',
  salim:'people/salim-al-busaidi.webp', said:'people/said-al-hinai.webp', rajesh:'people/rajesh-kulkarni.webp',
  gaurav:'people/gaurav-shrotriya.webp', sundara:'people/sundara-balaji.webp' };
const AVATAR_BY_NAME = { 'Hana Al-Rashdi':'hana', 'Maryam Al-Lawati':'maryam', 'Noura Al-Shamsi':'noura', 'Omar Haddad':'omar',
  'Khalid Al-Riyami':'khalid', 'Faisal Al-Mazrouei':'faisal', 'Salim Al-Busaidi':'salim', 'Said Al-Hinai':'said', 'Rajesh Kulkarni':'rajesh',
  'Gaurav Shrotriya':'gaurav', 'Sundara Balaji':'sundara' };
function avatarHTML(key, cls){ return AVATARS[key] ? `<img class="${cls}" src="assets/${AVATARS[key].includes('/')?'':'gen/'}${AVATARS[key]}" alt="">` : `<span class="${cls} av-i">${esc(key||'')}</span>`; }
// A colleague's name with their photo (owner, deal team)
function personHTML(name){ const k=AVATAR_BY_NAME[name]; return `<span class="who-mini">${k?avatarHTML(k,'who-av'):''}${esc(name)}</span>`; }
const $ = s => document.querySelector(s);
const body = document.body, thread = $('#thread'), input = $('#input');
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function toast(msg, action){
  const t=$('#toast'); t.textContent=msg; t.classList.toggle('has-action', !!action);
  if(action){ const b=document.createElement('button'); b.type='button'; b.className='toast-action'; b.textContent=action.label;
    b.addEventListener('click', ev=>{ ev.stopPropagation(); t.classList.remove('show'); action.run(); }); t.appendChild(b); }
  t.classList.add('show'); clearTimeout(toast._t); toast._t=setTimeout(()=>t.classList.remove('show'), action?4500:1800);
}
function nowHM(){ const d=new Date(); return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0'); }
function scrollBottom(){ const s=$('#scroll'); s.scrollTop=s.scrollHeight; }
const REPLY_DELAY = 900;

/* ---------- Fictional data ---------- */
const STAGES = ['Discovery','Proposal','Negotiation','Won'];
const RECORDS = {
  erp:      { kind:'Opportunity', ref:'OPP-0988', name:'ERP Managed Services — renewal', account:'Qamar Energy', country:'Oman', amount:'$640K', close:'Closed 12 Aug 2026', type:'Services', contact:'Hana Al-Rashdi, Head of IT', stage:3,
              activity:[['12 Aug · PO','PO received (QE-PO-22817)'],['05 Aug · contract','Contract signed by both parties'],['29 Jul · call','Final pricing call with procurement']] },
  datalake: { kind:'Opportunity', ref:'OPP-1042', name:'Data Lake modernisation', account:'Qamar Energy', country:'Oman', amount:'$820K', close:'15 Dec 2026', type:'Services + IP', contact:'Hana Al-Rashdi, Head of IT', stage:1,
              team:[['Sundara Balaji','Pre-sales · co-ran the 20 Sep workshop']],
              activity:[['20 Sep · meeting','Solution workshop with the IT team (with Sundara Balaji)'],['18 Sep · email','Shared reference architecture'],['09 Sep · call','Discovery call with Hana']] },
  fieldops: { kind:'Opportunity', ref:'OPP-1017', name:'Field Ops mobile app', account:'Qamar Energy', country:'Oman', amount:'$410K', close:'30 Nov 2026', type:'Services', contact:'Salim Al-Busaidi, Operations Director', stage:2,
              activity:[['16 Oct · email','Revised SOW sent'],['14 Oct · call','Negotiation call with procurement'],['02 Oct · meeting','Demo to field supervisors']] },
  kpo:      { kind:'Opportunity', ref:'OPP-1066', name:'AI document processing', account:'Qamar Energy', country:'Oman', amount:'$310K', close:'Q1 2027', type:'KPO / BPO', contact:'Maryam Al-Lawati, Finance Ops Manager', stage:0,
              activity:[['19 Oct · meeting','Intro meeting with Finance Ops'],['12 Oct · email','Inbound enquiry via website']] },
  gulf:     { kind:'Opportunity', ref:'OPP-1031', name:'Warehouse management system', account:'Gulf Harbor Logistics', country:'UAE', amount:'$540K', close:'26 Oct 2026', type:'Resell + Services', contact:'Omar Haddad, COO', stage:1,
              activity:[['14 Oct · email','Proposal v2 sent'],['08 Oct · meeting','Pricing objections from finance'],['24 Sep · meeting','Site visit, Jebel Ali warehouse']] },
  sahyadri: { kind:'Opportunity', ref:'OPP-1058', name:'Core banking security review', account:'Sahyadri Bank', country:'India', amount:'$280K', close:'31 Jan 2027', type:'Services', contact:'Rajesh Kulkarni, CISO', stage:0,
              activity:[['15 Oct · email','Asked for scope options'],['07 Oct · call','Intro call with CISO office']] },
  lead1:    { kind:'Lead', ref:'LEAD-0311', lead:true, name:'Al Dhafra Facilities Management', account:'Faisal Al-Mazrouei, Head of Operations', country:'UAE',
              email:'f.almazrouei@aldhafra-fm.example', phone:'+971 2 555 0147', interest:'Field service management for ~400 technicians across Abu Dhabi. Currently on spreadsheets and WhatsApp. Wants a demo before December budget round.',
              page:'/services/field-operations', submitted:'Today 02:14', match:null,
              activity:[['Today 02:14 · website','Form submitted from /services/field-operations'],['Today 02:14 · system','No match in Accounts or Contacts — created as new lead']] },
  lead2:    { kind:'Lead', ref:'LEAD-0312', lead:true, name:'Qamar Energy', account:'Khalid Al-Riyami, Procurement Lead', country:'Oman',
              email:'k.alriyami@qamarenergy.example', phone:'+968 24 555 0190', interest:'Request for pricing on AI document processing for the finance team.',
              page:'/contact', submitted:'Today 06:40', match:{ account:'contacts', opp:'kpo' },
              activity:[['Today 06:40 · website','Form submitted from /contact'],['Today 06:40 · system','Matched existing account ACC-0214 and contact Khalid Al-Riyami'],['19 Oct · meeting','Related: intro meeting with Finance Ops (OPP-1066)']] },
  muscat:   { kind:'Opportunity', ref:'OPP-1049', name:'Citizen services portal — phase 2', account:'Muscat Municipality', country:'Oman', amount:'$190K', close:'20 Dec 2026', type:'Services', contact:'Said Al-Hinai, Director of IT', stage:0, owner:'Sundara Balaji',
              activity:[['10 Oct · meeting','Scoping workshop for phase 2'],['08 Oct · referral','Introduced by phase 1 sponsor']] },
  acc_gulf: { kind:'Account', ref:'ACC-0231', name:'Gulf Harbor Logistics', account:'2 contacts', country:'UAE', contacts:true,
              people:[['OH','Omar Haddad','COO · main contact'],['LK','Lina Khoury','Finance Manager']],
              activity:[['14 Oct','Proposal v2 sent to Omar Haddad'],['08 Oct','Pricing objections raised by finance']] },
  acc_sahyadri: { kind:'Account', ref:'ACC-0258', name:'Sahyadri Bank', account:'3 contacts', country:'India', contacts:true,
              people:[['RK','Rajesh Kulkarni','CISO · main contact'],['PD','Priya Deshmukh','Head of Infrastructure'],['AS','Anil Shetty','Procurement']],
              activity:[['15 Oct','Rajesh asked for scope options'],['07 Oct','Intro call with CISO office']] },
  acc_muscat: { kind:'Account', ref:'ACC-0201', name:'Muscat Municipality', account:'5 contacts', country:'Oman', contacts:true,
              people:[['SH','Said Al-Hinai','Director of IT · main contact'],['FB','Fatma Al-Balushi','PMO Lead'],['HM','Hamed Al-Maskari','Procurement']],
              activity:[['10 Oct','Scoping workshop for portal phase 2'],['22 Sep','Phase 1 go-live sign-off']] },
  contacts: { kind:'Account', ref:'ACC-0214', name:'Qamar Energy', account:'4 contacts', country:'Oman', contacts:true,
              people:[['HA','Hana Al-Rashdi','Head of IT · main contact'],['SB','Salim Al-Busaidi','Operations Director'],['ML','Maryam Al-Lawati','Finance Ops Manager'],['KR','Khalid Al-Riyami','Procurement Lead']],
              activity:[['19 Oct','Met Maryam Al-Lawati (AI document processing)'],['16 Oct','Emailed Salim Al-Busaidi (Field Ops SOW)']] }
};
const TASKS = [
  { id:'t2', title:'Send revised pricing to Omar Haddad', meta:'Gulf Harbor Logistics · overdue by 1 day', overdue:true, src:'gulf' },
  { id:'t1', title:'Call Rajesh Kulkarni about security review scope', meta:'Sahyadri Bank · due 11:00', src:'sahyadri' },
  { id:'t3', title:'Prepare Field Ops demo for Qamar', meta:'Qamar Energy · due 16:00', src:'fieldops' }
];
const SCENARIOS = {
  quarter:  { title:'Q4 at a glance', msg:"How's my quarter looking?" },
  pipeline: { title:'Qamar Energy pipeline', msg:"How's our pipeline with Qamar Energy?" },
  log:      { title:'Meeting notes — Qamar Energy', msg:'Just met Hana at Qamar. They want the data lake in 3 phases, proposal by Friday. Budget is approved for phase 1.' },
  today:    { title:'Today', msg:'What should I focus on today?' },
  attention:{ title:'Deals that need attention', msg:'Which deals need my attention this week?' }
};
/* Sidebar conversations: only ones that open a real scenario (placeholders were removed 2026-10-28).
   Rename / pin / delete live only for this visit; a reload restores the demo list. */
const CHATS = [
  { id:'c3', title:'Q4 at a glance', key:'quarter' },
  { id:'c4', title:'Qamar Energy pipeline', key:'pipeline' },
  { id:'c5', title:'Meeting notes — Qamar Energy', key:'log' },
  { id:'c6', title:'Today', key:'today' }
];
const chatByKey = key => CHATS.find(c=>c.key===key);

/* ---------- Building blocks ---------- */
const srcChip = (id, label) => `<button class="src" data-record="${id}" aria-label="Open source record ${esc(label||RECORDS[id].ref)}">${svg('link')}${esc(label||RECORDS[id].ref)}</button>`;
function sourcesHTML(rows){
  return `<details class="execution-details">
    <summary aria-label="Show the sources this answer is based on"><span class="execution-summary-icon">${svg('circle-check')}</span><span>Based on ${rows.map(r=>r[0].replace(/^([A-Z])(?=[a-z])/, c=>c.toLowerCase())).join(' · ')}</span><span class="execution-expand">${svg('chevron-down')}</span></summary>
    <div class="execution-list">${rows.map(r=>`<article class="execution-resource">
      <header><span class="execution-status" role="img" aria-label="Read">${svg('check')}</span><span class="execution-resource-icon">${svg(r[1])}</span><strong>${esc(r[0])}</strong></header>
      <dl><div><dt>Source</dt><dd>${esc(r[2])}</dd></div><div><dt>As of</dt><dd>${esc(r[3])}</dd></div></dl>
    </article>`).join('')}</div>
  </details>`;
}
function aiMetaHTML(time){ return `<div class="ai-meta"><div class="ai-time">${time}</div><div class="ai-actions"><button data-action="copy-message" aria-label="Copy reply">${svg('copy')}</button></div></div>`; }
function optionsHTML(label, options){
  return `<div class="clarification-options" aria-label="${esc(label)}">
    <div class="clarification-options-label">${esc(label)}</div>
    <div class="clarification-options-actions">${options.map(o=>`<button class="reply-option" data-next="${esc(o[1])}">${esc(o[0])}</button>`).join('')}</div>
  </div>`;
}
function row(id, meta, flag){
  const r = RECORDS[id];
  return `<div class="crm-row"><div class="crm-row-main"><div class="crm-row-title">${esc(r.name)}</div><div class="crm-row-meta"><span>${esc(meta)}</span>${flag?`<span class="flag warn">${esc(flag)}</span>`:''}</div></div>
    <div class="crm-row-side"><span class="crm-amount">${r.amount}</span>${srcChip(id)}</div></div>`;
}

/* ---------- Messages ---------- */
function userMsg(text, files){
  const el=document.createElement('div'); el.className='msg-user';
  el.innerHTML=`<div class="col">${files&&files.length?`<div class="msg-files">${files.map(f=>fileChip(f)).join('')}</div>`:''}${text?'<div class="bubble-user"></div>':''}<div class="msg-time">${nowHM()}</div></div>`;
  if(text) el.querySelector('.bubble-user').textContent=text;
  if(window.PageAsk) PageAsk.onUser(text || (files&&files[0]&&files[0].name) || '');
  hydrateIcons(el); thread.appendChild(el); return el;
}
/* ===== Attach by drag and drop (the composer has no attach button) ===== */
let attached = [];
const fmtSize = n => n>=1048576 ? (n/1048576).toFixed(1)+' MB' : Math.max(1,Math.round(n/1024))+' KB';
function fileChip(f, i){ return `<span class="file-chip">${svg('file-text')}<span class="fc-name">${esc(f.name)}</span><span class="fc-size">${fmtSize(f.size)}</span>${i!==undefined?`<button type="button" data-remove-file="${i}" aria-label="Remove ${esc(f.name)}">${svg('x')}</button>`:''}</span>`; }
function renderAttached(){
  const row=$('#attach-row'); row.hidden=!attached.length;
  row.innerHTML=attached.map((f,i)=>fileChip(f,i)).join(''); hydrateIcons(row); updateSend();
}
(function dropTarget(){
  const comp=document.querySelector('.composer'); let depth=0;
  const hasFiles = e => [...(e.dataTransfer?.types||[])].includes('Files');
  // Dropping anywhere on the page attaches instead of the browser opening the file.
  addEventListener('dragover', e=>{ if(hasFiles(e)) e.preventDefault(); });
  addEventListener('drop', e=>{ if(hasFiles(e)) e.preventDefault(); });
  addEventListener('dragenter', e=>{ if(!hasFiles(e)) return; depth++; comp.classList.add('drop-ready'); });
  addEventListener('dragleave', e=>{ if(!hasFiles(e)) return; depth=Math.max(0,depth-1); if(!depth) comp.classList.remove('drop-ready','drop-over'); });
  comp.addEventListener('dragover', ()=>comp.classList.add('drop-over'));
  comp.addEventListener('dragleave', e=>{ if(!comp.contains(e.relatedTarget)) comp.classList.remove('drop-over'); });
  addEventListener('drop', e=>{
    depth=0; comp.classList.remove('drop-ready','drop-over');
    if(!hasFiles(e) || getComputedStyle(document.querySelector('.bottom')).display==='none') return;
    attached.push(...[...e.dataTransfer.files].map(f=>({name:f.name, size:f.size})));
    renderAttached(); input.focus();
  });
})();
function replyFiles(files, text){
  const names = files.map(f=>f.name).join(', ');
  return { ack: `Reading ${files.length>1?files.length+' files':files[0].name}.`,
    html: `<p>Got <b>${esc(names)}</b>. In the product I'd summarise ${files.length>1?'them':'it'} and suggest which deal ${files.length>1?'they belong':'it belongs'} to. In this concept I can't open files yet${text?', so I\'ll answer your question without it':''}.</p>`,
    optionsLabel:'Meanwhile', options:[["How's my quarter looking?",'quarter'],['What should I focus on today?','today']] };
}
/* ===== Answer rhythm (Duet-style, 2026-10-27) =====
   1. Say where the answer comes from, in one plain sentence (the "ack").
   2. Typing dots.
   3. The answer arrives block by block; numbers marked data-count count up.
   To revert: restore the single loading → answer version of aiMsg and drop reveal()/countUp(). */
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)');
/* The AI speaks with its face: neutral on the opening line, thinking while it works, happy when a write lands. */
const AI_FACE = '<img class="ai-face-sm" src="assets/ai/ai-face.webp" alt="">';
const AI_FACE_HAPPY = '<img class="ai-face-sm" src="assets/ai/ai-face-happy.webp" alt="">';
/* Larger faces (home, Pipeline assistant) are interactive: see ai-face-motion.js. */
function typingMsg(){
  const el=document.createElement('div'); el.className='msg-ai loading-message';
  el.innerHTML=`<div class="ai-col"><div class="bubble-wrap"><div class="bubble-ai"><div class="loading-state" role="status" aria-live="polite"><div class="loading-title"><img class="ai-face-sm" src="assets/ai/ai-face-think.webp" alt=""><span class="loading-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="sr-only">Working on it</span></div></div></div></div></div>`;
  thread.appendChild(el); scrollBottom(); return el;
}
function fmtCount(n, dec, pre, suf){ return pre + n.toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suf; }
function countUp(node, delay){
  const target=parseFloat(node.dataset.count), dec=+(node.dataset.dec||0), pre=node.dataset.pre||'', suf=node.dataset.suf||'';
  const final=fmtCount(target,dec,pre,suf);
  if(REDUCED.matches || (target<10 && !dec)){ node.textContent=final; return; }
  const from=target*0.62, dur=900;
  node.textContent=fmtCount(from,dec,pre,suf);
  setTimeout(()=>{
    const t0=performance.now();
    const step=now=>{ const k=Math.min(1,(now-t0)/dur), e=1-Math.pow(1-k,3);
      node.textContent = k<1 ? fmtCount(from+(target-from)*e,dec,pre,suf) : final;
      if(k<1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }, delay);
}
function reveal(root){
  const blocks=[...root.querySelectorAll(':scope .execution-details, :scope .bubble-ai > *, :scope .clarification-options, :scope .ai-meta')];
  blocks.forEach((b,i)=>{
    const delay=i*110;
    if(!REDUCED.matches) b.animate([{opacity:0, transform:'translateY(6px)'},{opacity:1, transform:'none'}], {duration:300, delay, easing:'cubic-bezier(.2,.7,.2,1)', fill:'backwards'});
    b.querySelectorAll('[data-count]').forEach(n=>countUp(n, delay+120));
  });
}
function aiMsg(build, opts={}){
  const r = build();
  if(opts.instant){
    // Reopening a past conversation: show it as it was, without replaying the typing.
    if(r.ack){ const a=document.createElement('div'); a.className='msg-ai msg-ack'; a.innerHTML=`<div class="ai-col"><div class="bubble-wrap"><div class="bubble-ai"><p>${AI_FACE}${esc(r.ack)}</p></div></div></div>`; thread.appendChild(a); }
    const el=document.createElement('div'); el.className='msg-ai';
    el.innerHTML=`<div class="ai-col">${r.sources?sourcesHTML(r.sources):''}<div class="bubble-wrap"><div class="bubble-ai">${r.html}</div></div>${r.options?optionsHTML(r.optionsLabel||'Next', r.options):''}${aiMetaHTML(nowHM())}</div>`;
    thread.appendChild(el); hydrateIcons(el); syncPins(); $('#scroll').scrollTop=0; return el;
  }
  let el = typingMsg();
  const finish = () => {
    const col = el.querySelector('.ai-col');
    el.classList.remove('loading-message');
    col.innerHTML = (r.sources?sourcesHTML(r.sources):'') + `<div class="bubble-wrap"><div class="bubble-ai">${r.html}</div></div>` + (r.options?optionsHTML(r.optionsLabel||'Next', r.options):'') + aiMetaHTML(nowHM());
    hydrateIcons(col); syncPins(); reveal(col); scrollBottom();
  };
  if(r.ack){
    setTimeout(()=>{
      el.classList.remove('loading-message'); el.classList.add('msg-ack');
      el.querySelector('.bubble-ai').innerHTML=`<p>${AI_FACE}${esc(r.ack)}</p>`;
      reveal(el.querySelector('.ai-col'));
      el = typingMsg();
      setTimeout(finish, REPLY_DELAY);
    }, 450);
  } else {
    setTimeout(finish, REPLY_DELAY);
  }
  return el;
}

/* ===== Q4 snapshot: ask once, pin it, it stays (2026-10-27) ===== */
const PIN_KEY='bct-crm-pinned-q4';
function isPinned(){ try{ return localStorage.getItem(PIN_KEY)==='1'; }catch(e){ return false; } }
function setPinned(on){ try{ on?localStorage.setItem(PIN_KEY,'1'):localStorage.removeItem(PIN_KEY); }catch(e){} }
/* Q4 snapshot, in the Reports style (2026-10-28): same number, unit, pill and card as the Reports page,
   so the same figures look the same in chat, on the home page and in Reports. */
function snapshotHTML(where){
  const big=(pre,val,unit,dec)=>`<span class="rp-big"><span data-count="${val}" data-dec="${dec}" data-pre="${pre}" data-suf="">${pre}${val.toFixed(dec)}</span>${unit?`<sup>${unit}</sup>`:''}</span>`;
  // delta: [text, 'up'|'down'] for a change vs last period, shown as a pill; anything else stays plain text in the label
  const tile=(num,label,delta,cap)=>`<div class="snap-tile">${num}<div class="rp-row">${label}${delta?` <span class="rp-delta ${delta[1]}">${delta[0]}</span>`:''}</div><div class="snap-cap">${cap}</div></div>`;
  const updated = where==='chat' ? 'Updated now' : 'Updated today 06:00 · <span class="nb">refreshes every morning</span>';
  return `<div class="snap-card">
    <div class="snap-grid">
      ${tile(big('$',2.55,'M',2),'Open pipeline',['+12%','up'],'6 deals · <span class="nb">1 closing this week</span>')}
      ${tile(big('$',1.10,'M',2),'Q4 forecast · 73% of target',null,'Target $1.5M · <span class="nb">gap $400K</span>')}
      ${tile(big('$',1.07,'M',2),'Won, last 90 days',null,'3 won · 2 lost · <span class="nb">60% win rate</span>')}
      ${tile(big('',2,'',0),'New leads this week',null,'<span class="nb">1 matches an account</span>')}
    </div>
    <div class="snap-foot">
      <div class="snap-foot-txt"><b>Q4 snapshot</b><small>${updated}</small></div>
      <button class="snap-btn" data-action="pin-snapshot" aria-pressed="false" aria-label="Pin to home" title="Pin to home">${svg('pin')}</button>
      <button class="snap-btn" data-view="reports" aria-label="Open in Reports" title="Open in Reports">${svg('arrow-ur')}</button>
    </div>
  </div>`;
}
function syncPins(){
  const on=isPinned();
  document.querySelectorAll('[data-action="pin-snapshot"]').forEach(b=>{ b.setAttribute('aria-pressed',String(on)); b.setAttribute('aria-label', on?'Unpin from home':'Pin to home'); b.title = on?'Unpin from home':'Pin to home'; });
}
/* Home, option A (2026-10-28): the pinned Q4 snapshot is one slim strip; the full card lives in chat and Reports. */
function pinStripHTML(){
  const n=(pre,val,unit,dec)=>`<span class="rp-big"><span data-count="${val}" data-dec="${dec}" data-pre="${pre}" data-suf="">${pre}${val.toFixed(dec)}</span>${unit?`<sup>${unit}</sup>`:''}</span>`;
  return `<div class="pin-strip">
    <button class="ps-main" data-view="reports" aria-label="Pinned Q4 numbers. Open Reports"><span class="ps-l">Q4</span>
      <span class="ps-n" data-tip-h="Open pipeline" data-tip="All your open deals, at full value. Up 12% from the end of Q3.">${n('$',2.55,'M',2)}open <span class="rp-delta up">+12%</span></span>
      <span class="ps-n" data-tip-h="Q4 forecast" data-tip="Committed $540K plus best case $560K. 73% of the $1.5M target.">${n('$',1.10,'M',2)}forecast · 73%</span>
      <span class="ps-n" data-tip-h="Won, last 90 days" data-tip="Three deals signed since 29 Jul.">${n('$',1.07,'M',2)}won</span>
      <span class="ps-n" data-tip-h="New leads this week" data-tip="Al Dhafra and Qamar Energy, both from the website.">${n('',2,'',0)}new leads</span></button>
    <button class="snap-btn" data-action="pin-snapshot" aria-pressed="true" aria-label="Unpin from home" title="Unpin from home">${svg('pin')}</button>
    <button class="snap-btn" data-view="reports" aria-label="Open in Reports" title="Open in Reports">${svg('arrow-ur')}</button>
  </div>`;
}
function renderHomePinned(animate){
  const box=$('#home-pinned'); if(!box) return;
  if(isPinned()){ box.hidden=false; box.innerHTML=pinStripHTML(); hydrateIcons(box); syncPins(); if(animate) box.querySelectorAll('[data-count]').forEach(n=>countUp(n,150)); }
  else { box.hidden=true; box.innerHTML=''; }
}
function togglePin(){
  const on=!isPinned(); setPinned(on); syncPins(); renderHomePinned(false);
  if(typeof activeView!=='undefined' && activeView==='reports' && body.classList.contains('viewing')) openView('reports');
  toast(on ? 'Pinned to your home. It refreshes every morning at 06:00.' : 'Unpinned from your home');
}
function replyQuarter(){
  return {
    ack: 'On it. Pulling from the CRM, your Outlook mail, Teams calendar and the website form.',
    sources: [['6 open opportunities','briefcase','CRM · owned by you','synced 2 min ago'],['Q4 forecast','gauge','CRM · commit and best case','synced 2 min ago'],['2 website leads','globe','Website form','synced 2 min ago'],['Calendar','calendar','Teams · Q4','synced 5 min ago']],
    html: `<p>Here's your Q4 snapshot. Pin it and I'll refresh it every morning at 06:00.</p>
      ${snapshotHTML('chat')}
      <p>You're at <b>73% of target</b> with nine weeks to go. The gap is <b>$400K</b>, and ${srcChip('datalake','Data Lake')} alone would cover it. It has been quiet for 32 days, so that's the deal to unstick.</p>`,
    optionsLabel: 'Next',
    options: [['Draft a follow-up to Hana','draft-hana'],['Open the pipeline','view-pipeline'],['What should I focus on today?','today']]
  };
}

/* ---------- Scenario 1: pipeline ---------- */
function replyPipeline(){
  return {
    ack: 'On it. Pulling Qamar Energy from the CRM, plus your Outlook mail and Teams meetings.',
    sources: [['4 opportunities','briefcase','CRM · Qamar Energy','synced 2 min ago'],['23 emails','mail','Outlook · last 90 days','synced 2 min ago'],['6 meetings','calendar','Teams calendar','today 09:00']],
    html: `<p>Qamar Energy has <b>4 opportunities worth $2.18M</b>. One is signed, two are in progress and one is still in discussion. The <b>Data Lake</b> deal needs attention: no activity for 32 days.</p>
      <div class="crm-card">
        <div class="crm-group"><div class="crm-group-head"><span class="lbl">Signed</span><small>1 · $640K</small></div>${row('erp','Closed 12 Aug · PO received')}</div>
        <div class="crm-group"><div class="crm-group-head"><span class="lbl">In progress</span><small>2 · $1.23M</small></div>${row('datalake','Proposal · last activity 32 days ago','Needs attention')}${row('fieldops','Negotiation · revised SOW sent 16 Oct')}</div>
        <div class="crm-group"><div class="crm-group-head"><span class="lbl">Still in discussion</span><small>1 · $310K</small></div>${row('kpo','Discovery · intro meeting 19 Oct')}</div>
      </div>
      <div class="crm-next" id="next-datalake"><p><b>Suggested next step.</b> Data Lake has been quiet since the solution workshop on 20 Sep. Send Hana Al-Rashdi a follow-up?</p>
        <div class="crm-actions"><button class="btn-bct" data-action="draft-followup">${svg('mail')}Draft follow-up email</button><button class="btn-bct secondary" data-action="remind">Remind me Monday</button></div>
      </div>`,
    optionsLabel: 'Want to see this as a chart?',
    options: [['Value by stage','chart-stage'],['Pipeline over time','chart-trend'],['The list is enough','chart-none']]
  };
}
function replyChartStage(){
  return {
    html: `<p>Here's Qamar Energy by stage. Proposal carries the most value, and all of it is the Data Lake deal.</p>
      <div class="crm-card crm-chart"><div class="crm-chart-head"><span>Qamar Energy — value by stage</span>${srcChip('datalake','4 opportunities')}</div>
      <div class="bars" role="img" aria-label="Bar chart: Discovery 310K, Proposal 820K, Negotiation 410K, Won 640K">
        <span class="k">Discovery</span><div class="b light" style="width:38%"></div><span class="v">$310K</span>
        <span class="k">Proposal</span><div class="b" style="width:100%"></div><span class="v">$820K</span>
        <span class="k">Negotiation</span><div class="b" style="width:50%"></div><span class="v">$410K</span>
        <span class="k">Won</span><div class="b dark" style="width:78%"></div><span class="v">$640K</span>
      </div></div>`,
    optionsLabel: 'Anything else?',
    options: [['Show it over time instead','chart-trend'],['Who are our contacts at Qamar?','contacts'],['What should I focus on today?','today']]
  };
}
function replyChartTrend(){
  return {
    html: `<p>Pipeline with Qamar grew from <b>$0.64M in June to $2.18M in October</b>, mostly from Field Ops and Data Lake entering in August and September.</p>
      <div class="crm-card crm-chart"><div class="crm-chart-head"><span>Qamar Energy — total pipeline, Jun–Oct 2026</span>${srcChip('datalake','4 opportunities')}</div>
      <svg viewBox="0 0 600 200" role="img" aria-label="Line chart: pipeline grew from 0.64M in June to 2.18M in October">
        <g stroke="#e9edf4" stroke-width="1"><line x1="50" y1="30" x2="580" y2="30"/><line x1="50" y1="88" x2="580" y2="88"/><line x1="50" y1="146" x2="580" y2="146"/></g>
        <g fill="#56657a" font-size="12" font-family="Inter, sans-serif"><text x="8" y="34">$2.4M</text><text x="8" y="92">$1.2M</text><text x="22" y="150">$0</text>
        <text x="70" y="172" text-anchor="middle">Jun</text><text x="190" y="172" text-anchor="middle">Jul</text><text x="310" y="172" text-anchor="middle">Aug</text><text x="430" y="172" text-anchor="middle">Sep</text><text x="550" y="172" text-anchor="middle">Oct</text></g>
        <polyline points="70,115 190,115 310,95 430,56 550,41" fill="none" stroke="#0042B7" stroke-width="3" stroke-linejoin="round"/>
        <g fill="#0042B7"><circle cx="70" cy="115" r="4"/><circle cx="190" cy="115" r="4"/><circle cx="310" cy="95" r="4"/><circle cx="430" cy="56" r="4"/><circle cx="550" cy="41" r="5"/></g>
        <text x="550" y="26" text-anchor="middle" font-size="13" font-weight="600" fill="#052870" font-family="Inter, sans-serif">$2.18M</text>
        <g fill="#56657a" font-size="11" font-family="Inter, sans-serif"><text x="310" y="192" text-anchor="middle">+ Field Ops</text><text x="430" y="192" text-anchor="middle">+ Data Lake</text><text x="550" y="192" text-anchor="middle">+ AI doc processing</text></g>
      </svg></div>`,
    optionsLabel: 'Anything else?',
    options: [['Show value by stage instead','chart-stage'],['Who are our contacts at Qamar?','contacts'],['What should I focus on today?','today']]
  };
}
function replyNoChart(){
  return { html:`<p>Okay, I'll keep it as a list. Ask me any time if you want a chart.</p>`, optionsLabel:'Anything else?', options:[['Who are our contacts at Qamar?','contacts'],['What should I focus on today?','today']] };
}
function replyContacts(){
  const p = RECORDS.contacts.people;
  return {
    ack: 'Looking up Qamar Energy in the CRM and your mail.',
    sources: [['4 contacts','users','CRM · Qamar Energy','synced 2 min ago'],['23 emails','mail','Outlook · last 90 days','synced 2 min ago']],
    html: `<p>You have <b>4 contacts</b> at Qamar Energy. Hana is the main contact on both Data Lake and the ERP renewal; you haven't spoken to Khalid in procurement since July.</p>
      <div class="crm-card"><div class="crm-group">${p.map(x=>`<div class="crm-row"><div class="crm-row-main"><div class="crm-row-title">${esc(x[1])}</div><div class="crm-row-meta"><span>${esc(x[2])}</span></div></div><div class="crm-row-side">${srcChip('contacts', x[0]==='HA'?'Open':'Open')}</div></div>`).join('')}</div></div>`,
    optionsLabel: 'Anything else?',
    options: [['Draft a check-in to Khalid','draft-khalid'],['Back to the pipeline','pipeline']]
  };
}

/* ---------- Scenario 2: log a meeting ---------- */
function replyLog(){
  return {
    ack: 'Got it. Matching this to Hana and the Data Lake deal in the CRM.',
    sources: [['1 opportunity','briefcase','CRM · Data Lake modernisation','synced 2 min ago'],['1 contact','users','CRM · Hana Al-Rashdi','synced 2 min ago']],
    html: `<p>Got it. Here are the <b>4 updates</b> I'll make to <b>Data Lake modernisation</b>. Check them, then confirm.</p>
      <div class="crm-card" id="log-card">
        <div class="crm-change"><span class="lbl">Activity</span><div><b>Meeting with Hana Al-Rashdi</b> · today<br><span class="muted">Wants a 3-phase rollout. Budget approved for phase 1. Expects a phased proposal by Friday.</span></div></div>
        <div class="crm-change"><span class="lbl">Next step</span><div><span class="old">Follow up after workshop</span><span class="arrow">→</span><b>Send phased proposal</b></div></div>
        <div class="crm-change"><span class="lbl">Budget</span><div><span class="old">Unconfirmed</span><span class="arrow">→</span><b>Approved for phase 1</b></div></div>
        <div class="crm-change"><span class="lbl">New task</span><div><b>Send phased proposal to Hana</b><br><span class="muted">Due Fri 23 Oct · Gaurav Shrotriya</span></div></div>
      </div>
      <div id="log-state"><div class="crm-actions"><button class="btn-bct" data-action="log-save">${svg('check')}Confirm all 4</button><button class="btn-bct secondary" data-action="log-edit">Edit</button><button class="btn-bct secondary" data-action="log-discard">Discard</button></div></div>`,
    optionsLabel: "While you're here",
    options: [['Draft the phased proposal outline','draft-outline'],['Show the whole Qamar pipeline','pipeline']]
  };
}
const LOG_STATES = {
  pending: `<div class="crm-actions"><button class="btn-bct" data-action="log-save">${svg('check')}Confirm all 4</button><button class="btn-bct secondary" data-action="log-edit">Edit</button><button class="btn-bct secondary" data-action="log-discard">Discard</button></div>`,
  saved: `<div class="crm-banner ok"><span>${AI_FACE_HAPPY}<b>Saved.</b> 4 updates added to Data Lake modernisation.</span><span class="acts">${srcChip('datalake','View record')}<button class="src" data-action="log-undo">${svg('undo')}Undo</button></span></div>`,
  discarded: `<div class="crm-banner muted"><span>Discarded. Nothing was changed.</span><span class="acts"><button class="src" data-action="log-restore">${svg('undo')}Restore</button></span></div>`,
  // Undo (same information as the connector's "Undone" card): what was reversed and what the deal is back to.
  undone: `<div class="crm-banner muted"><span><b>Undone.</b> 4 updates reverted. Data Lake is back to next step <b>Follow up after workshop</b> · budget <b>Unconfirmed</b>.</span><span class="acts"><button class="src" data-action="log-restore">${svg('undo')}Review again</button></span></div>`
};
const LEAD_STATES = {
  pending: `<p><b>Looks like a duplicate.</b> Khalid's enquiry matches the AI document processing deal you opened on 19 Oct. Link this lead to ${srcChip('kpo')} instead of creating a second one?</p>
    <div class="crm-actions"><button class="btn-bct" data-action="lead-link">${svg('check')}Link to OPP-1066</button><button class="btn-bct secondary" data-action="lead-keep">Keep as a new lead</button></div>`,
  linked: `<div class="crm-banner ok" style="margin-top:0"><span>${AI_FACE_HAPPY}<b>Linked.</b> LEAD-0312 attached to AI document processing as a pricing request.</span><span class="acts">${srcChip('kpo','View deal')}<button class="src" data-action="lead-undo">${svg('undo')}Undo</button></span></div>`,
  kept: `<div class="crm-banner muted" style="margin-top:0"><span>Kept as a new lead. You can link it later from the lead record.</span><span class="acts"><button class="src" data-action="lead-undo">${svg('undo')}Undo</button></span></div>`
};
function setLeadState(st){ const el=$('#lead-state'); if(!el) return; el.innerHTML=LEAD_STATES[st]; hydrateIcons(el); }
function setLogState(s){ const el=$('#log-state'); if(!el) return; el.innerHTML=LOG_STATES[s]; hydrateIcons(el); }

/* ---------- Scenario 3: today ---------- */
const done = {};
function taskRow(t){
  const d=!!done[t.id];
  return `<div class="task ${d?'done':''}" data-task="${t.id}"><button class="task-box" role="checkbox" aria-checked="${d}" aria-label="${esc(t.title)}">${svg('check')}</button>
    <div class="crm-row-main"><div class="crm-row-title">${esc(t.title)}</div><div class="crm-row-meta"><span>${esc(t.meta)}</span>${t.overdue&&!d?'<span class="flag overdue">Overdue</span>':''}</div></div>${srcChip(t.src)}</div>`;
}
function replyToday(){
  return {
    ack: 'On it. Checking your tasks, deals, calendar and overnight website leads.',
    sources: [['2 website leads','globe','Website form · bct.com','synced 2 min ago'],['3 tasks','circle-check','CRM · your task list','synced 2 min ago'],['6 open opportunities','briefcase','CRM · owned by you','synced 2 min ago'],['Calendar','calendar','Teams · today','synced 5 min ago']],
    html: `<p><b>2 website leads</b> came in overnight, one of them from a company you already work with. You also have <b>3 tasks today</b> (one is overdue) and <b>2 deals that need attention</b>. I'd start with the Gulf Harbor pricing: their close date is Monday.</p>
      <div class="crm-card"><div class="crm-group"><div class="crm-group-head"><span class="lbl">New website leads</span><small>2 overnight</small></div>
        <div class="crm-row"><div class="crm-row-main"><div class="crm-row-title">Al Dhafra Facilities Management · Faisal Al-Mazrouei</div><div class="crm-row-meta"><span>Field service for ~400 technicians · 02:14 · Services page</span><span class="flag new">New company</span></div></div><div class="crm-row-side"><button class="btn-bct secondary" data-next="draft-faisal">Draft reply</button>${srcChip('lead1')}</div></div>
        <div class="crm-row"><div class="crm-row-main"><div class="crm-row-title">Qamar Energy · Khalid Al-Riyami</div><div class="crm-row-meta"><span>AI document processing pricing · 06:40 · Contact page</span><span class="flag match">Matches existing account</span></div></div><div class="crm-row-side">${srcChip('lead2')}</div></div>
      </div></div>
      <div class="crm-next" id="lead-state"><p><b>Looks like a duplicate.</b> Khalid's enquiry matches the AI document processing deal you opened on 19 Oct. Link this lead to ${srcChip('kpo')} instead of creating a second one?</p>
        <div class="crm-actions"><button class="btn-bct" data-action="lead-link">${svg('check')}Link to OPP-1066</button><button class="btn-bct secondary" data-action="lead-keep">Keep as a new lead</button></div>
      </div>
      <div class="crm-card" id="task-card"><div class="crm-group" style="padding-bottom:4px"><div class="crm-group-head"><span class="lbl">Tasks</span><small id="task-count">0 of 3 done</small></div></div><div id="task-list">${TASKS.map(taskRow).join('')}</div></div>
      <div class="crm-card"><div class="crm-group"><div class="crm-group-head"><span class="lbl">Needs attention</span></div>
        <div class="crm-row"><div class="crm-row-main"><div class="crm-row-title">Data Lake modernisation · Qamar Energy</div><div class="crm-row-meta"><span>No activity for 32 days · $820K</span></div></div><div class="crm-row-side"><button class="btn-bct secondary" data-next="pipeline">Draft follow-up</button></div></div>
        <div class="crm-row"><div class="crm-row-main"><div class="crm-row-title">Warehouse management system · Gulf Harbor</div><div class="crm-row-meta"><span>Close date Mon 26 Oct, still in Proposal · $540K</span></div></div><div class="crm-row-side"><button class="btn-bct secondary" data-record="gulf">Open record</button></div></div>
      </div></div>`,
    optionsLabel: 'Anything else?',
    options: [['Draft a reply to Faisal','draft-faisal'],['Draft the Gulf Harbor pricing email','draft-gulf'],['Show my week','week']]
  };
}
function refreshTasks(){
  renderTaskLists();
  const list=$('#task-list'); if(!list) return;
  list.innerHTML=TASKS.map(taskRow).join(''); hydrateIcons(list);
  const n=TASKS.filter(t=>done[t.id]).length; $('#task-count').textContent=`${n} of 3 done`;
}
/* Task lists outside the chat (2026-10-28, no Tasks page any more): home "Today", and the To do list inside a
   deal or lead brief and the record panel. Containers say what they hold with data-tasks="today" or "src:<id>". */
// Today's new website lead sits in the home list as a to-do: reply to Faisal.
function homeLeadRow(){
  const d=!!done.l1;
  return `<div class="task lead ${d?'done':''}" data-task="l1"><button class="task-box" role="checkbox" aria-checked="${d}" aria-label="Reply to Faisal Al-Mazrouei">${svg('check')}</button>
    <div class="crm-row-main"><div class="crm-row-title">Reply to Faisal Al-Mazrouei</div><div class="crm-row-meta"><span>Al Dhafra Facilities · website lead 02:14</span>${d?'':'<span class="flag new">New lead</span>'}</div></div>
    <button class="btn-bct secondary ht-act" data-action="home-draft-faisal">Draft reply</button>${srcChip('lead1')}</div>`;
}
function renderTaskLists(){
  document.querySelectorAll('[data-tasks]').forEach(el=>{
    const k=el.dataset.tasks;
    if(k==='today'){ el.innerHTML=TASKS.map(taskRow).join(''); }
    else if(k==='home'){ const [t2,t1,t3]=['t2','t1','t3'].map(id=>TASKS.find(t=>t.id===id)); el.innerHTML=[taskRow(t2),taskRow(t1),homeLeadRow(),taskRow(t3)].join(''); }
    else if(typeof tasksFor==='function'){ el.innerHTML=tasksFor(k.slice(4)).map(taskLite).join(''); }
    hydrateIcons(el);
  });
  const left=[...TASKS.filter(t=>!done[t.id]), ...(done.l1?[]:['l1'])], over=TASKS.filter(t=>t.overdue&&!done[t.id]).length, c=$('#home-task-count');
  if(c) c.textContent = left.length ? `${left.length} to do${over?` · ${over} overdue`:''}` : 'All done for today';
}

/* ---------- Generic replies ---------- */
function replyGeneric(text){
  return {
    html: `<p>I can't do that yet in this concept. Right now I can answer questions about your pipeline, file a meeting as activity, deal updates and tasks, and plan your day.</p>`,
    optionsLabel: 'Try one of these',
    options: [["How's our pipeline with Qamar Energy?",'pipeline'],["Log this morning's meeting",'log'],['What should I focus on today?','today']]
  };
}
function replyDraft(kind){
  const d = {
    followup: ['Hana Al-Rashdi','Data Lake — proposed next steps',"Hi Hana, thanks again for the workshop last month. Based on your team's input, we've outlined a phased approach for the data lake. Could we find 30 minutes next week to walk you through it?"],
    gulf: ['Omar Haddad','Revised pricing — warehouse management system','Hi Omar, as discussed with your finance team, here is the revised pricing with the phased licence option. Happy to walk through it before Monday if that helps.'],
    faisal: ['Faisal Al-Mazrouei','Field service management — next step',"Hi Faisal, thanks for reaching out through our website. We've helped operations teams of a similar size move off spreadsheets with a phased field-service rollout. Would a 30-minute demo next week suit you, ahead of your December budget round?"],
    khalid: ['Khalid Al-Riyami','Checking in',"Hi Khalid, it's been a while since the ERP renewal closed. With two new projects in motion at Qamar, I'd like to make sure procurement has what it needs early. Could we catch up this week?"],
    outline: ['', 'Phased proposal outline', 'Phase 1 — Foundation (budget approved): landing zone, ingestion for the 3 priority sources, governance baseline.\nPhase 2 — Expansion: remaining sources, self-service analytics, data quality monitoring.\nPhase 3 — Advanced: ML-ready datasets, real-time pipelines, cost optimisation.']
  }[kind];
  const isMail = !!d[0];
  return {
    html: `<p>${isMail?"Here's a draft. Nothing is sent until you open it in Outlook.":"Here's an outline to start from."}</p>
      <div class="crm-draft">${isMail?`<div class="to">To: ${esc(d[0])} · Subject: ${esc(d[1])}</div>`:`<div class="to">${esc(d[1])}</div>`}<div style="white-space:pre-line">${esc(d[2])}</div></div>
      <div class="crm-actions">${isMail?`<button class="btn-bct" data-action="open-outlook">${svg('mail')}Open in Outlook</button>`:`<button class="btn-bct" data-action="copy-draft">${svg('copy')}Copy outline</button>`}<button class="btn-bct secondary" data-action="shorter">Make it shorter</button></div>`,
    optionsLabel: 'Anything else?',
    options: [['Back to the pipeline','pipeline'],['What should I focus on today?','today']]
  };
}
/* Which deals need my attention this week? (2026-10-28) — the same four deals, reasons, next steps and buttons
   as the connector's "Needs attention" card: overdue, due today, closing this week, quiet for three weeks or more. */
function attnRow(id, flags, next, label, key){
  const r=RECORDS[id];
  return `<div class="crm-row"><div class="crm-row-main"><div class="crm-row-title">${esc(r.name)} · ${esc(r.account)}</div>
    <div class="crm-row-meta"><span>${esc(STAGES[r.stage])}</span>${flags.map(f=>`<span class="flag ${f[0]}">${esc(f[1])}</span>`).join('')}</div>
    <div class="crm-row-meta"><span>${esc(next)}</span></div></div>
    <div class="crm-row-side"><span class="crm-amount">${r.amount}</span><button class="btn-bct secondary" data-next="${key}">${esc(label)}</button></div></div>`;
}
function replyAttention(){
  return {
    ack: 'Checking your deals, tasks and close dates.',
    sources: [['6 open opportunities','briefcase','CRM · owned by you','synced 2 min ago'],['Tasks','circle-check','CRM · your task list','synced 2 min ago']],
    html: `<p><b>4 deals</b> need you this week. Start with <b>Gulf Harbor</b>: the pricing is a day late and they close on Monday.</p>
      <div class="crm-card"><div class="crm-group"><div class="crm-group-head"><span class="lbl">Needs attention</span><small>4 deals · $2.05M</small></div>
        ${attnRow('gulf',[['overdue','1 day late'],['ink','Closes Monday']],'Send revised pricing to Omar Haddad · was due Wed 21 Oct','Draft pricing email','draft-gulf')}
        ${attnRow('fieldops',[['due','Due today 16:00']],'Prepare Field Ops demo for Qamar · due today 16:00','Prep checklist','prep-fieldops')}
        ${attnRow('sahyadri',[['due','Due today 11:00']],'Call Rajesh Kulkarni about security review scope · due today 11:00','Prep for the call','prep-rajesh')}
        ${attnRow('datalake',[['warn','Quiet 32 days']],'Send phased proposal to Hana · due Fri 23 Oct','Draft follow-up to Hana','draft-hana')}
      </div></div>
      <p class="muted" style="margin-top:10px">Can wait: AI document processing.</p>`,
    optionsLabel: 'Next',
    options: [['Draft the Gulf Harbor pricing email','draft-gulf'],['What should I focus on today?','today']]
  };
}
function replyPrep(k){
  const d = {
    fieldops: ['Field Ops demo prep · today 16:00', ['Confirm the supervisors attending on Thursday','Load the offline job-sheet demo with Qamar sample data','Bring the revised SOW summary (sent 16 Oct)','Agree the go/no-go criteria with Salim']],
    rajesh: ['Call with Rajesh Kulkarni · today 11:00', ['Recap: he asked for scope options on 15 Oct','Offer three scopes: core banking only, plus payments, plus cloud','Ask who signs off: Rajesh or Priya Deshmukh','Agree a date for the written proposal']]
  }[k];
  return { html: `<p>${esc(d[0])}:</p><ul>${d[1].map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`, optionsLabel:'Anything else?', options:[['Back to deals that need attention','attention']] };
}
function replyWeek(){
  return {
    ack: 'Checking your calendar and open deals for the week.',
    sources: [['Calendar','calendar','Teams · this week','synced 5 min ago'],['6 open opportunities','briefcase','CRM · owned by you','synced 2 min ago']],
    html: `<p>Two things define your week: <b>Gulf Harbor closes Monday</b> and the <b>Qamar Field Ops demo is Thursday</b>. Everything else can move.</p>
      <div class="crm-card"><div class="crm-group">
        ${row('gulf','Mon 26 Oct · close date · pricing still open')}${row('fieldops','Thu 29 Oct · demo to field supervisors')}${row('datalake','Fri 23 Oct · phased proposal due')}
      </div></div>`,
    optionsLabel:'Anything else?', options:[['Back to today','today'],['Show the whole Qamar pipeline','pipeline']]
  };
}

/* ---------- Conversation flow ---------- */
let activeChat = null;
function startChat(title){
  body.classList.add('chatting'); body.classList.remove('mobile-nav-open','viewing'); setActiveView(null); delete body.dataset.page;
  $('#chat-head').hidden=false; $('#ch-title-text').textContent=title;
}
function goHome(){
  if(window.PageAsk) PageAsk.leave();
  body.classList.remove('chatting','mobile-nav-open','viewing'); setActiveView(null); closeRecord(); delete body.dataset.page;
  input.placeholder='Ask about a deal, or tell me what happened…';
  $('#chat-head').hidden=true; thread.innerHTML=''; activeChat=null; renderHistory();
  input.value=''; autosize(); updateSend();
  renderHomePinned(true); renderTaskLists();
  $('#scroll').scrollTop=0;
  if(window.HomeMotion) HomeMotion.enter(false);
}
function runScenario(key, text, opts={}){
  if(window.PageAsk) PageAsk.leave();
  const s = SCENARIOS[key], c = chatByKey(key);
  thread.innerHTML=''; closeRecord(); startChat(c?c.title:s.title); activeChat=key; renderHistory();
  userMsg(text||s.msg);
  aiMsg({quarter:replyQuarter, pipeline:replyPipeline, log:replyLog, today:replyToday, attention:replyAttention}[key], opts);
}
function next(key){
  // Follow-up actions inside a conversation. Some switch scenario; most append to the thread.
  const map = {
    'pipeline': ()=>{ if(activeChat!=='pipeline'){ runScenario('pipeline'); } else { userMsg('Show the whole Qamar pipeline'); aiMsg(replyPipeline); } },
    'today': ()=>{ if(activeChat!=='today'){ runScenario('today'); } else { userMsg('What should I focus on today?'); aiMsg(replyToday); } },
    'log': ()=>runScenario('log'),
    'quarter': ()=>{ if(activeChat!=='quarter'){ runScenario('quarter'); } else { userMsg("How's my quarter looking?"); aiMsg(replyQuarter); } },
    'draft-hana': ()=>{ userMsg('Draft a follow-up to Hana'); aiMsg(()=>replyDraft('followup')); },
    'view-pipeline': ()=>openView('pipeline'),
    'view-reports': ()=>openView('reports'),
    'chart-stage': ()=>{ userMsg('Value by stage'); aiMsg(replyChartStage); },
    'chart-trend': ()=>{ userMsg('Pipeline over time'); aiMsg(replyChartTrend); },
    'chart-none': ()=>{ userMsg('The list is enough'); aiMsg(replyNoChart); },
    'contacts': ()=>{ userMsg('Who are our contacts at Qamar?'); aiMsg(replyContacts); },
    'draft-khalid': ()=>{ userMsg('Draft a check-in to Khalid'); aiMsg(()=>replyDraft('khalid')); },
    'draft-faisal': ()=>{ userMsg('Draft a reply to Faisal'); aiMsg(()=>replyDraft('faisal')); },
    'draft-gulf': ()=>{ userMsg('Draft the Gulf Harbor pricing email'); aiMsg(()=>replyDraft('gulf')); },
    'draft-outline': ()=>{ userMsg('Draft the phased proposal outline'); aiMsg(()=>replyDraft('outline')); },
    'week': ()=>{ userMsg('Show my week'); aiMsg(replyWeek); },
    'attention': ()=>{ if(activeChat!=='attention'){ runScenario('attention'); } else { userMsg('Which deals need my attention this week?'); aiMsg(replyAttention); } },
    'prep-fieldops': ()=>{ userMsg('Make a short prep checklist for the Field Ops demo'); aiMsg(()=>replyPrep('fieldops')); },
    'prep-rajesh': ()=>{ userMsg('Help me prepare for the call with Rajesh'); aiMsg(()=>replyPrep('rajesh')); }
  };
  (map[key]||(()=>{ if(window.PageAsk) PageAsk.next(key); }))();
}
function send(){
  const text=input.value.trim(); if(!text && !attached.length) return;
  const files=attached.slice(); attached=[]; renderAttached();
  input.value=''; autosize(); updateSend();
  const fly = window.HomeMotion ? HomeMotion.capture() : ()=>{}; // asked from home: the bubble flies into the chat
  if(files.length){
    if(!body.classList.contains('chatting')){ thread.innerHTML=''; startChat(text ? (text.length>40?text.slice(0,40)+'…':text) : files[0].name); activeChat='new'; renderHistory(); }
    userMsg(text, files); aiMsg(()=>replyFiles(files, text)); fly(); return;
  }
  // Asked from a page (page-ask.js): page-specific answers first
  const pr = body.classList.contains('chatting') && window.PageAsk ? PageAsk.reply(text) : null;
  if(pr){ userMsg(text); aiMsg(pr); return; }
  const t=text.toLowerCase();
  const key = /attention|at risk|slipp|need me/.test(t) ? 'attention' : /quarter|q4|forecast|how are we doing|dashboard|snapshot/.test(t) ? 'quarter' : /met |meeting|call with|just |log /.test(t) ? 'log' : (/today|focus|task|to-?do/.test(t) ? 'today' : (/pipeline|qamar|deal|opportunit/.test(t) ? 'pipeline' : null));
  if(!body.classList.contains('chatting')){
    if(key){ runScenario(key, text); fly(); return; }
    thread.innerHTML=''; startChat(text.length>40?text.slice(0,40)+'…':text); activeChat='new'; renderHistory();
  }
  userMsg(text);
  setTimeout(fly,0);
  if(key==='quarter') aiMsg(replyQuarter); else if(key==='pipeline') aiMsg(replyPipeline); else if(key==='log') aiMsg(replyLog); else if(key==='today') aiMsg(replyToday); else aiMsg(()=>replyGeneric(text));
}

/* ---------- Record panel (classic layer) ---------- */
function openRecord(id){
  const r=RECORDS[id]; if(!r) return;
  $('#record-kind').textContent=`${r.kind} · ${r.ref}`;
  $('#review-panel-title').textContent=r.name;
  $('#record-sub').textContent=r.contacts?`${r.account} · ${r.country}`:`${r.account} · ${r.country}`;
  let html='';
  if(r.lead){
    html+=`<div class="fields">
        <div><div class="k">Contact</div><div class="v strong">${esc(r.account.split(',')[0])}</div></div>
        <div><div class="k">Title</div><div class="v">${esc(r.account.split(', ')[1]||'')}</div></div>
        <div><div class="k">Email</div><div class="v">${esc(r.email)}</div></div>
        <div><div class="k">Phone</div><div class="v">${esc(r.phone)}</div></div>
        <div class="span2"><div class="k">What they asked for</div><div class="v">${esc(r.interest)}</div></div>
        <div><div class="k">Source</div><div class="v">Website form · ${esc(r.page)}</div></div>
        <div><div class="k">Submitted</div><div class="v">${esc(r.submitted)}</div></div>
        <div class="span2"><div class="k">Match check</div><div class="v">${r.match?`Existing account ${srcChip(r.match.account,'ACC-0214')} · related deal ${srcChip(r.match.opp)}`:'No match in Accounts or Contacts'}</div></div>
      </div>`;
  } else if(r.contacts){
    html+=`<div class="people">${r.people.map(p=>`<div class="person">${AVATAR_BY_NAME[p[1]]?avatarHTML(AVATAR_BY_NAME[p[1]],"avatar-d avatar-img"):`<span class="avatar-d">${p[0]}</span>`}<div>${esc(p[1])}<small>${esc(p[2])}</small></div></div>`).join('')}</div>`;
    // Accounts (2026-10-28): the account's open deals, and its to-dos from those deals
    const opps=Object.keys(RECORDS).filter(k=>RECORDS[k].kind==='Opportunity' && RECORDS[k].account===r.name && RECORDS[k].stage<3);
    if(opps.length) html+=`<div class="record-section"><span class="lbl">Deals</span><div class="rec-deals">${opps.map(k=>{ const o=RECORDS[k];
      return `<button class="rec-deal" data-record="${k}"><span>${esc(o.name)}<small>${STAGES[o.stage]} · close ${esc(o.close)}</small></span><em>${o.amount}</em></button>`; }).join('')}</div></div>`;
    const atks = typeof tasksFor==='function' ? [...opps.flatMap(k=>tasksFor(k)), ...tasksFor(id)] : [];
    if(atks.length) html+=`<div class="record-section"><span class="lbl">To do</span><div>${atks.map(taskLite).join('')}</div></div>`;
  } else {
    html+=`<div class="stages">${STAGES.map((s,i)=>`<div class="stage ${i<=r.stage?(r.stage===3?'won':'on'):''} ${i===r.stage?'cur':''}"><i></i><span>${s}</span></div>`).join('')}</div>
      <div class="fields">
        <div><div class="k">Amount</div><div class="v strong">${r.amount}</div></div>
        <div><div class="k">Expected close</div><div class="v strong">${esc(r.close)}</div></div>
        <div><div class="k">Deal type</div><div class="v">${esc(r.type)}</div></div>
        <div><div class="k">Owner</div><div class="v">${personHTML(r.owner||'Gaurav Shrotriya')}</div></div>${r.team?`
        <div class="span2"><div class="k">Deal team</div><div class="v">${r.team.map(t=>`${personHTML(t[0])} <span class="muted">${esc(t[1])}</span>`).join('<br>')}</div></div>`:''}
        <div class="span2"><div class="k">Main contact</div><div class="v">${esc(r.contact)}</div></div>
      </div>`;
  }
  const tks = typeof tasksFor==='function' ? tasksFor(id) : [];
  if(tks.length && !r.contacts) html+=`<div class="record-section"><span class="lbl">To do</span><div data-tasks="src:${id}">${tks.map(taskLite).join('')}</div></div>`;
  html+=`<div class="record-section"><span class="lbl">Recent activity</span><div class="timeline">${r.activity.map(a=>`<div><span>${esc(a[0])}</span>${esc(a[1])}</div>`).join('')}</div></div>
    <div class="crm-actions"><button class="btn-bct secondary" data-action="open-full-record">${svg('maximize')}Open full record</button></div>`;
  const c=$('#review-panel-content'); c.innerHTML=html; hydrateIcons(c);
  $('#review-panel').setAttribute('aria-hidden','false'); body.classList.add('review-panel-open');
}
function closeRecord(){ body.classList.remove('review-panel-open'); $('#review-panel').setAttribute('aria-hidden','true'); }

/* ---------- Sidebar ---------- */
function histRow(c){
  const on = c.key && c.key===activeChat;
  const open = c.id===menuChatId;
  return `<div class="hist-row ${on?'active':''} ${open?'menu-open':''}" data-id="${c.id}"><button class="hist ${on?'active':''}" data-chat="${c.key||''}" ${on?'aria-current="page"':''}><span class="hist-ico" aria-hidden="true">${svg(c.icon||'message')}</span><span class="hist-title">${esc(c.title)}</span></button><button class="hist-more ${open?'active':''}" type="button" data-chat-id="${c.id}" aria-haspopup="menu" aria-expanded="${open}" aria-label="More options: ${esc(c.title)}">${svg('more')}</button></div>`;
}
function renderHistory(){
  if(document.querySelector('.rename-input')) return; // re-renders when the rename finishes
  const pinned=CHATS.filter(c=>c.pinned), recent=CHATS.filter(c=>!c.pinned);
  $('#pinned-group').hidden = !pinned.length;
  $('#pinned-list').innerHTML=pinned.map(histRow).join('');
  $('#hist-list').innerHTML=recent.map(histRow).join('');
}

/* ===== Account menu (sidebar bottom) ===== */
const SOURCE_TEXT = { outlook:['Connected','Off · the assistant won\'t read your mail'], teams:['Connected','Off · the assistant won\'t read your meetings'], files:['Connected','Not connected'], brief:['Weekdays at 06:00','Off'] };
const SOURCE_TOAST = { outlook:['Outlook connected','Outlook disconnected. Answers won\'t use your mail.'], teams:['Teams calendar connected','Teams calendar disconnected. Answers won\'t use your meetings.'], files:['SharePoint connected. Proposals and SOWs can now be read.','SharePoint disconnected'], brief:['Daily brief on, every weekday at 06:00','Daily brief off'] };
function closeUserMenu(){
  const pop=$('#pop-user'); if(!pop.classList.contains('open')) return;
  pop.classList.remove('open'); const b=$('.user-btn'); b.setAttribute('aria-expanded','false'); b.classList.remove('active');
}
function toggleUserMenu(btn){
  const pop=$('#pop-user');
  if(pop.classList.contains('open')){ closeUserMenu(); return; }
  closeHistMenu(); if(window.ChatExport) ChatExport.close();
  pop.classList.add('open'); btn.setAttribute('aria-expanded','true'); btn.classList.add('active');
  // Beside the account button, bottom-aligned, kept inside the window.
  const r=btn.getBoundingClientRect(), w=pop.offsetWidth, h=pop.offsetHeight, phone=innerWidth<=640;
  pop.style.right='auto';
  pop.style.left=Math.max(12, Math.min(phone ? r.left : r.right+16, innerWidth-w-12))+'px';
  pop.style.top=Math.max(12, Math.min(phone ? r.top-h-8 : r.bottom-h, innerHeight-h-12))+'px';
  pop.querySelector('.switch, .menu-item[role="menuitem"]').focus({preventScroll:true});
}
function toggleSource(sw){
  const k=sw.dataset.src, on=sw.getAttribute('aria-checked')!=='true';
  sw.setAttribute('aria-checked', String(on));
  const t=document.querySelector(`[data-src-state="${k}"]`); if(t) t.textContent=SOURCE_TEXT[k][on?0:1];
  toast(SOURCE_TOAST[k][on?0:1]);
}

/* ===== Conversation ⋯ menu: Rename · Pin · Export · Delete (same as Gina) ===== */
let menuChatId = null;
function closeHistMenu(){
  const pop=$('#pop-hist'); if(!pop.classList.contains('open') && !menuChatId) return;
  pop.classList.remove('open'); menuChatId=null;
  document.querySelectorAll('.hist-row.menu-open').forEach(r=>r.classList.remove('menu-open'));
  document.querySelectorAll('.hist-more.active').forEach(b=>{ b.classList.remove('active'); b.setAttribute('aria-expanded','false'); });
}
function openHistMenu(btn){
  const id=btn.dataset.chatId, wasOpen = menuChatId===id;
  closeHistMenu(); if(window.ChatExport) ChatExport.close();
  if(wasOpen) return;
  const c=CHATS.find(x=>x.id===id); if(!c) return;
  menuChatId=id;
  const pop=$('#pop-hist');
  $('#hist-pin-label').textContent = c.pinned ? 'Unpin' : 'Pin';
  pop.querySelector('[data-action="hist-pin"] svg').outerHTML = svg(c.pinned?'pin-off':'pin');
  const ex=pop.querySelector('[data-action="hist-export"]'); ex.disabled = !c.key; ex.title = c.key ? '' : 'Nothing to export in this placeholder conversation';
  btn.classList.add('active'); btn.setAttribute('aria-expanded','true'); btn.closest('.hist-row').classList.add('menu-open');
  pop.classList.add('open');
  // Beside the ⋯ button, outside the sidebar, kept inside the window.
  const r=btn.getBoundingClientRect(), w=pop.offsetWidth, h=pop.offsetHeight;
  pop.style.right='auto';
  pop.style.left=Math.max(12, Math.min(r.right+16, innerWidth-w-12))+'px';
  pop.style.top=Math.max(12, Math.min(r.top, innerHeight-h-12))+'px';
  pop.querySelector('.menu-item').focus({preventScroll:true});
}
function startRename(c){
  const row=document.querySelector(`.hist-row[data-id="${c.id}"]`); if(!row) return;
  const field=document.createElement('input');
  field.className='rename-input'; field.value=c.title; field.setAttribute('aria-label','Rename conversation');
  row.classList.add('renaming'); row.appendChild(field); field.focus(); field.select();
  let done=false;
  const finish=save=>{
    if(done) return; done=true;
    const v=field.value.trim();
    if(save && v && v!==c.title){ c.title=v; if(c.key && c.key===activeChat) $('#ch-title-text').textContent=v; toast('Renamed'); }
    field.remove(); row.classList.remove('renaming'); renderHistory();
  };
  field.addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.isComposing){ e.preventDefault(); finish(true); } else if(e.key==='Escape'){ e.preventDefault(); e.stopPropagation(); finish(false); } });
  field.addEventListener('blur',()=>finish(true));
}
function histAction(action){
  const c=CHATS.find(x=>x.id===menuChatId); closeHistMenu(); if(!c) return;
  if(action==='hist-rename') startRename(c);
  else if(action==='hist-pin'){ c.pinned=!c.pinned; renderHistory(); toast(c.pinned?'Pinned':'Unpinned'); }
  else if(action==='hist-export'){
    if(!c.key) return;
    if(activeChat!==c.key || !body.classList.contains('chatting')){ if(!(c.page && PageAsk.open(c.key))) runScenario(c.key, null, {instant:true}); }
    setTimeout(()=>ChatExport.open(), 0);
  }
  else if(action==='hist-delete'){
    const idx=CHATS.indexOf(c); CHATS.splice(idx,1);
    const wasActive = c.key && c.key===activeChat;
    if(wasActive) goHome(); else renderHistory();
    toast(`Deleted “${c.title}”`, { label:'Undo', run:()=>{ CHATS.splice(idx,0,c); renderHistory(); } });
  }
}
function setActiveView(key){ document.querySelectorAll('.side-agents [data-view]').forEach(b=>b.classList.toggle('active', b.dataset.view===key)); }
function greet(){
  const h=new Date().getHours();
  $('#hero-greeting-line').textContent=(h<12?'Good morning':h<18?'Good afternoon':'Good evening')+', Gaurav';
}

/* ---------- Composer ---------- */
function autosize(){ input.style.height='24px'; input.style.height=Math.min(input.scrollHeight,144)+'px'; }
function updateSend(){ $('#send').classList.toggle('ready',!!input.value.trim() || attached.length>0); }
input.addEventListener('input',()=>{autosize();updateSend();});
input.addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){ e.preventDefault(); send(); } });

/* ---------- Events ---------- */
document.addEventListener('click', e => {
  const t = e.target;
  const rec = t.closest('[data-record]'); if(rec){ openRecord(rec.dataset.record); return; }
  const opt = t.closest('.reply-option'); if(opt){ const g=opt.closest('.clarification-options'); if(g){ g.querySelectorAll('.reply-option').forEach(o=>o.disabled=true); opt.classList.add('selected'); } next(opt.dataset.next); return; }
  const nx = t.closest('[data-next]'); if(nx){ next(nx.dataset.next); return; }
  const chip = t.closest('.home-chip');
  if(chip){ const go = chip.dataset.scenario ? ()=>runScenario(chip.dataset.scenario) : ()=>{ thread.innerHTML=''; closeRecord(); startChat('Follow-up — Data Lake'); activeChat='new'; renderHistory(); userMsg('Draft a follow-up to Hana'); aiMsg(()=>replyDraft('followup')); };
    if(window.HomeMotion) HomeMotion.leave(go); else go(); return; }
  const card = t.closest('.today-card'); if(card){ const k=card.dataset.scenario; if(window.HomeMotion) HomeMotion.leave(()=>runScenario(k)); else runScenario(k); return; }
  if(t.closest('.rename-input')) return;
  const more = t.closest('.hist-more'); if(more){ e.stopPropagation(); openHistMenu(more); return; }
  const mi = t.closest('#pop-hist [data-action]'); if(mi){ if(!mi.disabled) histAction(mi.dataset.action); return; }
  if(menuChatId && !t.closest('#pop-hist')) closeHistMenu();
  if(!t.closest('#pop-user') && !t.closest('.user-btn')) closeUserMenu();
  const rm = t.closest('[data-remove-file]'); if(rm){ attached.splice(+rm.dataset.removeFile,1); renderAttached(); input.focus(); return; }
  const hist = t.closest('.hist'); if(hist){ if(hist.dataset.chat){ if(window.PageAsk && PageAsk.open(hist.dataset.chat)) return; runScenario(hist.dataset.chat, null, {instant:true}); } else { toast('This conversation is only a placeholder in the concept'); } return; }
  const view = t.closest('[data-view]'); if(view){ if(window.openView && VIEWS[view.dataset.view]) openView(view.dataset.view); else toast(`${view.dataset.view[0].toUpperCase()+view.dataset.view.slice(1)} — Phase 2, not in this concept`); return; }
  const box = t.closest('.task-box'); if(box){ const id=box.closest('.task').dataset.task; done[id]=!done[id]; refreshTasks(); return; }
  const a = t.closest('[data-action]'); if(!a) return;
  switch(a.dataset.action){
    case 'send': send(); break;
    case 'new-chat': case 'go-home': e.preventDefault(); goHome(); break;
    case 'toggle-sidebar': { if(window.matchMedia('(max-width: 640px)').matches){ body.classList.toggle('mobile-nav-open'); } else { body.classList.toggle('collapsed'); } a.setAttribute('aria-expanded', String(!body.classList.contains('collapsed'))); break; }
    case 'draft-followup': { const n=$('#next-datalake'); if(n){ const r=replyDraft('followup'); n.insertAdjacentHTML('beforeend', `<div class="crm-draft"><div class="to">To: Hana Al-Rashdi · Subject: Data Lake — proposed next steps</div>Hi Hana, thanks again for the workshop last month. Based on your team's input, we've outlined a phased approach for the data lake. Could we find 30 minutes next week to walk you through it?</div><div class="crm-actions"><button class="btn-bct" data-action="open-outlook">${svg('mail')}Open in Outlook</button><button class="btn-bct secondary" data-action="shorter">Make it shorter</button></div>`); n.querySelector('.crm-actions').remove(); hydrateIcons(n); scrollBottom(); } break; }
    case 'remind': toast('Reminder set for Monday 09:00'); break;
    case 'home-draft-faisal': { thread.innerHTML=''; closeRecord(); startChat('Reply to Faisal'); activeChat='new'; renderHistory(); userMsg('Draft a reply to Faisal'); aiMsg(()=>replyDraft('faisal')); break; }
    case 'home-week': { thread.innerHTML=''; closeRecord(); startChat('This week'); activeChat='new'; renderHistory(); userMsg('Show my week'); aiMsg(replyWeek); break; }
    case 'open-outlook': toast('Would open the draft in Outlook'); break;
    case 'shorter': toast('Would ask the assistant for a shorter version'); break;
    case 'copy-draft': toast('Outline copied'); break;
    case 'lead-link': setLeadState('linked'); toast('Lead linked to AI document processing'); break;
    case 'lead-keep': setLeadState('kept'); break;
    case 'lead-undo': setLeadState('pending'); toast('Reverted'); break;
    case 'pin-snapshot': togglePin(); break;
    case 'log-save': setLogState('saved'); toast('4 updates saved to Data Lake modernisation'); break;
    case 'log-discard': setLogState('discarded'); break;
    case 'log-undo': setLogState('undone'); toast('Undone · 4 updates reverted'); break;
    case 'log-restore': setLogState('pending'); break;
    case 'log-edit': toast('Editing in place — not in this concept yet'); break;
    case 'close-review-panel': closeRecord(); break;
    case 'open-full-record': toast('Would open the classic record page'); break;
    case 'copy-message': toast('Reply copied'); break;
    case 'toggle-mic': { const on=a.getAttribute('aria-pressed')==='true'; a.setAttribute('aria-pressed',String(!on)); break; }
    case 'user-menu': e.stopPropagation(); toggleUserMenu(a); break;
    case 'toggle-source': toggleSource(a); break;
    case 'acct-help': closeUserMenu(); toast('Ask anything in plain words · Enter sends · Shift+Enter adds a line · Esc closes panels'); break;
    case 'acct-signout': closeUserMenu(); toast('Would sign you out through OneLogin'); break;
  }
});
document.addEventListener('keydown', e => {
  if(e.key==='Escape' && $('#pop-user').classList.contains('open')){ closeUserMenu(); $('.user-btn').focus(); return; }
  if(e.key==='Escape' && menuChatId){ const b=document.querySelector(`.hist-more[data-chat-id="${menuChatId}"]`); closeHistMenu(); if(b) b.focus(); return; }
  if(e.key==='Escape' && body.classList.contains('review-panel-open')) closeRecord();
});
addEventListener('resize', ()=>{ closeHistMenu(); closeUserMenu(); });
$('#side-scroll').addEventListener('scroll', closeHistMenu);

/* ---------- Sidebar width: drag the right edge (from Gina, 2026-10-28) ----------
   Double-click resets, arrow keys step 16px, Home resets. Remembered in this browser. Hidden on phones. */
const SIDEBAR_W={min:200,max:420,def:252};
function setSidebarWidth(w,save=true){
  w=Math.round(Math.min(SIDEBAR_W.max,Math.max(SIDEBAR_W.min,w)));
  document.documentElement.style.setProperty('--sidebar-w',w+'px');
  $('#sidebar-resizer').setAttribute('aria-valuenow',w);
  if(save){ try{ localStorage.setItem('bct-crm-sidebar-w',w); }catch(e){} }
  return w;
}
try{ const saved=+localStorage.getItem('bct-crm-sidebar-w'); if(saved) setSidebarWidth(saved,false); }catch(e){}
(()=>{
  const bar=$('#sidebar-resizer');
  bar.setAttribute('aria-valuemin',SIDEBAR_W.min); bar.setAttribute('aria-valuemax',SIDEBAR_W.max);
  // Chrome drops dblclick after a cancelled pointerdown, so a second press within 350 ms counts as the double-click.
  let lastUp=0;
  bar.addEventListener('pointerdown',e=>{
    if(window.matchMedia('(max-width: 640px)').matches) return;
    e.preventDefault();
    if(performance.now()-lastUp<350){ lastUp=0; setSidebarWidth(SIDEBAR_W.def); return; }
    bar.setPointerCapture(e.pointerId); body.classList.add('sidebar-resizing'); closeHistMenu(); closeUserMenu();
    const x0=e.clientX; let moved=false;
    const move=ev=>{ if(Math.abs(ev.clientX-x0)>2) moved=true; if(moved) setSidebarWidth(ev.clientX,false); };
    const up=ev=>{ bar.removeEventListener('pointermove',move); body.classList.remove('sidebar-resizing'); if(moved){ setSidebarWidth(ev.clientX); lastUp=0; } else lastUp=performance.now(); };
    bar.addEventListener('pointermove',move); bar.addEventListener('pointerup',up,{once:true}); bar.addEventListener('pointercancel',up,{once:true});
  });
  bar.addEventListener('keydown',e=>{
    const cur=parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sidebar-w'))||SIDEBAR_W.def;
    if(e.key==='ArrowLeft'){ e.preventDefault(); setSidebarWidth(cur-16); }
    if(e.key==='ArrowRight'){ e.preventDefault(); setSidebarWidth(cur+16); }
    if(e.key==='Home'){ e.preventDefault(); setSidebarWidth(SIDEBAR_W.def); }
  });
  // Other tabs and back/forward keep the same width.
  addEventListener('storage', e=>{ if(e.key==='bct-crm-sidebar-w' && +e.newValue) setSidebarWidth(+e.newValue,false); });
})();

/* ---------- Init ---------- */
greet(); renderHistory(); autosize(); updateSend(); renderHomePinned(true); renderTaskLists();
// Keep the pin in step with other tabs and back/forward navigation.
window.addEventListener('storage', e=>{ if(e.key===PIN_KEY){ syncPins(); renderHomePinned(false); } });
window.addEventListener('pageshow', e=>{ if(e.persisted){ syncPins(); renderHomePinned(false); } });
