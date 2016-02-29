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
	    }
	
	    /**
	     *
	     */
	    function render() {
	        ctx.clearRect(0, 0, width, height);
	        ship.draw(ctx, key);
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
	        'init': init,
	        'gameLoop': gameLoop
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDhkOWVlZWZhYjMxMzIzMTQ4MzciLCJ3ZWJwYWNrOi8vLy4vanMtc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vanMtc3JjL2FzdGVyb2lkcy5qcyIsIndlYnBhY2s6Ly8vLi9qcy1zcmMvdXRpbHMvcmVxdWVzdC1hbmltLWZyYW1lLmpzIiwid2VicGFjazovLy8uL2pzLXNyYy91dGlscy9jYW52YXMuanMiLCJ3ZWJwYWNrOi8vLy4vanMtc3JjL3V0aWxzL3ZlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9qcy1zcmMvdXRpbHMva2V5LWV2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9qcy1zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly8vLi9qcy1zcmMvdXRpbHMvZm9yY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVCQSxVQUFTLElBQVQsR0FBZ0I7QUFDWixnQkFEWTs7QUFHWixPQUFJLFlBQVksMEJBQVosQ0FIUTs7QUFLWixhQUFVLElBQVYsQ0FBZSxTQUFmLEVBTFk7QUFNWixhQUFVLFFBQVYsR0FOWTtFQUFoQjs7Ozs7QUFTQSxRQUFPLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLElBQWhDLEVBQXNDLEtBQXRDLEU7Ozs7Ozs7Ozs7OzttQkNWZSxZQUFXO0FBQ3RCOzs7QUFEc0I7QUFJdEIsU0FBSSxHQUFKOzs7QUFKc0IsU0FPbEIsWUFBSjs7O0FBUHNCLFNBVWxCLElBQUo7OztBQVZzQixTQWFsQixHQUFKOzs7QUFic0IsU0FnQmxCLEtBQUosQ0FoQnNCO0FBaUJ0QixTQUFJLE1B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TCxDQUF3QixNQUF4QixDQUFqQixDQUQwQjs7OztvQ0FJbkIsTUFBTSxTQUFTO0FBQ3RCLGtCQUFLLEdBQUwsQ0FBUyxJQUFULElBQWlCLEtBQUssYUFBTCxDQUFtQixPQUFuQixDQUFqQixDQURzQjs7OztpQ0FJbEIsTUFBTSxRQUFRO0FBQ2xCLGtCQUFLLEdBQUwsQ0FBUyxJQUFULElBQWlCLEtBQUssVUFBTCxDQUFnQixNQUFoQixDQUFqQixDQURrQjs7OztnQ0FJZixRQUFRLElBQUk7QUFDZixrQkFBSyxJQUFJLEtBQUosSUFBYSxLQUFLLEdBQUwsRUFBVTtBQUN4QixxQkFBSSxLQUFLLEdBQUwsQ0FBUyxjQUFULENBQXdCLEtBQXhCLENBQUosRUFBb0M7QUFDaEMsMEJBQUssR0FBTCxDQUFTLEtBQVQsRUFBZ0IsTUFBaEIsRUFBd0IsRUFBeEIsRUFEZ0M7a0JBQXBDO2NBREo7Ozs7WUFyQ2EiLCJmaWxlIjoiYXN0ZXJvaWRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA0OGQ5ZWVlZmFiMzEzMjMxNDgzN1xuICoqLyIsIi8qKlxuICogTWFpbiBwcm9ncmFtLCB0byBzdGFydCBhbGwgdXAuXG4gKi9cbmltcG9ydCBBc3Rlcm9pZHMgZnJvbSBcImFzdGVyb2lkc1wiO1xuXG5cblxuLyoqXG4gKiBNYWluIHRvIHN0YXJ0IGFsbCB1cC5cbiAqL1xuZnVuY3Rpb24gbWFpbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBhc3Rlcm9pZHMgPSBBc3Rlcm9pZHMoKTtcblxuICAgIGFzdGVyb2lkcy5pbml0KFwiY2FudmFzMVwiKTtcbiAgICBhc3Rlcm9pZHMuZ2FtZUxvb3AoKTtcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIG1haW4sIGZhbHNlKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMtc3JjL21haW4uanNcbiAqKi8iLCIvKipcbiAqIEFzdGVyb2lkcywgdGhlIEdhbWVcbiAqL1xuaW1wb3J0IFwidXRpbHMvcmVxdWVzdC1hbmltLWZyYW1lXCI7XG5pbXBvcnQgQ2FudmFzIGZyb20gXCJ1dGlscy9jYW52YXNcIjtcbmltcG9ydCBWZWN0b3IgZnJvbSBcInV0aWxzL3ZlY3RvclwiO1xuaW1wb3J0IEtleSBmcm9tIFwidXRpbHMva2V5LWV2ZW50c1wiO1xuaW1wb3J0IFNoaXAgZnJvbSBcInNoaXBcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvLyBIb2xkIGdyYXBpYyBjb250ZXh0XG4gICAgdmFyIGN0eDtcblxuICAgIC8vIFJlbWVtYmVyIHRoZSB0aW1lIHNpbmNlIGxhc3QgdXBkYXRlICYgcmVuZGVyXG4gICAgdmFyIGxhc3RHYW1lVGljaztcblxuICAgIC8vIEhvbGQgdGhlIHNoaXBcbiAgICB2YXIgc2hpcDtcblxuICAgIC8vIE9iamVjdCBmb3Iga2V5cHJlc3NcbiAgICB2YXIga2V5O1xuXG4gICAgLy8gR2FtZSBhcmVhXG4gICAgdmFyIHdpZHRoO1xuICAgIHZhciBoZWlnaHQ7XG5cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgc2l6ZSBvZiB0aGUgY2FudmFzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGluaXQoY2FudmFzSWQpIHtcbiAgICAgICAgLy8gU2V0IGNhbnZhcyBkcmF3aW5nIGNvbnRleHRcbiAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc0lkKTtcbiAgICAgICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgICAvLyBSZXNpemUgY2FudmFzIGFuZCBtYWtlIGl0IGxpc3RlbiB0byB3aW5kb3cgcmVzaXplIGV2ZW50c1xuICAgICAgICB2YXIgY2FudmFzVXRpbHMgPSBDYW52YXMoKTtcbiAgICAgICAgY2FudmFzVXRpbHMuZnVsbFdpbmRvdyhcImNhbnZhczFcIik7XG4gICAgICAgIGNhbnZhc1V0aWxzLnJlc2l6ZU9uV2luZG93UmVzaXplKFwiY2FudmFzMVwiKTtcblxuICAgICAgICAvLyBUT0RPIE5lZWQgdG8gc3VwcG9ydCByZXNpemVcbiAgICAgICAgd2lkdGggPSBjYW52YXMud2lkdGg7XG4gICAgICAgIGhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG5cbiAgICAgICAgLy8gRGVmYXVsdCBkcmF3IHN0eWxlXG4gICAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImhzbGEoMCwwJSwgMTAwJSwgMSlcIjtcblxuICAgICAgICAvLyBBZGQgdGhlIHNoaXAgYW5kIHBsYWNlIGl0IGluIHRoZSBtaWRkbGVcbiAgICAgICAgc2hpcCA9IG5ldyBTaGlwKCk7XG4gICAgICAgIHNoaXAubW92ZVRvKG5ldyBWZWN0b3IoY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAvIDIpKTtcblxuICAgICAgICAvLyBLZXkgcHJlc3NlZFxuICAgICAgICBrZXkgPSBLZXkoKTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB1cGRhdGUodGQpIHtcbiAgICAgICAgc2hpcC51cGRhdGUoa2V5LCB0ZCwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICBzaGlwLmRyYXcoY3R4LCBrZXkpO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdhbWVMb29wKCkge1xuICAgICAgICAvLyBUaW1lZGlmZiBzaW5jZSBsYXN0IGZyYW1lIC8gZ2FtZXRpY2tcbiAgICAgICAgdmFyIG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIHZhciB0ZCA9IChub3cgLSAobGFzdEdhbWVUaWNrIHx8wqBub3cpKSAvIDEwMDA7XG4gICAgICAgIGxhc3RHYW1lVGljayA9IG5vdztcblxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1GcmFtZShnYW1lTG9vcCk7XG4gICAgICAgIHVwZGF0ZSh0ZCk7XG4gICAgICAgIHJlbmRlcigpO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIHJldHVybiB7XG4gICAgICAgICdpbml0JzogaW5pdCxcbiAgICAgICAgJ2dhbWVMb29wJzogZ2FtZUxvb3BcbiAgICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy1zcmMvYXN0ZXJvaWRzLmpzXG4gKiovIiwiLyoqXG4gKiBTaGltIGxheWVyLCBwb2x5ZmlsbCwgZm9yIHJlcXVlc3RBbmltYXRpb25GcmFtZSB3aXRoIHNldFRpbWVvdXQgZmFsbGJhY2suXG4gKi9cblxuLyoqXG4gKiByZXF1ZXN0QW5pbUZyYW1lXG4gKi9cbndpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgIHx8XG4gICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fFxuICAgICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgIHx8XG4gICAgICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgfHxcbiAgICAgICAgZnVuY3Rpb24oIGNhbGxiYWNrICl7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICAgICAgfTtcbn0pKCk7XG5cblxuXG4vKipcbiAqIGNhbmNlbFJlcXVlc3RBbmltRnJhbWVcbiAqL1xud2luZG93LmNhbmNlbFJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gd2luZG93LmNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICB3aW5kb3cud2Via2l0Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5tb3pDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcbiAgICAgICAgd2luZG93Lm9DYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxuICAgICAgICB3aW5kb3cubXNDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQ7XG59KSgpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy1zcmMvdXRpbHMvcmVxdWVzdC1hbmltLWZyYW1lLmpzXG4gKiovIiwiLyoqXG4gKiBDYW52YXMgdXRpbGl0aWVzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBzaXplIG9mIHRoZSBjYW52YXMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZnVsbFdpbmRvdyhjYW52YXNJZCkge1xuICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzSWQpO1xuICAgICAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgICAgY3R4LmNhbnZhcy53aWR0aCAgPSBNYXRoLmZsb29yKHdpbmRvdy5pbm5lcldpZHRoKSAtIDE7XG4gICAgICAgICBjdHguY2FudmFzLmhlaWdodCA9IE1hdGguZmxvb3Iod2luZG93LmlubmVySGVpZ2h0KSAtIDE7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIFJlc2l6ZSBvbiB3aW5kb3cgcmVzaXplLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlc2l6ZU9uV2luZG93UmVzaXplKGNhbnZhc0lkKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZ1bGxXaW5kb3coY2FudmFzSWQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgLy8gUmV0dXJuIHdoYXRzIGFjdHVhbGx5IGV4cG9ydGVkXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZnVsbFdpbmRvdzogZnVsbFdpbmRvdyxcbiAgICAgICAgcmVzaXplT25XaW5kb3dSZXNpemU6IHJlc2l6ZU9uV2luZG93UmVzaXplXG4gICAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMtc3JjL3V0aWxzL2NhbnZhcy5qc1xuICoqLyIsIi8qKlxuICogVmVjdG9yIG1hdGhcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yIHtcblxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgdGhpcy54ID0geCB8fMKgMDtcbiAgICAgICAgdGhpcy55ID0geSB8fMKgMDtcbiAgICB9XG5cbiAgICAvLyBNdWx0aXBseSB3aXRoIHNjYWxhclxuICAgIG11bHMoc2NhbGFyKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCAqIHNjYWxhciwgdGhpcy55ICogc2NhbGFyKTtcbiAgICB9XG5cbiAgICAvLyBNdWx0aXBseSBpdHNlbGYgd2l0aCBzY2FsYXJcbiAgICBpbXVscyhzY2FsYXIpIHtcbiAgICAgICAgdGhpcy54ICo9IHNjYWxhcjtcbiAgICAgICAgdGhpcy55ICo9IHNjYWxhcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gTXVsdGlwbHkgd2l0aCBzY2FsYXJcbiAgICBhZGRzKHNjYWxhcikge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLnggKyBzY2FsYXIsIHRoaXMueSArIHNjYWxhcik7XG4gICAgfVxuXG4gICAgLy8gQWRkIGl0c2VsZiB3aXRoIFZlY3RvclxuICAgIGlhZGQodmVjdG9yKSB7XG4gICAgICAgIHRoaXMueCArPSB2ZWN0b3IueDtcbiAgICAgICAgdGhpcy55ICs9IHZlY3Rvci55O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzLXNyYy91dGlscy92ZWN0b3IuanNcbiAqKi8iLCIvKipcbiAqIFRyYWNlIHRoZSBrZXlzIHByZXNzZWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgcHJlc3NlZCA9IHt9O1xuXG4gICAgLy8gT24ga2V5IHJlbGVhc2VcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBldmVudCA9PiB7XG4gICAgICAgIGRlbGV0ZSBwcmVzc2VkW2V2ZW50LmtleUNvZGVdO1xuICAgIH0pO1xuXG4gICAgLy8gT24ga2V5IHByZXNzXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldmVudCA9PiB7XG4gICAgICAgIHByZXNzZWRbZXZlbnQua2V5Q29kZV0gPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgLy8gUmV0dXJuIHdoYXQgdG8gZXhwb3J0XG4gICAgcmV0dXJuIHtcbiAgICAgICAgTEVGVDogICAzNyxcbiAgICAgICAgVVA6ICAgICAzOCxcbiAgICAgICAgUklHSFQ6ICAzOSxcbiAgICAgICAgRE9XTjogICA0MCxcbiAgICAgICAgU1BBQ0U6ICAzMixcbiAgICAgICAgQTogICAgICA2NSxcbiAgICAgICAgUzogICAgICA4MyxcbiAgICAgICAgRDogICAgICA2OCxcbiAgICAgICAgVzogICAgICA4NyxcblxuICAgICAgICBpc0Rvd246IGZ1bmN0aW9uKGtleTEsIGtleTIpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmVzc2VkW2tleTFdIHx8wqBwcmVzc2VkW2tleTJdO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMtc3JjL3V0aWxzL2tleS1ldmVudHMuanNcbiAqKi8iLCIvKipcbiAqIFRoZSBzaGlwLlxuICovXG5pbXBvcnQgVmVjdG9yIGZyb20gXCJ1dGlscy92ZWN0b3JcIjtcbmltcG9ydCBGb3JjZSBmcm9tIFwidXRpbHMvZm9yY2VcIjtcblxuIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuXG4gICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICAgdmFyIGZvcmNlID0gbmV3IEZvcmNlKCk7XG5cbiAgICAgICAgIHRoaXMuaGVpZ2h0ICAgICA9IG9wdGlvbnMuaGVpZ2h0IHx8wqAyMDtcbiAgICAgICAgIHRoaXMud2lkdGggICAgICA9IG9wdGlvbnMud2lkdGggIHx8wqAxMDtcbiAgICAgICAgIHRoaXMucG9zaXRpb24gICA9IG9wdGlvbnMucG9zaXRpb24gfHwgbmV3IFZlY3RvcigpO1xuICAgICAgICAgdGhpcy52ZWxvY2l0eSAgID0gb3B0aW9ucy52ZWxvY2l0eSB8fMKgbmV3IFZlY3RvcigpO1xuICAgICAgICAgdGhpcy5zcGVlZCAgICAgID0gb3B0aW9ucy5zcGVlZCB8fCBuZXcgVmVjdG9yKCk7XG4gICAgICAgICB0aGlzLmRpcmVjdGlvbiAgPSBvcHRpb25zLmRpcmVjdGlvbiB8fMKgMDtcblxuICAgICAgICAgdGhpcy5hY2NlbGVyYXRlRm9yY2UgPSBvcHRpb25zLmFjY2VsZXJhdGVGb3JjZSB8fMKgZm9yY2UuY3JlYXRlQWNjZWxlcmF0aW9uKG5ldyBWZWN0b3IoODAsIDgwKSk7XG4gICAgICAgICB0aGlzLmJyZWFrRm9yY2UgPSBvcHRpb25zLmJyZWFrRm9yY2UgfHzCoGZvcmNlLmNyZWF0ZURhbXBpbmcoMC45Nyk7XG4gICAgICAgICB0aGlzLmRhbXBGb3JjZSA9IG9wdGlvbnMuZGFtcEZvcmNlIHx8wqBmb3JjZS5jcmVhdGVEYW1waW5nKDAuOTk5KTtcbiAgICB9XG5cblxuXG4gICAgZHJhdyhjdHgsIGtleSkge1xuICAgICAgICB2YXIgeCA9IHRoaXMud2lkdGggLyAyO1xuICAgICAgICB2YXIgeSA9IHRoaXMuaGVpZ2h0IC8gMjtcblxuICAgICAgICBjdHgubGluZVdpZHRoID0gMTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ2hzbGEoMCwwJSwxMDAlLDEpJztcblxuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHgudHJhbnNsYXRlKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KTtcbiAgICAgICAgY3R4LnJvdGF0ZSh0aGlzLmRpcmVjdGlvbiArIE1hdGguUEkgLyAyKTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKDAsIC15KTtcbiAgICAgICAgY3R4LmxpbmVUbyh4LCB5KTtcbiAgICAgICAgY3R4LmxpbmVUbygwLCAwLjggKiB5KTtcbiAgICAgICAgY3R4LmxpbmVUbygteCwgeSk7XG4gICAgICAgIGN0eC5saW5lVG8oMCwgLXkpO1xuXG4gICAgICAgIGlmIChrZXkuaXNEb3duKGtleS5VUCwga2V5LlcpKSB7XG4gICAgICAgICAgICBjdHgubW92ZVRvKDAsIHkpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbygtMiwgeSArIDEwKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oMCwgeSArIDgpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbygyLCB5ICsgMTApO1xuICAgICAgICAgICAgY3R4LmxpbmVUbygwLCB5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXkuaXNEb3duKGtleS5ET1dOLCBrZXkuUykpIHtcbiAgICAgICAgICAgIGN0eC5tb3ZlVG8oeSArIDQsIDApO1xuICAgICAgICAgICAgY3R4LmFyYygwLCAwLCB5ICsgNCwgMCwgTWF0aC5QSSwgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG5cblxuICAgIG1vdmVUbyhwb3NpdGlvbikge1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgIHRoaXMucG9zaXRpb24ueCArPSB0aGlzLndpZHRoIC8gMjtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi55ICs9IHRoaXMuaGVpZ2h0IC8gMjtcbiAgICB9XG5cblxuXG4gICAgbW92ZUZvcndhcmQodGQpIHtcbiAgICAgICAgdGhpcy5kYW1wRm9yY2UodGhpcy5zcGVlZCwgdGQpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uLnggKz0gdGhpcy5zcGVlZC54ICogTWF0aC5jb3ModGhpcy5kaXJlY3Rpb24pICogdGQ7XG4gICAgICAgIHRoaXMucG9zaXRpb24ueSArPSB0aGlzLnNwZWVkLnkgKiBNYXRoLnNpbih0aGlzLmRpcmVjdGlvbikgKiB0ZDtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi5pYWRkKHRoaXMudmVsb2NpdHkubXVscyh0ZCkpO1xuICAgIH1cblxuXG4gICAgdGhyb3R0bGUodGQpIHtcbiAgICAgICAgdGhpcy5hY2NlbGVyYXRlRm9yY2UodGhpcy5zcGVlZCwgdGQpO1xuICAgIH1cblxuXG5cbiAgICByb3RhdGVMZWZ0KCkge1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiAtPSBNYXRoLlBJIC8gMzA7XG4gICAgfVxuXG5cblxuICAgIHJvdGF0ZVJpZ2h0KCkge1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiArPSBNYXRoLlBJIC8gMzA7XG4gICAgfVxuXG5cblxuICAgIGJyZWFrcyh0ZCkge1xuICAgICAgICB0aGlzLmJyZWFrRm9yY2UodGhpcy5zcGVlZCwgdGQpO1xuICAgICAgICB0aGlzLmJyZWFrRm9yY2UodGhpcy52ZWxvY2l0eSwgdGQpO1xuICAgIH1cblxuXG5cbiAgICB1cGRhdGUoa2V5LCB0ZCwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICBpZiAoa2V5LmlzRG93bihrZXkuVVAsIGtleS5XKSkge1xuICAgICAgICAgICAgdGhpcy50aHJvdHRsZSh0ZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5LmlzRG93bihrZXkuTEVGVCwga2V5LkEpKSB7XG4gICAgICAgICAgICB0aGlzLnJvdGF0ZUxlZnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXkuaXNEb3duKGtleS5ET1dOLCBrZXkuUykpIHtcbiAgICAgICAgICAgIHRoaXMuYnJlYWtzKHRkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXkuaXNEb3duKGtleS5SSUdIVCwga2V5LkQpKSB7XG4gICAgICAgICAgICB0aGlzLnJvdGF0ZVJpZ2h0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0ZvcmNlcy51cGRhdGUodGhpcy52ZWxvY2l0eSwgdGQpO1xuICAgICAgICB0aGlzLm1vdmVGb3J3YXJkKHRkKTtcbiAgICAgICAgdGhpcy5zdGF5SW5BcmVhKHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cblxuXG5cbiAgICBzdGF5SW5BcmVhKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueSA8IC10aGlzLmhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueSA+IGhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gLXRoaXMuaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueCA+IHdpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSAtdGhpcy53aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLnggPCAtdGhpcy53aWR0aCkge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gd2lkdGg7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzLXNyYy9zaGlwLmpzXG4gKiovIiwiLyoqXG4gKiBUaGUgZm9yY2UgYXJvdW5kIHVzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JjZSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5hbGwgPSB7fTtcbiAgICB9XG5cbiAgICBjcmVhdGVBY2NlbGVyYXRpb24odmVjdG9yKSB7XG4gICAgICAgIHJldHVybiAodmVsb2NpdHksIHRkKSA9PiB7XG4gICAgICAgICAgICB2ZWxvY2l0eS5pYWRkKHZlY3Rvci5tdWxzKHRkKSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY3JlYXRlRGFtcGluZyhkYW1waW5nKSB7XG4gICAgICAgIHJldHVybiAodmVsb2NpdHkgLyosIHRkICovKSA9PiB7XG4gICAgICAgICAgICB2ZWxvY2l0eS5pbXVscyhkYW1waW5nKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjcmVhdGVXaW5kKHZlY3Rvcikge1xuICAgICAgICByZXR1cm4gKHZlbG9jaXR5LCB0ZCkgPT4ge1xuICAgICAgICAgICAgdmVsb2NpdHkuaWFkZCh2ZWN0b3IuYWRkcyh0ZCkpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGFkZEFjY2VsZXJhdGlvbihuYW1lLCB2ZWN0b3IpIHtcbiAgICAgICAgdGhpcy5hbGxbbmFtZV0gPSB0aGlzLmNyZWF0ZUFjY2VsZXJhdGlvbih2ZWN0b3IpO1xuICAgIH1cblxuICAgIGFkZERhbXBpbmcobmFtZSwgZGFtcGluZykge1xuICAgICAgICB0aGlzLmFsbFtuYW1lXSA9IHRoaXMuY3JlYXRlRGFtcGluZyhkYW1waW5nKTtcbiAgICB9XG5cbiAgICBhZGRXaW5kKG5hbWUsIHZlY3Rvcikge1xuICAgICAgICB0aGlzLmFsbFtuYW1lXSA9IHRoaXMuY3JlYXRlV2luZCh2ZWN0b3IpO1xuICAgIH1cblxuICAgIHVwZGF0ZShvYmplY3QsIHRkKSB7XG4gICAgICAgIGZvciAodmFyIGZvcmNlIGluIHRoaXMuYWxsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hbGwuaGFzT3duUHJvcGVydHkoZm9yY2UpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxbZm9yY2VdKG9iamVjdCwgdGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy1zcmMvdXRpbHMvZm9yY2UuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9