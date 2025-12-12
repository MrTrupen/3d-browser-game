/**
 * Convert a value to px string for CSS
 * @param {number} value - Numeric value
 * @returns {string} Value with 'px' suffix
 */
function to_px(value) {
  return value + "px";
}

/**
 * Check if player collides with a cube
 * @param {number} playerX - Player X position
 * @param {number} playerZ - Player Z position
 * @param {Cube} cube - Cube object to check collision with
 * @returns {boolean} True if collision detected
 */
function checkCubeCollision(playerX, playerZ, cube) {
  const halfWidth = cube.width / 2;
  const halfDepth = cube.depth / 2;

  // Calculate cube boundaries
  const cubeLeft = cube.x - halfWidth;
  const cubeRight = cube.x + halfWidth;
  const cubeFront = cube.z - halfDepth;
  const cubeBack = cube.z + halfDepth;

  // Check if player's circular hitbox intersects with the cube
  // Find the closest point on the cube to the player
  const closestX = Math.max(cubeLeft, Math.min(playerX, cubeRight));
  const closestZ = Math.max(cubeFront, Math.min(playerZ, cubeBack));

  // Calculate distance from player to closest point
  const distanceX = playerX - closestX;
  const distanceZ = playerZ - closestZ;
  const distanceSquared = distanceX * distanceX + distanceZ * distanceZ;

  // Check if distance is less than player radius
  return distanceSquared < PLAYER_RADIUS * PLAYER_RADIUS;
}

/**
 * Check if player would collide with any walls at given position
 * @param {number} newX - New X position to check
 * @param {number} newZ - New Z position to check
 * @param {Array} cubes - Array of cube objects to check against
 * @returns {boolean} True if collision would occur
 */
function wouldCollideWithWalls(newX, newZ, cubes) {
  for (let i = 0; i < cubes.length; i++) {
    if (checkCubeCollision(newX, newZ, cubes[i])) {
      return true;
    }
  }
  return false;
}
