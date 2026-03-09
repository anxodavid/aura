@echo off
echo ==========================================
echo Instalando AURA (Analizador de Uso, Ritmo y Artificios)
echo ==========================================

echo [1/2] Instalando dependencias del motor (servidor)...
cd server
call npm install
cd ..

echo [2/2] Instalando dependencias de la interfaz (cliente)...
cd client
call npm install
cd ..

echo ==========================================
echo Instalacion completada.
echo Ya puedes ejecutar el archivo "iniciar.bat" para abrir la aplicacion.
echo ==========================================
pause
