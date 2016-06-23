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
	function main() {
	  "use strict";
	
	  var asteroids = (0, _asteroids2.default)();
	
	  asteroids.init("canvas1");
	  asteroids.gameLoop();
	} /**
	   * Main program, to start all up.
	   */
	
	
	window.addEventListener("load", main, false);

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
	        ctx.lineWidth = 1;
	        ctx.strokeStyle = "hsla(0,0%, 100%, 1)";
	
	        // Add the ship and place it in the middle
	        ship = new _ship2.default();
	        ship.moveTo(new _vector2.default(canvas.width / 2, canvas.height / 2));
	
	        // Key pressed
	        key = (0, _keyEvents2.default)();
	    }
	
	    /**
	     *
	     */
	    function update(td) {
	        ship.update(key, td, width, height);
	        //bullet.update(key, td, width, height);
	    }
	
	    /**
	     *
	     */
	    function render() {
	        ctx.clearRect(0, 0, width, height);
	        ship.draw(ctx, key);
	        //bullet.draw(ctx);
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDBlZWY0ZWY1ZGZkMzQwNDdhNmEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FzdGVyb2lkcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvcmVxdWVzdC1hbmltLWZyYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9jYW52YXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3ZlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMva2V5LWV2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc2hpcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvZm9yY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVCQSxVQUFTLElBQVQsR0FBZ0I7QUFDWixnQkFEWTs7QUFHWixPQUFJLFlBQVksMEJBQVosQ0FIUTs7QUFLWixhQUFVLElBQVYsQ0FBZSxTQUFmLEVBTFk7QUFNWixhQUFVLFFBQVYsR0FOWTtFQUFoQjs7Ozs7QUFTQSxRQUFPLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLElBQWhDLEVBQXNDLEtBQXRDLEU7Ozs7Ozs7Ozs7OzttQkNUZSxZQUFXO0FBQ3RCOzs7QUFEc0I7QUFJdEIsU0FBSSxHQUFKOzs7QUFKc0IsU0FPbEIsWUFBSjs7O0FBUHNCLFNBVWxCLElBQUo7OztBQVZzQixTQWFsQixHQUFKOzs7QUFic0IsU0FnQmxCLEtBQUosQ0FoQnNCO0FBaUJ0QixTQUFJLE1B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QUFMLENBQXdCLE1BQXhCLENBQWpCLENBRDBCOzs7O29DQUluQixNQUFNLFNBQVM7QUFDdEIsa0JBQUssR0FBTCxDQUFTLElBQVQsSUFBaUIsS0FBSyxhQUFMLENBQW1CLE9BQW5CLENBQWpCLENBRHNCOzs7O2lDQUlsQixNQUFNLFFBQVE7QUFDbEIsa0JBQUssR0FBTCxDQUFTLElBQVQsSUFBaUIsS0FBSyxVQUFMLENBQWdCLE1BQWhCLENBQWpCLENBRGtCOzs7O2dDQUlmLFFBQVEsSUFBSTtBQUNmLGtCQUFLLElBQUksS0FBSixJQUFhLEtBQUssR0FBTCxFQUFVO0FBQ3hCLHFCQUFJLEtBQUssR0FBTCxDQUFTLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBSixFQUFvQztBQUNoQywwQkFBSyxHQUFMLENBQVMsS0FBVCxFQUFnQixNQUFoQixFQUF3QixFQUF4QixFQURnQztrQkFBcEM7Y0FESjs7OztZQXJDYSIsImZpbGUiOiJ3ZWJyb290L2pzL2FzdGVyb2lkcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNDBlZWY0ZWY1ZGZkMzQwNDdhNmFcbiAqKi8iLCIvKipcbiAqIE1haW4gcHJvZ3JhbSwgdG8gc3RhcnQgYWxsIHVwLlxuICovXG5pbXBvcnQgQXN0ZXJvaWRzIGZyb20gXCJhc3Rlcm9pZHNcIjtcblxuXG5cbi8qKlxuICogTWFpbiB0byBzdGFydCBhbGwgdXAuXG4gKi9cbmZ1bmN0aW9uIG1haW4oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgYXN0ZXJvaWRzID0gQXN0ZXJvaWRzKCk7XG5cbiAgICBhc3Rlcm9pZHMuaW5pdChcImNhbnZhczFcIik7XG4gICAgYXN0ZXJvaWRzLmdhbWVMb29wKCk7XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBtYWluLCBmYWxzZSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9tYWluLmpzXG4gKiovIiwiLyoqXG4gKiBBc3Rlcm9pZHMsIHRoZSBHYW1lXG4gKi9cbmltcG9ydCBcInV0aWxzL3JlcXVlc3QtYW5pbS1mcmFtZVwiO1xuaW1wb3J0IENhbnZhcyBmcm9tIFwidXRpbHMvY2FudmFzXCI7XG5pbXBvcnQgVmVjdG9yIGZyb20gXCJ1dGlscy92ZWN0b3JcIjtcbmltcG9ydCBLZXkgZnJvbSBcInV0aWxzL2tleS1ldmVudHNcIjtcbmltcG9ydCBTaGlwIGZyb20gXCJzaGlwXCI7XG4vL2ltcG9ydCBCdWxsZXQgZnJvbSBcImJ1bGxldFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8vIEhvbGQgZ3JhcGljIGNvbnRleHRcbiAgICB2YXIgY3R4O1xuXG4gICAgLy8gUmVtZW1iZXIgdGhlIHRpbWUgc2luY2UgbGFzdCB1cGRhdGUgJiByZW5kZXJcbiAgICB2YXIgbGFzdEdhbWVUaWNrO1xuXG4gICAgLy8gSG9sZCB0aGUgc2hpcFxuICAgIHZhciBzaGlwO1xuXG4gICAgLy8gT2JqZWN0IGZvciBrZXlwcmVzc1xuICAgIHZhciBrZXk7XG5cbiAgICAvLyBHYW1lIGFyZWFcbiAgICB2YXIgd2lkdGg7XG4gICAgdmFyIGhlaWdodDtcblxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBzaXplIG9mIHRoZSBjYW52YXMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaW5pdChjYW52YXNJZCkge1xuICAgICAgICAvLyBTZXQgY2FudmFzIGRyYXdpbmcgY29udGV4dFxuICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzSWQpO1xuICAgICAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICAgIC8vIFJlc2l6ZSBjYW52YXMgYW5kIG1ha2UgaXQgbGlzdGVuIHRvIHdpbmRvdyByZXNpemUgZXZlbnRzXG4gICAgICAgIHZhciBjYW52YXNVdGlscyA9IENhbnZhcygpO1xuICAgICAgICBjYW52YXNVdGlscy5mdWxsV2luZG93KFwiY2FudmFzMVwiKTtcbiAgICAgICAgY2FudmFzVXRpbHMucmVzaXplT25XaW5kb3dSZXNpemUoXCJjYW52YXMxXCIpO1xuXG4gICAgICAgIC8vIFRPRE8gTmVlZCB0byBzdXBwb3J0IHJlc2l6ZVxuICAgICAgICB3aWR0aCA9IGNhbnZhcy53aWR0aDtcbiAgICAgICAgaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcblxuICAgICAgICAvLyBEZWZhdWx0IGRyYXcgc3R5bGVcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiaHNsYSgwLDAlLCAxMDAlLCAxKVwiO1xuXG4gICAgICAgIC8vIEFkZCB0aGUgc2hpcCBhbmQgcGxhY2UgaXQgaW4gdGhlIG1pZGRsZVxuICAgICAgICBzaGlwID0gbmV3IFNoaXAoKTtcbiAgICAgICAgc2hpcC5tb3ZlVG8obmV3IFZlY3RvcihjYW52YXMud2lkdGggLyAyLCBjYW52YXMuaGVpZ2h0IC8gMikpO1xuXG4gICAgICAgIC8vIEtleSBwcmVzc2VkXG4gICAgICAgIGtleSA9IEtleSgpO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHVwZGF0ZSh0ZCkge1xuICAgICAgICBzaGlwLnVwZGF0ZShrZXksIHRkLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgLy9idWxsZXQudXBkYXRlKGtleSwgdGQsIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgc2hpcC5kcmF3KGN0eCwga2V5KTtcbiAgICAgICAgLy9idWxsZXQuZHJhdyhjdHgpO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdhbWVMb29wKCkge1xuICAgICAgICAvLyBUaW1lZGlmZiBzaW5jZSBsYXN0IGZyYW1lIC8gZ2FtZXRpY2tcbiAgICAgICAgdmFyIG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIHZhciB0ZCA9IChub3cgLSAobGFzdEdhbWVUaWNrIHx8wqBub3cpKSAvIDEwMDA7XG4gICAgICAgIGxhc3RHYW1lVGljayA9IG5vdztcblxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1GcmFtZShnYW1lTG9vcCk7XG4gICAgICAgIHVwZGF0ZSh0ZCk7XG4gICAgICAgIHJlbmRlcigpO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIHJldHVybiB7XG4gICAgICAgIFwiaW5pdFwiOiBpbml0LFxuICAgICAgICBcImdhbWVMb29wXCI6IGdhbWVMb29wXG4gICAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2FzdGVyb2lkcy5qc1xuICoqLyIsIi8qKlxuICogU2hpbSBsYXllciwgcG9seWZpbGwsIGZvciByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgd2l0aCBzZXRUaW1lb3V0IGZhbGxiYWNrLlxuICovXG5cbi8qKlxuICogcmVxdWVzdEFuaW1GcmFtZVxuICovXG53aW5kb3cucmVxdWVzdEFuaW1GcmFtZSA9IChmdW5jdGlvbigpe1xuICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICB8fFxuICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcbiAgICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxuICAgICAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XG4gICAgICAgIGZ1bmN0aW9uKCBjYWxsYmFjayApe1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG4gICAgICAgIH07XG59KSgpO1xuXG5cblxuLyoqXG4gKiBjYW5jZWxSZXF1ZXN0QW5pbUZyYW1lXG4gKi9cbndpbmRvdy5jYW5jZWxSZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHdpbmRvdy5jYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgd2luZG93LndlYmtpdENhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICB3aW5kb3cubW96Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XG4gICAgICAgIHdpbmRvdy5vQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgfHxcbiAgICAgICAgd2luZG93Lm1zQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICB8fFxuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0O1xufSkoKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3V0aWxzL3JlcXVlc3QtYW5pbS1mcmFtZS5qc1xuICoqLyIsIi8qKlxuICogQ2FudmFzIHV0aWxpdGllc1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgc2l6ZSBvZiB0aGUgY2FudmFzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGZ1bGxXaW5kb3coY2FudmFzSWQpIHtcbiAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc0lkKTtcbiAgICAgICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgICAgIGN0eC5jYW52YXMud2lkdGggID0gTWF0aC5mbG9vcih3aW5kb3cuaW5uZXJXaWR0aCkgLSAxO1xuICAgICAgICAgY3R4LmNhbnZhcy5oZWlnaHQgPSBNYXRoLmZsb29yKHdpbmRvdy5pbm5lckhlaWdodCkgLSAxO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBSZXNpemUgb24gd2luZG93IHJlc2l6ZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZXNpemVPbldpbmRvd1Jlc2l6ZShjYW52YXNJZCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmdWxsV2luZG93KGNhbnZhc0lkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIC8vIFJldHVybiB3aGF0cyBhY3R1YWxseSBleHBvcnRlZFxuICAgIHJldHVybiB7XG4gICAgICAgIGZ1bGxXaW5kb3c6IGZ1bGxXaW5kb3csXG4gICAgICAgIHJlc2l6ZU9uV2luZG93UmVzaXplOiByZXNpemVPbldpbmRvd1Jlc2l6ZVxuICAgIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy91dGlscy9jYW52YXMuanNcbiAqKi8iLCIvKipcbiAqIFZlY3RvciBtYXRoXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvciB7XG5cbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHRoaXMueCA9IHggfHzCoDA7XG4gICAgICAgIHRoaXMueSA9IHkgfHzCoDA7XG4gICAgfVxuXG4gICAgLy8gTXVsdGlwbHkgd2l0aCBzY2FsYXJcbiAgICBtdWxzKHNjYWxhcikge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLnggKiBzY2FsYXIsIHRoaXMueSAqIHNjYWxhcik7XG4gICAgfVxuXG4gICAgLy8gTXVsdGlwbHkgaXRzZWxmIHdpdGggc2NhbGFyXG4gICAgaW11bHMoc2NhbGFyKSB7XG4gICAgICAgIHRoaXMueCAqPSBzY2FsYXI7XG4gICAgICAgIHRoaXMueSAqPSBzY2FsYXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIE11bHRpcGx5IHdpdGggc2NhbGFyXG4gICAgYWRkcyhzY2FsYXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54ICsgc2NhbGFyLCB0aGlzLnkgKyBzY2FsYXIpO1xuICAgIH1cblxuICAgIC8vIEFkZCBpdHNlbGYgd2l0aCBWZWN0b3JcbiAgICBpYWRkKHZlY3Rvcikge1xuICAgICAgICB0aGlzLnggKz0gdmVjdG9yLng7XG4gICAgICAgIHRoaXMueSArPSB2ZWN0b3IueTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvdXRpbHMvdmVjdG9yLmpzXG4gKiovIiwiLyoqXG4gKiBUcmFjZSB0aGUga2V5cyBwcmVzc2VkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIHByZXNzZWQgPSB7fTtcblxuICAgIC8vIE9uIGtleSByZWxlYXNlXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXZlbnQgPT4ge1xuICAgICAgICBkZWxldGUgcHJlc3NlZFtldmVudC5rZXlDb2RlXTtcbiAgICB9KTtcblxuICAgIC8vIE9uIGtleSBwcmVzc1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnQgPT4ge1xuICAgICAgICBwcmVzc2VkW2V2ZW50LmtleUNvZGVdID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIC8vIFJldHVybiB3aGF0IHRvIGV4cG9ydFxuICAgIHJldHVybiB7XG4gICAgICAgIExFRlQ6ICAgMzcsXG4gICAgICAgIFVQOiAgICAgMzgsXG4gICAgICAgIFJJR0hUOiAgMzksXG4gICAgICAgIERPV046ICAgNDAsXG4gICAgICAgIFNQQUNFOiAgMzIsXG4gICAgICAgIEE6ICAgICAgNjUsXG4gICAgICAgIFM6ICAgICAgODMsXG4gICAgICAgIEQ6ICAgICAgNjgsXG4gICAgICAgIFc6ICAgICAgODcsXG5cbiAgICAgICAgaXNEb3duOiBmdW5jdGlvbihrZXkxLCBrZXkyKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJlc3NlZFtrZXkxXSB8fMKgcHJlc3NlZFtrZXkyXTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy91dGlscy9rZXktZXZlbnRzLmpzXG4gKiovIiwiLyoqXG4gKiBUaGUgc2hpcC5cbiAqL1xuaW1wb3J0IFZlY3RvciBmcm9tIFwidXRpbHMvdmVjdG9yXCI7XG5pbXBvcnQgRm9yY2UgZnJvbSBcInV0aWxzL2ZvcmNlXCI7XG5cbiBleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcblxuICAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgIHZhciBmb3JjZSA9IG5ldyBGb3JjZSgpO1xuXG4gICAgICAgICB0aGlzLmhlaWdodCAgICAgPSBvcHRpb25zLmhlaWdodCB8fMKgMjA7XG4gICAgICAgICB0aGlzLndpZHRoICAgICAgPSBvcHRpb25zLndpZHRoICB8fMKgMTA7XG4gICAgICAgICB0aGlzLnBvc2l0aW9uICAgPSBvcHRpb25zLnBvc2l0aW9uIHx8IG5ldyBWZWN0b3IoKTtcbiAgICAgICAgIHRoaXMudmVsb2NpdHkgICA9IG9wdGlvbnMudmVsb2NpdHkgfHzCoG5ldyBWZWN0b3IoKTtcbiAgICAgICAgIHRoaXMuc3BlZWQgICAgICA9IG9wdGlvbnMuc3BlZWQgfHwgbmV3IFZlY3RvcigpO1xuICAgICAgICAgdGhpcy5kaXJlY3Rpb24gID0gb3B0aW9ucy5kaXJlY3Rpb24gfHzCoDA7XG5cbiAgICAgICAgIHRoaXMuYWNjZWxlcmF0ZUZvcmNlID0gb3B0aW9ucy5hY2NlbGVyYXRlRm9yY2UgfHzCoGZvcmNlLmNyZWF0ZUFjY2VsZXJhdGlvbihuZXcgVmVjdG9yKDgwLCA4MCkpO1xuICAgICAgICAgdGhpcy5icmVha0ZvcmNlID0gb3B0aW9ucy5icmVha0ZvcmNlIHx8wqBmb3JjZS5jcmVhdGVEYW1waW5nKDAuOTcpO1xuICAgICAgICAgdGhpcy5kYW1wRm9yY2UgPSBvcHRpb25zLmRhbXBGb3JjZSB8fMKgZm9yY2UuY3JlYXRlRGFtcGluZygwLjk5OSk7XG4gICAgfVxuXG5cblxuICAgIGRyYXcoY3R4LCBrZXkpIHtcbiAgICAgICAgdmFyIHggPSB0aGlzLndpZHRoIC8gMjtcbiAgICAgICAgdmFyIHkgPSB0aGlzLmhlaWdodCAvIDI7XG5cbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdoc2xhKDAsMCUsMTAwJSwxKSc7XG5cbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4LnRyYW5zbGF0ZSh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSk7XG4gICAgICAgIGN0eC5yb3RhdGUodGhpcy5kaXJlY3Rpb24gKyBNYXRoLlBJIC8gMik7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbygwLCAteSk7XG4gICAgICAgIGN0eC5saW5lVG8oeCwgeSk7XG4gICAgICAgIGN0eC5saW5lVG8oMCwgMC44ICogeSk7XG4gICAgICAgIGN0eC5saW5lVG8oLXgsIHkpO1xuICAgICAgICBjdHgubGluZVRvKDAsIC15KTtcblxuICAgICAgICBpZiAoa2V5LmlzRG93bihrZXkuVVAsIGtleS5XKSkge1xuICAgICAgICAgICAgY3R4Lm1vdmVUbygwLCB5KTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oLTIsIHkgKyAxMCk7XG4gICAgICAgICAgICBjdHgubGluZVRvKDAsIHkgKyA4KTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oMiwgeSArIDEwKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oMCwgeSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5LmlzRG93bihrZXkuRE9XTiwga2V5LlMpKSB7XG4gICAgICAgICAgICBjdHgubW92ZVRvKHkgKyA0LCAwKTtcbiAgICAgICAgICAgIGN0eC5hcmMoMCwgMCwgeSArIDQsIDAsIE1hdGguUEksIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH1cblxuXG5cbiAgICBtb3ZlVG8ocG9zaXRpb24pIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgICB0aGlzLnBvc2l0aW9uLnggKz0gdGhpcy53aWR0aCAvIDI7XG4gICAgICAgIHRoaXMucG9zaXRpb24ueSArPSB0aGlzLmhlaWdodCAvIDI7XG4gICAgfVxuXG5cblxuICAgIG1vdmVGb3J3YXJkKHRkKSB7XG4gICAgICAgIHRoaXMuZGFtcEZvcmNlKHRoaXMuc3BlZWQsIHRkKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi54ICs9IHRoaXMuc3BlZWQueCAqIE1hdGguY29zKHRoaXMuZGlyZWN0aW9uKSAqIHRkO1xuICAgICAgICB0aGlzLnBvc2l0aW9uLnkgKz0gdGhpcy5zcGVlZC55ICogTWF0aC5zaW4odGhpcy5kaXJlY3Rpb24pICogdGQ7XG4gICAgICAgIHRoaXMucG9zaXRpb24uaWFkZCh0aGlzLnZlbG9jaXR5Lm11bHModGQpKTtcbiAgICB9XG5cblxuICAgIHRocm90dGxlKHRkKSB7XG4gICAgICAgIHRoaXMuYWNjZWxlcmF0ZUZvcmNlKHRoaXMuc3BlZWQsIHRkKTtcbiAgICB9XG5cblxuXG4gICAgcm90YXRlTGVmdCgpIHtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gLT0gTWF0aC5QSSAvIDMwO1xuICAgIH1cblxuXG5cbiAgICByb3RhdGVSaWdodCgpIHtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gKz0gTWF0aC5QSSAvIDMwO1xuICAgIH1cblxuXG5cbiAgICBicmVha3ModGQpIHtcbiAgICAgICAgdGhpcy5icmVha0ZvcmNlKHRoaXMuc3BlZWQsIHRkKTtcbiAgICAgICAgdGhpcy5icmVha0ZvcmNlKHRoaXMudmVsb2NpdHksIHRkKTtcbiAgICB9XG5cblxuXG4gICAgdXBkYXRlKGtleSwgdGQsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgaWYgKGtleS5pc0Rvd24oa2V5LlVQLCBrZXkuVykpIHtcbiAgICAgICAgICAgIHRoaXMudGhyb3R0bGUodGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleS5pc0Rvd24oa2V5LkxFRlQsIGtleS5BKSkge1xuICAgICAgICAgICAgdGhpcy5yb3RhdGVMZWZ0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5LmlzRG93bihrZXkuRE9XTiwga2V5LlMpKSB7XG4gICAgICAgICAgICB0aGlzLmJyZWFrcyh0ZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5LmlzRG93bihrZXkuUklHSFQsIGtleS5EKSkge1xuICAgICAgICAgICAgdGhpcy5yb3RhdGVSaWdodCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9Gb3JjZXMudXBkYXRlKHRoaXMudmVsb2NpdHksIHRkKTtcbiAgICAgICAgdGhpcy5tb3ZlRm9yd2FyZCh0ZCk7XG4gICAgICAgIHRoaXMuc3RheUluQXJlYSh3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG5cblxuXG4gICAgc3RheUluQXJlYSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLnkgPCAtdGhpcy5oZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSA9IGhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLnkgPiBoZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueSA9IC10aGlzLmhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLnggPiB3aWR0aCkge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gLXRoaXMud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbi54IDwgLXRoaXMud2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCA9IHdpZHRoO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvc2hpcC5qc1xuICoqLyIsIi8qKlxuICogVGhlIGZvcmNlIGFyb3VuZCB1cy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9yY2Uge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYWxsID0ge307XG4gICAgfVxuXG4gICAgY3JlYXRlQWNjZWxlcmF0aW9uKHZlY3Rvcikge1xuICAgICAgICByZXR1cm4gKHZlbG9jaXR5LCB0ZCkgPT4ge1xuICAgICAgICAgICAgdmVsb2NpdHkuaWFkZCh2ZWN0b3IubXVscyh0ZCkpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNyZWF0ZURhbXBpbmcoZGFtcGluZykge1xuICAgICAgICByZXR1cm4gKHZlbG9jaXR5IC8qLCB0ZCAqLykgPT4ge1xuICAgICAgICAgICAgdmVsb2NpdHkuaW11bHMoZGFtcGluZyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY3JlYXRlV2luZCh2ZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuICh2ZWxvY2l0eSwgdGQpID0+IHtcbiAgICAgICAgICAgIHZlbG9jaXR5LmlhZGQodmVjdG9yLmFkZHModGQpKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBhZGRBY2NlbGVyYXRpb24obmFtZSwgdmVjdG9yKSB7XG4gICAgICAgIHRoaXMuYWxsW25hbWVdID0gdGhpcy5jcmVhdGVBY2NlbGVyYXRpb24odmVjdG9yKTtcbiAgICB9XG5cbiAgICBhZGREYW1waW5nKG5hbWUsIGRhbXBpbmcpIHtcbiAgICAgICAgdGhpcy5hbGxbbmFtZV0gPSB0aGlzLmNyZWF0ZURhbXBpbmcoZGFtcGluZyk7XG4gICAgfVxuXG4gICAgYWRkV2luZChuYW1lLCB2ZWN0b3IpIHtcbiAgICAgICAgdGhpcy5hbGxbbmFtZV0gPSB0aGlzLmNyZWF0ZVdpbmQodmVjdG9yKTtcbiAgICB9XG5cbiAgICB1cGRhdGUob2JqZWN0LCB0ZCkge1xuICAgICAgICBmb3IgKHZhciBmb3JjZSBpbiB0aGlzLmFsbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYWxsLmhhc093blByb3BlcnR5KGZvcmNlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxsW2ZvcmNlXShvYmplY3QsIHRkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3V0aWxzL2ZvcmNlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==