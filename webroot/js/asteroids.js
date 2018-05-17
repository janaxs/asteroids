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
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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
	
	    // Hud
	    var hud = void 0;
	
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
	
	        // Hud
	        hud = (0, _hud2.default)();
	        hud.init();
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
	
	var _hud = __webpack_require__(9);
	
	var _hud2 = _interopRequireDefault(_hud);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports) {

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

/***/ }),
/* 3 */
/***/ (function(module, exports) {

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

/***/ }),
/* 4 */
/***/ (function(module, exports) {

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

/***/ }),
/* 5 */
/***/ (function(module, exports) {

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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

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
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
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

/***/ }),
/* 7 */
/***/ (function(module, exports) {

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

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

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
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	        _classCallCheck(this, Bullet);
	
	        ///
	
	        this.height = options.height || 20;
	        this.width = options.width || 10;
	        this.position = options.position || new _vector2.default();
	        this.velocity = options.velocity || new _vector2.default();
	        this.speed = options.speed || new _vector2.default();
	        this.direction = options.direction || 0;
	        this.bullets = [];
	        this.ticksSinceLastAdd = 0;
	    }
	
	    _createClass(Bullet, [{
	        key: "draw",
	        value: function draw(ctx, key) {
	
	            ctx.save();
	
	            // ctx.lineWidth = 5;
	            // ctx.strokeStyle = 'hsla(0,0%,100%,1)';
	
	            // ctx.fillStyle = "rgb(200,0,0)";
	            // ctx.fillRect (10, 10, 50, 50);
	
	            // ctx.moveTo(100, 100);
	            // ctx.lineTo(200, 200);
	            //console.log(this.bullets.length);
	
	            for (var i = 0, len = this.bullets.length; i < len; i++) {
	                //
	                // ctx.translate(this.bullets[i].x, this.bullets[i].y);
	                // ctx.beginPath();
	                // ctx.moveTo(this.bullets[i].x, this.bullets[i].y);
	                // ctx.lineTo(this.bullets[i].x + 10, this.bullets[i].y + 10);
	
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
	
	                ctx.fillStyle = "rgb(255, 255, 255)";
	                ctx.fillRect(this.bullets[i].x, this.bullets[i].y, 4, 4);
	            }
	
	            ctx.stroke();
	
	            ctx.restore();
	        }
	    }, {
	        key: "add",
	        value: function add(position) {
	            console.log(this.bullets.length);
	
	            if (this.bullets.length < 10) {
	                this.bullets.push(position.clone());
	                this.ticksSinceLastAdd = 10;
	            }
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
	            // Delay shot when recently did shoot
	            if (this.ticksSinceLastAdd > 0) {
	                this.ticksSinceLastAdd--;
	            }
	
	            if (key.isDown(key.SPACE) && this.ticksSinceLastAdd === 0) {
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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function () {
	    "use strict";
	
	    var fullscreenElement;
	
	    /**
	     * Initiate the Hud.
	     */
	    function init(hudId) {
	        var body = document.getElementById("body1");
	        var fullscreenElement = document.getElementById("fullscreen");
	
	        console.log("Init hud");
	        fullscreenElement.addEventListener("click", function () {
	            console.log("Request fullscreen");
	            body.webkitRequestFullscreen();
	        });
	    }
	
	    /**
	     * Return whats actually exported
	     */
	    return {
	        "init": init
	    };
	};
	
	var _fullscreen = __webpack_require__(10);
	
	var _fullscreen2 = _interopRequireDefault(_fullscreen);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function () {
	  "use strict";
	
	  var canvas = (0, _canvas2.default)();
	
	  /**
	   * Activate the fullscreen of the element.
	   */
	  function activate(elementId) {
	    var canvas = document.getElementById();
	    var ctx = canvas.getContext("2d");
	
	    ctx.canvas.width = Math.floor(window.innerWidth) - 1;
	    ctx.canvas.height = Math.floor(window.innerHeight) - 1;
	  }
	
	  /**
	   * Eventhandler when fullscreen event succeeded.
	   */
	  document.setEventHandler("fullscreenchange", function () {
	    console.log("event fullscreen change");
	    canvas.fullWindow();
	  });
	
	  /**
	   * Eventhandler when fullscreen event failed.
	   */
	  document.setEventHandler("fullscreenerror", function () {
	    console.log("event fullscreen error");
	  });
	
	  /**
	   * Return whats actually exported
	   */
	  return {
	    activate: activate
	  };
	};
	
	var _canvas = __webpack_require__(3);
	
	var _canvas2 = _interopRequireDefault(_canvas);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzYzYzkzZGRiNmFhNTE0NjcxNzMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FzdGVyb2lkcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvcmVxdWVzdC1hbmltLWZyYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9jYW52YXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3ZlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMva2V5LWV2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc2hpcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvZm9yY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2J1bGxldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaHVkLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9mdWxsc2NyZWVuLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJhc3Rlcm9pZHMiLCJpbml0IiwiZ2FtZUxvb3AiLCJjdHgiLCJsYXN0R2FtZVRpY2siLCJzaGlwIiwiYnVsbGV0Iiwia2V5Iiwid2lkdGgiLCJoZWlnaHQiLCJodWQiLCJjYW52YXNJZCIsImNhbnZhcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRDb250ZXh0IiwiY2FudmFzVXRpbHMiLCJmdWxsV2luZG93IiwicmVzaXplT25XaW5kb3dSZXNpemUiLCJTaGlwIiwibW92ZVRvIiwiVmVjdG9yIiwiQnVsbGV0IiwidXBkYXRlIiwidGQiLCJnZXRQb3NpdGlvbiIsInJlbmRlciIsImNsZWFyUmVjdCIsImRyYXciLCJub3ciLCJEYXRlIiwicmVxdWVzdEFuaW1GcmFtZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1velJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtc1JlcXVlc3RBbmltYXRpb25GcmFtZSIsImNhbGxiYWNrIiwic2V0VGltZW91dCIsImNhbmNlbFJlcXVlc3RBbmltRnJhbWUiLCJjYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtb3pDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJvQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibXNDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjbGVhclRpbWVvdXQiLCJNYXRoIiwiZmxvb3IiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJ4IiwieSIsInNjYWxhciIsInZlY3RvciIsInByZXNzZWQiLCJldmVudCIsImtleUNvZGUiLCJMRUZUIiwiVVAiLCJSSUdIVCIsIkRPV04iLCJTUEFDRSIsIkEiLCJTIiwiRCIsIlciLCJpc0Rvd24iLCJrZXkxIiwia2V5MiIsIm9wdGlvbnMiLCJmb3JjZSIsIkZvcmNlIiwicG9zaXRpb24iLCJ2ZWxvY2l0eSIsInNwZWVkIiwiZGlyZWN0aW9uIiwiYWNjZWxlcmF0ZUZvcmNlIiwiY3JlYXRlQWNjZWxlcmF0aW9uIiwiYnJlYWtGb3JjZSIsImNyZWF0ZURhbXBpbmciLCJkYW1wRm9yY2UiLCJsaW5lV2lkdGgiLCJzdHJva2VTdHlsZSIsInNhdmUiLCJ0cmFuc2xhdGUiLCJyb3RhdGUiLCJQSSIsImJlZ2luUGF0aCIsImxpbmVUbyIsImFyYyIsInN0cm9rZSIsInJlc3RvcmUiLCJjb3MiLCJzaW4iLCJpYWRkIiwibXVscyIsInRocm90dGxlIiwicm90YXRlTGVmdCIsImJyZWFrcyIsInJvdGF0ZVJpZ2h0IiwibW92ZUZvcndhcmQiLCJzdGF5SW5BcmVhIiwiYWxsIiwiZGFtcGluZyIsImltdWxzIiwiYWRkcyIsIm5hbWUiLCJjcmVhdGVXaW5kIiwib2JqZWN0IiwiaGFzT3duUHJvcGVydHkiLCJidWxsZXRzIiwidGlja3NTaW5jZUxhc3RBZGQiLCJpIiwibGVuIiwibGVuZ3RoIiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJjb25zb2xlIiwibG9nIiwicHVzaCIsImNsb25lIiwiYWRkIiwibW92ZSIsImZ1bGxzY3JlZW5FbGVtZW50IiwiaHVkSWQiLCJib2R5Iiwid2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4iLCJhY3RpdmF0ZSIsImVsZW1lbnRJZCIsInNldEV2ZW50SGFuZGxlciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ25DQTs7Ozs7O0FBSUE7OztBQUdBQSxRQUFPQyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxZQUFZO0FBQ3hDOztBQUVBLE9BQUlDLFlBQVksMEJBQWhCOztBQUVBQSxhQUFVQyxJQUFWLENBQWUsU0FBZjtBQUNBRCxhQUFVRSxRQUFWO0FBQ0gsRUFQRCxFQU9HLEtBUEgsRSxDQVZBOzs7Ozs7Ozs7Ozs7OzttQkNXZSxZQUFXO0FBQ3RCOztBQUVBOztBQUNBLFNBQUlDLEdBQUo7O0FBRUE7QUFDQSxTQUFJQyxZQUFKOztBQUVBO0FBQ0EsU0FBSUMsSUFBSjs7QUFFQTtBQUNBLFNBQUlDLE1BQUo7O0FBRUE7QUFDQSxTQUFJQyxHQUFKOztBQUVBO0FBQ0EsU0FBSUMsS0FBSjtBQUNBLFNBQUlDLE1BQUo7O0FBRUE7QUFDQSxTQUFJQyxZQUFKOztBQUdBOzs7QUFHQSxjQUFTVCxJQUFULENBQWNVLFFBQWQsRUFBd0I7QUFDcEI7QUFDQSxhQUFJQyxTQUFTQyxTQUFTQyxjQUFULENBQXdCSCxRQUF4QixDQUFiO0FBQ0FSLGVBQU1TLE9BQU9HLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBTjs7QUFF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Q0EsU0FBSVgsTUFBTVMsT0FBT0csVUFBUCxDQUFrQixJQUFsQixDQUFWOztBQUVDWixTQUFJUyxNQUFKLENBQVdKLEtBQVgsR0FBb0JzQyxLQUFLQyxLQUFMLENBQVdqRCxPQUFPa0QsVUFBbEIsSUFBZ0MsQ0FBcEQ7QUFDQTdDLFNBQUlTLE1BQUosQ0FBV0gsTUFBWCxHQUFvQnFDLEtBQUtDLEtBQUwsQ0FBV2pELE9BQU9tRCxXQUFsQixJQUFpQyxDQUFyRDtBQUNKOztBQUlEOzs7QUFHQXBDLFlBQVNvSCxlQUFULENBQXlCLGtCQUF6QixFQUE2QyxZQUFNO0FBQy9DWixhQUFRQyxHQUFSLENBQVkseUJBQVo7QUFDQTFHLFlBQU9LLFVBQVA7QUFDSCxJQUhEOztBQU9BOzs7QUFHQUosWUFBU29ILGVBQVQsQ0FBeUIsaUJBQXpCLEVBQTRDLFlBQU07QUFDOUNaLGFBQVFDLEdBQVIsQ0FBWSx3QkFBWjtBQUNILElBRkQ7O0FBTUE7OztBQUdBLFVBQU87QUFDSFMsZUFBVUE7QUFEUCxJQUFQO0FBR0gsRTs7QUE5Q0QiLCJmaWxlIjoid2Vicm9vdC9qcy9hc3Rlcm9pZHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzNjNjOTNkZGI2YWE1MTQ2NzE3MyIsIi8qKlxuICogTWFpbiBwcm9ncmFtLCB0byBzdGFydCBhbGwgdXAuXG4gKi9cbmltcG9ydCBBc3Rlcm9pZHMgZnJvbSBcImFzdGVyb2lkc1wiO1xuXG5cblxuLyoqXG4gKiBNYWluIHRvIHN0YXJ0IGFsbCB1cC5cbiAqL1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBhc3Rlcm9pZHMgPSBBc3Rlcm9pZHMoKTtcblxuICAgIGFzdGVyb2lkcy5pbml0KFwiY2FudmFzMVwiKTtcbiAgICBhc3Rlcm9pZHMuZ2FtZUxvb3AoKTtcbn0sIGZhbHNlKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9tYWluLmpzIiwiLyoqXG4gKiBBc3Rlcm9pZHMsIHRoZSBHYW1lXG4gKi9cbmltcG9ydCBcInV0aWxzL3JlcXVlc3QtYW5pbS1mcmFtZVwiO1xuaW1wb3J0IENhbnZhcyBmcm9tIFwidXRpbHMvY2FudmFzXCI7XG5pbXBvcnQgVmVjdG9yIGZyb20gXCJ1dGlscy92ZWN0b3JcIjtcbmltcG9ydCBLZXkgZnJvbSBcInV0aWxzL2tleS1ldmVudHNcIjtcbmltcG9ydCBTaGlwIGZyb20gXCJzaGlwXCI7XG5pbXBvcnQgQnVsbGV0IGZyb20gXCJidWxsZXRcIjtcbmltcG9ydCBIdWQgZnJvbSBcImh1ZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8vIEhvbGQgZ3JhcGljIGNvbnRleHRcbiAgICB2YXIgY3R4O1xuXG4gICAgLy8gUmVtZW1iZXIgdGhlIHRpbWUgc2luY2UgbGFzdCB1cGRhdGUgJiByZW5kZXJcbiAgICB2YXIgbGFzdEdhbWVUaWNrO1xuXG4gICAgLy8gSG9sZCB0aGUgc2hpcFxuICAgIHZhciBzaGlwO1xuXG4gICAgLy8gSG9sZCB0aGUgYnVsbGV0c1xuICAgIHZhciBidWxsZXQ7XG5cbiAgICAvLyBPYmplY3QgZm9yIGtleXByZXNzXG4gICAgdmFyIGtleTtcblxuICAgIC8vIEdhbWUgYXJlYVxuICAgIHZhciB3aWR0aDtcbiAgICB2YXIgaGVpZ2h0O1xuXG4gICAgLy8gSHVkXG4gICAgbGV0IGh1ZDtcblxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBzaXplIG9mIHRoZSBjYW52YXMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaW5pdChjYW52YXNJZCkge1xuICAgICAgICAvLyBTZXQgY2FudmFzIGRyYXdpbmcgY29udGV4dFxuICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzSWQpO1xuICAgICAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICAgIC8vIFJlc2l6ZSBjYW52YXMgYW5kIG1ha2UgaXQgbGlzdGVuIHRvIHdpbmRvdyByZXNpemUgZXZlbnRzXG4gICAgICAgIHZhciBjYW52YXNVdGlscyA9IENhbnZhcygpO1xuICAgICAgICBjYW52YXNVdGlscy5mdWxsV2luZG93KFwiY2FudmFzMVwiKTtcbiAgICAgICAgY2FudmFzVXRpbHMucmVzaXplT25XaW5kb3dSZXNpemUoXCJjYW52YXMxXCIpO1xuXG4gICAgICAgIC8vIFRPRE8gTmVlZCB0byBzdXBwb3J0IHJlc2l6ZVxuICAgICAgICB3aWR0aCA9IGNhbnZhcy53aWR0aDtcbiAgICAgICAgaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcblxuICAgICAgICAvLyBEZWZhdWx0IGRyYXcgc3R5bGVcbiAgICAgICAgLy9jdHgubGluZVdpZHRoID0gMTtcbiAgICAgICAgLy9jdHguc3Ryb2tlU3R5bGUgPSBcImhzbGEoMCwwJSwgMTAwJSwgMSlcIjtcblxuICAgICAgICAvLyBBZGQgdGhlIHNoaXAgYW5kIHBsYWNlIGl0IGluIHRoZSBtaWRkbGVcbiAgICAgICAgc2hpcCA9IG5ldyBTaGlwKCk7XG4gICAgICAgIHNoaXAubW92ZVRvKG5ldyBWZWN0b3IoY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAvIDIpKTtcblxuICAgICAgICAvLyBBZGQgQnVsbGV0c1xuICAgICAgICBidWxsZXQgPSBuZXcgQnVsbGV0KCk7XG5cbiAgICAgICAgLy8gS2V5IHByZXNzZWRcbiAgICAgICAga2V5ID0gS2V5KCk7XG5cbiAgICAgICAgLy8gSHVkXG4gICAgICAgIGh1ZCA9IEh1ZCgpO1xuICAgICAgICBodWQuaW5pdCgpO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHVwZGF0ZSh0ZCkge1xuICAgICAgICBzaGlwLnVwZGF0ZShrZXksIHRkLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgYnVsbGV0LnVwZGF0ZShrZXksIHRkLCBzaGlwLmdldFBvc2l0aW9uKCkpO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgc2hpcC5kcmF3KGN0eCwga2V5KTtcbiAgICAgICAgYnVsbGV0LmRyYXcoY3R4KTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnYW1lTG9vcCgpIHtcbiAgICAgICAgLy8gVGltZWRpZmYgc2luY2UgbGFzdCBmcmFtZSAvIGdhbWV0aWNrXG4gICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICB2YXIgdGQgPSAobm93IC0gKGxhc3RHYW1lVGljayB8fMKgbm93KSkgLyAxMDAwO1xuICAgICAgICBsYXN0R2FtZVRpY2sgPSBub3c7XG5cbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltRnJhbWUoZ2FtZUxvb3ApO1xuICAgICAgICB1cGRhdGUodGQpO1xuICAgICAgICByZW5kZXIoKTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICByZXR1cm4ge1xuICAgICAgICBcImluaXRcIjogaW5pdCxcbiAgICAgICAgXCJnYW1lTG9vcFwiOiBnYW1lTG9vcFxuICAgIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvYXN0ZXJvaWRzLmpzIiwiLyoqXG4gKiBTaGltIGxheWVyLCBwb2x5ZmlsbCwgZm9yIHJlcXVlc3RBbmltYXRpb25GcmFtZSB3aXRoIHNldFRpbWVvdXQgZmFsbGJhY2suXG4gKi9cblxuLyoqXG4gKiByZXF1ZXN0QW5pbUZyYW1lXG4gKi9cbndpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XG4gICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fFxuICAgICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgIHx8XG4gICAgICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgfHxcbiAgICAgICAgZnVuY3Rpb24oIGNhbGxiYWNrICl7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICAgICAgfTtcbn0pKCk7XG5cblxuXG4vKipcbiAqIGNhbmNlbFJlcXVlc3RBbmltRnJhbWVcbiAqL1xud2luZG93LmNhbmNlbFJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5jYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcbiAgICAgICAgd2luZG93LndlYmtpdENhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICB3aW5kb3cubW96Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XG4gICAgICAgIHdpbmRvdy5vQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgfHxcbiAgICAgICAgd2luZG93Lm1zQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICB8fFxuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0O1xufSkoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy91dGlscy9yZXF1ZXN0LWFuaW0tZnJhbWUuanMiLCIvKipcbiAqIENhbnZhcyB1dGlsaXRpZXNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHNpemUgb2YgdGhlIGNhbnZhcy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmdWxsV2luZG93KGNhbnZhc0lkKSB7XG4gICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNJZCk7XG4gICAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICAgICBjdHguY2FudmFzLndpZHRoICA9IE1hdGguZmxvb3Iod2luZG93LmlubmVyV2lkdGgpIC0gMTtcbiAgICAgICAgIGN0eC5jYW52YXMuaGVpZ2h0ID0gTWF0aC5mbG9vcih3aW5kb3cuaW5uZXJIZWlnaHQpIC0gMTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogUmVzaXplIG9uIHdpbmRvdyByZXNpemUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVzaXplT25XaW5kb3dSZXNpemUoY2FudmFzSWQpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZnVsbFdpbmRvdyhjYW52YXNJZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICAvLyBSZXR1cm4gd2hhdHMgYWN0dWFsbHkgZXhwb3J0ZWRcbiAgICByZXR1cm4ge1xuICAgICAgICBmdWxsV2luZG93OiBmdWxsV2luZG93LFxuICAgICAgICByZXNpemVPbldpbmRvd1Jlc2l6ZTogcmVzaXplT25XaW5kb3dSZXNpemVcbiAgICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3V0aWxzL2NhbnZhcy5qcyIsIi8qKlxuICogVmVjdG9yIG1hdGhcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yIHtcblxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgdGhpcy54ID0geCB8fMKgMDtcbiAgICAgICAgdGhpcy55ID0geSB8fMKgMDtcbiAgICB9XG5cbiAgICAvLyBNdWx0aXBseSB3aXRoIHNjYWxhclxuICAgIG11bHMoc2NhbGFyKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCAqIHNjYWxhciwgdGhpcy55ICogc2NhbGFyKTtcbiAgICB9XG5cbiAgICAvLyBNdWx0aXBseSBpdHNlbGYgd2l0aCBzY2FsYXJcbiAgICBpbXVscyhzY2FsYXIpIHtcbiAgICAgICAgdGhpcy54ICo9IHNjYWxhcjtcbiAgICAgICAgdGhpcy55ICo9IHNjYWxhcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gTXVsdGlwbHkgd2l0aCBzY2FsYXJcbiAgICBhZGRzKHNjYWxhcikge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLnggKyBzY2FsYXIsIHRoaXMueSArIHNjYWxhcik7XG4gICAgfVxuXG4gICAgLy8gQWRkIGl0c2VsZiB3aXRoIFZlY3RvclxuICAgIGlhZGQodmVjdG9yKSB7XG4gICAgICAgIHRoaXMueCArPSB2ZWN0b3IueDtcbiAgICAgICAgdGhpcy55ICs9IHZlY3Rvci55O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYSBjbG9uZVxuICAgIGNsb25lKCkge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLngsIHRoaXMueSk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3V0aWxzL3ZlY3Rvci5qcyIsIi8qKlxuICogVHJhY2UgdGhlIGtleXMgcHJlc3NlZFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBwcmVzc2VkID0ge307XG5cbiAgICAvLyBPbiBrZXkgcmVsZWFzZVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGV2ZW50ID0+IHtcbiAgICAgICAgZGVsZXRlIHByZXNzZWRbZXZlbnQua2V5Q29kZV07XG4gICAgfSk7XG5cbiAgICAvLyBPbiBrZXkgcHJlc3NcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ZW50ID0+IHtcbiAgICAgICAgcHJlc3NlZFtldmVudC5rZXlDb2RlXSA9IHRydWU7XG4gICAgfSk7XG5cbiAgICAvLyBSZXR1cm4gd2hhdCB0byBleHBvcnRcbiAgICByZXR1cm4ge1xuICAgICAgICBMRUZUOiAgIDM3LFxuICAgICAgICBVUDogICAgIDM4LFxuICAgICAgICBSSUdIVDogIDM5LFxuICAgICAgICBET1dOOiAgIDQwLFxuICAgICAgICBTUEFDRTogIDMyLFxuICAgICAgICBBOiAgICAgIDY1LFxuICAgICAgICBTOiAgICAgIDgzLFxuICAgICAgICBEOiAgICAgIDY4LFxuICAgICAgICBXOiAgICAgIDg3LFxuXG4gICAgICAgIGlzRG93bjogZnVuY3Rpb24oa2V5MSwga2V5Mikge1xuICAgICAgICAgICAgcmV0dXJuIHByZXNzZWRba2V5MV0gfHzCoHByZXNzZWRba2V5Ml07XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3V0aWxzL2tleS1ldmVudHMuanMiLCIvKipcbiAqIFRoZSBzaGlwLlxuICovXG5pbXBvcnQgVmVjdG9yIGZyb20gXCJ1dGlscy92ZWN0b3JcIjtcbmltcG9ydCBGb3JjZSBmcm9tIFwidXRpbHMvZm9yY2VcIjtcblxuIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuXG4gICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICAgdmFyIGZvcmNlID0gbmV3IEZvcmNlKCk7XG5cbiAgICAgICAgIHRoaXMuaGVpZ2h0ICAgICA9IG9wdGlvbnMuaGVpZ2h0IHx8wqAyMDtcbiAgICAgICAgIHRoaXMud2lkdGggICAgICA9IG9wdGlvbnMud2lkdGggIHx8wqAxMDtcbiAgICAgICAgIHRoaXMucG9zaXRpb24gICA9IG9wdGlvbnMucG9zaXRpb24gfHwgbmV3IFZlY3RvcigpO1xuICAgICAgICAgdGhpcy52ZWxvY2l0eSAgID0gb3B0aW9ucy52ZWxvY2l0eSB8fMKgbmV3IFZlY3RvcigpO1xuICAgICAgICAgdGhpcy5zcGVlZCAgICAgID0gb3B0aW9ucy5zcGVlZCB8fCBuZXcgVmVjdG9yKCk7XG4gICAgICAgICB0aGlzLmRpcmVjdGlvbiAgPSBvcHRpb25zLmRpcmVjdGlvbiB8fMKgMDtcblxuICAgICAgICAgdGhpcy5hY2NlbGVyYXRlRm9yY2UgPSBvcHRpb25zLmFjY2VsZXJhdGVGb3JjZVxuICAgICAgICAgICAgfHzCoGZvcmNlLmNyZWF0ZUFjY2VsZXJhdGlvbihuZXcgVmVjdG9yKDgwLCA4MCkpO1xuICAgICAgICAgdGhpcy5icmVha0ZvcmNlID0gb3B0aW9ucy5icmVha0ZvcmNlIHx8wqBmb3JjZS5jcmVhdGVEYW1waW5nKDAuOTcpO1xuICAgICAgICAgdGhpcy5kYW1wRm9yY2UgID0gb3B0aW9ucy5kYW1wRm9yY2UgIHx8wqBmb3JjZS5jcmVhdGVEYW1waW5nKDAuOTk5KTtcbiAgICB9XG5cblxuXG4gICAgZHJhdyhjdHgsIGtleSkge1xuICAgICAgICB2YXIgeCA9IHRoaXMud2lkdGggLyAyO1xuICAgICAgICB2YXIgeSA9IHRoaXMuaGVpZ2h0IC8gMjtcblxuICAgICAgICBjdHgubGluZVdpZHRoID0gMTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ2hzbGEoMCwwJSwxMDAlLDEpJztcblxuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHgudHJhbnNsYXRlKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KTtcbiAgICAgICAgY3R4LnJvdGF0ZSh0aGlzLmRpcmVjdGlvbiArIE1hdGguUEkgLyAyKTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKDAsIC15KTtcbiAgICAgICAgY3R4LmxpbmVUbyh4LCB5KTtcbiAgICAgICAgY3R4LmxpbmVUbygwLCAwLjggKiB5KTtcbiAgICAgICAgY3R4LmxpbmVUbygteCwgeSk7XG4gICAgICAgIGN0eC5saW5lVG8oMCwgLXkpO1xuXG4gICAgICAgIGlmIChrZXkuaXNEb3duKGtleS5VUCwga2V5LlcpKSB7XG4gICAgICAgICAgICBjdHgubW92ZVRvKDAsIHkpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbygtMiwgeSArIDEwKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oMCwgeSArIDgpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbygyLCB5ICsgMTApO1xuICAgICAgICAgICAgY3R4LmxpbmVUbygwLCB5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXkuaXNEb3duKGtleS5ET1dOLCBrZXkuUykpIHtcbiAgICAgICAgICAgIGN0eC5tb3ZlVG8oeSArIDQsIDApO1xuICAgICAgICAgICAgY3R4LmFyYygwLCAwLCB5ICsgNCwgMCwgTWF0aC5QSSwgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG5cblxuICAgIG1vdmVUbyhwb3NpdGlvbikge1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgIHRoaXMucG9zaXRpb24ueCArPSB0aGlzLndpZHRoIC8gMjtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi55ICs9IHRoaXMuaGVpZ2h0IC8gMjtcbiAgICB9XG5cblxuXG4gICAgbW92ZUZvcndhcmQodGQpIHtcbiAgICAgICAgdGhpcy5kYW1wRm9yY2UodGhpcy5zcGVlZCwgdGQpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uLnggKz0gdGhpcy5zcGVlZC54ICogTWF0aC5jb3ModGhpcy5kaXJlY3Rpb24pICogdGQ7XG4gICAgICAgIHRoaXMucG9zaXRpb24ueSArPSB0aGlzLnNwZWVkLnkgKiBNYXRoLnNpbih0aGlzLmRpcmVjdGlvbikgKiB0ZDtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi5pYWRkKHRoaXMudmVsb2NpdHkubXVscyh0ZCkpO1xuICAgIH1cblxuXG4gICAgdGhyb3R0bGUodGQpIHtcbiAgICAgICAgdGhpcy5hY2NlbGVyYXRlRm9yY2UodGhpcy5zcGVlZCwgdGQpO1xuICAgIH1cblxuXG5cbiAgICByb3RhdGVMZWZ0KCkge1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiAtPSBNYXRoLlBJIC8gMzA7XG4gICAgfVxuXG5cblxuICAgIHJvdGF0ZVJpZ2h0KCkge1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiArPSBNYXRoLlBJIC8gMzA7XG4gICAgfVxuXG5cblxuICAgIGJyZWFrcyh0ZCkge1xuICAgICAgICB0aGlzLmJyZWFrRm9yY2UodGhpcy5zcGVlZCwgdGQpO1xuICAgICAgICB0aGlzLmJyZWFrRm9yY2UodGhpcy52ZWxvY2l0eSwgdGQpO1xuICAgIH1cblxuXG5cbiAgICB1cGRhdGUoa2V5LCB0ZCwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICBpZiAoa2V5LmlzRG93bihrZXkuVVAsIGtleS5XKSkge1xuICAgICAgICAgICAgdGhpcy50aHJvdHRsZSh0ZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5LmlzRG93bihrZXkuTEVGVCwga2V5LkEpKSB7XG4gICAgICAgICAgICB0aGlzLnJvdGF0ZUxlZnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXkuaXNEb3duKGtleS5ET1dOLCBrZXkuUykpIHtcbiAgICAgICAgICAgIHRoaXMuYnJlYWtzKHRkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXkuaXNEb3duKGtleS5SSUdIVCwga2V5LkQpKSB7XG4gICAgICAgICAgICB0aGlzLnJvdGF0ZVJpZ2h0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL0ZvcmNlcy51cGRhdGUodGhpcy52ZWxvY2l0eSwgdGQpO1xuICAgICAgICB0aGlzLm1vdmVGb3J3YXJkKHRkKTtcbiAgICAgICAgdGhpcy5zdGF5SW5BcmVhKHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cblxuXG5cbiAgICBzdGF5SW5BcmVhKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueSA8IC10aGlzLmhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueSA+IGhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gLXRoaXMuaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueCA+IHdpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSAtdGhpcy53aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLnggPCAtdGhpcy53aWR0aCkge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gd2lkdGg7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG4gICAgZ2V0UG9zaXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9uO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9zaGlwLmpzIiwiLyoqXG4gKiBUaGUgZm9yY2UgYXJvdW5kIHVzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JjZSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5hbGwgPSB7fTtcbiAgICB9XG5cbiAgICBjcmVhdGVBY2NlbGVyYXRpb24odmVjdG9yKSB7XG4gICAgICAgIHJldHVybiAodmVsb2NpdHksIHRkKSA9PiB7XG4gICAgICAgICAgICB2ZWxvY2l0eS5pYWRkKHZlY3Rvci5tdWxzKHRkKSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY3JlYXRlRGFtcGluZyhkYW1waW5nKSB7XG4gICAgICAgIHJldHVybiAodmVsb2NpdHkgLyosIHRkICovKSA9PiB7XG4gICAgICAgICAgICB2ZWxvY2l0eS5pbXVscyhkYW1waW5nKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjcmVhdGVXaW5kKHZlY3Rvcikge1xuICAgICAgICByZXR1cm4gKHZlbG9jaXR5LCB0ZCkgPT4ge1xuICAgICAgICAgICAgdmVsb2NpdHkuaWFkZCh2ZWN0b3IuYWRkcyh0ZCkpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGFkZEFjY2VsZXJhdGlvbihuYW1lLCB2ZWN0b3IpIHtcbiAgICAgICAgdGhpcy5hbGxbbmFtZV0gPSB0aGlzLmNyZWF0ZUFjY2VsZXJhdGlvbih2ZWN0b3IpO1xuICAgIH1cblxuICAgIGFkZERhbXBpbmcobmFtZSwgZGFtcGluZykge1xuICAgICAgICB0aGlzLmFsbFtuYW1lXSA9IHRoaXMuY3JlYXRlRGFtcGluZyhkYW1waW5nKTtcbiAgICB9XG5cbiAgICBhZGRXaW5kKG5hbWUsIHZlY3Rvcikge1xuICAgICAgICB0aGlzLmFsbFtuYW1lXSA9IHRoaXMuY3JlYXRlV2luZCh2ZWN0b3IpO1xuICAgIH1cblxuICAgIHVwZGF0ZShvYmplY3QsIHRkKSB7XG4gICAgICAgIGZvciAodmFyIGZvcmNlIGluIHRoaXMuYWxsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hbGwuaGFzT3duUHJvcGVydHkoZm9yY2UpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxbZm9yY2VdKG9iamVjdCwgdGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3V0aWxzL2ZvcmNlLmpzIiwiLyoqXG4gKiBCdWxsZXRzLlxuICovXG5pbXBvcnQgVmVjdG9yIGZyb20gXCJ1dGlscy92ZWN0b3JcIjtcblxuIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1bGxldCB7XG5cbiAgICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG5cblxuLy8vXG5cbiAgICAgICAgIHRoaXMuaGVpZ2h0ICAgICA9IG9wdGlvbnMuaGVpZ2h0IHx8wqAyMDtcbiAgICAgICAgIHRoaXMud2lkdGggICAgICA9IG9wdGlvbnMud2lkdGggIHx8wqAxMDtcbiAgICAgICAgIHRoaXMucG9zaXRpb24gICA9IG9wdGlvbnMucG9zaXRpb24gfHwgbmV3IFZlY3RvcigpO1xuICAgICAgICAgdGhpcy52ZWxvY2l0eSAgID0gb3B0aW9ucy52ZWxvY2l0eSB8fMKgbmV3IFZlY3RvcigpO1xuICAgICAgICAgdGhpcy5zcGVlZCAgICAgID0gb3B0aW9ucy5zcGVlZCB8fCBuZXcgVmVjdG9yKCk7XG4gICAgICAgICB0aGlzLmRpcmVjdGlvbiAgPSBvcHRpb25zLmRpcmVjdGlvbiB8fMKgMDtcbiAgICAgICAgIHRoaXMuYnVsbGV0cyA9IFtdO1xuICAgICAgICAgdGhpcy50aWNrc1NpbmNlTGFzdEFkZCA9IDA7XG5cbiAgICB9XG5cblxuXG4gICAgZHJhdyhjdHgsIGtleSkge1xuXG4gICAgICAgIGN0eC5zYXZlKCk7XG5cbiAgICAgICAgLy8gY3R4LmxpbmVXaWR0aCA9IDU7XG4gICAgICAgIC8vIGN0eC5zdHJva2VTdHlsZSA9ICdoc2xhKDAsMCUsMTAwJSwxKSc7XG5cbiAgICAgICAgLy8gY3R4LmZpbGxTdHlsZSA9IFwicmdiKDIwMCwwLDApXCI7XG4gICAgICAgIC8vIGN0eC5maWxsUmVjdCAoMTAsIDEwLCA1MCwgNTApO1xuXG4gICAgICAgIC8vIGN0eC5tb3ZlVG8oMTAwLCAxMDApO1xuICAgICAgICAvLyBjdHgubGluZVRvKDIwMCwgMjAwKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmJ1bGxldHMubGVuZ3RoKTtcbiAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuYnVsbGV0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIGN0eC50cmFuc2xhdGUodGhpcy5idWxsZXRzW2ldLngsIHRoaXMuYnVsbGV0c1tpXS55KTtcbiAgICAgICAgICAgIC8vIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIC8vIGN0eC5tb3ZlVG8odGhpcy5idWxsZXRzW2ldLngsIHRoaXMuYnVsbGV0c1tpXS55KTtcbiAgICAgICAgICAgIC8vIGN0eC5saW5lVG8odGhpcy5idWxsZXRzW2ldLnggKyAxMCwgdGhpcy5idWxsZXRzW2ldLnkgKyAxMCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vY3R4Lm1vdmVUbygwLCAwKTtcbiAgICAgICAgICAgIC8vY3R4LmxpbmVUbygxMCwgMTApO1xuICAgICAgICAgICAgXG4gICAgLy8gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICBjdHguZmlsbFJlY3QgKFxuICAgICAgICAgICAgICAgIHRoaXMuYnVsbGV0c1tpXS54LFxuICAgICAgICAgICAgICAgIHRoaXMuYnVsbGV0c1tpXS55LFxuICAgICAgICAgICAgICAgIHRoaXMuYnVsbGV0c1tpXS54ICsgMTAsXG4gICAgICAgICAgICAgICAgdGhpcy5idWxsZXRzW2ldLnkgKyAxMFxuICAgICAgICAgICAgKTsqL1xuLypcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUodGhpcy5idWxsZXRzW2ldLnggKyA0MCwgdGhpcy5idWxsZXRzW2ldLnkgKyA0MCk7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHgubGluZVRvKDEwLCAxMCk7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZ2IoMjU1LCAyNTUsIDI1NSlcIjtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCAodGhpcy5idWxsZXRzW2ldLngsIHRoaXMuYnVsbGV0c1tpXS55LCA0LCA0KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG5cblxuICAgIGFkZChwb3NpdGlvbikge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmJ1bGxldHMubGVuZ3RoKTtcblxuICAgICAgICBpZiAodGhpcy5idWxsZXRzLmxlbmd0aCA8IDEwKSB7XG4gICAgICAgICAgICB0aGlzLmJ1bGxldHMucHVzaChwb3NpdGlvbi5jbG9uZSgpKTtcbiAgICAgICAgICAgIHRoaXMudGlja3NTaW5jZUxhc3RBZGQgPSAxMDtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbiAgICBtb3ZlKHRkKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLmJ1bGxldHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuYnVsbGV0c1tpXS54ICs9IDE7XG4gICAgICAgICAgICB0aGlzLmJ1bGxldHNbaV0ueSArPSAxO1xuICAgICAgICB9XG4gICAgICAgIC8qXG4gICAgICAgIHRoaXMuZGFtcEZvcmNlKHRoaXMuc3BlZWQsIHRkKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi54ICs9IHRoaXMuc3BlZWQueCAqIE1hdGguY29zKHRoaXMuZGlyZWN0aW9uKSAqIHRkO1xuICAgICAgICB0aGlzLnBvc2l0aW9uLnkgKz0gdGhpcy5zcGVlZC55ICogTWF0aC5zaW4odGhpcy5kaXJlY3Rpb24pICogdGQ7XG4gICAgICAgIHRoaXMucG9zaXRpb24uaWFkZCh0aGlzLnZlbG9jaXR5Lm11bHModGQpKTtcbiAgICAgICAgKi9cbiAgICB9XG5cblxuXG4gICAgdXBkYXRlKGtleSwgdGQsIHBvc2l0aW9uKSB7XG4gICAgICAgIC8vIERlbGF5IHNob3Qgd2hlbiByZWNlbnRseSBkaWQgc2hvb3RcbiAgICAgICAgaWYgKHRoaXMudGlja3NTaW5jZUxhc3RBZGQgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnRpY2tzU2luY2VMYXN0QWRkLS07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5LmlzRG93bihrZXkuU1BBQ0UpICYmIHRoaXMudGlja3NTaW5jZUxhc3RBZGQgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuYWRkKHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vRm9yY2VzLnVwZGF0ZSh0aGlzLnZlbG9jaXR5LCB0ZCk7XG4gICAgICAgIHRoaXMubW92ZSh0ZCk7XG4gICAgICAgIC8vdGhpcy5zdGF5SW5BcmVhKHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cblxuXG5cbiAgICBzdGF5SW5BcmVhKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueSA8IC10aGlzLmhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueSA+IGhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0gLXRoaXMuaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb24ueCA+IHdpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uLnggPSAtdGhpcy53aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9uLnggPCAtdGhpcy53aWR0aCkge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0gd2lkdGg7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvYnVsbGV0LmpzIiwiLyoqXG4gKiBIZWFkcy11cCBkaXNwbGF5XG4gKi9cbmltcG9ydCBGdWxsU2NyZWVuIGZyb20gXCJ1dGlscy9mdWxsc2NyZWVuXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIGZ1bGxzY3JlZW5FbGVtZW50O1xuXG5cblxuICAgIC8qKlxuICAgICAqIEluaXRpYXRlIHRoZSBIdWQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaW5pdChodWRJZCkge1xuICAgICAgICBsZXQgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9keTFcIik7XG4gICAgICAgIGxldCBmdWxsc2NyZWVuRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnVsbHNjcmVlblwiKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIkluaXQgaHVkXCIpO1xuICAgICAgICBmdWxsc2NyZWVuRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZXF1ZXN0IGZ1bGxzY3JlZW5cIik7XG4gICAgICAgICAgICBib2R5LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gd2hhdHMgYWN0dWFsbHkgZXhwb3J0ZWRcbiAgICAgKi9cbiAgICByZXR1cm4ge1xuICAgICAgICBcImluaXRcIjogaW5pdFxuICAgIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvaHVkLmpzIiwiLyoqXG4gKiBGdWxsc2NyZWVuIHV0aWxpdGllc1xuICovXG5pbXBvcnQgQ2FudmFzIGZyb20gXCJ1dGlscy9jYW52YXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgbGV0IGNhbnZhcyA9IENhbnZhcygpO1xuXG5cblxuICAgIC8qKlxuICAgICAqIEFjdGl2YXRlIHRoZSBmdWxsc2NyZWVuIG9mIHRoZSBlbGVtZW50LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFjdGl2YXRlKGVsZW1lbnRJZCkge1xuICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoKTtcbiAgICAgICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgICAgIGN0eC5jYW52YXMud2lkdGggID0gTWF0aC5mbG9vcih3aW5kb3cuaW5uZXJXaWR0aCkgLSAxO1xuICAgICAgICAgY3R4LmNhbnZhcy5oZWlnaHQgPSBNYXRoLmZsb29yKHdpbmRvdy5pbm5lckhlaWdodCkgLSAxO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBFdmVudGhhbmRsZXIgd2hlbiBmdWxsc2NyZWVuIGV2ZW50IHN1Y2NlZWRlZC5cbiAgICAgKi9cbiAgICBkb2N1bWVudC5zZXRFdmVudEhhbmRsZXIoXCJmdWxsc2NyZWVuY2hhbmdlXCIsICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJldmVudCBmdWxsc2NyZWVuIGNoYW5nZVwiKTtcbiAgICAgICAgY2FudmFzLmZ1bGxXaW5kb3coKTtcbiAgICB9KTtcblxuXG5cbiAgICAvKipcbiAgICAgKiBFdmVudGhhbmRsZXIgd2hlbiBmdWxsc2NyZWVuIGV2ZW50IGZhaWxlZC5cbiAgICAgKi9cbiAgICBkb2N1bWVudC5zZXRFdmVudEhhbmRsZXIoXCJmdWxsc2NyZWVuZXJyb3JcIiwgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcImV2ZW50IGZ1bGxzY3JlZW4gZXJyb3JcIik7XG4gICAgfSk7XG5cblxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHdoYXRzIGFjdHVhbGx5IGV4cG9ydGVkXG4gICAgICovXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWN0aXZhdGU6IGFjdGl2YXRlXG4gICAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy91dGlscy9mdWxsc2NyZWVuLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==