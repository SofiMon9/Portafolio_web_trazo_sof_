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
      const y = el.getBoundingClientRect().top + scrollY - 110;
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
      const zona = document.getElementById('stations');
      if (zona) { const r = zona.getBoundingClientRect(); tabs.classList.toggle('ver', r.top < innerHeight * 0.6 && r.bottom > innerHeight * 0.4); }
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
  const tendederos = [...document.querySelectorAll('.prints')];
  if (pr) {
    const PH = [
      { n: 'La entrega', k: 'Somos la Perla Fest', src: 'img/perla_entrega.jpg', alt: 'Asistente abriendo la camiseta del festival', r: -4, s: [8, 0.30, 14, 24, 6], h: [3, 6, 10, 16, 22, 28, 34, 38, 40, 38, 34, 30, 26, 22, 18, 14, 10, 8, 6, 4] },
      { n: 'La camiseta', k: 'Somos la Perla Fest', src: 'img/perla_camiseta.jpg', alt: 'Camiseta negra con el logo Somos la Perla Fest', r: 3, s: [-6, -0.35, 28, -18, -12], h: [30, 40, 42, 36, 28, 22, 16, 12, 10, 8, 7, 6, 5, 5, 4, 4, 3, 3, 2, 2] },
      { n: 'Perfil', k: 'Somos la Perla Fest', src: 'img/perla_perfil.jpg', alt: 'Retrato de perfil con gorra y gafas', r: -2, s: [10, 0.20, 12, 30, -4], h: [6, 10, 14, 18, 22, 26, 30, 34, 38, 40, 40, 36, 32, 28, 22, 18, 14, 10, 8, 5] },
      { n: 'Freestyle', k: 'Somos la Perla Fest', src: 'img/perla_freestyle.jpg', alt: 'Batalla de freestyle con micrófono en mano', r: 4, s: [4, 0.15, 20, 18, 14], h: [8, 14, 20, 26, 30, 32, 34, 36, 36, 34, 32, 30, 28, 24, 20, 16, 12, 9, 6, 4] },
      { g: 'prints2', n: 'El tendero', k: 'Tradición en canasta', src: 'img/canasta_tendero.jpg', alt: 'Retrato de un tendero frente a su tienda', r: 3, s: [14, 0.25, 18, 20, 16], h: [4, 8, 12, 18, 24, 30, 34, 38, 40, 40, 38, 34, 30, 26, 22, 18, 14, 10, 7, 5] },
      { g: 'prints2', n: 'Buen vecino', k: 'Tradición en canasta', src: 'img/canasta_freestyle.jpg', alt: 'Retrato sonriente frente a una tienda de barrio', r: -3, s: [10, 0.35, 12, 26, 12], h: [3, 6, 10, 14, 18, 24, 28, 32, 36, 40, 42, 40, 36, 30, 24, 18, 14, 10, 6, 4] },
      { g: 'prints2', n: 'La vecina', k: 'Tradición en canasta', src: 'img/canasta_vecina.jpg', alt: 'Retrato de una mujer en la entrada de su tienda', r: 2, s: [16, 0.30, 8, 22, 10], h: [2, 4, 8, 12, 18, 24, 30, 36, 40, 42, 40, 36, 32, 26, 20, 16, 12, 8, 5, 3] },
      { g: 'prints2', n: 'Con confianza', k: 'Tradición en canasta', src: 'img/canasta_confianza.jpg', alt: 'Mano escogiendo frutas: aquí se compra con confianza', r: -4, s: [20, 0.15, 22, 14, 24], h: [6, 10, 14, 20, 26, 32, 36, 38, 38, 36, 34, 30, 28, 26, 24, 20, 16, 12, 8, 5] },
    ];
    const SL = [
      ['Temperatura', '#4a7bbf', '#e2b45a', -30, 30, (v) => (v > 0 ? '+' : '') + v],
      ['Exposición', '#222', '#eee', -1, 1, (v) => (v > 0 ? '+' : '') + v.toFixed(2)],
      ['Contraste', '#555', '#ddd', -40, 40, (v) => (v > 0 ? '+' : '') + v],
      ['Sombras', '#222', '#888', -40, 40, (v) => (v > 0 ? '+' : '') + v],
      ['Saturación', '#888', '#d0465a', -40, 40, (v) => (v > 0 ? '+' : '') + v],
    ];
    const boton = (p, i) => `<button type="button" class="print" data-i="${i}" style="--r:${p.r}deg;--dl:${-i * 0.9}s" aria-label="${p.n}: ver ajustes de revelado"><span class="pin" aria-hidden="true"></span><span class="pic"><img src="${p.src}" alt="${p.alt}" loading="lazy"></span><span class="lb">${p.n}</span></button>`;
    tendederos.forEach((t) => { t.innerHTML = PH.map((p, i) => ((p.g || 'prints') === t.id ? boton(p, i) : '')).join(''); });
    const panel = (g) => document.querySelector(`.lr[data-g="${g}"]`);
    document.querySelectorAll('.lr').forEach((lr) => {
      lr.querySelector('.histo').innerHTML = Array(20).fill('<i></i>').join('');
      lr.querySelector('.sliders').innerHTML = SL.map((s) => `<div class="sl"><span>${s[0]}</span><span class="tr" style="--l:${s[1]};--r2:${s[2]}"><span class="kn"></span></span><output>0</output></div>`).join('');
    });
    const show = (i) => {
      const p = PH[i], g = p.g || 'prints', lr = panel(g);
      document.querySelectorAll(`#${g} .print`).forEach((b) => b.classList.toggle('on', +b.dataset.i === i));
      if (!lr) return;
      lr.querySelector('.lr-name').textContent = p.n + ' · ajustes de ejemplo';
      [...lr.querySelector('.histo').children].forEach((b, j) => { b.style.height = (p.h[j] / 44 * 100) + '%'; });
      [...lr.querySelector('.sliders').children].forEach((row, j) => {
        const s = SL[j], v = p.s[j];
        row.querySelector('.kn').style.left = ((v - s[3]) / (s[4] - s[3]) * 100) + '%';
        row.querySelector('output').textContent = s[5](v);
      });
    };
    tendederos.forEach((t) => ['pointerover', 'focusin', 'click'].forEach((ev) => t.addEventListener(ev, (e) => { const b = e.target.closest('.print'); if (b) show(+b.dataset.i); })));
    tendederos.forEach((t) => { const i = PH.findIndex((p) => (p.g || 'prints') === t.id); if (i >= 0) show(i); });
  }
})();
