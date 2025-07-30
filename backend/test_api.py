#!/usr/bin/env python3
"""
Script de prueba para verificar que la API de Bicing funciona correctamente
Ejecutar desde la carpeta backend: python test_api.py
"""

import sys
import os

# Agregar el directorio actual al path para imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from api_client import BicingAPIClient
from services.location_service import LocationService
from utils.geo_utils import calculate_distance

def test_bicing_api():
    """Probar la conexión con la API de Bicing"""
    print("🚴 Testando API de Bicing Barcelona...")
    print("=" * 50)

    # Inicializar cliente
    client = BicingAPIClient()

    # Probar obtener todas las estaciones
    print("\n1. Obteniendo todas las estaciones...")
    stations = client.get_all_stations()

    if not stations:
        print("❌ No se pudieron obtener las estaciones")
        return False

    print(f"✅ Se obtuvieron {len(stations)} estaciones")

    # Mostrar algunas estaciones de ejemplo
    print("\n2. Ejemplo de estaciones:")
    for i, station in enumerate(stations[:3]):
        print(f"   {i+1}. {station.get('name', 'Sin nombre')}")
        print(f"      ID: {station.get('station_id')}")
        print(f"      Coordenadas: {station.get('latitude')}, {station.get('longitude')}")
        print(f"      Capacidad: {station.get('capacity')}")
        print(f"      Bicis disponibles: {station.get('num_bikes_available')}")
        print(f"      Espacios disponibles: {station.get('num_docks_available')}")
        print(f"      Activa: {station.get('is_active')}")
        print()

    return True

def test_location_service():
    """Probar el servicio de ubicación"""
    print("\n3. Testando servicio de ubicación...")
    print("=" * 50)

    # Ubicación de prueba: Plaza Catalunya
    test_lat = 41.3851
    test_lng = 2.1734

    print(f"📍 Ubicación de prueba: Plaza Catalunya ({test_lat}, {test_lng})")

    # Obtener estaciones
    client = BicingAPIClient()
    stations = client.get_all_stations()

    if not stations:
        print("❌ No se pudieron obtener las estaciones")
        return False

    # Buscar estaciones cercanas
    location_service = LocationService()
    nearby_stations = location_service.get_nearby_stations(
        user_lat=test_lat,
        user_lng=test_lng,
        stations=stations,
        radius_meters=500  # 500 metros
    )

    print(f"✅ Se encontraron {len(nearby_stations)} estaciones en un radio de 500m")

    # Mostrar las 3 más cercanas
    print("\n4. Estaciones más cercanas:")
    for i, station in enumerate(nearby_stations[:3]):
        print(f"   {i+1}. {station.get('name', 'Sin nombre')}")
        print(f"      Distancia: {station.get('distance_formatted')}")
        print(f"      Bicis: {station.get('num_bikes_available')}")
        print(f"      Espacios: {station.get('num_docks_available')}")
        print()

    return True

def test_distance_calculation():
    """Probar cálculos de distancia"""
    print("\n5. Testando cálculos de distancia...")
    print("=" * 50)

    # Coordenadas de prueba
    plaza_catalunya = (41.3851, 2.1734)
    sagrada_familia = (41.4036, 2.1744)

    distance = calculate_distance(
        plaza_catalunya[0], plaza_catalunya[1],
        sagrada_familia[0], sagrada_familia[1]
    )

    print(f"📏 Distancia Plaza Catalunya → Sagrada Familia: {distance:.0f} metros")

    # Verificar que el cálculo es razonable (debería ser ~2km)
    if 1800 <= distance <= 2200:
        print("✅ Cálculo de distancia correcto")
        return True
    else:
        print("❌ Cálculo de distancia incorrecto")
        return False

def main():
    """Ejecutar todas las pruebas"""
    print("🔧 INICIANDO TESTS DEL SISTEMA BCN-BICING")
    print("=" * 60)

    tests_passed = 0
    total_tests = 3

    # Test 1: API de Bicing
    if test_bicing_api():
        tests_passed += 1

    # Test 2: Servicio de ubicación
    if test_location_service():
        tests_passed += 1

    # Test 3: Cálculos de distancia
    if test_distance_calculation():
        tests_passed += 1

    # Resumen
    print("\n" + "=" * 60)
    print("📊 RESUMEN DE TESTS")
    print("=" * 60)
    print(f"Tests pasados: {tests_passed}/{total_tests}")

    if tests_passed == total_tests:
        print("🎉 ¡TODOS LOS TESTS PASARON!")
        print("✅ El sistema está listo para usar")
    else:
        print("❌ Algunos tests fallaron")
        print("🔧 Revisa la configuración y conexión de red")

    return tests_passed == total_tests

if __name__ == "__main__":
    main()
