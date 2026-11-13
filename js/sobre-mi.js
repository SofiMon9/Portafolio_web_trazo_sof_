/* =========================================================
   TRAZO · Sobre mí
   sobre-mi.js · solo para sobre-mi.html
   ========================================================= */
(() => {
  'use strict';

  /* ---------- 1. Carnet que se arrastra ---------- */
  // Al arrastrarlo, el carnet gira desde la cinta; al soltarlo, rebota y vuelve a mecerse.
  const carnet = document.getElementById('carnet');
  if (carnet) {
    let inicioX = 0;
    let arrastrando = false;

    carnet.addEventListener('pointerdown', (ev) => {
      arrastrando = true;
      inicioX = ev.clientX;
      carnet.setPointerCapture(ev.pointerId);
      carnet.classList.remove('soltando');
      carnet.classList.add('arrastrando');
    });

    carnet.addEventListener('pointermove', (ev) => {
      if (!arrastrando) return;
      const angulo = Math.max(-40, Math.min(40, (inicioX - ev.clientX) / 4));
      carnet.style.setProperty('--angulo', `${angulo}deg`);
    });

    const soltar = () => {
      if (!arrastrando) return;
      arrastrando = false;
      carnet.classList.remove('arrastrando');
      carnet.classList.add('soltando');
      carnet.style.setProperty('--angulo', '0deg');
    };
    carnet.addEventListener('pointerup', soltar);
    carnet.addEventListener('pointercancel', soltar);
  }


  /* ---------- 2. Teclado de herramientas ---------- */
  const teclado = document.querySelector('.teclado');
  if (teclado) {
    const teclas = teclado.querySelectorAll('.tecla');
    const pista = document.getElementById('teclado-pista');
    const pistaInicial = pista.textContent;

    const mostrarPista = (tecla) => { pista.textContent = tecla.dataset.pista; };
    const quitarPista = () => { pista.textContent = pistaInicial; };

    teclas.forEach((tecla) => {
      tecla.addEventListener('mouseenter', () => mostrarPista(tecla));
      tecla.addEventListener('focus', () => mostrarPista(tecla));
      tecla.addEventListener('mouseleave', quitarPista);
      tecla.addEventListener('blur', quitarPista);
    });

    // Los números del 1 al 7 hunden la tecla y muestran para qué la uso
    document.addEventListener('keydown', (ev) => {
      if (ev.ctrlKey || ev.metaKey || ev.altKey || /input|textarea/i.test(ev.target.tagName)) return;
      const tecla = teclado.querySelector(`[data-tecla="${ev.key}"]`);
      if (!tecla) return;
      tecla.classList.add('presionada');
      mostrarPista(tecla);
      setTimeout(() => tecla.classList.remove('presionada'), 180);
    });
  }
})();
