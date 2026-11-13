/* =========================================================
   TRAZO · Proyectos
   proyectos.js · solo para proyectos.html
   ========================================================= */
(() => {
  'use strict';

  const movimientoReducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Cada sala puede decir qué hacer cuando la señalan desde otra página (proyectos.html#nombre)
  const seleccionarEnSala = {};


  /* ---------- 1. Pestañas: cambiar de sala ---------- */
  const pestanas = [...document.querySelectorAll('.pestana')];
  const salas = [...document.querySelectorAll('.sala')];

  function abrirSala(nombre, { mover = false } = {}) {
    const pestana = pestanas.find((p) => p.dataset.sala === nombre);
    if (!pestana) return;
    pestanas.forEach((p) => {
      const activa = p === pestana;
      p.setAttribute('aria-selected', activa ? 'true' : 'false');
      p.tabIndex = activa ? 0 : -1;
    });
    salas.forEach((s) => {
      const activa = s.id === `sala-${nombre}`;
      s.hidden = !activa;
      s.classList.toggle('activa', activa);
      if (activa) {
        s.classList.remove('entrando');
        void s.offsetWidth; // reinicia la animación de entrada
        s.classList.add('entrando');
      }
    });
    // En celular, la fila de pestañas se desliza para mostrar la elegida (sin mover la página)
    const fila = pestana.parentElement;
    fila.scrollTo({ left: pestana.offsetLeft - fila.clientWidth / 2 + pestana.offsetWidth / 2, behavior: movimientoReducido ? 'auto' : 'smooth' });
    history.replaceState(null, '', `#${nombre}`);
    document.dispatchEvent(new CustomEvent('sala-abierta', { detail: nombre }));
    if (mover) document.querySelector('.pestanas-zona').scrollIntoView({ behavior: movimientoReducido ? 'auto' : 'smooth' });
  }

  pestanas.forEach((p, i) => {
    p.addEventListener('click', () => abrirSala(p.dataset.sala));
    // Flechas izquierda/derecha para moverse entre pestañas
    p.addEventListener('keydown', (ev) => {
      if (ev.key !== 'ArrowRight' && ev.key !== 'ArrowLeft') return;
      const siguiente = pestanas[(i + (ev.key === 'ArrowRight' ? 1 : -1) + pestanas.length) % pestanas.length];
      siguiente.focus();
      abrirSala(siguiente.dataset.sala);
    });
  });


  /* ---------- 2. Lo gráfico: piezas y capas (como en Illustrator) ---------- */
  const piezas = document.querySelectorAll('.pieza');
  const capas = document.querySelectorAll('.ai-lista button');
  const abrirPieza = document.querySelector('.ai-abrir');

  function seleccionarPieza(id) {
    piezas.forEach((p) => p.classList.toggle('seleccionada', p.dataset.proyecto === id));
    capas.forEach((c) => c.setAttribute('aria-pressed', c.dataset.capa === id ? 'true' : 'false'));
    const pieza = [...piezas].find((p) => p.dataset.proyecto === id);
    if (pieza && abrirPieza) {
      abrirPieza.href = pieza.href;
      abrirPieza.innerHTML = `Abrir <b>${pieza.querySelector('.pieza-nombre').textContent}</b> →`;
    }
  }
  piezas.forEach((p) => {
    p.addEventListener('mouseenter', () => seleccionarPieza(p.dataset.proyecto));
    p.addEventListener('focus', () => seleccionarPieza(p.dataset.proyecto));
  });
  capas.forEach((c) => c.addEventListener('click', () => seleccionarPieza(c.dataset.capa)));
  if (piezas.length) seleccionarPieza(piezas[0].dataset.proyecto);
  seleccionarEnSala['lo-grafico'] = seleccionarPieza;


  /* ---------- 3. En cámara: fotos y panel de revelado ---------- */
  // Ajustes de cada foto (pendiente: poner tus ajustes reales).
  // Los valores van de -100 a 100 (exposición de -5 a 5).
  const REVELADO = {
    retrato:  { nombre: 'Retrato',  exposicion: 0.35,  contraste: 18,  temperatura: -12, saturacion: -20, grano: 25,
                histograma: 'M0 60 C20 50 30 20 50 30 S80 10 100 25 S140 50 160 35 S190 45 200 60 Z' },
    producto: { nombre: 'Producto', exposicion: 0.7,   contraste: 32,  temperatura: 15,  saturacion: 10,  grano: 5,
                histograma: 'M0 60 C30 58 50 40 80 20 S120 5 140 15 S180 45 200 60 Z' },
    ciudad:   { nombre: 'Ciudad',   exposicion: -0.4,  contraste: 45,  temperatura: 8,   saturacion: -35, grano: 40,
                histograma: 'M0 60 C10 20 40 15 60 35 S100 55 130 30 S170 10 200 60 Z' },
  };
  const ROTULOS = { exposicion: (v) => (v > 0 ? '+' : '') + v.toFixed(2).replace('.', ','), otro: (v) => (v > 0 ? '+' : '') + v };

  const fotos = document.querySelectorAll('.foto');
  const panelLr = document.querySelector('.lr');

  function revelar(id) {
    const datos = REVELADO[id];
    if (!datos || !panelLr) return;
    fotos.forEach((f) => f.setAttribute('aria-pressed', f.dataset.foto === id ? 'true' : 'false'));
    panelLr.querySelector('[data-lr="nombre"]').textContent = datos.nombre;
    panelLr.querySelector('[data-lr="histograma"]').setAttribute('d', datos.histograma);
    panelLr.querySelectorAll('.lr-ajuste').forEach((fila) => {
      const clave = fila.dataset.ajuste;
      const valor = datos[clave];
      // posición del deslizador: 0 % a 100 %
      const pos = clave === 'exposicion' ? 50 + (valor / 5) * 50 : 50 + valor / 2;
      fila.querySelector('i').style.setProperty('--v', `${pos}%`);
      fila.querySelector('output').textContent = clave === 'exposicion' ? ROTULOS.exposicion(valor) : ROTULOS.otro(valor);
    });
    panelLr.querySelector('.lr-abrir').href = `sala-de-espera.html?p=${id}`;
  }
  fotos.forEach((f) => f.addEventListener('click', () => revelar(f.dataset.foto)));
  revelar('retrato');
  seleccionarEnSala['en-camara'] = revelar;


  /* ---------- 4. En set: monitor con código de tiempo y claqueta ---------- */
  const pantalla = document.querySelector('.monitor-pantalla');
  const claqueta = document.querySelector('.claqueta');
  const tomas = document.querySelectorAll('.tomas button');
  const verProyecto = document.querySelector('.set-ver');

  if (pantalla && claqueta) {
    const imagen = pantalla.querySelector('.monitor-imagen');
    const sinSenal = pantalla.querySelector('.monitor-sin-senal');
    const timecode = pantalla.querySelector('.timecode');
    const dato = (sel) => claqueta.querySelector(`[data-c="${sel}"]`);

    // Código de tiempo que corre a 24 cuadros por segundo
    let inicioGrabacion = performance.now();
    const dos = (n) => String(n).padStart(2, '0');
    const correr = (ahora) => {
      if (!document.getElementById('sala-en-set').hidden) {
        const cuadros = Math.floor(((ahora - inicioGrabacion) / 1000) * 24);
        const f = cuadros % 24;
        const s = Math.floor(cuadros / 24) % 60;
        const m = Math.floor(cuadros / 1440) % 60;
        const h = Math.floor(cuadros / 86400);
        timecode.textContent = `${dos(h)}:${dos(m)}:${dos(s)}:${dos(f)}`;
      }
      requestAnimationFrame(correr);
    };
    requestAnimationFrame(correr);

    // La claqueta se abre y se cierra (¡clac!)
    const clac = () => {
      if (movimientoReducido) return;
      claqueta.classList.remove('cerrada');
      setTimeout(() => claqueta.classList.add('cerrada'), 260);
    };

    let numeroToma = 1;
    function elegirToma(id) {
      const boton = [...tomas].find((t) => t.dataset.toma === id);
      if (!boton) return;
      tomas.forEach((t) => t.setAttribute('aria-pressed', t === boton ? 'true' : 'false'));
      const d = boton.dataset;
      const escena = [...tomas].indexOf(boton) + 1;

      clac();
      pantalla.classList.remove('cambiando');
      void pantalla.offsetWidth;
      pantalla.classList.add('cambiando');
      inicioGrabacion = performance.now();

      // Proyectos sin imagen todavía muestran "Sin señal"
      const sinImagen = 'sinSenal' in d;
      sinSenal.hidden = !sinImagen;
      imagen.hidden = sinImagen;
      if (!sinImagen) {
        imagen.style.setProperty('--c1', d.c1);
        imagen.style.setProperty('--c2', d.c2);
        imagen.querySelector('[data-m="titulo"]').textContent = d.titulo;
        imagen.querySelector('[data-m="tipo"]').textContent = d.tipo;
      }
      dato('titulo').textContent = d.titulo;
      dato('escena').textContent = dos(escena);
      dato('toma').textContent = dos(numeroToma++);
      dato('anio').textContent = d.anio;
      dato('rol').textContent = d.rol;
      if (verProyecto) verProyecto.href = `sala-de-espera.html?p=${id}`;
    }
    tomas.forEach((t) => t.addEventListener('click', () => elegirToma(t.dataset.toma)));
    seleccionarEnSala['en-set'] = elegirToma;

    // Al entrar a la sala, la claqueta se cierra
    document.addEventListener('sala-abierta', (ev) => { if (ev.detail === 'en-set') clac(); });
  }


  /* ---------- 5. Llegar señalando una sala o un proyecto (proyectos.html#nombre) ---------- */
  function irAlHash() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) { abrirSala('lo-grafico'); return; }
    if (pestanas.some((p) => p.dataset.sala === id)) { abrirSala(id, { mover: true }); return; }

    // Si es un proyecto, abre la sala donde está y lo señala
    const elemento = document.querySelector(`.sala [data-proyecto="${CSS.escape(id)}"]`);
    if (!elemento) { abrirSala('lo-grafico'); return; }
    const sala = elemento.closest('.sala').id.replace('sala-', '');
    abrirSala(sala, { mover: true });
    if (seleccionarEnSala[sala]) seleccionarEnSala[sala](id);
    elemento.classList.add('destacado');
    setTimeout(() => elemento.classList.remove('destacado'), 3300);
  }
  irAlHash();
  window.addEventListener('hashchange', irAlHash);
})();
