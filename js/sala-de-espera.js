(function () {
  'use strict';
  const { P, IMG, rutaProyecto } = window.TRAZO;
  const ESTACION = { 'Marca': 'lo-grafico', 'Editorial': 'analogo', 'Redes': 'digital', 'Dirección de arte': 'en-set' };

  const id = new URLSearchParams(location.search).get('p') || '';
  const i = P.findIndex((x) => x.id === id);
  if (i < 0) return;
  const p = P[i];
  const campo = (n) => document.querySelector(`[data-e="${n}"]`);

  campo('turno').textContent = String(i + 1).padStart(2, '0');
  campo('cat').textContent = p.cat;
  campo('nombre').textContent = p.title;
  campo('sub').textContent = p.sub;
  const img = campo('imagen');
  img.src = IMG[p.img[0]];
  img.alt = `${p.title}: ${p.sub}`;
  campo('pie').textContent = p.title.toLowerCase();
  const volver = `proyectos.html#${ESTACION[p.cat] || ''}`;
  campo('volver').href = volver;
  campo('volver-arriba').href = volver;
  campo('whatsapp').href = 'https://wa.me/573225374248?text=' + encodeURIComponent(`Hola Sof, quiero saber más del proyecto ${p.title} (${p.sub}).`);
  document.title = `${p.title} · Sala de espera · Sofía Moncada`;

  const otros = P.filter((x) => x.id !== id && x.cat === p.cat);
  if (otros.length) {
    campo('otros').innerHTML = otros.map((x) => `<a class="chip" href="${rutaProyecto(x.id)}" data-go>${x.title} · ${x.sub}</a>`).join('');
    campo('otros-caja').hidden = false;
  }
})();
