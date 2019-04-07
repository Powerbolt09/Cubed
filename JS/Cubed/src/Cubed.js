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
