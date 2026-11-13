/* =========================================================
   TRAZO · Sobre mí
   sobre-mi.js · solo sobre-mi.html
   ========================================================= */
(function () {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const { P, rutaProyecto } = window.TRAZO;


  /* ---------- Carnet: se mece al llegar y se puede arrastrar ---------- */
  const lyd = document.getElementById('lanyard');
  if (lyd) {
    if (!reduce) lyd.classList.add('swing-in');
    let sx = null, pid = null;
    lyd.addEventListener('pointerdown', (e) => {
      pid = e.pointerId; sx = e.clientX;
      lyd.setPointerCapture(pid);
      lyd.classList.add('live');
      lyd.classList.remove('swing-in');
    });
    lyd.addEventListener('pointermove', (e) => {
      if (e.pointerId !== pid) return;
      const r = Math.max(-28, Math.min(28, (e.clientX - sx) * -0.12));
      lyd.style.transform = `rotate(${r}deg)`;
    });
    const rel = (e) => {
      if (e.pointerId !== pid) return;
      pid = null;
      lyd.classList.remove('live');
      lyd.style.transform = '';
    };
    lyd.addEventListener('pointerup', rel);
    lyd.addEventListener('pointercancel', rel);
  }


  /* ---------- Teclado de herramientas ---------- */
  // [sigla, programa, color, frase, descripción, proyectos donde aparece, otros enlaces]
  const KB = [
    ['Ai', 'Illustrator', 'k-ro', 'todos los días', 'Logos, isotipos e ilustración. Aquí nacen los sistemas de marca, de la primera línea al manual.', ['provet-marca', 'boticaria', 'grotesco']],
    ['Ps', 'Photoshop', 'k-bl', 'retoque y composición', 'Retoque, composición y mockups. Aquí las piezas se ven reales antes de imprimirse o publicarse.', ['provet-redes', 'museos']],
    ['Lr', 'Lightroom', 'k-vi', 'color y luz', 'Revelado y edición de color para fotografía de producto, retrato y set.', [], [['En cámara', 'proyectos.html#en-camara']]],
    ['VS', 'VS Code', 'k-te', 'de la idea al código', 'Maquetación de páginas web con HTML, CSS y JavaScript, como este portafolio.', [], [['Este portafolio', 'inicio.html']]],
    ['Fg', 'Figma', 'k-te', 'de la idea a la pantalla', 'Wireframes, interfaces y prototipos, como la app TRAZO y el mockup de esta web.', [], [['App TRAZO', null]]],
    ['Cc', 'CapCut', 'k-ro', 'para reels', 'Edición de reels y videos cortos con ritmo y con la estética de cada marca.', ['provet-redes']],
    ['◉', 'Fotografía', 'k-vi', 'la mirada', 'Producto, retrato y fotos de set: luz, encuadre y revelado.', [], [['En cámara', 'proyectos.html#en-camara']]],
  ];
  const keysEl = document.getElementById('keys');
  const kp = document.getElementById('kpanel');
  if (keysEl && kp) {
    keysEl.innerHTML = KB.map((k, i) => `<button type="button" class="key ${k[2]}${i === 6 ? ' wide' : ''}" aria-pressed="${i === 0}" data-k="${i}"><i>${i + 1}</i><b>${k[0]}</b><span>${k[1]}</span></button>`).join('');
    const showKey = (i) => {
      const k = KB[i];
      keysEl.querySelectorAll('.key').forEach((b, j) => b.setAttribute('aria-pressed', j === i));
      let ap = k[5].map((id) => {
        const p = P.find((x) => x.id === id);
        return p ? `<a href="${rutaProyecto(p.id)}" data-go class="chip">${p.title}${P.filter((x) => x.title === p.title).length > 1 ? ' · ' + p.cat : ''}</a>` : '';
      }).join('');
      ap += (k[6] || []).map(([t, h]) => (h ? `<a href="${h}" data-go class="chip">${t}</a>` : `<span class="chip">${t}</span>`)).join('');
      kp.innerHTML = `<h3>${k[1]} <span class="script">${k[3]}</span></h3><p>${k[4]}</p><h4>Aparece en</h4><div class="chips">${ap}</div>`;
      kp.classList.remove('swap');
      void kp.offsetWidth;
      if (!reduce) kp.classList.add('swap');
    };
    keysEl.addEventListener('click', (e) => { const b = e.target.closest('.key'); if (b) showKey(+b.dataset.k); });
    // Números del 1 al 7
    addEventListener('keydown', (e) => {
      if (e.target.closest('input,textarea')) return;
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= KB.length) showKey(n - 1);
    });
    showKey(0);
  }
})();
