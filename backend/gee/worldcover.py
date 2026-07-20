import ee
from gee.auth import initialize_gee

initialize_gee()


LAND_COVER_CLASSES = {
    10: "Trees",
    20: "Shrubland",
    30: "Grassland",
    40: "Cropland",
    50: "Built-up",
    60: "Bare / Sparse Vegetation",
    70: "Snow / Ice",
    80: "Water",
    90: "Wetland",
    95: "Mangroves",
    100: "Moss & Lichen"
}


def get_land_cover(latitude, longitude):

    point = ee.Geometry.Point([longitude, latitude])

    image = ee.Image("ESA/WorldCover/v200/2021")

    value = (
        image.select("Map")
        .reduceRegion(
            reducer=ee.Reducer.first(),
            geometry=point,
            scale=10,
            maxPixels=1e9,
        )
        .get("Map")
        .getInfo()
    )

    return {
        "latitude": latitude,
        "longitude": longitude,
        "class_id": value,
        "land_cover": LAND_COVER_CLASSES.get(value, "Unknown")
    }