(function () {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const intro = document.getElementById('intro');
  if (!intro) return;

  function cerrar(href) {
    try { sessionStorage.setItem('sof-intro', '1'); } catch (_) {}
    if (reduce) { location.href = href; return; }
    intro.animate([{ clipPath: 'inset(0 0 0 0)' }, { clipPath: 'inset(0 0 100% 0)' }],
      { duration: 700, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'forwards' })
      .finished.then(() => { location.href = href; });
  }

  intro.addEventListener('click', (e) => {
    const a = e.target.closest('[data-pick]');
    if (!a) return;
    e.preventDefault();
    cerrar(a.getAttribute('href'));
  });

  const toBooks = document.getElementById('toBooks');
  if (toBooks) toBooks.onclick = () => {
    const pk = document.getElementById('pick');
    intro.scrollTo({ top: pk.offsetTop - 60, behavior: reduce ? 'auto' : 'smooth' });
  };

  const skipi = document.getElementById('skipi');
  if (skipi) skipi.onclick = () => cerrar('inicio.html');
})();
