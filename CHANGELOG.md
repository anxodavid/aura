# Changelog

Todos los cambios relevantes de AURA. El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el versionado es [semántico](https://semver.org/lang/es/).

## [1.0.0] - 2026-08-03

El análisis pasa a ejecutarse íntegramente en el navegador y desaparece el backend. La promesa de privacidad deja de ser una afirmación y pasa a ser comprobable: cualquiera puede abrir la pestaña de red, pulsar Analizar y ver que no sale nada.

### Eliminado

- **BREAKING: desaparece el backend.** Ya no existe el directorio `server/` ni el servidor Express que escuchaba en el puerto 3001. No hay API, no hay endpoint `POST /api/analyze` y no hay nada que desplegar aparte del sitio estático. Cualquier integración que llamase a aquella API deja de funcionar y no tiene sustituto: el motor solo es accesible como módulo del cliente.
- Las dependencias `express` y `cors`.
- Los envoltorios `iniciar.bat` e `instalar.bat` salen del control de versiones. Eran dos comandos que el README documenta, y se quedaron obsoletos al eliminar el backend.

### Añadido

- Los cinco analizadores y el cálculo de puntuación corren en el cliente, en `app/src/analyzers/`, portados de CommonJS a ESM.
- `analyze(text, cliches)`: función síncrona y pura que orquesta el análisis y devuelve `{ score, label, kpis, highlights, meta }`. Reemplaza a la ruta Express.
- Tipografías Inter y Outfit autoalojadas en el repositorio. El `@import` a Google Fonts era la última petición saliente del sitio; ahora el build no contiene ni una sola URL externa y cargar la página no filtra la IP del visitante a terceros.
- Aviso de privacidad visible en la interfaz, sin desplegar nada: el análisis ocurre en tu navegador, el texto no se envía a ningún servidor y no se guarda en ninguna parte.
- Suite de aceptación por golden en `tests/`. Antes de tocar el motor se capturó la respuesta JSON completa del backend Express para seis textos que cubren los casos límite (texto largo y variado, texto plano y genérico, residuos forenses, clichés del diccionario personalizado, estructura de hamburguesa y muestra insuficiente). `tests/verify-golden.mjs` exige que la salida del motor portado sea **idéntica byte a byte** a esas respuestas, y además ejecuta los seis análisis con `fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource` y `navigator` sustituidos por getters que lanzan, de modo que cualquier intento futuro de usar la red rompe el test.
- Despliegue automático a GitHub Pages en cada push a `main`. Los tests bloquean la publicación: si un golden falla, no se sube artefacto.
- `base: '/aura/'` en la configuración de Vite, necesario para que las project pages de GitHub Pages sirvan los activos desde el subcamino correcto.
- Licencia Apache-2.0 y `LICENSE` en la raíz.
- `.gitattributes` que fuerza LF en los ficheros de texto. Los golden se comparan byte a byte y un clon en Windows con `core.autocrlf=true` los recibía con CRLF, haciendo fallar el test de aceptación sin que nada estuviera roto.

### Cambiado

- El directorio `client/` pasa a llamarse `app/`. Sin backend del que distinguirse, "client" describía una arquitectura que ya no existe, y además obligaba a que la configuración de las herramientas viviera dentro de él. Afecta a rutas de workflows, configuración de ESLint y Prettier, Dependabot y documentación; no afecta a la `base` de Vite, que es una ruta de URL y no de directorio.
- `utils/api.js` mantiene el nombre y la firma que exportaba cuando había red (`analyzeText(text, cliches)`, `async`), pero por dentro llama a `analyze()` directamente. Ningún componente cambió.
- Las dos validaciones que el backend devolvía como HTTP 400 ahora lanzan `Error` con el mismo mensaje: "Texto inválido o ausente" y "El texto está vacío".

### Sin cambios

- **Ni un umbral, ni una penalización, ni un algoritmo.** El diff de los seis analizadores contra su versión de servidor es exclusivamente sintáctico: cabecera de comentario, `export`, `import`, el formato que impone Prettier (comillas, comas finales, saltos de línea) y una variable muerta ya en el original (`lowerText` en `cliches.js`, asignada y nunca leída). Que los golden sigan idénticos byte a byte es la prueba de que nada de eso cambió el comportamiento.

### Corregido

- `docs/arquitectura.md` documentaba el umbral de densidad de especificidad como 2%. El código y `docs/kpis_calculo.md` dicen 3%. Se corrigió la documentación, no el código.

## [0.1.0] - 2026-03-09

Primera versión funcional, con arquitectura cliente/servidor.

### Añadido

- Motor de análisis en Node.js con Express, sirviendo `POST /api/analyze` en el puerto 3001.
- Los cinco indicadores: entropía rítmica (burstiness), densidad de especificidad, análisis forense de residuos, arquitectura predictiva y densidad de clichés.
- Penalización sinérgica de 15 puntos para el texto que es plano y abstracto a la vez.
- Interfaz en Preact y Vite, con puntuación, desglose por indicador y resaltado de los hallazgos sobre el propio texto.
- Diccionario de clichés configurable por el usuario, persistido en `localStorage`.
- Documentación de arquitectura, cálculo de los KPIs y guía de uso.

[1.0.0]: https://github.com/anxodavid/aura/releases/tag/v1.0.0
[0.1.0]: https://github.com/anxodavid/aura/commit/25d16d2
