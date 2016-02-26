/**
 * Asteroids, the Game
 */
window.Asteroids = (function(){
  var canvas, ct, ship, lastGameTick;

  var init = function(canvas) {
    canvas = document.getElementById(canvas);
    ct = canvas.getContext('2d');
    width = canvas.width,
    height = canvas.height,
    ct.lineWidth = 1;
    ct.strokeStyle = 'hsla(0,0%,100%,1)',
    ship = new Player(10, 20, new Vector(width/2, height/2));

    console.log('Init the game');
  };

  var update = function(td) {
    ship.update(td, width, height);
  };

  var render = function() {
    ct.clearRect(0,0,width,height);
    ship.draw(ct);
  };

  var gameLoop = function() {
    var now = Date.now();
    td = (now - (lastGameTick || now)) / 1000; // Timediff since last frame / gametick
    lastGameTick = now;
    requestAnimFrame(gameLoop);
    update(td);
    render();
  };

  return {
    'init': init,
    'gameLoop': gameLoop
  }
})();
