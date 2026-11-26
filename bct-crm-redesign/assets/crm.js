/* Shared shell for the BCT CRM redesign pages: sidebar (old CRMpulse IA), tooltip, toast, formatting. */
(function () {
  const I = {
    home: '<path d="M4 11l8-7 8 7"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/>',
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
    check: '<path d="M20 6 9 17l-5-5"/>',
    logout: '<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M10 16l-4-4 4-4M6 12h10"/>',
    stage: '<path d="M4 17l5-5 4 4 7-7"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    userplus: '<circle cx="10" cy="8" r="3.5"/><path d="M3.5 19c1-3.2 3.5-5 6.5-5s5.5 1.8 6.5 5M18 8v6M15 11h6"/>',
    settings: '<path d="M12.2 2h-.4a2 2 0 0 0-2 2v.2a2 2 0 0 1-1 1.7l-.4.3a2 2 0 0 1-2 0l-.2-.1a2 2 0 0 0-2.7.7l-.2.4a2 2 0 0 0 .7 2.7l.2.1a2 2 0 0 1 1 1.7v.6a2 2 0 0 1-1 1.7l-.2.1a2 2 0 0 0-.7 2.7l.2.4a2 2 0 0 0 2.7.7l.2-.1a2 2 0 0 1 2 0l.4.3a2 2 0 0 1 1 1.7v.2a2 2 0 0 0 2 2h.4a2 2 0 0 0 2-2v-.2a2 2 0 0 1 1-1.7l.4-.3a2 2 0 0 1 2 0l.2.1a2 2 0 0 0 2.7-.7l.2-.4a2 2 0 0 0-.7-2.7l-.2-.1a2 2 0 0 1-1-1.7v-.6a2 2 0 0 1 1-1.7l.2-.1a2 2 0 0 0 .7-2.7l-.2-.4a2 2 0 0 0-2.7-.7l-.2.1a2 2 0 0 1-2 0l-.4-.3a2 2 0 0 1-1-1.7V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 19c.9-3.2 3.4-5 6.5-5s5.6 1.8 6.5 5M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.3c1.7.7 2.9 2.3 3.5 4.7"/>',
    panel: '<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><path d="M9.5 4.5v15"/>'
  };
  const icon = (n) => `<svg viewBox="0 0 24 24" aria-hidden="true">${I[n] || ''}</svg>`;

  // Old CRMpulse information architecture, plus Home (2026-11-24). An entry with roles shows only to those roles:
  // Administration / Users = ADMIN (old menu-config); Customer orders, Sales targets, Sales structure follow the
  // requirement's Home designs per role (a salesperson sees neither; a manager sees orders and targets).
  const MGR_UP = ['SALES_MANAGER', 'SALES_HEAD', 'ADMIN'], HEAD_UP = ['SALES_HEAD', 'ADMIN'];
  const NAV = [
    ['Dashboards', [['home', 'Home', 'home'], ['pipeline', 'Pipeline & forecast', 'trend'], ['performance', 'Sales performance', 'gauge']]],
    ['Sales', [['initiatives', 'Sales initiatives', 'target'], ['activities', 'Activities', 'message'], ['tasks', 'Tasks', 'check']]],
    ['Customers', [['accounts', 'Accounts', 'building', 1], ['contacts', 'Contacts', 'user', 1], ['orders', 'Customer orders', 'cart', 1, MGR_UP]]],
    ['Plan & report', [['targets', 'Sales targets', 'flag', 1, MGR_UP], ['reports', 'Reports', 'report', 1]]],
    ['Setup', [['structure', 'Sales structure', 'tree', 1, HEAD_UP], ['admin', 'Administration', 'settings', 1, ['ADMIN']], ['users', 'Users', 'users', 1, ['ADMIN']]]]
  ];
  const BUILT = { home: 'home.html', pipeline: 'pipeline.html', performance: 'performance.html', initiatives: 'initiatives.html', activities: 'activities.html', tasks: 'tasks.html',
    accounts: 'accounts.html', contacts: 'contacts.html', orders: 'orders.html', targets: 'targets.html', reports: 'reports.html', structure: 'structure.html' };

  // Old CRMpulse TaskBadge: my open tasks beside Tasks (the overdue count is in its label); nothing when none are open.
  function taskBadge() {
    if (typeof TASKS === 'undefined' || typeof ME === 'undefined') return '';
    const mine = TASKS.filter(t => t.to === ME && taskOpen(t));
    if (!mine.length) return '';
    const late = mine.filter(taskLate).length;
    return `<b class="nav-n" aria-label="${mine.length} open, ${late} overdue">${mine.length}</b>`;
  }
  // Old CRMpulse profile: name · role (ROLE_LABELS); the profile menu shows name, role, email, View as, Sign out (design review M2).
  // The demo user is always Gaurav; his role is picked in the profile menu ("View as") and kept in localStorage
  // for every page: it changes Home, the menu entries above and the Activities default (Everyone / My teams / Mine).
  const ROLE_LABELS = { SALESPERSON: 'Salesperson', SALES_MANAGER: 'Sales Manager', SALES_HEAD: 'Sales Head', ADMIN: 'Administrator' };
  // Gaurav is a Sales Head (2026-11-24, was Administrator). "View as" switches role on every page (2026-11-25) and the
  // choice is kept for every page (localStorage crm-home-role). Administrator stays disabled: the requirement's three
  // examples cover Salesperson, Sales Manager and Sales Head only.
  const ROLES_ON = ['SALESPERSON', 'SALES_MANAGER', 'SALES_HEAD'];
  let roleCode = 'SALES_HEAD';
  try { const r = localStorage.getItem('crm-home-role'); if (ROLES_ON.includes(r)) roleCode = r; } catch (e) {}
  const USER = { name: 'Gaurav Shrotriya', code: roleCode, role: ROLE_LABELS[roleCode], team: 'APAC Sales', email: 'gaurav.shrotriya@example.com' };
  USER.sub = roleCode === 'SALES_MANAGER' ? `${USER.role} · ${USER.team}` : USER.role;

  function renderShell(active) {
    const side = document.getElementById('side');
    if (!side) return;
    side.innerHTML = `
      <div class="side-top"><a class="brand" href="home.html" aria-label="BCT CRM"><img src="assets/bct-logo.svg" alt="Bahwan CyberTek"><span>CRM</span></a>
        <button class="side-toggle" id="side-toggle" aria-label="Collapse sidebar" aria-expanded="true">${icon('panel')}</button></div>
      ${NAV.map(([label, all]) => [label, all.filter(([, , , , roles]) => !roles || roles.includes(USER.code))]).filter(([, items]) => items.length).map(([label, items]) => `
        <nav class="nav-group" aria-label="${label}">
          <div class="nav-label">${label}</div>
          ${items.map(([id, name, ic, out]) => {
            const href = BUILT[id];
            const cls = 'nav-item' + (id === active ? ' active' : '') + (!href ? ' later' : '');
            const tip = out ? 'Not part of this redesign round' : 'Coming next in this redesign round';
            return href
              ? `<a class="${cls}" href="${href}" data-name="${name}" ${id === active ? 'aria-current="page"' : ''}>${icon(ic)}<span>${name}</span>${id === 'tasks' ? taskBadge() : ''}</a>`
              : `<span class="${cls}" aria-disabled="true" data-name="${name}" data-note="${tip}" data-tip="${tip}">${icon(ic)}<span>${name}</span></span>`;
          }).join('')}
        </nav>`).join('')}
      <div class="side-bottom">
        <button class="nav-item notes-btn" id="notes-btn" aria-haspopup="menu" aria-expanded="false" data-name="Notifications">${lucide('bell', 'i')}<span>Notifications</span><i class="udot" aria-label="Unread notifications"></i></button>
        <button class="user-btn" id="user-btn" aria-haspopup="menu" aria-expanded="false" aria-label="Account">
        <span class="avatar-w"><img class="avatar-img" src="assets/people/gaurav-shrotriya.webp" alt=""></span>
        <span class="user-name">${USER.name}<small>${USER.sub}</small></span>${lucide('chevron-down', 'chev')}</button></div>`;
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
      <a class="brand" href="home.html" aria-label="BCT CRM"><img src="assets/bct-logo.svg" alt="Bahwan CyberTek"><span>CRM</span></a><span class="sp"></span>
      <button class="m-user" id="m-user" aria-haspopup="menu" aria-expanded="false" aria-label="Account"><img class="avatar-img" src="assets/people/gaurav-shrotriya.webp" alt=""></button>`;
    main.before(bar); // outside <main>: some pages re-render main with innerHTML
    // design review M8: once the page heading scrolls under the top bar, the logo fades and the page name shows
    { const cur = side.querySelector('.nav-item[aria-current="page"]'), t = document.createElement('span');
      t.className = 'm-title'; t.setAttribute('aria-hidden', 'true'); t.textContent = cur ? cur.dataset.name : document.title.split(' · ')[0];
      bar.querySelector('.brand').after(t);
      const h = document.querySelector('.main h1');
      if (h && 'IntersectionObserver' in window) new IntersectionObserver(([e]) => bar.classList.toggle('titled', !e.isIntersecting && e.boundingClientRect.top < 56), { rootMargin: '-56px 0px 0px 0px' }).observe(h); }
    bar.querySelector('#m-user').addEventListener('click', (e) => { e.stopPropagation(); openPop(menu.hidden ? menu : null, 'm-user'); }); // design review M2
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
    // other open tabs of the CRM follow a collapse / expand made here
    addEventListener('storage', (e) => { if (e.key === 'crm-side') apply(); });
    addEventListener('storage', (e) => { if (e.key === 'crm-home-role') location.reload(); }); // another tab switched role
  }
  // Account menu: layout and position from the BCT AI CRM prototype; content as the old CRMpulse profile menu (name, email, Sign out).
  // Lucide icons, exactly as the prototype draws them (stroke 2, round caps).
  const LUCIDE = {
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>'
  };
  function lucide(n, cls = 'i') { return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${LUCIDE[n]}</svg>`; }
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
      if (m === 'out') { openPop(null); toast('Would sign you out through OneLogin'); }
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
    menu.innerHTML = `
      <div class="acct-head"><img src="assets/people/gaurav-shrotriya.webp" alt=""><div><b>${USER.name}</b><small>${USER.sub}</small><small>${USER.email}</small></div></div>
      <div class="view-as">
        <label class="select"><span class="lbl">View as</span><select id="view-as" aria-label="View as">${Object.entries(ROLE_LABELS)
          .map(([c, l]) => `<option value="${c}" ${c === USER.code ? 'selected' : ''} ${!ROLES_ON.includes(c) ? 'disabled' : ''}>${l}</option>`).join('')}</select></label></div>
      <div class="menu-sep"></div>
      <button class="menu-item danger" role="menuitem" data-m="out">${lucide('logout')}Sign out</button>`;
    enhanceSelects(menu);
    menu.querySelector('#view-as').addEventListener('change', (e) => { if (e.target.value === USER.code) return; try { localStorage.setItem('crm-home-role', e.target.value); } catch (err) {} location.reload(); });
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
    [[menu, ['user-btn', 'm-user']], [notes, ['notes-btn']]].forEach(([p, ids]) => {
      const on = p === pop; p.hidden = !on;
      ids.forEach((id) => { const b = document.getElementById(id); if (!b) return; const mine = on && id === btnId; b.classList.toggle('active', mine); b.setAttribute('aria-expanded', String(mine)); });
    });
    if (!pop) return;
    pop.style.width = pop.style.maxHeight = pop.style.overflowY = '';
    const b = document.getElementById(btnId), r = b.getBoundingClientRect(), w = pop.offsetWidth, h = pop.offsetHeight;
    if (b.closest('.m-bar')) { // phone top bar: under the avatar, right-aligned
      pop.style.left = Math.max(12, innerWidth - w - 12) + 'px'; pop.style.top = Math.round(r.bottom + 8) + 'px';
    } else if (phone.matches) { // inside the open drawer, above the button (design review 3)
      const d = document.getElementById('side').getBoundingClientRect();
      pop.style.width = Math.min(288, d.width - 24) + 'px'; pop.style.left = Math.round(d.left + 12) + 'px';
      pop.style.maxHeight = Math.round(r.top - 24) + 'px'; pop.style.overflowY = 'auto';
      pop.style.top = Math.max(12, Math.round(r.top - pop.offsetHeight - 8)) + 'px'; pop.style.bottom = 'auto'; return;
    } else { // sidebar: beside the button, bottom-aligned
      pop.style.left = Math.max(12, Math.min(r.right + 16, innerWidth - w - 12)) + 'px';
      pop.style.top = Math.max(12, Math.min(r.bottom - h, innerHeight - h - 12)) + 'px';
    }
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

  // "a · b · c" as segments that never break inside: the "·" stays with the text before it, so no line starts with it (design review 3, M5)
  function dots(text) {
    const parts = text.split(' · ');
    return parts.map((p, i) => `<span class="seg-nb">${p.replace(/&/g, '&amp;').replace(/</g, '&lt;')}${i < parts.length - 1 ? ' ·' : ''}</span>`).join(' ');
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
  // Tooltips are for mouse and keyboard (design review 3, M1): a tap never opens one on a button or link, where it would stay
  // and cover its neighbours. Text with a dotted line (.def) and chart parts have no other action, so a tap still explains them.
  let touching = false;
  addEventListener('pointerdown', (e) => { touching = e.pointerType === 'touch'; if (touching && !e.target.closest?.('[data-tip],[data-tip-html]')) hideTip(); }, true);
  addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse') touching = false; }, { capture: true, passive: true });
  addEventListener('keydown', () => { touching = false; }, true);
  const noTip = (el) => touching && !!el.closest('button, a, [role="button"], [aria-disabled]');
  function hideTip() { clearTimeout(tipT); tipEl = null; tip.classList.remove('on'); }
  document.addEventListener('mouseover', (e) => {
    const el = e.target.closest('[data-tip],[data-tip-html]');
    if (el === tipEl) return;
    if (!el || noTip(el)) { hideTip(); return; }
    const wasOpen = tip.classList.contains('on');
    tipEl = el; clearTimeout(tipT);
    if (wasOpen) showTip(el); else tipT = setTimeout(() => showTip(el), 300);
  });
  document.addEventListener('focusin', (e) => { const el = e.target.closest('[data-tip],[data-tip-html]'); if (el && !noTip(el) && e.target.matches(':focus-visible')) { tipEl = el; showTip(el); } }); // keyboard focus only, not a click
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
  // toast(msg, kind, action): an optional { label, fn } adds a button (e.g. Undo) and keeps the toast up for 5s (design review D2)
  function toast(msg, kind = 'info', action) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    const k = TOAST_IC[kind] ? kind : 'info';
    toastEl.className = `toast t-${k}${action ? ' has-act' : ''}${toastEl.classList.contains('on') ? ' on' : ''}`; // a toast already showing swaps its text without fading out
    toastEl.innerHTML = `<i aria-hidden="true"><svg viewBox="0 0 24 24">${TOAST_IC[k]}</svg></i><span></span>${action ? '<button type="button" class="toast-act"></button>' : ''}`;
    toastEl.querySelector('span').textContent = msg;
    if (action) { const b = toastEl.querySelector('.toast-act'); b.textContent = action.label;
      b.addEventListener('click', () => { clearTimeout(toastT); toastEl.classList.remove('on'); action.fn(); }); }
    requestAnimationFrame(() => toastEl.classList.add('on'));
    clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('on'), action ? 5000 : 2600);
  }


  // Sticky filter bar hairline
  function watchSticky(el) {
    if (!el) return;
    // page name, shown at the start of the stuck bar when the sidebar is collapsed (CSS: .filters::before)
    const cur = document.querySelector('.nav-item[aria-current="page"]');
    el.dataset.page = cur ? cur.dataset.name : document.title.split(' · ')[0];
    // stuck = sitting at its sticky top (0 on desktop, under the 56px top bar on phones)
    // when it sticks or unsticks on a phone, the header actions join or leave row 1 and the More filters button moves:
    // re-place an open popover so it stays inside the window
    const check = () => { const t = parseFloat(getComputedStyle(el).top) || 0, was = el.classList.contains('stuck');
      const now = el.classList.toggle('stuck', scrollY > 0 && el.getBoundingClientRect().top <= t + 0.5);
      if (now !== was) requestAnimationFrame(() => keepPopsInView('stuck')); };
    addEventListener('scroll', check, { passive: true }); addEventListener('resize', check); check();
    compactFilters(el);
  }

  // Phone filter bar (≤768): sticky and at most two rows. Row 1 = search + More filters (and Export);
  // everything else goes in a row that scrolls sideways. Pages without a search get one row.
  // Nodes are moved, not copied, so page code keeps its ids and listeners; wider windows get the original order back.
  const phone = matchMedia('(max-width: 768px)');
  function compactFilters(f) {
    // bars with a search compact on phones; Pipeline / Sales performance (no search) already below 1280px (design review D4)
    const mq = f.dataset.compact ? matchMedia(`(max-width: ${f.dataset.compact}px)`) : f.querySelector(':scope > .search') ? phone : matchMedia('(max-width: 1279px)'); // data-compact: a bar too long for mid widths compacts earlier
    const apply = () => {
      if (mq.matches && !f._orig) {
        f._orig = [...f.children];
        const search = f._orig.find(c => c.matches('.search'));

        const exp = f._orig.find(c => c.id === 'export' || c.querySelector?.('#export')), det = f._orig.find(c => c.id === 'details'); // row-1 actions at the end
        const row = document.createElement('div'); row.className = 'f-scroll';
        // Design review M3 (2026-11-24): nothing scrolls sideways. Row 2 keeps the short controls (a 2–3 option switch,
        // Fiscal year, and the period switch shown as a dropdown); every other filter moves to the top of More filters,
        // whose badge then counts them too. Pages without More filters (Tasks) wrap row 2 instead.
        const keep = (c) => (c.matches('.seg') && c.querySelectorAll('button').length <= 3) || c.id === 'f-fy-wrap' || c.id === 'reset' || c.matches('[data-keep]'); // data-keep: a page's only filter stays in row 2 instead of a panel of one
        const moves = (c) => !keep(c) && !c.matches('.search, .sp, .seg') && c !== exp && c !== det && c.id !== 'more-btn' && !c.querySelector('#more-btn');
        let pop = document.getElementById('more-pop');
        if (!pop && f._orig.some(moves)) { // no More filters on this page (Tasks): make a Filters button + panel so the same pattern applies (design review M3)
          const wrap = document.createElement('div'); wrap.className = 'm-made'; wrap.style.position = 'relative';
          wrap.innerHTML = `<button class="btn" id="more-btn" type="button" aria-haspopup="dialog" aria-expanded="false"><svg viewBox="0 0 24 24"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg>Filters<span class="count-badge" id="more-n" hidden></span></button>
            <div class="pop" id="more-pop" role="dialog" aria-label="Filters" hidden><div class="pop-foot"><button class="btn primary" type="button" data-done>Done</button></div></div>`;
          pop = wrap.querySelector('.pop'); const btn = wrap.querySelector('#more-btn');
          const set = (on) => { pop.hidden = !on; btn.setAttribute('aria-expanded', String(on)); };
          btn.addEventListener('click', (e) => { e.stopPropagation(); set(pop.hidden); });
          pop.addEventListener('click', (e) => { e.stopPropagation(); if (e.target.closest('[data-done]')) set(false); });
          document.addEventListener('click', () => set(false)); document.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
          f._made = wrap; f.appendChild(wrap); f._orig.push(wrap);
        }
        const more = f._orig.find(c => c.id === 'more-btn' || c.querySelector('#more-btn'));
        const moved = [];
        f._orig.forEach(c => {
          if (c === search || c === more || c === exp || c === det || c.matches('.sp')) return;
          if (c.matches('.seg') && c.querySelectorAll('button').length > 3) { row.appendChild(c); row.appendChild(segProxy(c)); return; }
          if (pop && !keep(c)) { moved.push(c); return; }
          row.appendChild(c);
        });
        if (moved.length) {
          const box = document.createElement('div'); box.className = 'm-moved'; box.append(...moved); pop.prepend(box); f._moved = moved; f._box = box;
          moved.forEach(c => { const sel = c.querySelector('select'); if (sel) sel._def = sel.value; });
          watchBadge(f);
        }
        f.classList.add('compact', search ? 'two' : 'one');
        const sp = f._orig.find(c => c.matches('.sp')); // starts from the left like every bar; the spacer keeps Export at the far right (design review 3, D6)
        if (search) f.append(...[search, more, sp, det, exp].filter(Boolean), row); else f.append(row, ...[more, sp, det, exp].filter(Boolean));
        f._row = row;
        // Page-header actions (Export, New …): once the bar is stuck they come back as icon buttons at the end of row 1.
        // Each icon clicks the real button, so page code keeps a single handler.
        const acts = [...document.querySelectorAll('.v2-head > .acts > .btn')];
        if (acts.length) {
          const box = document.createElement('div'); box.className = 'f-acts';
          acts.forEach(btn => {
            const ic = document.createElement('button');
            ic.type = 'button'; ic.className = 'btn icon-only' + (btn.classList.contains('primary') ? ' primary' : '');
            ic.setAttribute('aria-label', btn.textContent.trim()); ic.innerHTML = btn.querySelector('svg')?.outerHTML || '';
            ic.addEventListener('click', () => btn.click());
            box.appendChild(ic);
          });
          row.before(box); f._acts = box;
        }
      } else if (!mq.matches && f._orig) {
        f._row.querySelectorAll('.seg-proxy').forEach(x => { x._seg.classList.remove('proxied'); x._mo.disconnect(); x.remove(); });
        if (f._made) { f._orig = f._orig.filter(c => c !== f._made); }
        f.append(...f._orig); f._made?.remove(); f._made = null; f._row.remove(); f._acts?.remove(); f._box?.remove(); f._badgeMo?.forEach(m => m.disconnect());
        f.classList.remove('compact', 'two', 'one'); f._orig = f._row = f._acts = f._box = f._moved = f._badgeMo = null;
        const b = document.getElementById('more-n'); if (b && b._base != null) { b._self = true; b.textContent = b._base; b.hidden = !b._base; }
      }
    };
    mq.addEventListener('change', apply); apply();
  }
  // Icon-only filter buttons (Export, More filters) get a tooltip with their name; with their text showing they need none
  function iconTips() {
    document.querySelectorAll('.filters :is(#export, #more-btn, #details)').forEach(b => {
      const icon = parseFloat(getComputedStyle(b).fontSize) === 0, name = [...b.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').trim(); // not the count badge
      if (icon && name) b.dataset.tip = name; else delete b.dataset.tip;
    });
  }
  addEventListener('resize', iconTips);
  new MutationObserver(iconTips).observe(document.documentElement, { subtree: true, attributes: true, attributeFilter: ['hidden'] });
  setTimeout(iconTips);
  // A switch with 4+ options (Full year / Q1–Q4) as a dropdown on phones: it clicks the real buttons, and follows them.
  function segProxy(seg) {
    const btns = [...seg.querySelectorAll('button')];
    const wrap = document.createElement('label'); wrap.className = 'select seg-proxy';
    const sel = document.createElement('select'); sel.setAttribute('aria-label', seg.getAttribute('aria-label') || 'Period');
    sel.innerHTML = btns.map((b, i) => `<option value="${i}">${b.firstChild.textContent.trim()}${b.querySelector('small') ? ' · ' + b.querySelector('small').textContent.trim() : ''}</option>`).join('');
    const sync = () => { const i = btns.findIndex(b => b.classList.contains('on')); if (i >= 0 && sel.value !== String(i)) sel.value = String(i); };
    sel.addEventListener('change', () => btns[+sel.value]?.click());
    wrap.appendChild(sel); seg.classList.add('proxied'); sync();
    wrap._seg = seg; wrap._mo = new MutationObserver(sync); wrap._mo.observe(seg, { subtree: true, attributes: true, attributeFilter: ['class'] });
    setTimeout(() => enhanceSelects(wrap));
    return wrap;
  }
  // More filters badge on phones = the page's own count + the moved filters that are set
  function watchBadge(f) {
    const b = document.getElementById('more-n'); if (!b) return;
    b._base = b.hidden ? 0 : (+b.textContent || 0);
    const setCount = () => f._moved.filter(c => { const sel = c.querySelector('select'), inp = c.querySelector('input');
      return c.classList.contains('set') || c.getAttribute('aria-pressed') === 'true' || (sel && sel.value !== sel._def) || (inp && inp.type !== 'checkbox' && inp.value); }).length;
    const paint = () => { const n = b._base + setCount(); b._self = true; b.textContent = n; b.hidden = !n; };
    const mb = new MutationObserver(() => { if (b._self) { b._self = false; return; } b._base = b.hidden ? 0 : (+b.textContent || 0); paint(); });
    mb.observe(b, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ['hidden'] });
    const mc = new MutationObserver(paint); f._moved.forEach(c => mc.observe(c, { attributes: true, subtree: true, attributeFilter: ['class', 'aria-pressed'] }));
    f._moved.forEach(c => c.addEventListener('change', paint));
    f._badgeMo = [mb, mc]; paint();
  }
  // Menus inside the sideways-scrolling filter row would be clipped by it: place them on the page instead
  // (the row's fade mask and the stuck bar's backdrop blur would clip it, so it moves to <body> while open)
  // Same for menus inside a More filters popover, whose body scrolls on its own (keepPopsInView caps its height).
  function pinPop(pop, anchor) {
    const inPop = anchor.closest('.filters .pop');
    if (!anchor.closest('.f-scroll') && !inPop) return false;
    if (!pop._home) { pop._home = pop.parentNode; document.body.appendChild(pop); }
    // moving the menu out shortens the popover and the browser re-clamps its scroll: ignore that one scroll
    if (inPop) inPop._quietUntil = performance.now() + 200;
    // a pick in a menu that left the More filters popover must not count as a click outside it (that closes the popover)
    if (inPop && !pop._stopped) { pop.addEventListener('click', (e) => e.stopPropagation()); pop._stopped = true; }
    const r = anchor.getBoundingClientRect();
    pop.classList.remove('up'); pop.style.translate = '';
    pop.style.minWidth = `${Math.round(r.width)}px`; // its CSS min-width is a % of the select it left
    pop.style.position = 'fixed'; pop.style.maxHeight = '';
    // below the field when it fits, else above it when there is more room there; capped to the room it gets
    const h = pop.offsetHeight, below = innerHeight - 8 - (r.bottom + 6), above = r.top - 6 - 8;
    const up = h > below && above > below;
    if (h > (up ? above : below)) pop.style.maxHeight = `${Math.floor(up ? above : below)}px`;
    pop.style.top = `${Math.round(up ? r.top - 6 - pop.offsetHeight : r.bottom + 6)}px`;
    pop.style.left = `${Math.round(Math.max(12, Math.min(r.left, innerWidth - pop.offsetWidth - 12)))}px`;
    return true;
  }
  addEventListener('scroll', () => { if (selOpen && selOpen.menu.style.position === 'fixed') closeSel(); if (dtOpen && dtOpen.pop.style.position === 'fixed') closeDate(); }, { passive: true });

  // body.scrolled: lets sticky bars that pages re-render (the record back bar) pick up the glass background
  const onScroll = () => document.body.classList.toggle('scrolled', scrollY > 4);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Custom select: the native <select> stays as the data source (pages keep using .value / 'change'),
  // but is hidden and driven by a button + listbox styled like the filter popover.
  const selCheck = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  let selOpen = null;
  function unpin(pop) { if (!pop._home) return; pop._home.appendChild(pop); pop._home = null; pop.style.position = pop.style.left = pop.style.top = pop.style.minWidth = ''; }
  function closeSel() { if (!selOpen) return; selOpen.menu.hidden = true; unpin(selOpen.menu); selOpen.btn.setAttribute('aria-expanded', 'false'); selOpen.wrap.classList.remove('open'); selOpen = null; }
  function enhanceSelect(sel) {
    if (sel._enh) return; sel._enh = true;
    const wrap = sel.closest('.select'); if (!wrap) return;
    const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'sel-btn';
    btn.setAttribute('aria-haspopup', 'listbox'); btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', sel.getAttribute('aria-label') || '');
    const menu = document.createElement('div'); menu.className = 'pop sel-pop'; menu.setAttribute('role', 'listbox'); menu.hidden = true;
    sel.before(btn); wrap.appendChild(menu); sel.hidden = true; sel.tabIndex = -1;
    const sync = () => { const o = sel.options[sel.selectedIndex]; btn.textContent = o ? (o.dataset.short || o.textContent) : ''; /* data-short: a shorter label for the closed control (review: "Who should do it?" shows the name only) */ btn.disabled = sel.disabled; };
    const build = () => {
      menu.innerHTML = [...sel.options].map((o, i) => `<button type="button" class="sel-opt${i === sel.selectedIndex ? ' on' : ''}" role="option" aria-selected="${i === sel.selectedIndex}" data-i="${i}"${o.disabled ? ' disabled aria-disabled="true"' : ''}><span>${o.textContent}</span>${selCheck}</button>`).join('');
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
      // a menu that would run past the window's side (e.g. Sort at the right edge on a phone) shifts back inside, 16px from the edge
      // (clientWidth, not innerWidth: on phones the open menu itself widens the layout viewport)
      if (!pinPop(menu, wrap)) { menu.style.translate = ''; const m = menu.getBoundingClientRect(), pad = 16, vw = document.documentElement.clientWidth;
        const dx = m.right > vw - pad ? vw - pad - m.right : m.left < pad ? pad - m.left : 0;
        if (dx) menu.style.translate = `${Math.round(dx)}px 0`; }
      (menu.querySelector('.on') || menu.firstElementChild)?.focus({ preventScroll: true }); };
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
  document.addEventListener('click', (e) => { if (selOpen && !selOpen.wrap.contains(e.target) && !selOpen.menu.contains(e.target)) closeSel(); });
  // Filter popovers (More filters) are placed by each page next to their button. When the filter row wraps
  // on smaller windows, keep an open one inside the window (2026-11-17).
  // Its height is capped at the space left below it in the window: it scrolls on its own with Clear / Done pinned
  // at its bottom, so the page itself never has to scroll (CSS: .filters .pop).
  function keepPopsInView(e) {
    document.querySelectorAll('.filters .pop:not([hidden])').forEach((pop) => {
      pop.style.translate = ''; pop.style.maxHeight = '';
      let r = pop.getBoundingClientRect(); const pad = 12;
      const panel = !pop.classList.contains('sel-pop'); // a select's own menu is not capped here
      if (panel && r.bottom > innerHeight - pad) { pop.style.maxHeight = `${Math.max(180, Math.floor(innerHeight - pad - r.top))}px`; r = pop.getBoundingClientRect(); }
      // a near-full-width popover (phones) is centred, so its left and right gaps match the page gutter
      const dx = r.width > innerWidth - 48 ? (innerWidth - r.width) / 2 - r.left
        : r.left < pad ? pad - r.left : (r.right > innerWidth - pad ? innerWidth - pad - r.right : 0);
      if (dx) pop.style.translate = `${Math.round(dx)}px 0`;
      // the menus of its selects are pinned to the window: close them when the fields scroll
      if (panel && !pop._watch) { pop.addEventListener('scroll', () => { if (performance.now() > (pop._quietUntil || 0)) { closeSel(); closeDate(); } }, { passive: true }); pop._watch = true; }
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
  function closeDate(focus) { if (!dtOpen) return; const o = dtOpen; dtOpen = null; o.pop.hidden = true; unpin(o.pop); o.wrap.classList.remove('open'); o.btn.setAttribute('aria-expanded', 'false'); if (focus) o.btn.focus(); }
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
      if (pinPop(pop, wrap)) { pop.querySelector(`.dt-grid [data-d="${focusD}"]`)?.focus(); return; }
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
  document.addEventListener('click', (e) => { if (dtOpen && !dtOpen.wrap.contains(e.target) && !dtOpen.pop.contains(e.target)) closeDate(); });
  function enhanceDates(root) { (root || document).querySelectorAll('input[type="date"]').forEach(enhanceDate); }
  // pages call this after each render; it also turns date inputs into the date picker
  function enhanceSelects(root) { (root || document).querySelectorAll('.select select').forEach(enhanceSelect); enhanceDates(root); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => enhanceSelects()); else setTimeout(enhanceSelects);

  // Tables on phones (≤768, responsive.css) become a list of cards. Each cell gets its column name as data-label,
  // long columns (stage, next step) take the full card width, and tables sorted by their column headers get a
  // Sort select, since the header row is hidden there. Runs after every re-render (pages rebuild tables with innerHTML).
  const WIDE = /^(stage|next step|owner|assigned to)/i;
  function prepTables() {
    document.querySelectorAll('table.tbl').forEach((t) => {
      if (t._prep) return; t._prep = true;
      const ths = [...t.querySelectorAll('thead th')];
      const names = ths.map((th) => {
        const b = th.querySelector('.th-sort');
        const txt = b ? [...b.childNodes].filter(n => !(n.classList && n.classList.contains('arr'))).map(n => n.textContent).join('') : th.textContent;
        return txt.replace(/\s+/g, ' ').trim();
      });
      t.querySelectorAll('tbody tr').forEach((tr) => [...tr.children].forEach((td, i) => {
        if (names[i]) { td.dataset.label = names[i]; if (WIDE.test(names[i])) td.dataset.wide = ''; } else td.dataset.act2 = '';
      }));
      const sorts = ths.map(th => th.querySelector('.th-sort')).filter(Boolean);
      const card = t.closest('.card'), wrap = t.closest('.tbl-wrap') || t;
      if (!sorts.length || (card && card.querySelector('#f-sort')) || wrap.previousElementSibling?.classList.contains('tbl-sort')) return;
      const on = sorts.find(b => b.classList.contains('on'));
      const lab = document.createElement('label'); lab.className = 'select tbl-sort';
      lab.innerHTML = `<span class="lbl">Sort</span><select aria-label="Sort">${sorts.map(b => `<option value="${b.dataset.v}" ${b === on ? 'selected' : ''}>${names[ths.indexOf(b.closest('th'))]}</option>`).join('')}</select>`;
      wrap.before(lab);
      lab.querySelector('select').addEventListener('change', (e) => { e.stopPropagation(); sorts.find(b => b.dataset.v === e.target.value)?.click(); });
      enhanceSelect(lab.querySelector('select'));
    });
  }
  new MutationObserver(prepTables).observe(document.documentElement, { childList: true, subtree: true });

  // Owner avatar: initials on a blue-family tint, fixed per person (styles .av / .av-a…e in theme-v2.css)
  // Photo when the person has one in assets/people (sales owners), initials otherwise (contacts, cross-functional staff).
  // Sales-owner photos: Gaurav, Omar, Ahmed, Rajesh (was Karthik Menon until 2026-11-26) and Vikram from the manager's prototype set; Daniel, Mei Lin,
  // Priya and Ananya are AI-generated portraits of these fictional people (2026-11-19).
  const PHOTOS = ['Gaurav Shrotriya', 'Omar Haddad', 'Ahmed Al-Mansoori', 'Rajesh Kumar', 'Vikram Iyer', 'Daniel Tan', 'Mei Lin Wong', 'Priya Sharma', 'Ananya Reddy'];
  const PEOPLE_DIR = (document.currentScript && document.currentScript.src || '').replace(/crm\.js.*$/, 'people/');
  // avatar(name, contactId): contacts have one portrait each, by ID (assets/people/contacts/CON-….webp, AI-generated),
  // because the demo reuses some names across accounts.
  function avatar(name, contactId) {
    const ini = name.split(/\s+/).map(s => s[0]).slice(0, 2).join('');
    let h = 0; for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const src = contactId && typeof CONTACT_PHOTOS !== 'undefined' && CONTACT_PHOTOS.has(contactId) ? `${PEOPLE_DIR}contacts/${contactId}.webp` : PHOTOS.includes(name) ? `${PEOPLE_DIR}${name.toLowerCase().replace(/[^a-z]+/g, '-')}.webp` : '';
    return `<span class="av av-${'abcde'[h % 5]} ${src ? 'ph' : ''}" aria-hidden="true">${src ? `<img src="${src}" alt="" loading="lazy" onerror="this.parentNode.classList.remove('ph');this.replaceWith('${ini}')">` : ini}</span>`;
  }

  // Confirm dialog (Candace, 2026-11-18). CRM.confirm({ title, body, actions: [{ label, value, kind }] }) resolves to the
  // chosen action's value, or null when closed with Esc or a click outside. kind: 'primary' (focused first), 'quiet'
  // (red text, first in the right-aligned row: the destructive choice). Styles: .dlg in crm.css.
  function confirmDlg({ title, body = '', actions, field }) { // field { label, onText }: one text box the last action may require (action.needsText)
    return new Promise((resolve) => {
      const prev = document.activeElement;
      const wrap = document.createElement('div'); wrap.className = 'dlg-scrim';
      wrap.innerHTML = `<div class="dlg" role="alertdialog" aria-modal="true" aria-labelledby="dlg-t" aria-describedby="dlg-b">
        <h2 id="dlg-t">${title}</h2><div class="dlg-b" id="dlg-b">${body}${field ? `<input class="in dlg-in" aria-label="${field.label}" placeholder="${field.label}">` : ''}</div>
        <div class="dlg-acts">${actions.map((a, i) => `<button type="button" class="btn ${a.kind || ''}" data-i="${i}">${a.label}</button>`).join('')}</div></div>`;
      document.body.appendChild(wrap); document.body.classList.add('dlg-open');
      const btns = [...wrap.querySelectorAll('.dlg-in, button')], inp = wrap.querySelector('.dlg-in');
      if (inp) { const gate = () => { field.onText(inp.value.trim()); actions.forEach((a, i) => { if (a.needsText) wrap.querySelector(`[data-i="${i}"]`).disabled = !inp.value.trim(); }); }; inp.addEventListener('input', gate); gate(); }
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
      (inp || btns.find(b => b.classList.contains('primary')) || btns[btns.length - 1]).focus();
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

  // redraw the Tasks count after a task is completed, added or reassigned on this page
  function refreshTaskBadge() {
    const a = document.querySelector('#side a.nav-item[href="tasks.html"]'); if (!a) return;
    a.querySelector('.nav-n')?.remove(); a.insertAdjacentHTML('beforeend', taskBadge());
  }
  // Page entrance, the same on every page: cards, zones and header KPIs rise in once, 40ms apart (CSS .rise; off with
  // prefers-reduced-motion). Pages call it after their first render.
  let risen = false;
  function riseIn() {
    if (risen) return; risen = true;
    document.querySelectorAll('.main .card, .main .zone, .main .v2-kpi').forEach((el, i) => { el.classList.add('rise'); el.style.animationDelay = Math.min(i, 8) * 40 + 'ms'; });
  }
  // ---- Side-panel forms ----
  // Replace a part of the form only when its HTML changed: leaving a field fires "change" between mousedown and mouseup on a footer
  // button, and a button redrawn at that moment would never get its click.
  const put = (el, html) => { if (el && el._h !== html) { el.innerHTML = html; el._h = html; } };
  const fEsc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const fld = (label, ctl, { req, hint, err, id } = {}) => `<div class="tf ${err ? 'bad' : ''}" ${id ? `data-f="${id}"` : ''}><span class="tf-l">${label}${req ? '<span class="rq">*</span>' : ''}</span>${ctl}${err ? `<span class="tf-e">${err}</span>` : hint ? `<span class="tf-h">${hint}</span>` : ''}</div>`;
  const opt = (v, l, on) => `<option value="${fEsc(v)}" ${on ? 'selected' : ''}>${fEsc(l)}</option>`;
  const pick = (k, opts, cur, label, dis) => `<label class="select fsel"><select data-v="${k}" aria-label="${label}" ${dis ? 'disabled' : ''}>${opts.map(([v, l]) => opt(v, l, v === cur)).join('')}</select></label>`;
  const inp = (k, val, label, { type = 'text', dis, ph = '', max } = {}) => `<input class="in" type="${type}" data-v="${k}" value="${fEsc(String(val ?? ''))}" aria-label="${label}" ${ph ? `placeholder="${ph}"` : ''} ${type === 'number' ? 'min="0"' : ''} ${max ? `max="${max}"` : ''} ${dis ? 'disabled' : ''}>`;
  const head = (kind, t, sub) => `<header class="dr-head"><div><p class="dr-kind">${kind}</p><h2 id="op-t">${t}</h2><p class="dr-sub">${sub}</p></div><button type="button" class="icon-btn" data-x="close" aria-label="Close panel">${icon('x')}</button></header>`;
  // Side-panel form (Accounts, Contacts, Customer orders): Esc, × and Cancel ask first when something was entered (as Tasks and Log activity).
    // v = the form's values, draw() = its HTML; clean() makes the current values the new starting point.
  function openPanel(v, draw, discard) {
    document.querySelectorAll('.tf-panel').forEach(x => x.remove());
    const el = document.createElement('aside'); el.className = 'drill tf-panel'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-labelledby', 'op-t');
    const prev = document.activeElement, back = prev?.dataset?.v, snap = () => JSON.stringify(v); let start = snap();
    const key = (e) => { if (e.key === 'Escape' && !document.body.classList.contains('dlg-open')) { e.preventDefault(); ask(); } };
    const close = () => { document.removeEventListener('keydown', key, true); document.body.classList.remove('drill-open'); setTimeout(() => el.remove(), 300);
      (prev?.isConnected ? prev : back && document.querySelector(`#page [data-v="${back}"]`))?.focus?.({ preventScroll: true }); };
    const ask = async () => { if (snap() === start) return close();
      const r = await confirmDlg({ title: discard, body: '<p>What you entered will be lost.</p>', actions: [{ label: 'Discard', value: 'discard', kind: 'quiet' }, { label: 'Keep editing', value: null, kind: 'primary' }] });
      if (r === 'discard') close(); };
    const redraw = () => { const b = el.querySelector('.dr-body'), y = b ? b.scrollTop : 0, f = el.contains(document.activeElement) ? document.activeElement.dataset?.v : null; el.innerHTML = draw(); enhanceSelects(el); el.querySelector('.dr-body').scrollTop = y; if (f) el.querySelector(`[data-v="${f}"]:not([hidden])`)?.focus({ preventScroll: true }); };
    el.addEventListener('click', (e) => { if (e.target.closest('[data-x="close"]')) ask(); });
    el.addEventListener('submit', (e) => e.preventDefault());
    redraw(); document.body.appendChild(el); document.addEventListener('keydown', key, true);
    requestAnimationFrame(() => { document.body.classList.add('drill-open'); setTimeout(() => (el.querySelector('input.in:not(:disabled)') || el.querySelector('[data-x="close"]'))?.focus({ preventScroll: true }), 280); });
    return { el, close, redraw, clean: () => { start = snap(); } };
  }

  window.CRM = { icon, dots, openPanel, form: { fld, opt, pick, inp, head, put }, renderShell, riseIn, refreshTaskBadge, user: { ...USER, assigning: true, oversight: true } /* 2026-11-26: Sales Head is the top role; outside Home every role works with its permissions (View as only changes Home and the sidebar) */, money, moneyBig, toast, watchSticky, enhanceSelects, avatar, confirm: confirmDlg, guardLeave, leave, date: fmtDate, enhanceDates };
})();
