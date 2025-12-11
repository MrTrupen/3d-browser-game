// Variables for navigation
let mainMenu = document.getElementById("main-menu");
let instructionsMenu = document.getElementById("instructions-menu");
let rulesMenu = document.getElementById("rules-menu");
let startGameBtn = document.getElementById("start-game-btn");
let instructionsBtn = document.getElementById("instructions-btn");
let rulesBtn = document.getElementById("rules-btn");
let backBtns = document.querySelectorAll(".back-btn");

// Audio
const clickSound = new Audio("sounds/gui_click.wav");

// Start game button - hides menus and initializes game
startGameBtn.onclick = function () {
  clickSound.play();
  mainMenu.style.display = "none";
  instructionsMenu.style.display = "none";
  rulesMenu.style.display = "none";

  canLockMouse = true;
  createNewWorld();
  TimerGame = setInterval(repeatForever, UPDATE_INTERVAL);
};

// Instructions button - shows instructions menu
instructionsBtn.onclick = function () {
  clickSound.play();
  mainMenu.style.display = "none";
  instructionsMenu.style.display = "block";
  rulesMenu.style.display = "none";
};

// Back buttons - returns to main menu from any submenu
backBtns.forEach(function (btn) {
  btn.onclick = function () {
    clickSound.play();
    mainMenu.style.display = "block";
    instructionsMenu.style.display = "none";
    rulesMenu.style.display = "none";
  };
});

// Rules button - shows rules menu
rulesBtn.onclick = function () {
  clickSound.play();
  mainMenu.style.display = "none";
  instructionsMenu.style.display = "none";
  rulesMenu.style.display = "block";
};
