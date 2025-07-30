#!/bin/bash

# Script para ejecutar el frontend del proyecto BCN-Bicing
echo "📱 Iniciando Frontend BCN-Bicing"
echo "================================="

# Verificar que estamos en el directorio correcto
if [ ! -f "pyvenv.cfg" ]; then
    echo "❌ Error: Ejecuta este script desde la raíz del proyecto BCN-Bicing"
    exit 1
fi

# Verificar que existe la carpeta frontend
if [ ! -d "frontend" ]; then
    echo "❌ Error: No se encuentra la carpeta frontend/"
    exit 1
fi

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado"
    echo "💡 Instala Node.js desde https://nodejs.org/"
    exit 1
fi

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm no está instalado"
    exit 1
fi

# Instalar Expo CLI si no está instalado
if ! command -v expo &> /dev/null; then
    echo "📦 Instalando Expo CLI..."
    npm install -g expo-cli
fi

# Cambiar al directorio frontend
cd frontend

# Verificar que package.json existe
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encuentra package.json en frontend/"
    exit 1
fi

# Instalar dependencias
echo "📋 Instalando/verificando dependencias..."
npm install

# Verificar que el backend esté ejecutándose
echo "🔍 Verificando backend..."
backend_status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api/health 2>/dev/null)

if [ "$backend_status" = "200" ]; then
    echo "✅ Backend detectado en http://localhost:5000"
else
    echo "⚠️  Backend no detectado"
    echo "💡 Asegúrate de ejecutar el backend primero:"
    echo "   ./backend_env.sh"
    echo ""
    read -p "¿Quieres continuar sin backend? (y/N): " continue_without_backend
    if [[ ! $continue_without_backend =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Mostrar opciones de ejecución
echo ""
echo "📱 Opciones de ejecución:"
echo "1. Abrir en el navegador (para desarrollo web)"
echo "2. Abrir en emulador Android"
echo "3. Abrir en emulador iOS (solo macOS)"
echo "4. Generar código QR para dispositivo físico"
echo "5. Iniciar y elegir después"
echo ""

read -p "Elige una opción (1-5): " option

case $option in
    1)
        echo "🌐 Iniciando en modo web..."
        expo start --web
        ;;
    2)
        echo "🤖 Iniciando emulador Android..."
        expo start --android
        ;;
    3)
        echo "🍎 Iniciando emulador iOS..."
        expo start --ios
        ;;
    4)
        echo "📱 Generando código QR para dispositivo..."
        echo "💡 Descarga 'Expo Go' en tu móvil y escanea el QR"
        expo start --tunnel
        ;;
    5|*)
        echo "🚀 Iniciando Expo..."
        echo "💡 Elige tu plataforma en la interfaz de Expo"
        expo start
        ;;
esac
