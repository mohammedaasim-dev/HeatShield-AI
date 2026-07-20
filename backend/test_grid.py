from services.grid_generator import generate_grid

grid = generate_grid(
    center_lat=12.9716,
    center_lon=77.5946
)

print(f"Total Points: {len(grid)}")

for point in grid:
    print(point)