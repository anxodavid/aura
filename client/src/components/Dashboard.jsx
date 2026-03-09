import KpiCard from './KpiCard';
import HighlightedText from './HighlightedText';

export default function Dashboard({ result, isAnalyzing, text }) {
  if (isAnalyzing) {
    return (
      <div className="glass-panel animate-fade-in" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid var(--surface-border)', borderTopColor: 'var(--primary-accent)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
          <p style={{ color: 'var(--text-secondary)' }}>Procesando patrones...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="glass-panel animate-fade-in" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
        <p>Aún no hay datos. Pega un texto y haz clic en analizar.</p>
      </div>
    );
  }

  const { score, label, kpis, highlights } = result;

  let scoreColor = 'var(--score-good)';
  if (score < 40) scoreColor = 'var(--score-poor)';
  else if (score < 60) scoreColor = 'var(--score-flat)';
  else if (score < 80) scoreColor = 'var(--score-ok)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="glass-panel animate-fade-in" style={{ textAlign: 'center', padding: '32px 24px' }}>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Índice de Fricción</h2>
        <div className="score-value" style={{ fontSize: '4rem', fontWeight: '700', color: scoreColor, lineHeight: '1' }}>
          {score}
        </div>
        <div style={{ marginTop: '8px', fontSize: '1.1rem', fontWeight: '500', color: scoreColor }}>
          {label}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <KpiCard title="Entropía Rítmica (Burstiness)" data={kpis.burstiness} />
        <KpiCard title="Densidad de Especificidad" data={kpis.specificity} />
        <KpiCard title="Análisis Forense de Residuos" data={kpis.forensics} />
        <KpiCard title="Arquitectura Predictiva" data={kpis.structure} />
        <KpiCard title="Contador de Clichés" data={kpis.cliches} />
      </div>

      <div className="glass-panel animate-fade-in" style={{ marginTop: '8px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '1.1rem' }}>Hallazgos en el texto</h3>
        {highlights && highlights.length > 0 ? (
          <HighlightedText text={text} highlights={highlights} />
        ) : (
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No se detectaron clichés ni caracteres especiales destacados.</p>
        )}
      </div>
    </div>
  );
}
