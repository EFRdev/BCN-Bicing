import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; // Importa TouchableOpacity

export default function StationItem({ station, onPress }) { // Añade onPress a las props
  const getBikesColor = (numBikes) => {
    if (numBikes === 0) return '#f44336'; // Rojo - sin bicis
    if (numBikes <= 2) return '#ff9800'; // Naranja - pocas bicis
    return '#4caf50'; // Verde - bicis disponibles
  };

  const getDocksColor = (numDocks) => {
    if (numDocks === 0) return '#f44336'; // Rojo - sin espacios
    if (numDocks <= 2) return '#ff9800'; // Naranja - pocos espacios
    return '#4caf50'; // Verde - espacios disponibles
  };

  const getStatusText = (isActive) => {
    return isActive ? '🟢 Activa' : '🔴 Inactiva';
  };

  return (
    // Envuelve todo el contenido de la estación en TouchableOpacity
    <TouchableOpacity onPress={() => onPress(station)} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stationName} numberOfLines={2}>
          {station.name || 'Estación sin nombre'}
        </Text>
        <Text style={styles.distance}>
          📍 {station.distance_formatted || 'N/A'}
        </Text>
      </View>

      <Text style={styles.address} numberOfLines={1}>
        {station.address || 'Dirección no disponible'}
      </Text>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          {getStatusText(station.is_active)}
        </Text>
      </View>

      <View style={styles.infoRow}>
        {/* Bicicletas Eléctricas */}
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>⚡️ Eléctricas</Text>
          <Text style={[
            styles.infoValue,
            { color: getBikesColor(station.num_bikes_available_ebike || 0) }
          ]}>
            {station.num_bikes_available_ebike || 0}
          </Text>
        </View>

        {/* Bicicletas Mecánicas */}
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>🚲 Mecánicas</Text>
          <Text style={[
            styles.infoValue,
            { color: getBikesColor(station.num_bikes_available_mechanical || 0) }
          ]}>
            {station.num_bikes_available_mechanical || 0}
          </Text>
        </View>

        {/* Espacios Libres */}
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>🅿️ Espacios</Text>
          <Text style={[
            styles.infoValue,
            { color: getDocksColor(station.num_docks_available || 0) }
          ]}>
            {station.num_docks_available || 0}
          </Text>
        </View>
      </View>

      {/* La capacidad y la última actualización ya no vienen del backend con el nuevo formato,
          pero si quieres mantenerlos, asegúrate de que tu backend los devuelva.
          Por ahora, los he comentado o ajustado según el nuevo formato de datos. */}
      {/* <View style={styles.infoItem}>
        <Text style={styles.infoLabel}>📊 Capacidad</Text>
        <Text style={styles.infoValue}>
          {station.capacity || 0}
        </Text>
      </View> */}

      {/* {station.last_updated && (
        <Text style={styles.lastUpdated}>
          🕐 Actualizado: {new Date(station.last_updated).toLocaleTimeString('es-ES')}
        </Text>
      )} */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  stationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  distance: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  statusContainer: {
    marginBottom: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});
