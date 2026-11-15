(function () {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let ci = 0;
  document.querySelectorAll('[data-chars]').forEach((el) => {
    const t = el.textContent;
    el.textContent = '';
    [...t].forEach((c) => {
      const sp = document.createElement('span');
      sp.className = 'ch';
      sp.style.setProperty('--i', ci++);
      sp.textContent = c;
      el.appendChild(sp);
    });
  });

  document.querySelectorAll('.xr .track').forEach((t) => {
    t.innerHTML = Array(6).fill(['Diseño', 'Arte', 'Dirección', 'Creación']).flat().map((x) => `<span>${x}</span>`).join('');
  });

  const mf = document.getElementById('manif');
  if (mf) {
    const nodes = [...mf.childNodes];
    mf.innerHTML = '';
    nodes.forEach((nd) => {
      if (nd.nodeType === 3) {
        nd.textContent.split(/(\s+)/).forEach((t) => {
          if (!t.trim()) { mf.append(t); return; }
          const s = document.createElement('span');
          s.className = 'w';
          s.textContent = t;
          mf.append(s);
        });
      } else { nd.classList.add('w'); mf.append(nd); }
    });
    const mw = [...mf.querySelectorAll('.w')];
    const manif = () => {
      const r = mf.getBoundingClientRect(), vh = innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      const n = Math.round(p * mw.length);
      mw.forEach((w, i) => w.classList.toggle('lit', reduce || i < n));
    };
    addEventListener('scroll', manif, { passive: true });
    addEventListener('resize', manif);
    manif();
  }
})();
