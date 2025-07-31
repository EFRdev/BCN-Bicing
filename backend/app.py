from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import sys

# Agregar el directorio actual al path para imports relativos
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from api_client import BicingAPIClient
from services.location_service import LocationService

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__)
CORS(app)  # Permitir requests desde el frontend

# Inicializar servicios
bicing_client = BicingAPIClient()
location_service = LocationService()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Endpoint para verificar que la API funciona"""
    return jsonify({"message": "API funcionando correctamente", "status": "OK"})

@app.route('/api/stations/nearby', methods=['GET'])
def get_nearby_stations():
    """
    Obtener estaciones de Bicing cercanas a una ubicación
    Parámetros esperados: lat, lng, radius (opcional, default 1000m)
    """
    try:
        # Obtener parámetros de la request
        lat = request.args.get('lat', type=float)
        lng = request.args.get('lng', type=float)
        radius = request.args.get('radius', default=1000, type=int)

        if lat is None or lng is None:
            return jsonify({"error": "Parámetros lat y lng son requeridos"}), 400

        # Obtener todas las estaciones de Bicing
        all_stations = bicing_client.get_all_stations()

        if not all_stations:
            return jsonify({"error": "No se pudieron obtener las estaciones"}), 500

        # Filtrar estaciones cercanas
        nearby_stations = location_service.get_nearby_stations(
            user_lat=lat,
            user_lng=lng,
            stations=all_stations,
            radius_meters=radius
        )

        return jsonify({
            "stations": nearby_stations,
            "count": len(nearby_stations),
            "user_location": {"lat": lat, "lng": lng},
            "radius_meters": radius
        })

    except Exception as e:
        return jsonify({"error": f"Error interno: {str(e)}"}), 500

@app.route('/api/stations', methods=['GET'])
def get_all_stations():
    """Obtener todas las estaciones de Bicing (para testing)"""
    try:
        stations = bicing_client.get_all_stations()
        return jsonify({
            "stations": stations,
            "count": len(stations) if stations else 0
        })
    except Exception as e:
        return jsonify({"error": f"Error interno: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

#if __name__ == '__main__':
#    port = int(os.getenv('PORT', 5000))
#    debug = os.getenv('FLASK_ENV') == 'development'

#    print(f"🚀 Iniciando servidor en puerto {port}")
#    print(f"🔧 Modo debug: {debug}")

#    app.run(host='0.0.0.0', port=port, debug=debug)
