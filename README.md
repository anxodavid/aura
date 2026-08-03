# AURA

Analizador de Uso, Ritmo y Artificios. Pegas un texto y te dice cuánto se parece a lo que escribe un modelo de lenguaje cuando nadie lo revisa después.

No emite un veredicto de "esto es IA". Devuelve una puntuación de 0 a 100 y el desglose de por qué: qué rasgo concreto la ha bajado y en qué parte del texto está.

## Qué mide

Cinco indicadores, cada uno con su penalización sobre una puntuación que empieza en 100.

**Entropía rítmica.** Desviación estándar de la longitud de las frases. La prosa humana alterna frases largas y cortas; la generada tiende a un ritmo uniforme. Se ignoran los fragmentos de menos de diez palabras, que son títulos y viñetas y falsearían la varianza.

**Densidad de especificidad.** Porcentaje del texto ocupado por nombres propios, lugares, organizaciones, siglas, cifras y años. Un texto que no se ancla en nada concreto puede sonar bien y no decir nada.

**Residuos forenses.** Rastros literales de copiar y pegar: caracteres Unicode invisibles, guiones largos, negritas de markdown huérfanas, enlaces en formato markdown, plantillas sin rellenar del tipo `[Insertar nombre]` y marcas de interfaz como "ChatGPT dice:". Uno solo resta treinta puntos.

**Arquitectura predictiva.** La estructura de hamburguesa: apertura genérica, relleno, cierre genérico. Se buscan fórmulas prefabricadas al principio y al final ("En el actual paradigma", "En conclusión").

**Densidad de clichés.** Un diccionario que configuras tú, con las muletillas que te molestan a ti. Se guarda en tu navegador.

Hay una penalización extra de quince puntos para el texto que es plano y abstracto a la vez, que es la combinación característica del relleno.

El detalle de cada cálculo, con umbrales exactos, está en [docs/kpis_calculo.md](docs/kpis_calculo.md).

## El texto no sale de tu navegador

No es una promesa: es que no hay a dónde enviarlo. AURA es un sitio estático. No tiene servidor, ni base de datos, ni analítica, ni registro. El análisis lo ejecuta el propio navegador con JavaScript, y al pulsar Analizar no se produce ninguna petición de red.

Puedes comprobarlo de tres maneras, de menos a más trabajo:

1. Abre la pestaña de red del navegador, pulsa Analizar y mira que no aparece nada.
2. Desconéctate de internet y vuelve a analizar. Funciona igual.
3. Lee el código. El motor son seis funciones puras en [client/src/analyzers/](client/src/analyzers/) y no hay ni un `fetch` en la ruta del análisis.

La tercera es la que cuenta. Las otras dos las verificas en diez segundos.

Tampoco hay peticiones a terceros al cargar la página. Las tipografías van autoalojadas en el propio repositorio en lugar de pedirse a Google Fonts, que es lo habitual y bastaría para que tu IP saliera de tu máquina antes de que escribieras nada. El sitio compilado no contiene ni una sola URL externa.

El único dato que se guarda es tu diccionario de clichés, en el `localStorage` de tu navegador. El texto analizado no se guarda en ninguna parte.

Hubo un backend. El motor vivía en un servidor Express y el navegador le mandaba el texto por HTTP. Al eliminarlo se guardaron las respuestas de aquel servidor para seis textos que cubren los casos límite, y el motor que corre ahora en el navegador tiene que reproducirlas byte a byte. Esa comparación es un test ejecutable ([tests/verify-golden.mjs](tests/verify-golden.mjs)), y corre además cada análisis con las APIs de red del navegador saboteadas, de modo que cualquier intento de usar la red rompe el test. Las respuestas del backend original están en [tests/golden/](tests/golden/) y se pueden auditar.

## Ejecutarlo

Requiere Node.js.

```
cd client
npm install
npm run dev
```

Para generar la versión publicable, `npm run build` desde `client/`. Deja en `client/dist/` un sitio estático que se sube tal cual a cualquier servidor de ficheros.

Para pasar los tests, `npm test` desde `client/`.

## Cómo se hizo

La migración que eliminó el backend se hizo con los tests de referencia capturados antes de tocar el motor, precisamente para que se pudiera comprobar en vez de creer.

## Autoría y licencia

Construida por Anxo Feijóo en el Product Discovery Lab de ECOMT, con [Claude Code](https://claude.com/claude-code).

Apache-2.0. © 2026 ECOMT. Puedes usarla, modificarla y redistribuirla; la licencia obliga a conservar la atribución y a declarar los cambios que hagas.
