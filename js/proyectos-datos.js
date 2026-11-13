/* =========================================================
   TRAZO · Datos de los proyectos
   proyectos-datos.js · lo usa la sala de espera (y luego las páginas finales)

   Para agregar o cambiar un proyecto, edita esta lista.
   - La clave (ej. 'provet') es la que va en las direcciones: sala-de-espera.html?p=provet
   - sala: en qué área de Proyectos aparece (lo-grafico, analogo, digital, en-camara, en-set)
   ========================================================= */
window.SALAS = {
  'lo-grafico': 'Lo gráfico',
  'analogo': 'Lo análogo',
  'digital': 'En digital',
  'en-camara': 'En cámara',
  'en-set': 'En el set',
};

window.PROYECTOS = {
  'provet':                { nombre: 'Provet',                       sala: 'lo-grafico', anio: '2025', rol: 'Concepto · Manual · Uniformes' },
  'boticaria':             { nombre: 'Boticaria',                    sala: 'lo-grafico', anio: '2025', rol: 'Concepto · Isotipo · Paleta' },
  'museos':                { nombre: 'Museos y galerías de Pereira', sala: 'analogo',    anio: '2025', rol: 'Folleto interactivo' },
  'lo-grotesco':           { nombre: 'La estética de lo grotesco',   sala: 'analogo',    anio: '2025', rol: 'Portada de libro' },
  'provet-redes':          { nombre: 'Provet · Redes',               sala: 'digital',    anio: '2025', rol: 'Historias y reels' },
  'producto-01':           { nombre: 'Producto 01',                  sala: 'en-camara',  anio: '2025', rol: 'Fotografía y revelado' },
  'retrato-01':            { nombre: 'Retrato 01',                   sala: 'en-camara',  anio: '2025', rol: 'Fotografía y revelado' },
  'set-01':                { nombre: 'Set 01',                       sala: 'en-camara',  anio: '2025', rol: 'Fotografía y revelado' },
  'casualidad':            { nombre: 'Casualidad',                   sala: 'en-set',     anio: '2025', rol: 'Videoclip · Leo Méndez' },
  'servicarga':            { nombre: 'Servicarga',                   sala: 'en-set',     anio: '2026', rol: 'Comercial · Dirección de arte' },
  'donde-la-musica-muere': { nombre: 'Donde la música muere',        sala: 'en-set',     anio: '2024', rol: 'Cortometraje · Producción y asistencia de arte' },
};
