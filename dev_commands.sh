#!/bin/bash

# Comandos útiles para desarrollo del proyecto BCN-Bicing
echo "🛠️ Comandos de Desarrollo BCN-Bicing"
echo "===================================="

case "$1" in
    "test-backend")
        echo "🧪 Ejecutando tests del backend..."
        source bin/activate
        cd backend
        python test_api.py
        ;;
    
    "test-api")
        echo "🔍 Probando endpoints de la API..."
        echo "1. Health check..."
        curl -s http://localhost:5000/api/health | jq '.' || curl -s http://localhost:5000/api/health
        echo -e "\n2. Estaciones cercanas (Plaza Catalunya)..."
        curl -s "http://localhost:5000/api/stations/nearby?lat=41.3851&lng=2.1734&radius=500" | jq '.' || curl -s "http://localhost:5000/api/stations/nearby?lat=41.3851&lng=2.1734&radius=500"
        ;;
    
    "restart-backend")
        echo "🔄 Reiniciando backend..."
        pkill -f "python main.py"
        sleep 2
        echo "🚀 Iniciando backend..."
        ./backend_env.sh
        ;;
    
    "clean-install")
        echo "🧹 Limpiando e instalando dependencias..."
        source bin/activate
        pip install -r backend/requirements.txt
        cd frontend
        rm -rf node_modules package-lock.json
        npm install
        cd ..
        echo "✅ Dependencias reinstaladas"
        ;;
    
    "logs")
        echo "📋 Mostrando logs del sistema..."
        echo "Backend logs:"
        tail -f backend/*.log 2>/dev/null || echo "No hay logs del backend"
        ;;
    
    "status")
        echo "📊 Estado del sistema..."
        echo "🐍 Backend:"
        curl -s http://localhost:5000/api/health >/dev/null && echo "  ✅ Ejecutándose en puerto 5000" || echo "  ❌ No responde en puerto 5000"
        
        echo "📱 Frontend:"
        if pgrep -f "expo start" > /dev/null; then
            echo "  ✅ Expo ejecutándose"
        else
            echo "  ❌ Expo no está ejecutándose"
        fi
        
        echo "🔧 Entorno virtual:"
        if [ "$VIRTUAL_ENV" != "" ]; then
            echo "  ✅ Activado: $VIRTUAL_ENV"
        else
            echo "  ❌ No activado"
        fi
        ;;
    
    "structure")
        echo "📁 Estructura del proyecto:"
        tree -I 'node_modules|bin|Scripts|__pycache__|*.pyc' . || find . -type d -name node_modules -prune -o -type d -name bin -prune -o -type d -name Scripts -prune -o -type d -name __pycache__ -prune -o -type f -print | head -20
        ;;
    
    "help"|*)
        echo "📖 Comandos disponibles:"
        echo ""
        echo "  ./dev_commands.sh test-backend    - Ejecutar tests del backend"
        echo "  ./dev_commands.sh test-api        - Probar endpoints de la API"
        echo "  ./dev_commands.sh restart-backend - Reiniciar el servidor backend"
        echo "  ./dev_commands.sh clean-install   - Limpiar y reinstalar dependencias"
        echo "  ./dev_commands.sh logs            - Mostrar logs del sistema"
        echo "  ./dev_commands.sh status          - Ver estado de backend/frontend"
        echo "  ./dev_commands.sh structure       - Mostrar estructura del proyecto"
        echo "  ./dev_commands.sh help            - Mostrar esta ayuda"
        echo ""
        echo "🚀 Comandos principales:"
        echo "  ./backend_env.sh                  - Iniciar backend"
        echo "  ./frontend_env.sh                 - Iniciar frontend"
        echo "  ./setup_project.sh                - Configuración inicial"
        ;;
esac