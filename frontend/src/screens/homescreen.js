import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getCurrentLocation } from '../utils/geolocation';
import { getNearbyStations } from '../services/bicing_api_service';
import StationItem from '../components/station_item';

export default function HomeScreen() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cargar estaciones al iniciar la app
    loadNearbyStations();
  }, []);

  const loadNearbyStations = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Obtener ubicación del usuario
      console.log('🌍 Obteniendo ubicación...');
      const location = await getCurrentLocation();

      if (!location) {
        throw new Error('No se pudo obtener la ubicación');
      }

      setUserLocation(location);
      console.log('📍 Ubicación obtenida:', location);

      // 2. Obtener estaciones cercanas
      console.log('🚴 Buscando estaciones cercanas...');
      const nearbyStations = await getNearbyStations(
        location.latitude,
        location.longitude,
        1000 // 1km de radio
      );

      if (nearbyStations && nearbyStations.length > 0) {
        setStations(nearbyStations);
        console.log(`✅ ${nearbyStations.length} estaciones encontradas`);
      } else {
        setStations([]);
        setError('No se encontraron estaciones cercanas');
      }

    } catch (error) {
      console.error('❌ Error cargando estaciones:', error);
      setError(error.message || 'Error desconocido');
      Alert.alert(
        'Error',
        'No se pudieron cargar las estaciones. Verifica tu conexión y permisos de ubicación.',
        [
          { text: 'Reintentar', onPress: loadNearbyStations },
          { text: 'Cancelar' }
        ]
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadNearbyStations();
  };

  const renderStationItem = ({ item }) => (
    <StationItem station={item} />
  );

  const renderEmptyState = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Buscando estaciones cercanas...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorIcon}>😞</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={loadNearbyStations}
          >
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyIcon}>🚴</Text>
        <Text style={styles.emptyText}>
          No se encontraron estaciones cercanas
        </Text>
        <Text style={styles.emptySubtext}>
          Intenta desde otra ubicación
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Estaciones Cercanas</Text>
        {userLocation && (
          <Text style={styles.subtitle}>
            📍 {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
          </Text>
        )}
      </View>

      <FlatList
        data={stations}
        renderItem={renderStationItem}
        keyExtractor={(item) => item.station_id?.toString() || Math.random().toString()}
        style={styles.list}
        contentContainerStyle={stations.length === 0 ? styles.emptyList : styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2196F3']}
          />
        }
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.refreshButton}
        onPress={loadNearbyStations}
        disabled={loading}
      >
        <Text style={styles.refreshButtonText}>
          {loading ? '🔄 Cargando...' : '🔄 Actualizar'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  list: {
    flex: 1,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#f44336',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  refreshButton: {
    backgroundColor: '#2196F3',
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
