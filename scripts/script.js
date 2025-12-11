// Variables for movement
let pressLeft = 0;
let pressRight = 0;
let pressForward = 0;
let pressBack = 0;
let pressUp = 0;
let pressSprint = 1;

// Variables for mouse
let mouseX = 0;
let mouseY = 0;
let isMouseLocked = false;
let canLockMouse = false;

// Rotation angle for collectibles
let collectibleRotation = 0;

// Variable for HTML objects
const world = document.getElementById("world");
const container = document.getElementById("container");

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
  if (KEY_FORWARD.includes(event.key)) {
    pressForward = 1;
  }
  if (KEY_BACK.includes(event.key)) {
    pressBack = 1;
  }
  if (KEY_RIGHT.includes(event.key)) {
    pressRight = 1;
  }
  if (KEY_LEFT.includes(event.key)) {
    pressLeft = 1;
  }
  if (KEY_JUMP.includes(event.key)) {
    pressUp = 1;
  }
  if (KEY_SPRINT.includes(event.key)) {
    pressSprint = SPRINT_SPEED;
  }
});

// If the key is released
document.addEventListener("keyup", (event) => {
  if (KEY_FORWARD.includes(event.key)) {
    pressForward = 0;
  }
  if (KEY_BACK.includes(event.key)) {
    pressBack = 0;
  }
  if (KEY_RIGHT.includes(event.key)) {
    pressRight = 0;
  }
  if (KEY_LEFT.includes(event.key)) {
    pressLeft = 0;
  }
  if (KEY_JUMP.includes(event.key)) {
    pressUp = -GRAVITY;
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
  let differenceY = -pressUp * JUMP_SPEED;
  let differenceRotationX = mouseY;
  let differenceRotationY = -mouseX;

  // Add movement to the coordinates
  player.x = player.x + differenceX;
  player.y = Math.min(0, player.y + differenceY);
  player.z = player.z + differenceZ;

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
  createSquares(boundaries, "boundaries");
  createSquares(generateMaze(10, 200), "walls");
  createSquares(coins, "coin");
  createSquares(keys, "key");
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

function rotateCollectibles() {
  // Rotate all coins
  for (let i = 0; i < coins.length; i++) {
    let coinElement = document.getElementById("coin" + i);
    if (coinElement) {
      coinElement.style.transform =
        "translate3d(" +
        to_px(600 - coins[i].width / 2 + coins[i].x) +
        "," +
        to_px(400 - coins[i].height / 2 + coins[i].y) +
        "," +
        to_px(coins[i].z) +
        ") rotateX(" +
        coins[i].rotationX +
        "deg) rotateY(" +
        (coins[i].rotationY + collectibleRotation) +
        "deg) rotateZ(" +
        coins[i].rotationZ +
        "deg)";
    }
  }

  // Rotate all keys
  for (let i = 0; i < keys.length; i++) {
    let keyElement = document.getElementById("key" + i);
    if (keyElement) {
      keyElement.style.transform =
        "translate3d(" +
        to_px(600 - keys[i].width / 2 + keys[i].x) +
        "," +
        to_px(400 - keys[i].height / 2 + keys[i].y) +
        "," +
        to_px(keys[i].z) +
        ") rotateX(" +
        keys[i].rotationX +
        "deg) rotateY(" +
        (keys[i].rotationY + collectibleRotation) +
        "deg) rotateZ(" +
        keys[i].rotationZ +
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

      // Play pickup sound if it exists
      if (collectibles[i].sound) {
        const pickupSound = new Audio(collectibles[i].sound);
        pickupSound.play();
      }
    }
  }
}

function repeatForever() {
  update();
  checkCollectibleCollision(coins, "coin");
  checkCollectibleCollision(keys, "key");
}
