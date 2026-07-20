from gee.auth import initialize_gee
import ee

initialize_gee()

point = ee.Geometry.Point([77.5946, 12.9716])

elevation = (
    ee.Image("USGS/SRTMGL1_003")
    .sample(point, 30)
    .first()
    .get("elevation")
    .getInfo()
)

print("Elevation:", elevation)