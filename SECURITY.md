# Seguridad

## Qué superficie hay

Poca, y conviene decir por qué antes de explicar cómo reportar.

AURA es un sitio estático. No tiene backend, ni base de datos, ni sesiones, ni autenticación, ni analítica. No recibe datos de terceros ni los almacena. El texto que analizas se queda en la memoria de tu pestaña: el análisis lo ejecuta JavaScript en tu propio navegador y al pulsar Analizar no se produce ninguna petición de red. El único dato que persiste es tu diccionario de clichés, en el `localStorage` de tu navegador y en ningún otro sitio.

Que no salga nada no es una promesa de intenciones: `tests/verify-golden.mjs` ejecuta el análisis con `fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource` y `navigator` sustituidos por getters que lanzan, y el despliegue no se publica si ese test falla.

Esto quiere decir que no hay servidor que comprometer ni datos de usuarios que filtrar. Lo que sí puede tener problemas:

- Las dependencias del build (Vite, Preact, compromise y su árbol). Dependabot revisa npm semanalmente.
- El propio código del cliente: por ejemplo un XSS a través del texto que se pega, que solo afectaría a quien lo pega, pero sigue siendo un fallo.
- La configuración de despliegue: permisos del workflow, integridad del artefacto que se publica.
- Un error en el análisis que hiciera que un texto puntuara mal. No es un problema de seguridad, es un bug: abre un issue normal.

## Versiones cubiertas

La última versión publicada en `main`, que es la que sirve GitHub Pages. No hay ramas de mantenimiento ni versiones antiguas con soporte.

## Cómo reportar

Usa el aviso privado de seguridad de GitHub: en la pestaña **Security** del repositorio, *Report a vulnerability*. Así queda entre nosotros hasta que haya arreglo.

Si prefieres correo, `afeijoo@ecomt.net`.

Ayuda mucho incluir qué versión o commit, qué pasos reproducen el problema y qué impacto le ves. Si has encontrado la manera de que salga una petición de red al analizar, dilo así de claro: eso es lo más grave que le puede pasar a este proyecto.

## Qué esperar

Este proyecto lo mantiene una persona en el Product Discovery Lab de ECOMT, no un equipo de guardia. No voy a prometer plazos que no pueda cumplir:

- Acuso recibo cuando lo lea. Puede ser el mismo día o pueden pasar un par de semanas.
- Si es real y está en mi mano, lo arreglo y lo digo en el CHANGELOG.
- Si decido no arreglarlo, te explico por qué en vez de dejar el aviso muerto.
- El crédito es tuyo si lo quieres, y si prefieres que no aparezca tu nombre, tampoco aparece.

No hay programa de recompensas.
