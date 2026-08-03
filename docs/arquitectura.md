# Documentación Arquitectónica - V0 Analizador de Fricción Cognitiva

## 1. Visión General del Sistema

El Analizador de Fricción Cognitiva es una herramienta diseñada para evaluar textos en busca de patrones lingüísticos, estilísticos y forenses típicos de la generación de lenguaje mediante inteligencia artificial (LLMs). En lugar de emitir un simple veredicto ("Es IA" o "No es IA"), el motor descompone el texto y calcula un **Índice de Fricción**, evaluando la "humanidad" de la redacción.

## 2. Pila Tecnológica

La aplicación no tiene backend. Es un sitio estático: todo el análisis se ejecuta en el navegador del usuario y el texto nunca sale de la pestaña. No hay servidor al que enviarlo, ni base de datos, ni registro de ningún tipo.

- **Preact + Vite**: Renderizado y empaquetado del sitio estático.
- **Compromise (NLP Ligero)**: Extracción de entidades y Parts-of-Speech (PoS), ejecutándose en el cliente.
- **RegEx Engine**: Residuos forenses y firmas predictivas.
- **CSS Modular (Glassmorphism)**: Diseño dinámico basado en gradientes responsivos.
- **Almacenamiento Local (localStorage)**: Persiste únicamente el diccionario de clichés personalizados. El texto analizado no se guarda.

### 2.1 Motor de análisis (`client/src/analyzers/`)

Seis funciones puras de texto a objeto, sin estado ni efectos: `burstiness.js`, `specificity.js`, `forensics.js`, `structure.js`, `cliches.js` y `score.js`. Las orquesta `analyze.js`, que expone una única función síncrona `analyze(text, cliches)` y devuelve `{ score, label, kpis, highlights, meta }`.

`client/src/utils/api.js` conserva el nombre y la firma que tenía cuando había red (`analyzeText(text, cliches)`, `async`) para no obligar a cambiar a los componentes, pero por dentro es una llamada directa a `analyze()`.

### 2.2 Garantía de que no hay red

Originalmente el motor vivía en un servidor Express (`server/`) al que el cliente llamaba por `fetch`. Al migrarlo al navegador se capturó primero la respuesta JSON completa del backend para seis textos que cubren los casos límite (`tests/golden/`), y el motor portado debe reproducirla **byte a byte**. `tests/verify-golden.mjs` comprueba esa igualdad y, además, ejecuta los seis análisis con `fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource` y `navigator` saboteados para que cualquier intento de usar la red haga fallar el test. Se ejecuta con `npm test` desde `client/`.

Las tipografías (Inter y Outfit) van autoalojadas en `client/src/assets/fonts/` en vez de pedirse a Google Fonts, de modo que el sitio compilado no contiene ninguna URL externa y la carga de la página tampoco filtra la IP del visitante a terceros.

## 3. Funcionamiento de los 5 KPIs

El puntaje total (de 0 a 100) empieza en 100 y se ve penalizado dinámicamente según el fallo de varios indicadores clave de rendimiento (KPIs).

### KPI 1: Entropía Rítmica (Burstiness)

- Calcula la desviación estándar de la longitud de las oraciones en número de palabras.
- Ignora los fragmentos cortos (<10 palabras) como títulos o viñetas para no sesgar falsamente la métrica.

### KPI 2: Densidad de Especificidad

- Utiliza `compromise` para encontrar Porcentajes, Nombres de Personas, Lugares, Organizaciones y Cifras.
- Si estos elementos representan menos del 3% del total de las palabras, se considera una sintaxis de relleno ("slop"), restando fuertemente al score total.

### KPI 3: Análisis Forense de Residuos

- Actúa como un firewall estricto. Busca rastros literales de copiar-pegar desde interfaces tipo ChatGPT o Claude (Ej. Caracteres invisibles Unicode, guiones largos, enlaces markdown alucinados, o frases como "ChatGPT dice:"). Un solo fallo quita 30 puntos enteros y arrastra el score final al umbral del suspenso.

### KPI 4: Arquitectura Predictiva

- Detecta la infame "Estructura de Hamburguesa Temática" de los LLMs. Inspecciona el principio y el final buscando frases pre-calculadas (ej. "En el actual paradigma", "En conclusión").

### KPI 5: Densidad de Clichés

- Busca ocurrencias de jerga o muletillas en un diccionario configurable. Penaliza en función de la repetición.

## 4. Combinaciones Sinérgicas (Slop Penalty)

Si un texto reprueba la **Entropía Rítmica** (muy plano) Y ADEMÁS reprueba la **Especificidad** (muy abstracto/vacío), se aplica un castigo extra de **-15 puntos**.

## 5. Renderizado Visual y Sincronización de Estado (El Problema del Offset)

El bug que veías con el texto moviéndose se debía a una condición de carrera de estado visual:

1. Al pulsar Analizar, el **motor de análisis** limpia los espacios sobrantes (trim) y calcula los índices matemáticos de los residuos sobre ese texto limpio.
2. El **Frontend** recibía los números, pero los dibujaba sobre el texto "vivo" del textarea. Si borrabas texto, los marcadores visuales seguían las coordenadas antiguas sobre el texto nuevo, descuadrando por completo.
3. **La solución implementada:** El Frontend ahora hace una **Copia Congelada** (`analyzedText`) del estado exacto en el momento del análisis, y es ese texto estático el que se utiliza para pintar el recuadro "Hallazgos en el texto", manteniéndolo siempre 100% alineado.
