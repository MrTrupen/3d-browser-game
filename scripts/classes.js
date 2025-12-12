class Player {
  constructor(x, y, z, rotationX, rotationY) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.rotationX = rotationX;
    this.rotationY = rotationY;
  }
}

class Rectangle {
  constructor(x, y, z, rotationX, rotationY, rotationZ, width, height, patternPath, sound = null) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.rotationX = rotationX;
    this.rotationY = rotationY;
    this.rotationZ = rotationZ;
    this.width = width;
    this.height = height;
    this.patternPath = patternPath;
    this.sound = sound;
  }
}
