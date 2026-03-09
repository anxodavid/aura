// server/src/analyzers/cliches.js
function analyzeCliches(text, cliches = []) {
  if (!Array.isArray(cliches) || cliches.length === 0) {
    return { count: 0, status: "ok", impact: 0, detail: "Sin clichés configurados", matches: [] };
  }

  let count = 0;
  let matches = [];
  const lowerText = text.toLowerCase();

  for (const cliche of cliches) {
    const cLower = cliche.toLowerCase().trim();
    if (!cLower) continue;

    const escaped = cLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'gi');
    
    let match;
    while ((match = regex.exec(text)) !== null) {
      count++;
      matches.push({
        text: match[0],
        index: match.index
      });
    }
  }

  let penaltyApplied = Math.max(count * -5, -15);
  
  if (count > 0) {
    return {
      count,
      status: "fail",
      impact: penaltyApplied,
      detail: `Se detectaron ${count} clichés del diccionario personal`,
      matches
    };
  }

  return {
    count: 0,
    status: "ok",
    impact: 0,
    detail: "No se encontraron clichés",
    matches: []
  };
}

module.exports = { analyzeCliches };
