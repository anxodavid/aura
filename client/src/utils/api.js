// El análisis se ejecuta en el navegador: aquí no hay ninguna petición de red.
// Se mantiene la firma async para no cambiar a los llamantes, que usan await.
import { analyze } from '../analyzers/analyze.js';

export const analyzeText = async (text, cliches = []) => {
  return analyze(text, cliches);
};
