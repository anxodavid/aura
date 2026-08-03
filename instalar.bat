@echo off
echo ==========================================
echo Instalando AURA (Analizador de Uso, Ritmo y Artificios)
echo ==========================================

echo Instalando dependencias de la aplicacion...
cd client
call npm install
cd ..

echo ==========================================
echo Instalacion completada.
echo Ya puedes ejecutar el archivo "iniciar.bat" para abrir la aplicacion.
echo ==========================================
pause
