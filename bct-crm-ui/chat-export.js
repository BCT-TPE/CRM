/* Export conversation — adapted from Gina's chat-export.js (gina-ui 2).
   The Export button on the chat header (and Export conversation in a chat's ⋯ menu) opens a small panel
   with two formats. Only finished messages are exported (an AI reply counts once it has its time stamp).
     .txt  plain text: [time] speaker, then the message
     .md   Markdown: a heading per message; lists, tables, cards and bold kept
   CRM changes from Gina's version:
     - Source chips (OPP-1042, Data Lake…) keep their label instead of being dropped as buttons.
     - Each answer ends with the sources it was based on.
     - CRM blocks (deal rows, tasks, snapshot tiles, write-back rows, drafts, charts) become readable lines. */
(() => {
  const head = document.getElementById('chat-head');
  const btn = document.getElementById('ch-export');
  const panel = document.getElementById('export-pop');
  const thread = document.getElementById('thread');
  if (!head || !btn || !panel || !thread) return;

  const ASSISTANT = 'BCT CRM', USER = 'You';
  const pad = n => String(n).padStart(2, '0');
  const stamp = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const clock = d => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  const title = () => (document.getElementById('ch-title-text')?.textContent || 'Conversation').trim();
  const txt = n => (n?.textContent || '').replace(/\s+/g, ' ').trim();

  // Finished messages in reading order: {who, time, el, sources}.
  function messages() {
    const out = [];
    [...thread.children].forEach(el => {
      if (el.classList.contains('msg-user')) {
        out.push({ who: USER, time: txt(el.querySelector('.msg-time')), el: el.querySelector('.bubble-user') });
      } else if (el.classList.contains('msg-ai')) {
        const time = txt(el.querySelector('.ai-time'));
        const bubble = el.querySelector('.bubble-ai');
        if (!time || !bubble) return; // the "pulling from…" line and replies still being written
        const src = el.querySelector('.execution-details summary span:nth-child(2)');
        out.push({ who: ASSISTANT, time, el: bubble, sources: src ? txt(src).replace(/^Based on\s*/i, '') : '' });
      }
    });
    return out;
  }

  // ---- Markdown from the reply HTML ----
  const inline = node => [...node.childNodes].map(n => {
    if (n.nodeType === 3) return n.textContent.replace(/\s+/g, ' ');
    if (n.nodeType !== 1) return '';
    const t = n.tagName.toLowerCase(), s = inline(n);
    if (t === 'button') return n.classList.contains('src') ? txt(n) : '';
    if (t === 'svg') return '';
    if (t === 'b' || t === 'strong') return s.trim() ? `**${s.trim()}**` : '';
    if (t === 'i' || t === 'em') return s.trim() ? `*${s.trim()}*` : '';
    if (t === 'br') return '\n';
    return s;
  }).join('');
  const cell = n => inline(n).trim().replace(/\|/g, '\\|');
  const join = parts => parts.map(p => p && p.trim()).filter(Boolean).join(' · ');
  // Meta lines are several spans (date, status flag…); keep a separator between them.
  const meta = n => n ? [...n.children].map(txt).filter(Boolean).join(' · ') || txt(n) : '';

  // CRM components → one readable line each. Returns null when the element isn't one of them.
  function crmBlock(n) {
    if (n.matches('.snap-foot, .crm-actions')) return '';
    if (n.matches('[role="img"][aria-label]')) return `_Chart: ${n.getAttribute('aria-label')}_`;
    if (n.matches('.snap-tile')) return `- ${txt(n.querySelector('.snap-label'))}: **${txt(n.querySelector('.snap-num'))}** (${txt(n.querySelector('.snap-cap'))})`;
    if (n.matches('.crm-group-head')) { const s = txt(n.querySelector('small')); return `**${txt(n.querySelector('.lbl'))}**${s ? ` · ${s}` : ''}`; }
    if (n.matches('.crm-chart-head')) return `**${txt(n.querySelector('span'))}**`;
    if (n.matches('.task')) {
      const done = n.classList.contains('done');
      return `- [${done ? 'x' : ' '}] ${join([txt(n.querySelector('.crm-row-title')), meta(n.querySelector('.crm-row-meta')), txt(n.querySelector('.src'))])}`;
    }
    if (n.matches('.crm-row')) {
      return `- ${join([txt(n.querySelector('.crm-row-title')), meta(n.querySelector('.crm-row-meta')), txt(n.querySelector('.crm-amount')), [...n.querySelectorAll('.src')].map(txt).join(', ')])}`;
    }
    if (n.matches('.crm-change')) {
      const body = n.querySelector('.lbl')?.nextElementSibling;
      return `- **${txt(n.querySelector('.lbl'))}**: ${body ? inline(body).replace(/\s*\n\s*/g, '; ').trim() : ''}`;
    }
    if (n.matches('.crm-banner')) return `_${inline(n.querySelector('span')).trim()}_`;
    if (n.matches('.crm-draft')) return inline(n).trim().split('\n').map(l => '> ' + l.trim()).join('\n');
    if (n.matches('.bars')) {
      const k = [...n.querySelectorAll('.k')], v = [...n.querySelectorAll('.v')];
      return k.map((x, i) => `- ${txt(x)}: ${txt(v[i])}`).join('\n');
    }
    return null;
  }

  function blocks(node) {
    const out = [];
    let line = '';
    const flush = () => { if (line.trim()) out.push(line.trim()); line = ''; };
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) { line += n.textContent.replace(/\s+/g, ' '); return; }
      if (n.nodeType !== 1) return;
      const t = n.tagName.toLowerCase();
      const crm = crmBlock(n);
      if (crm !== null) { flush(); if (crm) out.push(crm); return; }
      if (/^h[1-6]$/.test(t)) { flush(); out.push('#### ' + inline(n).trim()); }
      else if (t === 'p') { flush(); const s = inline(n).trim(); if (s) out.push(s); }
      else if (t === 'ul' || t === 'ol') {
        flush();
        out.push([...n.children].filter(li => li.tagName === 'LI').map((li, i) => `${t === 'ol' ? `${i + 1}.` : '-'} ${inline(li).trim()}`).join('\n'));
      }
      else if (t === 'table') {
        flush();
        const rows = [...n.querySelectorAll('tr')].map(tr => [...tr.children].map(cell));
        if (rows.length) out.push([`| ${rows[0].join(' | ')} |`, `| ${rows[0].map(() => '---').join(' | ')} |`, ...rows.slice(1).map(r => `| ${r.join(' | ')} |`)].join('\n'));
      }
      else if (t === 'button') { if (n.classList.contains('src')) line += txt(n); }
      else if (t === 'svg' || t === 'details') { /* controls and icons, not content */ }
      else if (['div', 'section', 'article', 'figure'].includes(t)) {
        flush();
        // Consecutive list lines from sibling rows read as one list, not separate paragraphs.
        const s = blocks(n); if (s) out.push(s.replace(/\n\n(?=- )/g, '\n'));
      }
      else line += inline(n);
    });
    flush();
    return out.join('\n\n');
  }
  const plain = md => md.replace(/\*\*(.+?)\*\*/g, '$1').replace(/(^|\s)_(.+?)_(?=\s|$)/gm, '$1$2').replace(/^#### /gm, '');

  function build(format) {
    const now = new Date();
    const list = messages();
    const bodyOf = m => m.el.classList.contains('bubble-user') ? m.el.textContent.trim() : blocks(m.el);
    if (format === 'md') {
      return [`# ${title()}`, `_Exported ${stamp(now)} ${clock(now)} from BCT CRM_`,
        ...list.map(m => `### ${m.who}${m.time ? ` · ${m.time}` : ''}\n\n${bodyOf(m)}${m.sources ? `\n\n_Sources: ${m.sources}_` : ''}`)].join('\n\n') + '\n';
    }
    return [title(), `Exported ${stamp(now)} ${clock(now)} from BCT CRM`, '',
      ...list.map(m => `[${m.time}] ${m.who}\n${plain(bodyOf(m))}${m.sources ? `\nSources: ${m.sources}` : ''}\n`)].join('\n');
  }

  function download(format) {
    const name = `${title().replace(/[\\/:*?"<>|]/g, '_')}_${stamp(new Date())}.${format}`;
    const blob = new Blob([build(format)], { type: format === 'md' ? 'text/markdown;charset=utf-8' : 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    close();
    if (typeof toast === 'function') toast(`Exported ${name}`);
  }

  // ---- Panel: under the Export button, right-aligned; fixed so the header never clips it ----
  function place() {
    const r = btn.getBoundingClientRect();
    panel.style.top = `${r.bottom + 8}px`;
    panel.style.left = `${Math.max(12, Math.min(r.right - panel.offsetWidth, innerWidth - panel.offsetWidth - 12))}px`;
  }
  function open() {
    if (head.hidden) return;
    if (typeof closeHistMenu === 'function') closeHistMenu();
    panel.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    btn.classList.add('active');
    place();
    panel.querySelector('[data-export]').focus({ preventScroll: true });
  }
  function close(focusBtn = false) {
    if (panel.hidden) return;
    panel.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    btn.classList.remove('active');
    if (focusBtn) btn.focus();
  }

  btn.addEventListener('click', e => { e.stopPropagation(); panel.hidden ? open() : close(); });
  panel.addEventListener('click', e => {
    e.stopPropagation();
    const f = e.target.closest('[data-export]');
    if (f) download(f.dataset.export);
  });
  document.addEventListener('click', e => { if (!panel.hidden && !panel.contains(e.target)) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) { e.stopPropagation(); close(true); } }, true);
  addEventListener('resize', () => { if (!panel.hidden) place(); });
  // The header hides when the chat closes; the panel goes with it.
  new MutationObserver(() => { if (head.hidden) close(); }).observe(head, { attributes: true, attributeFilter: ['hidden'] });

  window.ChatExport = { open, close, build };
})();
