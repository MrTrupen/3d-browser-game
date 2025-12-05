//Variables for movement
var press_left = 0;
var press_right = 0;
var press_forward = 0;
var press_back = 0;
var press_up = 0;
var press_sprint = 1;

// Variables for mouse
let mouse_x = 0;
let mouse_y = 0;
let is_mouse_locked = false;
let can_lock_mouse = false;

// Rotation angle for collectibles
let collectible_rotation = 0;

// Variable for HTML objects
var world = document.getElementById("world");
var container = document.getElementById("container");

// Mouse locking
container.onclick = function () {
  if (can_lock_mouse) {
    if (!is_mouse_locked) {
      container.requestPointerLock();
    } else {
      document.exitPointerLock(); // Use document for exit
    }
  }
};

// Listen for pointer lock change
document.addEventListener("pointerlockchange", (event) => {
  // Update lock status based on pointerLockElement
  is_mouse_locked = document.pointerLockElement === container;
});

//if the key is pressed
document.addEventListener("keydown", (event) => {
  if (KEY_FORWARD.includes(event.key)) {
    press_forward = 1;
  }
  if (KEY_BACK.includes(event.key)) {
    press_back = 1;
  }
  if (KEY_RIGHT.includes(event.key)) {
    press_right = 1;
  }
  if (KEY_LEFT.includes(event.key)) {
    press_left = 1;
  }
  if (KEY_JUMP.includes(event.key)) {
    press_up = 1;
  }
  if (KEY_SPRINT.includes(event.key)) {
    press_sprint = SPRINT_SPEED;
  }
});

// if the key is released
document.addEventListener("keyup", (event) => {
  if (KEY_FORWARD.includes(event.key)) {
    press_forward = 0;
  }
  if (KEY_BACK.includes(event.key)) {
    press_back = 0;
  }
  if (KEY_RIGHT.includes(event.key)) {
    press_right = 0;
  }
  if (KEY_LEFT.includes(event.key)) {
    press_left = 0;
  }
  if (KEY_JUMP.includes(event.key)) {
    press_up = -GRAVITY;
  }
  if (KEY_SPRINT.includes(event.key)) {
    press_sprint = 1;
  }
});

// Mouse movement listener
document.addEventListener("mousemove", (event) => {
  mouse_x = event.movementX * MOUSE_SPEED;
  mouse_y = event.movementY * MOUSE_SPEED;
});

var pawn = new player(0, 0, 0, 0, 0);

function update() {
  //count movement
  let difference_x =
    Math.cos(pawn.rotation_y * DEG) * ((press_right - press_left) * MOVE_SPEED * press_sprint) -
    Math.sin(pawn.rotation_y * DEG) * ((press_forward - press_back) * MOVE_SPEED * press_sprint);
  let difference_z = -(
    Math.sin(pawn.rotation_y * DEG) * ((press_right - press_left) * MOVE_SPEED * press_sprint) +
    Math.cos(pawn.rotation_y * DEG) * ((press_forward - press_back) * MOVE_SPEED * press_sprint)
  );
  let difference_y = -press_up * JUMP_SPEED;
  let difference_rotation_x = mouse_y;
  let difference_rotation_y = -mouse_x;

  //add movement to the coordinates
  pawn.x = pawn.x + difference_x;
  pawn.y = Math.min(0, pawn.y + difference_y);
  pawn.z = pawn.z + difference_z;

  // rotate only when mouse is locked
  if (is_mouse_locked) {
    pawn.rotation_x = pawn.rotation_x + difference_rotation_x;
    pawn.rotation_y = pawn.rotation_y + difference_rotation_y;
  }

  //change coordinates of the world
  world.style.transform =
    "translateZ(600px)" +
    "rotateX(" +
    -pawn.rotation_x +
    "deg) rotateY(" +
    -pawn.rotation_y +
    "deg) translate3d(" +
    to_px(-pawn.x) +
    "," +
    to_px(-pawn.y) +
    "," +
    to_px(-pawn.z) +
    ")";

  // Update rotation for collectibles
  collectible_rotation = (collectible_rotation + 2) % 360;
  rotate_collectibles();

  mouse_x = 0;
  mouse_y = 0;
}

function create_new_world() {
  create_squares(boundries, "bondries");
  create_squares(generate_maze(10, 200), "walls");
  create_squares(coins, "coin");
  create_squares(keys, "key");
}

function create_squares(squares, object_type) {
  for (let object_idx = 0; object_idx < squares.length; object_idx++) {
    //create rectangles and styles
    let newElement = document.createElement("div");
    newElement.className = object_type + " square";
    newElement.id = object_type + object_idx;
    newElement.style.width = to_px(squares[object_idx].width);
    newElement.style.height = to_px(squares[object_idx].height);

    // Apply textures based on surface type
    newElement.style.backgroundImage = squares[object_idx].pattern_path;

    newElement.style.transform =
      "translate3d(" +
      to_px(600 - squares[object_idx].width / 2 + squares[object_idx].x) +
      "," +
      to_px(400 - squares[object_idx].height / 2 + squares[object_idx].y) +
      "," +
      to_px(squares[object_idx].z) +
      ") rotateX(" +
      squares[object_idx].rotation_x +
      "deg) rotateY(" +
      squares[object_idx].rotation_y +
      "deg) rotateZ(" +
      squares[object_idx].rotation_z +
      "deg)";

    //insert rectangles into the world
    world.append(newElement);
  }
}

function rotate_collectibles() {
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
        coins[i].rotation_x +
        "deg) rotateY(" +
        (coins[i].rotation_y + collectible_rotation) +
        "deg) rotateZ(" +
        coins[i].rotation_z +
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
        keys[i].rotation_x +
        "deg) rotateY(" +
        (keys[i].rotation_y + collectible_rotation) +
        "deg) rotateZ(" +
        keys[i].rotation_z +
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

function repeat_forever() {
  update();
  iteration(coins, "coin");
  iteration(keys, "key");
}
