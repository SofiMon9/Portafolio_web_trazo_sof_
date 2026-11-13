/* =========================================================
   TRAZO · Sala de espera
   sala-de-espera.js · solo para sala-de-espera.html
   Lee el proyecto de la dirección (?p=provet) y llena la ficha.
   ========================================================= */
(() => {
  'use strict';

  const PROYECTOS = window.PROYECTOS || {};
  const SALAS = window.SALAS || {};
  const id = new URLSearchParams(location.search).get('p') || '';
  const proyecto = PROYECTOS[id];
  const campo = (nombre) => document.querySelector(`[data-e="${nombre}"]`);

  if (!proyecto) return; // sin proyecto: se queda el texto general

  const claves = Object.keys(PROYECTOS);
  const turno = String(claves.indexOf(id) + 1).padStart(2, '0');

  campo('turno').textContent = turno;
  campo('sala').textContent = SALAS[proyecto.sala] || 'Proyectos';
  campo('nombre').textContent = proyecto.nombre;
  campo('detalle').textContent = `${proyecto.anio} · ${proyecto.rol}`;
  campo('volver').href = `proyectos.html#${proyecto.sala}`;
  campo('whatsapp').href = `https://wa.me/573225374248?text=${encodeURIComponent(`Hola Sof, quiero saber más del proyecto ${proyecto.nombre}.`)}`;
  document.title = `${proyecto.nombre} · Sala de espera · Trazo`;

  // Otros proyectos de la misma sala
  const otros = claves.filter((k) => k !== id && PROYECTOS[k].sala === proyecto.sala);
  if (otros.length) {
    const lista = campo('otros');
    otros.forEach((k) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `sala-de-espera.html?p=${k}`;
      a.textContent = PROYECTOS[k].nombre;
      li.appendChild(a);
      lista.appendChild(li);
    });
    campo('otros-caja').hidden = false;
  }
})();
