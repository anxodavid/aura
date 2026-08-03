# Instrucciones Rápidas de Ejecución

AURA (Analizador de Uso, Ritmo y Artificios) es una aplicación de navegador: no hay servidor ni motor de análisis aparte. Todo ocurre dentro de la pestaña.

Para usarla sin abrir editores de código como Visual Studio Code hay dos scripts en la carpeta principal del proyecto:

## 1. Instalación (`instalar.bat`)
**Solo necesitas ejecutar este archivo la primera vez** que descargues el proyecto o si hay actualizaciones mayores.
- Haz doble clic sobre `instalar.bat`.
- Verás una ventana negra que descargará automáticamente los requisitos técnicos.
- Al finalizar, te dirá "Instalacion completada". Presiona cualquier tecla para cerrar.

## 2. Ejecutar la Aplicación (`iniciar.bat`)
**Utiliza este archivo cada vez que quieras usar AURA.**
- Haz doble clic sobre `iniciar.bat`.
- **Se abrirá automáticamente una pestaña en tu navegador web por defecto** con AURA listo para usarse.
- **Para cerrar la herramienta**: cierra la ventana negra (consola) que se ha quedado abierta y la pestaña del navegador.

## 3. Comprobar que el motor sigue siendo correcto
Desde la carpeta `client/`:

```
npm test
```

Compara la salida del analizador con las respuestas de referencia guardadas en `tests/golden/` y verifica que el análisis no usa la red. Debe salir todo `ok`.

## 4. Generar la versión publicable
Desde la carpeta `client/`:

```
npm run build
```

Deja en `client/dist/` un sitio estático que se puede subir tal cual a GitHub Pages o a cualquier servidor de ficheros. Está configurado para servirse desde el subcamino `/aura/` (`base` en `client/vite.config.js`); si lo publicas en otra ruta, cambia ese valor.
