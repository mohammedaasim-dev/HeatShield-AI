import ee
from .auth import initialize_gee

initialize_gee()


def get_weather(latitude, longitude):

    point = ee.Geometry.Point([longitude, latitude])

    image = (
        ee.ImageCollection("ECMWF/ERA5_LAND/HOURLY")
        .filterDate("2024-07-01", "2024-07-02")
        .first()
    )

    weather = image.reduceRegion(
        reducer=ee.Reducer.first(),
        geometry=point,
        scale=1000,
        maxPixels=1e9,
    )

    return {
        "latitude": latitude,
        "longitude": longitude,
        "temperature_kelvin": weather.get("temperature_2m").getInfo(),
        "humidity": weather.get("dewpoint_temperature_2m").getInfo(),
        "wind_u": weather.get("u_component_of_wind_10m").getInfo(),
        "wind_v": weather.get("v_component_of_wind_10m").getInfo(),
    }