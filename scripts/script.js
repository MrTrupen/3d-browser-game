// Variables for movement
let pressLeft = 0;
let pressRight = 0;
let pressForward = 0;
let pressBack = 0;
let pressJump = false;
let pressSprint = 1;

// Physics variables
let verticalVelocity = 0;
let isGrounded = true;

// Other
const winSound = new Audio("sounds/win_screen.wav");
winSound.load();
winSound.volume = 0.4;

// Variables for mouse
let mouseX = 0;
let mouseY = 0;
let isMouseLocked = false;
let canLockMouse = false;

// Rotation angle for collectibles
let collectibleRotation = 0;

// Game state variables
let worldIdx = 0;
let totalCollectibles = 0;
let collectedCount = 0;

// Notification timeout ID (to clear previous timeout if notification is called again)
let notificationTimeoutId = null;

// Function to show pickup notification
function showPickupNotification(message = "You've picked an item!") {
  const notification = document.getElementById("pickup-notification");
  const notificationText = document.getElementById("notification-text");

  // Update the notification text
  notificationText.textContent = message;

  // Clear any previous timeout
  if (notificationTimeoutId) {
    clearTimeout(notificationTimeoutId);
  }

  // Show the notification
  notification.style.display = "block";

  // Hide the notification after 3 seconds
  notificationTimeoutId = setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}
let gameStartTime = 0;
let gameTimer = 0;
let isGameActive = false;
let timerGame = null;
let worlds = [level1, house_map, level2];
let activeCrystals = [];
let activeKeys = [];
let activeHoles = [];
let levelsCompleted = 0;
let totalGameTime = 0;
const LEVELS_TO_WIN = 3; // Number of levels to complete before final win screen

// Variable for HTML objects
const world = document.getElementById("world");
const container = document.getElementById("container");
const gameGUI = document.getElementById("game-gui");
const collectiblesRemainingSpan = document.getElementById("collectibles-remaining");
const timerDisplay = document.getElementById("timer-display");
const winScreen = document.getElementById("win-screen");
const completionTimeDisplay = document.getElementById("completion-time");
const finalWinScreen = document.getElementById("final-win-screen");
const totalCompletionTimeDisplay = document.getElementById("total-completion-time");

function cloneRectangles(rectangles) {
  return rectangles.map(
    (rectangle) =>
      new Rectangle(
        rectangle.x,
        rectangle.y,
        rectangle.z,
        rectangle.rotationX,
        rectangle.rotationY,
        rectangle.rotationZ,
        rectangle.width,
        rectangle.height,
        rectangle.patternPath,
        rectangle.sound,
      ),
  );
}

// Mouse locking
container.onclick = function () {
  if (canLockMouse) {
    if (!isMouseLocked) {
      container.requestPointerLock();
    } else {
      document.exitPointerLock(); // Use document for exit
    }
  }
};

// Listen for pointer lock change
document.addEventListener("pointerlockchange", (event) => {
  // Update lock status based on pointerLockElement
  isMouseLocked = document.pointerLockElement === container;
});

// If the key is pressed
document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (KEY_FORWARD.includes(key) || KEY_FORWARD.includes(event.key)) {
    pressForward = 1;
  }
  if (KEY_BACK.includes(key) || KEY_BACK.includes(event.key)) {
    pressBack = 1;
  }
  if (KEY_RIGHT.includes(key) || KEY_RIGHT.includes(event.key)) {
    pressRight = 1;
  }
  if (KEY_LEFT.includes(key) || KEY_LEFT.includes(event.key)) {
    pressLeft = 1;
  }
  if (KEY_JUMP.includes(key) || (KEY_JUMP.includes(event.key) && !event.repeat)) {
    pressJump = true;
  }
  if (KEY_SPRINT.includes(event.key)) {
    pressSprint = SPRINT_SPEED;
  }
});

// If the key is released
document.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  if (KEY_FORWARD.includes(key) || KEY_FORWARD.includes(event.key)) {
    pressForward = 0;
  }
  if (KEY_BACK.includes(key) || KEY_BACK.includes(event.key)) {
    pressBack = 0;
  }
  if (KEY_RIGHT.includes(key) || KEY_RIGHT.includes(event.key)) {
    pressRight = 0;
  }
  if (KEY_LEFT.includes(key) || KEY_LEFT.includes(event.key)) {
    pressLeft = 0;
  }
  if (KEY_JUMP.includes(key) || KEY_JUMP.includes(event.key)) {
    pressJump = false;
  }
  if (KEY_SPRINT.includes(event.key)) {
    pressSprint = 1;
  }
});

// Mouse movement listener
document.addEventListener("mousemove", (event) => {
  mouseX = event.movementX * MOUSE_SPEED;
  mouseY = event.movementY * MOUSE_SPEED;
});

const player = new Player(0, 0, 0, 0, 0);

function update() {
  // Count movement
  let differenceX =
    Math.cos(player.rotationY * DEG) * ((pressRight - pressLeft) * MOVE_SPEED * pressSprint) -
    Math.sin(player.rotationY * DEG) * ((pressForward - pressBack) * MOVE_SPEED * pressSprint);
  let differenceZ = -(
    Math.sin(player.rotationY * DEG) * ((pressRight - pressLeft) * MOVE_SPEED * pressSprint) +
    Math.cos(player.rotationY * DEG) * ((pressForward - pressBack) * MOVE_SPEED * pressSprint)
  );
  let differenceRotationX = mouseY;
  let differenceRotationY = -mouseX;

  // Handle jumping - only jump when on ground
  if (pressJump && isGrounded) {
    verticalVelocity = -JUMP_SPEED;
    isGrounded = false;
    pressJump = false; // Consume the jump input
  }

  // Apply gravity
  verticalVelocity += GRAVITY;

  // Apply vertical velocity
  let newY = player.y + verticalVelocity;

  // Calculate new position
  let newX = player.x + differenceX;
  let newZ = player.z + differenceZ;

  // Combine all cubes for collision detection using the currently loaded world
  const activeWorldIdx = (worldIdx - 1 + worlds.length) % worlds.length;
  let allWalls = [...boundaries, ...worlds[activeWorldIdx]];
  // const allWalls = level1;

  // Check collision with walls before applying movement
  if (!wouldCollideWithWalls(newX, newZ, allWalls)) {
    player.x = newX;
    player.z = newZ;
  } else {
    // Try sliding along walls - check X and Z separately
    if (!wouldCollideWithWalls(newX, player.z, allWalls)) {
      player.x = newX;
    }
    if (!wouldCollideWithWalls(player.x, newZ, allWalls)) {
      player.z = newZ;
    }
  }

  // Apply vertical movement with ground collision
  if (newY >= 0) {
    // Hit ground or below ground level
    player.y = 0;
    verticalVelocity = 0;
    isGrounded = true;
  } else {
    // Still in air
    player.y = newY;
    isGrounded = false;
  }

  // Rotate only when mouse is locked
  if (isMouseLocked) {
    player.rotationX = player.rotationX + differenceRotationX;
    player.rotationY = player.rotationY + differenceRotationY;
  }

  // Change coordinates of the world
  world.style.transform =
    "translateZ(600px)" +
    "rotateX(" +
    -player.rotationX +
    "deg) rotateY(" +
    -player.rotationY +
    "deg) translate3d(" +
    to_px(-player.x) +
    "," +
    to_px(-player.y) +
    "," +
    to_px(-player.z) +
    ")";

  // Update rotation for collectibles
  collectibleRotation = (collectibleRotation + 2) % 360;
  rotateCollectibles();

  mouseX = 0;
  mouseY = 0;
}

function createNewWorld() {
  const safeWorldIdx = worldIdx % worlds.length;
  const levelCrystals = crystalsByLevel[safeWorldIdx] || [];
  const levelKeys = keysByLevel[safeWorldIdx] || [];
  const levelHoles = holesByLevel[safeWorldIdx] || [];

  activeCrystals = cloneRectangles(levelCrystals);
  activeKeys = cloneRectangles(levelKeys);
  activeHoles = cloneRectangles(levelHoles);

  createCubes(boundaries, "boundaries");
  createSquares(groundAndCelling, "groundCelling");
  // createCubes(generateMazeCubes(10, 200), "walls");
  createCubes(worlds[safeWorldIdx], "walls");
  worldIdx = safeWorldIdx + 1;

  createSquares(activeCrystals, "crystal");
  createSquares(activeKeys, "key");
  createSquares(activeHoles, "holes");

  // Initialize game state
  totalCollectibles = activeCrystals.length + activeKeys.length;
  collectedCount = 0;
  gameStartTime = Date.now();
  gameTimer = 0;
  isGameActive = true;

  // Show GUI and update displays
  gameGUI.style.display = "block";
  updateCollectiblesDisplay();
  timerDisplay.textContent = "0:00";
}

function startGameLoop() {
  if (timerGame) {
    clearInterval(timerGame);
  }
  timerGame = setInterval(repeatForever, UPDATE_INTERVAL);
}

function createSquares(squares, objectType) {
  for (let objectIdx = 0; objectIdx < squares.length; objectIdx++) {
    // Create rectangles and styles
    let newElement = document.createElement("div");
    newElement.className = objectType + " square";
    newElement.id = objectType + objectIdx;
    newElement.style.width = to_px(squares[objectIdx].width);
    newElement.style.height = to_px(squares[objectIdx].height);

    // Apply textures based on surface type
    newElement.style.backgroundImage = squares[objectIdx].patternPath;

    newElement.style.transform =
      "translate3d(" +
      to_px(600 - squares[objectIdx].width / 2 + squares[objectIdx].x) +
      "," +
      to_px(400 - squares[objectIdx].height / 2 + squares[objectIdx].y) +
      "," +
      to_px(squares[objectIdx].z) +
      ") rotateX(" +
      squares[objectIdx].rotationX +
      "deg) rotateY(" +
      squares[objectIdx].rotationY +
      "deg) rotateZ(" +
      squares[objectIdx].rotationZ +
      "deg)";

    // Insert rectangles into the world
    world.append(newElement);
  }
}

function createCubes(cubes, objectType) {
  for (let cubeIdx = 0; cubeIdx < cubes.length; cubeIdx++) {
    const cube = cubes[cubeIdx];
    const faces = cube.getFaces();

    // Create each face of the cube
    for (let faceIdx = 0; faceIdx < faces.length; faceIdx++) {
      const face = faces[faceIdx];
      let newElement = document.createElement("div");
      newElement.className = objectType + " square";
      newElement.id = objectType + cubeIdx + "_face" + faceIdx;
      newElement.style.width = to_px(face.width);
      newElement.style.height = to_px(face.height);
      newElement.style.backgroundImage = face.patternPath;

      newElement.style.transform =
        "translate3d(" +
        to_px(600 - face.width / 2 + face.x) +
        "," +
        to_px(400 - face.height / 2 + face.y) +
        "," +
        to_px(face.z) +
        ") rotateX(" +
        face.rotationX +
        "deg) rotateY(" +
        face.rotationY +
        "deg) rotateZ(" +
        face.rotationZ +
        "deg)";

      world.append(newElement);
    }
  }
}

function rotateCollectibles() {
  rotateCollectibleArray(activeCrystals, "crystal");
  rotateCollectibleArray(activeKeys, "key");
}

function rotateCollectibleArray(collectibles, elementPrefix) {
  for (let i = 0; i < collectibles.length; i++) {
    const element = document.getElementById(elementPrefix + i);
    if (element) {
      const item = collectibles[i];
      element.style.transform =
        "translate3d(" +
        to_px(600 - item.width / 2 + item.x) +
        "," +
        to_px(400 - item.height / 2 + item.y) +
        "," +
        to_px(item.z) +
        ") rotateX(" +
        item.rotationX +
        "deg) rotateY(" +
        (item.rotationY + collectibleRotation) +
        "deg) rotateZ(" +
        item.rotationZ +
        "deg)";
    }
  }
}

function checkCollectibleCollision(collectibles, elementPrefix) {
  for (let i = 0; i < collectibles.length; i++) {
    let distanceSquared =
      (collectibles[i].x - player.x) ** 2 + (collectibles[i].y - player.y) ** 2 + (collectibles[i].z - player.z) ** 2;
    let collisionRadiusSquared = collectibles[i].width ** 2;

    if (distanceSquared < collisionRadiusSquared) {
      document.getElementById(elementPrefix + i).style.display = "none";
      collectibles[i].x = 999999;

      // Increment collected count
      collectedCount++;
      updateCollectiblesDisplay();

      // Play pickup sound if it exists
      if (collectibles[i].sound) {
        const pickupSound = new Audio(collectibles[i].sound);
        pickupSound.play();
      }

      // Show pickup notification
      showPickupNotification("You've picked an item!");
    }
  }
}

function checkHoleCollision() {
  // Holes can only be used after all required collectibles are picked up.
  if (collectedCount < totalCollectibles) {
    return;
  }

  for (let i = 0; i < activeHoles.length; i++) {
    const hole = activeHoles[i];
    const dx = hole.x - player.x;
    const dz = hole.z - player.z;
    const distanceSquared = dx * dx + dz * dz;
    const triggerRadius = Math.max(hole.width, hole.height) * 0.5 + PLAYER_RADIUS;

    if (distanceSquared < triggerRadius * triggerRadius) {
      goToNextLevel();
      return;
    }
  }
}

function resetPlayerState() {
  player.x = 0;
  player.y = 0;
  player.z = 0;
  player.rotationX = 0;
  player.rotationY = 0;

  verticalVelocity = 0;
  isGrounded = true;
  pressLeft = 0;
  pressRight = 0;
  pressForward = 0;
  pressBack = 0;
  pressJump = false;
  pressSprint = 1;
  collectibleRotation = 0;
}

function goToNextLevel() {
  winSound.play();

  // Add current level time to total
  totalGameTime += gameTimer;
  levelsCompleted++;

  // Check if all levels are completed
  if (levelsCompleted >= LEVELS_TO_WIN) {
    showFinalWinScreen();
    return;
  }

  // Keep pointer lock active between level transitions.
  canLockMouse = true;

  resetPlayerState();
  world.innerHTML = "";
  createNewWorld();
}

function repeatForever() {
  if (!isGameActive) return;

  update();
  checkCollectibleCollision(activeCrystals, "crystal");
  checkCollectibleCollision(activeKeys, "key");
  checkHoleCollision();
  updateTimer();
}

function updateTimer() {
  gameTimer = Date.now() - gameStartTime;
  const seconds = Math.floor(gameTimer / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  timerDisplay.textContent = minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
}

function updateCollectiblesDisplay() {
  const remaining = totalCollectibles - collectedCount;
  collectiblesRemainingSpan.textContent = remaining;
}

function showWinScreen() {
  isGameActive = false;
  canLockMouse = false;

  // Unlock mouse
  if (document.pointerLockElement) {
    document.exitPointerLock();
  }

  // Hide GUI and show win screen
  gameGUI.style.display = "none";
  winScreen.style.display = "block";

  // Display completion time
  const seconds = Math.floor(gameTimer / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  completionTimeDisplay.textContent = "Time: " + minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
}

function showFinalWinScreen() {
  isGameActive = false;
  canLockMouse = false;

  // Unlock mouse
  if (document.pointerLockElement) {
    document.exitPointerLock();
  }

  // Hide GUI and win screens, show final win screen
  gameGUI.style.display = "none";
  winScreen.style.display = "none";
  finalWinScreen.style.display = "block";

  // Display total completion time (hours:minutes:seconds)
  const totalSeconds = Math.floor(totalGameTime / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  const timeFormat =
    hours > 0
      ? `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
      : `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;

  totalCompletionTimeDisplay.textContent = timeFormat;
}
