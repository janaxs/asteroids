/**
 * Main program, to start all up.
 */
import Canvas from "utils/canvas";

window.app = {
    canvas: Canvas()
};



/**
 * Main to start all up.
 */
function main() {
    "use strict";

    var app = window.app;

    // Resize canvas and make it listen to window resize events
    app.canvas.fullWindow("canvas1");
    app.canvas.resizeOnWindowResize("canvas1");



    console.log("window.onload");
}

window.onload = main;
