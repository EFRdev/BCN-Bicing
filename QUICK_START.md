# 🚀 Guía Rápida - BCN Bicing MVP

## ⚡ Configuración Inicial (Una sola vez)

```bash
# 1. Crear estructura y configurar todo
chmod +x create_structure.sh setup_project.sh
./create_structure.sh
./setup_project.sh
```

## 🔄 Ejecución Diaria

### Terminal 1: Backend
```bash
./backend_env.sh
```
→ Servidor en `http://localhost:5000`

### Terminal 2: Frontend
```bash
./frontend_env.sh
```
→ Elige opción de ejecución

## 🧪 Tests Rápidos

```bash
# Test completo del backend
cd backend && python test_api.py

# Test API manual
curl http://localhost:5000/api/health
curl "http://localhost:5000/api/stations/nearby?lat=41.3851&lng=2.1734"
```

## 📁 Estructura Clave

```
BCN-Bicing/
├── backend/           # API Python/Flask
│   ├── main.py       # 🎯 Servidor principal
│   ├── api_client.py # 🔌 Cliente API Bicing
│   └── test_api.py   # ✅ Tests
├── frontend/          # App React Native
│   ├── App.js        # 📱 App principal
│   └── src/          # 📂 Código fuente
├── backend_env.sh     # 🐍 Script backend
└── frontend_env.sh    # 📱 Script frontend
```

## 🎯 URLs de Prueba (Barcelona)

- **Plaza Catalunya**: `lat=41.3851&lng=2.1734`
- **Sagrada Familia**: `lat=41.4036&lng=2.1744`
- **Parc Güell**: `lat=41.4145&lng=2.1527`
- **Barceloneta**: `lat=41.3755&lng=2.1901`

## 🆘 Troubleshooting

### Backend no inicia
```bash
# Verificar entorno virtual
source bin/activate
pip install -r backend/requirements.txt
```

### Frontend no inicia
```bash
# Verificar Node.js y Expo
npm install -g expo-cli
cd frontend && npm install
```

### Sin conexión con API de Bicing
```bash
# Test de conectividad
cd backend && python test_api.py
```

## 📱 Expo Go (Móvil)

1. Descarga **Expo Go** en tu smartphone
2. Ejecuta `./frontend_env.sh`
3. Elige opción 4 (código QR)
4. Escanea el QR con Expo Go

---

**¿Primera vez?** → Ejecuta `./setup_project.sh`  
**Desarrollo diario?** → `./backend_env.sh` + `./frontend_env.sh`