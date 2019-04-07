(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Cubed = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = (function() {
    return {
        MathLib:      require("./math/Math.js"),
        AssetManager: require("./assets/AssetManager.js"),
        Shader:       require("./render/Shader.js"),
        Voxel:        require("./Voxel.js"),
        Camera:       require("./render/Camera.js"),
        Input:        require("./Input.js"),
    };
})();

},{"./Input.js":2,"./Voxel.js":3,"./assets/AssetManager.js":4,"./math/Math.js":5,"./render/Camera.js":11,"./render/Shader.js":12}],2:[function(require,module,exports){
var input = {};

/// <summary>
/// Creates and dispatches a new DOM event on "element"
/// </summary>
input.newEvent = function(element, evt, callBack) {
    $(element).on(evt, callBack);
}

///<summary>
/// Removes a DOM event from "element"
///</summary>
input.removeEvent = function(element, evt, opt) {
    $(element).off(evt, opt);
}

module.exports = input;

},{}],3:[function(require,module,exports){
voxel = {}

/// <summary>
/// Creates a new voxel object and sets the properties as defined by parameters.
/// </summary>
voxel.create = function(translate, rotate, scale, size, rgba) {
    var out = {};

    out.translate = translate;
    out.rotate    = rotate;
    out.scale     = scale;
    out.size      = size;
    out.rgba      = rgba;

    return out;
}

/// <summary>
/// Returns a float array which defines the rendering triangles of a voxel at origin.
/// </summary>
voxel.getCubeCoords = function(vox) {
    var xl = -Math.abs(vox.size), //lower bound of x
        xh = vox.size,            //upper bound of x
        yl = -Math.abs(vox.size), //lower bound of y
        yh = vox.size,            //upper bound of y
        zb = -Math.abs(vox.size), //back bound of z
        zf = vox.size;            //front bound of z

    return new Float32Array([xl, yl, zf, //Front
                             xh, yh, zf,
                             xl, yh, zf,
                             xl, yl, zf,
                             xh, yl, zf,
                             xh, yh, zf,
                             xl, yh, zf, //Left
                             xl, yh, zb,
                             xl, yl, zb,
                             xl, yh, zf,
                             xl, yl, zb,
                             xl, yl, zf,
                             xl, yh, zf, //Top
                             xh, yh, zf,
                             xl, yh, zb,
                             xl, yh, zb,
                             xh, yh, zf,
                             xh, yh, zb,
                             xh, yh, zf, //Right
                             xh, yl, zf,
                             xh, yh, zb,
                             xh, yl, zf,
                             xh, yl, zb,
                             xh, yh, zb,
                             xh, yl, zf, //Bottom
                             xl, yl, zf,
                             xh, yl, zb,
                             xl, yl, zb,
                             xh, yl, zb,
                             xl, yl, zf,
                             xl, yh, zb, //Back
                             xh, yh, zb,
                             xl, yl, zb,
                             xl, yl, zb,
                             xh, yh, zb,
                             xh, yl, zb]);
}

/// <summary>
/// Returns a Float32 array defining the color of each side.
/// </summary>
voxel.getCubeColor = function(vox) {
    var col1 = [vox.rgba[0], vox.rgba[1], vox.rgba[2], vox.rgba[3]],
        col2 = [vox.rgba[0] * 0.7, vox.rgba[1] * 0.7, vox.rgba[2] * 0.7, vox.rgba[3]],
        col3 = [vox.rgba[0] * 0.4, vox.rgba[1] * 0.4, vox.rgba[2] * 0.4, vox.rgba[3]];

    return new Float32Array([
        col3[0], col3[1], col3[2], col3[3], //Front
        col3[0], col3[1], col3[2], col3[3],
        col3[0], col3[1], col3[2], col3[3],
        col3[0], col3[1], col3[2], col3[3],
        col3[0], col3[1], col3[2], col3[3],
        col3[0], col3[1], col3[2], col3[3],
        col2[0], col2[1], col2[2], col2[3], //Left
        col2[0], col2[1], col2[2], col2[3],
        col2[0], col2[1], col2[2], col2[3],
        col2[0], col2[1], col2[2], col2[3],
        col2[0], col2[1], col2[2], col2[3],
        col2[0], col2[1], col2[2], col2[3],
        col1[0], col1[1], col1[2], col1[3], //Top
        col1[0], col1[1], col1[2], col1[3],
        col1[0], col1[1], col1[2], col1[3],
        col1[0], col1[1], col1[2], col1[3],
        col1[0], col1[1], col1[2], col1[3],
        col1[0], col1[1], col1[2], col1[3],
        col2[0], col2[1], col2[2], col2[3], //Right
        col2[0], col2[1], col2[2], col2[3],
        col2[0], col2[1], col2[2], col2[3],
        col2[0], col2[1], col2[2], col2[3],
        col2[0], col2[1], col2[2], col2[3],
        col2[0], col2[1], col2[2], col2[3],
        col1[0], col1[1], col1[2], col1[3], //Bottom
        col1[0], col1[1], col1[2], col1[3],
        col1[0], col1[1], col1[2], col1[3],
        col1[0], col1[1], col1[2], col1[3],
        col1[0], col1[1], col1[2], col1[3],
        col1[0], col1[1], col1[2], col1[3],
        col3[0], col3[1], col3[2], col3[3], //Back
        col3[0], col3[1], col3[2], col3[3],
        col3[0], col3[1], col3[2], col3[3],
        col3[0], col3[1], col3[2], col3[3],
        col3[0], col3[1], col3[2], col3[3],
        col3[0], col3[1], col3[2], col3[3]
    ]);
}

module.exports = voxel;

},{}],4:[function(require,module,exports){
module.exports = (function() {
    /// <summary>
    /// Creates a new AssetManager object, and returns it.
    /// </summary>
    function create(dir) {
        this.pwd = dir; //Present Working Directory.
        this.assets = []; //List of assets currently managed.

        /// <summary>
        /// Loads an image from file into memory, which is then held, and distributed, by the AssetManager.
        /// </summary>
        this.loadImage = function(name, path) {
            var img_ext = ["png","jpg","jpeg","gif","bmp"];
            var ext = path.substring(path.lastIndexOf(".") + 1, path.length);

            if (img_ext.indexOf(ext) >= 0) {
                var img = new Image();
                img.src = this.pwd.concat(path);

                this.assets.push(new Asset(name, img));

                return true;
            }
            return false;
        }

        /// <summary>
        /// Loads an audio clip from file into memory, which is then held, and distributed, by the AssetManager.
        /// </summary>
        this.loadAudio = function(name, path) {
            //Specify which file extensions are allowed
            var aud_ext = ["ogg","mp3","m4a","wav"];
            var ext = path.substring(path.lastIndexOf(".") + 1, path.length);

            if (aud_ext.indexOf(ext) >= 0) {
                var aud = new Audio();
                aud.src = this.pwd.concat(path);

                this.assets.push(new Asset(name, aud));

                return true;
            }
            return false;
        }

        /// <summary>
        /// Loads an object handed to it by reference, which is then held, and distributed, by the AssetManager.
        /// </summary>
        this.loadObj = function(name, obj) {
            if (obj != undefined) {
                this.assets.push(new Asset(name, obj));
                return true;
            }
            return false;
        }

        /// <summary>
        /// Unloads a specific asset from memory by removing all references to it.
        /// </summary>
        this.unloadAsset = function(name) {
            var arr = this.assets;

            for (a = 0; a < arr.length; a++) {
                if (arr[a].name == name) {
                    if (a < arr.length - 1) {
                        arr[a] = arr[arr.length - 1];
                    }

                    arr.pop();
                    return true;
                }
            }
            return false;
        }

        /// <summary>
        /// Unloads a specific asset from memory by removing all references to it.
        /// </summary>
        this.unloadAsset = function(id) {
            var arr = this.assets;

            if (arr.length > 0) {
                if (id < arr.length - 1) {
                    arr[id] = arr[arr.length - 1];
                }

                arr.pop();
                return true;
            }
            return false;
        }

        /// <summary>
        /// Fetches a specific asset (by name), and returns a reference to it.
        /// </summary>
        this.fetch = function(name) {
            for (a = 0; a < this.assets.length; a++) {
                if (this.assets[a].name == name) {
                    return this.assets[a].object;
                }
            }
            return false;
        }
        return this;
    }

    /// <summary>
    /// Provides an object skeleton to which all AssetManager adhere to.
    /// </summary>
    function Asset(name, obj) {
        this.name = name;
        this.object = obj;
        return this;
    }

    return {
        create: create
    }
})();

},{}],5:[function(require,module,exports){
module.exports = (function() {
    var mat3  = require("./mat3.js"), //3x3 matrices
        mat4  = require("./mat4.js"), //4x4 matrices
        vec2  = require("./vec2.js"), //2D vectors
        vec3  = require("./vec3.js"), //3D vectors
        vec4  = require("./vec4.js"); //4D vectors

    /// <summary>
    /// Converts from degrees to radians.
    /// </summary>
    function toRadians(deg) {
        return (deg / 180) * Math.PI;
    }

    /// <summary>
    /// Converts from radians to degrees.
    /// </summary>
    function toDegrees(rad) {
        return (rad * 180) / Math.PI;
    }

    /// <summary>
    /// Computes the world matrix which is then ready for the vertex shader.
    /// </summary>
    function computeMatrix(voxel, view, proj, zw) {
        var out = mat4.multiply(mat4.scale(voxel.scale), mat4.rotateZ(toRadians(voxel.rotate[2]))), //Object's Z rotation
            out = mat4.multiply(out, mat4.rotateY(toRadians(voxel.rotate[1]))),
            out = mat4.multiply(out, mat4.rotateX(toRadians(voxel.rotate[0]))),
            out = mat4.multiply(out, mat4.translate(voxel.translate)),
            out = mat4.multiply(out, view),
            out = mat4.multiply(out, proj),
            out = mat4.multiply(out, zw);

        return out;
    }

    return {
        toRadians : toRadians,
        toDegrees : toDegrees,
        computeMatrix : computeMatrix,
        mat3 : mat3,
        mat4 : mat4,
        vec2 : vec2,
        vec3 : vec3,
        vec4 : vec4
    }
})();

},{"./mat3.js":6,"./mat4.js":7,"./vec2.js":8,"./vec3.js":9,"./vec4.js":10}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
camera = {};

/// <summary>
/// Creates a new camera object with it's own specific translation, rotation, and field of view.
/// </summary>
camera.create = function(trans, rotate, fov) {
    var out = {};

    out.translate   = trans;
    out.rotate      = rotate;
    out.fieldOfView = fov;

    return out;
}

module.exports = camera;

},{}],12:[function(require,module,exports){
module.exports = (function() {
    /// <summary>
    /// Pulls a shader script from the specified DOM element (script_id), and attempts to compile it as either a vertex or fragment shader.
    /// </summary>
    function buildShaderScript(gl, script_id) {
        var script = document.getElementById(script_id);

        if (!script) {
            throw("ERROR: Invalid shader script_id (" + script_id + ")");
        }
        else {
            if (script.type == "x-shader/x-vertex") {
                //Compiles and returns a vertex shader from script.
                return compile(gl, script.text, gl.VERTEX_SHADER);
            }
            else if (script.type == "x-shader/x-fragment") {
                //Compiles and returns a fragment shader from script.
                return compile(gl, script.text, gl.FRAGMENT_SHADER);
            }
            else {
                throw("ERROR: Invalid shader type (" + script.type +")");
            }
        }
    }

    /// <summary>
    /// Attempts to compile the supplied shader script into a WebGL shader object.
    /// </summary>
    function compile(gl, src, type) {
        var shader = gl.createShader(type);

        gl.shaderSource(shader, src);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw("ERROR: Unable to compile shader (" + gl.getShaderInfoLog(shader) + ")");
        }
        return shader;
    }

    /// <summary>
    /// Attempts to attach both a vertex and fragment shader to a newly created WebGL program
    /// </summary>
    function newProgram(gl, vert, frag) {
        var prog = gl.createProgram();

        gl.attachShader(prog, vert);
        gl.attachShader(prog, frag);
        gl.linkProgram(prog);

        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            throw("ERROR: Shader Program failed to link (" + gl.getProgramInfoLog(prog) + ")");
        }

        return prog;
    }

    return {
        buildShaderScript: buildShaderScript,
        compile: compile,
        newProgram: newProgram
    };
})();

},{}]},{},[1])(1)
});