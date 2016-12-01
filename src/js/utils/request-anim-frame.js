/**
 * Shim layer, polyfill, for requestAnimationFrame with setTimeout fallback.
 */

/**
 * requestAnimFrame
 */
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame    ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();



/**
 * cancelRequestAnimFrame
 */
window.cancelRequestAnimFrame = (function() {
    return window.cancelRequestAnimationFrame    ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame    ||
        window.oCancelRequestAnimationFrame      ||
        window.msCancelRequestAnimationFrame     ||
        window.clearTimeout;
})();
