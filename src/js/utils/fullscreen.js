/**
 * Fullscreen utilities
 */
import Canvas from "utils/canvas";

export default function() {
    "use strict";
    let canvas = Canvas();



    /**
     * Activate the fullscreen of the element.
     */
    function activate(elementId) {
        var canvas = document.getElementById();
        var ctx = canvas.getContext("2d");

         ctx.canvas.width  = Math.floor(window.innerWidth) - 1;
         ctx.canvas.height = Math.floor(window.innerHeight) - 1;
    }



    /**
     * Eventhandler when fullscreen event succeeded.
     */
    document.setEventHandler("fullscreenchange", () => {
        console.log("event fullscreen change");
        canvas.fullWindow();
    });



    /**
     * Eventhandler when fullscreen event failed.
     */
    document.setEventHandler("fullscreenerror", () => {
        console.log("event fullscreen error");
    });



    /**
     * Return whats actually exported
     */
    return {
        activate: activate
    };
}
