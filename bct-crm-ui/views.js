/* Classic views ("Workspace" in the sidebar) — the fixed, browsable layer under the AI conversation.
   Pipeline (with new leads) · Accounts · Reports. Same fictional data as crm.js.
   2026-10-28 (option B): Leads moved into Pipeline as the "New leads" lane; Tasks moved to the home page (today)
   and into each deal or lead brief; Leadership dashboards left the sidebar (noted at the bottom of Reports). */

const LEADS = [
  { rec:'lead1', company:'Al Dhafra Facilities Management', contact:'Faisal Al-Mazrouei', interest:'Field service management for ~400 technicians', source:'Website · Services page', when:'Today 02:14', status:'new', owner:'Unassigned' },
  { rec:'lead2', company:'Qamar Energy', contact:'Khalid Al-Riyami', interest:'AI document processing pricing', source:'Website · Contact page', when:'Today 06:40', status:'match', owner:'Gaurav Shrotriya', note:'Matches ACC-0214' },
  { rec:null,   company:'Emirates Steel', contact:'Noura Al-Shamsi', interest:'SAP S/4 migration assessment', source:'Website · Services page', when:'6 Dec', status:'contacted', owner:'Gaurav Shrotriya', note:'Replied 6 Dec · call Thu' },
  { rec:'muscat', company:'Muscat Municipality', contact:'Said Al-Hinai', interest:'Citizen portal phase 2', source:'Referral', when:'20 Nov', status:'converted', owner:'Sundara Balaji', note:'→ OPP-1049' },
  { rec:null,   company:'Lulu Group', contact:'Anand Menon', interest:'Retail analytics', source:'Website · Contact page', when:'22 Nov', status:'disqualified', owner:'Gaurav Shrotriya', note:'Not a fit · consumer retail' }
];
const LEAD_STATUS = { new:['New','new'], match:['Matches account','match'], contacted:['Contacted','info'], converted:['Converted','ok'], disqualified:['Disqualified','off'] };

/* Accounts (option B, 2026-10-28): refined table. open/won in $M for the big numbers; bc = the run of
   two-way contact in the 60-day activity barcode; status = the one flag that matters now. */
const ACCOUNTS = [
  { rec:'contacts',     mono:'QE', bg:'linear-gradient(140deg,#052870,#0042B7)', name:'Qamar Energy', country:'Oman', industry:'Oil & gas', open:1.54, deals:3, won:'$640K', contacts:4, last:'Today · website lead', owner:'Gaurav Shrotriya', bc:[40,55], status:['ok','Active today'], next:'Prepare Field Ops demo · today 16:00' },
  { rec:'acc_gulf',     mono:'GH', bg:'linear-gradient(140deg,#0077b6,#00A0E4)', name:'Gulf Harbor Logistics', country:'UAE', industry:'Logistics', open:.54, deals:1, won:'—', contacts:2, last:'3 Dec · proposal v2 sent', owner:'Gaurav Shrotriya', bc:[38,44], status:['overdue','Closes Monday'], next:'Send revised pricing · overdue', attn:true },
  { rec:'acc_sahyadri', mono:'SB', bg:'linear-gradient(140deg,#10182a,#344258)', name:'Sahyadri Bank', country:'India', industry:'Banking', open:.28, deals:1, won:'$120K', contacts:3, last:'4 Dec · email', owner:'Gaurav Shrotriya', bc:[44,48], status:['muted','Call today 11:00'], next:'Call Rajesh about scope · 11:00' },
  { rec:'acc_muscat',   mono:'MM', bg:'linear-gradient(140deg,#3d63b8,#7aa5e8)', name:'Muscat Municipality', country:'Oman', industry:'Public sector', open:.19, deals:1, won:'$310K', contacts:5, last:'23 Nov · workshop', owner:'Sundara Balaji', bc:[22,28], status:['warn','Quiet 18 days'], next:'Quarterly review · 28 Dec', attn:true }
];

const TASKS_MORE = [
  { id:'w1', title:'Send phased proposal to Hana', meta:'Qamar Energy · Fri 18 Dec', src:'datalake', group:'week' },
  { id:'w2', title:'Prepare contract draft for Gulf Harbor', meta:'Gulf Harbor Logistics · Mon 14 Dec', src:'gulf', group:'week' },
  { id:'w3', title:'Reply to Noura (Emirates Steel) with assessment options', meta:'Emirates Steel · Fri 11 Dec', src:'steel', group:'week' },
  { id:'l1', title:'Quarterly review with Muscat Municipality', meta:'Muscat Municipality · 28 Dec', src:'muscat', group:'later' },
  { id:'l2', title:'Renewal check-in with Khalid (procurement)', meta:'Qamar Energy · 05 Jan', src:'contacts', group:'later' }
];


/* ---------- Shared bits ---------- */
const pill = (text, tone) => `<span class="pill ${tone}">${esc(text)}</span>`;
// The only AI entry on a page is "Ask about this page" in the header (page-ask.js).
function viewHead(title, sub){
  return `<div class="vw-head"><div><h1>${esc(title)}</h1><p>${sub}</p></div></div>`;
}
function openBtn(rec, label='Open'){ return rec ? `<button class="src" data-record="${rec}">${svg('link')}${esc(label)}</button>` : `<span class="muted-sm">—</span>`; }

/* Record IDs like ACC-0214 never break at the hyphen. */
function keepIds(t){ return t.replace(/\b([A-Z]{3,4}-\d{3,4})\b/g, '<span class="nb">$1</span>'); }
/* ---------- Pipeline (proposal B, 2026-10-28) ----------
   Isometric hero, kanban, and a deal assistant docked on the right. On this page the assistant
   replaces the bottom composer, and picking a card briefs you in the assistant instead of opening
   the record panel. To revert: restore the previous viewPipeline and drop the "pv-" CSS (section 12). */
const PV_CONTACT = { datalake:'hana', erp:'hana', gulf:'omar', sahyadri:'rajesh', kpo:'maryam', fieldops:'salim', muscat:'said' };
const PV_DRAFT = { datalake:['Follow-up — Data Lake','Draft a follow-up to Hana','followup'], gulf:['Pricing — Gulf Harbor','Draft the Gulf Harbor pricing email','gulf'], kpo:['Check-in — Khalid','Draft a check-in to Khalid','khalid'] };
const PV_DETAIL = {
  datalake:{ bc:[4,30], last:'Last touch 9 Nov · workshop', p:'Quiet for <b>32 days</b> after a good workshop. It is your biggest open deal and would cover the <b>$400K</b> Q4 gap on its own.', src:'Based on OPP-1042 · 9 emails · 3 meetings' },
  gulf:{ bc:[38,55], last:'Last touch 3 Dec · proposal v2', p:'Closes <b>Monday</b>. Finance pushed back on price on 27 Nov and Omar asked for a <b>phased licence</b>. Revised pricing is overdue by one day.', src:'Based on OPP-1031 · 14 emails · 2 meetings' },
  kpo:{ bc:[46,56], last:'Last touch today · website lead', p:'Khalid from procurement asked for pricing through the website this morning. It was linked to this deal instead of creating a <span class="nb">new lead.</span>', src:'Based on OPP-1066 · LEAD-0312 · 2 meetings' },
  fieldops:{ bc:[40,54], last:'Last touch 5 Dec · revised SOW', p:'The revised SOW is with procurement. The demo to field supervisors on <b>Thursday</b> is the next moment that can move it.', src:'Based on OPP-1017 · 11 emails · 3 meetings' }
};
let pvSel = null; // an opportunity id, or 'lead:<index in LEADS>'
/* New leads lane (2026-10-28): open website leads and referrals sit above the stages. */
const PV_LEADS = () => LEADS.map((l,i)=>[l,i]).filter(([l])=>['new','match','contacted'].includes(l.status));
const LEAD_FLAG = { new:['New company','new'], match:['Matches ACC-0214','match'], contacted:['Replied · call Thu','muted'] };
const LEAD_BRIEF = {
  lead1:{ p:'Asked about field service for <b>~400 technicians</b> through the Services page at 02:14. New company, no match in Accounts. Their budget round is in <b>January</b>, so a reply today keeps you early.', src:'Based on LEAD-0311 · website form', draft:['Draft a reply to Faisal','faisal'] },
  lead2:{ p:'Khalid from procurement asked for <b>AI document processing pricing</b>. Qamar Energy is already an account and this matches the deal opened on 8 Dec. Link it instead of creating a <span class="nb">second lead.</span>', src:'Based on LEAD-0312 · ACC-0214 · OPP-1066', link:true },
  steel:{ p:'Noura asked for an <b>SAP S/4 migration assessment</b>. You replied on 6 Dec and the call is on <b>Thursday</b>.', src:'Based on the website form · 2 emails' }
};
// Tasks tied to a record (deal or lead), from today's list and the rest of the week.
function tasksFor(src){ return [...TASKS, ...TASKS_MORE].filter(t=>t.src===src); }
function tasksBlock(src){
  const list=tasksFor(src); if(!list.length) return '';
  return `<div class="pv-tasks"><div class="pv-tasks-h">To do</div><div data-tasks="src:${src}">${list.map(taskLite).join('')}</div></div>`;
}
function pvLead(i){
  const l=LEADS[i], key=l.rec||'steel', b=LEAD_BRIEF[key];
  return `<button class="pv-back" data-pv="back">${svg('chevron-left')}Board summary</button>
    <div class="pv-deal-h">${esc(l.company)}</div><div class="pv-deal-m">${esc(l.contact)} · ${esc(l.source)} · ${esc(l.when)}</div>
    <p>${b.p}</p>
    ${tasksBlock(key)}
    <div class="crm-actions">${b.draft?`<button class="btn-bct" data-pv="lead-draft" data-k="${i}">${svg('mail')}Draft reply</button>`:''}${b.link?`<button class="btn-bct" data-pv="lead-link">${svg('check')}Link to OPP-1066</button>`:''}${l.rec?`<button class="btn-bct secondary" data-record="${l.rec}">Open record</button>`:''}</div>
    <div class="pv-src">${b.src}</div>`;
}
function pvBrief(sel){ return !sel ? pvSummary() : sel.startsWith('lead:') ? pvLead(+sel.slice(5)) : pvDeal(sel); }
function seeded(seed){ let s=seed; return () => (s = (s*16807) % 2147483647) / 2147483647; }
function barcodeSVG(seed, a, b, n=56){
  const r=seeded(seed); let x=0, out='';
  for(let i=0;i<n;i++){
    const h = i===n-1 ? 28 : 10 + Math.round(r()*14);
    const c = i===n-1 ? 'var(--bct-cyan)' : (i>=a && i<b ? 'var(--bct-midnight)' : '#cfd6e0');
    out += `<rect x="${x}" y="${28-h}" width="2" height="${h}" rx="1" fill="${c}"/>`; x+=4;
  }
  return `<svg class="pv-bc" viewBox="0 0 ${n*4} 28" preserveAspectRatio="none" aria-hidden="true">${out}</svg>`;
}
function pvSummary(){
  return `<p>Three things on this board need you:</p>
  <div class="pv-list">
    <button data-pick="gulf"><span><b>Gulf Harbor</b> · closes Monday, pricing open</span>${svg('chevron-right')}</button>
    <button data-pick="datalake"><span><b>Data Lake</b> · quiet for 32 days</span>${svg('chevron-right')}</button>
    <button data-pick="lead:0"><span><b>Al Dhafra</b> · new website lead, no reply yet</span>${svg('chevron-right')}</button>
  </div>
  <p class="pv-muted">Pick any card or lead and I'll brief you on it.</p>`;
}
function pvDeal(k){
  const r=RECORDS[k], d=PV_DETAIL[k];
  const last = d ? d.last : `Last touch ${r.activity[0][0]}`;
  const text = d ? d.p : `Nothing urgent here. Latest: ${esc(r.activity[0][1].toLowerCase())}. The next step is on track.`;
  const src = d ? d.src : `Based on ${r.ref} · ${r.activity.length} recent activities`;
  return `<button class="pv-back" data-pv="back">${svg('chevron-left')}Board summary</button>
    <div class="pv-deal-h">${esc(r.name)}</div><div class="pv-deal-m">${esc(r.account)} · ${STAGES[r.stage]} · ${r.amount} · ${r.stage===3?'closed':'close'} ${esc(r.close.replace('Closed ',''))}</div>
    <div class="pv-mini"><div class="pv-mini-l"><span class="tip-def" tabindex="0" data-tip="One line per day. Dark lines are days you and the client both wrote. Blue is today.">Last 60 days</span><span>${esc(last)}</span></div>${barcodeSVG(k.length*13+r.stage, d?d.bc[0]:20, d?d.bc[1]:30)}</div>
    <p>${text}</p>
    ${tasksBlock(k)}
    <div class="crm-actions">${PV_DRAFT[k]?`<button class="btn-bct" data-pv="draft" data-k="${k}">${svg('mail')}Draft follow-up</button>`:''}<button class="btn-bct secondary" data-pv="record" data-k="${k}">Open record</button></div>
    <div class="pv-src">${src}</div>`;
}
const PV_ANSWERS = {
  slipped: () => `<button class="pv-back" data-pv="back">${svg('chevron-left')}Board summary</button>
    <p><b>Two deals slipped</b> this month:</p>
    <div class="pv-list">
      <button data-pick="datalake"><span><b>Data Lake</b> · no activity since 9 Nov</span>${svg('chevron-right')}</button>
      <button data-pick="gulf"><span><b>Gulf Harbor</b> · pricing promised 10 Dec, not sent</span>${svg('chevron-right')}</button>
    </div><div class="pv-src">Based on 6 open opportunities · next-step dates</div>`,
  bytype: () => `<button class="pv-back" data-pv="back">${svg('chevron-left')}Board summary</button>
    <p>Open pipeline by deal type, <b>$2.55M</b> in total:</p>
    <div class="bars" role="img" aria-label="Services 880K, Services plus IP 820K, Resell plus Services 540K, KPO BPO 310K">
      <span class="k">Services</span><div class="b dark" style="width:100%"></div><span class="v">$880K</span>
      <span class="k">Services + IP</span><div class="b" style="width:93%"></div><span class="v">$820K</span>
      <span class="k">Resell + Svc</span><div class="b light" style="width:61%"></div><span class="v">$540K</span>
      <span class="k">KPO / BPO</span><div class="b" style="width:35%;background:#cfd6e0"></div><span class="v">$310K</span>
    </div>
    <div class="crm-actions"><button class="btn-bct secondary" data-view="reports">Open Reports</button></div>`
};
/* Pipeline filters (2026-10-28): owner (pick one) and deal type (tap to filter, tap again to clear).
   A deal matches a type when its type contains it ("Resell + Services" is under both). The leads lane is not filtered. */
const PV_OWNER = [['mine','My deals'],['all','All deals']];
const PV_TYPES = [['services','Services','Services'],['resell','Resell','Resell'],['ip','IP','IP'],['kpo','KPO / BPO','KPO']];
let pvOwner = 'mine', pvType = null;
const pvOpps = () => Object.keys(RECORDS).filter(k=>RECORDS[k].kind==='Opportunity');
function pvMatch(k, owner=pvOwner, type=pvType){
  const r=RECORDS[k], t=type && PV_TYPES.find(x=>x[0]===type);
  return (owner==='all' || (r.owner||'Gaurav Shrotriya')==='Gaurav Shrotriya') && (!t || r.type.includes(t[2]));
}
function pvChips(){
  return PV_OWNER.map(([k,label])=>`<button class="chip-f ${pvOwner===k?'active':''}" data-pv-filter="owner" data-k="${k}" aria-pressed="${pvOwner===k}">${label}<span class="chip-n">${pvOpps().filter(id=>pvMatch(id,k,pvType)).length}</span></button>`).join('')
    + '<span class="vw-sep"></span>'
    + PV_TYPES.map(([k,label])=>`<button class="chip-f ${pvType===k?'active':''}" data-pv-filter="type" data-k="${k}" aria-pressed="${pvType===k}">${label}<span class="chip-n">${pvOpps().filter(id=>pvMatch(id,pvOwner,k)).length}</span></button>`).join('');
}
function pvColsHTML(){
  return STAGES.map((st,i)=>{
    const ids = pvOpps().filter(k=>RECORDS[k].stage===i && pvMatch(k));
    const total = ids.reduce((n,k)=>n+parseInt(RECORDS[k].amount.replace(/[$K,]/g,'')),0);
    return `<div class="kb-col"><div class="kb-head"><span>${st}</span><small>${ids.length ? `${ids.length} · $${total>=1000?(total/1000).toFixed(2)+'M':total+'K'}` : '0'}</small></div>
      ${ids.length ? ids.map(k=>pvCardHTML(k,i)).join('') : '<div class="kb-empty">No deals</div>'}
    </div>`;
  }).join('');
}
function setPvFilter(kind, k){
  if(kind==='owner') pvOwner=k; else pvType = pvType===k ? null : k;
  const chips=$('#pv-chips'), kb=$('#pv-kb'); if(!chips || !kb) return;
  chips.innerHTML=pvChips(); kb.innerHTML=pvColsHTML(); hydrateIcons(kb);
  if(!REDUCED.matches) kb.querySelectorAll('.kb-card, .kb-empty').forEach((c,i)=>c.animate([{opacity:0,transform:'translateY(4px)'},{opacity:1,transform:'none'}],{duration:220,delay:Math.min(i,8)*35,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'}));
}
function pvCardHTML(k,i){
  const r=RECORDS[k], other = r.owner && r.owner!=='Gaurav Shrotriya';
  return `<button class="kb-card ${pvSel===k?'sel':''}" data-pick="${k}" aria-pressed="${pvSel===k}">
          <div class="cell-main">${esc(r.name)}</div>
          <div class="pv-who">${avatarHTML(PV_CONTACT[k],'pv-av')}<span>${esc(r.account)}</span></div>
          ${k==='datalake'?'<span class="flag warn">Quiet 32 days</span>':''}${k==='gulf'?'<span class="flag overdue">Closes Monday</span>':''}
          ${other?`<span class="pv-owner">${personHTML(r.owner)}</span>`:''}
          <div class="kb-foot"><span class="crm-amount">${r.amount}</span><span class="cell-sub">${i===3?'Closed':'Close'} ${esc(r.close.replace('Closed ',''))}</span></div>
        </button>`;
}
function viewPipeline(){
  const cols = pvColsHTML();
  const leads = PV_LEADS();
  const lane = `<div class="pv-leads"><div class="kb-head"><span>Leads</span><small>${leads.length} open · website and referrals</small></div>
    <div class="pv-leads-g">${leads.map(([l,i])=>{ const f=LEAD_FLAG[l.status], k='lead:'+i;
      return `<button class="kb-card ${pvSel===k?'sel':''}" data-pick="${k}" aria-pressed="${pvSel===k}">
        <div class="cell-main">${esc(l.company)}</div>
        <div class="cell-sub pv-lead-ask">${esc(l.interest)}</div>
        <span class="flag ${f[1]}">${esc(f[0])}</span>
        <div class="kb-foot"><span class="cell-sub">${esc(l.contact)}</span><span class="cell-sub">${esc(l.when)}</span></div>
      </button>`; }).join('')}</div></div>`;
  return `<div class="pv">
    <div class="pv-main">
      <section class="pv-hero">
        <img class="pv-art" src="assets/gen/hero-iso-simple.webp" alt="" aria-hidden="true">
        <div class="pv-hero-tx"><div class="eyebrow">My deals · Q4 2026</div>
          <h1>Your <span>pipeline</span>,<br>at a glance</h1>
          <p>6 open deals worth <b>$2.55M</b>, plus ${leads.length} leads. Pick a card and the assistant <span class="nb">briefs you.</span></p></div>
      </section>
      <div class="vw-filters" id="pv-chips" role="group" aria-label="Filter deals">${pvChips()}</div>
      ${lane}
      <div class="kanban pv-kb" id="pv-kb">${cols}</div>
    </div>
    <aside class="pv-side" aria-label="Deal assistant">
      <div class="pv-mascot"><div><div class="pv-hi">Hi Gaurav,</div><div class="pv-me">I'm your deal assistant</div><p>Watching 6 deals and ${leads.length} leads for you.</p></div>${AIFace.html('pv-orb')}</div>
      <div class="pv-asst">
        <div class="pv-body" id="pv-body" aria-live="polite">${pvBrief(pvSel)}</div>
        <div class="pv-sugg"><button data-pv="slipped">Which deals slipped?</button><button data-pv="bytype">Forecast by type</button></div>
      </div>
    </aside>
  </div>`;
}
/* The assistant's face thinks while it prepares a briefing, then looks back at you. */
function pvThink(ms=560){
  const face=document.querySelector('.pv-mascot .ai-face'); if(!face || face.classList.contains('happy')) return;
  const f=face.querySelector('.base');
  f.src='assets/ai/ai-face-think.webp'; face.classList.add('busy'); clearTimeout(pvThink._t);
  pvThink._t=setTimeout(()=>{ const g=document.querySelector('.pv-mascot .ai-face'); if(g){ g.querySelector('.base').src='assets/ai/ai-face.webp'; g.classList.remove('busy'); } }, ms);
}
function pvSwap(html){
  const body=$('#pv-body'); if(!body) return;
  pvThink();
  const go=()=>{ body.innerHTML=html; hydrateIcons(body); if(!REDUCED.matches) body.animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:260,easing:'cubic-bezier(.2,.7,.2,1)'}); };
  if(REDUCED.matches) return go();
  const a=body.animate([{opacity:0}],{duration:120,fill:'forwards'}); a.onfinish=()=>{ a.cancel(); go(); };
}
function pvPick(k){
  pvSel=k;
  document.querySelectorAll('.pv .kb-card').forEach(c=>{ const on=c.dataset.pick===k; c.classList.toggle('sel',on); c.setAttribute('aria-pressed',String(on)); });
  pvSwap(pvBrief(k));
}
function chatWith(title, text, build){
  if(window.PageAsk) PageAsk.leave();
  thread.innerHTML=''; closeRecord(); startChat(title); activeChat='new'; renderHistory();
  userMsg(text); aiMsg(build);
}
function pvEnter(el){
  if(REDUCED.matches) return;
  const ease='cubic-bezier(.2,.7,.2,1)';
  const art=el.querySelector('.pv-art'); if(art) art.animate([{opacity:0,transform:'translateX(16px)'},{opacity:1,transform:'none'}],{duration:700,easing:ease,fill:'backwards'});
  [...el.querySelectorAll('.pv-hero-tx, .pv-leads, .kb-col, .pv-mascot, .pv-asst')].forEach((n,i)=>n.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:320,delay:Math.min(i,8)*60,easing:ease,fill:'backwards'}));
}

/* ---------- Accounts (option B, 2026-10-28) ----------
   Reports-style header (light title, big numbers), an AI insight strip, and the table refined:
   company tile, main contact with avatar, big open value, 60-day activity barcode, the one flag and next step.
   Owner shows only when it isn't you. A row opens the record panel (people, deals, to do, activity).
   Proposals: docs/accounts-proposals.html. */
const ACC_FILTERS = [
  ['all','All', ()=>true], ['oman','Oman', a=>a.country==='Oman'], ['uae','UAE', a=>a.country==='UAE'], ['india','India', a=>a.country==='India'],
  ['attn','Needs attention', a=>!!a.attn]
];
let accFilter = 'all';
const accMono = (a, cls='acc-mono') => `<span class="${cls}" style="background:${a.bg}" aria-hidden="true">${a.mono}</span>`;
const accMoney = v => v>=1 ? rpNum('$',v,'M',2) : rpNum('$',Math.round(v*1000),'K',0);
function accChips(){
  return ACC_FILTERS.map(([k,label,f],i)=>`${i===4?'<span class="vw-sep"></span>':''}<button class="chip-f ${accFilter===k?'active':''}" data-acc-filter="${k}" aria-pressed="${accFilter===k}">${label}<span class="chip-n">${ACCOUNTS.filter(f).length}</span></button>`).join('');
}
// Emails and meetings in the last 60 days, for the barcode tooltip. Matches "Where your time went" in Reports.
const ACC_TOUCH = { contacts:111, acc_gulf:22, acc_sahyadri:16, acc_muscat:9 };
function accRows(){
  const f=ACC_FILTERS.find(x=>x[0]===accFilter)[2];
  return ACCOUNTS.filter(f).map(a=>{
    const main=RECORDS[a.rec].people[0];
    return `<tr data-record="${a.rec}" tabindex="0" aria-label="Open ${esc(a.name)}">
      <td><div class="acc-cell">${accMono(a)}<span><b>${esc(a.name)}${a.owner!=='Gaurav Shrotriya'?`<span class="acc-owner">${AVATAR_BY_NAME[a.owner]?avatarHTML(AVATAR_BY_NAME[a.owner],'who-av'):''}${esc(a.owner)}</span>`:''}</b><small>${esc(a.country)} · ${esc(a.industry)}</small></span></div></td>
      <td><div class="acc-cell">${avatarHTML(AVATAR_BY_NAME[main[1]]||main[0],'acc-av')}<span>${esc(main[1])}<small>${esc(main[2].replace(' · main contact',''))}</small></span></div></td>
      <td class="right">${accMoney(a.open)}<small class="acc-sub">${a.deals} deal${a.deals>1?'s':''} · won ${a.won}</small></td>
      <td class="acc-bc" data-tip-h="${esc(a.name)}" data-tip="${ACC_TOUCH[a.rec]||0} emails and meetings in 60 days · last ${esc(a.last)}">${barcodeSVG(a.rec.length*17+3, a.bc[0], a.bc[1], 60)}<small class="acc-sub">${esc(a.last)}</small></td>
      <td><span class="flag ${a.status[0]}">${esc(a.status[1])}</span><small class="acc-sub">${esc(a.next)}</small></td>
      <td class="right acc-go">${svg('chevron-right')}</td>
    </tr>`; }).join('');
}
function setAccFilter(k){
  accFilter=k;
  const chips=$('#acc-chips'), rows=$('#acc-rows'); if(!chips||!rows) return;
  chips.innerHTML=accChips(); rows.innerHTML=accRows(); hydrateIcons(rows);
  if(!REDUCED.matches) [...rows.rows].forEach((r,i)=>r.animate([{opacity:0,transform:'translateY(4px)'},{opacity:1,transform:'none'}],{duration:220,delay:i*40,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'}));
}
function viewAccounts(){
  return `<div class="acc">
    <div class="rp-head">
      <div><div class="eyebrow">My accounts · figures as of today 06:00</div><h1>Accounts</h1>
        <div class="rp-pills" id="acc-chips" role="group" aria-label="Filter accounts">${accChips()}</div></div>
      <div class="rp-side"><div class="rp-heads">
        <div class="rp-hd">${rpNum('$',2.55,'M',2)}<div class="rp-row"><span class="tip-def" tabindex="0" data-tip="All open deals across these accounts, including the ones Sundara owns.">Open pipeline</span></div></div>
        <div class="rp-hd">${rpNum('$',1.07,'M',2)}<div class="rp-row"><span class="tip-def" tabindex="0" data-tip="Signed deals across these accounts in 2026.">Won this year</span></div></div>
        <div class="rp-hd">${rpNum('',14,'',0)}<div class="rp-row"><span class="tip-def" tabindex="0" data-tip="People you deal with at these accounts.">Contacts</span></div></div>
      </div></div>
    </div>
    <div class="acc-ins"><img src="assets/ai/ai-face.webp" alt=""><p><b>2 accounts need you.</b> Gulf Harbor closes Monday with pricing still open, and Muscat Municipality has been quiet for <span class="nb">18 days.</span></p><button class="acc-ins-go" data-acc-filter="attn">Show them</button></div>
    <div class="acc-tbl"><table>
      <thead><tr><th>Account</th><th>Main contact</th><th class="right">Open</th><th><span class="tip-def" tabindex="0" data-tip="One line per day. Dark lines are days you and the client both wrote. Blue is today.">Last 60 days</span></th><th>Next</th><th><span class="sr-only">Open</span></th></tr></thead>
      <tbody id="acc-rows">${accRows()}</tbody>
    </table></div>
  </div>`;
}
function accEnter(el){
  el.querySelectorAll('[data-count]').forEach(n=>countUp(n,180));
  if(REDUCED.matches) return;
  const ease='cubic-bezier(.2,.7,.2,1)';
  [...el.querySelectorAll('.rp-head, .acc-ins, .acc-tbl tbody tr')].forEach((n,i)=>n.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:320,delay:Math.min(i,9)*60,easing:ease,fill:'backwards'}));
  el.querySelectorAll('.acc-bc rect').forEach((r,i)=>{ r.style.transformBox='fill-box'; r.style.transformOrigin='bottom'; r.animate([{transform:'scaleY(0)'},{transform:'none'}],{duration:420,delay:200+(i%60)*5,easing:ease,fill:'backwards'}); });
}

/* ---------- Tasks (no page since 2026-10-28) ----------
   Today's tasks are on the home page; the rest show inside the deal or lead they belong to. */
function taskLite(t){
  const d=!!done[t.id];
  return `<div class="task ${d?'done':''}" data-task="${t.id}"><button class="task-box" role="checkbox" aria-checked="${d}" aria-label="${esc(t.title)}">${svg('check')}</button>
    <div class="crm-row-main"><div class="crm-row-title">${esc(t.title)}</div><div class="crm-row-meta"><span>${esc(t.meta.split(' · ').slice(-1)[0])}</span>${t.overdue&&!d?'<span class="flag overdue">Overdue</span>':''}${t.isNew?'<span class="flag new">Added from chat</span>':''}</div></div></div>`;
}

/* ---------- Reports (proposal C layout, B colours, 2026-10-28) ----------
   Bento cards, one chart each. The header numbers are the Q4 snapshot; pinning it from here
   puts the same snapshot on the home page. To revert: restore the previous viewReports and drop the "rp-" CSS. */
function rpNum(pre, val, unit, dec){ return `<span class="rp-big"><span data-count="${val}" data-dec="${dec}" data-pre="${pre}" data-suf="">${pre}${val.toFixed(dec)}</span>${unit?`<sup>${unit}</sup>`:''}</span>`; }
function rpGauge(p){
  const L=Math.PI*100, end=Math.PI*(1-p), ex=120+100*Math.cos(end), ey=120-100*Math.sin(end);
  return `<svg class="rp-gauge" viewBox="0 0 240 132" role="img" aria-label="Forecast at ${Math.round(p*100)}% of target">
    <path d="M20 120 A100 100 0 0 1 220 120" fill="none" stroke="#e9edf4" stroke-width="14" stroke-linecap="round"/>
    <path class="rp-g-val" d="M20 120 A100 100 0 0 1 220 120" fill="none" stroke="var(--bct-ink)" stroke-width="14" stroke-linecap="round" stroke-dasharray="${L*p} ${L}"/>
    <circle class="rp-g-dot" cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="7" fill="var(--bct-cyan)" stroke="#fff" stroke-width="3"/></svg>`;
}
function rpActivity(){
  const r=seeded(42), n=60, start=Date.UTC(2026,9,13), EVENTS={27:'Workshop',51:'Proposal v2'};
  const days=[...Array(n)].map((_,i)=>{ const busy=(i>=23&&i<=28)||(i>=49&&i<=56); const h=Math.round((busy?55:18)+r()*(busy?45:30));
    return { h, m: i<n-1 && !!(EVENTS[i] || (busy && r()>.35)) }; });
  // Spread the 142 emails and 31 meetings by bar height, so the day tooltips add up to the card header.
  const spread=(idx,total)=>{ const sum=idx.reduce((t,i)=>t+days[i].h,0), raw=idx.map(i=>total*days[i].h/sum), out=raw.map(Math.floor);
    const left=total-out.reduce((a,b)=>a+b,0); raw.map((v,k)=>[v-out[k],k]).sort((a,b)=>b[0]-a[0]).slice(0,left).forEach(([,k])=>out[k]++);
    return Object.fromEntries(idx.map((i,k)=>[i,out[k]])); };
  const all=[...Array(n).keys()], emails=spread(all,142), meets=spread(all.filter(i=>days[i].m),31);
  const pl=(v,w)=>`${v} ${w}${v===1?'':'s'}`;
  return days.map((d,i)=>{
    const date=i===n-1?'Today':(d=>`${d.getUTCDate()} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getUTCMonth()]}`)(new Date(start+i*864e5));
    const tip=[meets[i]?pl(meets[i],'meeting'):'', pl(emails[i],'email')].filter(Boolean).join(' · ');
    return `<i class="${i===n-1?'t':(d.m?'m':'')}" style="height:${d.h}%" data-tip-h="${date}${EVENTS[i]?' · '+EVENTS[i]:''}" data-tip="${tip}"></i>`;
  }).join('');
}
/* "Pipeline by region" is added from a conversation (page-ask.js) and can be removed again. */
let rpRegion = false;
function rpRegionCard(){
  const reg=[['Oman',1.73,100,'68% · Qamar Energy, Muscat','var(--bct-ink)'],['UAE',.54,31,'21% · Gulf Harbor','var(--bct-deep)'],['India',.28,16,'11% · Sahyadri Bank','var(--bct-cyan)']];
  return `<section class="rp-card s12 rp-region" id="rp-region"><div class="rp-ct"><span>Open pipeline by region <span class="rp-muted">· added from a conversation</span></span><button class="rp-go" data-action="rp-region-remove" aria-label="Remove this card" title="Remove">${svg('x')}</button></div>
    <div class="rp-reg">${reg.map(r=>`<div><div class="rp-reg-k">${r[0]}</div>${rpNum('$',r[1]>=1?r[1]:Math.round(r[1]*1000),r[1]>=1?'M':'K',r[1]>=1?2:0)}<i style="--w:${r[2]}%;--c:${r[4]}"></i><div class="rp-muted">${r[3]}</div></div>`).join('')}</div></section>`;
}
/* Where the activity went (2026-10-28): share of the 173 emails and meetings vs share of open pipeline, per account.
   [rec, name, activity %, touches, pipeline %, last touch, under-served] */
const RP_ACT_ACC = [
  ['contacts','Qamar Energy',64,111,60,'Today',false],
  ['acc_gulf','Gulf Harbor Logistics',13,22,21,'3 Dec',true],
  ['acc_sahyadri','Sahyadri Bank',9,16,11,'4 Dec',false]
];
function rpActAcc(){
  return `<div class="rp-aa" role="table" aria-label="Activity and open pipeline by account">
    <div class="rp-aa-h" role="row"><span role="columnheader"><span class="tip-def" tabindex="0" data-tip="Your share of emails and meetings per account, next to its share of your open pipeline. Red means less time than the money suggests.">Where your time went</span></span><span role="columnheader">Activity</span><span role="columnheader">Pipeline</span><span role="columnheader">Last</span></div>
    ${RP_ACT_ACC.map(a=>`<button class="rp-aa-r${a[6]?' under':''}" role="row" data-record="${a[0]}" aria-label="${esc(a[1])}: ${a[2]}% of activity, ${a[4]}% of pipeline, last touch ${a[5]}">
      <span class="rp-aa-n" role="cell">${esc(a[1])}<i style="--w:${a[2]}%"></i></span><b role="cell">${a[2]}%</b><b role="cell">${a[4]}%</b><span role="cell">${a[5]}</span></button>`).join('')}
  </div>
  <p class="rp-muted rp-aa-f">Gulf Harbor holds 21% of your pipeline but got 13% of <span class="nb">your time.</span></p>`;
}
const RP_WL = [
  ['won','ERP renewal','Qamar Energy · 1 Oct','$640K'],
  ['won','Citizen portal phase 1','Muscat Municipality · 11 Nov','$310K'],
  ['won','Security review','Sahyadri Bank · 22 Nov','$120K'],
  ['lost','Fleet tracking app','Emirates Transport · lost on price','$280K'],
  ['lost','Data audit','Oman Air · lost on price','$150K']
];
function viewReports(){
  const pin = isPinned()
    ? `<span class="rp-pin on">${svg('pin')}Pinned to your home · refreshes 06:00<button data-action="pin-snapshot" aria-pressed="true">Unpin</button></span>`
    : `<button class="rp-pin" data-action="pin-snapshot" aria-pressed="false">${svg('pin')}Pin these numbers to home</button>`;
  return `<div class="rp">
    <div class="rp-head">
      <div><div class="eyebrow">Q4 2026 · figures as of today 06:00</div><h1>Reports</h1>
        <div class="rp-pills"><button class="chip-f active">Q4 2026</button><button class="chip-f active">Mine</button><button class="chip-f">ACAP</button></div></div>
      <div class="rp-side"><div class="rp-heads">
        <div class="rp-hd">${rpNum('$',2.55,'M',2)}<div class="rp-row"><span class="tip-def" tabindex="0" data-tip="All your open deals, at full value.">Open pipeline</span> <span class="rp-delta up tip-def" tabindex="0" data-tip="Up from $2.28M at the end of Q3.">+12%</span></div></div>
        <div class="rp-hd">${rpNum('$',1.10,'M',2)}<div class="rp-row"><span class="tip-def" tabindex="0" data-tip="Committed $540K plus best case $560K, closing by 31 Dec.">Q4 forecast</span> · 73% of target</div></div>
        <div class="rp-hd">${rpNum('$',1.07,'M',2)}<div class="rp-row"><span class="tip-def" tabindex="0" data-tip="Three deals signed since 12 Sep: ERP renewal, Citizen portal phase 1 and Security review.">Won, last 90 days</span></div></div>
        <div class="rp-hd">${rpNum('',2,'',0)}<div class="rp-row"><span class="tip-def" tabindex="0" data-tip="Website and referral leads since Monday: Al Dhafra and Qamar Energy.">New leads this week</span></div></div>
      </div>${pin}</div>
    </div>
    <div class="rp-bento">
      ${rpRegion?rpRegionCard():''}
      <section class="rp-card s4"><div class="rp-ct"><span class="tip-def" tabindex="0" data-tip="What is left to reach your Q4 target of $1.5M, after the forecast.">To target</span></div><div data-tip-h="$1.10M of $1.5M" data-tip="Forecast is at 73% of the Q4 target.">${rpGauge(.73)}</div>
        <div class="rp-g-num">${rpNum('$',400,'K',0)}<div>to go · target $1.5M</div></div>
        <div class="rp-trio"><span><span class="tip-def" tabindex="0" data-tip="Deals the client has agreed to, closing this quarter.">Committed</span><b>$540K</b></span><span><span class="tip-def" tabindex="0" data-tip="Deals likely to close this quarter that are not agreed yet.">Best case</span><b>$560K</b></span><span><span class="tip-def" tabindex="0" data-tip="Until the quarter closes on 31 Dec.">Weeks left</span><b>3</b></span></div></section>
      <section class="rp-card s4"><div class="rp-ct"><span class="tip-def" tabindex="0" data-tip="Your open pipeline split by how BCT delivers. A mixed deal counts under its main type.">Pipeline by deal type</span><button class="rp-go" data-view="pipeline" aria-label="Open the pipeline">${svg('arrow-ur')}</button></div>
        <div class="rp-segs" data-tip-cols role="img" aria-label="Services 35%, Services plus IP 32%, Resell 21%, KPO BPO 12%">
          <div style="flex:35" data-tip-h="Services" data-tip="$880K · 35% of open pipeline"><span>35%</span><i style="background:var(--bct-ink)"></i></div>
          <div style="flex:32" data-tip-h="Services + IP" data-tip="$820K · 32% of open pipeline"><span>32%</span><i style="background:var(--bct-deep)"></i></div>
          <div style="flex:21" data-tip-h="Resell" data-tip="$540K · 21% of open pipeline"><span>21%</span><i style="background:var(--bct-cyan)"></i></div>
          <div style="flex:12" data-tip-h="KPO / BPO" data-tip="$310K · 12% of open pipeline"><span>12%</span><i style="background:#cfd6e0"></i></div></div>
        <div class="rp-legend"><span style="--c:var(--bct-ink)">Services</span><span style="--c:var(--bct-deep)">Services + IP</span><span style="--c:var(--bct-cyan)">Resell</span><span style="--c:#cfd6e0">KPO / BPO</span></div></section>
      <section class="rp-card s4 rp-insight"><div class="rp-tag"><img src="assets/ai/ai-face.webp" alt="">Insight</div>
        <p><b>Proposal</b> holds 53% of your value, and two deals there have had no activity <span class="nb">this month.</span></p>
        <div class="crm-actions"><button class="btn-bct ink" data-view="pipeline">Show me</button></div></section>
      <section class="rp-card s8 rp-act"><div class="rp-ct"><span><span class="tip-def" tabindex="0" data-tip="Emails and meetings with your accounts, per day. Hover a bar to see the day.">Activity, last 60 days</span> <span class="rp-muted">· 142 emails · 31 meetings</span></span>
          <span class="rp-key" aria-hidden="true"><span class="m">Meeting days</span><span>Email</span><span class="t">Today</span></span></div>
        <div class="rp-act-g"><div>
          <div class="rp-bars" data-tip-cols role="img" aria-label="Activity per day over 60 days, with peaks around the 20 September workshop and the 14 October proposal">${rpActivity()}</div>
          <div class="rp-axis"><span>13 Oct</span><span>Workshop · 9 Nov</span><span>Proposal v2 · 3 Dec</span><span>Today</span></div></div>
          <div>${rpActAcc()}</div></div></section>
      <section class="rp-card s4"><div class="rp-ct"><span><span class="tip-def" tabindex="0" data-tip="Your deals that closed in the last 90 days, won or lost.">Won and lost</span> <span class="rp-muted">· last 90 days</span></span></div>
        <div class="rp-wl">${RP_WL.map(r=>`<div class="${r[0]}"><i aria-label="${r[0]==='won'?'Won':'Lost'}">${svg(r[0]==='won'?'check':'x')}</i><span>${esc(r[1])}<small>${esc(r[2])}</small></span><em>${r[3]}</em></div>`).join('')}</div>
        <p class="rp-muted" style="margin-top:10px">60% win rate. Both losses were on price.</p></section>
      <section class="rp-card s4 rp-person"><div class="rp-ct">Key contact this week<button class="rp-go" data-record="contacts" aria-label="Open Qamar Energy contacts">${svg('arrow-ur')}</button></div>
        <div class="rp-pc"><svg class="rp-ribbon" viewBox="0 0 320 170" preserveAspectRatio="none" aria-hidden="true"><path d="M-20 140 C 50 40, 110 170, 170 92 S 270 10, 340 70" fill="none" stroke-width="26" stroke-linecap="round"/></svg><img src="assets/people/hana-al-rashdi.webp" alt=""></div>
        <div class="rp-pc-meta"><b>Hana Al-Rashdi</b><span>Head of IT · Qamar Energy</span></div>
        <div class="rp-pc-row"><span>Decides on Data Lake · <span class="nb">3 meetings this quarter</span></span><div class="rp-pc-acts"><button data-rp="call" aria-label="Call Hana">${svg('phone')}</button><button data-rp="mail" aria-label="Email Hana">${svg('mail')}</button></div></div></section>
      <section class="rp-card s4"><div class="rp-ct">Closing this month</div>
        <div class="rp-chk">
          <button data-record="fieldops"><i class="done">${svg('check')}</i><span>Revised SOW to Qamar procurement<small>Field Ops mobile app · sent 5 Dec</small></span><em>$410K</em></button>
          <button data-record="gulf"><i></i><span>Send revised pricing to Omar Haddad<small>Gulf Harbor · overdue by 1 day</small></span><em>$540K</em></button>
          <button data-record="datalake"><i></i><span>Phased proposal to Hana<small>Data Lake · due Fri 18 Dec</small></span><em>$820K</em></button>
        </div></section>
      <section class="rp-card s4"><div class="rp-ct"><span class="tip-def" tabindex="0" data-tip="How long your open deals have sat in each stage so far.">Average days in stage</span></div>
        <div class="rp-gantt">
          <div>Discovery<b style="width:44%;background:#cfd6e0" data-tip-h="Discovery" data-tip="12 days on average · 2 open deals"></b><em>12 d</em></div>
          <div>Proposal<b style="width:100%;background:var(--bct-ink)" data-tip-h="Proposal" data-tip="27 days on average · 2 open deals · BCT average 19 days"></b><em>27 d</em></div>
          <div>Negotiation<b style="width:33%;background:var(--bct-cyan)" data-tip-h="Negotiation" data-tip="9 days on average · 1 open deal"></b><em>9 d</em></div></div>
        <p class="rp-muted" style="margin-top:14px">Proposal is where deals wait longest. BCT average is <span class="nb">19 days.</span></p></section>
    </div>
    <p class="vw-note">Leadership dashboards (cross-team, by practice and region) are planned for Phase 2.</p>
  </div>`;
}
function rpEnter(el){
  el.querySelectorAll('[data-count]').forEach(n=>countUp(n,180));
  if(REDUCED.matches) return;
  const ease='cubic-bezier(.2,.7,.2,1)';
  [...el.querySelectorAll('.rp-head, .rp-card')].forEach((n,i)=>n.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:320,delay:Math.min(i,9)*60,easing:ease,fill:'backwards'}));
  el.querySelectorAll('.rp-bars i').forEach((b,i)=>b.animate([{transform:'scaleY(0)'},{transform:'none'}],{duration:480,delay:250+i*10,easing:ease,fill:'backwards'}));
  el.querySelectorAll('.rp-segs i, .rp-gantt b').forEach((b,i)=>b.animate([{transform:'scaleX(0)'},{transform:'none'}],{duration:560,delay:300+i*80,easing:ease,fill:'backwards'}));
  el.querySelectorAll('.rp-waffle i.w').forEach((b,i)=>b.animate([{opacity:0},{opacity:1}],{duration:200,delay:300+i*12,fill:'backwards'}));
  const g=el.querySelector('.rp-g-val'); if(g){ const L=Math.PI*100; g.animate([{strokeDasharray:`0 ${L}`},{strokeDasharray:`${L*.73} ${L}`}],{duration:900,delay:250,easing:ease,fill:'backwards'}); el.querySelector('.rp-g-dot').animate([{opacity:0},{opacity:1}],{duration:200,delay:1100,fill:'backwards'}); }
}

/* ---------- Switching ---------- */
const VIEWS = {
  pipeline: { title:'Pipeline', render:viewPipeline, ph:'Ask about your deals and leads…', enter:pvEnter },
  accounts: { title:'Accounts', render:viewAccounts, ph:'Ask about an account…', enter:accEnter },
  reports:  { title:'Reports',  render:viewReports,  ph:'Ask for a different cut of these numbers…', enter:rpEnter }
};
let activeView = null;
function openView(key, opts={}){
  const v = VIEWS[key]; if(!v) return;
  if(window.PageAsk) PageAsk.leave();
  const from = activeView;
  activeView = key; closeRecord();
  body.classList.remove('chatting','mobile-nav-open'); body.classList.add('viewing');
  thread.innerHTML=''; activeChat=null; renderHistory(); setActiveView(key);
  $('#chat-head').hidden=false; $('#ch-title-text').textContent=v.title;
  body.dataset.page = key; // not data-view: that marks sidebar links
  if(key==='pipeline' && from!=='pipeline' && !opts.keep) pvSel=null;
  const el=$('#view'); el.innerHTML=v.render(); hydrateIcons(el); syncPins(); $('#scroll').scrollTop=0;
  input.placeholder=v.ph;
  if(v.enter) v.enter(el);
  el.querySelectorAll('.ai-face').forEach(f=>AIFace.mount(f));
}
window.openView = openView;

document.addEventListener('click', e => {
  /* Pipeline assistant */
  const pick = e.target.closest('[data-pick]'); if(pick){ pvPick(pick.dataset.pick); return; }
  const pv = e.target.closest('[data-pv]');
  if(pv){
    const a=pv.dataset.pv, k=pv.dataset.k;
    if(a==='back') pvPick(null);
    else if(a==='slipped'||a==='bytype'){ pvSel=null; document.querySelectorAll('.pv-kb .kb-card').forEach(c=>{c.classList.remove('sel');c.setAttribute('aria-pressed','false');}); pvSwap(PV_ANSWERS[a]()); }
    else if(a==='draft' && PV_DRAFT[k]){ const d=PV_DRAFT[k]; PageAsk.ask('pipeline', { say:[d[1], ()=>replyDraft(d[2])] }); }
    else if(a==='record') toast('Would open the full record page');
    else if(a==='lead-draft'){ const b=LEAD_BRIEF[LEADS[+k].rec]; PageAsk.ask('pipeline', { say:[b.draft[0], ()=>replyDraft(b.draft[1])] }); }
    else if(a==='lead-link'){ pv.disabled=true; pv.innerHTML=`${svg('check')}Linked`; toast('Lead linked to AI document processing', { label:'Undo', run:()=>{ if(pvSel==='lead:1') pvPick('lead:1'); } }); }
    return;
  }
  /* Reports */
  const rp = e.target.closest('[data-rp]');
  if(rp){
    const a=rp.dataset.rp;
    if(a==='ask'){ input.focus(); }
    else if(a==='quarter') runScenario('quarter');
    else if(a==='call') toast('Would call Hana through Teams');
    else if(a==='mail') toast('Would start an email to Hana in Outlook');
    return;
  }
  const ask = e.target.closest('[data-ask]');
  if(ask){ const k=ask.dataset.ask; if(k==='generic'){ input.value=ask.textContent; autosize(); updateSend(); input.focus(); } else { next(k); } return; }
  const af = e.target.closest('[data-acc-filter]'); if(af){ setAccFilter(af.dataset.accFilter); return; }
  const pf = e.target.closest('[data-pv-filter]'); if(pf){ setPvFilter(pf.dataset.pvFilter, pf.dataset.k); return; }
  const f = e.target.closest('.chip-f'); if(f){ toast('Filters are placeholders in this concept'); return; }
});

/* Pipeline's own input was removed (2026-10-28): questions open a conversation through page-ask.js. */
/* Accounts rows open the record with Enter or Space too. */
document.addEventListener('keydown', e => {
  const tr = e.target.closest && e.target.closest('.acc-tbl tr[data-record]');
  if(tr && (e.key==='Enter' || e.key===' ')){ e.preventDefault(); openRecord(tr.dataset.record); }
});
