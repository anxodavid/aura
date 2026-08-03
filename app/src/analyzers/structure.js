// app/src/analyzers/structure.js
export function analyzeStructure(text) {
  const openings = [
    'en el panorama actual',
    'en el actual paradigma',
    'es crucial entender',
    'ciertamente',
    'es importante destacar',
    'en la era digital',
    'hoy en día',
  ];

  const closings = [
    'en conclusión',
    'en resumen',
    'en última instancia',
    'para concluir',
    'en definitiva',
    'al final del día',
  ];

  const paragraphs = text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  if (paragraphs.length < 2) {
    return {
      value: false,
      status: 'ok',
      impact: 0,
      detail: 'Estructura indetectable (muestra corta)',
    };
  }

  const firstTwo = paragraphs.slice(0, 2).map((p) => p.toLowerCase());
  const lastTwo = paragraphs.slice(-2).map((p) => p.toLowerCase());

  const hasOpening = openings.some((op) =>
    firstTwo.some((p) => p.startsWith(op) || p.includes(op))
  );
  const hasClosing = closings.some((cl) => lastTwo.some((p) => p.startsWith(cl) || p.includes(cl)));

  if (hasOpening && hasClosing) {
    return {
      value: true,
      status: 'fail',
      impact: -20,
      detail: 'Se detectó fuertemente un patrón de apertura y cierre genéricos',
    };
  } else if (hasOpening || hasClosing) {
    return {
      value: true,
      status: 'risk',
      impact: -10,
      detail: 'Se detectó apertura o cierre de plantilla genérica',
    };
  }

  return {
    value: false,
    status: 'ok',
    impact: 0,
    detail: 'Estructura no predecible',
  };
}
