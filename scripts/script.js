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

const pawn = new Player(0, 0, 0, 0, 0);

function update() {
  // Count movement
  let differenceX =
    Math.cos(pawn.rotationY * DEG) * ((pressRight - pressLeft) * MOVE_SPEED * pressSprint) -
    Math.sin(pawn.rotationY * DEG) * ((pressForward - pressBack) * MOVE_SPEED * pressSprint);
  let differenceZ = -(
    Math.sin(pawn.rotationY * DEG) * ((pressRight - pressLeft) * MOVE_SPEED * pressSprint) +
    Math.cos(pawn.rotationY * DEG) * ((pressForward - pressBack) * MOVE_SPEED * pressSprint)
  );
  let differenceY = -pressUp * JUMP_SPEED;
  let differenceRotationX = mouseY;
  let differenceRotationY = -mouseX;

  // Add movement to the coordinates
  pawn.x = pawn.x + differenceX;
  pawn.y = Math.min(0, pawn.y + differenceY);
  pawn.z = pawn.z + differenceZ;

  // Rotate only when mouse is locked
  if (isMouseLocked) {
    pawn.rotationX = pawn.rotationX + differenceRotationX;
    pawn.rotationY = pawn.rotationY + differenceRotationY;
  }

  // Change coordinates of the world
  world.style.transform =
    "translateZ(600px)" +
    "rotateX(" +
    -pawn.rotationX +
    "deg) rotateY(" +
    -pawn.rotationY +
    "deg) translate3d(" +
    to_px(-pawn.x) +
    "," +
    to_px(-pawn.y) +
    "," +
    to_px(-pawn.z) +
    ")";

  // Update rotation for collectibles
  collectibleRotation = (collectibleRotation + 2) % 360;
  rotateCollectibles();

  mouseX = 0;
  mouseY = 0;
}

function createNewWorld() {
  createSquares(boundries, "bondries");
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

function iteration(squares, string) {
  for (let i = 0; i < squares.length; i++) {
    let r = (squares[i].x - pawn.x) ** 2 + (squares[i].y - pawn.y) ** 2 + (squares[i].z - pawn.z) ** 2;
    let r1 = squares[i].width ** 2;

    if (r < r1) {
      document.getElementById(string + i).style.display = "none";
      squares[i].x = 999999;
    }
  }
}

function repeatForever() {
  update();
  iteration(coins, "coin");
  iteration(keys, "key");
}
