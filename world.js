// Rectangle Array
var map = [
  [0, 0, -1000, 0, 0, 0, 2000, 200, "url('Patterns/hedge.jpg')"], // front walls
  [0, 0, 1000, 0, 0, 0, 2000, 200, "url('Patterns/hedge.jpg')"], // back wall
  [1000, 0, 0, 0, 90, 0, 2000, 200, "url('Patterns/hedge.jpg')"], // right wall
  [-1000, 0, 0, 0, -90, 0, 2000, 200, "url('Patterns/hedge.jpg')"], // left wall
  [0, 100, 0, 90, 0, 0, 2000, 2000, "url('Patterns/tiles.jpg')"], // ground
  [0, 0, -1000, 0, 0, 0, 83, 180, "url('Patterns/door.png')"], // door

  // Test cube
  [0, 0, -100, 0, 0, 0, 200, 200, "url('Patterns/hedge.jpg')"], // front walls
  [0, 0, 100, 0, 0, 0, 200, 200, "url('Patterns/hedge.jpg')"], // back wall
  [100, 0, 0, 0, 90, 0, 200, 200, "url('Patterns/hedge.jpg')"], // right wall
  [-100, 0, 0, 0, -90, 0, 200, 200, "url('Patterns/hedge.jpg')"], // left wall
  [0, 100, 0, 90, 0, 0, 200, 200, "url('Patterns/hedge.jpg')"], // top wall
  [0, -100, 0, 90, 0, 0, 200, 200, "url('Patterns/hedge.jpg')"], // bottom wall
];
