/* Tooltips (2026-10-28): one dark tooltip for the whole app, built once.
   [data-tip]        text to show; [data-tip-h] optional bold first line.
   .tip-def          a title or label that explains a number: dotted underline, focusable.
   [data-tip-cols]   a chart whose children carry data-tip: the column under the pointer wins,
                     so thin or short bars are easy to hit.
   Shows after 300 ms; moving straight to the next target shows it at once. Hides at once. */
(() => {
  const tip = document.createElement('div');
  tip.className = 'bct-tip'; tip.id = 'bct-tip'; tip.setAttribute('role', 'tooltip'); tip.hidden = true;
  document.body.appendChild(tip);

  let cur = null, timer = 0, lastHide = 0;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  function fill(el){
    tip.textContent = '';
    if (el.dataset.tipH) { const h = document.createElement('b'); h.textContent = el.dataset.tipH; tip.appendChild(h); }
    const p = document.createElement('span'); p.textContent = el.dataset.tip; tip.appendChild(p);
  }
  function place(el){
    const r = el.getBoundingClientRect(), gap = 8, pad = 8;
    tip.style.left = '0px'; tip.style.top = '0px';
    const w = tip.offsetWidth, h = tip.offsetHeight;
    let below = r.top - h - gap < pad;
    const top = below ? r.bottom + gap : r.top - h - gap;
    const cx = r.left + r.width / 2;
    const left = Math.max(pad, Math.min(innerWidth - w - pad, cx - w / 2));
    tip.style.left = left + 'px'; tip.style.top = top + 'px';
    tip.style.setProperty('--ax', (cx - left) + 'px');
    tip.classList.toggle('below', below);
  }
  function show(el, now){
    if (cur === el) return;
    clearTimeout(timer);
    if (cur) cur.classList.remove('tip-on');
    cur = el; el.classList.add('tip-on');
    // Already showing (or just hidden): swap at once, no fade, so sweeping across bars doesn't flicker.
    const swap = !tip.hidden || Date.now() - lastHide < 300;
    const go = () => {
      if (cur !== el || !el.isConnected) return;
      fill(el); tip.hidden = false; place(el);
      if (!reduced.matches && !swap) tip.animate([{ opacity: 0, transform: `translateY(${tip.classList.contains('below') ? -4 : 4}px)` }, { opacity: 1, transform: 'none' }], { duration: 140, easing: 'ease-out' });
    };
    if (now || swap) go(); else timer = setTimeout(go, 300);
  }
  function hide(){
    clearTimeout(timer);
    if (cur) cur.classList.remove('tip-on');
    if (!tip.hidden) lastHide = Date.now();
    cur = null; tip.hidden = true;
  }
  function target(e){
    const cols = e.target.closest?.('[data-tip-cols]');
    if (cols) {
      const x = e.clientX, kids = [...cols.querySelectorAll('[data-tip]')];
      return kids.reduce((best, k) => { const r = k.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - x); return !best || d < best.d ? { k, d } : best; }, null)?.k || null;
    }
    return e.target.closest?.('[data-tip]') || null;
  }

  document.addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') return;
    const el = target(e); el ? show(el) : cur && hide();
  }, { passive: true });
  document.addEventListener('pointerleave', hide);
  // Touch: tap to show, tap elsewhere to hide. Taps still reach the page.
  document.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'touch') return;
    const el = target(e); el && el !== cur ? show(el, true) : hide();
  });
  document.addEventListener('focusin', e => { const el = e.target.closest?.('[data-tip]'); el ? show(el, true) : hide(); });
  document.addEventListener('focusout', hide);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') hide(); });
  addEventListener('scroll', hide, true);
  addEventListener('resize', hide);
})();
