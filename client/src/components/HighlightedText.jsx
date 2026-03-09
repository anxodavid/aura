export default function HighlightedText({ text, highlights }) {
  if (!highlights || highlights.length === 0) {
    return <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{text}</div>;
  }

  const sorted = [...highlights].sort((a, b) => a.start - b.start);
  
  const parts = [];
  let currentIndex = 0;

  for (const hl of sorted) {
    if (hl.start < currentIndex) continue;

    if (hl.start > currentIndex) {
      parts.push({
        text: text.substring(currentIndex, hl.start),
        type: 'normal'
      });
    }

    parts.push({
      text: text.substring(hl.start, hl.end),
      type: hl.type
    });

    currentIndex = hl.end;
  }

  if (currentIndex < text.length) {
    parts.push({
      text: text.substring(currentIndex),
      type: 'normal'
    });
  }

  return (
    <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', whiteSpace: 'pre-wrap', lineHeight: '1.6', background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid var(--surface-border)' }}>
      {parts.map((part, i) => {
        if (part.type === 'normal') return <span key={i}>{part.text}</span>;
        
        let badgeClass = 'highlight-badge ';
        if (part.type === 'residuo') badgeClass += 'highlight-residuo';
        else if (part.type === 'cliche') badgeClass += 'highlight-cliche';
        else if (part.type === 'em_dash') badgeClass += 'highlight-em_dash';
        else if (part.type === 'link') badgeClass += 'highlight-link';
        else badgeClass += 'highlight-estructura';

        return (
          <span key={i} className={badgeClass} title={`Tipo: ${part.type}`}>
            {part.text}
          </span>
        );
      })}
    </div>
  );
}
