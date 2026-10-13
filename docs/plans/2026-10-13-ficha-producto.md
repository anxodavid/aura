# Ficha de producto de AURA — plan y borrador

**Fecha:** 2026-10-13 · **Entrada:** `andel/docs/prompts/2026-10-13-fichas-del-lab.md`
· **Norma:** `../metodo/ficha-producto.md` · **Ejemplo:** `../KELVIN/docs/ficha.md`

Estado: **borrador, pendiente de aprobación de Cowork.**

## Lo comprobado para escribirla

| Qué | Resultado |
|---|---|
| Rama | `main` en `9a5b8de` (= `origin/main`), árbol limpio antes de empezar |
| Dónde vive | `origin` = `github.com/anxodavid/aura`, repo público en la cuenta personal de GitHub, **no en el grupo `lab` de `git.ecomt.net`**. Licencia Apache-2.0, © 2026 ECOMT (`LICENSE`, README) |
| `revisado_en` | `CHANGELOG.md` en `main`: primer release `## [1.0.0] - 2026-08-03`, con la forma de `versionado.md §1` |
| `pdl` | No consta: ni en el repo, ni en `andel/catalogo/apps/aura.toml`, ni en la bóveda (`Proyectos\AURA.md`, `Proyectos\AURA\`) |
| Qué es | Sitio estático Preact + Vite. El análisis corre en el navegador; no hay servidor (CHANGELOG 1.0.0, README) |
| Contra qué datos corre | Ninguno: solo el texto que pega quien lo usa. Sin base de datos, sin OTEA, sin red. `tests/verify-golden.mjs` sabotea `fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource` y `navigator` y falla si el motor los usa |
| Despliegue | GitHub Pages, automático en cada push a `main` (`.github/workflows/deploy.yml`), bloqueado si fallan los golden. Público: `anxodavid.github.io/aura/` (README, toml de Andel). Bóveda: verificado en vivo el 3-ago-2026 sin tráfico saliente. No lo he vuelto a comprobar (sin peticiones HTTP) |
| Uso | Bóveda, «Medir el uso»: no hay ni habrá dato de uso; añadir analítica rompería el test y la promesa de privacidad |
| Límites | Bóveda, «Decisiones / notas»: «no mide calidad ni detecta "alma"». «Cierre del 3-ago»: no caza la construcción «no por X, sino por Y». «Mejoras»: falso negativo de la estructura prefabricada en textos cortos; el diccionario no se puede exportar |
| Idioma | Supuesto: la detección de nombres propios usa `compromise`, librería de PLN pensada para inglés; en castellano puede reconocer peor. No comprobado con textos; no lo llevo a la ficha |
| `problema` de Andel | «Textos genéricos que hacen perder el tiempo, y textos propios que no se deberían firmar.» Cuadra con «Objetivo» de la bóveda. Se mantiene en el apartado 1. El toml no tiene `no_hace` |
| Autorización | Bóveda, 3-ago-2026: Anxo, como director del PDL, decide que es producto del lab, propiedad de ECOMT, y autoriza publicarlo |

## Desviaciones respecto al prompt

1. **El descriptor de Andel cumple la forma y no el fondo.** «Detección confidencial de la falta de
   alma de un texto» tiene 54 caracteres y no lleva punto. Pero promete detectar «alma», y la propia
   nota de la bóveda dice que la herramienta no lo detecta: detecta que un texto suena plano,
   predecible o genérico. Propongo **«Detección de texto genérico sin que salga del navegador»**
   (55): dice qué hace y conserva lo de «confidencial» en una forma que se puede comprobar.
2. **AURA no encaja del todo en el protocolo.** No usa datos de OTEA ni de cliente, no es integrable
   con OTEA (`D4`, `D5`) y su público es cualquiera, no un cliente. El toml de Andel ya marca
   `[HUECO] si entra en Andel como pieza del lab`. La ficha se puede escribir igual, pero `madurez`,
   `estado` y `audiencia` dependen de esa decisión.
3. **Vive fuera del grupo `lab`.** El repo está en la cuenta personal de GitHub. La ficha solo lo
   dice de forma genérica («en un repositorio público»), sin ruta, por §5.

## Borrador de `docs/ficha.md`

```markdown
---
producto: AURA
descriptor: Detección de texto genérico sin que salga del navegador
pdl: "?"
madurez: 2
estado: demo
modalidad: M1
audiencia: "?"
revisado: 2026-10-13
revisado_en: 1.0.0
pendiente:
  - campo: pdl
    motivo: AURA no tiene identificador PDL asignado en ninguna fuente
    ref: protocolo-madurez.md §1.3
  - campo: estado
    motivo: la norma no fija qué separa "demo condicionada" de "demo"
    ref: protocolo-madurez.md §2.1
  - campo: audiencia
    motivo: es pública, y el único valor en uso, "ambos", no lo describe
    ref: ficha-producto.md §2
---

## Qué problema resuelve

Cada vez más textos suenan igual: ritmo uniforme, nada concreto a lo que agarrarse, una apertura y
un cierre de manual. Leerlos hace perder el tiempo, y firmar uno propio que suena así cuesta
credibilidad. Detectarlo a ojo es lento y depende de quién lea. Y pasar el texto por un servicio
externo para analizarlo es entregárselo a un tercero, que es justo lo que no se quiere hacer con un
borrador propio o con un texto confidencial.

## Qué decisión permite tomar

Si un texto merece leerse con atención, o si uno propio está listo para firmarse o necesita otra
vuelta, y en qué partes. En lugar de una impresión, se lee una puntuación con el motivo de cada
descuento señalado sobre el propio texto.

## Qué te deja hacer

- Pegar un texto y obtener una puntuación con el desglose de qué rasgo concreto la ha bajado.
- Ver resaltado sobre el texto dónde está cada hallazgo.
- Medir por separado cinco cosas: si las frases varían de ritmo, si el texto se ancla en nombres,
  lugares y cifras, si quedan restos de copiar y pegar de un asistente, si abre y cierra con
  fórmulas prefabricadas, y cuántas muletillas usa.
- Mantener tu propio diccionario de muletillas, que se guarda en tu navegador.
- Comprobar que el texto no sale de tu equipo: funciona sin conexión, no hace ninguna petición al
  analizar, y sus pruebas fallan si alguien añade una llamada de red.

## Qué no hace

- No dice si un texto lo ha escrito una IA. Da una puntuación de parecido y sus motivos, no un
  veredicto.
- No mide la calidad ni si lo que dice es cierto. Detecta que un texto suena plano, predecible o
  poco trabajado; un texto bueno y sobrio puede puntuar bajo.
- No caza todas las construcciones de relleno. Los contrastes del tipo «no es esto, sino aquello» y
  la intriga artificial no se detectan, y en textos cortos la estructura prefabricada se le escapa.
- No guarda los textos ni mide su uso. No hay servidor, ni registro, ni analítica, así que no hay
  dato de quién lo usa ni para qué.
- No tiene cuentas de usuario. El diccionario vive en un navegador y no se puede exportar ni llevar
  a otro equipo.
- No se integra con OTEA ni con otros productos del lab.

## Estado

Publicada como sitio estático público, con el código abierto bajo licencia Apache en un repositorio
público fuera del grupo del lab. El análisis se trasladó del servidor al navegador, y unas pruebas
de referencia exigen que el motor actual dé exactamente las mismas respuestas que el anterior; si
fallan, no se publica. La promesa de privacidad se comprobó sobre el sitio desplegado. Del uso no
hay ni habrá dato, por diseño. Quedan anotadas sin fecha ni compromiso tres mejoras: nuevos
patrones de relleno, el fallo con textos cortos y exportar el diccionario. La numeración ya es
estable.
```

## Propuesta para los campos de §8 (para confirmar o corregir)

- **`madurez: 2`.** Cumple `D8` (desplegada fuera de localhost, en público), `D7` (pruebas que
  bloquean la publicación y ninguna llamada a servicios) y `D1`/`D2` en su propio terreno, y la
  publicación la autorizó el director del PDL. No cumple `D4`/`D5` (nada de OTEA), que no le aplican
  bien porque no se enseña a un cliente de OTEA. Nivel 3 no: no hay traspaso a Tecnología ni
  interés de cliente. Si Anxo decide que AURA no es pieza del lab a efectos del catálogo, la ficha
  sobra y no hace falta nivel.
- **`estado: demo`.** Se enseña a cualquiera sin advertencias aparte de los límites que declara la
  propia interfaz y el README. Va a `pendiente` por el mismo hueco que KELVIN y EOS.
- **`audiencia: "?"`.** Su público es abierto, no interno ni cliente. `ambos` no lo describe y el
  vocabulario no está fijado (`ficha-producto.md §2`, hueco); no invento `público`. Va a
  `pendiente`.
- **`modalidad: M1`** — hecho: está desplegada y no tiene conexión a ninguna base de datos ni a
  producción; solo procesa el texto que pega el usuario. Es lo más cercano a `M1` («sin conexión
  directa a producción»). Ojo: el vocabulario de `§3.3.1` no prevé un producto sin datos; si se
  entiende que GitHub Pages no es un «entorno DEMO» en el sentido de `§3.2` (accesible al PDL y a
  comercial, separado de producción), sería `M0`. Propongo `M1`.

## Cierre previsto (tras la aprobación)

1. Decidir si AURA entra en el catálogo como pieza del lab (desviación 2). Si entra: crear
   `docs/ficha.md` en `main` con el borrador aprobado y commitear **solo** ese fichero.
2. Commit aparte con este plan y su cierre al final.
3. Sin etiqueta y sin push. Ojo: un push a `main` en este repo publica en GitHub Pages; que lo haga
   Anxo sabiéndolo.


## Qué se ejecutó (13-oct-2026)

Cowork aprobó el borrador en la tanda de fichas del lab
(`andel/docs/plans/2026-10-13-fichas-del-lab.md`). Los descriptores nuevos se aceptaron y las
entradas de `pendiente` van como están; no se ha tocado el `CHANGELOG.md`.

- `docs/ficha.md` creado en `main` con el borrador tal cual, en un commit con sólo ese
  fichero (`4e95845`).
- Este plan, con este cierre, en un commit aparte.
- Sin etiqueta y sin push. Los cambios previos sin commitear del repo no se han tocado.
