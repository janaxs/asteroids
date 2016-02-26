/**
 * Main program, to start all up.
 */
import "utils/request-anim-frame";
import Key from "utils/key-events";
import Canvas from "utils/canvas";
import Vector from "utils/vector";
import Force from "utils/force";

// Namespace for the app
var app = {
    canvas: Canvas(),
    key:    Key(),
    Vector: Vector,
    force:  new Force()
};

// Add default forces
app.force.addAcceleration('gravity', new Vector(0, 9.82));
app.force.addDamping('drag', 0.97);
app.force.addWind('wind', new Vector(0.5, 0));



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

window.onload = () => { main(app); };
