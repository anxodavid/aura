@echo off
echo ==========================================
echo Iniciando AURA
echo ==========================================

echo Iniciando motor de analisis (servidor)...
start "Motor de Analisis" /MIN cmd /c "cd server && node src/server.js"

echo Iniciando interfaz grafica (cliente)...
cd client
echo.
echo Presiona Ctrl+C en esta ventana para detener el servidor de interfaz.
call npm run dev -- --open
