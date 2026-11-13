/* =========================================================
   TRAZO · Páginas de mundo
   mundos.js · marca.html, redes.html y direccion-arte.html
   Arma la página con los datos de js/datos.js (W y P).
   ========================================================= */
(function () {
  'use strict';
  const { W, P, IMG, card } = window.TRAZO;
  const id = document.body.dataset.world;
  const w = W[id];
  const el = document.querySelector(`[data-world="${id}"]`);
  if (!w || !el) return;

  const ps = P.filter((p) => w.cats.includes(p.cat));
  const others = Object.keys(W).filter((k) => k !== id);
  const pagina = (k) => `${k}.html`;

  el.innerHTML = `
  <section class="pad top">
    <div class="wrap">
      <a class="back" href="inicio.html" data-go>← Volver al inicio</a>
      <div class="wp-head">
        <div><h1>${w.name}<span class="script">${w.script}</span></h1><p class="wp-for">${w.for}</p></div>
        <div><p class="lede">${w.lede}</p><div class="row-btns"><a class="btn b-rosa" href="planes.html" data-go>Pedir cotización</a></div></div>
      </div>
    </div>
  </section>
  <section class="paper pad">
    <div class="wrap">
      <h2 class="st" style="margin-bottom:2.4rem">Qué <span class="script">incluye</span></h2>
      <div class="inc" style="--c:${w.cols}">${w.inc.map((x, i) => `<article class="rv"><span class="n">0${i + 1}</span><h3>${x[0]}</h3><p>${x[1]}</p><span class="foot">${x[2]}</span><button class="buy-btn" data-buy="${x[0]}" data-w="${w.name} ${w.script}">Adquirir</button></article>`).join('')}</div>
    </div>
  </section>
  <section class="pad">
    <div class="wrap">
      <h2 class="st" style="margin-bottom:2.4rem">Hecho en <span class="script">este mundo</span></h2>
      <div class="pgrid">${ps.map((p) => card(p, ps.length === 1 ? 'w' : (ps.length % 2 === 0 ? 'h' : ''))).join('')}</div>
      ${w.film ? `<div class="film" style="margin-top:2rem"><div class="reel"><img src="${IMG.film_h}" alt=""><img src="${IMG.film_h}" alt=""></div></div><p class="fig"><b>lám. ${w.n}</b> — fotogramas de las producciones</p>` : ''}
    </div>
  </section>
  <section class="pad" style="padding-top:0">
    <div class="wrap">
      <h2 class="st" style="margin-bottom:2.4rem">Otros <span class="script">mundos</span></h2>
      <div class="worlds" style="grid-template-columns:repeat(2,1fr)">${others.map((k) => `<a class="wcard ${W[k].color}" style="min-height:240px" href="${pagina(k)}" data-go><span class="big" aria-hidden="true">${W[k].n}</span><span class="wn"><span>Mundo ${W[k].n}</span></span><h3>${W[k].name}<span class="script">${W[k].script}</span></h3></a>`).join('')}</div>
    </div>
  </section>`;

  if (window.TRAZO_observarRv) window.TRAZO_observarRv();
})();
