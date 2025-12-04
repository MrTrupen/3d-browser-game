class player {
  constructor(x, y, z, rotation_x, rotation_y) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.rotation_x = rotation_x;
    this.rotation_y = rotation_y;
  }
}

class rectangle {
  constructor(x, y, z, rotation_x, rotation_y, rotation_z, width, height, pattern_path) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.rotation_x = rotation_x;
    this.rotation_y = rotation_y;
    this.rotation_z = rotation_z;
    this.width = width;
    this.height = height;
    this.pattern_path = pattern_path;
  }
}
