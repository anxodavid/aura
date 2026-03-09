export const analyzeText = async (text, cliches = []) => {
  const response = await fetch('http://localhost:3001/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text, cliches })
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error en el análisis');
  }
  
  return response.json();
};
