module.exports = (function() {
    var canvas  = null,
        webgl   = null,
        progs   = [],
        cameras = [],
        Shader  = require("./Shader.js"),
        Camera  = require("./Camera.js");

    /// <summary>
    /// Starts a WebGL context on the canvas, and sets initial state. Returns true if it succeeded, false otherwise.
    /// </summary>
    function init(canv) 
    {
        canvas = canv;
        webgl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        if (webgl) 
        {
            webgl.viewport(0, 0, canvas.width, canvas.height);
            webgl.enable(webgl.CULL_FACE);
            webgl.clearColor(0.0, 0.0, 0.0, 1.0);
            webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);

            return true;
        } 
        else 
        {
            return false;
        }
    }

    /// <summary>
    /// Creates and stores a new WebGL shader program using a vertex and fragment shader.
    /// </summary>
    function newShaderProgram(name, vert_id, frag_id) 
    {
        if (webgl)  
        {
            var result = progs.filter(x => x.id == name);

            if (result.length <= 0)
            {
                if (!result)
                var vert = Shader.buildShaderScript(webgl, vert_id),
                    frag = Shader.buildShaderScript(webgl, frag_id);
    
                progs.push({id: name, program: Shader.newProgram(webgl, vert, frag) });
    
                return true;
            }
        }
        return false;
    }

    /// <summary>
    /// Changes the shader program WebGL uses to render.
    /// </summary>
    function useProgram(name) 
    {
        if (webgl) 
        {
            var result = progs.filter(x => x.id == name);

            if (result.length > 0) 
            {
                webgl.useProgram(result[0].program);
            }
        }
    }

    /// <summary>
    /// Removes a shader program from our possession. 
    /// </summary>
    function removeProgram(name)
    {
        if (progs.length > 0)
        {
            for (var a = 0; a < progs.length; a++)
            {
                if (progs[a].name == id)
                {
                    progs.splice(a, 1);
                    return true;
                }
            }
        }

        return false;
    }

    /// <summary>
    /// Defines a new Camera object placed in 3D space.
    /// </summary>
    function newCamera(pos_vec, orn_vec, fov) 
    {
        throw("Render::newCamera() NOT YET IMPLEMENTED");
    }

    /// <summary>
    /// Switches the main camera with
    /// </summary>
    function useCamera(id) 
    {
        throw("Render::useCamera() NOT YET IMPLEMENTED");
    }

    function removeCamera(id) 
    {
        throw("Render::removeCamera() NOT YET IMPLEMENTED");
    }

    return {
        init: init,
        newShaderProgram: newShaderProgram,
    };
});
