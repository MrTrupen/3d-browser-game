//variables for navigation
let menu1 = document.getElementById("menu1");
let menu2 = document.getElementById("menu2");
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");

// Audio
const click_sound = new Audio("sounds/gui_click.wav");

// create navigation
button1.onclick = function () {
  click_sound.play();
  menu1.style.display = "none";
  menu2.style.display = "none";

  can_lock_mouse = true;
  create_new_world();
  TimerGame = setInterval(update, UPDATE_INTERVAL);
};

// create navigation
button2.onclick = function () {
  click_sound.play();
  menu1.style.display = "none";
  menu2.style.display = "block";
};

// create navigation
button3.onclick = function () {
  click_sound.play();
  menu1.style.display = "block";
  menu2.style.display = "none";
};
