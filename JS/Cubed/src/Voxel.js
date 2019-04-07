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
