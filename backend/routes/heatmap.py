from fastapi import APIRouter, HTTPException

from ..services.grid_generator import generate_grid
from ..services.physics_engine import calculate_heat_stress
from ..services.scenario_engine import generate_cooling_scenarios

router = APIRouter()


def _load_satellite_modules():
    try:
        from ..gee.landsat import get_lst
        from ..gee.sentinel import get_ndvi
        from ..gee.worldcover import get_land_cover
        from ..gee.weather import get_weather
    except ModuleNotFoundError as exc:
        return {"error": "Google Earth Engine package unavailable.", "detail": str(exc)}

    return {
        "get_lst": get_lst,
        "get_ndvi": get_ndvi,
        "get_land_cover": get_land_cover,
        "get_weather": get_weather,
    }


@router.get("/")
def generate_heatmap(latitude: float, longitude: float):

    grid = generate_grid(latitude, longitude)

    satellite_modules = _load_satellite_modules()
    if "error" in satellite_modules:
        raise HTTPException(
            status_code=503,
            detail=satellite_modules["detail"]
        )

    get_lst = satellite_modules["get_lst"]
    get_ndvi = satellite_modules["get_ndvi"]
    get_land_cover = satellite_modules["get_land_cover"]
    get_weather = satellite_modules["get_weather"]

    results = []

    for point in grid:

        satellite_data = {
            "landsat": get_lst(point["latitude"], point["longitude"]),
            "sentinel": get_ndvi(point["latitude"], point["longitude"]),
            "worldcover": get_land_cover(point["latitude"], point["longitude"]),
            "weather": get_weather(point["latitude"], point["longitude"])
        }

        analysis = calculate_heat_stress(satellite_data)

        scenarios = generate_cooling_scenarios(analysis)

        results.append({
            "latitude": point["latitude"],
            "longitude": point["longitude"],

            "score": analysis["heat_stress_score"],
            "risk": analysis["risk"],

            "drivers": analysis["drivers"],

            "recommendation": scenarios[0]["intervention"],

            "priority": scenarios[0]["priority"]
        })

    return results