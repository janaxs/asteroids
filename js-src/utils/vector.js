/**
 * Vector math
 */
export default class Vector {

    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    // Multiply with scalar
    muls(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    // Multiply itself with scalar
    imuls(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    // Multiply with scalar
    adds(scalar) {
        return new Vector(this.x + scalar, this.y + scalar);
    }

    // Add itself with Vector
    iadd(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
}
