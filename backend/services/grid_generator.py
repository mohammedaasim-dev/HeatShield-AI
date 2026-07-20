def generate_grid(center_lat, center_lon, step=0.005, size=5):
    """
    Generate a square grid of latitude/longitude points.

    size=5 creates a 5x5 grid (25 points).
    """

    points = []

    offset = size // 2

    for i in range(-offset, offset + 1):
        for j in range(-offset, offset + 1):

            lat = center_lat + (i * step)
            lon = center_lon + (j * step)

            points.append({
                "latitude": round(lat, 6),
                "longitude": round(lon, 6)
            })

    return points