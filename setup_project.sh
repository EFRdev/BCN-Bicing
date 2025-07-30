#!/bin/bash

# Script principal para configurar el proyecto BCN-Bicing
echo "🚴 Configurando Proyecto BCN-Bicing MVP"
echo "======================================"

# Verificar que estamos en el directorio correcto
if [ ! -f "pyvenv.cfg" ]; then
    echo "❌ Error: Ejecuta este script desde la raíz del proyecto BCN-Bicing"
    echo "💡 Debe existir el archivo pyvenv.cfg en este directorio"
    exit 1
fi

# Paso 1: Crear estructura de directorios
echo "📁 PASO 1: Creando estructura de directorios"
echo "--------------------------------------------"

# Crear directorios del backend
mkdir -p backend/services
mkdir -p backend/utils

# Crear directorios del frontend
mkdir -p frontend/src/components
mkdir -p frontend/src/screens
mkdir -p frontend/src/services
mkdir -p frontend/src/utils
mkdir -p frontend/assets

echo "✅ Estructura de directorios creada"

# Paso 2: Configurar backend
echo ""
echo "📦 PASO 2: Configurando Backend"
echo "--------------------------------"

# Activar entorno virtual
echo "🔧 Activando entorno virtual..."
source bin/activate

# Verificar activación
if [ "$VIRTUAL_ENV" != "" ]; then
    echo "✅ Entorno virtual activado: $VIRTUAL_ENV"
else
    echo "❌ Error: No se pudo activar el entorno virtual"
    echo "💡 Verifica que el entorno virtual esté correctamente configurado"
    exit 1
fi

# Verificar que requirements.txt existe
if [ ! -f "backend/requirements.txt" ]; then
    echo "⚠️ Archivo backend/requirements.txt no encontrado"
    echo "💡 Asegúrate de que todos los archivos del backend estén en su lugar"
else
    # Instalar dependencias del backend
    echo "📋 Instalando dependencias de Python..."
    pip install -r backend/requirements.txt
fi

# Paso 3: Configurar frontend
echo ""
echo "📱 PASO 3: Configurando Frontend"
echo "--------------------------------"

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
echo "🔧 Verificando Expo CLI..."
if ! command -v expo &> /dev/null; then
    echo "📦 Instalando Expo CLI globalmente..."
    npm install -g expo-cli
else
    echo "✅ Expo CLI ya está instalado"
fi

# Verificar que package.json existe
if [ ! -f "frontend/package.json" ]; then
    echo "⚠️ Archivo frontend/package.json no encontrado"
    echo "💡 Asegúrate de que todos los archivos del frontend estén en su lugar"
else
    # Instalar dependencias del frontend
    echo "📋 Instalando dependencias de Node.js..."
    cd frontend
    npm install
    cd ..
fi

# Paso 4: Configurar permisos
echo ""
echo "🔐 PASO 4: Configurando permisos"
echo "--------------------------------"

# Dar permisos ejecutables a los scripts
chmod +x backend_env.sh 2>/dev/null && echo "✅ Permisos dados a backend_env.sh" || echo "⚠️ backend_env.sh no encontrado"
chmod +x frontend_env.sh 2>/dev/null && echo "✅ Permisos dados a frontend_env.sh" || echo "⚠️ frontend_env.sh no encontrado"
chmod +x create_structure.sh 2>/dev/null && echo "✅ Permisos dados a create_structure.sh" || echo "⚠️ create_structure.sh no encontrado"

# Paso 5: Tests opcionales
echo ""
echo "🧪 PASO 5: Tests (Opcional)"
echo "---------------------------"

read -p "¿Quieres ejecutar los tests del backend? (y/N): " run_tests
if [[ $run_tests =~ ^[Yy]$ ]]; then
    if [ -f "backend/test_api.py" ]; then
        echo "🔍 Ejecutando tests del backend..."
        cd backend
        python test_api.py
        cd ..
    else
        echo "⚠️ Archivo backend/test_api.py no encontrado"
    fi
fi

# Paso 6: Resumen
echo ""
echo "🎉 CONFIGURACIÓN COMPLETADA"
echo "=========================="
echo "✅ Entorno virtual activado"
echo "✅ Estructura de directorios creada"
echo "✅ Dependencias instaladas"
echo "✅ Permisos configurados"
echo ""
echo "📁 Estructura del proyecto:"
echo "BCN-Bicing/"
echo "├── backend/"
echo "│   ├── services/"
echo "│   ├── utils/"
echo "│   ├── main.py"
echo "│   ├── api_client.py"
echo "│   └── requirements.txt"
echo "├── frontend/"
echo "│   ├── src/"
echo "│   │   ├── components/"
echo "│   │   ├── screens/"
echo "│   │   ├── services/"
echo "│   │   └── utils/"
echo "│   ├── assets/"
echo "│   ├── App.js"
echo "│   └── package.json"
echo "└── bin/ (entorno virtual)"
echo ""
echo "🚀 PRÓXIMOS PASOS:"
echo "1. Iniciar backend:"
echo "   ./backend_env.sh"
echo ""
echo "2. Iniciar frontend (en otra terminal):"
echo "   ./frontend_env.sh"
echo ""
echo "💡 El backend estará en: http://localhost:5000"
echo "💡 El frontend se abrirá automáticamente"
