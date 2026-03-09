import { useState, useEffect } from 'preact/hooks';
import TextInputPanel from './components/TextInputPanel';
import Dashboard from './components/Dashboard';
import SettingsModal from './components/SettingsModal';
import { analyzeText } from './utils/api';
import './index.css';

export function App() {
  const [text, setText] = useState('');
  const [cliches, setCliches] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState(null);
  const [analyzedText, setAnalyzedText] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('friccion.cliches');
      if (stored) {
        setCliches(JSON.parse(stored));
      }
    } catch (e) {
      console.error("No se pudieron cargar los clichés");
    }
  }, []);

  const handleSaveCliches = (newCliches) => {
    setCliches(newCliches);
    localStorage.setItem('friccion.cliches', JSON.stringify(newCliches));
    setShowSettings(false);
  };

  const handleAnalyze = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setText(trimmed); // Force UI text to match backend exactly to prevent highlight index shifts
    setAnalyzedText(trimmed);
    setIsAnalyzing(true);
    setError(null);
    try {
      const data = await analyzeText(trimmed, cliches);
      setResult(data);
    } catch (err) {
      setError(err.message || "Error al conectar con el servidor.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setText('');
    setAnalyzedText('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="app-container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ background: 'linear-gradient(to right, var(--text-primary), var(--text-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
            AURA
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Detecta monotonicidad, residuos y estructura predecible
          </p>
        </div>
        <button className="btn-secondary" onClick={() => setShowSettings(true)}>
          ⚙️ Configuración
        </button>
      </header>

      {error && (
        <div style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.5)', padding: '12px', borderRadius: '8px', color: '#fca5a5' }}>
          {error}
        </div>
      )}

      <main className="main-layout animate-fade-in">
        <div className="left-panel">
          <TextInputPanel 
            text={text} 
            setText={setText} 
            onAnalyze={handleAnalyze} 
            onClear={handleClear} 
            isAnalyzing={isAnalyzing} 
          />
        </div>
        
        <div className="right-panel">
          <Dashboard result={result} isAnalyzing={isAnalyzing} text={analyzedText} />
        </div>
      </main>

      {showSettings && (
        <SettingsModal 
          cliches={cliches} 
          onSave={handleSaveCliches} 
          onClose={() => setShowSettings(false)} 
        />
      )}
    </div>
  );
}
