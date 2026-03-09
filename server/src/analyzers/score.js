// server/src/analyzers/score.js
function calculateTotalScore(kpis) {
  let score = 100;

  if (kpis.forensics.status === 'fail' || kpis.forensics.status === 'risk') {
    score += kpis.forensics.impact; 
  }
  if (kpis.burstiness.status === 'fail' || kpis.burstiness.status === 'risk') {
    score += kpis.burstiness.impact;
  }
  if (kpis.specificity.status === 'fail' || kpis.specificity.status === 'risk') {
    score += kpis.specificity.impact;
  }
  if (kpis.structure.status === 'fail' || kpis.structure.status === 'risk') {
    score += kpis.structure.impact;
  }
  
  score += kpis.cliches.impact;

  // Synergistic Penalty: if text is both abstract (specificity fail) AND monotone (burstiness fail/risk)
  if (kpis.specificity.status === 'fail' && (kpis.burstiness.status === 'fail' || kpis.burstiness.status === 'risk')) {
    score -= 15; // Extra penalty for being pure abstract slop
  }

  score = Math.max(score, 0);

  let label = "";
  if (score >= 80) label = "Alta fricción";
  else if (score >= 60) label = "Aceptable";
  else if (score >= 40) label = "Riesgo de texto plano";
  else label = "Muy predecible / artificial";

  return { score, label };
}

module.exports = { calculateTotalScore };
