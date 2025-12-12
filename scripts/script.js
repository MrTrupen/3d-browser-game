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

// Variables for mouse
let mouseX = 0;
let mouseY = 0;
let isMouseLocked = false;
let canLockMouse = false;

// Rotation angle for collectibles
let collectibleRotation = 0;

// Game state variables
let totalCollectibles = 0;
let collectedCount = 0;
let gameStartTime = 0;
let gameTimer = 0;
let isGameActive = false;

// Variable for HTML objects
const world = document.getElementById("world");
const container = document.getElementById("container");
const gameGUI = document.getElementById("game-gui");
const collectiblesRemainingSpan = document.getElementById("collectibles-remaining");
const timerDisplay = document.getElementById("timer-display");
const winScreen = document.getElementById("win-screen");
const completionTimeDisplay = document.getElementById("completion-time");

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

  // Combine all cubes for collision detection
  const allWalls = [...boundaries, ...level1];

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
  createCubes(boundaries, "boundaries");
  createSquares(groundAndCelling, "groundCelling");
  // createCubes(generateMazeCubes(10, 200), "walls");
  createCubes(level1, "walls");
  createSquares(crystals, "crystal");
  createSquares(keys, "key");

  // Initialize game state
  totalCollectibles = crystals.length + keys.length;
  collectedCount = 0;
  gameStartTime = Date.now();
  gameTimer = 0;
  isGameActive = true;

  // Show GUI and update displays
  gameGUI.style.display = "block";
  updateCollectiblesDisplay();
  timerDisplay.textContent = "0:00";
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
  rotateCollectibleArray(crystals, "crystal");
  rotateCollectibleArray(keys, "key");
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

      // Check win condition
      if (collectedCount >= totalCollectibles) {
        winSound.play();
        showWinScreen();
      }
    }
  }
}

function repeatForever() {
  if (!isGameActive) return;

  update();
  checkCollectibleCollision(crystals, "crystal");
  checkCollectibleCollision(keys, "key");
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
