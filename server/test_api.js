const text = `Este es un ejercicio de vacuidad semántica absoluta. He eliminado cualquier rastro de intención comunicativa real para ofrecerte un bloque de texto que utiliza una gramática perfecta para no decir absolutamente nada.

Optimización de la Gobernanza Transversal
En el actual paradigma de disrupción sistémica, nuestra organización se posiciona en el epicentro de la reingeniería de capacidades holísticas, traccionando palancas de valor que permiten una alineación sinérgica con los objetivos macroestructurales. No se trata únicamente de una iteración sobre los flujos de trabajo preexistentes, sino de una arquitectura de procesos líquidos que maximiza la capilaridad del talento interno. Al pivotar hacia modelos de gestión basados en la agilidad orgánica, logramos que la propuesta de valor sea, per se, un catalizador de resiliencia operativa en entornos de volatilidad extrema.

La implementación de marcos de referencia 360 grados facilita la democratización de la eficiencia escalable, permitiendo que cada nodo de la red corporativa actúe como un vector de innovación disruptiva. Estamos capitalizando las fricciones del mercado para transformarlas en activos intangibles de alto impacto, robusteciendo la infraestructura crítica mediante la interoperabilidad de ecosistemas híbridos. Esta visión integradora asegura que la hoja de ruta estratégica no solo sea un documento estático, sino un organismo vivo que se retroalimenta de los datos accionables generados en la frontera de la ejecución técnica.

Para concluir, el compromiso con la excelencia operativa se traduce en una optimización continua de los outputs estratégicos, mitigando los riesgos inherentes a la transformación digital mediante una gobernanza proactiva y transversal. La co-creación de soluciones transversales y el apalancamiento de sinergias colaterales son los pilares que sustentan nuestra ventaja competitiva en el ecosistema global. Al final del día, la métrica del éxito no reside en el cumplimiento de hitos aislados, sino en la capacidad de sostener una narrativa de crecimiento sostenible que trascienda los silos departamentales y unifique la visión corporativa.`;

fetch('http://localhost:3001/api/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({text})
}).then(r => r.json()).then(o => console.log(JSON.stringify(o, null, 2)));
