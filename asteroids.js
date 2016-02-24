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
	
	var _canvas = __webpack_require__(1);
	
	var _canvas2 = _interopRequireDefault(_canvas);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.app = {
	    canvas: (0, _canvas2.default)()
	};
	
	/**
	 * Main to start all up.
	 */
	/**
	 * Main program, to start all up.
	 */
	function main() {
	    "use strict";
	
	    var app = window.apps;
	
	    // Resize canvas and make it listen to window resize events
	    app.canvas.fullWindow("canvas1");
	    app.canvas.resizeOnWindowResize("canvas1");
	
	    console.log("window.onload");
	}
	
	window.onload = main;

/***/ },
/* 1 */
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWU4NGNkY2E2MTdmODU3YWJmMGEiLCJ3ZWJwYWNrOi8vLy4vanMtc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vanMtc3JjL3V0aWxzL2NhbnZhcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDakNBLFFBQU8sR0FBUCxHQUFhO0FBQ1QsYUFBUSx1QkFBUjtFQURKOzs7Ozs7OztBQVNBLFVBQVMsSUFBVCxHQUFnQjtBQUNaLGtCQURZOztBQUdaLFNBQUksTUFBTSxPQUFPLElBQVA7OztBQUhFLFFBTVosQ0FBSSxNQUFKLENBQVcsVUFBWCxDQUFzQixTQUF0QixFQU5ZO0FBT1osU0FBSSxNQUFKLENBQVcsb0JBQVgsQ0FBZ0MsU0FBaEMsRUFQWTs7QUFXWixhQUFRLEdBQVIsQ0FBWSxlQUFaLEVBWFk7RUFBaEI7O0FBY0EsUUFBTyxNQUFQLEdBQWdCLElBQWhCLEM7Ozs7Ozs7Ozs7OzttQkN4QmUsWUFBVztBQUN0Qjs7Ozs7QUFEc0I7QUFNdEIsY0FBUyxVQUFULENBQW9CLFFBQXBCLEVBQThCO0FBQzFCLGFBQUksU0FBUyxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBVCxDQURzQjtBQUUxQixhQUFJLEtBQUssT0FBTyxVQUFQLENBQWtCLElBQWxCLENBQUwsQ0FGc0I7O0FBSXpCLFlBQUcsTUFBSCxDQUFVLEtBQVYsR0FBbUIsS0FBSyxLQUFMLENBQVcsT0FBTyxVQUFQLENBQVgsR0FBZ0MsQ0FBaEMsQ0FKTTtBQUt6QixZQUFHLE1BQUgsQ0FBVSxNQUFWLEdBQW1CLEtBQUssS0FBTCxDQUFXLE9BQU8sV0FBUCxDQUFYLEdBQWlDLENBQWpDLENBTE07TUFBOUI7Ozs7O0FBTnNCLGNBbUJiLG9CQUFULENBQThCLFFBQTlCLEVBQXdDO0FBQ3BDLGdCQUFPLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLFlBQVk7QUFDMUMsd0JBQVcsUUFBWCxFQUQwQztVQUFaLENBQWxDLENBRG9DO01BQXhDOzs7QUFuQnNCLFlBNEJmO0FBQ0gscUJBQVksVUFBWjtBQUNBLCtCQUFzQixvQkFBdEI7TUFGSixDQTVCc0I7RUFBWCxDIiwiZmlsZSI6ImFzdGVyb2lkcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYWU4NGNkY2E2MTdmODU3YWJmMGFcbiAqKi8iLCIvKipcbiAqIE1haW4gcHJvZ3JhbSwgdG8gc3RhcnQgYWxsIHVwLlxuICovXG5pbXBvcnQgQ2FudmFzIGZyb20gXCJ1dGlscy9jYW52YXNcIjtcblxud2luZG93LmFwcCA9IHtcbiAgICBjYW52YXM6IENhbnZhcygpXG59O1xuXG5cblxuLyoqXG4gKiBNYWluIHRvIHN0YXJ0IGFsbCB1cC5cbiAqL1xuZnVuY3Rpb24gbWFpbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBhcHAgPSB3aW5kb3cuYXBwcztcblxuICAgIC8vIFJlc2l6ZSBjYW52YXMgYW5kIG1ha2UgaXQgbGlzdGVuIHRvIHdpbmRvdyByZXNpemUgZXZlbnRzXG4gICAgYXBwLmNhbnZhcy5mdWxsV2luZG93KFwiY2FudmFzMVwiKTtcbiAgICBhcHAuY2FudmFzLnJlc2l6ZU9uV2luZG93UmVzaXplKFwiY2FudmFzMVwiKTtcblxuXG5cbiAgICBjb25zb2xlLmxvZyhcIndpbmRvdy5vbmxvYWRcIik7XG59XG5cbndpbmRvdy5vbmxvYWQgPSBtYWluO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy1zcmMvbWFpbi5qc1xuICoqLyIsIi8qKlxuICogQ2FudmFzIHV0aWxpdGllc1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBzaXplIG9mIHRoZSBjYW52YXMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZnVsbFdpbmRvdyhjYW52YXNJZCkge1xuICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzSWQpO1xuICAgICAgICB2YXIgY3QgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICAgICBjdC5jYW52YXMud2lkdGggID0gTWF0aC5mbG9vcih3aW5kb3cuaW5uZXJXaWR0aCkgLSAxO1xuICAgICAgICAgY3QuY2FudmFzLmhlaWdodCA9IE1hdGguZmxvb3Iod2luZG93LmlubmVySGVpZ2h0KSAtIDE7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIFJlc2l6ZSBvbiB3aW5kb3cgcmVzaXplLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlc2l6ZU9uV2luZG93UmVzaXplKGNhbnZhc0lkKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZ1bGxXaW5kb3coY2FudmFzSWQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgLy8gUmV0dXJuIHdoYXRzIGFjdHVhbGx5IGV4cG9ydGVkXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZnVsbFdpbmRvdzogZnVsbFdpbmRvdyxcbiAgICAgICAgcmVzaXplT25XaW5kb3dSZXNpemU6IHJlc2l6ZU9uV2luZG93UmVzaXplXG4gICAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMtc3JjL3V0aWxzL2NhbnZhcy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=