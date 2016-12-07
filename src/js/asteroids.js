/**
 * Asteroids, the Game
 */
import "utils/request-anim-frame";
import Canvas from "utils/canvas";
import Vector from "utils/vector";
import Key from "utils/key-events";
import Ship from "ship";
import Bullet from "bullet";

export default function() {
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


    /**
     * Set the size of the canvas.
     */
    function init(canvasId) {
        // Set canvas drawing context
        var canvas = document.getElementById(canvasId);
        ctx = canvas.getContext("2d");

        // Resize canvas and make it listen to window resize events
        var canvasUtils = Canvas();
        canvasUtils.fullWindow("canvas1");
        canvasUtils.resizeOnWindowResize("canvas1");

        // TODO Need to support resize
        width = canvas.width;
        height = canvas.height;

        // Default draw style
        //ctx.lineWidth = 1;
        //ctx.strokeStyle = "hsla(0,0%, 100%, 1)";

        // Add the ship and place it in the middle
        ship = new Ship();
        ship.moveTo(new Vector(canvas.width / 2, canvas.height / 2));

        // Add Bullets
        bullet = new Bullet();

        // Key pressed
        key = Key();
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
        var td = (now - (lastGameTick || now)) / 1000;
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
}
