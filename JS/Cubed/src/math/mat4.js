var mat4 = {};
var ROWS = 4;
var COLS = 4;
var LENGTH = ROWS * COLS;

/// <summary>
/// Creates a new 4x4 identity matrix, stored in row-major form.
/// </summary>
mat4.create = function() {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        if (a % 5 == 0) {
            out[a] = 1;
        }
        else {
            out[a] = 0;
        }
    }
    return out;
}

/// <summary>
/// Adds two 4x4 matrices together. mat1 + mat2
/// </summary>
mat4.add = function(mat1, mat2) {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        out[a] = mat1[a] + mat2[a];
    }
    return out;
}

/// <summary>
/// Subtracts one matrix from the other. mat1 - mat2
/// </summary>
mat4.subtract = function(mat1, mat2) {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        out[a] = mat1[a] - mat2[a];
    }
    return out;
}

/// <summary>
/// Multiplies two matrices together. mat1 * mat2
/// </summary>
mat4.multiply = function(mat1, mat2) {
    var out = new Array(LENGTH);

    for (a = 0; a < ROWS; a++) {
        for (b = 0; b < COLS; b++) {
            var total = 0

            for (c = 0; c < COLS; c++) {
                total += mat1[ROWS * a + c] * mat2[ROWS * c + b];
            }
            out[ROWS * a + b] = total;
        }
    }
    return out;
}

/// <summary>
/// Scales a matrix by multiplying it by a constant value. scale * mat.
/// </summary>
mat4.scalarMult = function(mat, scale) {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        out[a] = mat[a] * scale;
    }
    return out;
}

/// <summary>
/// Transposes a 4x4 matrix.
/// </summary>
mat4.transpose = function(mat) {
    swap(mat, 1, 4);
    swap(mat, 2, 8);
    swap(mat, 3, 12);
    swap(mat, 6, 9);
    swap(mat, 7, 13);
    swap(mat, 11, 14);
}

/// <summary>
/// Translates an object in 3D space by creating a 4x4 matrix out of a 3D vector.
/// </summary>
mat4.translate = function(arr) {
    var out = this.create();

    out[12] = arr[0];
    out[13] = arr[1];
    out[14] = arr[2];

    return out;
}

/// <summary>
/// Rotates an object about the X axis by "rad" radians
/// </summary>
mat4.rotateX = function(rad) {
    var out = this.create(),
        c   = Math.cos(rad),
        s   = Math.sin(rad);

    out[5]  = c;
    out[6]  = s;
    out[9]  = -s;
    out[10] = c;

    return out;
}

/// <summary>
/// Rotates an object about the Y axis by "rad" radians
/// </summary>
mat4.rotateY = function(rad) {
    var out = this.create(),
        c   = Math.cos(rad),
        s   = Math.sin(rad);

    out[0] = c;
    out[2] = -s;
    out[8] = s;
    out[10] = c;

    return out;
}

/// <summary>
/// Rotates an object about the Z axis by "rad" radians
/// </summary>
mat4.rotateZ = function(rad) {
    var out = this.create(),
        c   = Math.cos(rad),
        s   = Math.sin(rad);

    out[0] = c;
    out[1] = s;
    out[4] = -s;
    out[5] = c;

    return out;
}

/// <summary>
/// Scales an object in 3D by creating a 4x4 matrix out of a 3D vector.
/// </summary>
mat4.scale = function(arr) {
    var out = this.create();

    out[0]  = arr[0];
    out[5]  = arr[1];
    out[10] = arr[2];

    return out;
}

/// <summary>
/// Creates a 4x4 matrix which represents a 3D "perspective"
/// </summary>
mat4.perspective = function(fov, aspect, near, far) {
    var out = this.create();
    var per = Math.tan(0.5 * (Math.PI - fov));
    var inv = 1.0 / (near - far);

    out[0]  = per / aspect;
    out[5]  = per;
    out[10] = (near + far) * inv;
    out[11] = -1;
    out[15] = near * far * inv * 2;

    return out;
}

/// <summary>
/// Creates a matrix which transforms an object's z axis.
/// </summary>
mat4.zToWMatrix = function(factor) {
    var out = this.create();

    out[11] = factor;

    return out;
}

/// <summary>
/// Private function. Takes in an array, and swaps two indices' values.
/// </summary>
function swap(arr, idx1, idx2) {
    var tmp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = tmp;
}

module.exports = mat4;
