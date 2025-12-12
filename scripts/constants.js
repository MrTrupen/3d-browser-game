// Movement constants
const MOVE_SPEED = 5; // units per update for horizontal movement
const JUMP_SPEED = 10; // units per update for upward movement
const SPRINT_SPEED = 2; // units per update for sprint multiplier
const UPDATE_INTERVAL = 10; // ms between game updates
const GRAVITY = 1;
const MOUSE_SPEED = 0.4;
const PLAYER_RADIUS = 30; // collision radius for the player
const PLAYER_HEIGHT = 80; // player height for collision detection

// Key binding constants
const KEY_FORWARD = ["w", "ArrowUp"];
const KEY_BACK = ["s", "ArrowDown"];
const KEY_LEFT = ["a", "ArrowLeft"];
const KEY_RIGHT = ["d", "ArrowRight"];
const KEY_JUMP = [" "]; // spacebar
const KEY_SPRINT = ["Shift"]; // shift key

// Math
const DEG = Math.PI / 180;
