//variables for navigation
let menu1 = document.getElementById("menu1");
let menu2 = document.getElementById("menu2");
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");

// create navigation
button2.onclick = function () {
  menu1.style.display = "none";
  menu2.style.display = "block";
};

// create navigation
button3.onclick = function () {
  menu1.style.display = "block";
  menu2.style.display = "none";
};
