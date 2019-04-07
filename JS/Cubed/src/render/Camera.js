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
