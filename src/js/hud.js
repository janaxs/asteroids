/**
 * Heads-up display
 */
import FullScreen from "utils/fullscreen";

export default function() {
    "use strict";

    var fullscreenElement;



    /**
     * Initiate the Hud.
     */
    function init(hudId) {
        let body = document.getElementById("body1");
        let fullscreenElement = document.getElementById("fullscreen");

        console.log("Init hud");
        fullscreenElement.addEventListener("click", () => {
            console.log("Request fullscreen");
            body.webkitRequestFullscreen();
        });
    }



    /**
     * Return whats actually exported
     */
    return {
        "init": init
    };
}
