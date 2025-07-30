import * as Location from 'expo-location';

/**
 * Obtener la ubicación actual del usuario
 */
export const getCurrentLocation = async () => {
  try {
    console.log('🌍 Solicitando permisos de ubicación...');
    
    // Solicitar permisos de ubicación
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      throw new Error('Permisos de ubicación denegados. Activa la ubicación en configuración.');
    }
    
    console.log('✅ Permisos de ubicación concedidos');
    
    // Obtener ubicación actual
    console.log('📍 Obteniendo ubicación actual...');
    
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
      timeout: 15000, // 15 segundos de timeout
      maximumAge: 30000, // Usar ubicación cacheada si tiene menos de 30 segundos
    });
    
    const { latitude, longitude } = location.coords;
    
    console.log('✅ Ubicación obtenida:', { latitude, longitude });
    
    // Validar que estemos en Barcelona (opcional)
    if (!isInBarcelonaArea(latitude, longitude)) {
      console.warn('⚠️ Ubicación fuera del área de Barcelona');
      // No lanzar error, solo advertir
    }
    
    return {
      latitude,
      longitude,
      accuracy: location.coords.accuracy,
      timestamp: location.timestamp,
    };
    
  } catch (error) {
    console.error('❌ Error obteniendo ubicación:', error);
    
    // Manejar diferentes tipos de errores
    if (error.code === 'E_LOCATION_TIMEOUT') {
      throw new Error('Timeout obteniendo ubicación. Intenta de nuevo.');
    }
    
    if (error.code === 'E_LOCATION_UNAVAILABLE') {
      throw new Error('Ubicación no disponible. Verifica que el GPS esté activado.');
    }
    
    if (error.message.includes('denied') || error.message.includes('Permisos')) {
      throw new Error('Permisos de ubicación requeridos. Actívalos en configuración.');
    }
    
    throw new Error(error.message || 'Error desconocido obteniendo ubicación');
  }
};

/**
 * Obtener ubicación con manejo de errores simplificado para el MVP
 * Si falla, devuelve una ubicación por defecto en Barcelona
 */
export const getCurrentLocationWithFallback = async () => {
  try {
    return await getCurrentLocation();
  } catch (error) {
    console.warn('⚠️ Error obteniendo ubicación, usando ubicación por defecto:', error.message);
    
    // Ubicación por defecto: Plaza Catalunya, Barcelona
    return {
      latitude: 41.3851,
      longitude: 2.1734,
      accuracy: null,
      timestamp: Date.now(),
      isDefault: true,
    };
  }
};

/**
 * Verificar si las coordenadas están en el área de Barcelona
 */
export const isInBarcelonaArea = (latitude, longitude) => {
  // Coordenadas aproximadas del área metropolitana de Barcelona
  const barcelonaBounds = {
    latMin: 41.320,
    latMax: 41.470,
    lngMin: 2.050,
    lngMax: 2.250,
  };
  
  return (
    latitude >= barcelonaBounds.latMin &&
    latitude <= barcelonaBounds.latMax &&
    longitude >= barcelonaBounds.lngMin &&
    longitude <= barcelonaBounds.lngMax
  );
};

/**
 * Calcular distancia aproximada entre dos puntos (en metros)
 * Usando la fórmula de Haversine simplificada
 */
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371000; // Radio de la Tierra en metros
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance);
};

/**
 * Formatear distancia para mostrar al usuario
 */
export const formatDistance = (distanceMeters) => {
  if (distanceMeters < 1000) {
    return `${distanceMeters}m`;
  } else {
    return `${(distanceMeters / 1000).toFixed(1)}km`;
  }
};