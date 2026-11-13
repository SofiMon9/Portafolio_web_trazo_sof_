/* =========================================================
   TRAZO · Datos de los proyectos
   proyectos-datos.js · lo usa la sala de espera (y luego las páginas finales)

   Para agregar o cambiar un proyecto, edita esta lista.
   - La clave (ej. 'provet') es la que va en las direcciones: sala-de-espera.html?p=provet
   - sala: en qué sala de Proyectos aparece (lo-grafico, analogo, digital, en-camara, en-set)
   Pendiente: confirmar años, roles y descripciones con Sofía.
   ========================================================= */
window.SALAS = {
  'lo-grafico': 'Lo gráfico',
  'analogo': 'Análogo',
  'digital': 'Digital',
  'en-camara': 'En cámara',
  'en-set': 'En set',
};

window.PROYECTOS = {
  'provet':                { nombre: 'Provet · Marca',               sala: 'lo-grafico', anio: '2025',      rol: 'Identidad visual' },
  'boticaria':             { nombre: 'Boticaria',                    sala: 'lo-grafico', anio: '2024',      rol: 'Marca y etiquetas' },
  'museos':                { nombre: 'Museos y galerías',            sala: 'lo-grafico', anio: '2024',      rol: 'Diseño gráfico' },
  'lo-grotesco':           { nombre: 'La estética de lo grotesco',   sala: 'lo-grafico', anio: '2024',      rol: 'Ilustración' },
  'magazine':              { nombre: 'Magazine “Nos fui pues mijo”', sala: 'analogo',    anio: '2025',      rol: 'Producción ejecutiva' },
  'provet-redes':          { nombre: 'Provet · Redes',               sala: 'digital',    anio: '2025',      rol: 'Contenido para redes' },
  'trazo':                 { nombre: 'Trazo · Portafolio web',       sala: 'digital',    anio: '2026',      rol: 'Diseño y desarrollo web' },
  'retrato':               { nombre: 'Retrato',                      sala: 'en-camara',  anio: '2025',      rol: 'Fotografía' },
  'producto':              { nombre: 'Producto',                     sala: 'en-camara',  anio: '2025',      rol: 'Fotografía' },
  'ciudad':                { nombre: 'Ciudad',                       sala: 'en-camara',  anio: '2025',      rol: 'Fotografía' },
  'casualidad':            { nombre: 'Casualidad',                   sala: 'en-set',     anio: '2025',      rol: 'Dirección de arte' },
  'servicarga':            { nombre: 'Servicarga',                   sala: 'en-set',     anio: '2025',      rol: 'Dirección de arte' },
  'donde-la-musica-muere': { nombre: 'Donde la música muere',        sala: 'en-set',     anio: '2024',      rol: 'Producción y asistente de arte' },
};
