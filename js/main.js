/**
 * Main program, to start all up.
 */
window.onload = function () {
    "use strict";

    var app = window.app || {};

    // Resize canvas and make it listen to window resize events
    app.canvas.resize("canvas1");
    app.canvas.resizeOnWindowResize("canvas1");

    console.log("window.onload");
};
