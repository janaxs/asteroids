/**
 * Main program, to start all up.
 */
import Asteroids from "asteroids";



/**
 * Main to start all up.
 */
function main() {
    "use strict";

    var asteroids = Asteroids();

    asteroids.init("canvas1");
    asteroids.gameLoop();
}

window.addEventListener("load", main, false);
