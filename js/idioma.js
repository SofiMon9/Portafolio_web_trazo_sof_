(function () {
  'use strict';
  const root = document.documentElement;
  let lang = 'es';
  try { if (localStorage.getItem('sof-lang') === 'en') lang = 'en'; } catch (_) {}
  const dump = /[?&]i18ndump/.test(location.search);
  if (dump) lang = 'en';

  const D = window.TRAZO_EN || {};
  const R = window.TRAZO_EN_RE || [];
  const H = window.TRAZO_EN_HTML || {};
  const ATTR = ['alt', 'aria-label', 'title', 'placeholder'];
  const norm = (s) => s.replace(/\s+/g, ' ').trim();
  const tiene = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
  const faltan = new Set();

  const buscar = (k) => {
    if (tiene(D, k)) return D[k];
    if (!/[a-záéíóúñ]/i.test(k)) return null;
    for (const [re, rep] of R) if (re.test(k)) return k.replace(re, rep);
    for (const sep of [' · ', ': ']) {
      if (!k.includes(sep)) continue;
      const partes = k.split(sep).map((x) => [x, buscar(x)]);
      if (partes.some(([, v]) => v !== null)) return partes.map(([x, v]) => (v === null ? x : v)).join(sep);
    }
    return null;
  };
  const tr = (s) => {
    const k = norm(s);
    if (!k) return null;
    const v = buscar(k);
    if (v === null && dump && /[a-záéíóúñ]/i.test(k)) faltan.add(k);
    return v;
  };
  const t = (s) => (lang === 'en' ? (tr(s) ?? s) : s);

  window.TRAZO_lang = lang;
  window.TRAZO_t = t;

  document.querySelectorAll('.lang').forEach((b) => {
    b.setAttribute('aria-label', lang === 'en' ? 'Cambiar a español' : 'Switch to English');
    b.title = lang === 'en' ? 'Español' : 'English';
    b.addEventListener('click', () => {
      try { localStorage.setItem('sof-lang', lang === 'en' ? 'es' : 'en'); } catch (_) {}
      location.reload();
    });
  });

  if (lang !== 'en') { root.classList.remove('i18n'); return; }
  root.lang = 'en';

  const saltar = (el) => el && el.closest && el.closest('script,style,[translate="no"],[data-i18n="ok"]');

  const texto = (n) => {
    if (saltar(n.parentElement)) return;
    const v = tr(n.data);
    if (v === null || v === norm(n.data)) return;
    const m = n.data.match(/^(\s*)[\s\S]*?(\s*)$/);
    n.data = m[1] + v + m[2];
  };
  const atributos = (el) => {
    if (saltar(el)) return;
    for (const a of ATTR) {
      if (!el.hasAttribute(a)) continue;
      const v = tr(el.getAttribute(a));
      if (v !== null && v !== el.getAttribute(a)) el.setAttribute(a, v);
    }
  };
  const bloque = (el) => {
    const k = norm(el.textContent);
    if (tiene(H, k)) { el.innerHTML = H[k]; el.dataset.i18n = 'ok'; } else if (dump) faltan.add('[html] ' + k);
  };
  const recorrer = (nodo) => {
    if (nodo.nodeType === 3) { texto(nodo); return; }
    if (nodo.nodeType !== 1) return;
    if (nodo.matches('[data-i18n=""]')) bloque(nodo);
    nodo.querySelectorAll('[data-i18n=""]').forEach(bloque);
    atributos(nodo);
    const w = document.createTreeWalker(nodo, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let x;
    while ((x = w.nextNode())) (x.nodeType === 3 ? texto(x) : atributos(x));
  };

  const titulo = () => { const v = tr(document.title); if (v && v !== document.title) document.title = v; };
  const meta = document.querySelector('meta[name="description"]');
  if (meta) { const v = tr(meta.content); if (v) meta.content = v; }

  recorrer(document.body);
  titulo();
  root.classList.remove('i18n');

  new MutationObserver((ms) => {
    for (const m of ms) {
      if (m.type === 'childList') m.addedNodes.forEach(recorrer);
      else if (m.type === 'characterData') texto(m.target);
      else if (m.type === 'attributes') atributos(m.target);
    }
  }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTR });
  new MutationObserver(titulo).observe(document.querySelector('title') || document.head, { childList: true, characterData: true, subtree: true });

  if (dump) {
    setTimeout(() => {
      const pre = document.createElement('pre');
      pre.id = 'i18n-dump';
      pre.setAttribute('translate', 'no');
      pre.textContent = JSON.stringify([...faltan]);
      document.body.append(pre);
    }, 2500);
  }
})();
