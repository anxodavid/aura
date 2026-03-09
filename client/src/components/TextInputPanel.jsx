export default function TextInputPanel({ text, setText, onAnalyze, onClear, isAnalyzing }) {
  const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
  const sentenceCount = text.split(/[.?!]+(?=\s|$)/).filter(s => s.trim().length > 0).length;
  const paragraphCount = text.split(/\n+/).filter(p => p.trim().length > 0).length;

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h3 style={{ marginBottom: '16px' }}>Texto a Analizar</h3>
      <textarea
        value={text}
        onInput={(e) => setText(e.target.value)}
        placeholder="Pega aquí un texto para analizar su carga cognitiva..."
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.2)',
          border: '1px solid var(--surface-border)',
          borderRadius: '8px',
          padding: '16px',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-sans)',
          fontSize: '1rem',
          resize: 'none',
          outline: 'none',
          marginBottom: '16px'
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', gap: '16px' }}>
          <span>{wordCount} palabras</span>
          <span>{sentenceCount} oraciones</span>
          <span>{paragraphCount} párrafos</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-secondary" onClick={onClear} disabled={isAnalyzing || text.length === 0}>
            Limpiar
          </button>
          <button className="btn-primary" onClick={onAnalyze} disabled={isAnalyzing || text.length === 0}>
            {isAnalyzing ? 'Analizando...' : 'Analizar densidad'}
          </button>
        </div>
      </div>
    </div>
  );
}
