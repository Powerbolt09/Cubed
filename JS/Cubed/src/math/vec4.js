var vec4 = {};
var LENGTH = 4;

/// <summary>
/// Creates a new vector.
/// </summary>
vec4.create = function() {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        out[a] = 0;
    }
    return out;
}

/// <summary>
/// Creates a new vector, pre-initialized with values a, b, c, and d.
/// </summary>
vec4.create = function(a, b, c, d) {
    var out = new Array(LENGTH);

    out[0] = a;
    out[1] = b;
    out[2] = c;
    out[3] = d;

    return out;
}

/// <summary>
/// Clones a given vector, returning a new vector.
/// </summary>
vec4.clone = function(mat) {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        out[a] = mat[a];
    }
    return out;
}

/// <summary>
/// Copies a vector, src, over the destination vector, dst.
/// </summary>
vec4.copy = function(src, dst) {
    for (a = 0; a < LENGTH; a++) {
        dst[a] = src[a];
    }
    return dst;
}

/// <summary>
/// Adds two vectors together. left + right
/// </summary>
vec4.add = function(left, right) {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        out[a] = left[a] + right[a];
    }
    return out;
}

/// <summary>
/// Subtracts two vectors. left - right
/// </summary>
vec4.subtract = function(left, right) {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        out[a] = left[a] - right[a];
    }
    return out;
}

/// <summary>
/// Multiplies two vectors together. left * right
/// </summary>
vec4.multiply = function(left, right) {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        out[a] = left[a] * right[a];
    }
    return out;
}

/// <summary>
/// Scales a vector by multiplying it by constant. scale * vec
/// </summary>
vec4.scale = function(vec, scale) {
    var out = new Array(LENGTH);

    for (a = 0; a < LENGTH; a++) {
        out[a] = vec[a] * scale;
    }
    return out;
}

module.exports = vec4;
