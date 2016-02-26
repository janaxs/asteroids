/**
 * Trace the keys pressed
 */
export default function() {
    "use strict";

    var pressed = {};

    // On key release
    window.addEventListener('keyup', event => {
        delete pressed[event.keyCode];
    });

    // On key press
    window.addEventListener('keydown', event => {
        pressed[event.keyCode] = true;
    });

    // Return what to export
    return {
        LEFT:   37,
        UP:     38,
        RIGHT:  39,
        DOWN:   40,
        SPACE:  32,
        A:      65,
        S:      83,
        D:      68,
        W:      87,

        isDown: function(key1, key2) {
            return pressed[key1] || pressed[key2];
        }
    };
}
