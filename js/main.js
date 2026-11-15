(function () {
  'use strict';

  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pagina = document.body.dataset.pagina || '';

  const sysDark = () => matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = () => (root.dataset.theme ? root.dataset.theme === 'dark' : sysDark());
  function syncSwitch() {
    document.querySelectorAll('.theme').forEach((b) => {
      b.setAttribute('aria-checked', isDark());
      b.setAttribute('aria-label', isDark() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    });
  }
  syncSwitch();
  document.querySelectorAll('.theme').forEach((b) => b.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('sof-theme', next); } catch (_) {}
    syncSwitch();
  }));
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', syncSwitch);

  const toast = document.getElementById('toast');
  let tt;
  function say(m) {
    if (!toast) return;
    toast.textContent = m;
    toast.classList.add('show');
    clearTimeout(tt);
    tt = setTimeout(() => toast.classList.remove('show'), 2200);
  }
  window.TRAZO_say = say;
  async function copy(t, m) {
    try { await navigator.clipboard.writeText(t); say(m); } catch (_) { say(t); }
  }
  const btnCopy = document.getElementById('copy');
  if (btnCopy) btnCopy.onclick = () => copy('somonjara2005@gmail.com', 'Correo copiado');
  document.addEventListener('click', (e) => {
    const s = e.target.closest('[data-hex]');
    if (s) copy(s.dataset.hex, 'Color ' + s.dataset.hex + ' copiado');
  });
  const skip = document.getElementById('skip');
  if (skip) skip.onclick = (e) => { e.preventDefault(); document.getElementById('main').focus(); };

  const nav = document.getElementById('nav');
  const mb = document.querySelector('.menu-btn');
  const mega = document.getElementById('mega');
  function toggleMenu(o) {
    if (!mega) return;
    if (mb) mb.setAttribute('aria-expanded', o);
    mega.classList.toggle('open', o);
    document.body.style.overflow = o ? 'hidden' : '';
    if (nav) nav.classList.remove('hide');
  }
  if (mb) mb.onclick = () => toggleMenu(mb.getAttribute('aria-expanded') !== 'true');
  const whatido = document.querySelector('.whatido');
  if (whatido) whatido.addEventListener('click', () => toggleMenu(!mega.classList.contains('open')));
  document.addEventListener('click', (e) => { if (e.target.closest('[data-menu]')) { e.preventDefault(); toggleMenu(true); } });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') toggleMenu(false); });

  let ly = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY;
    if (nav) nav.classList.toggle('hide', y > ly && y > 400 && !(mega && mega.classList.contains('open')));
    ly = y;
  }, { passive: true });

  function tick() {
    try {
      const t = new Intl.DateTimeFormat('es-CO', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Bogota' }).format(new Date());
      document.querySelectorAll('[data-clock]').forEach((c) => { c.textContent = 'Pereira · ' + t; });
    } catch (_) {}
  }
  tick();
  setInterval(tick, 30000);

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-buy]');
    if (!b) return;
    e.preventDefault();
    const plan = b.dataset.buy, w = b.dataset.w;
    const t = `Hola Sof, quiero adquirir el plan “${plan}”${w && w !== 'Planes' ? ' (' + w + ')' : ''}. ¿Me cuentas cómo empezamos?`;
    say('Abriendo WhatsApp…');
    window.open('https://wa.me/573225374248?text=' + encodeURIComponent(t), '_blank', 'noopener');
  });

  const scrollToAnchor = (k) => {
    if (k === 'top') { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); return; }
    const t = document.querySelector(`[data-anchor="${k}"]`);
    if (t) t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  };

  const wipe = [...document.querySelectorAll('.wipe span')];
  let busy = false;
  function go(href) {
    if (reduce || busy || !wipe.length) { location.href = href; return; }
    busy = true;
    try { sessionStorage.setItem('sof-wipe', '1'); } catch (_) {}
    const ins = wipe.map((s, i) => s.animate(
      [{ transform: 'scaleX(0)', transformOrigin: 'left' }, { transform: 'scaleX(1)', transformOrigin: 'left' }],
      { duration: 360, delay: i * 55, easing: 'cubic-bezier(.7,0,.3,1)', fill: 'forwards' }));
    ins[ins.length - 1].finished.then(() => { location.href = href; });
  }
  if (root.classList.contains('llegando')) {
    wipe.forEach((s, i) => s.animate(
      [{ transform: 'scaleX(1)', transformOrigin: 'right' }, { transform: 'scaleX(0)', transformOrigin: 'right' }],
      { duration: 420, delay: 80 + i * 55, easing: 'cubic-bezier(.7,0,.3,1)', fill: 'forwards' }));
    setTimeout(() => root.classList.remove('llegando'), 60);
  }
  addEventListener('pageshow', (e) => {
    if (e.persisted) { wipe.forEach((s) => s.getAnimations().forEach((a) => a.cancel())); busy = false; }
  });

  document.addEventListener('click', (e) => {
    const s = e.target.closest('[data-scroll]');
    if (s) { e.preventDefault(); toggleMenu(false); scrollToAnchor(s.dataset.scroll); return; }
    const a = e.target.closest('a[data-go]');
    if (!a || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    toggleMenu(false);
    go(a.getAttribute('href'));
  });

  const io = new IntersectionObserver((es) => es.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { threshold: 0.12 });
  const observarRv = () => document.querySelectorAll('.rv:not(.in)').forEach((el) => io.observe(el));
  observarRv();
  window.TRAZO_observarRv = observarRv;
  let revisando = false;
  const revisar = () => {
    revisando = false;
    document.querySelectorAll('.rv:not(.in)').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.92 && r.bottom > 0) { el.classList.add('in'); io.unobserve(el); }
    });
  };
  const pedir = () => { if (!revisando) { revisando = true; setTimeout(revisar, 60); } };
  addEventListener('scroll', pedir, { passive: true });
  addEventListener('resize', pedir);
  addEventListener('load', pedir);
  setTimeout(pedir, 600);

  document.querySelectorAll('.espacio-img[data-src]').forEach((espacio) => {
    const img = new Image();
    img.onload = () => { img.alt = espacio.dataset.alt || ''; espacio.replaceChildren(img); espacio.classList.add('con-imagen'); };
    img.src = espacio.dataset.src;
  });

  (function () {
    const SH = [
      '<path fill="currentColor" d="M50 0C54 36 64 46 100 50 64 54 54 64 50 100 46 64 36 54 0 50 36 46 46 36 50 0z"/>',
      '<path fill="currentColor" d="M50 0l7 30 25-18-15 27 31 1-29 11 20 24-28-13-3 31-8-30-8 30-3-31-28 13 20-24L2 40l31-1L18 12l25 18z"/>',
      '<circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="6" stroke-dasharray="10 10"/>',
      '<path fill="currentColor" d="M50 8a42 42 0 1 0 0 84a30 30 0 1 1 0-84z"/>',
      '<path fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" d="M5 60c15-30 30 30 45 0s30 30 45 0"/>',
      '<path fill="currentColor" d="M50 14c9-16 34-8 26 12 20-2 26 24 6 30 12 16-6 36-22 24-6 20-32 14-30-6-20 4-30-22-12-30-14-14 4-38 22-26 0-6 4-10 10-4z"/>',
      '<circle cx="50" cy="50" r="22" fill="currentColor"/>'];
    const COL = ['var(--accent)', 'var(--rosa)', 'var(--terra)'];
    let seed = 7;
    const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    document.querySelectorAll('main section:not(.hero), main .stn').forEach((sec) => {
      if (sec.classList.contains('darkroom') || sec.querySelector(':scope > .deco')) return;
      const d = document.createElement('div');
      d.className = 'deco';
      d.setAttribute('aria-hidden', 'true');
      const n = 4 + Math.floor(rnd() * 3);
      let h = '';
      for (let i = 0; i < n; i++) {
        const k = Math.floor(rnd() * SH.length), s = Math.round(28 + rnd() * 70), x = (i % 2 ? 60 : 2) + rnd() * 36, y = 4 + rnd() * 86,
          o = (0.06 + rnd() * 0.07).toFixed(2), spin = (k < 2 && rnd() > 0.5);
        h += `<svg viewBox="0 0 100 100" class="${spin ? 'sp' : ''}" style="left:${x.toFixed(1)}%;top:${y.toFixed(1)}%;--s:${s}px;--o:${o};--dc:${COL[Math.floor(rnd() * 3)]};--dur:${(spin ? 30 : 6) + Math.round(rnd() * 8)}s;--dl:${(-rnd() * 6).toFixed(1)}s;--rr:${Math.round(rnd() * 40 - 20)}deg">${SH[k]}</svg>`;
      }
      d.innerHTML = h;
      sec.prepend(d);
    });
  })();

  if (pagina !== 'entrada') { try { sessionStorage.setItem('sof-intro', '1'); } catch (_) {} }
})();
