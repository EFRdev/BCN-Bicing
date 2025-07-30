import math

def calculate_distance(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    """
    Calcular distancia entre dos puntos geográficos usando la fórmula de Haversine
    
    Args:
        lat1, lng1: Coordenadas del primer punto
        lat2, lng2: Coordenadas del segundo punto
    
    Returns:
        Distancia en metros
    """
    # Radio de la Tierra en metros
    R = 6371000
    
    # Convertir grados a radianes
    lat1_rad = math.radians(lat1)
    lat2_rad = math.radians(lat2)
    delta_lat = math.radians(lat2 - lat1)
    delta_lng = math.radians(lng2 - lng1)
    
    # Fórmula de Haversine
    a = (math.sin(delta_lat / 2) * math.sin(delta_lat / 2) +
         math.cos(lat1_rad) * math.cos(lat2_rad) *
         math.sin(delta_lng / 2) * math.sin(delta_lng / 2))
    
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    
    # Distancia en metros
    distance = R * c
    
    return distance

def is_valid_coordinate(lat: float, lng: float) -> bool:
    """
    Validar si las coordenadas son válidas
    
    Args:
        lat: Latitud
        lng: Longitud
        
    Returns:
        True si las coordenadas son válidas
    """
    return (-90 <= lat <= 90) and (-180 <= lng <= 180)

def is_in_barcelona_area(lat: float, lng: float) -> bool:
    """
    Verificar si las coordenadas están en el área de Barcelona (aproximado)
    
    Args:
        lat: Latitud
        lng: Longitud
        
    Returns:
        True si está en el área de Barcelona
    """
    # Coordenadas aproximadas del área metropolitana de Barcelona
    barcelona_bounds = {
        'lat_min': 41.320,
        'lat_max': 41.470,
        'lng_min': 2.050,
        'lng_max': 2.250
    }
    
    return (barcelona_bounds['lat_min'] <= lat <= barcelona_bounds['lat_max'] and
            barcelona_bounds['lng_min'] <= lng <= barcelona_bounds['lng_max'])