var vec3 = {};
var LENGTH = 3;

/// <summary>
/// Creates a new vector.
/// </summary>
vec3.create = function() {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        out[a] = 0;
    }
    return out;
}

/// <summary>
/// Creates a new vector with pre-defined values.
/// </summary>
vec3.create = function(x, y, z) {
    var out = new Array(LENGTH);

    out[0] = x;
    out[1] = y;
    out[2] = z;

    return out;
}

/// <summary>
/// Clones a vector and returns a new vector.
/// </summary>
vec3.clone = function(mat) {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        out[a] = mat[a];
    }
    return out;
}

/// <summary>
/// Copies one vector, src, into another vector, dst.
/// </summary>
vec3.copy = function(src, dst) {
    for (a = 0; a < LENGTH; a++) {
        dst[a] = src[a];
    }
    return dst;
}

/// <summary>
/// Adds two vectors together, returning the resulting vector. left + right
/// </summary>
vec3.add = function(left, right) {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        out[a] = left[a] + right[a];
    }
    return out;
}

/// <summary>
/// Subtracts two vectors, returning the resulting vector. left - right
/// </summary>
vec3.subtract = function(left, right) {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        out[a] = left[a] - right[a];
    }
    return out;
}

/// <summary>
/// Multiplies two vectors, returning the resulting vector. left * right
/// </summary>
vec3.multiply = function(left, right) {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        out[a] = left[a] * right[a];
    }
    return out;
}

/// <summary>
/// Scales a vector by multiplying it by a constant.
/// </summary>
vec3.scale = function(vec, scale) {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        out[a] = vec[a] * scale;
    }
    return out;
}

module.exports = vec3;
