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
})();
