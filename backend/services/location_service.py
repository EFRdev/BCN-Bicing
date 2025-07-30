from typing import List, Dict
import sys
import os

# Agregar el directorio padre al path para imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.geo_utils import calculate_distance

class LocationService:
    """Servicio para operaciones relacionadas con ubicación y distancias"""

    def get_nearby_stations(self, user_lat: float, user_lng: float,
                          stations: List[Dict], radius_meters: int = 1000) -> List[Dict]:
        """
        Filtrar y ordenar estaciones por proximidad al usuario

        Args:
            user_lat: Latitud del usuario
            user_lng: Longitud del usuario
            stations: Lista de todas las estaciones
            radius_meters: Radio de búsqueda en metros

        Returns:
            Lista de estaciones cercanas ordenadas por distancia
        """
        nearby_stations = []

        for station in stations:
            station_lat = station.get('latitude', 0)
            station_lng = station.get('longitude', 0)

            # Saltar estaciones sin coordenadas válidas
            if not station_lat or not station_lng:
                continue

            # Calcular distancia
            distance = calculate_distance(
                user_lat, user_lng,
                station_lat, station_lng
            )

            # Filtrar por radio
            if distance <= radius_meters:
                # Agregar distancia a los datos de la estación
                station_with_distance = station.copy()
                station_with_distance['distance_meters'] = round(distance, 1)
                station_with_distance['distance_formatted'] = self._format_distance(distance)

                nearby_stations.append(station_with_distance)

        # Ordenar por distancia (más cercano primero)
        nearby_stations.sort(key=lambda x: x['distance_meters'])

        # Limitar a las 10 más cercanas para el MVP
        return nearby_stations[:10]

    def _format_distance(self, distance_meters: float) -> str:
        """
        Formatear la distancia para mostrar al usuario

        Args:
            distance_meters: Distancia en metros

        Returns:
            String formateado (ej: "150m" o "1.2km")
        """
        if distance_meters < 1000:
            return f"{int(distance_meters)}m"
        else:
            return f"{distance_meters/1000:.1f}km"

    def get_stations_summary(self, stations: List[Dict]) -> Dict:
        """
        Generar resumen de estaciones para debugging
        """
        if not stations:
            return {"total": 0, "active": 0, "with_bikes": 0}

        total = len(stations)
        active = sum(1 for s in stations if s.get('is_active', False))
        with_bikes = sum(1 for s in stations if s.get('num_bikes_available', 0) > 0)

        return {
            "total": total,
            "active": active,
            "with_bikes": with_bikes,
            "inactive": total - active
        }
