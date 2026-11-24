(function () {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const say = window.TRAZO_say || (() => {});

  const PL = [
    { n: 'Identidad simple', precio: '$800.000', t: 'Básicos', c: '#E8B4B0', tx: '#3D0C15', inc: ['Logo principal', 'Paleta de color', 'Tipografías'], m: 'Incluye 3 entregables', w: 'Marca' },
    { n: 'Manual de marca', precio: '$1.800.000', t: 'Marca', c: '#B96B52', tx: '#FFFBF7', inc: ['Uso y versiones del logo', 'Color y tipografía', 'Aplicaciones', 'Tono de voz'], m: 'Incluye 8 entregables', w: 'Marca' },
    { n: 'Identidad completa', precio: '$3.500.000', t: 'Total', c: '#5C1A30', tx: '#F7EFE9', inc: ['Todo lo de los planes anteriores', 'Papelería', 'Redes sociales', 'Piezas de lanzamiento'], m: 'Incluye 15 entregables', w: 'Marca' },
    { n: 'Asesoría', precio: '$250.000', t: 'Guía', c: '#D9C4B8', tx: '#3D0C15', inc: ['Sesión de acompañamiento', 'Revisión de tu marca o idea', 'Siguiente paso claro'], m: 'Sesión de 2 horas', w: 'Planes' },
  ];
  const fan = document.getElementById('fan');
  const fName = document.getElementById('fName');
  if (fan) {
    fan.innerHTML = PL.map((p, i) => `<div class="swc" role="option" tabindex="0" data-i="${i}" style="--c:${p.c};--t:${p.tx};--mrot:${[-2, 1.5, -1, 2][i]}deg"><div class="swtop"><span class="tier">${p.t}</span></div><div class="info"><h3>${p.n}</h3><ul>${p.inc.map((x) => `<li>${x}</li>`).join('')}</ul><p class="precio">Precio estimado: <b>${p.precio}</b></p><span class="meta">${p.m}</span><div class="acts"><button type="button" class="buy-now" data-buy="${p.n}" data-w="${p.w}">Adquirir</button><button type="button" class="add" aria-pressed="false" data-add="${p.n}">Agregar al pedido</button></div></div><span class="rivet" aria-hidden="true"></span></div>`).join('');
    const sws = [...fan.children];
    let fOn = 2;
    const fanTo = (i) => {
      fOn = (i + PL.length) % PL.length;
      sws.forEach((s, j) => {
        const d = j - fOn;
        s.classList.toggle('on', d === 0);
        s.setAttribute('aria-selected', d === 0);
        s.style.setProperty('--rot', (d * 13) + 'deg');
        s.style.zIndex = 10 - Math.abs(d);
      });
      fName.textContent = PL[fOn].n;
    };
    fan.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      const s = e.target.closest('.swc');
      if (s) fanTo(+s.dataset.i);
    });
    fan.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); fanTo(fOn + 1); sws[fOn].focus(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); fanTo(fOn - 1); sws[fOn].focus(); }
      if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('swc')) { e.preventDefault(); fanTo(+e.target.dataset.i); }
    });
    document.getElementById('fPrev').onclick = () => fanTo(fOn - 1);
    document.getElementById('fNext').onclick = () => fanTo(fOn + 1);
    fanTo(2);

    if (location.hash === '#asesoria') fanTo(3);
  }

  const O = ['Identidad simple', 'Manual de marca', 'Identidad completa', 'Asesoría', 'Contenido para redes', 'Fotografía', 'Dirección de arte', 'Edición de video', 'Piezas gráficas'];
  const opts = document.getElementById('opts');
  if (!opts) return;
  opts.innerHTML = O.map((o, i) => `<button type="button" aria-pressed="false" data-o="${o}" style="--r:${[-2, 1.5, -1, 2, -1.5, 1, -2, 1.5, -1][i]}deg">${o}</button>`).join('');
  try {
    document.getElementById('bDate').textContent = new Intl.DateTimeFormat(window.TRAZO_lang === 'en' ? 'en-US' : 'es-CO', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'America/Bogota' }).format(new Date());
  } catch (_) {}
  const bSum = document.getElementById('bSum');
  const selected = () => [...opts.querySelectorAll('[aria-pressed="true"]')].map((b) => b.dataset.o);
  const syncOrder = () => {
    const s = selected();
    bSum.textContent = s.length ? `Marcaste: ${s.join(', ')}` : 'Aún no has marcado nada';
    document.querySelectorAll('[data-add]').forEach((b) => b.setAttribute('aria-pressed', s.includes(b.dataset.add)));
  };
  const setOpt = (name, on) => {
    const b = opts.querySelector(`[data-o="${name}"]`);
    if (b) b.setAttribute('aria-pressed', on);
    syncOrder();
  };
  opts.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) setOpt(b.dataset.o, b.getAttribute('aria-pressed') !== 'true'); });
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-add]');
    if (!b) return;
    const on = b.getAttribute('aria-pressed') !== 'true';
    setOpt(b.dataset.add, on);
    say(on ? `Agregado al pedido: ${b.dataset.add}` : `Quitado del pedido: ${b.dataset.add}`);
  });
  const whenEl = document.getElementById('when');
  whenEl.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (b) whenEl.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', x === b));
  });
  document.getElementById('order').addEventListener('submit', (e) => {
    e.preventDefault();
    const sel = selected();
    if (!sel.length) {
      say('Marca al menos una opción en “Necesito”');
      opts.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      return;
    }
    const name = document.getElementById('o-name').value.trim();
    const msg = document.getElementById('o-msg').value.trim();
    const wh = whenEl.querySelector('[aria-pressed="true"]');
    const T = window.TRAZO_t || ((s) => s);
    const en = window.TRAZO_lang === 'en';
    const CUANDO = { 'lo antes posible': 'as soon as possible', 'este mes': 'this month', 'sin afán': 'whenever works, no rush' };
    let t = en
      ? `Hi Sof${name ? ", I'm " + name : ''}. I'm interested in: ${sel.map(T).join(', ')}.`
      : `Hola Sof${name ? ', soy ' + name : ''}. Me interesa: ${sel.join(', ')}.`;
    if (wh) t += en ? ` I need it ${CUANDO[wh.dataset.v] || wh.dataset.v}.` : ` Lo necesito ${wh.dataset.v}.`;
    if (msg) t += `\n\n${msg}`;
    const paper = document.querySelector('.bsheet');
    paper.classList.remove('stamped');
    void paper.offsetWidth;
    paper.classList.add('stamped');
    setTimeout(() => window.open('https://wa.me/573225374248?text=' + encodeURIComponent(t), '_blank', 'noopener'), reduce ? 0 : 600);
  });
  syncOrder();
})();
