let spawn_cube = [
  // Test cube
  new Rectangle(0, 0, -100, 0, 0, 0, 200, 200, "url('sprites/hedge.jpg')"), // front walls
  new Rectangle(0, 0, 100, 0, 0, 0, 200, 200, "url('sprites/hedge.jpg')"), // back wall
  new Rectangle(100, 0, 0, 0, 90, 0, 200, 200, "url('sprites/hedge.jpg')"), // right wall
  new Rectangle(-100, 0, 0, 0, -90, 0, 200, 200, "url('sprites/hedge.jpg')"), // left wall
  new Rectangle(0, 100, 0, 90, 0, 0, 200, 200, "url('sprites/hedge.jpg')"), // top wall
  new Rectangle(0, -100, 0, 90, 0, 0, 200, 200, "url('sprites/hedge.jpg')"), // bottom wall
];

let boundaries = [
  new Rectangle(0, 0, -1000, 0, 0, 0, 2000, 200, "url('sprites/wall.png')"), // front walls
  new Rectangle(0, 0, 1000, 0, 0, 0, 2000, 200, "url('sprites/wall.png')"), // back wall
  new Rectangle(1000, 0, 0, 0, 90, 0, 2000, 200, "url('sprites/wall.png')"), // right wall
  new Rectangle(-1000, 0, 0, 0, -90, 0, 2000, 200, "url('sprites/wall.png')"), // left wall
  new Rectangle(0, 100, 0, 90, 0, 0, 2000, 2000, "url('sprites/ground.png')"), // ground
];

let crystals = [
  new Rectangle(300, 30, -500, 0, 0, 0, 50, 50, "url('sprites/crystal.png')", "sounds/coin_pickup.wav"), // crystal
  new Rectangle(-300, 30, 800, 0, 0, 0, 50, 50, "url('sprites/crystal.png')", "sounds/coin_pickup.wav"), // crystal
  new Rectangle(-100, 30, -200, 0, 0, 0, 50, 50, "url('sprites/crystal.png')", "sounds/coin_pickup.wav"), // crystal
  new Rectangle(300, 30, -500, 0, 0, 0, 50, 50, "url('sprites/crystal.png')", "sounds/coin_pickup.wav"), // crystal
];

let keys = [
  new Rectangle(900, 30, 900, 0, 0, 0, 50, 50, "url('sprites/key.png')", "sounds/coin_pickup.wav"), // key
];
