/**
 * Bullets.
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
         this.bullets = [];
         this.ticksSinceLastAdd = 0;

    }



    draw(ctx, key) {

        ctx.save();

        // ctx.lineWidth = 5;
        // ctx.strokeStyle = 'hsla(0,0%,100%,1)';

        // ctx.fillStyle = "rgb(200,0,0)";
        // ctx.fillRect (10, 10, 50, 50);

        // ctx.moveTo(100, 100);
        // ctx.lineTo(200, 200);
        //console.log(this.bullets.length);
    
        for (let i = 0, len = this.bullets.length; i < len; i++) {
            //
            // ctx.translate(this.bullets[i].x, this.bullets[i].y);
            // ctx.beginPath();
            // ctx.moveTo(this.bullets[i].x, this.bullets[i].y);
            // ctx.lineTo(this.bullets[i].x + 10, this.bullets[i].y + 10);
            
            //ctx.moveTo(0, 0);
            //ctx.lineTo(10, 10);
            
    //        ctx.stroke();
            /*
            ctx.fillRect (
                this.bullets[i].x,
                this.bullets[i].y,
                this.bullets[i].x + 10,
                this.bullets[i].y + 10
            );*/
/*
            ctx.translate(this.bullets[i].x + 40, this.bullets[i].y + 40);
            ctx.beginPath();
            ctx.lineTo(10, 10);
            ctx.stroke();
            */
            
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect (this.bullets[i].x, this.bullets[i].y, 4, 4);

        }

        ctx.stroke();
        ctx.restore();
    }



    add(position) {
        console.log(this.bullets.length);

        if (this.bullets.length < 10) {
            this.bullets.push(position.clone());
            this.ticksSinceLastAdd = 10;
        }
    }



    move(td) {
        for (let i = 0, len = this.bullets.length; i < len; i++) {
            this.bullets[i].x += 1;
            this.bullets[i].y += 1;
        }
        /*
        this.dampForce(this.speed, td);
        this.position.x += this.speed.x * Math.cos(this.direction) * td;
        this.position.y += this.speed.y * Math.sin(this.direction) * td;
        this.position.iadd(this.velocity.muls(td));
        */
    }



    update(key, td, position) {
        // Delay shot when recently did shoot
        if (this.ticksSinceLastAdd > 0) {
            this.ticksSinceLastAdd--;
        }

        if (key.isDown(key.SPACE) && this.ticksSinceLastAdd === 0) {
            this.add(position);
        }

        //Forces.update(this.velocity, td);
        this.move(td);
        //this.stayInArea(width, height);
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
