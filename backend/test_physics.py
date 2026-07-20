from routes.satellite import get_satellite_data
from services.physics_engine import calculate_heat_stress

data = get_satellite_data(
    latitude=12.9716,
    longitude=77.5946
)

result = calculate_heat_stress(data)

print(result)