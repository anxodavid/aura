// client/src/analyzers/analyze.js
// Orquestador del análisis. Puerto exacto de la lógica que vivía en
// server/src/routes/analyze.js, ahora síncrono y sin red: se ejecuta entero
// en el navegador y el texto nunca sale de la pestaña.
import { calculateBurstiness } from './burstiness.js';
import { calculateSpecificity } from './specificity.js';
import { analyzeForensics } from './forensics.js';
import { analyzeStructure } from './structure.js';
import { analyzeCliches } from './cliches.js';
import { calculateTotalScore } from './score.js';

export function analyze(text, cliches = []) {
  if (!text || typeof text !== 'string') {
    throw new Error("Texto inválido o ausente");
  }

  const trimmedText = text.trim();
  if (!trimmedText) {
    throw new Error("El texto está vacío");
  }

  const burstiness = calculateBurstiness(trimmedText);
  const specificity = calculateSpecificity(trimmedText);
  const forensics = analyzeForensics(trimmedText);
  const structure = analyzeStructure(trimmedText);
  const clichesAnalysis = analyzeCliches(trimmedText, cliches);

  const kpis = {
    burstiness,
    specificity,
    forensics,
    structure,
    cliches: clichesAnalysis
  };

  const { score, label } = calculateTotalScore(kpis);

  const words = trimmedText.split(/\s+/).filter(w => w.match(/[a-zA-Z0-9áéíóúñÁÉÍÓÚÑ]/));
  const sentences = trimmedText.split(/[.?!]+(?=\s|$)/).filter(s => s.trim().length > 0);
  const paragraphs = trimmedText.split(/\n+/).filter(p => p.trim().length > 0);

  const meta = {
    wordCount: words.length,
    sentenceCount: sentences.length,
    paragraphCount: paragraphs.length
  };

  let highlights = [];

  forensics.matches.forEach(m => {
    let hType = 'residuo';
    if (m.type === 'em_dash') hType = 'em_dash';
    if (m.type === 'markdown_link') hType = 'link';
    highlights.push({ type: hType, start: m.index, end: m.index + m.text.length, text: m.text });
  });
  clichesAnalysis.matches.forEach(m => highlights.push({ type: 'cliche', start: m.index, end: m.index + m.text.length, text: m.text }));

  return {
    score,
    label,
    kpis,
    highlights,
    meta
  };
}
