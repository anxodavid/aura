const nlp = require('compromise');
const text = `Este es un ejercicio de vacuidad semántica absoluta. He eliminado cualquier rastro de intención comunicativa real para ofrecerte un bloque de texto que utiliza una gramática perfecta para no decir absolutamente nada.

Optimización de la Gobernanza Transversal
En el actual paradigma de disrupción sistémica, nuestra organización se posiciona en el epicentro de la reingeniería de capacidades holísticas, traccionando palancas de valor que permiten una alineación sinérgica con los objetivos macroestructurales. No se trata únicamente de una iteración sobre los flujos de trabajo preexistentes, sino de una arquitectura de procesos líquidos que maximiza la capilaridad del talento interno. Al pivotar hacia modelos de gestión basados en la agilidad orgánica, logramos que la propuesta de valor sea, per se, un catalizador de resiliencia operativa en entornos de volatilidad extrema.

La implementación de marcos de referencia 360 grados facilita la democratización de la eficiencia escalable, permitiendo que cada nodo de la red corporativa actúe como un vector de innovación disruptiva. Estamos capitalizando las fricciones del mercado para transformarlas en activos intangibles de alto impacto, robusteciendo la infraestructura crítica mediante la interoperabilidad de ecosistemas híbridos. Esta visión integradora asegura que la hoja de ruta estratégica no solo sea un documento estático, sino un organismo vivo que se retroalimenta de los datos accionables generados en la frontera de la ejecución técnica.

Para concluir, el compromiso con la excelencia operativa se traduce en una optimización continua de los outputs estratégicos, mitigando los riesgos inherentes a la transformación digital mediante una gobernanza proactiva y transversal. La co-creación de soluciones transversales y el apalancamiento de sinergias colaterales son los pilares que sustentan nuestra ventaja competitiva en el ecosistema global. Al final del día, la métrica del éxito no reside en el cumplimiento de hitos aislados, sino en la capacidad de sostener una narrativa de crecimiento sostenible que trascienda los silos departamentales y unifique la visión corporativa.`;

function calculateSpecificity(text) {
  const doc = nlp(text);
  const isCap = (s) => /^[A-ZÁÉÍÓÚÑ]/.test(s.trim());
  const people = doc.people().out('array').filter(isCap);
  const places = doc.places().out('array').filter(isCap);
  const organizations = doc.organizations().out('array').filter(isCap);
  const acronyms = text.match(/\b[A-ZÁÉÍÓÚÑ]{2,}\b/g) || [];
  const numbers = text.match(/\b\d+([.,]\d+)?%?\b/g) || [];
  const years = text.match(/\b(19|20)\d{2}\b/g) || [];

  const elems = [...people, ...places, ...organizations, ...acronyms, ...numbers, ...years];
  
  const words = text.split(/\s+/).filter(w => w.trim().length > 0);
  const totalWords = words.length;
  const density = (elems.length / totalWords) * 100;

  console.log("Entities found:", elems);
  console.log("Total words:", totalWords);
  console.log("Density:", density.toFixed(2));
}

calculateSpecificity(text);
