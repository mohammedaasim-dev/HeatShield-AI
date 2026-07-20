from routes.satellite import get_satellite_data
from services.physics_engine import calculate_heat_stress
from services.scenario_engine import generate_cooling_scenarios

data = get_satellite_data(
    latitude=12.9716,
    longitude=77.5946
)

analysis = calculate_heat_stress(data)

scenarios = generate_cooling_scenarios(analysis)

print("\nHeat Analysis")
print(analysis)

print("\nCooling Scenarios")

for scenario in scenarios:
    print(scenario)