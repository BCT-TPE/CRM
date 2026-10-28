/* Ask about this page (2026-10-28).
   Workspace pages (Pipeline, Accounts, Reports) have no composer. "Ask about this page" (chat header) and the page's own ask buttons open a NEW
   conversation that carries the page as context:
     - a context chip above the composer ("From Reports · Q4 2026 · Mine", removable)
     - "‹ Reports" in the chat header goes back to the page as you left it
     - answers that would change the page carry an Apply button; the page changes only when you press it (Undo in the toast)
   The conversation is listed in the sidebar under the page's icon and kept for this visit. A conversation you open
   and leave without asking anything is dropped. */
(() => {
  const PAGES = {
    pipeline: { name:'Pipeline', icon:'chart' },
    accounts: { name:'Accounts', icon:'users' },
    reports:  { name:'Reports',  icon:'list-box' }
  };
  let seq = 0, cur = null; // cur: the page conversation on screen

  /* ---------- What the page is showing right now ---------- */
  function context(page){
    if(page==='pipeline'){
      if(pvSel && pvSel.startsWith('lead:')) return ['Leads', LEADS[+pvSel.slice(5)].company];
      return ['My deals', pvSel ? RECORDS[pvSel].name : `6 open deals · ${PV_LEADS().length} leads`];
    }
    if(page==='accounts'){ const f=ACC_FILTERS.find(x=>x[0]===accFilter); return [f[1], `${ACCOUNTS.filter(f[2]).length} accounts`]; }
    return ['Q4 2026', 'Mine'];
  }
  const applyBtn = (id, label) => `<div class="crm-actions"><button class="btn-bct" data-apply="${id}">${svg('check')}${label}</button></div>`;

  /* ---------- Answers (scripted, same fictional data) ---------- */
  const Q = {
    // Leads
    'pa-leads-uncontacted': ['Which new leads need a reply?', () => ({
      ack:'Checking the leads against your sent mail.',
      sources:[['5 leads','inbox','CRM · leads','synced 2 min ago'],['Sent mail','mail','Outlook · last 30 days','synced 2 min ago']],
      html:`<p><b>2 leads</b> haven't heard from you yet. Both came in through the website <span class="nb">this morning.</span></p>
        <div class="crm-card"><div class="crm-group">${lrow('lead1','Al Dhafra Facilities Management · Faisal','New company · 02:14')}${lrow('lead2','Qamar Energy · Khalid','Matches ACC-0214 · 06:40')}</div></div>
        <p>Faisal is the one to answer first. Khalid's request is already linked to the AI document processing deal.</p>`,
      optionsLabel:'Next', options:[['Draft a reply to Faisal','draft-faisal'],['Add a task: call Faisal on Thursday','pa-tasks-add']] })],
    // Pipeline
    'pa-pv-slipped': ['Which deals slipped?', () => ({
      sources:[['6 open opportunities','briefcase','CRM · owned by you','synced 2 min ago']],
      html:`<p><b>Two deals slipped</b> this month. Together they are worth $1.36M.</p>
        <div class="crm-card"><div class="crm-group">${row('datalake','No activity since 20 Sep','Quiet 31 days')}${row('gulf','Pricing promised 26 Oct, not sent','Overdue')}</div></div>`,
      optionsLabel:'Next', options:[['Draft a follow-up to Hana','draft-hana'],['Draft the Gulf Harbor pricing email','draft-gulf']] })],
    'pa-pv-type': ['Forecast by deal type', () => ({
      html:`<p>Open pipeline by deal type, <b>$2.55M</b> in total. Services and Services + IP carry two thirds of it.</p>
        <div class="crm-card crm-chart"><div class="crm-chart-head"><span>Open pipeline by deal type</span></div>
        <div class="bars" role="img" aria-label="Services 880K, Services plus IP 820K, Resell plus Services 540K, KPO BPO 310K">
          <span class="k">Services</span><div class="b dark" style="width:100%"></div><span class="v">$880K</span>
          <span class="k">Services + IP</span><div class="b" style="width:93%"></div><span class="v">$820K</span>
          <span class="k">Resell + Svc</span><div class="b light" style="width:61%"></div><span class="v">$540K</span>
          <span class="k">KPO / BPO</span><div class="b" style="width:35%;background:#cfd6e0"></div><span class="v">$310K</span></div></div>`,
      optionsLabel:'Anything else?', options:[['Which deals slipped?','pa-pv-slipped']] })],
    // Accounts
    'pa-acc-quiet': ['Which accounts have gone quiet?', () => ({
      ack:'Checking the last activity on each account.',
      sources:[['5 accounts','users','CRM · owned by you','synced 2 min ago'],['Mail and meetings','mail','Outlook · Teams','synced 2 min ago']],
      html:`<p><b>2 accounts</b> have had no two-way contact for two weeks or more. At Qamar Energy, you haven't spoken to Khalid in procurement <span class="nb">since July.</span></p>
        <div class="crm-card"><div class="crm-group">
          ${arow('acc_gulf','Gulf Harbor Logistics','Proposal v2 sent 14 Oct · no reply')}
          ${arow('acc_muscat','Muscat Municipality','Workshop 10 Oct · no follow-up')}
          ${arow('contacts','Qamar Energy · Khalid Al-Riyami','Procurement · last call in July')}</div></div>`,
      optionsLabel:'Next', options:[['Draft the Gulf Harbor pricing email','draft-gulf'],['Draft a check-in to Khalid','draft-khalid']] })],
    // Tasks
    'pa-tasks-add': ['Add a task: call Faisal on Thursday', () => ({
      html:`<p>Here's the task. It goes on Faisal's lead, so you'll see it in the lead's brief and record.</p>
        <div class="crm-card"><div class="crm-change"><span class="lbl">Task</span><div><b>${esc(NEW_TASK.title)}</b><br><span class="muted">Due Thu 29 Oct · Owner: Sheldon Cooper · Linked to LEAD-0311</span></div></div></div>
        ${applyBtn('tasks-add',"Add to Faisal's lead")}`,
      optionsLabel:'Anything else?', options:[['Draft a reply to Faisal','draft-faisal']] })],
    // Reports
    'pa-rp-gap': ['Why are we behind target?', () => ({
      ack:'Looking at the forecast, commit and best case.',
      sources:[['Q4 forecast','gauge','CRM · commit and best case','synced 2 min ago'],['6 open opportunities','briefcase','CRM · owned by you','synced 2 min ago']],
      html:`<p>You're at <b>73% of target</b> with nine weeks to go, a gap of <b>$400K</b>. Two things explain most of it:</p>
        <div class="crm-card"><div class="crm-group">${row('datalake','Proposal · quiet for 31 days','Needs attention')}${row('gulf','Closes Monday · pricing still open','Overdue')}</div></div>
        <p>Data Lake alone would close the gap. Gulf Harbor is the one that can move <span class="nb">this week.</span></p>`,
      optionsLabel:'Next', options:[['Draft a follow-up to Hana','draft-hana'],['Add pipeline by region','pa-rp-region']] })],
    'pa-rp-region': ['Add pipeline by region', () => ({
      html:`<p>Here's your open pipeline by region. Oman carries two thirds of it, almost all from Qamar Energy.</p>
        <div class="crm-card crm-chart"><div class="crm-chart-head"><span>Open pipeline by region · Q4 2026</span></div>
        <div class="bars" role="img" aria-label="Oman 1.73M, UAE 540K, India 280K">
          <span class="k">Oman</span><div class="b dark" style="width:100%"></div><span class="v">$1.73M</span>
          <span class="k">UAE</span><div class="b" style="width:31%"></div><span class="v">$540K</span>
          <span class="k">India</span><div class="b light" style="width:16%"></div><span class="v">$280K</span></div></div>
        ${applyBtn('reports-region','Add to Reports')}`,
      optionsLabel:'Anything else?', options:[['Why are we behind target?','pa-rp-gap']] })]
  };
  const NEW_TASK = { id:'n1', title:'Call Faisal Al-Mazrouei about the field service demo', meta:'Al Dhafra Facilities Management · Thu 29 Oct', src:'lead1', group:'week', isNew:true };
  function lrow(rec, title, meta){ return `<div class="crm-row"><div class="crm-row-main"><div class="crm-row-title">${esc(title)}</div><div class="crm-row-meta"><span>${keepIds(esc(meta))}</span></div></div><div class="crm-row-side">${rec?srcChip(rec):''}</div></div>`; }
  function arow(rec, title, meta){ return `<div class="crm-row"><div class="crm-row-main"><div class="crm-row-title">${esc(title)}</div><div class="crm-row-meta"><span>${esc(meta)}</span></div></div><div class="crm-row-side">${srcChip(rec,'Open')}</div></div>`; }

  const STARTERS = {
    pipeline: ['Which deals slipped?', 'pa-pv-slipped', 'Which new leads need a reply?', 'pa-leads-uncontacted'],
    accounts: ['Which accounts have gone quiet?', 'pa-acc-quiet', 'Who are our contacts at Qamar?', 'contacts'],
    reports:  ['Why are we behind target?', 'pa-rp-gap', 'Add pipeline by region', 'pa-rp-region']
  };
  function intro(page){
    const p=PAGES[page], c=context(page), s=STARTERS[page];
    return () => ({
      html:`<p>I'm looking at <b>${p.name}</b> as you left it: ${esc(c.join(' · '))}. Ask me anything about it. When an answer should change the page, I'll add a button so you can <span class="nb">apply it.</span></p>`,
      optionsLabel:'Start with', options:[[s[0],s[1]],[s[2],s[3]]]
    });
  }

  /* ---------- Conversation bookkeeping ---------- */
  function setChrome(entry){
    if(entry){ body.dataset.from=entry.page; input.placeholder=VIEWS[entry.page].ph; $('#ch-back-label').textContent=PAGES[entry.page].name; $('#ch-back').setAttribute('aria-label',`Back to ${PAGES[entry.page].name}`); }
    else delete body.dataset.from;
    const row=$('#ctx-row');
    if(entry && entry.ctxOn){
      row.innerHTML=`<span class="ctx-chip">${svg(PAGES[entry.page].icon)}<span>From ${PAGES[entry.page].name} · ${esc(entry.ctx.join(' · '))}</span><button type="button" data-action="ctx-remove" aria-label="Don't use the page as context">${svg('x')}</button></span>`;
      hydrateIcons(row); row.hidden=false;
    } else { row.hidden=true; row.innerHTML=''; }
  }
  function leave(){
    if(!cur) return;
    if(!cur.used){ const i=CHATS.indexOf(cur); if(i>-1) CHATS.splice(i,1); }
    else cur.html=thread.innerHTML;
    cur=null; setChrome(null);
    input.placeholder='Ask about a deal, or tell me what happened…';
  }
  function ask(page, opts={}){
    const p=PAGES[page]; if(!p) return;
    leave(); closeRecord();
    const entry={ id:'pa'+(++seq), key:'page-'+seq, page, icon:p.icon, title:`About ${p.name}`, ctx:context(page), ctxOn:true, used:false, html:'' };
    CHATS.unshift(entry);
    thread.innerHTML=''; startChat(entry.title); activeChat=entry.key; cur=entry; renderHistory(); setChrome(entry);
    input.value=''; autosize(); updateSend();
    if(opts.say){ userMsg(opts.say[0]); aiMsg(opts.say[1]); }
    else if(opts.q && Q[opts.q]){ userMsg(Q[opts.q][0]); aiMsg(Q[opts.q][1]); }
    else if(opts.q){ next(opts.q); }
    else aiMsg(intro(page));
    if(opts.prefill){ input.value=opts.prefill; autosize(); updateSend(); }
    if(!opts.q && !opts.say) setTimeout(()=>input.focus({preventScroll:true}), 0);
  }
  function open(key){
    const entry=CHATS.find(c=>c.key===key && c.page); if(!entry) return false;
    if(cur===entry && body.classList.contains('chatting')) return true;
    leave(); closeRecord();
    thread.innerHTML=entry.html; startChat(entry.title); activeChat=entry.key; cur=entry; renderHistory(); setChrome(entry);
    scrollBottom(); return true;
  }
  // First question names the conversation: "Reports · Why are we behind target?"
  function onUser(text){
    if(!cur || cur.used) return;
    cur.used=true;
    if(text){ let t=text.length>40?text.slice(0,40)+'…':text; t=t[0].toUpperCase()+t.slice(1); cur.title=`${PAGES[cur.page].name} · ${t}`; $('#ch-title-text').textContent=cur.title; renderHistory(); }
  }
  // Typed questions inside a page conversation: page-specific answers first, then the usual routing.
  function reply(text){
    if(!cur) return null;
    const t=text.toLowerCase(), pg=cur.page;
    if(/lead/.test(t) && /repl|contact|answer|new|website/.test(t)) return Q['pa-leads-uncontacted'][1];
    if(/region|country|by market/.test(t)) return Q['pa-rp-region'][1];
    if(/behind|gap|target|why/.test(t) && pg==='reports') return Q['pa-rp-gap'][1];
    if(/add (a )?task|remind me|new task/.test(t)) return Q['pa-tasks-add'][1];
    if(/quiet|silent|gone cold/.test(t)) return pg==='accounts' ? Q['pa-acc-quiet'][1] : Q['pa-pv-slipped'][1];
    if(/slip|stuck|late/.test(t)) return Q['pa-pv-slipped'][1];
    if(/type|services|resell/.test(t)) return Q['pa-pv-type'][1];
    return null;
  }
  function nextKey(key){ if(!Q[key]) return false; userMsg(Q[key][0]); aiMsg(Q[key][1]); return true; }

  /* ---------- Apply to the page ---------- */
  function flash(el){
    if(!el) return;
    el.scrollIntoView({ block:'center', behavior: REDUCED.matches ? 'auto' : 'smooth' });
    el.classList.remove('pa-new'); void el.offsetWidth; el.classList.add('pa-new');
    setTimeout(()=>el.classList.remove('pa-new'), 2200);
  }
  function apply(btn){
    const id=btn.dataset.apply, page=cur?cur.page:null;
    btn.disabled=true; btn.innerHTML=`${svg('check')}Applied`; btn.classList.add('applied');
    if(id==='tasks-add'){
      // The task lands on Faisal's lead: Pipeline opens with that lead's brief, the new task outlined.
      if(!TASKS_MORE.includes(NEW_TASK)) TASKS_MORE.unshift(NEW_TASK);
      pvSel='lead:0'; openView('pipeline', { keep:true });
      setTimeout(()=>flash(document.querySelector('#pv-body [data-task="n1"]')), 60);
      toast("Added to Faisal's lead · Thu 29 Oct", { label:'Undo', run:()=>{ const i=TASKS_MORE.indexOf(NEW_TASK); if(i>-1) TASKS_MORE.splice(i,1); renderTaskLists(); } });
    } else if(id==='reports-region'){
      rpRegion=true; openView('reports'); flash($('#rp-region'));
      toast('Added “Pipeline by region” to Reports', { label:'Undo', run:removeRegion });
    }
  }
  function removeRegion(){ rpRegion=false; if(activeView==='reports' && body.classList.contains('viewing')) openView('reports'); }

  document.addEventListener('click', e => {
    const t=e.target;
    const ap=t.closest('[data-apply]'); if(ap){ if(!ap.disabled) apply(ap); return; }
    if(t.closest('#ch-ask')){ if(activeView) ask(activeView); return; }
    if(t.closest('#ch-back')){ const pg=body.dataset.from; if(pg) openView(pg); return; }
    if(t.closest('[data-action="ctx-remove"]')){ if(cur){ cur.ctxOn=false; setChrome(cur); input.focus(); } return; }
    if(t.closest('[data-action="rp-region-remove"]')){ removeRegion(); toast('Removed from Reports'); return; }
    // Ask buttons on the pages themselves ("Or just ask", Ask for a report, Ask me anything…)
    const pa=t.closest('[data-page-ask]'); if(pa){ e.stopPropagation(); ask(activeView, { q: pa.dataset.pageAsk || undefined }); return; }
  }, true);

  window.PageAsk = { ask, open, leave, onUser, reply, next: nextKey, isPage: key => !!CHATS.find(c=>c.key===key && c.page) };
})();
