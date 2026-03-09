# Cálculo de KPIs de AURA

AURA (Analizador de Uso, Ritmo y Artificios) evalúa el texto basándose en cinco métricas clave (KPIs), aplicando penalizaciones sobre una puntuación base inicial de 100 puntos. A continuación, se detalla el método de cálculo de cada uno de estos KPIs.

## 1. Entropía Rítmica (Burstiness)
Evalúa la variación en la longitud de las oraciones para determinar si el ritmo de escritura es mecánico o natural.

- **Cómo se calcula:**
  - El texto se fragmenta en oraciones delimitadas por signos de puntuación (`.`, `?`, `!`).
  - Se cuenta el número de palabras válidas por oración. Para evitar que títulos cortos sesguen la varianza, se ignoran las oraciones con menos de 10 palabras.
  - Se requiere un mínimo de 3 oraciones analizables para realizar el cálculo.
  - Se calcula la **desviación estándar** matemática de la longitud de dichas oraciones.
- **Impacto en el Índice:**
  - Desviación estándar < 5: Ritmo plano o mecánico (**-20 puntos**)
  - Desviación estándar entre 5 y 8: Riesgo leve de ritmo mecánico (**-10 puntos**)
  - Desviación estándar > 8 o muestra temporal insuficiente: Alta variación o ritmo natural (**0 puntos**)

## 2. Densidad de Especificidad
Mide la proporción de entidades, cifras y anclajes reales versus texto genérico y abstracto.

- **Cómo se calcula:**
  - Usa Procesamiento de Lenguaje Natural (NLP mediante `compromise`) para identificar Personas, Lugares y Organizaciones, validando que comiencen con mayúscula inicial.
  - Mediante expresiones regulares, extrae siglas (2 o más mayúsculas), números (incluidos porcentajes y decimales) y referencias a años recientes.
  - Suma todas estas ocurrencias y calcula el porcentaje de densidad con respecto al número total de palabras del texto.
- **Impacto en el Índice:**
  - Densidad < 3%: Slop abstracto o carente de anclajes reales (**-20 puntos**)
  - Densidad entre 3% y 6%: Densidad media-baja de elementos específicos (**-10 puntos**)
  - Densidad > 6%: Densidad neutra/alta (**0 puntos**)

## 3. Análisis Forense de Residuos
Escanea el texto buscando patrones indicativos de un "copy-paste" descuidado desde herramientas de Inteligencia Artificial que generan o procesan texto.

- **Cómo se calcula:**
  - Mediante expresiones regulares busca:
    - Caracteres y espacios invisibles (de ancho cero, no-break, etc.).
    - Marcadores residuales de UI como "ChatGPT dice:", "Claude ha dicho:".
    - Marcado Markdown residual como negritas sueltas o enlaces formados como `[texto](url)` en vez de HTML limpio.
    - Plantillas vacías sin rellenar (`[Insertar X]`, `[Nombre]`).
    - Abuso intensivo de guiones largos (*em-dash*).
- **Impacto en el Índice:**
  - Si se encuentra por lo menos un residuo: **-30 puntos**.
  - Si el texto está totalmente limpio de estos marcadores: **0 puntos**.

## 4. Arquitectura Predictiva (Structure)
Comprueba si el texto recurre excesivamente a aperturas y cierres basados en clichés compositivos, haciéndolo predecible.

- **Cómo se calcula:**
  - Extrae los primeros dos párrafos para considerarlos "apertura" y los últimos dos como "cierre".
  - Compara estos fragmentos buscando apariciones de frases plantilla (ej. introducciones como *"en el paradigma actual"*, *"es crucial entender"* y cierres como *"en conclusión"*, *"al final del día"*).
- **Impacto en el Índice:**
  - Si se detecta un patrón predecible tanto en apertura como cierre: **-20 puntos**
  - Si se detecta un patrón predecible en un solo bloque (solo inicio o solo cierre): **-10 puntos**
  - Sin patrones predecibles detectables (o texto muy corto): **0 puntos**

## 5. Contador de Clichés
Verifica la presencia de jerga, tópicos corporativos o frases que el usuario ha solicitado penalizar explícitamente desde su panel de configuración de clichés.

- **Cómo se calcula:**
  - Busca en el texto de forma insensible a mayúsculas cualquier coincidencia de las expresiones que el usuario ha añadido a la configuración.
- **Impacto en el Índice:**
  - Cuenta cada aparición individual y penaliza linealmente multiplicando el número de coincidencias por **-5**.
  - Este KPI tiene un nivel máximo de penalización de **-15 puntos** en total para no desvirtuar el resto del análisis. (Si no se ha detectado nada: 0 puntos).

## 6. Índice Final de Fricción
La puntuación global indica desde un punto de vista holístico la naturalidad y fricción que genera el texto en comparación con un contenido genérico y automatizado al uso.

- **Construcción del Índice:** 
  1. Parte de una base perfecta de **100**.
  2. Resta las penalizaciones obtenidas de los 5 KPIs evaluados.
  3. **Penalización Sinérgica:** Si el texto es plano (Burstiness con penalización) **Y A LA VEZ** abstracto (Especificidad con penalización grave), se aplica una severa **penalización adicional de -15 puntos**. Combinar estos dos atributos es un indicativo claro de contenido vacío y carente de interés humano.

- **Categorización Final:** (El índice tiene un suelo de 0 puntos).
  - **80 – 100:** Alta fricción (Natural y con suficiente anclaje específico).
  - **60 – 79:** Aceptable.
  - **40 – 59:** Riesgo de texto plano.
  - **0 – 39:** Muy predecible o artificial.
