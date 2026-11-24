window.TRAZO = (function () {
  const IMG = {
    provet_redes: 'img/provet_posts.jpg', provet_marca: 'img/provet_marca.jpg?v=2',
    boticaria: 'img/boticaria.jpg', museos: 'img/museos.jpg?v=2', grotesco: 'img/grotesco.jpg',
    casualidad: 'img/casualidad.jpg', comercial: 'img/comercial.jpg', film_h: 'img/film_h.jpg',
    casualidad_portada: 'img/casualidad_portada.jpg', noche_sabado: 'img/noche_sabado.jpg', donde_musica: 'img/donde_musica.jpg',
    canasta_portada: 'img/canasta_portada.jpg?v=3',
  };
  const IG_PROVET = 'https://www.instagram.com/provet_co/';

  const K = { 'Redes': 'k-redes', 'Marca': 'k-marca', 'Editorial': 'k-editorial', 'Dirección de arte': 'k-da' };

  const P = [
    { id: 'provet-redes', cat: 'Redes', size: 'w', title: 'Provet', sub: 'Contenido para redes', img: ['provet_redes'], link: IG_PROVET, red: 'Instagram' },
    { id: 'provet-marca', cat: 'Marca', title: 'Provet', sub: 'Creación de marca', img: ['provet_marca'],
      lamina: { kicker: ['Identidad', 'Visual'], bajada: 'Centro veterinario', deco: 'huellas', tema: { bg: '#f7f6f2', fg: '#223f61', acento: '#d2cfc0' },
        piezas: [{ src: 'img/provet_logo.jpg', alt: 'logo horizontal', col: '1/9', row: '2', fondo: '#f2f1ed', ar: '1400/536' }, { src: 'img/provet_uniforme.png', alt: 'uniforme con la marca', col: '9/13', row: '2/4' },
          { src: 'img/provet_tarjetas.jpg', alt: 'tarjetas de presentación', col: '1/6', row: '3', fondo: '#f2f1ed', ar: '5/3' }, { src: 'img/provet_sello.jpg', alt: 'logo en versión sello', col: '6/9', row: '3', fondo: '#223f61', ar: '1' },
          { src: 'img/provet_komet.jpg', alt: 'tipografía Komet para el logo', col: '1/5', row: '4', fondo: '#f2f1ed', ar: '4/3', ajuste: 'contain' }, { src: 'img/provet_montserrat.jpg', alt: 'tipografía Montserrat para textos', col: '5/9', row: '4', fondo: '#f2f1ed', ar: '4/3', ajuste: 'contain' },
          { src: 'img/provet_isotipo.jpg', alt: 'isotipo de la huella en versión clara', col: '9/13', row: '4', fondo: '#f2f1ed', ar: '4/3', ajuste: 'contain' }],
        nombres: ['Hueso', 'Arena', 'Azul', 'Noche'] },
      fotos: [],
      desc: 'Identidad visual para comunicar profesionalismo, confianza y cercanía en el ámbito veterinario. Tonos azules sobrios y una tipografía limpia forman una marca reconocible, moderna y adaptable, desde la papelería hasta los uniformes.',
      palette: ['#f2f1ed', '#d2cfc0', '#223f61', '#15263a'],
      facts: { 'Cliente': '@provet_co', 'Tipografías': ['Komet', 'Montserrat'], 'Aplicaciones': ['Logo', 'Papelería', 'Uniformes', 'Íconos'] },
      enlaces: [['Ver en Instagram', IG_PROVET]] },
    { id: 'tradicion-canasta', cat: 'Marca', title: 'Tradición en canasta', sub: 'Universo gráfico', img: ['canasta_portada'],
      lamina: { kicker: ['Piezas', 'Gráficas'], bajada: 'Tiendas de barrio · plaza · campo', deco: 'ninguno', tema: { bg: '#f7efe8', fg: '#58111a', acento: '#eba43d' },
        piezas: [{ src: 'img/canasta_portada.jpg?v=3', alt: 'logo sobre una foto de frutas de la plaza', col: '1/8', row: '2/4', fondo: '#58111a', ar: '646/417' }, { src: 'img/canasta_estrella.png', alt: 'estrella', col: '7/9', row: '2', clase: 'flota' }, { src: 'img/canasta_canastas.png', alt: 'canastas de colores apiladas', col: '8/13', row: '2/4' },
          { src: 'img/canasta_silla.png', alt: 'ilustración de la silla plástica', col: '1/4', row: '4', fondo: '#fffaf1', ar: '1', ajuste: 'contain', relleno: '14%' }, { src: 'img/canasta_aguacate.png', alt: 'ilustración del aguacate', col: '4/7', row: '4', fondo: '#fffaf1', ar: '1', ajuste: 'contain', relleno: '14%' },
          { src: 'img/canasta_tomate.png', alt: 'ilustración del tomate', col: '7/10', row: '4', fondo: '#fffaf1', ar: '1', ajuste: 'contain', relleno: '14%' }, { src: 'img/canasta_balanza.png', alt: 'ilustración de la balanza', col: '10/13', row: '4', fondo: '#fffaf1', ar: '1', ajuste: 'contain', relleno: '14%' }],
        nombres: ['Maíz', 'Aguacate', 'Tomate', 'Tierra', 'Crema'] },
      palette: ['#eba43d', '#8f9e26', '#58111a', '#6c3d20', '#fef4d9'],
      fotos: [],
      desc: 'Universo gráfico creado para acompañar los posts, la página web y los elementos gráficos de un proyecto que registra el valor y la tradición de las tiendas de barrio y su conexión con la plaza y el campo.',
      facts: { 'Tipo': 'Universo gráfico', 'Piezas': ['Posts', 'Página web', 'Ilustraciones', 'Logo'], 'Elementos': ['Canastas', 'Silla plástica', 'Balanza', 'Frutas'] },
      enlaces: [['Ver la página web', 'https://tradicionencanasta.netlify.app/']] },
    { id: 'boticaria', cat: 'Marca', title: 'Boticaria', sub: 'Creación de marca', img: ['boticaria'],
      fotos: [['Logo de Boticaria', 'h'], ['Isotipo de la flor', 'h'], ['Etiqueta o empaque con la marca', 'h'], ['Bocetos del proceso', 'h']],
      desc: 'Marca de productos naturales inspirada en las plantas de huerta y sus usos tradicionales. Tonos cálidos y orgánicos, formas suaves y una flor como elemento central transmiten naturaleza, bienestar y tradición.',
      palette: ['#ecb503', '#6b2c59', '#f2ecdd'],
      facts: { 'Tipografías': ['Gració', 'Poppins'], 'Aplicaciones': ['Logo', 'Isotipo', 'Paleta'] } },
    { id: 'museos', cat: 'Editorial', title: 'Museos y galerías', sub: 'El arte como punto de encuentro', img: ['museos'],
      lamina: { kicker: ['Piezas', 'Gráficas'], piezas: [{ src: 'img/museos_lamina.jpg', alt: 'folleto abierto por dentro y por fuera', col: '1/10', row: '2/4' }], qr: 'img/museos_qr_vino.png', sello: ['El arte como', 'de encuentro'],
        nombres: ['Crema', 'Mostaza', 'Rosa', 'Vino'] },
      fotos: [],
      desc: 'Folleto plegable que reúne siete museos y galerías de Pereira en una ruta artística. Por dentro, un mapa ilustrado ubica cada espacio con su dirección, clasifica las experiencias (experiencial, educativa, histórica y contemplativa) y muestra los resultados de una encuesta. Por fuera, cada lugar tiene sus redes, y un código QR lleva a una experiencia extendida con voces, imágenes y relatos.',
      palette: ['#f7efd8', '#edbc5a', '#df84aa', '#521921'],
      facts: { 'Tipo': 'Proyecto universitario', 'Formato': ['Folleto plegable', 'Mapa ilustrado', 'Infografía', 'Código QR'], 'Espacios': ['Espacio Vasto', 'Museo de Arte', 'Lucy Tejada', 'Galería Beatriz Agudelo', 'Sala Estrecha', 'Casa Útera', 'Museo Intangible'] } },
    { id: 'grotesco', cat: 'Editorial', title: 'La estética de lo grotesco', sub: 'Rediseño de portada', img: ['grotesco'],
      fotos: [['Portada rediseñada (mockup del libro)', 'h'], ['Portada original junto al rediseño', 'h'], ['Detalle de la tipografía', 'h']],
      desc: 'Rediseño de la portada del libro de Juan Manuel Acevedo hecho solo con tipografía, buscando incomodidad y presencia visual a partir del contraste entre los colores originales y la nueva propuesta.',
      facts: { 'Tipo': 'Proyecto universitario', 'Autor del libro': 'Juan Manuel Acevedo', 'Recursos': ['Tipografía', 'Color'] } },
    { id: 'casualidad', cat: 'Dirección de arte', title: 'Casualidad', sub: 'Videoclip de Leo Méndez', img: ['casualidad_portada'], link: 'https://youtu.be/zzhdbEWIKj8', red: 'YouTube' },
    { id: 'servicarga', cat: 'Dirección de arte', title: 'Servicarga', sub: 'Comercial', img: ['comercial'], link: 'https://www.instagram.com/reel/DbKAtlABSrf/', red: 'Instagram' },
    { id: 'noche-de-sabado', cat: 'Dirección de arte', title: 'Noche de Sábado', sub: 'Videoclip de Danny Road', img: ['noche_sabado'], link: 'https://youtu.be/2KBNRGW3v3w', red: 'YouTube' },
    { id: 'donde-la-musica-muere', cat: 'Dirección de arte', title: 'Donde la música muere', sub: 'Cortometraje', img: ['donde_musica'], link: 'https://youtu.be/dAaUGrENSRQ', red: 'YouTube' },
  ];

  const W = {
    'marca': { n: '01', name: 'Marca', script: 'y piezas gráficas', color: 'w1', for: 'Para emprendimientos, marcas nuevas y proyectos culturales',
      lede: 'Logo, paleta, tipografía y todo lo que tu marca necesita para verse igual en una tarjeta, un uniforme o un post.', cols: 4,
      inc: [['Identidad simple', 'Logo principal, paleta de color y tipografías para empezar con una marca clara.', 'Incluye 3 entregables', '$800.000'],
            ['Manual de marca', 'Guía completa de uso: logo, color, tipografía, aplicaciones y tono de voz.', 'Incluye 8 entregables', '$1.800.000'],
            ['Identidad completa', 'Todo lo anterior más papelería, redes sociales y piezas de lanzamiento.', 'Incluye 15 entregables', '$3.500.000'],
            ['Piezas gráficas', 'Folletos, portadas, afiches y material impreso o digital.', 'A la medida']],
      cats: ['Marca', 'Editorial'] },
    'redes': { n: '02', name: 'Redes', script: 'sociales', color: 'w2', for: 'Para negocios, servicios y creadores que viven de su imagen',
      lede: 'Contenido que enseña, conecta y se ve como tu marca. Diseño las piezas, edito los videos y cuido que todo hable el mismo idioma.', cols: 3,
      inc: [['Posts e historias', 'Diseño de publicaciones para educar, informar y vender sin perder la identidad.', 'Plantillas incluidas'],
            ['Reels y video', 'Edición de videos cortos con ritmo, textos y la estética de tu marca.', 'Edición en CapCut'],
            ['Fotografía', 'Fotos de producto y retrato, con edición de color en Lightroom.', 'A la medida']],
      cats: ['Redes'] },
    'direccion-arte': { n: '03', name: 'Dirección', script: 'de arte', color: 'w3', for: 'Para videoclips, comerciales y cortometrajes',
      lede: 'Espacios que cuentan la historia. Desde las referencias y el concepto hasta la ambientación del set el día del rodaje.', cols: 3,
      inc: [['Concepto', 'Referencias, paleta y propuesta visual según la narrativa de la pieza.', 'Antes del rodaje'],
            ['Ambientación', 'Escenografía, utilería y espacios distintos para cada escena.', 'Preproducción'],
            ['En el set', 'Acompañamiento y asistencia de arte y producción durante el rodaje.', 'Día de rodaje']],
      cats: ['Dirección de arte'], film: true },
  };

  const rutaProyecto = (id) => `proyecto.html?p=${encodeURIComponent(id)}`;
  const esc = (s) => String(s).replace(/[&<>"]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

  const enlace = (p) => p.link ? `href="${esc(p.link)}" target="_blank" rel="noopener"` : `href="${rutaProyecto(p.id)}" data-go`;

  const card = (p, size) => `<a class="pcard ${size || ''}" ${enlace(p)} data-cat="${p.cat}"><div class="ph"><img src="${IMG[p.img[0]]}" alt="${esc(p.title)}: ${esc(p.sub)}" loading="lazy"></div><div class="cap"><div><h3>${p.title}</h3><p class="sub">${p.sub}</p></div><span class="cat ${K[p.cat]}">${p.cat}</span></div></a>`;

  return { IMG, K, P, W, rutaProyecto, enlace, esc, card };
})();
