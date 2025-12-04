// Rectangle Array
var map = [
  new rectangle(0, 0, -1000, 0, 0, 0, 2000, 200, "url('Patterns/hedge.jpg')"), // front walls
  new rectangle(0, 0, 1000, 0, 0, 0, 2000, 200, "url('Patterns/hedge.jpg')"), // back wall
  new rectangle(1000, 0, 0, 0, 90, 0, 2000, 200, "url('Patterns/hedge.jpg')"), // right wall
  new rectangle(-1000, 0, 0, 0, -90, 0, 2000, 200, "url('Patterns/hedge.jpg')"), // left wall
  new rectangle(0, 100, 0, 90, 0, 0, 2000, 2000, "url('Patterns/tiles.jpg')"), // ground
  new rectangle(0, 0, -1000, 0, 0, 0, 83, 180, "url('Patterns/door.png')"), // door

  // Test cube
  new rectangle(0, 0, -100, 0, 0, 0, 200, 200, "url('Patterns/hedge.jpg')"), // front walls
  new rectangle(0, 0, 100, 0, 0, 0, 200, 200, "url('Patterns/hedge.jpg')"), // back wall
  new rectangle(100, 0, 0, 0, 90, 0, 200, 200, "url('Patterns/hedge.jpg')"), // right wall
  new rectangle(-100, 0, 0, 0, -90, 0, 200, 200, "url('Patterns/hedge.jpg')"), // left wall
  new rectangle(0, 100, 0, 90, 0, 0, 200, 200, "url('Patterns/hedge.jpg')"), // top wall
  new rectangle(0, -100, 0, 90, 0, 0, 200, 200, "url('Patterns/hedge.jpg')"), // bottom wall
];
