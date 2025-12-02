function player(x, y, z, rx, ry) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.rx = rx;
  this.ry = ry;
}

//Variables for movement
var PressLeft = 0;
var PressRight = 0;
var PressForward = 0;
var PressBack = 0;
var PressUp = 0;

// Variables for mouse
let MouseX = 0;
let MouseY = 0;

//if the key is pressed
document.addEventListener("keydown", (event) => {
  if (KEY_FORWARD.includes(event.key)) {
    PressForward = 1;
  }
  if (KEY_BACK.includes(event.key)) {
    PressBack = 1;
  }
  if (KEY_RIGHT.includes(event.key)) {
    PressRight = 1;
  }
  if (KEY_LEFT.includes(event.key)) {
    PressLeft = 1;
  }
  if (KEY_JUMP.includes(event.key)) {
    PressUp = 1;
  }
});

// if the key is released
document.addEventListener("keyup", (event) => {
  if (KEY_FORWARD.includes(event.key)) {
    PressForward = 0;
  }
  if (KEY_BACK.includes(event.key)) {
    PressBack = 0;
  }
  if (KEY_RIGHT.includes(event.key)) {
    PressRight = 0;
  }
  if (KEY_LEFT.includes(event.key)) {
    PressLeft = 0;
  }
  if (KEY_JUMP.includes(event.key)) {
    PressUp = 0;
  }
});

// Mouse movement listener
document.addEventListener("mousemove", (event) => {
  MouseX = event.movementX;
  MouseY = event.movementY;
});

var pawn = new player(0, 0, 0, 0, 0);
var world = document.getElementById("world");

function update() {
  //count movement
  let dx =
    Math.cos(pawn.ry * DEG) * ((PressRight - PressLeft) * MOVE_SPEED) -
    Math.sin(pawn.ry * DEG) * ((PressForward - PressBack) * MOVE_SPEED);
  let dz = -(
    Math.sin(pawn.ry * DEG) * ((PressRight - PressLeft) * MOVE_SPEED) +
    Math.cos(pawn.ry * DEG) * ((PressForward - PressBack) * MOVE_SPEED)
  );
  let dy = -PressUp * JUMP_SPEED;
  let drx = MouseY;
  let dry = -MouseX;

  //add movement to the coordinates
  pawn.x = pawn.x + dx;
  pawn.y = pawn.y + dy;
  pawn.z = pawn.z + dz;
  pawn.rx = pawn.rx + drx;
  pawn.ry = pawn.ry + dry;

  //change coordinates of the world
  world.style.transform =
    "translateZ(600px)" +
    "rotateX(" +
    -pawn.rx +
    "deg) rotateY(" +
    -pawn.ry +
    "deg) translate3d(" +
    -pawn.x +
    "px," +
    -pawn.y +
    "px," +
    -pawn.z +
    "px)";

  MouseX = 0;
  MouseY = 0;
}

TimerGame = setInterval(update, UPDATE_INTERVAL);
