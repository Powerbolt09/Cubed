window.onload = function() {
    var MathLib      = Cubed.MathLib,
        AssetManager = Cubed.AssetManager,
        Shader       = Cubed.Shader,
        Voxel        = Cubed.Voxel,
        Camera       = Cubed.Camera,
        Input        = Cubed.Input,
        mat4         = MathLib.mat4,
        mat3         = MathLib.mat3,
        vec4         = MathLib.vec4,
        vec3         = MathLib.vec3,
        canvas       = document.getElementById("CanvasMain"),
        canvas_diag  = document.getElementById("CanvasDiag"),
        asm          = AssetManager.create("./"),
        binds        = {"A":false, "D":false, "S":false, "W":false, "UP":false, "DOWN": false, "SPACE":false, "L_SHIFT":false, "MOUSE": {}},
        world        = {};


    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas_diag.width = window.innerWidth;
    canvas_diag.height = window.innerHeight;

    if (init()) {
        start();
    }
    else {
        alert("Failed to initialize WebGL! Perhaps your browser doesn't support it?");
    }

    /// <summary>
    /// Initializes the engine environment, and attempts to acquire a WebGL context from the canvas. Returns true if the engine is successfully initialized. Returns
    /// false if the engine failed to acquire a usable WebGL context.
    /// </summary>
    function init() {
        var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        if (gl) {
            canvas_diag.context = canvas_diag.getContext("2d");
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.enable(gl.CULL_FACE);
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            //Compile shader scripts, and create a new GL program.
            var vert = Shader.buildShaderScript(gl, "shader-vs");
            var frag = Shader.buildShaderScript(gl, "shader-fs");
            var prog = Shader.newProgram(gl, vert, frag);

            //Store shader variables as properties inside the shader object.
            vert.a_pos = gl.getAttribLocation(prog, "a_position");
            vert.u_mat = gl.getUniformLocation(prog, "u_matrix");
            vert.a_col = gl.getAttribLocation(prog, "a_color");

            //Set world variables
            world.loop               = true;
            world.time               = 0;
            world.map                = [];
            world.cameras            = [
                                        Camera.create(vec3.create(0,200,0), vec3.create(30,0,0), 30),
                                        Camera.create(vec3.create(0,0,0), vec3.create(0,0,0), 30),
                                        Camera.create(vec3.create(0,-200,0), vec3.create(-30,0,0), 30)
                                       ];
            world.cameraSpeed        = 0.9;
            world.cameraSelector     = document.getElementById("CameraSlider").valueAsNumber;
            world.render             = {};
            world.render.fieldOfView = 30;
            world.render.projection  = mat4.perspective(MathLib.toRadians(world.cameras[world.cameraSelector].fieldOfView), canvas.width / canvas.height, 1, 2000);
            world.render.zw          = mat4.zToWMatrix(1);
            world.render.gl_buffer   = gl.createBuffer();
            world.render.frag_buffer = gl.createBuffer();
            world.render.fps         = 0;
            world.render.fps_elapse  = 0;

            //Establish callback functions for key and mouse events. Initialize event listeners for keyboard and mouse.
            var keyCallBack = function(e) {
                var bool = (e.type == "keydown") ? true : false;

                switch (e.keyCode) {
                    case 65: //A
                        binds["A"] = bool;
                        break;
                    case 68: //D
                        binds["D"] = bool;
                        break;
                    case 83: //S
                        binds["S"] = bool;
                        break;
                    case 87: //W
                        binds["W"] = bool;
                        break;
                    case 38: //UP
                        binds["UP"] = bool;
                        break;
                    case 40: //DOWN
                        binds["DOWN"] = bool;
                        break;
                    case 32: //SPACE
                        binds["SPACE"] = bool;
                        break;
                    case 16: //L CTRL
                        binds["L_SHIFT"] = bool;
                        break;
                    default:
                        break;
                }
            }

            var mouseCallBack = function(e) {
                var mouse = binds["MOUSE"];

                mouse.state = (e.type == "mousedown") ? true : false;

                if (mouse.state) {
                    mouse.x = e.clientX;
                    mouse.y = e.clientY;
                }
            }

            var mouseMoveCallBack = function(e) {
                var mouse = binds["MOUSE"];

                if (mouse.state) {
                    mouse.x = e.clientX;
                    mouse.y = e.clientY;
                }
            }

            var windowResizeCallBack = function(e) {
                canvas.width       = window.innerWidth;
                canvas.height      = window.innerHeight;
                canvas_diag.width  = window.innerWidth;
                canvas_diag.height = window.innerHeight;
                world.render.projection = mat4.perspective(MathLib.toRadians(30), canvas.width / canvas.height, 1, 2000);

                gl.viewport(0, 0, canvas.width, canvas.height);
            }

            var cameraSliderCallBack = function(e) {
                var val = e.toElement.valueAsNumber;

                if (val != world.cameraSelector) {
                    world.cameraSelector = val;
                    world.render.projection  = mat4.perspective(MathLib.toRadians(world.cameras[world.cameraSelector].fieldOfView), canvas.width / canvas.height, 1, 2000);
                }
            }

            Input.newEvent(document, "keydown", keyCallBack);
            Input.newEvent(document, "keyup", keyCallBack);

            Input.newEvent(canvas_diag, "mousedown", mouseCallBack);
            Input.newEvent(canvas_diag, "mouseup", mouseCallBack);
            Input.newEvent(canvas_diag, "mousemove", mouseMoveCallBack);

            Input.newEvent(window, "resize", windowResizeCallBack);
            Input.newEvent(window, "unload", function(e) { world.loop = false; });

            Input.newEvent(document.getElementById("CameraSlider"), "mouseup", cameraSliderCallBack);

            //Load compiled shaders, shader programs, canvas element, gl context, and world variables into the asset manager.
            asm.loadObj("world", world);
            asm.loadObj("shader-vs", vert);
            asm.loadObj("shader-fs", frag);
            asm.loadObj("shader-prog", prog);
            asm.loadObj("GL", gl);

            return true;
        }
        else {
            return false;
        }
    }

    /// <summary>
    /// Starts the engine. Fetches assets from AssetManager (asm), builds a world map, and starts the update/render cycle.
    /// </summary>
    function start() {
        var gl         = asm.fetch("GL"),
            vert       = asm.fetch("shader-vs"),
            frag       = asm.fetch("shader-fs"),
            prog       = asm.fetch("shader-prog"),
            world      = asm.fetch("world"),
            cam_main   = world.cameras[world.cameraSelector],
            fps_update = 50,
            mouse_x    = 0,
            mouse_y    = 0,
            mouse_flag = true;

        var red = Voxel.create(vec3.create(-200, 0,-400), vec3.create(0, 0, 0), vec3.create(1, 1, 1), 50, vec4.create(0.7, 0, 0, 1.0));
        var blue = Voxel.create(vec3.create(0, 0,-400), vec3.create(0, 0, 0), vec3.create(1, 1, 1), 50, vec4.create(0, 0.7, 0, 1.0));
        var green = Voxel.create(vec3.create(200, 0,-400), vec3.create(0, 0, 0), vec3.create(1, 1, 1), 50, vec4.create(0, 0, 0.7, 1.0));

        world.map.push(red);
        world.map.push(blue);
        world.map.push(green);

        for (var a = 0; a < 10; a++) {
            for (var b = 0; b < 10; b++) {
                world.map.push(Voxel.create(vec3.create(a * 100 - 450, -250,(b * -100) + 50), vec3.create(0,0,0), vec3.create(1,1,1), 50, vec4.create(0.5, 0.5, 0.5, 1.0)));
            }
        }

        //Set the gl program, and begin the game loop.
        gl.useProgram(prog);
        window.requestAnimationFrame(update);

        //Update object and variable data and call render to draw our updates. Entry point of the game loop.
        function update(time) {
            var elapsed  = time - world.time;
                cam_main = world.cameras[world.cameraSelector];

            red.rotate[0]   = (red.rotate[0] + 0.1 * elapsed) % 360;
            blue.rotate[1]  = (blue.rotate[1] + 0.1 * elapsed) % 360;
            green.rotate[2] = (green.rotate[2] + 0.1 * elapsed) % 360;

            //Sort list of voxels in descending order.
            for (var a = 0; a < world.map.length; a++) {
                var high = 0, idx = a;

                for (var b = a; b < world.map.length; b++) {
                    var dist = Math.pow(world.map[b].translate[0] - cam_main.translate[0],2) +
                               Math.pow(world.map[b].translate[1] - cam_main.translate[1],2) +
                               Math.pow(world.map[b].translate[2] - cam_main.translate[2],2);

                    if (dist > high) {
                        high = dist;
                        idx = b;
                    }
                }

                if (high > 0) {
                    var tmp = world.map[a];
                    world.map[a] = world.map[idx];
                    world.map[idx] = tmp;
                }
            }

            //Event update calculations
            if (binds["A"]) {
                cam_main.translate[0] -= elapsed * world.cameraSpeed;
            }
            else if (binds["D"]) {
                cam_main.translate[0] += elapsed * world.cameraSpeed;
            }

            if (binds["S"]) {
                cam_main.translate[2] += elapsed * world.cameraSpeed;
            }
            else if (binds["W"]) {
                cam_main.translate[2] -= elapsed * world.cameraSpeed;
            }

            if (binds["SPACE"]) {
                cam_main.translate[1] += elapsed * world.cameraSpeed;
            }
            else if (binds["L_SHIFT"]) {
                cam_main.translate[1] -= elapsed * world.cameraSpeed;
            }

            if (binds["MOUSE"].state) {
                if (mouse_flag) {
                    mouse_x = binds["MOUSE"].x;
                    mouse_y = binds["MOUSE"].y;
                    mouse_flag = false;
                }

                cam_main.rotate[0] = (cam_main.rotate[0] + (binds["MOUSE"].y - mouse_y) / 4) % 360;
                cam_main.rotate[1] = (cam_main.rotate[1] + (binds["MOUSE"].x - mouse_x) / 4) % 360;

                if (cam_main.rotate[0] > 90) {
                    cam_main.rotate[0] = 90;
                }
                else if (cam_main.rotate[0] < -90) {
                    cam_main.rotate[0] = -90;
                }

                mouse_x = binds["MOUSE"].x;
                mouse_y = binds["MOUSE"].y;
            }
            else {
                mouse_flag = true;
            }

            //FPS counter
            world.render.fps_elapse += elapsed;

            if (world.render.fps_elapse > fps_update) {
                var fps = Math.floor(1000 / elapsed);

                if (fps != world.render.fps) {
                    world.render.fps = fps;
                }

                world.render.fps_elapse = world.render.fps_elapse % fps_update;
            }

            world.time = time;
            render();
        }

        //Render the scene, then call requestAnimationFrame to reiterate the game loop.
        function render() {
            gl.clear(gl.COLOR_BUFFER_BIT);

            var viewMatrix = mat4.translate(vec3.scale(cam_main.translate, -1)),
                viewMatrix = mat4.multiply(viewMatrix, mat4.rotateY(MathLib.toRadians(cam_main.rotate[1]))),
                viewMatrix = mat4.multiply(viewMatrix, mat4.rotateX(MathLib.toRadians(cam_main.rotate[0])));

            for (var a = 0; a < world.map.length; a++) {
                var matrix = MathLib.computeMatrix(world.map[a], viewMatrix, world.render.projection, world.render.zw);

                //Pass vertex data to the vertex shader.
                gl.bindBuffer(gl.ARRAY_BUFFER, world.render.gl_buffer);
                gl.enableVertexAttribArray(vert.a_pos);
                gl.vertexAttribPointer(vert.a_pos, 3, gl.FLOAT, false, 0, 0);
                gl.bufferData(gl.ARRAY_BUFFER, Voxel.getCubeCoords(world.map[a]), gl.STATIC_DRAW);

                //Pass color data to the fragment shader.
                gl.bindBuffer(gl.ARRAY_BUFFER, world.render.frag_buffer);
                gl.enableVertexAttribArray(vert.a_col);
                gl.vertexAttribPointer(vert.a_col, 4, gl.FLOAT, false, 0, 0);
                gl.bufferData(gl.ARRAY_BUFFER, Voxel.getCubeColor(world.map[a]), gl.STATIC_DRAW);

                //Pass world matrix data to the vertex shader. Draw cube.
                gl.uniformMatrix4fv(vert.u_mat, false, matrix);
                gl.drawArrays(gl.TRIANGLES, 0, 6*6);
            }

            //Diagnostic canvas rendering.
            canvas_diag.context.clearRect(0,0,canvas_diag.width, canvas_diag.height);
            canvas_diag.context.fillStyle = "#FFFFFF";
            canvas_diag.context.font = "20px Arial";
            canvas_diag.context.fillText("FPS: " + world.render.fps, 10, 25);
            canvas_diag.context.fillText("Camera: " + world.cameraSelector, 10, 50);
            canvas_diag.context.fillText("Position: (X: " + Math.floor(cam_main.translate[0]) + ", Y: " + Math.floor(cam_main.translate[1]) + ", Z: " + Math.floor(cam_main.translate[2]) + ")", 10, 75);
            canvas_diag.context.fillText("Orientation: (X: " + cam_main.rotate[0].toFixed(1) + ", Y: " + cam_main.rotate[1].toFixed(1) + ", Z: " + cam_main.rotate[2].toFixed(1) + ")", 10, 100);

            if (world.loop) {
                window.requestAnimationFrame(update);
            }
        }
    }

    //Dispose of assets within the AssetManager.
    while (asm.unloadAsset(0)) {}
}
