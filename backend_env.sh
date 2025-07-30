#!/bin/bash

# Script para ejecutar el backend del proyecto BCN-Bicing
echo "🚴 Iniciando Backend BCN-Bicing"
echo "================================"

# Verificar que estamos en el directorio correcto
if [ ! -f "pyvenv.cfg" ]; then
    echo "❌ Error: Ejecuta este script desde la raíz del proyecto BCN-Bicing"
    exit 1
fi

# Verificar que existe la carpeta backend
if [ ! -d "backend" ]; then
    echo "❌ Error: No se encuentra la carpeta backend/"
    exit 1
fi

# Activar entorno virtual
echo "📦 Activando entorno virtual..."
source bin/activate

# Verificar activación
if [ "$VIRTUAL_ENV" != "" ]; then
    echo "✅ Entorno virtual activado: $VIRTUAL_ENV"
else
    echo "❌ Error: No se pudo activar el entorno virtual"
    echo "💡 Asegúrate de estar en la raíz del proyecto con bin/activate"
    exit 1
fi

# Instalar/actualizar dependencias
echo "📋 Verificando dependencias..."
pip install -r backend/requirements.txt

# Ejecutar tests opcionales
read -p "¿Quieres ejecutar los tests antes de iniciar? (y/N): " run_tests
if [[ $run_tests =~ ^[Yy]$ ]]; then
    echo "🧪 Ejecutando tests..."
    cd backend
    python test_api.py
    cd ..
    echo ""
fi

# Configurar puerto alternativo para evitar conflicto con AirPlay
export PORT=8000

# Iniciar servidor
echo "🚀 Iniciando servidor Flask..."
echo "📍 URL: http://localhost:8000"
echo "📋 Endpoints disponibles:"
echo "   - GET /api/health (verificar estado)"
echo "   - GET /api/stations/nearby?lat=X&lng=Y (estaciones cercanas)"
echo "   - GET /api/stations (todas las estaciones)"
echo ""
echo "💡 Para parar el servidor presiona Ctrl+C"
echo "================================"

# Cambiar al directorio backend y ejecutar
cd backend
python main.py
