(function () {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const wsEl = document.getElementById('ws');
  if (wsEl) {
    document.querySelectorAll('.layers li').forEach((li) => {
      const on = () => {
        wsEl.dataset.hl = li.dataset.hl;
        document.querySelectorAll('.layers li').forEach((x) => x.classList.toggle('on', x === li));
      };
      li.addEventListener('pointerenter', on);
      li.addEventListener('click', on);
      li.addEventListener('pointerleave', () => { delete wsEl.dataset.hl; li.classList.remove('on'); });
    });
  }

  const tabs = document.getElementById('ptabs');
  if (tabs) {
    const btns = [...tabs.querySelectorAll('button')];
    const st = (t) => document.querySelector(`.stn[data-cat="${t}"]`);
    const irA = (el) => {
      const y = el.getBoundingClientRect().top + scrollY - 150;
      window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    };
    tabs.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      const el = st(b.dataset.t);
      if (el) irA(el);
    });
    const mark = () => {
      let cur = btns[0];
      btns.forEach((b) => { const el = st(b.dataset.t); if (el && el.getBoundingClientRect().top < innerHeight * 0.45) cur = b; });
      btns.forEach((b) => b.setAttribute('aria-current', b === cur));
      tabs.scrollLeft = cur.offsetLeft - tabs.clientWidth / 2 + cur.clientWidth / 2;
    };
    addEventListener('scroll', mark, { passive: true });
    mark();

    const id = decodeURIComponent(location.hash.slice(1));
    const destino = id && document.getElementById(id);
    if (destino && destino.classList.contains('stn')) setTimeout(() => irA(destino), 500);
  }

  const tcs = [...document.querySelectorAll('.tc')];
  if (tcs.length) {
    const t0 = performance.now();
    const fmt = (ms, o) => {
      const f = Math.floor(ms / 1000 * 24) + o * 24 * 37;
      const fr = f % 24, s = Math.floor(f / 24) % 60, m = Math.floor(f / 1440) % 60, h = Math.floor(f / 86400);
      return [h, m, s, fr].map((n) => String(n).padStart(2, '0')).join(':');
    };
    if (reduce) tcs.forEach((t) => { t.textContent = fmt(0, +t.dataset.tc); });
    else (function loop(t) { tcs.forEach((e) => { e.textContent = fmt(t - t0, +e.dataset.tc); }); requestAnimationFrame(loop); })(t0);
  }

  const pr = document.getElementById('prints');
  if (pr) {
    const PH = [
      { n: 'Producto 01', k: 'Producto', a: '#D9C4B8', b: '#B96B52', r: -4, s: [12, 0.35, 18, 22, -6], h: [2, 4, 7, 12, 18, 26, 34, 40, 44, 42, 36, 30, 26, 22, 18, 14, 10, 8, 6, 4] },
      { n: 'Retrato 01', k: 'Retrato', a: '#E8B4B0', b: '#5C1A30', r: 3, s: [-8, 0.15, -10, 35, -14], h: [4, 8, 14, 22, 30, 36, 38, 36, 32, 28, 24, 22, 20, 18, 16, 14, 12, 10, 6, 3] },
      { n: 'Set 01', k: 'Set', a: '#B96B52', b: '#1a0408', r: -2, s: [20, -0.40, 26, -12, 10], h: [20, 30, 38, 40, 36, 30, 24, 20, 16, 14, 12, 10, 10, 8, 8, 6, 6, 5, 4, 3] },
    ];
    const SL = [
      ['Temperatura', '#4a7bbf', '#e2b45a', -30, 30, (v) => (v > 0 ? '+' : '') + v],
      ['Exposición', '#222', '#eee', -1, 1, (v) => (v > 0 ? '+' : '') + v.toFixed(2)],
      ['Contraste', '#555', '#ddd', -40, 40, (v) => (v > 0 ? '+' : '') + v],
      ['Sombras', '#222', '#888', -40, 40, (v) => (v > 0 ? '+' : '') + v],
      ['Saturación', '#888', '#d0465a', -40, 40, (v) => (v > 0 ? '+' : '') + v],
    ];
    pr.innerHTML = PH.map((p, i) => `<button type="button" class="print" data-i="${i}" style="--r:${p.r}deg;--dl:${-i * 0.9}s" aria-label="${p.n}: ver ajustes de revelado"><span class="pin" aria-hidden="true"></span><span class="pic" style="--a:${p.a};--b:${p.b}"><span><span class="script">${p.k.toLowerCase()}</span>espacio para tu foto</span></span><span class="lb">${p.n}</span></button>`).join('');
    const histo = document.getElementById('histo');
    histo.innerHTML = Array(20).fill('<i></i>').join('');
    const sliders = document.getElementById('sliders');
    sliders.innerHTML = SL.map((s) => `<div class="sl"><span>${s[0]}</span><span class="tr" style="--l:${s[1]};--r2:${s[2]}"><span class="kn"></span></span><output>0</output></div>`).join('');
    const show = (i) => {
      const p = PH[i];
      document.getElementById('lrName').textContent = p.n + ' · ajustes de ejemplo';
      pr.querySelectorAll('.print').forEach((b, j) => b.classList.toggle('on', j === i));
      [...histo.children].forEach((b, j) => { b.style.height = (p.h[j] / 44 * 100) + '%'; });
      [...sliders.children].forEach((row, j) => {
        const s = SL[j], v = p.s[j];
        row.querySelector('.kn').style.left = ((v - s[3]) / (s[4] - s[3]) * 100) + '%';
        row.querySelector('output').textContent = s[5](v);
      });
    };
    pr.addEventListener('pointerover', (e) => { const b = e.target.closest('.print'); if (b) show(+b.dataset.i); });
    pr.addEventListener('focusin', (e) => { const b = e.target.closest('.print'); if (b) show(+b.dataset.i); });
    pr.addEventListener('click', (e) => { const b = e.target.closest('.print'); if (b) show(+b.dataset.i); });
    show(0);
  }
})();
