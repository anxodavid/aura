// tests/gen-cases.cjs — genera tests/golden/cases.json de forma determinista.
// Los caracteres invisibles (U+200B, U+00A0, U+FEFF) se escriben como escapes \uXXXX
// para que el fichero sea legible y no se corrompan al editarlo a mano.
const fs = require('fs');
const path = require('path');

const ZWSP = '​';
const NBSP = ' ';
const BOM = '﻿';
const EMDASH = '—';
const ENDASH = '–';

const cases = [
  {
    name: '01-largo-variado',
    descripcion: 'Texto largo, concreto y de ritmo variado: debe puntuar alto',
    cliches: [],
    text: [
      'El 14 de marzo de 2019 la planta de Vigo produjo 4.200 unidades y fallaron 37 de ellas en el control final.',
      'Marta Ruiz, responsable de calidad en Stellantis desde 2016, revisó los registros del PLC uno por uno durante nueve horas seguidas y encontró que el sensor de par de la línea 3 llevaba desviado 0,4 Nm desde el turno de noche del 11 de marzo, un desfase que ningún operario había reportado porque la tolerancia del panel seguía marcando verde.',
      'Nadie lo vio.',
      'El informe que envió a dirección tenía 3 páginas y una tabla de 28 filas, y en la última columna aparecía el coste real: 61.400 euros en chatarra que ya no se podía recuperar de ninguna manera.',
      'La norma ISO 9001 obliga a documentar la desviación en 48 horas, así que lo hizo esa misma tarde desde el despacho de Ourense, con el turno de tarde todavía trabajando al otro lado del cristal.',
    ].join('\n'),
  },
  {
    name: '02-plano-generico',
    descripcion: 'Texto plano y abstracto: debe disparar burstiness y specificity',
    cliches: [],
    text: [
      'la transformación de las organizaciones requiere un enfoque global y decidido por parte de todos.',
      'los equipos deben trabajar de forma alineada para conseguir los objetivos que se han marcado.',
      'la comunicación interna resulta esencial para que el mensaje llegue de manera clara y directa.',
      'las personas son el activo más valioso de cualquier organización que quiera seguir creciendo.',
      'el liderazgo debe adaptarse a las nuevas necesidades que van surgiendo en el entorno laboral.',
      'la formación continua permite que los profesionales mantengan sus capacidades bastante actualizadas.',
      'el cambio cultural se construye poco a poco con el compromiso sostenido de toda la plantilla.',
    ].join('\n'),
  },
  {
    name: '03-forensics',
    descripcion: 'Em dashes, enlaces markdown, caracteres invisibles y otros residuos forenses',
    cliches: [],
    text: [
      'ChatGPT dice: aquí tienes el borrador que me has pedido para la campaña de otoño.',
      `La propuesta ${EMDASH} desarrollada tras varias iteraciones ${EMDASH} combina dos ejes de trabajo complementarios entre sí.`,
      'Puedes consultar la documentación completa en [la guía oficial](https://ejemplo.com/guia) antes de la reunión del jueves.',
      `El segundo eje ${ENDASH} pendiente de validar ${ENDASH} depende del **presupuesto aprobado** por el comité de dirección.`,
      `Firmado: [Insertar nombre del responsable] con${NBSP}fecha de hoy y${ZWSP} referencia interna pendiente.${BOM}`,
    ].join('\n'),
  },
  {
    name: '04-cliches-diccionario',
    descripcion: 'Texto con clichés del diccionario personalizado (cliches no vacío)',
    cliches: ['sinergia', 'poner en valor', 'hoja de ruta', 'ecosistema'],
    text: [
      'La sinergia entre los dos departamentos permitió cerrar el proyecto antes de lo previsto por todos.',
      'Durante la presentación se decidió poner en valor el trabajo que había hecho el equipo de soporte durante el verano.',
      'La hoja de ruta se revisó en septiembre y volvió a revisarse en noviembre sin cambios de fondo relevantes.',
      'Toda la propuesta encaja dentro del ecosistema que la compañía lleva construyendo desde hace bastante tiempo.',
      'La sinergia vuelve a aparecer en el resumen ejecutivo, esta vez sin ninguna cifra que la respalde.',
    ].join('\n'),
  },
  {
    name: '05-hamburguesa',
    descripcion: 'Estructura de plantilla: apertura genérica y cierre genérico',
    cliches: [],
    text: [
      'En el actual paradigma de la comunicación corporativa, las empresas se enfrentan a retos que no existían antes.',
      'Los canales se han multiplicado y la atención de las audiencias se ha vuelto un recurso escaso y disputado.',
      'Cada organización debe encontrar su propio equilibrio entre la frecuencia de publicación y la calidad del mensaje.',
      'En conclusión, el éxito depende de la capacidad de adaptación y de la coherencia sostenida en el tiempo.',
    ].join('\n\n'),
  },
  {
    name: '06-muestra-insuficiente',
    descripcion: 'Menos de tres oraciones válidas: muestra insuficiente',
    cliches: [],
    text: 'El informe llegó tarde y sin firmar. Nadie lo revisó.',
  },
];

const json = JSON.stringify(cases, null, 2)
  .replace(/​/g, '\\u200B')
  .replace(/ /g, '\\u00A0')
  .replace(/﻿/g, '\\uFEFF');

const out = path.join(__dirname, 'golden', 'cases.json');
fs.writeFileSync(out, json + '\n', 'utf8');
console.log('escrito', out);
