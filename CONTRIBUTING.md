# Contribuir

## Levantar el entorno

Requiere Node.js 20 o superior. Todo se ejecuta desde `client/`.

```
cd client
npm install
npm run dev
```

Abre `http://localhost:5173/aura/`. El subcamino `/aura/` es la `base` configurada para GitHub Pages y Vite la respeta también en local.

## Antes de abrir un pull request

```
npm test          # golden + comprobación de que no hay red
npm run lint      # ESLint
npm run format    # Prettier, escribe los cambios
```

El CI ejecuta lo mismo en cada push y en cada pull request. Si falla ahí, falla.

## La regla dura: los golden no se rompen

En `tests/golden/` están las respuestas del backend Express original para seis textos que cubren los casos límite. `npm test` exige que la salida del motor sea **idéntica byte a byte** a esas respuestas.

**Si un golden falla, el motor ha cambiado de comportamiento, y eso es un fallo, no una mejora.** Da igual que la puntuación nueva parezca más razonable: significa que un texto que antes puntuaba X ahora puntúa Y, y nadie ha decidido que deba ser así. Lo primero es asumir que el cambio es un accidente y encontrar dónde.

Ese test es además la garantía de que el análisis no hace ni una petición de red: corre cada caso con `fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource` y `navigator` sustituidos por getters que lanzan. Si lo rompes, el despliegue no publica.

### Cuándo sí se puede cambiar una puntuación

Se puede, pero no de tapadillo. Hace falta, en este orden:

1. Un pull request que **solo** cambie el motor, sin mezclarlo con nada más.
2. La justificación de por qué el comportamiento nuevo es el correcto: qué texto puntuaba mal, por qué, y qué umbral o regla lo arregla.
3. Recapturar los golden afectados y **enseñar el diff** de los JSON en el propio pull request. Ese diff es la parte que se revisa: es la lista exacta de lo que cambia para todos los usuarios.
4. Una entrada en el CHANGELOG, porque cambiar cómo puntúa la herramienta es un cambio de comportamiento visible.

Los golden se generaron con `tests/capture-golden.cjs` contra el backend Express, que ya no existe. Ese script se conserva como documentación de su procedencia, no como herramienta: para recapturar hay que escribir la salida del motor actual, y quien lo haga tiene que ser consciente de que está moviendo la referencia, no comprobándola.

## Estilo

ESLint y Prettier, con la configuración que está en el repositorio. No hay debate de estilo: se ejecuta `npm run format` y se acabó.

Los mensajes de commit van en castellano con prefijo convencional (`feat:`, `fix:`, `docs:`, `chore:`, `ci:`, `refactor:`, `test:`). Los cambios que rompen compatibilidad llevan `!`.

## Qué encaja y qué no

Encaja: corregir bugs, mejorar la accesibilidad, ampliar el diccionario de aperturas y cierres genéricos, documentación, casos golden nuevos que cubran un límite que hoy no se prueba.

No encaja: **nada que envíe datos a ninguna parte.** Ni telemetría, ni analítica, ni registro de errores remoto, ni una fuente servida desde un CDN, ni comprobación de versiones. La afirmación de que el texto no sale del navegador es el producto, no una característica del producto. Un pull request que añada una petición de red se cierra sin más discusión.
