---
producto: AURA
descriptor: Detección de texto genérico sin que salga del navegador
pdl: '?'
madurez: 2
estado: demo
modalidad: M1
audiencia: '?'
revisado: 2026-10-13
revisado_en: 1.0.0
revisado_sha: '?'
pendiente:
  - campo: pdl
    motivo: AURA no tiene identificador PDL asignado en ninguna fuente
    ref: protocolo-madurez.md §1.3
  - campo: estado
    motivo: la norma no fija qué separa "demo condicionada" de "demo"
    ref: protocolo-madurez.md §2.1
  - campo: audiencia
    motivo: sin decidir; es pública (GitHub, Apache-2.0)
    ref: ficha-producto.md §2
  - campo: revisado_sha
    motivo: ficha anterior a la regla (metodo 0.2.0)
    ref: ficha-producto.md §6
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
