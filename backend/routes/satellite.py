from fastapi import APIRouter, HTTPException

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


@router.get("/all")
def satellite_analysis(latitude: float, longitude: float):
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

    satellite_data = {
        "landsat": get_lst(latitude, longitude),
        "sentinel": get_ndvi(latitude, longitude),
        "worldcover": get_land_cover(latitude, longitude),
        "weather": get_weather(latitude, longitude),
    }

    analysis = calculate_heat_stress(satellite_data)

    scenarios = generate_cooling_scenarios(analysis)

    return {
        "satellite_data": satellite_data,
        "analysis": analysis,
        "cooling_scenarios": scenarios
    }