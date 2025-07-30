# 🚴 BCN-Bicing MVP

Una aplicación móvil para encontrar estaciones de Bicing cercanas en Barcelona con información en tiempo real.

## 📱 Funcionalidades del MVP

- ✅ **Geolocalización**: Obtiene tu ubicación actual
- ✅ **Estaciones cercanas**: Muestra las estaciones más próximas (radio de 1km)
- ✅ **Información en tiempo real**: Bicis y espacios disponibles
- ✅ **Distancias**: Calcula y muestra la distancia a cada estación
- ✅ **Actualización manual**: Botón para refrescar los datos

## 🏗️ Arquitectura

```
BCN-Bicing/
├── backend/          # API REST en Python/Flask
├── frontend/         # App móvil en React Native/Expo
└── README.md         # Este archivo
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Python 3.12+ (ya configurado en tu entorno virtual)
- Node.js 16+
- Expo CLI
- Smartphone o emulador para testing

### Backend (API)

1. **Activar el entorno virtual** (ya lo tienes configurado):
   ```bash
   # En macOS/Linux
   source bin/activate

   # En Windows PowerShell
   .\Scripts\Activate.ps1
   ```

2. **Instalar dependencias**:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Dar permisos a los scripts** (macOS/Linux):
   ```bash
   chmod +x run_backend.sh run_frontend.sh
   ```

3. **Configurar variables de entorno**:
   ```bash
   # El archivo .env ya está creado, puedes editarlo si necesitas cambios
   cat .env
   ```

4. **Ejecutar el servidor**:
   ```bash
   python main.py
   ```

   El backend estará disponible en `http://localhost:5000`

5. **Verificar que funciona**:
   ```bash
   # Probar endpoint de salud
   curl http://localhost:5000/api/health

   # Probar estaciones (puede tardar un poco la primera vez)
   curl "http://localhost:5000/api/stations/nearby?lat=41.3851&lng=2.1734"
   ```

### Frontend (App Móvil)

1. **Instalar Expo CLI** (si no lo tienes):
   ```bash
   npm install -g expo-cli
   ```

2. **Instalar dependencias**:
   ```bash
   cd frontend
   npm install
   ```

3. **Configurar la URL del backend**:
   ```bash
   # Editar frontend/.env si es necesario
   # Por defecto apunta a localhost:5000
   ```

4. **Ejecutar la app**:
   ```bash
   expo start
   # O usar el script de conveniencia:
   ./run_frontend.sh
   ```

5. **Probar en dispositivo**:
   - Instala la app **Expo Go** en tu móvil
   - Escanea el código QR que aparece en terminal/navegador
   - O usa un emulador: `expo start --android` / `expo start --ios`

### Verificación del Sistema

**Probar backend**:
```bash
# Health check
curl http://localhost:5000/api/health

# Estaciones cercanas (Plaza Catalunya)
curl "http://localhost:5000/api/stations/nearby?lat=41.3851&lng=2.1734"

# O ejecutar tests completos
cd backend && python test_api.py
```

**Probar frontend**:
- Instala **Expo Go** en tu móvil
- Escanea el código QR
- O usa emulador: `expo start --android` / `expo start --ios`

### Ubicaciones de Prueba en Barcelona

- **Plaza Catalunya**: `41.3851, 2.1734`
- **Sagrada Familia**: `41.4036, 2.1744`
- **Parc Güell**: `41.4145, 2.1527`
- **Barceloneta**: `41.3755, 2.1901`

## 🔧 Debugging

### Problemas Comunes

1. **Backend no conecta con API de Bicing**:
   - Verificar conexión a internet
   - La API pública puede estar temporalmente no disponible

2. **Frontend no conecta con backend**:
   - Verificar que el backend esté ejecutándose en puerto 5000
   - En dispositivo físico, cambiar `localhost` por la IP de tu ordenador en `frontend/.env`

3. **Permisos de geolocalización**:
   - En iOS: Configuración > Privacidad > Ubicación
   - En Android: Configuración > Apps > Permisos > Ubicación

4. **App no encuentra estaciones**:
   - Probar con ubicaciones conocidas de Barcelona
   - Aumentar el radio de búsqueda (modificar en HomeScreen.js)

### Logs Útiles

- **Backend**: Los logs aparecen en la terminal donde ejecutas `python main.py`
- **Frontend**: Usar `expo start` y ver logs en Metro Bundler
- **Dispositivo**: En Expo Go, agitar el dispositivo > "Debug mode"

## 🎯 Próximos Pasos (Post-MVP)

- [ ] **Mapa interactivo** con marcadores de estaciones
- [ ] **Navegación** a la estación seleccionada
- [ ] **Historial** de estaciones favoritas
- [ ] **Notificaciones** cuando una estación tenga bicis disponibles
- [ ] **Metro y Bus** - integrar otras APIs de transporte
- [ ] **Predicciones** de disponibilidad usando ML

## 🛠️ Stack Tecnológico

- **Backend**: Python, Flask, Requests
- **Frontend**: React Native, Expo
- **APIs**: Open Data Barcelona (Bicing)
- **Geolocalización**: Expo Location
- **Deploy**: Local (MVP), Heroku/Vercel (futuro)

## 📝 Notas de Desarrollo

- **Tiempo estimado MVP**: 3 días
- **Prioridad**: Funcionalidad sobre diseño
- **Enfoque**: Una API (Bicing) funcionando perfectamente
- **Testing**: Manual en dispositivo real

---

¡Listo para desarrollar! 🚀 Empieza por el backend y luego el frontend.
