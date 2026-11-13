/* =========================================================
   TRAZO · Sobre mí
   sobre-mi.js · solo para sobre-mi.html
   ========================================================= */
(() => {
  'use strict';

  const movimientoReducido = matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* ---------- 1. Carnet que se arrastra ---------- */
  // Al arrastrarlo, el carnet gira desde la cinta; al soltarlo, rebota y vuelve a mecerse.
  const carnet = document.getElementById('carnet');
  if (carnet) {
    let inicioX = 0;
    let arrastrando = false;

    carnet.addEventListener('pointerdown', (ev) => {
      arrastrando = true;
      inicioX = ev.clientX;
      carnet.setPointerCapture(ev.pointerId);
      carnet.classList.remove('soltando');
      carnet.classList.add('arrastrando');
    });

    carnet.addEventListener('pointermove', (ev) => {
      if (!arrastrando) return;
      const angulo = Math.max(-40, Math.min(40, (inicioX - ev.clientX) / 4));
      carnet.style.setProperty('--angulo', `${angulo}deg`);
    });

    const soltar = () => {
      if (!arrastrando) return;
      arrastrando = false;
      carnet.classList.remove('arrastrando');
      carnet.classList.add('soltando');
      carnet.style.setProperty('--angulo', '0deg');
    };
    carnet.addEventListener('pointerup', soltar);
    carnet.addEventListener('pointercancel', soltar);
  }


  /* ---------- 2. Teclado de herramientas ---------- */
  // Lo que muestra cada tecla. Puedes cambiar los textos y los proyectos aquí.
  // "enlace" es la parte final de la dirección del proyecto (proyectos.html#enlace).
  const HERRAMIENTAS = {
    1: {
      nombre: 'Illustrator',
      frase: 'todos los días',
      desc: 'Logos, isotipos e ilustración. Aquí nacen los sistemas de marca, de la primera línea al manual.',
      proyectos: [['Provet · Marca', 'provet'], ['Boticaria', 'boticaria'], ['La estética de lo grotesco', 'lo-grotesco']],
    },
    2: {
      nombre: 'Photoshop',
      frase: 'mi taller de imagen',
      desc: 'Retoque, montajes y piezas para redes. Aquí le doy el acabado final a cada imagen.',
      proyectos: [['Provet · Redes', 'provet-redes'], ['Museos y galerías', 'museos']],
    },
    3: {
      nombre: 'Lightroom',
      frase: 'color con intención',
      desc: 'Revelado y color de mis fotografías, para que todas hablen el mismo idioma.',
      proyectos: [['En cámara', 'en-camara']],
    },
    4: {
      nombre: 'VS Code',
      frase: 'donde el diseño cobra vida',
      desc: 'Llevo mis diseños a la web. Este portafolio lo construí aquí, línea por línea.',
      proyectos: [['Trazo · este portafolio', 'trazo']],
    },
    5: {
      nombre: 'Figma',
      frase: 'de la idea a la pantalla',
      desc: 'Wireframes, prototipos e interfaces para web y apps, antes de construirlas.',
      proyectos: [['Trazo · wireframe', 'trazo']],
    },
    6: {
      nombre: 'CapCut',
      frase: 'ritmo y estética',
      desc: 'Edición de reels y videos cortos con ritmo, para redes y contenido.',
      proyectos: [['Provet · Redes', 'provet-redes'], ['Servicarga', 'servicarga']],
    },
    7: {
      nombre: 'Fotografía',
      frase: 'mirar con calma',
      desc: 'Producto, retrato y set. Compongo, ilumino y revelo cada foto.',
      proyectos: [['En cámara', 'en-camara'], ['Casualidad', 'casualidad']],
    },
  };

  const teclado = document.querySelector('.teclado');
  if (teclado) {
    const teclas = teclado.querySelectorAll('.tecla');
    const panel = document.querySelector('.herr-panel');
    const campo = (nombre) => panel.querySelector(`[data-h="${nombre}"]`);
    let actual = '1';

    const pintarPanel = (num) => {
      const h = HERRAMIENTAS[num];
      campo('nombre').textContent = h.nombre;
      campo('frase').textContent = h.frase;
      campo('desc').textContent = h.desc;
      const chips = campo('chips');
      chips.innerHTML = '';
      h.proyectos.forEach(([texto, enlace]) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `proyectos.html#${enlace}`;
        a.textContent = texto;
        li.appendChild(a);
        chips.appendChild(li);
      });
    };

    const elegir = (num) => {
      const tecla = teclado.querySelector(`[data-tecla="${num}"]`);
      if (!tecla) return;
      // la tecla se hunde un momento
      tecla.classList.add('presionada');
      setTimeout(() => tecla.classList.remove('presionada'), 180);
      if (num === actual) return;
      actual = num;
      teclas.forEach((t) => t.setAttribute('aria-pressed', t === tecla ? 'true' : 'false'));
      // el detalle se desvanece, cambia y vuelve a aparecer
      if (movimientoReducido) { pintarPanel(num); return; }
      panel.classList.add('cambiando');
      setTimeout(() => { pintarPanel(num); panel.classList.remove('cambiando'); }, 250);
    };

    teclas.forEach((tecla) => tecla.addEventListener('click', () => elegir(tecla.dataset.tecla)));

    // Los números del 1 al 7 de tu teclado también funcionan
    document.addEventListener('keydown', (ev) => {
      if (ev.ctrlKey || ev.metaKey || ev.altKey || /input|textarea|select/i.test(ev.target.tagName)) return;
      if (HERRAMIENTAS[ev.key]) elegir(ev.key);
    });
  }


  /* ---------- 2b. Programas: barras, puntos y porcentaje ---------- */
  const tarjetaProgramas = document.querySelector('.programas');
  if (tarjetaProgramas) {
    const programas = tarjetaProgramas.querySelectorAll('.programa');

    // Prepara cada programa: ancho de la barra y puntos (5 puntos = 100 %)
    programas.forEach((p) => {
      const nivel = Number(p.dataset.nivel) || 0;
      p.style.setProperty('--nivel', `${nivel}%`);
      const puntos = p.querySelector('.puntos');
      const llenos = Math.round(nivel / 20);
      for (let i = 0; i < 5; i++) {
        const punto = document.createElement('i');
        if (i < llenos) punto.className = 'lleno';
        puntos.appendChild(punto);
      }
    });

    // El porcentaje cuenta desde 0 cuando la tarjeta aparece
    const contar = () => {
      programas.forEach((p, i) => {
        const nivel = Number(p.dataset.nivel) || 0;
        const texto = p.querySelector('.porcentaje');
        if (movimientoReducido) { texto.textContent = `${nivel}%`; return; }
        const duracion = 1400;
        const retraso = i * 100;
        const inicio = performance.now() + retraso;
        const paso = (ahora) => {
          const t = Math.min(Math.max((ahora - inicio) / duracion, 0), 1);
          const suave = 1 - Math.pow(1 - t, 3);
          texto.textContent = `${Math.round(nivel * suave)}%`;
          if (t < 1) requestAnimationFrame(paso);
        };
        texto.textContent = '0%';
        requestAnimationFrame(paso);
      });
    };

    const observador = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        contar();
        observador.disconnect();
      }
    }, { threshold: 0.15 });
    observador.observe(tarjetaProgramas);
  }
})();
