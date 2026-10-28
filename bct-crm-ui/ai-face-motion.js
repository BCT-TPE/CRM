/* AI face motion: the wave bubble (assets/ai/ai-face.webp) comes alive without new artwork.
     idle   the waves drift very slowly (optional), the eyes blink every 2.5–5.5 s
     click  splash: the waves wobble and settle like real water (~1.2 s), happy face, a ripple and a few droplets.
            Repeated clicks add energy, capped.
   How: a second copy of the image is masked to the lower (wave) part and clipped to the bubble, then run through
   an SVG turbulence + displacement filter. The face lives only in the base image, so it never distorts.
   Eyelids: two patches in the glass colour over the eyes of ai-face.webp (centres 36.9% / 62.2% across, 33.7% down).
   Usage: AIFace.mount(el, { idle: true }) on markup from AIFace.html(). Respects prefers-reduced-motion. */
(() => {
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)');
  const SRC = { base: 'assets/ai/ai-face.webp', happy: 'assets/ai/ai-face-happy.webp' };
  let uid = 0;

  function html(cls = '', label = 'Say hi to your assistant', root = '') {
    return `<button type="button" class="ai-face ${cls}" aria-label="${label}">
      <img class="base" src="${root}${SRC.base}" alt="">
      <img class="wave" src="${root}${SRC.base}" alt="" aria-hidden="true">
      <i class="lid l"></i><i class="lid r"></i>
      <span class="ripple" aria-hidden="true"></span>
      <span class="drops" aria-hidden="true"></span>
    </button>`;
  }

  const instances = new Set();

  function mount(host, opts = {}) {
    if (!host || host.dataset.mounted) return;
    host.dataset.mounted = '1';
    const root = opts.root || '';
    const id = 'aiw' + (++uid);
    const NS = 'http://www.w3.org/2000/svg';
    const defs = document.createElementNS(NS, 'svg');
    defs.setAttribute('width', '0'); defs.setAttribute('height', '0'); defs.setAttribute('aria-hidden', 'true');
    defs.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    defs.innerHTML = `<filter id="${id}" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.010 0.050" numOctaves="2" seed="7" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter>`;
    document.body.appendChild(defs);
    const turb = defs.querySelector('feTurbulence'), disp = defs.querySelector('feDisplacementMap');
    const base = host.querySelector('.base'), wave = host.querySelector('.wave');
    wave.style.filter = `url(#${id})`;

    const st = { host, base, wave, turb, disp, defs, energy: 0, lean: 0, leanNow: 0, idle: opts.idle !== false, nextBlink: 0, happyUntil: 0, t0: performance.now(), last: performance.now(), root };
    instances.add(st);

    const splash = () => {
      const now = performance.now();
      st.happyUntil = now + 950;
      base.src = root + SRC.happy; host.classList.add('happy');
      if (!REDUCED.matches) {
        st.energy = Math.min(1.6, st.energy + 1);
        host.classList.remove('splash'); void host.offsetWidth; host.classList.add('splash');
        drops(host);
      }
    };
    host.addEventListener('click', splash);
    st.splash = splash;
    return st;
  }

  function drops(host) {
    const layer = host.querySelector('.drops'); if (!layer) return;
    layer.innerHTML = '';
    const W = host.getBoundingClientRect().width || 96;
    for (let i = 0; i < 6; i++) {
      const d = document.createElement('i');
      const a = (-150 + i * 24 + (Math.random() - .5) * 14) * Math.PI / 180; // a fan over the top
      // spray from the rim outward, so droplets never cross the face
      const r0 = W * .34, dist = W * (.48 + Math.random() * .16);
      d.style.setProperty('--sx', `${(Math.cos(a) * r0).toFixed(1)}px`);
      d.style.setProperty('--sy', `${(Math.sin(a) * r0).toFixed(1)}px`);
      d.style.setProperty('--dx', `${(Math.cos(a) * dist).toFixed(1)}px`);
      d.style.setProperty('--dy', `${(Math.sin(a) * dist).toFixed(1)}px`);
      d.style.setProperty('--delay', `${Math.round(Math.random() * 60)}ms`);
      layer.appendChild(d);
    }
    setTimeout(() => { layer.innerHTML = ''; }, 900);
  }

  function blink(st) {
    const h = st.host;
    h.classList.remove('blinking'); void h.offsetWidth; h.classList.add('blinking');
    setTimeout(() => h.classList.remove('blinking'), 180);
  }

  function frame(now) {
    instances.forEach(st => {
      if (!st.host.isConnected) { st.defs.remove(); instances.delete(st); return; }
      const dt = Math.min(.05, (now - st.last) / 1000); st.last = now;
      const t = (now - st.t0) / 1000;
      const k = (st.host.getBoundingClientRect().width || 96) / 240; // filter scale is in pixels
      st.energy *= Math.exp(-dt / .5);
      if (st.energy < .002) st.energy = 0;
      const idleAmp = st.idle && !REDUCED.matches ? 2.4 : 0;
      st.disp.setAttribute('scale', ((idleAmp + st.energy * 22) * k).toFixed(2));
      const fx = .010 + .0025 * Math.sin(t * .55), fy = .050 + .012 * Math.sin(t * .4 + 1);
      st.turb.setAttribute('baseFrequency', `${fx.toFixed(4)} ${fy.toFixed(4)}`);
      const slosh = st.energy * Math.sin(t * 10);
      // lean: the bubble tips toward what you are pointing at and the water follows (eased)
      st.leanNow += (st.lean - st.leanNow) * Math.min(1, dt * 7);
      if (Math.abs(st.leanNow) < .002) st.leanNow = 0;
      const rot = slosh * 3.2 + st.leanNow * 7;
      st.wave.style.transform = (st.energy || st.leanNow) ? `translateY(${(st.energy * 2.2 * k).toFixed(2)}px) rotate(${rot.toFixed(2)}deg)` : '';
      st.host.style.transform = st.leanNow ? `translateX(${(st.leanNow * 3).toFixed(2)}px) rotate(${(st.leanNow * 6).toFixed(2)}deg)` : '';
      // back to the neutral face after a splash
      if (st.happyUntil && now > st.happyUntil) { st.happyUntil = 0; st.base.src = st.root + SRC.base; st.host.classList.remove('happy'); }
      // blinks
      if (!REDUCED.matches && !st.host.classList.contains('happy') && !st.host.classList.contains('busy')) {
        if (!st.nextBlink) st.nextBlink = now + 800 + Math.random() * 2200;
        else if (now > st.nextBlink) { blink(st); if (Math.random() < .2) setTimeout(() => blink(st), 320); st.nextBlink = now + 2500 + Math.random() * 3000; }
      }
    });
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  window.AIFace = {
    html, mount,
    setIdle(on) { instances.forEach(st => { st.idle = on; }); },
    get(host) { for (const st of instances) if (st.host === host) return st; return null; },
    lean(host, x) { const st = this.get(host); if (st && !REDUCED.matches) st.lean = Math.max(-1, Math.min(1, x)); },
    face(host, kind) { const st = this.get(host); if (!st) return; st.base.src = st.root + ({ think: 'assets/ai/ai-face-think.webp', happy: SRC.happy }[kind] || SRC.base); host.classList.toggle('busy', kind === 'think'); },
    splashAll() { instances.forEach(st => st.splash()); }
  };
})();
