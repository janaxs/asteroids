/**
 * Canvas utilities
 */

export default function() {
    "use strict";

    /**
     * Set the size of the canvas.
     */
    function fullWindow(canvasId) {
        var canvas = document.getElementById(canvasId);
        var ct = canvas.getContext("2d");

         ct.canvas.width  = Math.floor(window.innerWidth) - 1;
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
}
