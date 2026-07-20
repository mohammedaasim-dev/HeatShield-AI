from fastapi import APIRouter

from gee.landsat import get_lst
from gee.sentinel import get_ndvi
from gee.worldcover import get_land_cover
from gee.weather import get_weather

from services.physics_engine import calculate_heat_stress
from services.scenario_engine import generate_cooling_scenarios

router = APIRouter()


@router.get("/all")
def satellite_analysis(latitude: float, longitude: float):

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