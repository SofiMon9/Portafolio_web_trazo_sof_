/* =========================================================
   TRAZO · Portafolio de Sofía Moncada
   main.js · lo usan todas las páginas
   ========================================================= */
(() => {
  'use strict';

  const raiz = document.documentElement;
  raiz.classList.add('js');

  const pagina = document.body.dataset.pagina; // "entrada", "inicio", "sobre-mi"...
  const movimientoReducido = matchMedia('(prefers-reduced-motion: reduce)');
  const espera = (ms) => new Promise((r) => setTimeout(r, movimientoReducido.matches ? 0 : ms));

  // Guardar y leer en el navegador sin que falle si está bloqueado
  const guardar = (clave, valor) => { try { localStorage.setItem(clave, valor); } catch (e) {} };


  /* ---------- 1. Tema claro / oscuro ---------- */
  const btnTema = document.getElementById('btnTema');
  const sistemaOscuro = matchMedia('(prefers-color-scheme: dark)');
  const temaActual = () => raiz.dataset.theme || (sistemaOscuro.matches ? 'dark' : 'light');

  function pintarBotonTema() {
    const tema = temaActual();
    btnTema.dataset.modo = tema;
    btnTema.setAttribute('aria-checked', tema === 'dark' ? 'true' : 'false');
  }

  btnTema.addEventListener('click', () => {
    const nuevo = temaActual() === 'dark' ? 'light' : 'dark';
    raiz.dataset.theme = nuevo;
    guardar('sof-theme', nuevo);
    pintarBotonTema();
  });
  sistemaOscuro.addEventListener('change', pintarBotonTema);
  pintarBotonTema();

  // La barra toma fondo al bajar
  const barra = document.querySelector('.barra');
  const revisarBarra = () => barra.classList.toggle('con-fondo', window.scrollY > 20);
  window.addEventListener('scroll', revisarBarra, { passive: true });
  revisarBarra();

  // Menú en celular: abrir y cerrar
  const btnMenu = document.getElementById('btnMenu');
  if (btnMenu) {
    const cambiarMenu = (abrir) => {
      barra.classList.toggle('menu-abierto', abrir);
      btnMenu.setAttribute('aria-expanded', abrir ? 'true' : 'false');
      btnMenu.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
      document.body.style.overflow = abrir ? 'hidden' : '';
    };
    btnMenu.addEventListener('click', () => cambiarMenu(!barra.classList.contains('menu-abierto')));
    document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') cambiarMenu(false); });
    matchMedia('(min-width: 861px)').addEventListener('change', (ev) => { if (ev.matches) cambiarMenu(false); });
  }


  /* ---------- 2. Aparición de bloques al hacer scroll ---------- */
  const observadorAparece = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observadorAparece.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.aparece').forEach((el) => observadorAparece.observe(el));


  /* ---------- 3. ENTRADA · Estante de libros ---------- */
  const estante = document.querySelector('.estante');
  if (estante) {
    const pista = document.getElementById('pista');
    const pistaInicial = pista.textContent;

    // Los libros caen cuando el estante aparece en pantalla
    const observadorEstante = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        estante.classList.add('cae');
        observadorEstante.disconnect();
      }
    }, { threshold: 0.3 });
    observadorEstante.observe(estante);

    // Texto de ayuda según el libro señalado
    estante.querySelectorAll('.libro').forEach((libro) => {
      const mostrarPista = () => { pista.textContent = libro.dataset.pista; };
      const quitarPista = () => { pista.textContent = pistaInicial; };
      libro.addEventListener('mouseenter', mostrarPista);
      libro.addEventListener('focus', mostrarPista);
      libro.addEventListener('mouseleave', quitarPista);
      libro.addEventListener('blur', quitarPista);
    });
  }

  // Si ya pasaste por una página distinta a la entrada, la entrada no vuelve a salir sola
  if (pagina !== 'entrada') guardar('sof-intro-visto', '1');


  /* ---------- 4. Transición entre páginas (4 franjas) ---------- */
  const franjas = document.querySelector('.franjas');
  let saliendo = false;

  document.addEventListener('click', (ev) => {
    const enlace = ev.target.closest('a[href]');
    if (!enlace) return;
    const href = enlace.getAttribute('href');

    // Enlaces dentro de la misma página (#algo): bajan suave
    if (href.startsWith('#')) {
      const destino = href.length > 1 && document.querySelector(href);
      if (destino) {
        ev.preventDefault();
        destino.scrollIntoView({ behavior: movimientoReducido.matches ? 'auto' : 'smooth' });
      }
      return;
    }

    // Solo páginas del mismo sitio, abiertas en la misma pestaña
    const url = new URL(enlace.href, location.href);
    const nuevaPestana = enlace.target === '_blank' || ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.button !== 0;
    if (url.origin !== location.origin || nuevaPestana) return;

    ev.preventDefault();
    if (saliendo) return;
    saliendo = true;

    try { sessionStorage.setItem('sof-cortina', '1'); } catch (e) {}
    franjas.classList.add('entra');
    espera(750).then(() => { location.href = url.href; });
  });

  // Al llegar desde otra página: las franjas se abren
  function abrirCortina() {
    const llegoConCortina = raiz.classList.contains('cortina');
    if (llegoConCortina) {
      franjas.classList.add('sale');
      requestAnimationFrame(() => requestAnimationFrame(() => raiz.classList.remove('cortina')));
      espera(800).then(() => franjas.classList.remove('sale'));
    }
    // Arranca las animaciones de entrada (ej. letras de TRAZO) cuando ya se ve la página
    espera(llegoConCortina ? 350 : 0).then(() => {
      document.querySelectorAll('.vista').forEach((v) => v.classList.add('activa'));
    });
  }
  abrirCortina();

  // Si vuelves con el botón "atrás", la página no se queda tapada
  window.addEventListener('pageshow', (ev) => {
    if (ev.persisted) {
      franjas.classList.remove('entra', 'sale');
      saliendo = false;
    }
  });
})();
