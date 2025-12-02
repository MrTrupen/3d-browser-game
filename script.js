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

var pawn = new player(0, 0, 0, 0, 0);
var world = document.getElementById("world");

function update() {
  //count movement
  let dx = (PressRight - PressLeft) * MOVE_SPEED;
  let dz = -(PressForward - PressBack) * MOVE_SPEED;
  let dy = -PressUp * JUMP_SPEED;

  //add movement to the coordinates
  pawn.x = pawn.x + dx;
  pawn.y = pawn.y + dy;
  pawn.z = pawn.z + dz;

  //change coordinates of the world
  world.style.transform =
    "translate3d(" + -pawn.x + "px," + -pawn.y + "px," + -pawn.z + "px)";
}

TimerGame = setInterval(update, UPDATE_INTERVAL);
