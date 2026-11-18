/* Shared shell for the BCT CRM redesign pages: sidebar (old CRMpulse IA), tooltip, toast, formatting. */
(function () {
  const I = {
    trend: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    gauge: '<path d="M12 14l4-4"/><path d="M3.5 18a9 9 0 1 1 17 0"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".5"/>',
    message: '<path d="M4 5h16v11H8l-4 4z"/>',
    check: '<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    building: '<path d="M4 20V5l8-2v17M12 8h8v12M7 8h2M7 12h2M7 16h2M15 12h2M15 16h2M2 20h20"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    cart: '<path d="M4 4h2l2 11h11l2-8H7"/><circle cx="9" cy="19" r="1.3"/><circle cx="18" cy="19" r="1.3"/>',
    flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    report: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    tree: '<rect x="9" y="3" width="6" height="5" rx="1"/><rect x="3" y="16" width="6" height="5" rx="1"/><rect x="15" y="16" width="6" height="5" rx="1"/><path d="M12 8v4M6 16v-2h12v2"/>',
    bell: '<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    sliders: '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4-4"/>',
    chevdown: '<path d="M6 9l6 6 6-6"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/>',
    logout: '<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M10 16l-4-4 4-4M6 12h10"/>',
    stage: '<path d="M4 17l5-5 4 4 7-7"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    userplus: '<circle cx="10" cy="8" r="3.5"/><path d="M3.5 19c1-3.2 3.5-5 6.5-5s5.5 1.8 6.5 5M18 8v6M15 11h6"/>',
    panel: '<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><path d="M9.5 4.5v15"/>'
  };
  const icon = (n) => `<svg viewBox="0 0 24 24" aria-hidden="true">${I[n] || ''}</svg>`;

  // Old CRMpulse information architecture, kept 1:1. Only the five pages in this round are live.
  const NAV = [
    ['Dashboards', [['pipeline', 'Pipeline & forecast', 'trend'], ['performance', 'Sales performance', 'gauge']]],
    ['Sales', [['initiatives', 'Sales initiatives', 'target'], ['activities', 'Activities', 'message'], ['tasks', 'Tasks', 'check']]],
    ['Customers', [['accounts', 'Accounts', 'building', 1], ['contacts', 'Contacts', 'user', 1], ['orders', 'Customer orders', 'cart', 1]]],
    ['Plan & report', [['targets', 'Sales targets', 'flag', 1], ['reports', 'Reports', 'report', 1]]],
    ['Setup', [['structure', 'Sales structure', 'tree', 1]]]
  ];
  const BUILT = { pipeline: 'pipeline.html', performance: 'performance.html', initiatives: 'initiatives.html' };

  function renderShell(active) {
    const side = document.getElementById('side');
    if (!side) return;
    side.innerHTML = `
      <div class="side-top"><a class="brand" href="pipeline.html" aria-label="BCT CRM"><img src="assets/bct-logo.svg" alt="Bahwan CyberTek"><span>CRM</span></a>
        <button class="side-toggle" id="side-toggle" aria-label="Collapse sidebar" aria-expanded="true">${icon('panel')}</button></div>
      ${NAV.map(([label, items]) => `
        <nav class="nav-group" aria-label="${label}">
          <div class="nav-label">${label}</div>
          ${items.map(([id, name, ic, out]) => {
            const href = BUILT[id];
            const cls = 'nav-item' + (id === active ? ' active' : '') + (!href ? ' later' : '');
            const tip = out ? 'Not part of this redesign round' : 'Coming next in this redesign round';
            return href
              ? `<a class="${cls}" href="${href}" data-name="${name}" ${id === active ? 'aria-current="page"' : ''}>${icon(ic)}<span>${name}</span></a>`
              : `<span class="${cls}" aria-disabled="true" data-name="${name}" data-note="${tip}" data-tip="${tip}">${icon(ic)}<span>${name}</span></span>`;
          }).join('')}
        </nav>`).join('')}
      <div class="side-bottom">
        <button class="nav-item notes-btn" id="notes-btn" aria-haspopup="menu" aria-expanded="false" data-name="Notifications">${lucide('bell', 'i')}<span>Notifications</span><i class="udot" aria-label="Unread notifications"></i></button>
        <button class="user-btn" id="user-btn" aria-haspopup="menu" aria-expanded="false" aria-label="Account">
        <span class="avatar-w"><img class="avatar-img" src="assets/people/gaurav-shrotriya.webp" alt=""></span>
        <span class="user-name">Gaurav Shrotriya<small>Sales · ACAP</small></span>${lucide('chevron-down', 'chev')}</button></div>`;
    buildUserMenu();
    let collapsed = false;
    try { collapsed = localStorage.getItem('crm-side') === 'collapsed'; } catch (e) {}
    setCollapsed(collapsed);
    document.getElementById('side-toggle').addEventListener('click', () => setCollapsed(!document.body.classList.contains('side-collapsed'), true));
    if (document.querySelector('link[href*="responsive.css"]')) initResponsive(side);
  }

  // Responsive shell (2026-11-17), only on pages that load assets/responsive.css:
  // ≤1100 the sidebar shows as the icon rail (the saved preference comes back when the window is wider);
  // ≤768 it becomes a drawer opened from a top bar, closed by the scrim, Esc or picking a page.
  function initResponsive(side) {
    const main = document.querySelector('.main'); if (!main) return;
    const bar = document.createElement('div'); bar.className = 'm-bar';
    bar.innerHTML = `<button class="icon-btn" id="m-menu" aria-label="Open navigation" aria-expanded="false" aria-controls="side"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
      <a class="brand" href="pipeline.html" aria-label="BCT CRM"><img src="assets/bct-logo.svg" alt="Bahwan CyberTek"><span>CRM</span></a><span class="sp"></span>
      <img class="avatar-img" src="assets/people/gaurav-shrotriya.webp" alt="">`;
    main.before(bar); // outside <main>: some pages re-render main with innerHTML
    const scrim = document.createElement('div'); scrim.className = 'm-scrim'; document.body.appendChild(scrim);
    const btn = bar.querySelector('#m-menu');
    const setNav = (on) => {
      document.body.classList.toggle('nav-open', on);
      btn.setAttribute('aria-expanded', String(on)); btn.setAttribute('aria-label', on ? 'Close navigation' : 'Open navigation');
      if (on) side.querySelector('a.nav-item')?.focus();
    };
    btn.addEventListener('click', () => setNav(!document.body.classList.contains('nav-open')));
    scrim.addEventListener('click', () => { setNav(false); btn.focus(); });
    side.addEventListener('click', (e) => { if (e.target.closest('a')) setNav(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && document.body.classList.contains('nav-open')) { setNav(false); btn.focus(); } });
    const rail = matchMedia('(max-width: 1100px)'), drawer = matchMedia('(max-width: 768px)');
    const apply = () => {
      // the drawer always shows labels; the rail shows icons; wider windows get the saved preference back
      if (drawer.matches) setCollapsed(false);
      else if (rail.matches) setCollapsed(true);
      else { let c = false; try { c = localStorage.getItem('crm-side') === 'collapsed'; } catch (e) {} setCollapsed(c); }
      if (!drawer.matches) setNav(false);
    };
    rail.addEventListener('change', apply); drawer.addEventListener('change', apply); apply();
  }
  // Account menu: same content, layout and position as the BCT AI CRM prototype's profile menu.
  // Lucide icons, exactly as the prototype draws them (stroke 2, round caps).
  const LUCIDE = {
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/>',
    'file-text': '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5Z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h8"/><path d="M8 17h8"/><path d="M8 9h2"/>',
    sparkle: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 17l.7 1.8 1.8.7-1.8.7L19 22l-.7-1.8-1.8-.7 1.8-.7z"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>'
  };
  function lucide(n, cls = 'i') { return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${LUCIDE[n]}</svg>`; }
  const SRC = { outlook: ['Outlook mail', 'mail', true], teams: ['Teams calendar', 'calendar', true], files: ['SharePoint files', 'file-text', false], brief: ['Daily brief', 'sparkle', true] };
  // Notifications: their own sidebar item above the profile. Unread state is a blue dot (no number).
  const NOTES = [
    { id: 1, t: 'Lotus – ERP Upgrade moved to commercial negotiation', s: 'Vikram Iyer · 2 hours ago', unread: true },
    { id: 2, t: 'Task overdue: Credit check for Sundaram Healthcare', s: 'Assigned to Neha Gupta · yesterday', unread: true },
    { id: 3, t: 'Daniel Tan added you to Singapore – Identity & Access Management', s: '2 days ago', unread: true }
  ];
  let menu, notes;
  function makePop(id, label) {
    const el = document.createElement('div');
    el.className = 'pop-user'; el.id = id; el.setAttribute('role', 'menu'); el.setAttribute('aria-label', label); el.hidden = true;
    document.body.appendChild(el); return el;
  }
  function buildUserMenu() {
    menu = makePop('pop-user', 'Account');
    notes = makePop('pop-notes', 'Notifications'); notes.classList.add('pop-notes');
    paintMenu(); paintNotes();
    document.getElementById('user-btn').addEventListener('click', (e) => { e.stopPropagation(); openPop(menu.hidden ? menu : null, 'user-btn'); });
    document.getElementById('notes-btn').addEventListener('click', (e) => { e.stopPropagation(); openPop(notes.hidden ? notes : null, 'notes-btn'); });
    menu.addEventListener('click', (e) => {
      e.stopPropagation();
      const a = e.target.closest('[data-m]'); if (!a) return;
      const m = a.dataset.m;
      if (m === 'sw') { SRC[a.dataset.k][2] = !SRC[a.dataset.k][2]; paintMenu(); }
      else if (m === 'help') { openPop(null); toast('Esc closes panels · Tab moves between charts · Enter opens a row'); }
      else if (m === 'out') { openPop(null); toast('Would sign you out through OneLogin'); }
    });
    notes.addEventListener('click', (e) => {
      e.stopPropagation();
      const a = e.target.closest('[data-m]'); if (!a) return;
      const m = a.dataset.m;
      if (m === 'note') { const n = NOTES.find(x => x.id === +a.dataset.id); n.unread = false; paintNotes(); openPop(notes, 'notes-btn'); toast('Would open: ' + n.t); }
      else if (m === 'read') { NOTES.forEach(n => n.unread = false); paintNotes(); openPop(notes, 'notes-btn'); }
      else if (m === 'all') { openPop(null); toast('Would open all notifications'); }
    });
    document.addEventListener('click', () => openPop(null));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') openPop(null); });
  }
  function paintMenu() {
    const sw = (k) => { const [name, ic, on] = SRC[k]; const sub = k === 'brief' ? 'Weekdays at 06:00' : on ? 'Connected' : 'Not connected';
      return `<div class="menu-item menu-switch">${lucide(ic)}<span class="menu-switch-text"><b>${name}</b><small>${sub}</small></span><button class="switch" role="switch" aria-checked="${on}" aria-label="${name}" data-m="sw" data-k="${k}"><span></span></button></div>`; };
    menu.innerHTML = `
      <div class="acct-head"><img src="assets/people/gaurav-shrotriya.webp" alt=""><div><b>Gaurav Shrotriya</b><small>Sales · ACAP</small><small>Signed in with OneLogin</small></div></div>
      <div class="menu-sep"></div>
      <div class="menu-label">The assistant can read</div>
      ${sw('outlook')}${sw('teams')}${sw('files')}
      <div class="menu-sep"></div>
      ${sw('brief')}
      <button class="menu-item" role="menuitem" data-m="help">${lucide('info')}Help and shortcuts</button>
      <div class="menu-sep"></div>
      <button class="menu-item danger" role="menuitem" data-m="out">${lucide('logout')}Sign out</button>`;
  }
  // Same content as the old CRMpulse bell menu: title + Mark all read, the list (or "You're all caught up."), See all.
  function paintNotes() {
    const unread = NOTES.filter(n => n.unread).length;
    document.getElementById('notes-btn').classList.toggle('has-unread', unread > 0);
    const list = NOTES.filter(n => n.unread);
    notes.innerHTML = `
      <div class="notes-head"><b>Notifications</b><button class="acct-link" data-m="read" ${unread ? '' : 'disabled'}>Mark all read</button></div>
      <div class="menu-sep"></div>
      ${list.length ? list.map(n => `<button class="menu-item note-item" role="menuitem" data-m="note" data-id="${n.id}"><i class="udot" aria-label="Unread"></i><span class="menu-switch-text"><b>${n.t}</b><small>${n.s}</small></span></button>`).join('')
        : `<div class="notes-empty">You're all caught up.</div>`}
      <div class="menu-sep"></div>
      <div class="notes-foot"><button class="acct-link" data-m="all">See all →</button></div>`;
  }
  // Beside the button, bottom-aligned, kept inside the window (same rule as the prototype's toggleUserMenu).
  function openPop(pop, btnId) {
    [[menu, 'user-btn'], [notes, 'notes-btn']].forEach(([p, id]) => {
      const on = p === pop, b = document.getElementById(id);
      p.hidden = !on; b.classList.toggle('active', on); b.setAttribute('aria-expanded', String(on));
    });
    if (!pop) return;
    const r = document.getElementById(btnId).getBoundingClientRect(), w = pop.offsetWidth, h = pop.offsetHeight;
    pop.style.left = Math.max(12, Math.min(r.right + 16, innerWidth - w - 12)) + 'px';
    pop.style.top = Math.max(12, Math.min(r.bottom - h, innerHeight - h - 12)) + 'px';
    pop.style.bottom = 'auto';
  }

  // Collapsed rail: icons only; item names move into tooltips.
  function setCollapsed(on, save) {
    document.body.classList.toggle('side-collapsed', on);
    const t = document.getElementById('side-toggle');
    t.setAttribute('aria-expanded', String(!on));
    t.setAttribute('aria-label', on ? 'Expand sidebar' : 'Collapse sidebar');
    t.dataset.tip = on ? 'Expand sidebar' : 'Collapse sidebar';
    document.querySelectorAll('.nav-item').forEach(el => {
      if (on) el.dataset.tip = el.dataset.note ? `${el.dataset.name} · ${el.dataset.note}` : el.dataset.name;
      else if (el.dataset.note) el.dataset.tip = el.dataset.note; else delete el.dataset.tip;
    });
    if (save) { try { localStorage.setItem('crm-side', on ? 'collapsed' : 'open'); } catch (e) {} }
  }

  // Money: $7.07M · $543.9K · $0
  function money(v, opts = {}) {
    const a = Math.abs(v), s = v < 0 ? '−' : (opts.sign && v > 0 ? '+' : '');
    if (a >= 1e6) return `${s}$${(a / 1e6).toFixed(2)}M`;
    if (a >= 1e3) return `${s}$${(a / 1e3).toFixed(1)}K`;
    return `${s}$${Math.round(a)}`;
  }
  // Same, but unit as <sup> for big numbers
  function moneyBig(v) {
    const m = money(v); const unit = m.slice(-1);
    return /[MK]/.test(unit) ? `${m.slice(0, -1)}<sup>${unit}</sup>` : m;
  }

  // Tooltip: [data-tip] (plain), [data-tip-h] (bold first line), [data-tip-html] (rich)
  const tip = document.createElement('div');
  tip.className = 'tip'; tip.setAttribute('role', 'tooltip');
  let tipT = null, tipEl = null;
  function showTip(el) {
    const html = el.dataset.tipHtml || ((el.dataset.tipH ? `<b>${el.dataset.tipH}</b>` : '') + (el.dataset.tip || ''));
    if (!html) return;
    tip.innerHTML = html;
    if (!tip.isConnected) document.body.appendChild(tip);
    const r = el.getBoundingClientRect(), tw = tip.offsetWidth, th = tip.offsetHeight;
    let x = r.left + r.width / 2 - tw / 2;
    x = Math.max(8, Math.min(x, innerWidth - tw - 8));
    let y = r.top - th - 10, below = false;
    if (y < 8) { y = r.bottom + 10; below = true; }
    tip.style.left = x + 'px'; tip.style.top = y + 'px';
    tip.style.setProperty('--ax', (r.left + r.width / 2 - x) + 'px');
    tip.classList.toggle('below', below);
    tip.classList.add('on');
  }
  function hideTip() { clearTimeout(tipT); tipEl = null; tip.classList.remove('on'); }
  document.addEventListener('mouseover', (e) => {
    const el = e.target.closest('[data-tip],[data-tip-html]');
    if (el === tipEl) return;
    if (!el) { hideTip(); return; }
    const wasOpen = tip.classList.contains('on');
    tipEl = el; clearTimeout(tipT);
    if (wasOpen) showTip(el); else tipT = setTimeout(() => showTip(el), 300);
  });
  document.addEventListener('focusin', (e) => { const el = e.target.closest('[data-tip],[data-tip-html]'); if (el) { tipEl = el; showTip(el); } });
  document.addEventListener('focusout', hideTip);
  addEventListener('scroll', hideTip, true);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideTip(); });

  // Toast
  // Toast (Candace, 2026-11-18): white glass at the top centre with an icon by kind.
  // kind: 'ok' (done: saved, added, exported), 'warn' (needs attention), 'info' (default: what the prototype would do)
  const TOAST_IC = {
    ok: '<path d="M7.5 12.5l3 3 6-6.5"/>',
    warn: '<path d="M12 7v6M12 16.5h.01"/>',
    info: '<path d="M12 11v5M12 7.5h.01"/>'
  };
  let toastEl, toastT;
  function toast(msg, kind = 'info') {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    const k = TOAST_IC[kind] ? kind : 'info';
    toastEl.className = `toast t-${k}${toastEl.classList.contains('on') ? ' on' : ''}`; // a toast already showing swaps its text without fading out
    toastEl.innerHTML = `<i aria-hidden="true"><svg viewBox="0 0 24 24">${TOAST_IC[k]}</svg></i><span></span>`;
    toastEl.querySelector('span').textContent = msg;
    requestAnimationFrame(() => toastEl.classList.add('on'));
    clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('on'), 2600);
  }


  // Sticky filter bar hairline
  function watchSticky(el) {
    if (!el) return;
    // page name, shown at the start of the stuck bar when the sidebar is collapsed (CSS: .filters::before)
    const cur = document.querySelector('.nav-item[aria-current="page"]');
    el.dataset.page = cur ? cur.dataset.name : document.title.split(' · ')[0];
    const s = document.createElement('div'); s.style.height = '1px'; el.before(s);
    new IntersectionObserver(([en]) => el.classList.toggle('stuck', !en.isIntersecting)).observe(s);
  }

  // body.scrolled: lets sticky bars that pages re-render (the record back bar) pick up the glass background
  const onScroll = () => document.body.classList.toggle('scrolled', scrollY > 4);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Custom select: the native <select> stays as the data source (pages keep using .value / 'change'),
  // but is hidden and driven by a button + listbox styled like the filter popover.
  const selCheck = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  let selOpen = null;
  function closeSel() { if (!selOpen) return; selOpen.menu.hidden = true; selOpen.btn.setAttribute('aria-expanded', 'false'); selOpen.wrap.classList.remove('open'); selOpen = null; }
  function enhanceSelect(sel) {
    if (sel._enh) return; sel._enh = true;
    const wrap = sel.closest('.select'); if (!wrap) return;
    const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'sel-btn';
    btn.setAttribute('aria-haspopup', 'listbox'); btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', sel.getAttribute('aria-label') || '');
    const menu = document.createElement('div'); menu.className = 'pop sel-pop'; menu.setAttribute('role', 'listbox'); menu.hidden = true;
    sel.before(btn); wrap.appendChild(menu); sel.hidden = true; sel.tabIndex = -1;
    const sync = () => { const o = sel.options[sel.selectedIndex]; btn.textContent = o ? o.textContent : ''; };
    const build = () => {
      menu.innerHTML = [...sel.options].map((o, i) => `<button type="button" class="sel-opt${i === sel.selectedIndex ? ' on' : ''}" role="option" aria-selected="${i === sel.selectedIndex}" data-i="${i}"><span>${o.textContent}</span>${selCheck}</button>`).join('');
    };
    const desc = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');
    Object.defineProperty(sel, 'value', { get() { return desc.get.call(this); }, set(v) { desc.set.call(this, v); sync(); } });
    new MutationObserver(sync).observe(sel, { childList: true, subtree: true, attributes: true });
    sync();
    const open = () => { closeSel(); closeDate(); build(); menu.classList.remove('up'); menu.hidden = false; wrap.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); selOpen = { menu, btn, wrap };
      // no room below (window edge or a sticky bar at the bottom): open upward if there is more room there
      const bars = [...document.querySelectorAll('.ed-bar')].map(b => b.getBoundingClientRect().top).filter(t => t > 0);
      const floor = Math.min(innerHeight, ...bars) - 8, r = wrap.getBoundingClientRect(), mh = menu.offsetHeight;
      if (r.bottom + 6 + mh > floor && r.top - 6 - mh > 8) menu.classList.add('up');
      (menu.querySelector('.on') || menu.firstElementChild)?.focus(); };
    btn.addEventListener('click', (e) => { e.preventDefault(); if (selOpen && selOpen.menu === menu) closeSel(); else open(); });
    btn.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); open(); } });
    menu.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      const b = e.target.closest('.sel-opt'); if (!b) return;
      const i = +b.dataset.i; closeSel(); btn.focus();
      if (i !== sel.selectedIndex) { sel.selectedIndex = i; sync(); sel.dispatchEvent(new Event('change', { bubbles: true })); }
    });
    menu.addEventListener('keydown', (e) => {
      const items = [...menu.children], k = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); items[Math.min(k + 1, items.length - 1)]?.focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); items[Math.max(k - 1, 0)]?.focus(); }
      else if (e.key === 'Escape' || e.key === 'Tab') { closeSel(); if (e.key === 'Escape') btn.focus(); }
    });
  }
  document.addEventListener('click', (e) => { if (selOpen && !selOpen.wrap.contains(e.target)) closeSel(); });
  // Filter popovers (More filters) are placed by each page next to their button. When the filter row wraps
  // on smaller windows, keep an open one inside the window (2026-11-17).
  function keepPopsInView() {
    document.querySelectorAll('.filters .pop:not([hidden])').forEach((pop) => {
      pop.style.translate = '';
      const r = pop.getBoundingClientRect(), pad = 12;
      const dx = r.left < pad ? pad - r.left : (r.right > innerWidth - pad ? innerWidth - pad - r.right : 0);
      if (dx) pop.style.translate = `${Math.round(dx)}px 0`;
      // below the fold on a phone: bring the whole popover into view once
      if (r.bottom > innerHeight - pad && r.height < innerHeight - 2 * pad) scrollBy({ top: r.bottom - innerHeight + pad, behavior: 'instant' });
    });
  }
  // capture phase: pages stop propagation on their own buttons
  document.addEventListener('click', () => requestAnimationFrame(keepPopsInView), true);
  addEventListener('resize', keepPopsInView);

  // ---------- Dates (Candace, 2026-11-18) ----------
  // One format everywhere: "18 Nov 2026" ("18 Nov" without the year). Fixed month names, because en-GB in Chrome
  // writes September as "Sept". "YYYY-MM-DD" strings are read as local dates, so the day never shifts by time zone.
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const MON_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function toDate(d) {
    if (d instanceof Date) return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const m = typeof d === 'string' && d.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
    const x = new Date(d); return new Date(x.getFullYear(), x.getMonth(), x.getDate());
  }
  function fmtDate(d, year = true) { if (!d) return null; const x = toDate(d); if (isNaN(x)) return null; return `${x.getDate()} ${MON[x.getMonth()]}${year ? ' ' + x.getFullYear() : ''}`; }
  const isoDate = (x) => `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
  // the demo's "today" (TODAY in crm-data.js) when it is loaded, so Today and the shortcuts agree with overdue flags
  const today = () => toDate(typeof TODAY !== 'undefined' ? TODAY : new Date());

  // Date picker: every <input type="date"> becomes a field button + calendar popover in the select's style.
  // The input stays as the data source (pages keep reading .value and listening to input / change).
  // Shortcuts: expected close dates (data-f="close", or data-dt="quarter") get the fiscal quarter ends;
  // other dates (follow-ups, task due dates) get Tomorrow and Next week.
  const DT_IC = {
    cal: '<rect x="4" y="5.5" width="16" height="14" rx="3"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',
    prev: '<path d="M14.5 6l-6 6 6 6"/>', next: '<path d="M9.5 6l6 6-6 6"/>'
  };
  const svg = (p, c = '') => `<svg viewBox="0 0 24 24" aria-hidden="true" ${c ? `class="${c}"` : ''}>${p}</svg>`;
  let dtOpen = null;
  function closeDate(focus) { if (!dtOpen) return; const o = dtOpen; dtOpen = null; o.pop.hidden = true; o.wrap.classList.remove('open'); o.btn.setAttribute('aria-expanded', 'false'); if (focus) o.btn.focus(); }
  function quarterEnd(d, ahead) { const qm = d.getMonth() - (d.getMonth() % 3) + 3 * ahead; return new Date(d.getFullYear(), qm + 3, 0); }
  function shortcuts(inp) {
    const t = today(), add = (n) => new Date(t.getFullYear(), t.getMonth(), t.getDate() + n);
    if ((inp.dataset.dt || (inp.dataset.f === 'close' ? 'quarter' : '')) === 'quarter') {
      const q = (x, a) => typeof fyq === 'function' ? `Q${fyq(x).q}` : (a ? 'next quarter' : 'this quarter'); // fiscal quarter when crm-data.js is loaded
      return [0, 1].map(a => { const e = quarterEnd(t, a); return [`End of ${q(e, a)}`, e]; });
    }
    return [['Tomorrow', add(1)], ['Next week', add(7)]];
  }
  function enhanceDate(inp) {
    if (inp._enh) return; inp._enh = true;
    const label = inp.getAttribute('aria-label') || 'Date';
    const wrap = document.createElement('span'); wrap.className = 'dt';
    inp.before(wrap); wrap.appendChild(inp);
    const btn = document.createElement('button'); btn.type = 'button';
    btn.className = `${inp.className} dt-btn`.trim(); // looks like the field it stands in for
    if (inp.id) btn.dataset.for = inp.id;
    btn.setAttribute('aria-haspopup', 'dialog'); btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = `<span class="dt-v"></span>${svg(DT_IC.cal, 'dt-ic')}`;
    const pop = document.createElement('div'); pop.className = 'pop dt-pop'; pop.hidden = true;
    pop.setAttribute('role', 'dialog'); pop.setAttribute('aria-label', `Choose ${label.toLowerCase()}`);
    wrap.append(btn, pop); inp.hidden = true; inp.tabIndex = -1;
    const desc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
    const sync = () => { const v = desc.get.call(inp);
      btn.querySelector('.dt-v').textContent = v ? fmtDate(v) : (inp.getAttribute('placeholder') || 'Select a date');
      btn.classList.toggle('ph', !v); btn.disabled = inp.disabled; btn.setAttribute('aria-label', `${label}: ${v ? fmtDate(v) : 'not set'}`); };
    Object.defineProperty(inp, 'value', { get() { return desc.get.call(this); }, set(v) { desc.set.call(this, v); sync(); } });
    new MutationObserver(sync).observe(inp, { attributes: true, attributeFilter: ['disabled', 'placeholder'] });
    sync();
    let view, focusD; // first of the month on show; the day that has keyboard focus
    const commit = (iso) => { closeDate(true); if (iso === desc.get.call(inp)) return;
      desc.set.call(inp, iso); sync();
      inp.dispatchEvent(new Event('input', { bubbles: true })); inp.dispatchEvent(new Event('change', { bubbles: true })); };
    const build = () => {
      const sel = desc.get.call(inp), t = isoDate(today()), y = view.getFullYear(), m = view.getMonth();
      const start = new Date(y, m, 1 - new Date(y, m, 1).getDay());
      const days = Array.from({ length: 42 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
      pop.innerHTML = `<div class="dt-quick">${shortcuts(inp).map(([n, d]) => `<button type="button" data-d="${isoDate(d)}">${n}<small>${fmtDate(d, false)}</small></button>`).join('')}</div>
        <div class="dt-head"><b aria-live="polite">${MON_LONG[m]} ${y}</b><span class="dt-nav">
          <button type="button" data-m="-1" aria-label="Previous month">${svg(DT_IC.prev)}</button><button type="button" data-m="1" aria-label="Next month">${svg(DT_IC.next)}</button></span></div>
        <div class="dt-grid" role="grid">${['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(w => `<span class="wd" aria-hidden="true">${w}</span>`).join('')}
          ${days.map(d => { const iso = isoDate(d), cls = [d.getMonth() !== m && 'out', iso === t && 'today', iso === sel && 'on'].filter(Boolean).join(' ');
            return `<button type="button" class="${cls}" data-d="${iso}" tabindex="${iso === focusD ? 0 : -1}" aria-label="${fmtDate(d)}${iso === t ? ', today' : ''}" ${iso === sel ? 'aria-pressed="true"' : ''}>${d.getDate()}</button>`; }).join('')}</div>
        <div class="dt-foot"><button type="button" data-clear>Clear</button><button type="button" data-d="${t}">Today</button></div>`;
    };
    const show = (iso, focus) => { const d = toDate(iso); view = new Date(d.getFullYear(), d.getMonth(), 1); focusD = isoDate(d); build();
      if (focus) pop.querySelector(`.dt-grid [data-d="${focusD}"]`)?.focus(); };
    const open = () => {
      closeDate(); if (typeof closeSel === 'function') closeSel();
      show(desc.get.call(inp) || isoDate(today()), false);
      pop.hidden = false; pop.classList.remove('up'); pop.style.translate = ''; wrap.classList.add('open'); btn.setAttribute('aria-expanded', 'true');
      dtOpen = { pop, btn, wrap };
      // no room below (window edge or a sticky bar at the bottom): open upward; keep inside the window sideways
      const bars = [...document.querySelectorAll('.ed-bar')].map(b => b.getBoundingClientRect().top).filter(v => v > 0);
      const floor = Math.min(innerHeight, ...bars) - 8, r = wrap.getBoundingClientRect(), ph = pop.offsetHeight;
      if (r.bottom + 6 + ph > floor && r.top - 6 - ph > 8) pop.classList.add('up');
      const pr = pop.getBoundingClientRect(), pad = 12;
      if (pr.right > innerWidth - pad) pop.style.translate = `${Math.round(Math.max(pad - pr.left, innerWidth - pad - pr.right))}px 0`;
      if (pr.bottom > floor && !pop.classList.contains('up')) scrollBy({ top: pr.bottom - floor + pad, behavior: 'instant' }); // phone: bring the whole calendar into view
      pop.querySelector(`.dt-grid [data-d="${focusD}"]`)?.focus();
    };
    btn.addEventListener('click', (e) => { e.preventDefault(); if (dtOpen && dtOpen.pop === pop) closeDate(); else open(); });
    btn.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown') { e.preventDefault(); open(); } });
    pop.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.m) { view = new Date(view.getFullYear(), view.getMonth() + +b.dataset.m, 1); focusD = isoDate(view); build(); pop.querySelector(`[data-m="${b.dataset.m}"]`).focus(); }
      else if ('clear' in b.dataset) commit('');
      else if (b.dataset.d) commit(b.dataset.d);
    });
    pop.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closeDate(true); return; }
      const cell = e.target.closest('.dt-grid [data-d]'); if (!cell) return;
      const d = toDate(cell.dataset.d), step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
      if (step) { e.preventDefault(); show(isoDate(new Date(d.getFullYear(), d.getMonth(), d.getDate() + step)), true); }
      else if (e.key === 'PageUp' || e.key === 'PageDown') { e.preventDefault(); show(isoDate(new Date(d.getFullYear(), d.getMonth() + (e.key === 'PageUp' ? -1 : 1), Math.min(d.getDate(), 28))), true); }
    });
  }
  document.addEventListener('click', (e) => { if (dtOpen && !dtOpen.wrap.contains(e.target)) closeDate(); });
  function enhanceDates(root) { (root || document).querySelectorAll('input[type="date"]').forEach(enhanceDate); }
  // pages call this after each render; it also turns date inputs into the date picker
  function enhanceSelects(root) { (root || document).querySelectorAll('.select select').forEach(enhanceSelect); enhanceDates(root); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => enhanceSelects()); else setTimeout(enhanceSelects);

  // Owner avatar: initials on a blue-family tint, fixed per person (styles .av / .av-a…e in theme-v2.css)
  function avatar(name) {
    const ini = name.split(/\s+/).map(s => s[0]).slice(0, 2).join('');
    let h = 0; for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    return `<span class="av av-${'abcde'[h % 5]}" aria-hidden="true">${ini}</span>`;
  }

  // Confirm dialog (Candace, 2026-11-18). CRM.confirm({ title, body, actions: [{ label, value, kind }] }) resolves to the
  // chosen action's value, or null when closed with Esc or a click outside. kind: 'primary' (focused first), 'quiet'
  // (red text, sits on the left: the destructive choice). Styles: .dlg in crm.css.
  function confirmDlg({ title, body = '', actions }) {
    return new Promise((resolve) => {
      const prev = document.activeElement;
      const wrap = document.createElement('div'); wrap.className = 'dlg-scrim';
      wrap.innerHTML = `<div class="dlg" role="alertdialog" aria-modal="true" aria-labelledby="dlg-t" aria-describedby="dlg-b">
        <h2 id="dlg-t">${title}</h2><div class="dlg-b" id="dlg-b">${body}</div>
        <div class="dlg-acts">${actions.map((a, i) => `<button type="button" class="btn ${a.kind || ''}" data-i="${i}">${a.label}</button>`).join('')}</div></div>`;
      document.body.appendChild(wrap); document.body.classList.add('dlg-open');
      const btns = [...wrap.querySelectorAll('button')];
      const key = (e) => {
        if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); done(null); }
        else if (e.key === 'Tab') { // keep focus inside the dialog
          const i = btns.indexOf(document.activeElement), n = btns.length;
          e.preventDefault(); btns[((i < 0 ? 0 : i) + (e.shiftKey ? n - 1 : 1)) % n].focus();
        }
      };
      function done(v) { document.removeEventListener('keydown', key, true); wrap.remove(); document.body.classList.remove('dlg-open'); if (prev && prev.focus) prev.focus(); resolve(v); }
      wrap.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) done(actions[+b.dataset.i].value); else if (e.target === wrap) done(null); });
      document.addEventListener('keydown', key, true);
      requestAnimationFrame(() => wrap.classList.add('on'));
      (btns.find(b => b.classList.contains('primary')) || btns[btns.length - 1]).focus();
    });
  }

  // Unsaved changes (2026-11-18). CRM.guardLeave(isDirty, ask): while isDirty() is true, links that leave the page
  // (back link, Cancel link, sidebar, logo) call ask(url) instead of navigating; closing or reloading the tab gets the
  // browser's own "Leave site?" prompt. CRM.leave(url) navigates without asking again.
  let leaving = false;
  function guardLeave(isDirty, ask) {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a || e.button || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
      const href = a.getAttribute('href'); if (!href || href[0] === '#' || !isDirty()) return;
      e.preventDefault(); e.stopPropagation(); document.body.classList.remove('nav-open'); ask(a.href);
    }, true); // capture: runs before the page's own handlers
    addEventListener('beforeunload', (e) => { if (!leaving && isDirty()) { e.preventDefault(); e.returnValue = ''; } });
  }
  function leave(url) { leaving = true; location.href = url; }

  window.CRM = { icon, renderShell, money, moneyBig, toast, watchSticky, enhanceSelects, avatar, confirm: confirmDlg, guardLeave, leave, date: fmtDate, enhanceDates };
})();
