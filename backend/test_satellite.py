from routes.satellite import get_satellite_data

result = get_satellite_data(
    latitude=12.9716,
    longitude=77.5946
)

print(result)