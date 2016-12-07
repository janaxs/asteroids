/**
 * Main program, to start all up.
 */
import Asteroids from "asteroids";



/**
 * Main to start all up.
 */
window.addEventListener("load", function () {
    "use strict";

    var asteroids = Asteroids();

    asteroids.init("canvas1");
    asteroids.gameLoop();
}, false);
