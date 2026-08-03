// app/src/analyzers/specificity.js
import nlp from 'compromise';

export function calculateSpecificity(text) {
  const doc = nlp(text);

  // Filter to avoid lowercase Spanish stop-words being treated as places/orgs
  const isCap = (s) => /^[A-ZÁÉÍÓÚÑ]/.test(s.trim());

  const people = doc.people().out('array').filter(isCap);
  const places = doc.places().out('array').filter(isCap);
  const organizations = doc.organizations().out('array').filter(isCap);

  const acronyms = text.match(/\b[A-ZÁÉÍÓÚÑ]{2,}\b/g) || [];
  const numbers = text.match(/\b\d+([.,]\d+)?%?\b/g) || [];
  const years = text.match(/\b(19|20)\d{2}\b/g) || [];

  const specificWordsCount =
    people.length +
    places.length +
    organizations.length +
    acronyms.length +
    numbers.length +
    years.length;

  const words = text.split(/\s+/).filter((w) => w.trim().length > 0);
  const totalWords = words.length;

  if (totalWords === 0) {
    return { value: 0, status: 'ok', impact: 0, detail: 'Texto vacío' };
  }

  const density = (specificWordsCount / totalWords) * 100;

  let status = 'ok';
  let impact = 0;
  let detail = 'Texto anclado en datos concretos reales';

  if (density < 3) {
    status = 'fail';
    impact = -20;
    detail = 'Baja presencia de entidades, cifras o anclajes concretos (Slop abstracto y vacío)';
  } else if (density >= 3 && density <= 6) {
    status = 'risk';
    impact = -10;
    detail = 'Densidad media-baja de elementos específicos';
  } else {
    status = 'ok';
    detail = 'Densidad neutra/alta de elementos específicos';
  }

  return {
    value: Number(density.toFixed(2)),
    status,
    impact,
    detail,
  };
}
