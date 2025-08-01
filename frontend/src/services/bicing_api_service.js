import Constants from 'expo-constants';

// URL del backend - cambia esto según tu configuración
const API_BASE_URL = __DEV__
  ? 'http://192.168.68.90:8000/api'  // Desarrollo
  : 'https://bicing-api-294811234498.europe-west1.run.app/api';  // Producción

/**
 * Obtener estaciones de Bicing cercanas a una ubicación
 */
export const getNearbyStations = async (latitude, longitude, radius = 1000) => {
  try {
    const url = `${API_BASE_URL}/stations/nearby?lat=${latitude}&lng=${longitude}&radius=${radius}`;

    console.log('🌐 Llamando API:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 segundos de timeout
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Respuesta API recibida:', {
      count: data.count,
      stations: data.stations?.length || 0
    });

    return data.stations || [];

  } catch (error) {
    console.error('❌ Error en getNearbyStations:', error);

    // Manejar diferentes tipos de errores
    if (error.name === 'TypeError' && error.message.includes('Network request failed')) {
      throw new Error('Sin conexión a internet. Verifica tu conexión.');
    }

    if (error.message.includes('timeout')) {
      throw new Error('La conexión tardó demasiado. Intenta de nuevo.');
    }

    throw error;
  }
};

/**
 * Obtener todas las estaciones (para testing/debugging)
 */
export const getAllStations = async () => {
  try {
    const url = `${API_BASE_URL}/stations`;

    console.log('🌐 Obteniendo todas las estaciones...');

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 15000, // 15 segundos para todas las estaciones
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Todas las estaciones recibidas:', data.count);

    return data.stations || [];

  } catch (error) {
    console.error('❌ Error en getAllStations:', error);
    throw error;
  }
};

/**
 * Verificar que el backend esté funcionando
 */
export const checkBackendHealth = async () => {
  try {
    const url = `${API_BASE_URL}/health`;

    const response = await fetch(url, {
      method: 'GET',
      timeout: 15000,
    });

    if (!response.ok) {
      throw new Error(`Backend no disponible: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Backend health check:', data);

    return data.status === 'OK';

  } catch (error) {
    console.error('❌ Backend health check failed:', error);
    return false;
  }
};

/**
 * Configuración de la API
 */
export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  DEFAULT_RADIUS: 1000, // metros
  MAX_STATIONS: 10,
  TIMEOUT: 10000, // milisegundos
};
