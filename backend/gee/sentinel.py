import ee
from .auth import initialize_gee

initialize_gee()

def get_ndvi(latitude, longitude):
    point = ee.Geometry.Point([longitude, latitude])

    collection = (
        ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
        .filterBounds(point)
        .filterDate("2024-01-01", "2024-12-31")
        .sort("CLOUDY_PIXEL_PERCENTAGE")
    )

    image = collection.first()

    ndvi = (
        image.normalizedDifference(["B8", "B4"])
        .rename("NDVI")
        .reduceRegion(
            reducer=ee.Reducer.mean(),
            geometry=point,
            scale=10,
            maxPixels=1e9,
        )
        .get("NDVI")
        .getInfo()
    )

    return {
        "latitude": latitude,
        "longitude": longitude,
        "ndvi": ndvi
    }