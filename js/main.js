/* =========================================================
   TRAZO · Portafolio de Sofía Moncada
   main.js
   ========================================================= */
(() => {
  'use strict';

  const raiz = document.documentElement;
  raiz.classList.add('js');

  const movimientoReducido = matchMedia('(prefers-reduced-motion: reduce)');
  const espera = (ms) => new Promise((r) => setTimeout(r, movimientoReducido.matches ? 0 : ms));

  // Guardar y leer en el navegador sin que falle si está bloqueado
  const guardar = (clave, valor) => { try { localStorage.setItem(clave, valor); } catch (e) {} };
  const leer = (clave) => { try { return localStorage.getItem(clave); } catch (e) { return null; } };


  /* ---------- 1. Tema claro / oscuro ---------- */
  const btnTema = document.getElementById('btnTema');
  const sistemaOscuro = matchMedia('(prefers-color-scheme: dark)');
  const temaActual = () => raiz.dataset.theme || (sistemaOscuro.matches ? 'dark' : 'light');

  function pintarBotonTema() {
    const tema = temaActual();
    btnTema.dataset.modo = tema;
    btnTema.setAttribute('aria-checked', tema === 'dark' ? 'true' : 'false');
  }

  // La barra toma fondo al bajar
  const barra = document.querySelector('.barra');
  const revisarBarra = () => barra.classList.toggle('con-fondo', window.scrollY > 20);
  window.addEventListener('scroll', revisarBarra, { passive: true });
  revisarBarra();

  btnTema.addEventListener('click', () => {
    const nuevo = temaActual() === 'dark' ? 'light' : 'dark';
    raiz.dataset.theme = nuevo;
    guardar('sof-theme', nuevo);
    pintarBotonTema();
  });
  sistemaOscuro.addEventListener('change', pintarBotonTema);
  pintarBotonTema();


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


  /* ---------- 3. Estante de libros ---------- */
  const estante = document.querySelector('.estante');
  const pista = document.getElementById('pista');
  const pistaInicial = pista.textContent;

  // Los libros caen cuando el estante aparece en pantalla
  const observadorEstante = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      estante.classList.add('cae');
      observadorEstante.unobserve(estante);
    }
  }, { threshold: 0.3 });

  function prepararEstante() {
    estante.classList.remove('cae');
    observadorEstante.observe(estante);
  }

  // Texto de ayuda según el libro señalado
  estante.querySelectorAll('.libro').forEach((libro) => {
    const mostrarPista = () => { pista.textContent = libro.dataset.pista; };
    const quitarPista = () => { pista.textContent = pistaInicial; };
    libro.addEventListener('mouseenter', mostrarPista);
    libro.addEventListener('focus', mostrarPista);
    libro.addEventListener('mouseleave', quitarPista);
    libro.addEventListener('blur', quitarPista);
  });


  /* ---------- 4. Vistas (páginas por #hash) ---------- */
  const vistas = [...document.querySelectorAll('.vista')];
  const vistaPronto = document.querySelector('[data-vista="pronto"]');

  // Nombres bonitos de las páginas que aún no existen
  const NOMBRES = {
    'inicio': 'Inicio',
    'sobre-mi': 'Sobre mí',
    'archivo': 'Proyectos',
    'marca': 'Marca',
    'redes': 'Redes',
    'direccion-arte': 'Dirección de arte',
    'planes': 'Planes',
  };

  function mostrar(hash) {
    const id = decodeURIComponent((hash || '').replace(/^#/, '')) || 'intro';
    let vista = vistas.find((v) => v.dataset.vista === id && v !== vistaPronto);

    if (!vista) {
      vista = vistaPronto;
      vistaPronto.querySelector('[data-nombre]').textContent = NOMBRES[id] || id.replace(/-/g, ' ');
    }

    vistas.forEach((v) => { v.hidden = v !== vista; });

    if (id === 'intro') {
      document.title = 'Trazo · Bienvenidx al archivo de SOF';
      prepararEstante();
    } else {
      guardar('sof-intro-visto', '1');
      document.title = `${NOMBRES[id] || 'Trazo'} · Trazo`;
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // Transición con las 4 franjas de color
  const franjas = document.querySelector('.franjas');
  let enTransicion = false;

  async function transicion(cambio) {
    if (enTransicion) return;
    enTransicion = true;
    franjas.classList.add('entra');
    await espera(750);
    cambio();
    franjas.classList.add('sale');
    await espera(750);
    franjas.classList.remove('entra', 'sale');
    enTransicion = false;
  }

  // Clics en enlaces internos (#...)
  document.addEventListener('click', (ev) => {
    const enlace = ev.target.closest('a[href^="#"]');
    if (!enlace) return;
    const hash = enlace.getAttribute('href');
    if (hash.length < 2) return;

    // Enlaces que solo bajan dentro de la misma página
    if (enlace.hasAttribute('data-scroll')) {
      ev.preventDefault();
      document.querySelector(hash)?.scrollIntoView({ behavior: movimientoReducido.matches ? 'auto' : 'smooth' });
      return;
    }

    ev.preventDefault();
    if (hash === location.hash) return;
    transicion(() => {
      history.pushState(null, '', hash);
      mostrar(hash);
    });
  });

  // Botones atrás / adelante del navegador
  window.addEventListener('hashchange', () => transicion(() => mostrar(location.hash)));

  // Página inicial: la entrada solo aparece la primera vez
  const inicial = location.hash || (leer('sof-intro-visto') ? '#inicio' : '#intro');
  if (!location.hash) history.replaceState(null, '', inicial);
  mostrar(inicial);
})();
