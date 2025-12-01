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
  if (event.key == "w") {
    PressForward = 1;
  }
  if (event.key == "s") {
    PressBack = 1;
  }
  if (event.key == "d") {
    PressRight = 1;
  }
  if (event.key == "a") {
    PressLeft = 1;
  }
  if (event.keyCode == "32") {
    PressUp = 1;
  }
});

// if the key is released
document.addEventListener("keyup", (event) => {
  if (event.key == "w") {
    PressForward = 0;
  }
  if (event.key == "s") {
    PressBack = 0;
  }
  if (event.key == "d") {
    PressRight = 0;
  }
  if (event.key == "a") {
    PressLeft = 0;
  }
  if (event.keyCode == "32") {
    PressUp = 0;
  }
});

var pawn = new player(0, 0, 0, 0, 0);
var world = document.getElementById("world");

function update() {
  //count movement
  dx = PressLeft - PressRight;
  dy = PressForward - PressBack;
  dz = PressUp;

  //add movement to the coordinates
  pawn.x = pawn.x + dx;
  pawn.z = pawn.y + dy;
  pawn.y = pawn.z + dz;

  //change coordinates of the world
  world.style.transform =
    "translate3d(" + -pawn.x + "px," + -pawn.y + "px," + -pawn.z + "px)";
}

TimerGame = setInterval(update, 10);
