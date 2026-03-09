// server/src/routes/analyze.js
const express = require('express');
const { calculateBurstiness } = require('../analyzers/burstiness');
const { calculateSpecificity } = require('../analyzers/specificity');
const { analyzeForensics } = require('../analyzers/forensics');
const { analyzeStructure } = require('../analyzers/structure');
const { analyzeCliches } = require('../analyzers/cliches');
const { calculateTotalScore } = require('../analyzers/score');

const router = express.Router();

router.post('/', (req, res) => {
  try {
    const { text, cliches = [] } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: "Texto inválido o ausente" });
    }

    const trimmedText = text.trim();
    if (!trimmedText) {
      return res.status(400).json({ error: "El texto está vacío" });
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

    res.json({
      score,
      label,
      kpis,
      highlights,
      meta
    });
  } catch (error) {
    console.error("Error analyzing text:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
