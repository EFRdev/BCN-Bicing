import requests
import json
from typing import List, Dict, Optional

class BicingAPIClient:
    """Cliente para interactuar con la API de Bicing de Barcelona usando GBFS"""

    def __init__(self):
        # API GBFS de Bicing Barcelona - URLs reales obtenidas
        self.stations_info_url = "https://barcelona-sp.publicbikesystem.net/customer/ube/gbfs/v1/en/station_information"
        self.stations_status_url = "https://barcelona-sp.publicbikesystem.net/customer/ube/gbfs/v1/en/station_status"

    def get_all_stations(self) -> Optional[List[Dict]]:
        """
        Obtener información de todas las estaciones de Bicing
        Combina datos de información estática y estado en tiempo real
        """
        try:
            # Obtener información estática de las estaciones
            stations_info = self._get_stations_info()
            if not stations_info:
                print("❌ No se pudo obtener información de estaciones")
                return None

            # Obtener estado en tiempo real
            stations_status = self._get_stations_status()
            if not stations_status:
                print("⚠️ No se pudo obtener estado de estaciones, usando solo info estática")
                return stations_info

            # Combinar información estática con estado en tiempo real
            combined_stations = self._combine_station_data(stations_info, stations_status)

            print(f"✅ Obtenidas {len(combined_stations)} estaciones")
            return combined_stations

        except Exception as e:
            print(f"❌ Error obteniendo estaciones: {e}")
            return None

    def _get_stations_info(self) -> Optional[List[Dict]]:
        """Obtener información estática de las estaciones desde GBFS"""
        try:
            response = requests.get(self.stations_info_url, timeout=10)
            response.raise_for_status()

            data = response.json()

            # Verificar estructura GBFS
            if 'data' in data and 'stations' in data['data']:
                stations = data['data']['stations']
                print(f"📍 Información de {len(stations)} estaciones obtenida")
                return stations
            else:
                print("❌ Respuesta inválida de la API de información")
                return None

        except requests.RequestException as e:
            print(f"❌ Error de red obteniendo info de estaciones: {e}")
            return None
        except Exception as e:
            print(f"❌ Error procesando info de estaciones: {e}")
            return None

    def _get_stations_status(self) -> Optional[List[Dict]]:
        """Obtener estado en tiempo real de las estaciones desde GBFS"""
        try:
            response = requests.get(self.stations_status_url, timeout=10)
            response.raise_for_status()

            data = response.json()

            # Verificar estructura GBFS
            if 'data' in data and 'stations' in data['data']:
                stations = data['data']['stations']
                print(f"🔄 Estado de {len(stations)} estaciones obtenido")
                return stations
            else:
                print("❌ Respuesta inválida de la API de estado")
                return None

        except requests.RequestException as e:
            print(f"❌ Error de red obteniendo estado de estaciones: {e}")
            return None
        except Exception as e:
            print(f"❌ Error procesando estado de estaciones: {e}")
            return None

    def _combine_station_data(self, stations_info: List[Dict], stations_status: List[Dict]) -> List[Dict]:
        """Combinar información estática con estado en tiempo real usando GBFS y GBFS-V1"""
        # Crear un diccionario de estado por station_id para búsqueda rápida
        status_dict = {}
        for status in stations_status:
            station_id = status.get('station_id')
            if station_id:
                status_dict[station_id] = status

        combined = []
        for info in stations_info:
            station_id = info.get('station_id')

            # Estructura base con información estática
            station = {
                'station_id': station_id,
                'name': info.get('name', 'Sin nombre'),
                'address': info.get('address', ''),
                'latitude': float(info.get('lat', 0)),
                'longitude': float(info.get('lon', 0)),
                # Estado por defecto si no hay datos en tiempo real
                'num_bikes_available_ebike': 0,
                'num_bikes_available_mechanical': 0,
                'num_docks_available': 0,
                'is_active': False,
            }

            # Agregar datos de estado en tiempo real si están disponibles
            if station_id in status_dict:
                status = status_dict[station_id]
                station.update({
                    # Actualizar con los campos específicos de Bicing
                    'num_bikes_available_ebike': int(status.get('num_ebikes_available', 0)),
                    'num_bikes_available_mechanical': int(status.get('num_bikes_available', 0)) - int(status.get('num_ebikes_available', 0)),
                    'num_docks_available': int(status.get('num_docks_available', 0)),
                    'is_active': status.get('is_renting', False) and status.get('is_returning', False),
                })

            combined.append(station)

        return combined
