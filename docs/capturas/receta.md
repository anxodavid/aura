# Capturas de la 1.0.0: receta

Cómo se sacaron las imágenes de `docs/capturas/1.0.0/`. Para repetirlas en otra versión,
las mismas reglas con la carpeta nueva.

## Cómo se levantó

Instancia pública (GitHub Pages) de `main`. La página no tiene `/health` ni enseña versión; `main`
no toca código desde la etiqueta `v1.0.0`. Texto de entrada sintético, escrito para la captura
(relleno genérico, sin nombres ni cifras). Para la 03, se le añaden una negrita de markdown y un
guion largo, y se configuran cuatro clichés del propio texto en «Configuración».

## Rutas

`/aura/` (una sola página).

## Pantallas

| Fichero | Qué se hace antes | Tapado |
|---|---|---|
| `01-indice.webp` | Pegar el texto y «Analizar densidad» | nada |
| `02-desglose.webp` | Scroll del panel derecho hasta «Arquitectura Predictiva» | nada |
| `03-hallazgos.webp` | Texto con residuos, clichés configurados, «Hallazgos en el texto» arriba del panel | nada |
| `04-cliches.webp` | Abrir «Configuración» con los clichés escritos | nada |

## Cómo se tapa

**Alcance:** solo identificadores (personas, correos, clientes, instalaciones, boards, ids,
números de serie, IPs) y cifras económicas, de ahorro y de energía. El resto del texto dinámico
(estados, categorías, textos de la app, fechas que no identifican una sesión) queda nítido.

**Cómo:** antes de capturar, en la página, el trozo se **sustituye** por otro de la misma longitud
y forma (cada cifra por otra al azar, cada letra por otra al azar; espacios, puntuación y unidades
se quedan) y **después se difumina** con `filter: blur()`. Nunca se difumina el texto real.

**Radio:** el mínimo que deja ilegible el texto sustituido: **3 px** con letra de menos de 20 px y
el **30 % del cuerpo** con letra mayor (el 20 % orientativo dejaba adivinar las cifras grandes).

En HTML cada trozo va en su propio `<span>` y las unidades quedan nítidas; en SVG (ejes) se
difumina el `<text>` entero. Modos: *texto completo* (todo el elemento), *propio* (solo el texto
directo del elemento), *cifras* (solo los números), *%* / *€* (el número delante), *$* (el número
detrás), *json* (claves nítidas, valores sustituidos), *regex* (lo que case).

Viewport 1280 × 800, Chromium (Playwright), sin barra del navegador. `.webp` < 500 000 bytes.
