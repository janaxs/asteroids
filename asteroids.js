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
	
	__webpack_require__(1);
	
	var _keyEvents = __webpack_require__(2);
	
	var _keyEvents2 = _interopRequireDefault(_keyEvents);
	
	var _canvas = __webpack_require__(3);
	
	var _canvas2 = _interopRequireDefault(_canvas);
	
	var _vector = __webpack_require__(4);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _force = __webpack_require__(5);
	
	var _force2 = _interopRequireDefault(_force);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Namespace for the app
	var app = {
	    canvas: (0, _canvas2.default)(),
	    key: (0, _keyEvents2.default)(),
	    Vector: _vector2.default,
	    force: new _force2.default()
	};
	
	// Add default forces
	/**
	 * Main program, to start all up.
	 */
	app.force.addAcceleration('gravity', new _vector2.default(0, 9.82));
	app.force.addDamping('drag', 0.97);
	app.force.addWind('wind', new _vector2.default(0.5, 0));
	
	/**
	 * Main to start all up.
	 */
	function main(app) {
	    "use strict";
	
	    // Resize canvas and make it listen to window resize events
	
	    app.canvas.fullWindow("canvas1");
	    app.canvas.resizeOnWindowResize("canvas1");
	
	    console.log("window.onload");
	}
	
	window.onload = function () {
	    main(app);
	};

/***/ },
/* 1 */
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
/* 2 */
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
	        var ct = canvas.getContext("2d");
	
	        ct.canvas.width = Math.floor(window.innerWidth) - 1;
	        ct.canvas.height = Math.floor(window.innerHeight) - 1;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDZjYzg5ZDA5ZDJiMTNkZmRkODQiLCJ3ZWJwYWNrOi8vLy4vanMtc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vanMtc3JjL3V0aWxzL3JlcXVlc3QtYW5pbS1mcmFtZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy1zcmMvdXRpbHMva2V5LWV2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9qcy1zcmMvdXRpbHMvY2FudmFzLmpzIiwid2VicGFjazovLy8uL2pzLXNyYy91dGlscy92ZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vanMtc3JjL3V0aWxzL2ZvcmNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1QkEsS0FBSSxNQUFNO0FBQ04sYUFBUSx1QkFBUjtBQUNBLFVBQVEsMEJBQVI7QUFDQSw2QkFITTtBQUlOLFlBQVEscUJBQVI7RUFKQTs7Ozs7O0FBUUosS0FBSSxLQUFKLENBQVUsZUFBVixDQUEwQixTQUExQixFQUFxQyxxQkFBVyxDQUFYLEVBQWMsSUFBZCxDQUFyQztBQUNBLEtBQUksS0FBSixDQUFVLFVBQVYsQ0FBcUIsTUFBckIsRUFBNkIsSUFBN0I7QUFDQSxLQUFJLEtBQUosQ0FBVSxPQUFWLENBQWtCLE1BQWxCLEVBQTBCLHFCQUFXLEdBQVgsRUFBZ0IsQ0FBaEIsQ0FBMUI7Ozs7O0FBT0EsVUFBUyxJQUFULENBQWMsR0FBZCxFQUFtQjtBQUNmOzs7QUFEZTtBQUlmLFNBQUksTUFBSixDQUFXLFVBQVgsQ0FBc0IsU0FBdEIsRUFKZTtBQUtmLFNBQUksTUFB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aUIsS0FBSyxhQUFMLENBQW1CLE9BQW5CLENBQWpCLENBRHNCOzs7O2lDQUlsQixNQUFNLFFBQVE7QUFDbEIsa0JBQUssR0FBTCxDQUFTLElBQVQsSUFBaUIsS0FBSyxVQUFMLENBQWdCLE1BQWhCLENBQWpCLENBRGtCOzs7O2dDQUlmLFFBQVEsSUFBSTtBQUNmLGtCQUFLLElBQUksS0FBSixJQUFhLEtBQUssR0FBTCxFQUFVO0FBQ3hCLHFCQUFJLEtBQUssR0FBTCxDQUFTLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBSixFQUFvQztBQUNoQywwQkFBSyxHQUFMLENBQVMsS0FBVCxFQUFnQixNQUFoQixFQUF3QixFQUF4QixFQURnQztrQkFBcEM7Y0FESjs7OztZQXJDYSIsImZpbGUiOiJhc3Rlcm9pZHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDA2Y2M4OWQwOWQyYjEzZGZkZDg0XG4gKiovIiwiLyoqXG4gKiBNYWluIHByb2dyYW0sIHRvIHN0YXJ0IGFsbCB1cC5cbiAqL1xuaW1wb3J0IFwidXRpbHMvcmVxdWVzdC1hbmltLWZyYW1lXCI7XG5pbXBvcnQgS2V5IGZyb20gXCJ1dGlscy9rZXktZXZlbnRzXCI7XG5pbXBvcnQgQ2FudmFzIGZyb20gXCJ1dGlscy9jYW52YXNcIjtcbmltcG9ydCBWZWN0b3IgZnJvbSBcInV0aWxzL3ZlY3RvclwiO1xuaW1wb3J0IEZvcmNlIGZyb20gXCJ1dGlscy9mb3JjZVwiO1xuXG4vLyBOYW1lc3BhY2UgZm9yIHRoZSBhcHBcbnZhciBhcHAgPSB7XG4gICAgY2FudmFzOiBDYW52YXMoKSxcbiAgICBrZXk6ICAgIEtleSgpLFxuICAgIFZlY3RvcjogVmVjdG9yLFxuICAgIGZvcmNlOiAgbmV3IEZvcmNlKClcbn07XG5cbi8vIEFkZCBkZWZhdWx0IGZvcmNlc1xuYXBwLmZvcmNlLmFkZEFjY2VsZXJhdGlvbignZ3Jhdml0eScsIG5ldyBWZWN0b3IoMCwgOS44MikpO1xuYXBwLmZvcmNlLmFkZERhbXBpbmcoJ2RyYWcnLCAwLjk3KTtcbmFwcC5mb3JjZS5hZGRXaW5kKCd3aW5kJywgbmV3IFZlY3RvcigwLjUsIDApKTtcblxuXG5cbi8qKlxuICogTWFpbiB0byBzdGFydCBhbGwgdXAuXG4gKi9cbmZ1bmN0aW9uIG1haW4oYXBwKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvLyBSZXNpemUgY2FudmFzIGFuZCBtYWtlIGl0IGxpc3RlbiB0byB3aW5kb3cgcmVzaXplIGV2ZW50c1xuICAgIGFwcC5jYW52YXMuZnVsbFdpbmRvdyhcImNhbnZhczFcIik7XG4gICAgYXBwLmNhbnZhcy5yZXNpemVPbldpbmRvd1Jlc2l6ZShcImNhbnZhczFcIik7XG5cblxuXG4gICAgY29uc29sZS5sb2coXCJ3aW5kb3cub25sb2FkXCIpO1xufVxuXG53aW5kb3cub25sb2FkID0gKCkgPT4geyBtYWluKGFwcCk7IH07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzLXNyYy9tYWluLmpzXG4gKiovIiwiLyoqXG4gKiBTaGltIGxheWVyLCBwb2x5ZmlsbCwgZm9yIHJlcXVlc3RBbmltYXRpb25GcmFtZSB3aXRoIHNldFRpbWVvdXQgZmFsbGJhY2suXG4gKi9cblxuLyoqXG4gKiByZXF1ZXN0QW5pbUZyYW1lXG4gKi9cbndpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgIHx8XG4gICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fFxuICAgICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgIHx8XG4gICAgICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgfHxcbiAgICAgICAgZnVuY3Rpb24oIGNhbGxiYWNrICl7XG4gICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICAgICAgfTtcbn0pKCk7XG5cblxuXG4vKipcbiAqIGNhbmNlbFJlcXVlc3RBbmltRnJhbWVcbiAqL1xud2luZG93LmNhbmNlbFJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gd2luZG93LmNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICB3aW5kb3cud2Via2l0Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5tb3pDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcbiAgICAgICAgd2luZG93Lm9DYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxuICAgICAgICB3aW5kb3cubXNDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQ7XG59KSgpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy1zcmMvdXRpbHMvcmVxdWVzdC1hbmltLWZyYW1lLmpzXG4gKiovIiwiLyoqXG4gKiBUcmFjZSB0aGUga2V5cyBwcmVzc2VkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIHByZXNzZWQgPSB7fTtcblxuICAgIC8vIE9uIGtleSByZWxlYXNlXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXZlbnQgPT4ge1xuICAgICAgICBkZWxldGUgcHJlc3NlZFtldmVudC5rZXlDb2RlXTtcbiAgICB9KTtcblxuICAgIC8vIE9uIGtleSBwcmVzc1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnQgPT4ge1xuICAgICAgICBwcmVzc2VkW2V2ZW50LmtleUNvZGVdID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIC8vIFJldHVybiB3aGF0IHRvIGV4cG9ydFxuICAgIHJldHVybiB7XG4gICAgICAgIExFRlQ6ICAgMzcsXG4gICAgICAgIFVQOiAgICAgMzgsXG4gICAgICAgIFJJR0hUOiAgMzksXG4gICAgICAgIERPV046ICAgNDAsXG4gICAgICAgIFNQQUNFOiAgMzIsXG4gICAgICAgIEE6ICAgICAgNjUsXG4gICAgICAgIFM6ICAgICAgODMsXG4gICAgICAgIEQ6ICAgICAgNjgsXG4gICAgICAgIFc6ICAgICAgODcsXG5cbiAgICAgICAgaXNEb3duOiBmdW5jdGlvbihrZXkxLCBrZXkyKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJlc3NlZFtrZXkxXSB8fMKgcHJlc3NlZFtrZXkyXTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzLXNyYy91dGlscy9rZXktZXZlbnRzLmpzXG4gKiovIiwiLyoqXG4gKiBDYW52YXMgdXRpbGl0aWVzXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHNpemUgb2YgdGhlIGNhbnZhcy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmdWxsV2luZG93KGNhbnZhc0lkKSB7XG4gICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNJZCk7XG4gICAgICAgIHZhciBjdCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgICAgIGN0LmNhbnZhcy53aWR0aCAgPSBNYXRoLmZsb29yKHdpbmRvdy5pbm5lcldpZHRoKSAtIDE7XG4gICAgICAgICBjdC5jYW52YXMuaGVpZ2h0ID0gTWF0aC5mbG9vcih3aW5kb3cuaW5uZXJIZWlnaHQpIC0gMTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogUmVzaXplIG9uIHdpbmRvdyByZXNpemUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVzaXplT25XaW5kb3dSZXNpemUoY2FudmFzSWQpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZnVsbFdpbmRvdyhjYW52YXNJZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICAvLyBSZXR1cm4gd2hhdHMgYWN0dWFsbHkgZXhwb3J0ZWRcbiAgICByZXR1cm4ge1xuICAgICAgICBmdWxsV2luZG93OiBmdWxsV2luZG93LFxuICAgICAgICByZXNpemVPbldpbmRvd1Jlc2l6ZTogcmVzaXplT25XaW5kb3dSZXNpemVcbiAgICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy1zcmMvdXRpbHMvY2FudmFzLmpzXG4gKiovIiwiLyoqXG4gKiBWZWN0b3IgbWF0aFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3Ige1xuXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICB0aGlzLnggPSB4IHx8wqAwO1xuICAgICAgICB0aGlzLnkgPSB5IHx8wqAwO1xuICAgIH1cblxuICAgIC8vIE11bHRpcGx5IHdpdGggc2NhbGFyXG4gICAgbXVscyhzY2FsYXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54ICogc2NhbGFyLCB0aGlzLnkgKiBzY2FsYXIpO1xuICAgIH1cblxuICAgIC8vIE11bHRpcGx5IGl0c2VsZiB3aXRoIHNjYWxhclxuICAgIGltdWxzKHNjYWxhcikge1xuICAgICAgICB0aGlzLnggKj0gc2NhbGFyO1xuICAgICAgICB0aGlzLnkgKj0gc2NhbGFyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBNdWx0aXBseSB3aXRoIHNjYWxhclxuICAgIGFkZHMoc2NhbGFyKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCArIHNjYWxhciwgdGhpcy55ICsgc2NhbGFyKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgaXRzZWxmIHdpdGggVmVjdG9yXG4gICAgaWFkZCh2ZWN0b3IpIHtcbiAgICAgICAgdGhpcy54ICs9IHZlY3Rvci54O1xuICAgICAgICB0aGlzLnkgKz0gdmVjdG9yLnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMtc3JjL3V0aWxzL3ZlY3Rvci5qc1xuICoqLyIsIi8qKlxuICogVGhlIGZvcmNlIGFyb3VuZCB1cy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9yY2Uge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYWxsID0ge307XG4gICAgfVxuXG4gICAgY3JlYXRlQWNjZWxlcmF0aW9uKHZlY3Rvcikge1xuICAgICAgICByZXR1cm4gKHZlbG9jaXR5LCB0ZCkgPT4ge1xuICAgICAgICAgICAgdmVsb2NpdHkuaWFkZCh2ZWN0b3IubXVscyh0ZCkpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNyZWF0ZURhbXBpbmcoZGFtcGluZykge1xuICAgICAgICByZXR1cm4gKHZlbG9jaXR5IC8qLCB0ZCAqLykgPT4ge1xuICAgICAgICAgICAgdmVsb2NpdHkuaW11bHMoZGFtcGluZyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY3JlYXRlV2luZCh2ZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuICh2ZWxvY2l0eSwgdGQpID0+IHtcbiAgICAgICAgICAgIHZlbG9jaXR5LmlhZGQodmVjdG9yLmFkZHModGQpKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBhZGRBY2NlbGVyYXRpb24obmFtZSwgdmVjdG9yKSB7XG4gICAgICAgIHRoaXMuYWxsW25hbWVdID0gdGhpcy5jcmVhdGVBY2NlbGVyYXRpb24odmVjdG9yKTtcbiAgICB9XG5cbiAgICBhZGREYW1waW5nKG5hbWUsIGRhbXBpbmcpIHtcbiAgICAgICAgdGhpcy5hbGxbbmFtZV0gPSB0aGlzLmNyZWF0ZURhbXBpbmcoZGFtcGluZyk7XG4gICAgfVxuXG4gICAgYWRkV2luZChuYW1lLCB2ZWN0b3IpIHtcbiAgICAgICAgdGhpcy5hbGxbbmFtZV0gPSB0aGlzLmNyZWF0ZVdpbmQodmVjdG9yKTtcbiAgICB9XG5cbiAgICB1cGRhdGUob2JqZWN0LCB0ZCkge1xuICAgICAgICBmb3IgKHZhciBmb3JjZSBpbiB0aGlzLmFsbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYWxsLmhhc093blByb3BlcnR5KGZvcmNlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxsW2ZvcmNlXShvYmplY3QsIHRkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMtc3JjL3V0aWxzL2ZvcmNlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==