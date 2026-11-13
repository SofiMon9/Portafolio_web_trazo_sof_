/* =========================================================
   TRAZO · Proyectos ("Todo el archivo")
   proyectos.js · solo para proyectos.html
   ========================================================= */
(() => {
  'use strict';

  const movimientoReducido = matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* ---------- 1. Pestañas fijas: se marca el área que estás viendo ---------- */
  const pestanas = [...document.querySelectorAll('.pestana')];
  const areas = pestanas.map((p) => document.querySelector(p.getAttribute('href'))).filter(Boolean);

  const marcarPestana = (id) => {
    pestanas.forEach((p) => {
      const activa = p.getAttribute('href') === `#${id}`;
      p.setAttribute('aria-current', activa ? 'true' : 'false');
      if (activa) {
        // en celular, la fila de pestañas se desliza para mostrar la marcada
        const fila = p.parentElement;
        fila.scrollTo({ left: p.offsetLeft - fila.clientWidth / 2 + p.offsetWidth / 2, behavior: movimientoReducido ? 'auto' : 'smooth' });
      }
    });
  };

  const observadorAreas = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => { if (e.isIntersecting) marcarPestana(e.target.id); });
  }, { rootMargin: '-45% 0px -50% 0px' });
  areas.forEach((a) => observadorAreas.observe(a));


  /* ---------- 2. En lo gráfico: capas y mesas de trabajo ---------- */
  const ventanaAi = document.querySelector('.ai');
  if (ventanaAi) {
    const capas = ventanaAi.querySelectorAll('.ai-capas button');
    const miniaturas = ventanaAi.querySelectorAll('.ai-miniaturas button');
    const mesas = ventanaAi.querySelectorAll('.mesa');

    // Al pasar el cursor por una capa, se selecciona esa parte en las marcas
    const elegirCapa = (capa) => {
      ventanaAi.dataset.capa = capa || '';
      capas.forEach((c) => c.classList.toggle('activa', c.dataset.capa === capa));
    };
    capas.forEach((c) => {
      c.addEventListener('mouseenter', () => elegirCapa(c.dataset.capa));
      c.addEventListener('focus', () => elegirCapa(c.dataset.capa));
      c.addEventListener('click', () => elegirCapa(ventanaAi.dataset.capa === c.dataset.capa ? '' : c.dataset.capa));
    });
    ventanaAi.querySelector('.ai-capas').addEventListener('mouseleave', () => elegirCapa(''));

    // Las miniaturas eligen una mesa de trabajo
    const elegirMesa = (num) => {
      mesas.forEach((m) => m.classList.toggle('elegida', m.dataset.mesa === num));
      miniaturas.forEach((b) => b.setAttribute('aria-pressed', b.dataset.mesa === num ? 'true' : 'false'));
    };
    miniaturas.forEach((b) => {
      b.addEventListener('mouseenter', () => elegirMesa(b.dataset.mesa));
      b.addEventListener('click', () => elegirMesa(b.dataset.mesa));
    });
    ventanaAi.querySelector('.ai-miniaturas').addEventListener('mouseleave', () => elegirMesa(''));
  }


  /* ---------- 3. En cámara: fotos y panel de revelado ---------- */
  // Ajustes de ejemplo de cada foto (pendiente: poner los reales).
  // Exposición va de -5 a 5; los demás de -100 a 100.
  // "histograma": 20 alturas (de 0 a 100) para las barras.
  const REVELADO = {
    'producto-01': {
      titulo: 'Producto 01 · ajustes de ejemplo',
      temperatura: 12, exposicion: 0.4, contraste: 15, sombras: 20, saturacion: 6,
      histograma: [6, 10, 14, 18, 26, 34, 44, 56, 66, 74, 80, 84, 82, 76, 64, 50, 38, 26, 14, 8],
    },
    'retrato-01': {
      titulo: 'Retrato 01 · ajustes de ejemplo',
      temperatura: -8, exposicion: 0.15, contraste: -10, sombras: 35, saturacion: -14,
      histograma: [8, 14, 24, 40, 58, 74, 82, 76, 66, 56, 50, 46, 42, 38, 34, 28, 22, 18, 12, 8],
    },
    'set-01': {
      titulo: 'Set 01 · ajustes de ejemplo',
      temperatura: 22, exposicion: -0.3, contraste: 28, sombras: -12, saturacion: -20,
      histograma: [30, 46, 58, 64, 60, 52, 44, 38, 34, 30, 28, 26, 26, 28, 30, 34, 30, 22, 14, 8],
    },
  };

  const panelLr = document.querySelector('.lr');
  const polaroids = document.querySelectorAll('.polaroid');
  if (panelLr) {
    const histograma = panelLr.querySelector('.lr-histograma');
    for (let i = 0; i < 20; i++) histograma.appendChild(document.createElement('i'));
    const barras = histograma.querySelectorAll('i');
    const signo = (v) => (v > 0 ? '+' : '');

    const revelar = (id) => {
      const d = REVELADO[id];
      if (!d) return;
      polaroids.forEach((p) => p.setAttribute('aria-pressed', p.dataset.foto === id ? 'true' : 'false'));
      panelLr.querySelector('[data-lr="titulo"]').textContent = d.titulo;
      barras.forEach((b, i) => b.style.setProperty('--h', `${d.histograma[i]}%`));
      panelLr.querySelectorAll('.lr-ajuste').forEach((fila) => {
        const clave = fila.dataset.ajuste;
        const v = d[clave];
        const posicion = clave === 'exposicion' ? 50 + (v / 5) * 50 : 50 + v / 2;
        fila.querySelector('i').style.setProperty('--v', `${posicion}%`);
        fila.querySelector('output').textContent = clave === 'exposicion' ? `${signo(v)}${v.toFixed(2)}` : `${signo(v)}${v}`;
      });
    };

    polaroids.forEach((p) => {
      p.addEventListener('mouseenter', () => revelar(p.dataset.foto));
      p.addEventListener('focus', () => revelar(p.dataset.foto));
      p.addEventListener('click', () => revelar(p.dataset.foto));
    });
    revelar('retrato-01');
  }


  /* ---------- 4. En el set: código de tiempo que corre en cada monitor ---------- */
  const codigos = [...document.querySelectorAll('.timecode')].map((el) => ({
    el,
    desde: Number(el.dataset.desde) || 0, // segundos con los que empieza
  }));
  if (codigos.length) {
    const inicio = performance.now();
    const dos = (n) => String(n).padStart(2, '0');
    const correr = (ahora) => {
      const segundosPasados = (ahora - inicio) / 1000;
      codigos.forEach(({ el, desde }) => {
        const cuadros = Math.floor((desde + segundosPasados) * 24);
        const f = cuadros % 24;
        const s = Math.floor(cuadros / 24) % 60;
        const m = Math.floor(cuadros / 1440) % 60;
        const h = Math.floor(cuadros / 86400);
        el.textContent = `${dos(h)}:${dos(m)}:${dos(s)}:${dos(f)}`;
      });
      requestAnimationFrame(correr);
    };
    if (!movimientoReducido) requestAnimationFrame(correr);
  }


  /* ---------- 5. Llegar señalando un área o un proyecto (proyectos.html#nombre) ---------- */
  const irAlHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id || areas.some((a) => a.id === id)) return; // las áreas ya funcionan como anclas
    const elemento = document.querySelector(`[data-proyecto="${CSS.escape(id)}"]`);
    if (!elemento) return;
    elemento.scrollIntoView({ block: 'center', behavior: movimientoReducido ? 'auto' : 'smooth' });
    elemento.classList.add('destacado');
    setTimeout(() => elemento.classList.remove('destacado'), 3300);
  };
  irAlHash();
  window.addEventListener('hashchange', irAlHash);
})();
