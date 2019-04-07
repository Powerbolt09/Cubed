var vec2 = {};
var LENGTH = 2;

/// <summary>
/// Creates a new 2D vector with default values. (0)
/// </summary>
vec2.create = function() {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        out[a] = 0;
    }
    return out;
}

/// <summary>
/// Creates a new 2D vector with the specified values x, and y.
/// </summary>
vec2.create = function(x, y) {
    var out = new Array9(LENGTH);

    out[0] = x;
    out[1] = y;

    return out;
}

/// <summary>
/// Clones an existing 2D vector.
/// </summary>
vec2.clone = function(mat) {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        out[a] = mat[a];
    }
    return out;
}

/// <summary>
/// Copies a vector, src, into another vector, dst.
/// </summary>
vec2.copy = function(src, dst) {
    for (a = 0; a < LENGTH; a++) {
        dst[a] = src[a];
    }
    return dst;
}

/// <summary>
/// Adds two vectors together, and returns the result in the form of another vector. left + right
/// </summary>
vec2.add = function(left, right) {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        out[a] = left[a] + right[a];
    }
    return out;
}

/// <summary>
/// Subtracts two vectors from one another, returning the result in the form of another vector. left - right
/// </summary>
vec2.subtract = function(left, right) {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        out[a] = left[a] - right[a];
    }
    return out;
}

/// <summary>
/// Multiplies two vectors together, returning the result in the form of another vector. left * right
/// </summary>
vec2.multiply = function(left, right) {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        out[a] = left[a] * right[a];
    }
    return out;
}

/// <summary>
/// Scales a vector by a factor or constant.
/// </summary>
vec2.scale = function(vec, scale) {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        out[a] = vec[a] * scale;
    }
    return out;
}

module.exports = vec2;
