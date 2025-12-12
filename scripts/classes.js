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

class Cube {
  constructor(x, y, z, rotationX, rotationY, rotationZ, width, height, depth, patternPath) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.rotationX = rotationX;
    this.rotationY = rotationY;
    this.rotationZ = rotationZ;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.patternPath = patternPath;
  }

  getFaces() {
    const faces = [];
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;
    const halfDepth = this.depth / 2;

    // Front face
    faces.push(
      new Rectangle(
        this.x,
        this.y,
        this.z - halfDepth,
        this.rotationX,
        this.rotationY,
        this.rotationZ,
        this.width,
        this.height,
        this.patternPath
      )
    );

    // Back face
    faces.push(
      new Rectangle(
        this.x,
        this.y,
        this.z + halfDepth,
        this.rotationX,
        this.rotationY + 180,
        this.rotationZ,
        this.width,
        this.height,
        this.patternPath
      )
    );

    // Left face
    faces.push(
      new Rectangle(
        this.x - halfWidth,
        this.y,
        this.z,
        this.rotationX,
        this.rotationY + 90,
        this.rotationZ,
        this.depth,
        this.height,
        this.patternPath
      )
    );

    // Right face
    faces.push(
      new Rectangle(
        this.x + halfWidth,
        this.y,
        this.z,
        this.rotationX,
        this.rotationY - 90,
        this.rotationZ,
        this.depth,
        this.height,
        this.patternPath
      )
    );

    // Top face
    faces.push(
      new Rectangle(
        this.x,
        this.y - halfHeight,
        this.z,
        this.rotationX + 90,
        this.rotationY,
        this.rotationZ,
        this.width,
        this.depth,
        this.patternPath
      )
    );

    // Bottom face
    faces.push(
      new Rectangle(
        this.x,
        this.y + halfHeight,
        this.z,
        this.rotationX - 90,
        this.rotationY,
        this.rotationZ,
        this.width,
        this.depth,
        this.patternPath
      )
    );

    return faces;
  }
}
