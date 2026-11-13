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

  // Menú grande "Lo que hago": lo abren "Lo que hago", "Menú" y cualquier botón con aria-controls="mega"
  const mega = document.getElementById('mega');
  if (mega) {
    const abridores = document.querySelectorAll('[aria-controls="mega"]');
    const btnCerrar = mega.querySelector('.mega-cerrar');
    let quienAbrio = null;

    const abrirMega = (boton) => {
      quienAbrio = boton;
      mega.hidden = false;
      requestAnimationFrame(() => mega.classList.add('abierto'));
      abridores.forEach((b) => b.setAttribute('aria-expanded', 'true'));
      document.body.style.overflow = 'hidden';
      btnCerrar.focus();
    };
    const cerrarMega = () => {
      if (mega.hidden) return;
      mega.classList.remove('abierto');
      abridores.forEach((b) => b.setAttribute('aria-expanded', 'false'));
      document.body.style.overflow = '';
      espera(350).then(() => { if (!mega.classList.contains('abierto')) mega.hidden = true; });
      if (quienAbrio) quienAbrio.focus();
    };

    abridores.forEach((b) => b.addEventListener('click', () => (mega.hidden ? abrirMega(b) : cerrarMega())));
    btnCerrar.addEventListener('click', cerrarMega);
    document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') cerrarMega(); });
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

  /* ---------- 4. INICIO · Cintas cruzadas ---------- */
  // Repite el texto de cada cinta hasta llenarla y luego lo duplica,
  // así el movimiento da la vuelta sin que se note el corte.
  const pistasCinta = document.querySelectorAll('.cinta-pista');
  if (pistasCinta.length) {
    const llenarCintas = () => {
      pistasCinta.forEach((pista) => {
        if (!pista.dataset.original) pista.dataset.original = pista.innerHTML;
        const set = pista.dataset.original;
        const ancho = pista.parentElement.offsetWidth;
        pista.innerHTML = set;
        let veces = 1;
        while (pista.scrollWidth < ancho && veces < 30) {
          pista.innerHTML += set;
          veces++;
        }
        pista.innerHTML += pista.innerHTML;
      });
    };
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(llenarCintas);
  }

  /* ---------- 4b. INICIO · Manifiesto que se ilumina palabra por palabra ---------- */
  const manifiesto = document.querySelector('[data-manifiesto]');
  if (manifiesto) {
    // Envuelve cada palabra en <span class="palabra"> (también las que están dentro de <em>)
    const recorrido = document.createTreeWalker(manifiesto, NodeFilter.SHOW_TEXT);
    const textos = [];
    while (recorrido.nextNode()) textos.push(recorrido.currentNode);
    textos.forEach((nodo) => {
      const trozo = document.createDocumentFragment();
      nodo.textContent.split(/(\s+)/).forEach((parte) => {
        if (!parte) return;
        if (/^\s+$/.test(parte)) {
          trozo.appendChild(document.createTextNode(' '));
        } else {
          const span = document.createElement('span');
          span.className = 'palabra';
          span.textContent = parte;
          trozo.appendChild(span);
        }
      });
      nodo.replaceWith(trozo);
    });

    const palabras = manifiesto.querySelectorAll('.palabra');
    let pendiente = false;
    const iluminar = () => {
      pendiente = false;
      const caja = manifiesto.getBoundingClientRect();
      const alto = window.innerHeight;
      // Empieza cuando el texto entra por abajo y termina cuando llega a la mitad de la pantalla
      const inicio = alto * 0.85;
      const fin = alto * 0.45;
      const avance = (inicio - caja.top) / (caja.height + inicio - fin);
      const cuantas = Math.round(Math.min(Math.max(avance, 0), 1) * palabras.length);
      palabras.forEach((p, i) => p.classList.toggle('encendida', i < cuantas));
    };
    const pedirIluminar = () => {
      if (!pendiente) { pendiente = true; requestAnimationFrame(iluminar); }
    };
    window.addEventListener('scroll', pedirIluminar, { passive: true });
    window.addEventListener('resize', pedirIluminar);
    iluminar();
  }

  /* ---------- 4c. Copiar el correo al tocarlo ---------- */
  document.querySelectorAll('[data-copiar]').forEach((boton) => {
    const aviso = boton.querySelector('.copiar-aviso');
    boton.addEventListener('click', async () => {
      const texto = boton.dataset.copiar;
      try {
        await navigator.clipboard.writeText(texto);
        if (aviso) aviso.textContent = '¡Copiado!';
        setTimeout(() => { if (aviso) aviso.textContent = ''; }, 2000);
      } catch (e) {
        // Si el navegador no deja copiar, abre el correo
        location.href = `mailto:${texto}`;
      }
    });
  });

  // Si ya pasaste por una página distinta a la entrada, la entrada no vuelve a salir sola
  if (pagina !== 'entrada') guardar('sof-intro-visto', '1');


  /* ---------- 5. Transición entre páginas (4 franjas) ---------- */
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
