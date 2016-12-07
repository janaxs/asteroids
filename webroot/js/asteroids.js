/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _asteroids = __webpack_require__(1);
	
	var _asteroids2 = _interopRequireDefault(_asteroids);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Main to start all up.
	 */
	window.addEventListener("load", function () {
	  "use strict";
	
	  var asteroids = (0, _asteroids2.default)();
	
	  asteroids.init("canvas1");
	  asteroids.gameLoop();
	}, false); /**
	            * Main program, to start all up.
	            */

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function () {
	    "use strict";
	
	    // Hold grapic context
	
	    var ctx;
	
	    // Remember the time since last update & render
	    var lastGameTick;
	
	    // Hold the ship
	    var ship;
	
	    // Hold the bullets
	    var bullet;
	
	    // Object for keypress
	    var key;
	
	    // Game area
	    var width;
	    var height;
	
	    /**
	     * Set the size of the canvas.
	     */
	    function init(canvasId) {
	        // Set canvas drawing context
	        var canvas = document.getElementById(canvasId);
	        ctx = canvas.getContext("2d");
	
	        // Resize canvas and make it listen to window resize events
	        var canvasUtils = (0, _canvas2.default)();
	        canvasUtils.fullWindow("canvas1");
	        canvasUtils.resizeOnWindowResize("canvas1");
	
	        // TODO Need to support resize
	        width = canvas.width;
	        height = canvas.height;
	
	        // Default draw style
	        //ctx.lineWidth = 1;
	        //ctx.strokeStyle = "hsla(0,0%, 100%, 1)";
	
	        // Add the ship and place it in the middle
	        ship = new _ship2.default();
	        ship.moveTo(new _vector2.default(canvas.width / 2, canvas.height / 2));
	
	        // Add Bullets
	        bullet = new _bullet2.default();
	
	        // Key pressed
	        key = (0, _keyEvents2.default)();
	    }
	
	    /**
	     *
	     */
	    function update(td) {
	        ship.update(key, td, width, height);
	        bullet.update(key, td, ship.getPosition());
	    }
	
	    /**
	     *
	     */
	    function render() {
	        ctx.clearRect(0, 0, width, height);
	        ship.draw(ctx, key);
	        bullet.draw(ctx);
	    }
	
	    /**
	     *
	     */
	    function gameLoop() {
	        // Timediff since last frame / gametick
	        var now = Date.now();
	        var td = (now - (lastGameTick || now)) / 1000;
	        lastGameTick = now;
	
	        window.requestAnimFrame(gameLoop);
	        update(td);
	        render();
	    }
	
	    /**
	     *
	     */
	    return {
	        "init": init,
	        "gameLoop": gameLoop
	    };
	};
	
	__webpack_require__(2);

	var _canvas = __webpack_require__(3);

	var _canvas2 = _interopRequireDefault(_canvas);

	var _vector = __webpack_require__(4);

	var _vector2 = _interopRequireDefault(_vector);

	var _keyEvents = __webpack_require__(5);

	var _keyEvents2 = _interopRequireDefault(_keyEvents);

	var _ship = __webpack_require__(6);

	var _ship2 = _interopRequireDefault(_ship);

	var _bullet = __webpack_require__(8);

	var _bullet2 = _interopRequireDefault(_bullet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * Shim layer, polyfill, for requestAnimationFrame with setTimeout fallback.
	 */
	
	/**
	 * requestAnimFrame
	 */
	window.requestAnimFrame = function () {
	    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
	        window.setTimeout(callback, 1000 / 60);
	    };
	}();
	
	/**
	 * cancelRequestAnimFrame
	 */
	window.cancelRequestAnimFrame = function () {
	    return window.cancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.clearTimeout;
	}();

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function () {
	    "use strict";
	
	    /**
	     * Set the size of the canvas.
	     */
	
	    function fullWindow(canvasId) {
	        var canvas = document.getElementById(canvasId);
	        var ctx = canvas.getContext("2d");
	
	        ctx.canvas.width = Math.floor(window.innerWidth) - 1;
	        ctx.canvas.height = Math.floor(window.innerHeight) - 1;
	    }
	
	    /**
	     * Resize on window resize.
	     */
	    function resizeOnWindowResize(canvasId) {
	        window.addEventListener("resize", function () {
	            fullWindow(canvasId);
	        });
	    }
	
	    // Return whats actually exported
	    return {
	        fullWindow: fullWindow,
	        resizeOnWindowResize: resizeOnWindowResize
	    };
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Vector math
	 */
	
	var Vector = function () {
	    function Vector(x, y) {
	        _classCallCheck(this, Vector);
	
	        this.x = x || 0;
	        this.y = y || 0;
	    }
	
	    // Multiply with scalar
	
	
	    _createClass(Vector, [{
	        key: "muls",
	        value: function muls(scalar) {
	            return new Vector(this.x * scalar, this.y * scalar);
	        }
	
	        // Multiply itself with scalar
	
	    }, {
	        key: "imuls",
	        value: function imuls(scalar) {
	            this.x *= scalar;
	            this.y *= scalar;
	            return this;
	        }
	
	        // Multiply with scalar
	
	    }, {
	        key: "adds",
	        value: function adds(scalar) {
	            return new Vector(this.x + scalar, this.y + scalar);
	        }
	
	        // Add itself with Vector
	
	    }, {
	        key: "iadd",
	        value: function iadd(vector) {
	            this.x += vector.x;
	            this.y += vector.y;
	            return this;
	        }
	
	        // Return a clone
	
	    }, {
	        key: "clone",
	        value: function clone() {
	            return new Vector(this.x, this.y);
	        }
	    }]);
	
	    return Vector;
	}();

	exports.default = Vector;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function () {
	    "use strict";
	
	    var pressed = {};
	
	    // On key release
	    window.addEventListener('keyup', function (event) {
	        delete pressed[event.keyCode];
	    });
	
	    // On key press
	    window.addEventListener('keydown', function (event) {
	        pressed[event.keyCode] = true;
	    });
	
	    // Return what to export
	    return {
	        LEFT: 37,
	        UP: 38,
	        RIGHT: 39,
	        DOWN: 40,
	        SPACE: 32,
	        A: 65,
	        S: 83,
	        D: 68,
	        W: 87,
	
	        isDown: function isDown(key1, key2) {
	            return pressed[key1] || pressed[key2];
	        }
	    };
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * The ship.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	var _vector = __webpack_require__(4);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _force = __webpack_require__(7);
	
	var _force2 = _interopRequireDefault(_force);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ship = function () {
	    function Ship() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	        _classCallCheck(this, Ship);
	
	        var force = new _force2.default();
	
	        this.height = options.height || 20;
	        this.width = options.width || 10;
	        this.position = options.position || new _vector2.default();
	        this.velocity = options.velocity || new _vector2.default();
	        this.speed = options.speed || new _vector2.default();
	        this.direction = options.direction || 0;
	
	        this.accelerateForce = options.accelerateForce || force.createAcceleration(new _vector2.default(80, 80));
	        this.breakForce = options.breakForce || force.createDamping(0.97);
	        this.dampForce = options.dampForce || force.createDamping(0.999);
	    }
	
	    _createClass(Ship, [{
	        key: "draw",
	        value: function draw(ctx, key) {
	            var x = this.width / 2;
	            var y = this.height / 2;
	
	            ctx.lineWidth = 1;
	            ctx.strokeStyle = 'hsla(0,0%,100%,1)';
	
	            ctx.save();
	            ctx.translate(this.position.x, this.position.y);
	            ctx.rotate(this.direction + Math.PI / 2);
	            ctx.beginPath();
	            ctx.moveTo(0, -y);
	            ctx.lineTo(x, y);
	            ctx.lineTo(0, 0.8 * y);
	            ctx.lineTo(-x, y);
	            ctx.lineTo(0, -y);
	
	            if (key.isDown(key.UP, key.W)) {
	                ctx.moveTo(0, y);
	                ctx.lineTo(-2, y + 10);
	                ctx.lineTo(0, y + 8);
	                ctx.lineTo(2, y + 10);
	                ctx.lineTo(0, y);
	            }
	
	            if (key.isDown(key.DOWN, key.S)) {
	                ctx.moveTo(y + 4, 0);
	                ctx.arc(0, 0, y + 4, 0, Math.PI, true);
	            }
	
	            ctx.stroke();
	            ctx.restore();
	        }
	    }, {
	        key: "moveTo",
	        value: function moveTo(position) {
	            this.position = position;
	            this.position.x += this.width / 2;
	            this.position.y += this.height / 2;
	        }
	    }, {
	        key: "moveForward",
	        value: function moveForward(td) {
	            this.dampForce(this.speed, td);
	            this.position.x += this.speed.x * Math.cos(this.direction) * td;
	            this.position.y += this.speed.y * Math.sin(this.direction) * td;
	            this.position.iadd(this.velocity.muls(td));
	        }
	    }, {
	        key: "throttle",
	        value: function throttle(td) {
	            this.accelerateForce(this.speed, td);
	        }
	    }, {
	        key: "rotateLeft",
	        value: function rotateLeft() {
	            this.direction -= Math.PI / 30;
	        }
	    }, {
	        key: "rotateRight",
	        value: function rotateRight() {
	            this.direction += Math.PI / 30;
	        }
	    }, {
	        key: "breaks",
	        value: function breaks(td) {
	            this.breakForce(this.speed, td);
	            this.breakForce(this.velocity, td);
	        }
	    }, {
	        key: "update",
	        value: function update(key, td, width, height) {
	            if (key.isDown(key.UP, key.W)) {
	                this.throttle(td);
	            }
	
	            if (key.isDown(key.LEFT, key.A)) {
	                this.rotateLeft();
	            }
	
	            if (key.isDown(key.DOWN, key.S)) {
	                this.breaks(td);
	            }
	
	            if (key.isDown(key.RIGHT, key.D)) {
	                this.rotateRight();
	            }
	
	            //Forces.update(this.velocity, td);
	            this.moveForward(td);
	            this.stayInArea(width, height);
	        }
	    }, {
	        key: "stayInArea",
	        value: function stayInArea(width, height) {
	            if (this.position.y < -this.height) {
	                this.position.y = height;
	            }
	
	            if (this.position.y > height) {
	                this.position.y = -this.height;
	            }
	
	            if (this.position.x > width) {
	                this.position.x = -this.width;
	            }
	
	            if (this.position.x < -this.width) {
	                this.position.x = width;
	            }
	        }
	    }, {
	        key: "getPosition",
	        value: function getPosition() {
	            return this.position;
	        }
	    }]);
	
	    return Ship;
	}();

	exports.default = Ship;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * The force around us.
	 */
	
	var Force = function () {
	    function Force() {
	        _classCallCheck(this, Force);
	
	        this.all = {};
	    }
	
	    _createClass(Force, [{
	        key: "createAcceleration",
	        value: function createAcceleration(vector) {
	            return function (velocity, td) {
	                velocity.iadd(vector.muls(td));
	            };
	        }
	    }, {
	        key: "createDamping",
	        value: function createDamping(damping) {
	            return function (velocity /*, td */) {
	                velocity.imuls(damping);
	            };
	        }
	    }, {
	        key: "createWind",
	        value: function createWind(vector) {
	            return function (velocity, td) {
	                velocity.iadd(vector.adds(td));
	            };
	        }
	    }, {
	        key: "addAcceleration",
	        value: function addAcceleration(name, vector) {
	            this.all[name] = this.createAcceleration(vector);
	        }
	    }, {
	        key: "addDamping",
	        value: function addDamping(name, damping) {
	            this.all[name] = this.createDamping(damping);
	        }
	    }, {
	        key: "addWind",
	        value: function addWind(name, vector) {
	            this.all[name] = this.createWind(vector);
	        }
	    }, {
	        key: "update",
	        value: function update(object, td) {
	            for (var force in this.all) {
	                if (this.all.hasOwnProperty(force)) {
	                    this.all[force](object, td);
	                }
	            }
	        }
	    }]);
	
	    return Force;
	}();

	exports.default = Force;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Bullets.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	var _vector = __webpack_require__(4);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Bullet = function () {
	    function Bullet() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	        _classCallCheck(this, Bullet);
	
	        ///
	
	        this.height = options.height || 20;
	        this.width = options.width || 10;
	        this.position = options.position || new _vector2.default();
	        this.velocity = options.velocity || new _vector2.default();
	        this.speed = options.speed || new _vector2.default();
	        this.direction = options.direction || 0;
	        this.bullets = [];
	    }
	
	    _createClass(Bullet, [{
	        key: "draw",
	        value: function draw(ctx, key) {
	
	            ctx.save();
	
	            ctx.lineWidth = 5;
	            ctx.strokeStyle = 'hsla(0,0%,100%,1)';
	
	            ctx.fillStyle = "rgb(200,0,0)";
	            ctx.fillRect(10, 10, 50, 50);
	
	            ctx.moveTo(100, 100);
	            ctx.lineTo(200, 200);
	
	            for (var i = 0, len = this.bullets.length; i < len; i++) {
	                //ctx.translate(this.bullets[i].x, this.bullets[i].y);
	                ctx.beginPath();
	                ctx.moveTo(this.bullets[i].x, this.bullets[i].y);
	                ctx.lineTo(this.bullets[i].x + 10, this.bullets[i].y + 10);
	
	                //ctx.moveTo(0, 0);
	                //ctx.lineTo(10, 10);
	
	                //        ctx.stroke();
	                /*
	                ctx.fillRect (
	                    this.bullets[i].x,
	                    this.bullets[i].y,
	                    this.bullets[i].x + 10,
	                    this.bullets[i].y + 10
	                );*/
	                /*
	                            ctx.translate(this.bullets[i].x + 40, this.bullets[i].y + 40);
	                            ctx.beginPath();
	                            ctx.lineTo(10, 10);
	                            ctx.stroke();
	                            */
	            }
	
	            ctx.stroke();
	
	            ctx.restore();
	        }
	    }, {
	        key: "add",
	        value: function add(position) {
	            this.bullets.push(position.clone());
	        }
	    }, {
	        key: "move",
	        value: function move(td) {
	            for (var i = 0, len = this.bullets.length; i < len; i++) {
	                this.bullets[i].x += 1;
	                this.bullets[i].y += 1;
	            }
	            /*
	            this.dampForce(this.speed, td);
	            this.position.x += this.speed.x * Math.cos(this.direction) * td;
	            this.position.y += this.speed.y * Math.sin(this.direction) * td;
	            this.position.iadd(this.velocity.muls(td));
	            */
	        }
	    }, {
	        key: "update",
	        value: function update(key, td, position) {
	            if (key.isDown(key.SPACE)) {
	                this.add(position);
	            }
	
	            //Forces.update(this.velocity, td);
	            this.move(td);
	            //this.stayInArea(width, height);
	        }
	    }, {
	        key: "stayInArea",
	        value: function stayInArea(width, height) {
	            if (this.position.y < -this.height) {
	                this.position.y = height;
	            }
	
	            if (this.position.y > height) {
	                this.position.y = -this.height;
	            }
	
	            if (this.position.x > width) {
	                this.position.x = -this.width;
	            }
	
	            if (this.position.x < -this.width) {
	                this.position.x = width;
	            }
	        }
	    }]);
	
	    return Bullet;
	}();

	exports.default = Bullet;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWQ0Y2NhNTBjMTA2YmRiNzA0ZDMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FzdGVyb2lkcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvcmVxdWVzdC1hbmltLWZyYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9jYW52YXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3ZlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMva2V5LWV2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc2hpcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvZm9yY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2J1bGxldC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUJBLFFBQU8sZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsWUFBWTtBQUN4QyxnQkFEd0M7O0FBR3hDLE9BQUksWUFBWSwwQkFBWixDQUhvQzs7QUFLeEMsYUFBVSxJQUFWLENBQWUsU0FBZixFQUx3QztBQU14QyxhQUFVLFFBQVYsR0FOd0M7RUFBWixFQU83QixLQVBIOzs7Ozs7Ozs7Ozs7OzttQkNBZSxZQUFXO0FBQ3RCOzs7QUFEc0I7QUFJdEIsU0FBSSxHQUFKOzs7QUFKc0IsU0FPbEIsWUFBSjs7O0FBUHNCLFNBVWxCLElBQUo7OztBQVZzQixTQWFsQixNQUFKOzs7QUFic0IsU0FnQmxCLEdBQUo7OztBQWhCc0Is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b250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMWQ0Y2NhNTBjMTA2YmRiNzA0ZDNcbiAqKi8iLCIvKipcbiAqIE1haW4gcHJvZ3JhbSwgdG8gc3RhcnQgYWxsIHVwLlxuICovXG5pbXBvcnQgQXN0ZXJvaWRzIGZyb20gXCJhc3Rlcm9pZHNcIjtcblxuXG5cbi8qKlxuICogTWFpbiB0byBzdGFydCBhbGwgdXAuXG4gKi9cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgYXN0ZXJvaWRzID0gQXN0ZXJvaWRzKCk7XG5cbiAgICBhc3Rlcm9pZHMuaW5pdChcImNhbnZhczFcIik7XG4gICAgYXN0ZXJvaWRzLmdhbWVMb29wKCk7XG59LCBmYWxzZSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9tYWluLmpzXG4gKiovIiwiLyoqXG4gKiBBc3Rlcm9pZHMsIHRoZSBHYW1lXG4gKi9cbmltcG9ydCBcInV0aWxzL3JlcXVlc3QtYW5pbS1mcmFtZVwiO1xuaW1wb3J0IENhbnZhcyBmcm9tIFwidXRpbHMvY2FudmFzXCI7XG5pbXBvcnQgVmVjdG9yIGZyb20gXCJ1dGlscy92ZWN0b3JcIjtcbmltcG9ydCBLZXkgZnJvbSBcInV0aWxzL2tleS1ldmVudHNcIjtcbmltcG9ydCBTaGlwIGZyb20gXCJzaGlwXCI7XG5pbXBvcnQgQnVsbGV0IGZyb20gXCJidWxsZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvLyBIb2xkIGdyYXBpYyBjb250ZXh0XG4gICAgdmFyIGN0eDtcblxuICAgIC8vIFJlbWVtYmVyIHRoZSB0aW1lIHNpbmNlIGxhc3QgdXBkYXRlICYgcmVuZGVyXG4gICAgdmFyIGxhc3RHYW1lVGljaztcblxuICAgIC8vIEhvbGQgdGhlIHNoaXBcbiAgICB2YXIgc2hpcDtcblxuICAgIC8vIEhvbGQgdGhlIGJ1bGxldHNcbiAgICB2YXIgYnVsbGV0O1xuXG4gICAgLy8gT2JqZWN0IGZvciBrZXlwcmVzc1xuICAgIHZhciBrZXk7XG5cbiAgICAvLyBHYW1lIGFyZWFcbiAgICB2YXIgd2lkdGg7XG4gICAgdmFyIGhlaWdodDtcblxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBzaXplIG9mIHRoZSBjYW52YXMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaW5pdChjYW52YXNJZCkge1xuICAgICAgICAvLyBTZXQgY2FudmFzIGRyYXdpbmcgY29udGV4dFxuICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzSWQpO1xuICAgICAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICAgIC8vIFJlc2l6ZSBjYW52YXMgYW5kIG1ha2UgaXQgbGlzdGVuIHRvIHdpbmRvdyByZXNpemUgZXZlbnRzXG4gICAgICAgIHZhciBjYW52YXNVdGlscyA9IENhbnZhcygpO1xuICAgICAgICBjYW52YXNVdGlscy5mdWxsV2luZG93KFwiY2FudmFzMVwiKTtcbiAgICAgICAgY2FudmFzVXRpbHMucmVzaXplT25XaW5kb3dSZXNpemUoXCJjYW52YXMxXCIpO1xuXG4gICAgICAgIC8vIFRPRE8gTmVlZCB0byBzdXBwb3J0IHJlc2l6ZVxuICAgICAgICB3aWR0aCA9IGNhbnZhcy53aWR0aDtcbiAgICAgICAgaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcblxuICAgICAgICAvLyBEZWZhdWx0IGRyYXcgc3R5bGVcbiAgICAgICAgLy9jdHgubGluZVdpZHRoID0gMTtcbiAgICAgICAgLy9jdHguc3Ryb2tlU3R5bGUgPSBcImhzbGEoMCwwJSwgMTAwJSwgMSlcIjtcblxuICAgICAgICAvLyBBZGQgdGhlIHNoaXAgYW5kIHBsYWNlIGl0IGluIHRoZSBtaWRkbGVcbiAgICAgICAgc2hpcCA9IG5ldyBTaGlwKCk7XG4gICAgICAgIHNoaXAubW92ZVRvKG5ldyBWZWN0b3IoY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAvIDIpKTtcblxuICAgICAgICAvLyBBZGQgQnVsbGV0c1xuICAgICAgICBidWxsZXQgPSBuZXcgQnVsbGV0KCk7XG5cbiAgICAgICAgLy8gS2V5IHByZXNzZWRcbiAgICAgICAga2V5ID0gS2V5KCk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgZnVuY3Rpb24gdXBkYXRlKHRkKSB7XG4gICAgICAgIHNoaXAudXBkYXRlKGtleSwgdGQsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICBidWxsZXQudXBkYXRlKGtleSwgdGQsIHNoaXAuZ2V0UG9zaXRpb24oKSk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICBzaGlwLmRyYXcoY3R4LCBrZXkpO1xuICAgICAgICBidWxsZXQuZHJhdyhjdHgpO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdhbWVMb29wKCkge1xuICAgICAgICAvLyBUaW1lZGlmZiBzaW5jZSBsYXN0IGZyYW1lIC8gZ2FtZXRpY2tcbiAgICAgICAgdmFyIG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIHZhciB0ZCA9IChub3cgLSAobGFzdEdhbWVUaWNrIHx8wqBub3cpKSAvIDEwMDA7XG4gICAgICAgIGxhc3RHYW1lVGljayA9IG5vdztcblxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1GcmFtZShnYW1lTG9vcCk7XG4gICAgICAgIHVwZGF0ZSh0ZCk7XG4gICAgICAgIHJlbmRlcigpO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIHJldHVybiB7XG4gICAgICAgIFwiaW5pdFwiOiBpbml0LFxuICAgICAgICBcImdhbWVMb29wXCI6IGdhbWVMb29wXG4gICAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2FzdGVyb2lkcy5qc1xuICoqLyIsIi8qKlxuICogU2hpbSBsYXllciwgcG9seWZpbGwsIGZvciByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgd2l0aCBzZXRUaW1lb3V0IGZhbGxiYWNrLlxuICovXG5cbi8qKlxuICogcmVxdWVzdEFuaW1GcmFtZVxuICovXG53aW5kb3cucmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fFxuICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcbiAgICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxuICAgICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XG4gICAgICAgIGZ1bmN0aW9uKCBjYWxsYmFjayApe1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG4gICAgICAgIH07XG59KSgpO1xuXG5cblxuLyoqXG4gKiBjYW5jZWxSZXF1ZXN0QW5pbUZyYW1lXG4gKi9cbndpbmRvdy5jYW5jZWxSZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB3aW5kb3cuY2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XG4gICAgICAgIHdpbmRvdy53ZWJraXRDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgd2luZG93Lm1vekNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fFxuICAgICAgICB3aW5kb3cub0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgIHx8XG4gICAgICAgIHdpbmRvdy5tc0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgfHxcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dDtcbn0pKCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy91dGlscy9yZXF1ZXN0LWFuaW0tZnJhbWUuanNcbiAqKi8iLCIvKipcbiAqIENhbnZhcyB1dGlsaXRpZXNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHNpemUgb2YgdGhlIGNhbnZhcy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmdWxsV2luZG93KGNhbnZhc0lkKSB7XG4gICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNJZCk7XG4gICAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICAgICBjdHguY2FudmFzLndpZHRoICA9IE1hdGguZmxvb3Iod2luZG93LmlubmVyV2lkdGgpIC0gMTtcbiAgICAgICAgIGN0eC5jYW52YXMuaGVpZ2h0ID0gTWF0aC5mbG9vcih3aW5kb3cuaW5uZXJIZWlnaHQpIC0gMTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogUmVzaXplIG9uIHdpbmRvdyByZXNpemUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVzaXplT25XaW5kb3dSZXNpemUoY2FudmFzSWQpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZnVsbFdpbmRvdyhjYW52YXNJZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICAvLyBSZXR1cm4gd2hhdHMgYWN0dWFsbHkgZXhwb3J0ZWRcbiAgICByZXR1cm4ge1xuICAgICAgICBmdWxsV2luZG93OiBmdWxsV2luZG93LFxuICAgICAgICByZXNpemVPbldpbmRvd1Jlc2l6ZTogcmVzaXplT25XaW5kb3dSZXNpemVcbiAgICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvdXRpbHMvY2FudmFzLmpzXG4gKiovIiwiLyoqXG4gKiBWZWN0b3IgbWF0aFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3Ige1xuXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICB0aGlzLnggPSB4IHx8wqAwO1xuICAgICAgICB0aGlzLnkgPSB5IHx8wqAwO1xuICAgIH1cblxuICAgIC8vIE11bHRpcGx5IHdpdGggc2NhbGFyXG4gICAgbXVscyhzY2FsYXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54ICogc2NhbGFyLCB0aGlzLnkgKiBzY2FsYXIpO1xuICAgIH1cblxuICAgIC8vIE11bHRpcGx5IGl0c2VsZiB3aXRoIHNjYWxhclxuICAgIGltdWxzKHNjYWxhcikge1xuICAgICAgICB0aGlzLnggKj0gc2NhbGFyO1xuICAgICAgICB0aGlzLnkgKj0gc2NhbGFyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBNdWx0aXBseSB3aXRoIHNjYWxhclxuICAgIGFkZHMoc2NhbGFyKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCArIHNjYWxhciwgdGhpcy55ICsgc2NhbGFyKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgaXRzZWxmIHdpdGggVmVjdG9yXG4gICAgaWFkZCh2ZWN0b3IpIHtcbiAgICAgICAgdGhpcy54ICs9IHZlY3Rvci54O1xuICAgICAgICB0aGlzLnkgKz0gdmVjdG9yLnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBhIGNsb25lXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCwgdGhpcy55KTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy91dGlscy92ZWN0b3IuanNcbiAqKi8iLCIvKipcbiAqIFRyYWNlIHRoZSBrZXlzIHByZXNzZWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgcHJlc3NlZCA9IHt9O1xuXG4gICAgLy8gT24ga2V5IHJlbGVhc2VcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBldmVudCA9PiB7XG4gICAgICAgIGRlbGV0ZSBwcmVzc2VkW2V2ZW50LmtleUNvZGVdO1xuICAgIH0pO1xuXG4gICAgLy8gT24ga2V5IHByZXNzXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldmVudCA9PiB7XG4gICAgICAgIHByZXNzZWRbZXZlbnQua2V5Q29kZV0gPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgLy8gUmV0dXJuIHdoYXQgdG8gZXhwb3J0XG4gICAgcmV0dXJuIHtcbiAgICAgICAgTEVGVDogICAzNyxcbiAgICAgICAgVVA6ICAgICAzOCxcbiAgICAgICAgUklHSFQ6ICAzOSxcbiAgICAgICAgRE9XTjogICA0MCxcbiAgICAgICAgU1BBQ0U6ICAzMixcbiAgICAgICAgQTogICAgICA2NSxcbiAgICAgICAgUzogICAgICA4MyxcbiAgICAgICAgRDogICAgICA2OCxcbiAgICAgICAgVzogICAgICA4NyxcblxuICAgICAgICBpc0Rvd246IGZ1bmN0aW9uKGtleTEsIGtleTIpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmVzc2VkW2tleTFdIHx8wqBwcmVzc2VkW2tleTJdO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3V0aWxzL2tleS1ldmVudHMuanNcbiAqKi8iLCIvKipcbiAqIFRoZSBzaGlwLlxuICovXG5pbXBvcnQgVmVjdG9yIGZyb20gXCJ1dGlscy92ZWN0b3JcIjtcbmltcG9ydCBGb3JjZSBmcm9tIFwidXRpbHMvZm9yY2VcIjtcblxuIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuXG4gICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICAgdmFyIGZvcmNlID0gbmV3IEZvcmNlKCk7XG5cbiAgICAgICAgIHRoaXMuaGVpZ2h0ICAgICA9IG9wdGlvbnMuaGVpZ2h0IHx8wqAyMDtcbiAgICAgICAgIHRoaXMud2lkdGggICAgICA9IG9wdGlvbnMud2lkdGggIHx8wqAxMDtcbiAgICAgICAgIHRoaXMucG9zaXRpb24gICA9IG9wdGlvbnMucG9zaXRpb24gfHwgbmV3IFZlY3RvcigpO1xuICAgICAgICAgdGhpcy52ZWxvY2l0eSAgID0gb3B0aW9ucy52ZWxvY2l0eSB8fMKgbmV3IFZlY3RvcigpO1xuICAgICAgICAgdGhpcy5zcGVlZCAgICAgID0gb3B0aW9ucy5zcGVlZCB8fCBuZXcgVmVjdG9yKCk7XG4gICAgICAgICB0aGlzLmRpcmVjdGlvbiAgPSBvcHRpb25zLmRpcmVjdGlvbiB8fMKgMDtcblxuICAgICAgICAgdGhpcy5hY2NlbGVyYXRlRm9yY2UgPSBvcHRpb25zLmFjY2VsZXJhdGVGb3JjZVxuICAgICAgICAgICAgfHzCoGZvcmNlLmNyZWF0ZUFjY2VsZXJhdGlvbihuZXcgVmVjdG9yKDgwLCA4MCkpO1xuICAgICAgICAgdGhpcy5icmVha0ZvcmNlID0gb3B0aW9ucy5icmVha0ZvcmNlIHx8wqBmb3JjZS5jcmVhdGVEYW1waW5nKDAuOTcpO1xuICAgICAgICAgdGhpcy5kYW1wRm9yY2UgID0gb3B0aW9ucy5kYW1wRm9yY2UgIHx8wqBmb3JjZS5jcmVhdGVEYW1waW5nKDAuOTk5KTtcbiAgICB9XG5cblxuXG4gICAgZHJhdyhjdHgsIGtleSkge1xuICAgICAgICB2YXIgeCA9IHRoaXMud2lkdGggLyAyO1xuICAgICAgICB2YXIgeSA9IHRoaXMuaGVpZ2h0IC8gMjtcblxuICAgICAgICBjdHgubGluZVdpZHRoID0gMTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ2hzbGEoMCwwJSwxMDAlLDEpJztcblxuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHgudHJhbnNsYXRlKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KTtcbiAgICAgICAgY3R4LnJvdGF0ZSh0aGlzLmRpcmVjdGlvbiArIE1hdGguUEkgLyAyKTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKDAsIC15KTtcbiAgICAgICAgY3R4LmxpbmVUbyh4LCB5KTtcbiAgICAgICAgY3R4LmxpbmVUbygwLCAwLjggKiB5KTtcbiAgICAgICAgY3R4LmxpbmVUbygteCwgeSk7XG4gICAgICAgIGN0eC5saW5lVG8oMCwgLXkpO1xuXG4gICAgICAgIGlmIChrZXkuaXNEb3duKGtleS5VUCwga2V5LlcpKSB7XG4gICAgICAgICAgICBjdHgubW92ZVRvKDAsIHkpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbygtMiwgeSArIDEwKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oMCwgeSArIDgpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbygyLCB5ICsgMTApO1xuICAgICAgICAgICAgY3R4LmxpbmVUbygwLCB5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXkuaXNEb3duKGtleS5ET1dOLCBrZXkuUykpIHtcbiAgICAgICAgICAgIGN0eC5tb3ZlVG8oeSArIDQsIDApO1xuICAgICAgICAgICAgY3R4LmFyYygwLCAwLCB5ICsgNCwgMCwgTWF0aC5QSSwgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG5cblxuICAgIG1vdmVUbyhwb3NpdGlvbikge1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgIHRoaXMucG9zaXRpb24ueCArPSB0aGlzLndpZHRoIC8gMjtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi55ICs9IHRoaXMuaGVpZ2h0IC8gMjtcbiAgICB9XG5cblxuXG4gICAgbW92ZUZvcndhcmQodGQpIHtcbiAgICAgICAgdGhpcy5kYW1wRm9yY2UodGhpcy5zcGVlZCwgdGQpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uLnggKz0gdGhpcy5zcGVlZC54ICogTWF0aC5jb3ModGhpcy5kaXJlY3Rpb24pICogdGQ7XG4gICAgICAgIHRoaXMucG9zaXRpb24ueSArPSB0aGlzLnNwZWVkLnkgKiBNYXRoLnNpbih0aGlzLmRpcmVjdGlvbikgKiB0ZDtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi5pYWRkKHRoaXMudmVsb2NpdHkubXVscyh0ZCkpO1xuICAgIH1cblxuXG4gICAgdGhyb3R0bGUodGQpIHtcbiAgICAgICAgdGhpcy5hY2NlbGVyYXRlRm9yY2UodGhpcy5zcGVlZCwgdGQpO1xuICAgIH1cblxuXG5cbiAgICByb3RhdGVMZWZ0KCkge1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiAtPSBNYXRoLlBJIC8gMzA7XG4gICAgfVxuXG5cblxuICAgIHJvdGF0ZVJpZ2h0KCkge1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiArPSBNYXRoLlBJIC8gMzA7XG4gICAgfVxuXG5cblxuICAgIGJyZWFrcyh0ZCkge1xuICAgICAgICB0aGlzLmJyZWFrRm9yY2UodGhpcy5zcGVlZCwgdGQpO1xuICAgICAgICB0aGlzLmJyZWFrRm9yY2UodGhpcy52ZWxvY2l0eSwgdGQpO1xuICAgIH1cblxuXG5cbiAgICB1cGRhdGUoa2V5LCB0ZCwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICBpZiAoa2V5LmlzRG93bihrZXkuVVAsIGtleS5XKSkge1xuICAgICAgICAgICAgdGhpcy50aHJvdHRsZSh0ZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5LmlzRG93bihrZXkuTEVGVCwga2V5LkEpKSB7XG4gICAgICAgICAgICB0aGlzLnJvdGF0ZUxlZnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXkuaXNEb3duKGtleS5ET1dOLCBrZXkuUykpIHtcbiAgICAgICAgICAgIHRoaXMuYnJlYWtzKHRkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXkuaXNEb3duKGtleS5SSUdIVCwga2V5LkQpKSB7XG4gICAgICAgICAgICB0aGlzLnJvdGF0ZVJpZ2h0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0ZvcmNlcy51cGRhdGUodGhpcy52ZWxvY2l0eSwgdGQpO1xuICAgICAgICB0aGlzLm1vdmVGb3J3YXJkKHRkKTtcbiAgICAgICAgdGhpcy5zdGF5SW5BcmVhKHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cblxuXG5cbiAgICBzdGF5SW5BcmVhKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueSA8IC10aGlzLmhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueSA+IGhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gLXRoaXMuaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueCA+IHdpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSAtdGhpcy53aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLnggPCAtdGhpcy53aWR0aCkge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gd2lkdGg7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG4gICAgZ2V0UG9zaXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3NoaXAuanNcbiAqKi8iLCIvKipcbiAqIFRoZSBmb3JjZSBhcm91bmQgdXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcmNlIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmFsbCA9IHt9O1xuICAgIH1cblxuICAgIGNyZWF0ZUFjY2VsZXJhdGlvbih2ZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuICh2ZWxvY2l0eSwgdGQpID0+IHtcbiAgICAgICAgICAgIHZlbG9jaXR5LmlhZGQodmVjdG9yLm11bHModGQpKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjcmVhdGVEYW1waW5nKGRhbXBpbmcpIHtcbiAgICAgICAgcmV0dXJuICh2ZWxvY2l0eSAvKiwgdGQgKi8pID0+IHtcbiAgICAgICAgICAgIHZlbG9jaXR5LmltdWxzKGRhbXBpbmcpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNyZWF0ZVdpbmQodmVjdG9yKSB7XG4gICAgICAgIHJldHVybiAodmVsb2NpdHksIHRkKSA9PiB7XG4gICAgICAgICAgICB2ZWxvY2l0eS5pYWRkKHZlY3Rvci5hZGRzKHRkKSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgYWRkQWNjZWxlcmF0aW9uKG5hbWUsIHZlY3Rvcikge1xuICAgICAgICB0aGlzLmFsbFtuYW1lXSA9IHRoaXMuY3JlYXRlQWNjZWxlcmF0aW9uKHZlY3Rvcik7XG4gICAgfVxuXG4gICAgYWRkRGFtcGluZyhuYW1lLCBkYW1waW5nKSB7XG4gICAgICAgIHRoaXMuYWxsW25hbWVdID0gdGhpcy5jcmVhdGVEYW1waW5nKGRhbXBpbmcpO1xuICAgIH1cblxuICAgIGFkZFdpbmQobmFtZSwgdmVjdG9yKSB7XG4gICAgICAgIHRoaXMuYWxsW25hbWVdID0gdGhpcy5jcmVhdGVXaW5kKHZlY3Rvcik7XG4gICAgfVxuXG4gICAgdXBkYXRlKG9iamVjdCwgdGQpIHtcbiAgICAgICAgZm9yICh2YXIgZm9yY2UgaW4gdGhpcy5hbGwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFsbC5oYXNPd25Qcm9wZXJ0eShmb3JjZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsbFtmb3JjZV0ob2JqZWN0LCB0ZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy91dGlscy9mb3JjZS5qc1xuICoqLyIsIi8qKlxuICogQnVsbGV0cy5cbiAqL1xuaW1wb3J0IFZlY3RvciBmcm9tIFwidXRpbHMvdmVjdG9yXCI7XG5cbiBleHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxsZXQge1xuXG4gICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuXG5cbi8vL1xuXG4gICAgICAgICB0aGlzLmhlaWdodCAgICAgPSBvcHRpb25zLmhlaWdodCB8fMKgMjA7XG4gICAgICAgICB0aGlzLndpZHRoICAgICAgPSBvcHRpb25zLndpZHRoICB8fMKgMTA7XG4gICAgICAgICB0aGlzLnBvc2l0aW9uICAgPSBvcHRpb25zLnBvc2l0aW9uIHx8IG5ldyBWZWN0b3IoKTtcbiAgICAgICAgIHRoaXMudmVsb2NpdHkgICA9IG9wdGlvbnMudmVsb2NpdHkgfHzCoG5ldyBWZWN0b3IoKTtcbiAgICAgICAgIHRoaXMuc3BlZWQgICAgICA9IG9wdGlvbnMuc3BlZWQgfHwgbmV3IFZlY3RvcigpO1xuICAgICAgICAgdGhpcy5kaXJlY3Rpb24gID0gb3B0aW9ucy5kaXJlY3Rpb24gfHzCoDA7XG4gICAgICAgICB0aGlzLmJ1bGxldHMgPSBbXTtcblxuICAgIH1cblxuXG5cbiAgICBkcmF3KGN0eCwga2V5KSB7XG5cbiAgICAgICAgY3R4LnNhdmUoKTtcblxuICAgICAgICBjdHgubGluZVdpZHRoID0gNTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ2hzbGEoMCwwJSwxMDAlLDEpJztcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZ2IoMjAwLDAsMClcIjtcbiAgICAgICAgY3R4LmZpbGxSZWN0ICgxMCwgMTAsIDUwLCA1MCk7XG5cbiAgICAgICAgY3R4Lm1vdmVUbygxMDAsIDEwMCk7XG4gICAgICAgIGN0eC5saW5lVG8oMjAwLCAyMDApO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuYnVsbGV0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgLy9jdHgudHJhbnNsYXRlKHRoaXMuYnVsbGV0c1tpXS54LCB0aGlzLmJ1bGxldHNbaV0ueSk7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHgubW92ZVRvKHRoaXMuYnVsbGV0c1tpXS54LCB0aGlzLmJ1bGxldHNbaV0ueSk7XG4gICAgICAgICAgICBjdHgubGluZVRvKHRoaXMuYnVsbGV0c1tpXS54ICsgMTAsIHRoaXMuYnVsbGV0c1tpXS55ICsgMTApO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL2N0eC5tb3ZlVG8oMCwgMCk7XG4gICAgICAgICAgICAvL2N0eC5saW5lVG8oMTAsIDEwKTtcbiAgICAgICAgICAgIFxuICAgIC8vICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgY3R4LmZpbGxSZWN0IChcbiAgICAgICAgICAgICAgICB0aGlzLmJ1bGxldHNbaV0ueCxcbiAgICAgICAgICAgICAgICB0aGlzLmJ1bGxldHNbaV0ueSxcbiAgICAgICAgICAgICAgICB0aGlzLmJ1bGxldHNbaV0ueCArIDEwLFxuICAgICAgICAgICAgICAgIHRoaXMuYnVsbGV0c1tpXS55ICsgMTBcbiAgICAgICAgICAgICk7Ki9cbi8qXG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKHRoaXMuYnVsbGV0c1tpXS54ICsgNDAsIHRoaXMuYnVsbGV0c1tpXS55ICsgNDApO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbygxMCwgMTApO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgKi9cbiAgICAgICAgfVxuXG4gICAgICAgIGN0eC5zdHJva2UoKTtcblxuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH1cblxuXG5cbiAgICBhZGQocG9zaXRpb24pIHtcbiAgICAgICAgdGhpcy5idWxsZXRzLnB1c2gocG9zaXRpb24uY2xvbmUoKSk7XG4gICAgfVxuXG5cbiAgICBtb3ZlKHRkKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLmJ1bGxldHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuYnVsbGV0c1tpXS54ICs9IDE7XG4gICAgICAgICAgICB0aGlzLmJ1bGxldHNbaV0ueSArPSAxO1xuICAgICAgICB9XG4gICAgICAgIC8qXG4gICAgICAgIHRoaXMuZGFtcEZvcmNlKHRoaXMuc3BlZWQsIHRkKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi54ICs9IHRoaXMuc3BlZWQueCAqIE1hdGguY29zKHRoaXMuZGlyZWN0aW9uKSAqIHRkO1xuICAgICAgICB0aGlzLnBvc2l0aW9uLnkgKz0gdGhpcy5zcGVlZC55ICogTWF0aC5zaW4odGhpcy5kaXJlY3Rpb24pICogdGQ7XG4gICAgICAgIHRoaXMucG9zaXRpb24uaWFkZCh0aGlzLnZlbG9jaXR5Lm11bHModGQpKTtcbiAgICAgICAgKi9cbiAgICB9XG5cblxuICAgIHVwZGF0ZShrZXksIHRkLCBwb3NpdGlvbikge1xuICAgICAgICBpZiAoa2V5LmlzRG93bihrZXkuU1BBQ0UpKSB7XG4gICAgICAgICAgICB0aGlzLmFkZChwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICAvL0ZvcmNlcy51cGRhdGUodGhpcy52ZWxvY2l0eSwgdGQpO1xuICAgICAgICB0aGlzLm1vdmUodGQpO1xuICAgICAgICAvL3RoaXMuc3RheUluQXJlYSh3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG5cblxuXG4gICAgc3RheUluQXJlYSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLnkgPCAtdGhpcy5oZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSA9IGhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLnkgPiBoZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSA9IC10aGlzLmhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLnggPiB3aWR0aCkge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gLXRoaXMud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi54IDwgLXRoaXMud2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCA9IHdpZHRoO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvYnVsbGV0LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==