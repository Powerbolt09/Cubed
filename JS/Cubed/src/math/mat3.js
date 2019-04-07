var mat3 = {};
var ROWS = 3;
var COLS = 3;
var LENGTH = ROWS * COLS;

/// <summary>
/// Creates a new 3x3 identity matrix, stored in row-major form.
/// </summary>
mat3.create = function() {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        if (a % 4 == 0) {
            out[a] = 1;
        }
        else {
            out[a] = 0;
        }
    }
    return out;
}

/// <summary>
/// Clones a matrix by copying it's values to new matrix.
/// </summary>
mat3.clone = function(mat) {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        out[a] = mat[a];
    }
    return out;
}

/// <summary>
/// Copies a matrix over to another, existing, matrix.
/// </summary>
mat3.copy = function(src, dst) {
    for (a = 0; a < LENGTH; a++) {
        dst[a] = src[a];
    }
    return dst;
}

/// <summary>
/// Adds two matrices together. mat1 + mat2
/// </summary>
mat3.add = function(mat1, mat2) {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        out[a] = mat1[a] + mat2[a];
    }
    return out;
}

/// <summary>
/// Subtracts two matrices. mat1 - mat2
/// </summary>
mat3.subtract = function(mat1, mat2) {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        out[a] = mat1[a] - mat2[a];
    }
    return out;
}

/// <summary>
/// Multiplies two matrices together. mat1 * mat2
/// </summary>
mat3.multiply = function(mat1, mat2) {
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
/// Multiplies a matrix by a constant value. scale * mat
/// </summary>
mat3.scalarMult = function(mat, scale) {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        out[a] = mat[a] * scale;
    }
    return out;
}

/// <summary>
/// Transposes a 3x3 matrix by swapping the necessary values.
/// </summary>
mat3.transpose = function(mat) {
    swap(mat, 1, 3);
    swap(mat, 2, 6);
    swap(mat, 5, 7);
}

/// <summary>
/// Private function. Swaps the values of two separate indices in an array.
/// </summary>
function swap(arr, idx1, idx2) {
    var tmp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = tmp;
}

module.exports = mat3;
