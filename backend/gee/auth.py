import ee

PROJECT_ID = "heatshieldai"

_initialized = False


def initialize_gee():
    global _initialized

    if _initialized:
        return

    ee.Initialize(project=PROJECT_ID)
    _initialized = True

    print("✅ Google Earth Engine Initialized")