let boundaries = [
  new Cube(0, 0, -1000, 0, 0, 0, 2000, 200, 20, "url('sprites/border_wall.png')"), // front wall
  new Cube(0, 0, 1000, 0, 0, 0, 2000, 200, 20, "url('sprites/border_wall.png')"), // back wall
  new Cube(1000, 0, 0, 0, 0, 0, 20, 200, 2000, "url('sprites/border_wall.png')"), // right wall
  new Cube(-1000, 0, 0, 0, 0, 0, 20, 200, 2000, "url('sprites/border_wall.png')"), // left wall
];

let groundAndCelling = [
  new Rectangle(0, 100, 0, 90, 0, 0, 2000, 2000, "url('sprites/ground.png')"), // ground
  new Rectangle(0, -100, 0, 90, 0, 0, 2000, 2000, "url('sprites/ceiling_tile.png')"), // ceiling
];

let crystalsByLevel = [
  [
    new Rectangle(0, 30, -100, 0, 0, 0, 50, 50, "url('sprites/crystal.png')", "sounds/coin_pickup.wav"), // crystal
    // new Rectangle(300, 30, -500, 0, 0, 0, 50, 50, "url('sprites/crystal.png')", "sounds/coin_pickup.wav"), // crystal
    // new Rectangle(-300, 30, 800, 0, 0, 0, 50, 50, "url('sprites/crystal.png')", "sounds/coin_pickup.wav"), // crystal
    // new Rectangle(-100, 30, -200, 0, 0, 0, 50, 50, "url('sprites/crystal.png')", "sounds/coin_pickup.wav"), // crystal
  ],
  [
    new Rectangle(-120, 30, -550, 0, 0, 0, 50, 50, "url('sprites/crystal.png')", "sounds/coin_pickup.wav"),
    // new Rectangle(120, 30, -550, 0, 0, 0, 50, 50, "url('sprites/crystal.png')", "sounds/coin_pickup.wav"),
    // new Rectangle(0, 30, -350, 0, 0, 0, 50, 50, "url('sprites/crystal.png')", "sounds/coin_pickup.wav"),
  ],
  [
    new Rectangle(-500, 30, 0, 0, 0, 0, 50, 50, "url('sprites/crystal.png')", "sounds/coin_pickup.wav"),
    // new Rectangle(500, 30, -300, 0, 0, 0, 50, 50, "url('sprites/crystal.png')", "sounds/coin_pickup.wav"),
    // new Rectangle(-200, 30, 500, 0, 0, 0, 50, 50, "url('sprites/crystal.png')", "sounds/coin_pickup.wav"),
    // new Rectangle(400, 30, 300, 0, 0, 0, 50, 50, "url('sprites/crystal.png')", "sounds/coin_pickup.wav"),
    // new Rectangle(0, 30, 800, 0, 0, 0, 50, 50, "url('sprites/crystal.png')", "sounds/coin_pickup.wav"),
  ],
];

let keysByLevel = [
  [new Rectangle(900, 30, 900, 0, 0, 0, 50, 50, "url('sprites/key.png')", "sounds/coin_pickup.wav")], // key
  [new Rectangle(0, 30, -500, 0, 0, 0, 50, 50, "url('sprites/key.png')", "sounds/coin_pickup.wav")],
  [new Rectangle(-700, 30, 700, 0, 0, 0, 50, 50, "url('sprites/key.png')", "sounds/coin_pickup.wav")],
];

let holesByLevel = [
  [new Rectangle(0, 99, -100, 90, 0, 0, 56, 56, "url('sprites/hole.png')", "sounds/coin_pickup.wav")], // hole
  [new Rectangle(0, 99, -500, 90, 0, 0, 56, 56, "url('sprites/hole.png')", "sounds/coin_pickup.wav")],
  [new Rectangle(0, 99, 0, 90, 0, 0, 56, 56, "url('sprites/hole.png')", "sounds/coin_pickup.wav")],
];

let house_map = [
  new Cube(0, 0, -600, 0, 0, 0, 300, 200, 20, "url(sprites/wall.png)"), // back wall
  new Cube(100, 0, -400, 0, 0, 0, 100, 200, 20, "url(sprites/wall.png)"), // right entrance
  new Cube(-100, 0, -400, 0, 0, 0, 100, 200, 20, "url(sprites/wall.png)"), // left entrance
  new Cube(-150, 0, -500, 0, 0, 0, 20, 200, 220, "url(sprites/wall.png)"), // left wall
  new Cube(150, 0, -500, 0, 0, 0, 20, 200, 220, "url(sprites/wall.png)"), // right wall
];

let level1 = [
  new Cube(-700, 0, -800, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(-500, 0, -800, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(-200, 0, -900, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(0, 0, -900, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(200, 0, -900, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(600, 0, -900, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(-800, 0, -700, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(-700, 0, -600, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(-500, 0, -600, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(-200, 0, -700, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(0, 0, -700, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(200, 0, -700, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(500, 0, -600, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(800, 0, -700, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(-800, 0, -500, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(-700, 0, -400, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(-500, 0, -400, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(200, 0, -500, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(300, 0, -400, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(600, 0, -500, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(800, 0, -500, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(-600, 0, -300, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(-500, 0, -200, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(-300, 0, -200, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(0, 0, -300, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(200, 0, -300, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(800, 0, -300, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(900, 0, -200, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(-800, 0, -100, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(-600, 0, -100, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(-200, 0, -100, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(300, 0, 0, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(600, 0, -100, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(800, 0, -100, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(-900, 0, 200, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(-600, 0, 100, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(-100, 0, 200, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(200, 0, 100, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(400, 0, 100, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(600, 0, 100, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(700, 0, 200, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(-800, 0, 300, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(-600, 0, 300, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(-300, 0, 400, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(0, 0, 300, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(400, 0, 300, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(600, 0, 300, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(700, 0, 400, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(-800, 0, 500, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(-600, 0, 500, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(-500, 0, 600, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(200, 0, 500, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(800, 0, 500, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(-800, 0, 700, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(-600, 0, 700, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(-500, 0, 800, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(-200, 0, 700, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(0, 0, 700, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(200, 0, 700, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(400, 0, 700, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(700, 0, 800, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(900, 0, 800, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(0, 0, 900, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(400, 0, 900, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
];

let level2 = [
  // Outer perimeter markers
  new Cube(-800, 0, -800, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(800, 0, -800, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(-800, 0, 800, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(800, 0, 800, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),

  // Central cross pattern
  new Cube(0, 0, -600, 0, 0, 0, 400, 200, 20, "url(sprites/wall.png)"),
  new Cube(0, 0, 600, 0, 0, 0, 400, 200, 20, "url(sprites/wall.png)"),
  new Cube(-600, 0, 0, 0, 0, 0, 20, 200, 400, "url(sprites/wall.png)"),
  new Cube(600, 0, 0, 0, 0, 0, 20, 200, 400, "url(sprites/wall.png)"),

  // Inner maze chambers
  new Cube(-400, 0, -400, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(400, 0, -400, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(-400, 0, 400, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(400, 0, 400, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),

  // Additional corridors
  new Cube(-400, 0, 0, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(400, 0, 0, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(0, 0, -400, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(0, 0, 400, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),

  // Side walls for navigation challenge
  new Cube(-700, 0, -200, 0, 0, 0, 20, 200, 300, "url(sprites/wall.png)"),
  new Cube(700, 0, -200, 0, 0, 0, 20, 200, 300, "url(sprites/wall.png)"),
  new Cube(-700, 0, 200, 0, 0, 0, 20, 200, 300, "url(sprites/wall.png)"),
  new Cube(700, 0, 200, 0, 0, 0, 20, 200, 300, "url(sprites/wall.png)"),

  // Additional obstacles in quadrants
  new Cube(-300, 0, -600, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(300, 0, -600, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(-300, 0, 600, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),
  new Cube(300, 0, 600, 0, 0, 0, 20, 200, 200, "url(sprites/wall.png)"),

  new Cube(-600, 0, -300, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(-600, 0, 300, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(600, 0, -300, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
  new Cube(600, 0, 300, 0, 0, 0, 200, 200, 20, "url(sprites/wall.png)"),
];
