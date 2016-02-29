/**
 * The ship.
 */
import Vector from "utils/vector";

 export default class Bullet {

     constructor(options = {}) {


///

         this.height     = options.height || 20;
         this.width      = options.width  || 10;
         this.position   = options.position || new Vector();
         this.velocity   = options.velocity || new Vector();
         this.speed      = options.speed || new Vector();
         this.direction  = options.direction || 0;

         this.accelerateForce = options.accelerateForce || force.createAcceleration(new Vector(80, 80));
         this.breakForce = options.breakForce || force.createDamping(0.97);
         this.dampForce = options.dampForce || force.createDamping(0.999);
    }



    draw(ctx, key) {
        var x = this.width / 2;
        var y = this.height / 2;

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'hsla(0,0%,100%,1)';

        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.direction + Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(0, -y);
        ctx.lineTo(x, y);
        ctx.lineTo(0, 0.8 * y);
        ctx.lineTo(-x, y);
        ctx.lineTo(0, -y);

        if (key.isDown(key.UP, key.W)) {
            ctx.moveTo(0, y);
            ctx.lineTo(-2, y + 10);
            ctx.lineTo(0, y + 8);
            ctx.lineTo(2, y + 10);
            ctx.lineTo(0, y);
        }

        if (key.isDown(key.DOWN, key.S)) {
            ctx.moveTo(y + 4, 0);
            ctx.arc(0, 0, y + 4, 0, Math.PI, true);
        }

        ctx.stroke();
        ctx.restore();
    }



    moveTo(position) {
        this.position = position;
        this.position.x += this.width / 2;
        this.position.y += this.height / 2;
    }



    moveForward(td) {
        this.dampForce(this.speed, td);
        this.position.x += this.speed.x * Math.cos(this.direction) * td;
        this.position.y += this.speed.y * Math.sin(this.direction) * td;
        this.position.iadd(this.velocity.muls(td));
    }


    update(key, td, width, height) {
        if (key.isDown(key.UP, key.W)) {
            this.throttle(td);
        }

        if (key.isDown(key.LEFT, key.A)) {
            this.rotateLeft();
        }

        if (key.isDown(key.DOWN, key.S)) {
            this.breaks(td);
        }

        if (key.isDown(key.RIGHT, key.D)) {
            this.rotateRight();
        }

        //Forces.update(this.velocity, td);
        this.moveForward(td);
        this.stayInArea(width, height);
    }



    stayInArea(width, height) {
        if (this.position.y < -this.height) {
            this.position.y = height;
        }

        if (this.position.y > height) {
            this.position.y = -this.height;
        }

        if (this.position.x > width) {
            this.position.x = -this.width;
        }

        if (this.position.x < -this.width) {
            this.position.x = width;
        }
    }
}
