// server/src/analyzers/burstiness.js
function calculateBurstiness(text) {
  // Split on '.', '?', '!' followed by whitespace or end of string
  const sentences = text.split(/[.?!]+(?=\s|$)/).map(s => s.trim()).filter(s => s.length > 0);
  
  const lengths = sentences.map(s => {
    return s.split(/\s+/).filter(w => w.match(/[a-zA-Z0-9áéíóúñÁÉÍÓÚÑ]/)).length;
  }).filter(l => l >= 10); // Ignore headers and very short fragments that artificially inflate variance

  if (lengths.length < 3) {
    return {
      value: null,
      status: "insufficient",
      impact: 0,
      detail: "Muestra insuficiente (menos de 3 oraciones válidas)"
    };
  }

  const n = lengths.length;
  const mean = lengths.reduce((acc, val) => acc + val, 0) / n;
  const variance = lengths.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n;
  const stdDev = Math.sqrt(variance);

  let status = "ok";
  let impact = 0;
  let detail = "Variación rítmica natural";

  if (stdDev < 5) {
    status = "fail";
    impact = -20;
    detail = "Variación baja entre longitudes de oración (ritmo plano)";
  } else if (stdDev >= 5 && stdDev <= 8) {
    status = "risk";
    impact = -10;
    detail = "Variación aceptable pero con riesgo de ritmo mecánico";
  } else {
    status = "ok";
    detail = "Alta fricción (ritmo de variación muy alta)";
  }

  return {
    value: Number(stdDev.toFixed(2)),
    status,
    impact,
    detail
  };
}

module.exports = { calculateBurstiness };
