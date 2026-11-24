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
  if (p.link) { location.replace(p.link); return; }
  const internos = P.filter((x) => !x.link);
  const nx = internos[(internos.indexOf(p) + 1) % internos.length];
  const wk = MUNDO[p.cat];
  const w = W[wk];

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

  const lm = p.lamina;
  const T = window.TRAZO_t || ((s) => s);
  const kick = lm ? T(lm.kicker.join(' ')).split(' ') : [];
  const inicial = (t) => `<span class="lm-ini">${esc(t[0])}</span>${esc(t.slice(1))}`;
  const DECO = {
    rayos: '<svg class="lm-deco rayos" viewBox="0 0 320 220" aria-hidden="true"><path d="M18 40 74 22 112 196Z"/><path d="M124 12h62l-28 190Z"/><path d="M236 34l62 26-112 142Z"/></svg>',
    huellas: `<svg class="lm-deco huellas" viewBox="0 0 320 220" aria-hidden="true">${[[60, 170, -30], [150, 110, -18], [250, 55, -8]].map(([x, y, r]) => `<g transform="translate(${x} ${y}) rotate(${r})"><ellipse cx="0" cy="14" rx="21" ry="17"/><ellipse cx="-24" cy="-9" rx="8" ry="11"/><ellipse cx="-9" cy="-25" rx="8" ry="11"/><ellipse cx="9" cy="-25" rx="8" ry="11"/><ellipse cx="24" cy="-9" rx="8" ry="11"/></g>`).join('')}</svg>`,
  };
  const finFila = (r) => { const [a, b] = String(r).split('/').map(Number); return b || a + 1; };
  const filaPaleta = lm ? Math.max(...(lm.piezas || []).map((x) => finFila(x.row)), lm.sello ? 4 : 2) : 0;
  const pieza = (x) => `<figure class="lm-pieza${x.fondo ? ' tile' : ''}${x.clase ? ' ' + x.clase : ''}" style="grid-column:${x.col};grid-row:${x.row};${x.fondo ? `background:${x.fondo};` : ''}${x.ar ? `--ar:${x.ar};` : ''}${x.ajuste ? `--fit:${x.ajuste};` : ''}${x.relleno ? `--pad:${x.relleno};` : ''}"><img src="${esc(x.src)}" alt="${esc(p.title)}: ${esc(x.alt)}" loading="lazy"></figure>`;
  const tema = lm && lm.tema ? `--lm-bg:${lm.tema.bg};--lm-fg:${lm.tema.fg};--lm-acento:${lm.tema.acento}` : '';
  const cabeza = lm ? `
    <section class="lamina" style="${tema}" aria-label="Lámina de presentación">
      ${/\.(png|svg|jpg)$/.test(lm.deco || '') ? `<img class="lm-deco img" src="${esc(lm.deco)}" alt="" aria-hidden="true">` : (DECO[lm.deco || 'rayos'] || '')}
      <p class="lm-kicker" aria-hidden="true">${inicial(kick[0])}<br>${inicial(kick.slice(1).join(' '))}</p>
      <div class="lm-txt"><h1>${esc(p.title)}</h1>${lm.bajada ? `<p>${esc(lm.bajada)}</p>` : ''}</div>
      ${(lm.piezas || []).map(pieza).join('')}
      ${lm.sello ? `<div class="lm-sello"><p class="lm-logo"><span>${esc(lm.sello[0])}</span><span><svg class="lm-pin" viewBox="0 0 40 60" aria-hidden="true"><circle cx="20" cy="20" r="15"/><circle class="in" cx="20" cy="20" r="6"/><path d="M20 35v24"/></svg>${esc(lm.sello[1])}</span></p>${lm.qr ? `<img class="lm-qr" src="${esc(lm.qr)}" alt="Código QR del folleto">` : ''}</div>` : ''}
      ${p.palette ? `<div class="lm-pal" style="grid-row:${filaPaleta};--n:${p.palette.length}"><h2>Paleta</h2><div class="lm-chips">${p.palette.map((c, j) => `<button type="button" data-hex="${c}" aria-label="Copiar color ${c}"><i style="background:${c}"></i><b>${esc((lm.nombres || [])[j] || '')}</b><small>${c}</small></button>`).join('')}</div><p class="sw-tip">Toca un color para copiarlo</p></div>` : ''}
    </section>` : `
    <h1 class="display d-title">${esc(p.title)}</h1>
    <p class="script d-sub">${esc(p.sub)}</p>`;

  box.innerHTML = `
    <a class="back" href="proyectos.html#${ESTACION[p.cat] || ''}" data-go>← Todo el archivo</a>
    <a class="brk d-mundo" href="${wk}.html" data-go>${w.name} ${w.script}</a>
    ${cabeza}
    <div class="bento${lm ? ' solo-texto' : ''}">
      ${lm ? '' : principal}
      <div class="b-desc"><h4>El proyecto</h4><p>${esc(p.desc)}</p>${(p.enlaces || []).length ? `<div class="b-links">${p.enlaces.map(([t, u]) => `<a class="btn b-vino" href="${esc(u)}" target="_blank" rel="noopener">${esc(t)} <span aria-hidden="true">↗</span></a>`).join('')}</div>` : ''}</div>
      <div class="b-facts"><dl class="facts">${facts}</dl></div>
      ${lm ? '' : pal + galeria}
    </div>
    <div class="d-next">
      <a class="btn b-rosa" href="planes.html" data-go>Quiero algo así</a>
      <a class="next" href="${rutaProyecto(nx.id)}" data-go><small>Siguiente proyecto</small><b>${esc(nx.title)}</b><small>${esc(nx.sub)}</small></a>
    </div>`;

  document.title = `${p.title} · ${p.sub} · Sofía Moncada`;
})();
