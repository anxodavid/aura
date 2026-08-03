// client/src/analyzers/forensics.js
export function analyzeForensics(text) {
  const rules = [
    { type: 'invisible_chars', regex: /[\u200B\u00A0\uFEFF]/g },
    { type: 'ui_marker', regex: /(ChatGPT|Gemini|Claude)\s*(dice|ha dicho|:)/gi },
    { type: 'orphan_markdown', regex: /\*\*[^*]+\*\*/g },
    { type: 'markdown_link', regex: /\[[^\]]+\]\(https?:\/\/[^)]+\)/gi },
    { type: 'empty_template', regex: /\[(Insertar|Añadir)[^\]]+\]/gi },
    { type: 'em_dash', regex: /[\u2013\u2014]/g }
  ];

  let matches = [];

  for (const rule of rules) {
    let match;
    // reset last index for global regexes
    rule.regex.lastIndex = 0;
    while ((match = rule.regex.exec(text)) !== null) {
      matches.push({
        type: rule.type,
        text: match[0],
        index: match.index
      });
      // prevent infinite loops if regex matched empty string
      if (match.index === rule.regex.lastIndex) {
        rule.regex.lastIndex++;
      }
    }
  }

  if (matches.length > 0) {
    return {
      value: true,
      status: "fail",
      impact: -30,
      detail: "Se detectaron residuos forenses incompatibles con un copy limpio",
      matches
    };
  }

  return {
    value: false,
    status: "ok",
    impact: 0,
    detail: "Sin residuos forenses evidentes",
    matches: []
  };
}
