(function () {
  'use strict';
  const { P, W, esc, rutaProyecto } = window.TRAZO;
  const box = document.getElementById('detail');
  if (!box) return;

  const MUNDO = { 'Marca': 'marca', 'Editorial': 'marca', 'Redes': 'redes', 'Dirección de arte': 'direccion-arte' };
  const ESTACION = { 'Marca': 'lo-grafico', 'Editorial': 'analogo', 'Redes': 'digital', 'Dirección de arte': 'en-set' };
  const FORMATO = { h: 'Horizontal · 4:3', v: 'Vertical · 4:5', c: 'Cuadrada · 1:1', p: 'Panorámica · todo el ancho' };

  const id = new URLSearchParams(location.search).get('p') || '';
  const i = P.findIndex((x) => x.id === id);
  if (i < 0) return;
  const p = P[i];
  const nx = P[(i + 1) % P.length];
  const wk = MUNDO[p.cat];
  const w = W[wk];
  const num = String(i + 1).padStart(2, '0');

  const foto = ([q, f = 'h', src], clase) => src
    ? `<figure class="${clase} f-${f}"><img src="${esc(src)}" alt="${esc(p.title)}: ${esc(q)}" loading="lazy"></figure>`
    : `<figure class="${clase} f-${f} hueco"><figcaption><span class="script">imagen</span><b>${esc(q)}</b><small>${FORMATO[f] || ''}</small></figcaption></figure>`;

  const fotos = p.fotos && p.fotos.length ? p.fotos : [[p.title, 'h']];
  const principal = foto(fotos[0], 'b-main');
  const galeria = fotos.slice(1).map((x) => foto(x, 'b-foto')).join('');

  let facts = '';
  for (const [k, v] of Object.entries(p.facts || {})) {
    facts += `<div><dt>${esc(k)}</dt><dd>${Array.isArray(v) ? `<div class="chips">${v.map((x) => `<span class="chip">${esc(x)}</span>`).join('')}</div>` : esc(v)}</dd></div>`;
  }

  const pal = p.palette ? `<div class="b-pal"><h4>Paleta</h4><div class="sw">${p.palette.map((c) => {
    const L = parseInt(c.slice(1, 3), 16) * 0.3 + parseInt(c.slice(3, 5), 16) * 0.59 + parseInt(c.slice(5, 7), 16) * 0.11;
    return `<button type="button" data-hex="${c}" style="background:${c};color:${L < 140 ? '#FFFBF7' : '#3D0C15'}" aria-label="Copiar color ${c}">${c}</button>`;
  }).join('')}</div><p class="sw-tip">Toca un color para copiarlo</p></div>` : '';

  box.innerHTML = `
    <a class="back" href="proyectos.html#${ESTACION[p.cat] || ''}" data-go>← Todo el archivo</a>
    <a class="brk d-mundo" href="${wk}.html" data-go>[Nº ${num} · Mundo ${w.n} · ${w.name} ${w.script}]</a>
    <h1 class="display d-title">${esc(p.title)}</h1>
    <p class="script d-sub">${esc(p.sub)}</p>
    <div class="bento">
      ${principal}
      <div class="b-desc"><h4>El proyecto</h4><p>${esc(p.desc)}</p></div>
      <div class="b-facts"><dl class="facts">${facts}</dl></div>
      ${pal}${galeria}
    </div>
    <p class="fig"><b>lám. ${num}</b> — ${esc(p.title)}, ${esc(p.sub.toLowerCase())}</p>
    <div class="d-next">
      <a class="btn b-rosa" href="planes.html" data-go>Quiero algo así</a>
      <a class="next" href="${rutaProyecto(nx.id)}" data-go><small>Siguiente proyecto</small><b>${esc(nx.title)}</b><small>${esc(nx.sub)}</small></a>
    </div>`;

  document.title = `${p.title} · ${p.sub} · Sofía Moncada`;
})();
