import { useState } from 'preact/hooks';

export default function SettingsModal({ cliches, onSave, onClose }) {
  const [inputStr, setInputStr] = useState(cliches.join(', '));

  const handleSave = () => {
    const arr = inputStr
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    onSave(arr);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        className="glass-panel"
        style={{ width: '100%', maxWidth: '500px', animation: 'fadeIn 0.2s ease-out' }}
      >
        <h3 style={{ marginBottom: '16px' }}>Configuración de Clichés</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
          Añade frases exactas separadas por comas. Estas frases penalizarán el texto si se
          detectan.
        </p>
        <textarea
          value={inputStr}
          onInput={(e) => setInputStr(e.target.value)}
          placeholder="Ej: en el panorama actual, es crucial entender, sin duda alguna..."
          style={{
            width: '100%',
            height: '120px',
            backgroundColor: 'rgba(0,0,0,0.2)',
            border: '1px solid var(--surface-border)',
            borderRadius: '8px',
            padding: '12px',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
            resize: 'vertical',
            marginBottom: '24px',
            outline: 'none',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
