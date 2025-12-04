/**
 * Generate a simple maze using rectangles
 * @param {number} gridSize - Size of the grid (gridSize x gridSize)
 * @param {number} cellSize - Size of each cell in the grid
 * @returns {Array} Array of rectangle objects forming a maze
 */
function generate_maze(grid_size, cell_size) {
  const maze = [];
  const wall_height = 200;
  const texture = "url('Patterns/hedge.jpg')";
  const half_grid = grid_size / 2;
  const half_cell = cell_size / 2;

  for (let row = 0; row < grid_size; row++) {
    for (let col = 0; col < grid_size; col++) {
      const x = (col - half_grid + 0.5) * cell_size;
      const z = (row - half_grid + 0.5) * cell_size;
      const random = Math.random();
      const is_start = row === 0 && col === 0;

      // Vertical wall on right side
      if (col < grid_size - 1 && random > 0.6 && !is_start) {
        maze.push(new rectangle(x + half_cell, 0, z, 0, 90, 0, cell_size, wall_height, texture));
      }

      // Horizontal wall on bottom side
      if (row < grid_size - 1 && random < 0.4 && !is_start) {
        maze.push(new rectangle(x, 0, z + half_cell, 0, 0, 0, cell_size, wall_height, texture));
      }
    }
  }

  return maze;
}
