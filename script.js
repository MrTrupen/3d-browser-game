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

// Variable for HTML objects
var world = document.getElementById("world");
var container = document.getElementById("container");

// Mouse locking
container.onclick = function () {
  if (!is_mouse_locked) {
    container.requestPointerLock();
  } else {
    document.exitPointerLock(); // Use document for exit
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
  let dx =
    Math.cos(pawn.rotation_y * DEG) * ((press_right - press_left) * MOVE_SPEED * press_sprint) -
    Math.sin(pawn.rotation_y * DEG) * ((press_forward - press_back) * MOVE_SPEED * press_sprint);
  let dz = -(
    Math.sin(pawn.rotation_y * DEG) * ((press_right - press_left) * MOVE_SPEED * press_sprint) +
    Math.cos(pawn.rotation_y * DEG) * ((press_forward - press_back) * MOVE_SPEED * press_sprint)
  );
  let dy = -press_up * JUMP_SPEED;
  let drx = mouse_y;
  let dry = -mouse_x;

  //add movement to the coordinates
  pawn.x = pawn.x + dx;
  pawn.y = Math.min(0, pawn.y + dy);
  pawn.z = pawn.z + dz;

  if (is_mouse_locked) {
    pawn.rotation_x = pawn.rotation_x + drx;
    pawn.rotation_y = pawn.rotation_y + dry;
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

  mouse_x = 0;
  mouse_y = 0;
}

function create_new_world() {
  for (let i = 0; i < map.length; i++) {
    //create rectangles and styles
    let newElement = document.createElement("div");
    newElement.className = "square";
    newElement.id = "square" + i;
    newElement.style.width = to_px(map[i].width);
    newElement.style.height = to_px(map[i].height);

    // Apply textures based on surface type
    newElement.style.backgroundImage = map[i].pattern_path;

    newElement.style.transform =
      "translate3d(" +
      to_px(600 - map[i].width / 2 + map[i].x) +
      "," +
      to_px(400 - map[i].height / 2 + map[i].y) +
      "," +
      to_px(map[i].z) +
      ") rotateX(" +
      map[i].rotation_x +
      "deg) rotateY(" +
      map[i].rotation_y +
      "deg) rotateZ(" +
      map[i].rotation_z +
      "deg)";

    //insert rectangles into the world
    world.append(newElement);
  }
}

// Generate the world
create_new_world();

TimerGame = setInterval(update, UPDATE_INTERVAL);
