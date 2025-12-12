/**
 * Generate a simple maze using rectangles
 * @param {number} gridSize - Size of the grid (gridSize x gridSize)
 * @param {number} cellSize - Size of each cell in the grid
 * @returns {Array} Array of rectangle objects forming a maze
 */
function generateMaze(gridSize, cellSize) {
  const maze = [];
  const wallHeight = 200;
  const texture = "url('sprites/wall.png')";
  const halfGrid = gridSize / 2;
  const halfCell = cellSize / 2;

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const x = (col - halfGrid + 0.5) * cellSize;
      const z = (row - halfGrid + 0.5) * cellSize;
      const random = Math.random();
      const isStart = row === 0 && col === 0;

      // Vertical wall on right side
      if (col < gridSize - 1 && random > 0.6 && !isStart) {
        maze.push(new Rectangle(x + halfCell, 0, z, 0, 90, 0, cellSize, wallHeight, texture));
      }

      // Horizontal wall on bottom side
      if (row < gridSize - 1 && random < 0.4 && !isStart) {
        maze.push(new Rectangle(x, 0, z + halfCell, 0, 0, 0, cellSize, wallHeight, texture));
      }
    }
  }

  return maze;
}
