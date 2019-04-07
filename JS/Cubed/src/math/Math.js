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
