export default function KpiCard({ title, data }) {
  if (!data) return null;

  let statusColor = 'var(--text-secondary)';
  let statusIcon = '✓';

  if (data.status === 'fail') {
    statusColor = 'var(--score-poor)';
    statusIcon = '✕';
  } else if (data.status === 'risk') {
    statusColor = 'var(--score-flat)';
    statusIcon = '⚠️';
  } else if (data.status === 'ok') {
    statusColor = 'var(--score-good)';
  } else {
    statusIcon = 'ℹ️';
  }

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 0, marginBottom: '8px' }}>
        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>{title}</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {data.impact < 0 && (
            <span style={{ color: 'var(--score-poor)', fontWeight: '600', fontSize: '0.9rem' }}>
              {data.impact}
            </span>
          )}
          <span style={{ color: statusColor, fontWeight: 'bold' }}>{statusIcon}</span>
        </div>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
        {data.detail}
      </p>
      {data.value !== undefined && typeof data.value !== 'boolean' && data.value !== null && title !== "Contador de Clichés" && (
        <div style={{ marginTop: '8px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
          Valor medido: {data.value}
        </div>
      )}
    </div>
  );
}
