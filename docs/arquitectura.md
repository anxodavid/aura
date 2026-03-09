# Documentación Arquitectónica - V0 Analizador de Fricción Cognitiva

## 1. Visión General del Sistema
El Analizador de Fricción Cognitiva es una herramienta diseñada para evaluar textos en busca de patrones lingüísticos, estilísticos y forenses típicos de la generación de lenguaje mediante inteligencia artificial (LLMs). En lugar de emitir un simple veredicto ("Es IA" o "No es IA"), el motor descompone el texto y calcula un **Índice de Fricción**, evaluando la "humanidad" de la redacción.


## 2. Pila Tecnológica
La aplicación sigue una arquitectura puramente separada de Frontend/Backend para facilitar su testeo y posterior escalabilidad.

### 2.1 Backend (Motor de Análisis)
*   **Node.js + Express**: Servidor REST ligero.
*   **Compromise (NLP Ligero)**: Utilizado para la extracción rápida de entidades y Parts-of-Speech (PoS).
*   **RegEx Engine**: Empleado para la arquitectura de residuos forenses y firmas predictivas.

### 2.2 Frontend (Interfaz de Usuario)
*   **Preact + Vite**: Renderizado ultrarrápido y reactividad.
*   **CSS Modular (Glassmorphism)**: Diseño dinámico basado en gradientes responsivos.
*   **Almacenamiento Local (localStorage)**: Para persistir la configuración de clichés personalizados.

## 3. Funcionamiento de los 5 KPIs

El puntaje total (de 0 a 100) empieza en 100 y se ve penalizado dinámicamente según el fallo de varios indicadores clave de rendimiento (KPIs).

### KPI 1: Entropía Rítmica (Burstiness)
*   Calcula la desviación estándar de la longitud de las oraciones en número de palabras.
*   Ignora los fragmentos cortos (<10 palabras) como títulos o viñetas para no sesgar falsamente la métrica.

### KPI 2: Densidad de Especificidad
*   Utiliza `compromise` para encontrar Porcentajes, Nombres de Personas, Lugares, Organizaciones y Cifras.
*   Si estos elementos representan menos del 2% del total de las palabras, se considera una sintaxis de relleno ("slop"), restando fuertemente al score total.

### KPI 3: Análisis Forense de Residuos
*   Actúa como un firewall estricto. Busca rastros literales de copiar-pegar desde interfaces tipo ChatGPT o Claude (Ej. Caracteres invisibles Unicode, guiones largos, enlaces markdown alucinados, o frases como "ChatGPT dice:"). Un solo fallo quita 30 puntos enteros y arrastra el score final al umbral del suspenso.

### KPI 4: Arquitectura Predictiva
*   Detecta la infame "Estructura de Hamburguesa Temática" de los LLMs. Inspecciona el principio y el final buscando frases pre-calculadas (ej. "En el actual paradigma", "En conclusión").

### KPI 5: Densidad de Clichés
*   Busca ocurrencias de jerga o muletillas en un diccionario configurable. Penaliza en función de la repetición.

## 4. Combinaciones Sinérgicas (Slop Penalty)
Si un texto reprueba la **Entropía Rítmica** (muy plano) Y ADEMÁS reprueba la **Especificidad** (muy abstracto/vacío), se aplica un castigo extra de **-15 puntos**.

## 5. Renderizado Visual y Sincronización de Estado (El Problema del Offset)
El bug que veías con el texto moviéndose se debía a una condición de carrera de estado visual:
1. Al pulsar Analizar, el **Backend** limpia los espacios sobrantes (trim) y calcula los índices matemáticos de los residuos sobre ese texto limpio.
2. El **Frontend** recibía los números, pero los dibujaba sobre el texto "vivo" del textarea. Si borrabas texto, los marcadores visuales seguían las coordenadas antiguas sobre el texto nuevo, descuadrando por completo.
3. **La solución implementada:** El Frontend ahora hace una **Copia Congelada** (`analyzedText`) del estado exacto en el momento del análisis, y es ese texto estático el que se utiliza para pintar el recuadro "Hallazgos en el texto", manteniéndolo siempre 100% alineado.
