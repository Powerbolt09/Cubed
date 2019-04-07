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
