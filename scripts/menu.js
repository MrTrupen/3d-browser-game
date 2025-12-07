// Variables for navigation
let mainMenu = document.getElementById("main-menu");
let instructionsMenu = document.getElementById("instructions-menu");
let rulesMenu = document.getElementById("rules-menu");
let startGameBtn = document.getElementById("start-game-btn");
let instructionsBtn = document.getElementById("instructions-btn");
let backBtn = document.getElementById("back-btn");
let rulesBtn = document.getElementById("rules-btn");

// Audio
const click_sound = new Audio("sounds/gui_click.wav");

// Start game button - hides menus and initializes game
startGameBtn.onclick = function () {
  click_sound.play();
  mainMenu.style.display = "none";
  instructionsMenu.style.display = "none";
  rulesMenu.style.display = "none";

  can_lock_mouse = true;
  create_new_world();
  TimerGame = setInterval(repeat_forever, UPDATE_INTERVAL);
};

// Instructions button - shows instructions menu
instructionsBtn.onclick = function () {
  click_sound.play();
  mainMenu.style.display = "none";
  instructionsMenu.style.display = "block";
  rulesMenu.style.display = "none";
};

// Back button - returns to main menu from any submenu
backBtn.onclick = function () {
  click_sound.play();
  mainMenu.style.display = "block";
  instructionsMenu.style.display = "none";
  rulesMenu.style.display = "none";
};

// Rules button - shows rules menu
rulesBtn.onclick = function () {
  click_sound.play();
  mainMenu.style.display = "none";
  instructionsMenu.style.display = "none";
  rulesMenu.style.display = "block";
};
