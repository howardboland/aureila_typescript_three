define('DynamicCube',["require", "exports"], function (require, exports) {
    "use strict";
    var DynamicCube = (function () {
        function DynamicCube() {
            var _this = this;
            this.init = function () {
                _this.scene = new THREE.Scene();
                _this.camera = new THREE.PerspectiveCamera(46, _this.container.offsetWidth / _this.container.offsetHeight, 1, 1000);
                _this.camera.position.z = 600;
                _this.light = new THREE.DirectionalLight(0xff);
                _this.light.position.set(0, 10, 1).normalize();
                _this.scene.add(_this.light);
                _this.addObjectToShowCanvasMethod();
                _this.addObjectToShowCSS3DMethod();
                _this.renderer = new THREE.WebGLRenderer({ alpha: true });
                _this.cssrenderer = new THREE.CSS3DRenderer();
                _this.renderer.setSize(_this.container.offsetWidth, _this.container.offsetHeight);
                _this.cssrenderer.setSize(_this.container.offsetWidth, _this.container.offsetHeight);
                _this.container.appendChild(_this.renderer.domElement);
                _this.container.appendChild(_this.cssrenderer.domElement);
                _this.cssrenderer.domElement.style.position = 'absolute';
                _this.cssrenderer.domElement.style.top = '0px';
            };
            this.addObjectToShowCanvasMethod = function () {
                var h = 150;
                var w = 300;
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                ctx.font = '20pt Arial';
                ctx.fillStyle = 'red';
                ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = 'green';
                ctx.fillRect(w * .05, h * .05, w * .90, h * .90);
                ctx.fillStyle = 'black';
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("Hello World", w / 2, h / 2);
                var texture = new THREE.Texture(canvas);
                texture.needsUpdate = true;
                var geometry = new THREE.BoxGeometry(100, 100, 100);
                var material = new THREE.MeshBasicMaterial({ map: texture });
                _this.mesh = new THREE.Mesh(geometry, material);
                _this.mesh.position.x = -250;
                _this.mesh.position.y = 50;
                _this.scene.add(_this.mesh);
            };
            this.addObjectToShowCSS3DMethod = function () {
                _this.cssObject = new THREE.CSS3DObject(document.getElementById("dynamicBox"));
                _this.scene.add(_this.cssObject);
            };
            this.spin = function () {
                TweenMax.killTweensOf(_this.cssObject.rotation);
                _this.cssObject.rotation.y = 0;
                TweenMax.to(_this.cssObject.rotation, 1, { y: Math.PI * 2 });
            };
            this.animate = function () {
                _this.mesh.rotation.x += .01;
                _this.mesh.rotation.y += .005;
                _this.render();
                requestAnimationFrame(_this.animate);
            };
            this.render = function () {
                _this.renderer.render(_this.scene, _this.camera);
                _this.cssrenderer.render(_this.scene, _this.camera);
            };
        }
        DynamicCube.prototype.attached = function () {
            this.init();
            this.animate();
        };
        return DynamicCube;
    }());
    exports.DynamicCube = DynamicCube;
});

define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
            this.heading = '';
            this.heading = "Nlythe Aurila/Typescript/Three";
        }
        App.prototype.addDynamicRoute = function () {
            alert('hello');
            this.theRouter.addRoute({ route: "DynamicCube", moduleId: "DynamicCube", nav: true, title: "Dynamic Textured Cube" });
            this.theRouter.refreshNavigation();
        };
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", './environment'], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        longStackTraces: environment_1.default.debug,
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!DynamicCube.html', ['module'], function(module) { module.exports = "<template>\n    <section>\n        <div id=\"dynamicBox\">\n            <h2>CSS3DRenderer</h2>\n            <textarea class=\"scrollable\">\n              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut semper quam id turpis rutrum, id ultrices dui posuere. Pellentesque sed dolor vel metus venenatis tristique. Aenean rutrum luctus lacus eget congue. Aenean vestibulum ultrices nulla, at egestas risus rhoncus eu. Fusce ornare mollis odio, maximus fermentum sapien. Suspendisse potenti. Mauris est tortor, tristique sit amet porttitor a, interdum non turpis. Mauris in dolor pretium, gravida augue at, semper diam. Sed quam elit, convallis eu ante sit amet, condimentum facilisis augue.\n            </textarea>\n            <button click.trigger=\"spin()\">Spin me</button>\n        </div>\n        <div ref=\"container\" class=\"container\"></div>\n    </section>\n</template>\n"; });
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${heading}</h1>\n  <!-- <button click.delegate=\"addDynamicRoute()\">Add Dynamic Route</button> -->\n  <compose view-model=\"DynamicCube\" view=\"DynamicCube.html\" containerless></compose>\n  <!-- <require from=\"./DynamicCube\"></require> -->\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map