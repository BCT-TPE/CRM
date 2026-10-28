/* Home page motion (2026-10-28).
     enter   first visit in a session: the bubble lands like a drop (small squish + ripple), the greeting and
             the cards rise in turn (~0.8 s). Coming back home later: a quick fade only.
     hover   a card lifts, its icon does a small move, and the bubble leans toward it (the water follows).
     leave   picking a card: the bubble thinks, the page fades, and the bubble flies into the conversation,
             landing exactly where the assistant's small face sits. Same image both ends, so the hand-off is seamless.
   Light moves only (small rise + fade). Everything is skipped with prefers-reduced-motion. */
(() => {
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)');
  const ease = 'cubic-bezier(.2,.7,.2,1)';
  const $ = s => document.querySelector(s);
  const hero = () => $('#hero');
  const faceEl = () => $('.hero-avatar .ai-face');
  const isHome = () => !document.body.classList.contains('chatting') && !document.body.classList.contains('viewing');

  /* ---------- enter ---------- */
  function enter(full) {
    if (REDUCED.matches || !isHome()) return;
    const h = hero(); if (!h) return;
    if (!full) { h.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: 'ease-out' }); return; }
    const av = $('.hero-avatar');
    av.animate([
      { opacity: 0, transform: 'translateY(-18px) scale(.88)' },
      { opacity: 1, transform: 'translateY(0) scale(1.05, .95)', offset: .68 },
      { transform: 'none' }
    ], { duration: 640, easing: ease, fill: 'backwards' });
    setTimeout(() => { const f = faceEl(); if (f) { f.classList.remove('landing'); void f.offsetWidth; f.classList.add('landing'); setTimeout(() => f.classList.remove('landing'), 900); } }, 430);
    const lines = [...h.querySelectorAll('#hero-greeting-line, .hero-brief')];
    lines.forEach((el, i) => el.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 360, delay: 220 + i * 110, easing: ease, fill: 'backwards' }));
    const blocks = [...h.querySelectorAll('#home-today, .home-chips-l, .home-chip, #home-pinned:not([hidden])')];
    blocks.forEach((el, i) => el.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 340, delay: 420 + i * 60, easing: ease, fill: 'backwards' }));
  }

  /* ---------- hover: lean toward the card ---------- */
  document.addEventListener('pointerover', e => {
    const card = e.target.closest && e.target.closest('.home-chip');
    if (!card || !isHome()) return;
    const f = faceEl(); if (!f) return;
    const a = f.getBoundingClientRect(), c = card.getBoundingClientRect();
    const dx = (c.left + c.width / 2) - (a.left + a.width / 2);
    AIFace.lean(f, dx / 380);
  });
  document.addEventListener('pointerout', e => {
    const card = e.target.closest && e.target.closest('.home-chip');
    if (!card || (e.relatedTarget && card.contains(e.relatedTarget))) return;
    const f = faceEl(); if (f) AIFace.lean(f, 0);
  });

  /* ---------- leave: think, fade, fly into the chat ---------- */
  let flying = false;
  // Snapshot the bubble before the home page hides; returns fly() to call once the chat is on screen.
  function capture() {
    const f = faceEl();
    if (!f || REDUCED.matches || !isHome()) return () => {};
    const r = f.getBoundingClientRect();
    const src = f.querySelector('.base').getAttribute('src');
    return () => fly(r, src);
  }
  function fly(from, src) {
    const target = [...document.querySelectorAll('#thread .msg-ai .ai-face-sm')].pop();
    if (!target) return;
    const to = target.getBoundingClientRect();
    const img = document.createElement('img');
    img.src = src; img.alt = ''; img.className = 'ai-fly';
    img.style.cssText = `left:${from.left}px;top:${from.top}px;width:${from.width}px;height:${from.height}px`;
    document.body.appendChild(img);
    target.style.visibility = 'hidden';
    const k = to.width / from.width;
    const anim = img.animate([
      { transform: 'none' },
      { transform: `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${k})` }
    ], { duration: 420, easing: 'cubic-bezier(.45,.05,.25,1)', fill: 'forwards' }); // lands before the opening line replaces the typing dots (450 ms)
    const done = () => { img.remove(); const t = [...document.querySelectorAll('#thread .msg-ai .ai-face-sm')].pop(); if (t) t.style.visibility = ''; target.style.visibility = ''; flying = false; };
    anim.onfinish = done; anim.oncancel = done;
  }
  // Card click: think for a beat while the page fades, then open the conversation and fly.
  function leave(run) {
    const f = faceEl();
    if (REDUCED.matches || !f || !isHome() || flying) { run(); return; }
    flying = true;
    AIFace.lean(f, 0);
    AIFace.face(f, 'think');
    const h = hero();
    [...h.querySelectorAll('.hero-text, #home-today, .home-chips, #home-pinned')].forEach(el => el.animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(4px)' }], { duration: 180, easing: 'ease-in', fill: 'forwards' }));
    $('.hero-avatar').animate([{ transform: 'none' }, { transform: 'translateY(-5px)' }, { transform: 'none' }], { duration: 260, easing: ease });
    const go = capture();
    setTimeout(() => {
      run();
      go();
      // restore the home page underneath for next time
      h.getAnimations({ subtree: true }).forEach(a => a.cancel());
      AIFace.face(f, 'neutral');
      setTimeout(() => { flying = false; }, 500);
    }, 230);
  }

  window.HomeMotion = { enter, leave, capture, isHome };

  // First load of this session gets the full entrance; later loads a quick fade.
  let first = true;
  try { first = !sessionStorage.getItem('bct-home-intro'); sessionStorage.setItem('bct-home-intro', '1'); } catch (e) {}
  enter(first);
})();
