@echo off
echo ==========================================
echo Iniciando AURA
echo ==========================================
echo.
echo El analisis se ejecuta entero en el navegador. No hay servidor de analisis.
echo Presiona Ctrl+C en esta ventana para detener el servidor de desarrollo.
echo.
cd client
call npm run dev -- --open
