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
