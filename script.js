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
  if (event.key == "32") {
    PressUp = 1;
  }
});
