window.TRAZO = (function () {
  const IMG = {
    provet_redes: 'img/provet_redes.jpg', provet_post: 'img/provet_post.jpg', provet_marca: 'img/provet_marca.jpg',
    boticaria: 'img/boticaria.jpg', museos: 'img/museos.jpg', grotesco: 'img/grotesco.jpg',
    casualidad: 'img/casualidad.jpg', comercial: 'img/comercial.jpg', film_h: 'img/film_h.jpg',
  };

  const K = { 'Redes': 'k-redes', 'Marca': 'k-marca', 'Editorial': 'k-editorial', 'Dirección de arte': 'k-da' };

  const P = [
    { id: 'provet-redes', cat: 'Redes', size: 'w', title: 'Provet', sub: 'Contenido para redes', img: ['provet_redes', 'provet_post'],
      fotos: [['Grilla del feed de Instagram de Provet', 'h'], ['Post educativo', 'c'], ['Carrusel con datos útiles', 'c'], ['Post de servicios', 'c'], ['Historia del congreso veterinario', 'v'], ['Portada de un reel', 'v'], ['Historia con el número de contacto', 'v']],
      desc: 'Diseño de contenido y edición de videos para Instagram, enfocados en educar y compartir datos útiles con los dueños de peluditos que son clientes de la veterinaria y con quienes siguen la cuenta.',
      facts: { 'Cliente': '@provet_co, centro veterinario', 'Qué hice': ['Posts', 'Historias', 'Reels', 'Edición de video'], 'Programas': ['Photoshop', 'Illustrator', 'CapCut'] } },
    { id: 'provet-marca', cat: 'Marca', title: 'Provet', sub: 'Creación de marca', img: ['provet_marca'],
      fotos: [['Logo de Provet sobre fondo claro', 'h'], ['Papelería: tarjetas y hoja membrete', 'h'], ['Uniformes con la marca', 'h'], ['Íconos del sistema de marca', 'h'], ['Páginas del manual de marca', 'p']],
      desc: 'Identidad visual para comunicar profesionalismo, confianza y cercanía en el ámbito veterinario. Tonos azules sobrios y una tipografía limpia forman una marca reconocible, moderna y adaptable, desde la papelería hasta los uniformes.',
      palette: ['#f2f1ed', '#d2cfc0', '#223f61', '#15263a'],
      facts: { 'Cliente': '@provet_co', 'Tipografías': ['Komet', 'Montserrat'], 'Aplicaciones': ['Logo', 'Papelería', 'Uniformes', 'Íconos'] } },
    { id: 'boticaria', cat: 'Marca', title: 'Boticaria', sub: 'Creación de marca', img: ['boticaria'],
      fotos: [['Logo de Boticaria', 'h'], ['Isotipo de la flor', 'h'], ['Etiqueta o empaque con la marca', 'h'], ['Bocetos del proceso', 'h']],
      desc: 'Marca de productos naturales inspirada en las plantas de huerta y sus usos tradicionales. Tonos cálidos y orgánicos, formas suaves y una flor como elemento central transmiten naturaleza, bienestar y tradición.',
      palette: ['#ecb503', '#6b2c59', '#f2ecdd'],
      facts: { 'Tipografías': ['Gració', 'Poppins'], 'Aplicaciones': ['Logo', 'Isotipo', 'Paleta'] } },
    { id: 'museos', cat: 'Editorial', title: 'Museos y galerías', sub: 'El arte como punto de encuentro', img: ['museos'],
      fotos: [['Folleto abierto completo', 'h'], ['Mapa ilustrado de los museos', 'h'], ['Portada del folleto plegado', 'h'], ['Folleto impreso en la mano', 'v'], ['Detalle del código QR', 'c'], ['Ficha de un museo', 'c']],
      desc: 'Folleto para contar, ubicar y mostrar los museos y galerías de Pereira. Incluye la ubicación exacta de cada lugar, conexión a un mapa digital y la información de cada espacio.',
      facts: { 'Tipo': 'Proyecto universitario', 'Formato': ['Folleto plegable', 'Mapa ilustrado', 'Código QR'] } },
    { id: 'grotesco', cat: 'Editorial', title: 'La estética de lo grotesco', sub: 'Rediseño de portada', img: ['grotesco'],
      fotos: [['Portada rediseñada (mockup del libro)', 'h'], ['Portada original junto al rediseño', 'h'], ['Detalle de la tipografía', 'h']],
      desc: 'Rediseño de la portada del libro de Juan Manuel Acevedo hecho solo con tipografía, buscando incomodidad y presencia visual a partir del contraste entre los colores originales y la nueva propuesta.',
      facts: { 'Tipo': 'Proyecto universitario', 'Autor del libro': 'Juan Manuel Acevedo', 'Recursos': ['Tipografía', 'Color'] } },
    { id: 'casualidad', cat: 'Dirección de arte', size: 'h', title: 'Casualidad', sub: 'Videoclip de Leo Méndez', img: ['casualidad'], film: true,
      fotos: [['Fotograma panorámico del videoclip', 'h'], ['Primer escenario ambientado', 'h'], ['Segundo escenario ambientado', 'h'], ['Referencias y moodboard', 'c'], ['Detalle de la utilería', 'c'], ['Foto detrás de cámaras', 'v'], ['Tira de fotogramas del rodaje', 'p']],
      desc: 'Planeación, ambientación y realización de escenarios para el videoclip, con espacios distintos de acuerdo con la narrativa de la canción.',
      facts: { 'Productora': '@insign.visualmedia', 'Rol': 'Dirección de arte', 'Qué hice': ['Ambientación', 'Escenografía', 'Utilería'] } },
    { id: 'servicarga', cat: 'Dirección de arte', size: 'h', title: 'Servicarga', sub: 'Comercial', img: ['comercial'], film: true,
      fotos: [['Fotograma del comercial', 'h'], ['La casa ambientada', 'h'], ['Otro espacio de la casa', 'h'], ['Referencias y moodboard', 'c'], ['Detalle de la utilería', 'c'], ['Foto detrás de cámaras', 'v'], ['Tira de fotogramas del comercial', 'p']],
      desc: 'Dirección y creación de arte para un comercial, ambientando escenarios que muestran cercanía y familiaridad para llevar el mensaje de la marca.',
      facts: { 'Productora': '@insign.visualmedia', 'Rol': 'Dirección de arte', 'Qué hice': ['Ambientación', 'Escenarios'] } },
  ];

  const W = {
    'marca': { n: '01', name: 'Marca', script: 'y piezas gráficas', color: 'w1', for: 'Para emprendimientos, marcas nuevas y proyectos culturales',
      lede: 'Logo, paleta, tipografía y todo lo que tu marca necesita para verse igual en una tarjeta, un uniforme o un post.', cols: 4,
      inc: [['Identidad simple', 'Logo principal, paleta de color y tipografías para empezar con una marca clara.', 'Incluye 3 entregables'],
            ['Manual de marca', 'Guía completa de uso: logo, color, tipografía, aplicaciones y tono de voz.', 'Incluye 8 entregables'],
            ['Identidad completa', 'Todo lo anterior más papelería, redes sociales y piezas de lanzamiento.', 'El más completo'],
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

  const card = (p, size) => `<a class="pcard ${size || ''}" href="${rutaProyecto(p.id)}" data-go data-cat="${p.cat}"><div class="ph"><img src="${IMG[p.img[0]]}" alt="${esc(p.title)}: ${esc(p.sub)}" loading="lazy"></div><div class="cap"><div><h3>${p.title}</h3><p class="sub">${p.sub}</p></div><span class="cat ${K[p.cat]}">${p.cat}</span></div></a>`;

  return { IMG, K, P, W, rutaProyecto, esc, card };
})();
