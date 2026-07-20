import ee
from gee.auth import initialize_gee

initialize_gee()


def get_lst(latitude, longitude):
    """
    Fetch Land Surface Temperature (LST) from Landsat 8.
    Returns the mean thermal band value around the location.
    """

    point = ee.Geometry.Point([longitude, latitude])

    collection = (
        ee.ImageCollection("LANDSAT/LC08/C02/T1_L2")
        .filterBounds(point)
        .filterDate("2024-01-01", "2024-12-31")
        .sort("CLOUD_COVER")
    )

    image = collection.first()

    if image is None:
        return {"error": "No Landsat image found."}

    temperature = (
        image.select("ST_B10")
        .reduceRegion(
            reducer=ee.Reducer.mean(),
            geometry=point,
            scale=30,
            maxPixels=1e9,
        )
        .get("ST_B10")
        .getInfo()
    )

    return {
        "latitude": latitude,
        "longitude": longitude,
        "raw_lst": temperature,
    }