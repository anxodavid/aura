# Instrucciones de Ejecución

AURA (Analizador de Uso, Ritmo y Artificios) es una aplicación de navegador: no hay servidor ni motor de análisis aparte. Todo ocurre dentro de la pestaña.

Requiere Node.js 20 o superior. Todos los comandos se ejecutan desde la carpeta `app/`.

## 1. Instalar dependencias

```
npm install
```

Solo la primera vez, o cuando cambien las dependencias. Si quieres una instalación reproducible exacta a partir del `package-lock.json` (lo que hace el CI), usa `npm ci` en su lugar.

## 2. Levantar el entorno de desarrollo

```
npm run dev
```

Abre la aplicación en `http://localhost:5173/aura/`. Recarga en caliente al guardar. El subcamino `/aura/` no es un detalle del servidor de desarrollo: es la `base` configurada para GitHub Pages, y Vite la respeta también en local.

## 3. Comprobar que el motor sigue siendo correcto

```
npm test
```

Compara la salida del analizador con las respuestas de referencia guardadas en `tests/golden/` y verifica que el análisis no usa la red. Debe salir todo `ok`.

Si un golden falla, el motor ha cambiado de comportamiento. Eso es un fallo hasta que se demuestre lo contrario: ver [CONTRIBUTING.md](../CONTRIBUTING.md).

## 4. Generar la versión publicable

```
npm run build
```

Deja en `app/dist/` un sitio estático que se puede subir tal cual a GitHub Pages o a cualquier servidor de ficheros. `dist/` no se commitea nunca: lo produce el workflow de despliegue.

Está configurado para servirse desde el subcamino `/aura/` (`base` en `app/vite.config.js`), que es donde GitHub Pages sirve las project pages. Si lo publicas en otra ruta, cambia ese valor o los activos darán 404 y la página cargará en blanco.

Para inspeccionar el resultado del build en local, `npm run preview`.
