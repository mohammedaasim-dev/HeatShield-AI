import math


def calculate_heat_stress(data):
    """
    Calculate Urban Heat Stress Score
    """

    score = 0
    drivers = []

    # ----------------------------
    # Land Surface Temperature
    # ----------------------------

    lst_raw = data["landsat"]["raw_lst"]

    lst_kelvin = (lst_raw * 0.00341802) + 149
    lst_celsius = lst_kelvin - 273.15

    if lst_celsius >= 40:
        score += 35
        drivers.append("Very High Land Surface Temperature")

    elif lst_celsius >= 35:
        score += 25
        drivers.append("High Land Surface Temperature")

    elif lst_celsius >= 30:
        score += 15

    # ----------------------------
    # NDVI
    # ----------------------------

    ndvi = data["sentinel"]["ndvi"]

    if ndvi < 0.2:
        score += 25
        drivers.append("Very Low Vegetation")

    elif ndvi < 0.4:
        score += 15
        drivers.append("Sparse Vegetation")

    elif ndvi < 0.6:
        score += 5

    # ----------------------------
    # Land Cover
    # ----------------------------

    land_cover = data["worldcover"]["land_cover"]

    if land_cover == "Built-up":
        score += 25
        drivers.append("Dense Urban Area")

    elif land_cover == "Bare / Sparse Vegetation":
        score += 15

    # ----------------------------
    # Wind Speed
    # ----------------------------

    u = data["weather"]["wind_u"]
    v = data["weather"]["wind_v"]

    wind_speed = math.sqrt(u*u + v*v)

    if wind_speed < 2:
        score += 15
        drivers.append("Low Wind Speed")

    elif wind_speed < 4:
        score += 8

    # ----------------------------
    # Final Risk
    # ----------------------------

    if score >= 70:
        risk = "High"

    elif score >= 40:
        risk = "Medium"

    else:
        risk = "Low"

    return {
        "heat_stress_score": score,
        "risk": risk,
        "drivers": drivers,
        "land_surface_temperature": round(lst_celsius,2),
        "wind_speed": round(wind_speed,2)
    }