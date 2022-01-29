const SPEED = 0.8;
var y_speed = 0.01;
var depth = 0;
var spawn = 800;
var hookBB = null;
var caught = [];


class hook{
    constructor(game){
        this.game = game;
        this.x = 250;
        this.y= -500;
        depth = 0;
        this.pic = ASSET_MANAGER.getAsset("./Assets/Objects/hook.png");
        this.BB = new BouncingBox(this.x+25,this.y+900,70,25);
        hookBB = this.BB;
    }

    update(){
        if(this.game.castLine){
            depth += y_speed;
            if(this.game.mouse != null){
                this.x = this.game.mouse.x - 62;
                this.y = this.game.mouse.y-950;   
            }
            if(this.game.hooked){
                y_speed = -0.05;
                if(depth < 0){
                    this.game.castLine = false;
                    depth = 0;
                    y_speed = 0.01;
                }

            }
        }
        else {
            depth = 0;
            this.game.hooked = false;
        }
        this.BB.updateHor(this.x+25);
        this.BB.updateVer(this.y + 970);
        hookBB = this.BB;
    }

    draw(ctx){
        ctx.font = "30px Arial";
        if(this.game.castLine){
            ctx.fillText("Depth: " + Math.round(depth) +" ft", 25, 30 );
            ctx.drawImage(this.pic,this.x,this.y,125,1000);
            if(DEBUG){
                ctx.strokeStyle = "Red";
                ctx.strokeRect(this.BB.x,this.BB.y,this.BB.width,this.BB.height)
            }
        }

    }
}

class UWTracker{
    constructor(game){
        this.game = game;
        this.stuff = [];
        caught = [];
    }

    update(){
        if(!this.game.castLine){
            this.stuff=[];
            caught = [];
        }

        if(spawn == 800)
            this.rand = Math.floor(Math.random()*Math.ceil(200))
        else
            this.rand = Math.floor(Math.random()*Math.ceil(40))

        if(this.rand == 10 && this.game.castLine){            
            this.stuff.push(this.getRandomFish());
            //this.stuff.push(new Underwater(this.game,Math.floor(Math.random()*800),true,depth,"./Assets/Fish/6.png","./Assets/Fish/6R.png",54,22));
        }
        for(let i = 0; i < this.stuff.length; i++){
            if(this.stuff[i].y <= -110 || this.stuff[i] >= 810)
                this.stuff.splice(i,1);
            else{
                this.stuff[i].update();
                if(!this.game.hooked && this.stuff[i].BB.collide(hookBB)){
                    this.game.hooked = true;
                    caught.push(this.stuff[i]);
                    this.stuff[i].hooked = true;
                }
                else if(this.stuff[i].BB.collide(hookBB)){
                    if(this.stuff[i].fish && !this.stuff[i].hooked){
                        caught.push(this.stuff[i]);
                        this.stuff[i].hooked = true;
                    }
                }

            }
        }
        for(let i =0; i < caught.length; i++){
            caught[i].x = hookBB.x;
            caught[i].y = hookBB.y;
        }
    }

    // returns a random fish based on depth
    getRandomFish(){
        if(Math.floor(Math.random()*(depth/0.5)%20 >=10))
            return new Underwater(this.game,Math.floor(Math.random()*800),true,depth,"./Assets/Fish/2.png","./Assets/Fish/2R.png",16,12,true);
        if(Math.floor(Math.random()*(depth)%15 >=10))
            return new Underwater(this.game,Math.floor(Math.random()*800),true,depth,"./Assets/Fish/7.png","./Assets/Fish/7R.png",30,12,true);
        else if(Math.floor(Math.random()*(depth/15)%15 >=10))
            return new Underwater(this.game,Math.floor(Math.random()*800),true,depth,"./Assets/Fish/5.png","./Assets/Fish/5R.png",28,24,true);
        else if(Math.floor(Math.random()*(depth/10)%15 >=10))
            return new Underwater(this.game,Math.floor(Math.random()*800),true,depth,"./Assets/Fish/8.png","./Assets/Fish/8R.png",30,11,true);
        else if(Math.floor(Math.random()*(depth/5)%15 >=10))
            return new Underwater(this.game,Math.floor(Math.random()*800),true,depth,"./Assets/Fish/6.png","./Assets/Fish/6R.png",54,22,true);
        else if(Math.floor(Math.random()*(depth/2)%15 >=10))
            return new Underwater(this.game,Math.floor(Math.random()*800),true,depth,"./Assets/Fish/3.png","./Assets/Fish/3R.png",20,12,true);
        else if(Math.floor(Math.random()*(depth/2)%15 >=10))
            return new Underwater(this.game,Math.floor(Math.random()*800),true,depth,"./Assets/Fish/4.png","./Assets/Fish/4R.png",26,12,true);
        else
            return new Underwater(this.game,Math.floor(Math.random()*800),true,depth,"./Assets/Fish/1.png","./Assets/Fish/1R.png",12,6,true);
    }



    draw(ctx){
        if(this.game.castLine){
        for(let i = 0; i < this.stuff.length; i++)
            this.stuff[i].draw(ctx);
        }
        
    }

}

class Underwater {
    constructor(game,x,moving,startDepth,picture,rpicture,width,height,fish){
        Object.assign(this,{game,x,startDepth,moving,picture,width,height,fish});
        this.y = spawn;
        this.pic = ASSET_MANAGER.getAsset(picture);
        this.rev = ASSET_MANAGER.getAsset(rpicture);
        this.anim = [];
        this.hooked = false;
        if(Math.random() >= 0.5){
            this.mult = 1;
            this.curr = "for";
            this.xBB = this.width;
        }
        else{
            this.mult = -1;
            this.curr = "rev";
            this.xBB = 0;
        }

        this.anim["for"] = new Animator(this.pic,0,0,this.width,this.height,2,0.5,0,false,true);
        this.anim["rev"] = new Animator(this.rev,0,0,this.width,this.height,2,0.5,0,false,true);

        this.BB = new BouncingBox(this.x,this.y,6*this.width,2*this.height);
    }

    update(){
        if(this.moving){                // seperate the things that should swim in the x directions
            if(this.x < 10) {
                this.mult = 1;
                this.curr = "for";
                this.xBB = this.width*(this.width/16);
            }
            else if (this.x > 580) {
                this.mult = -1;
                this.curr = "rev";
                this.xBB = 0;
            }
            this.x += this.mult * SPEED;
            if(this.game.hooked){       // when a fish is caught, make hooked = true and start going back up to the surface
                spawn = -100;
                this.y += 5 * SPEED;
            }
            else {
                spawn = 800;
                this.y -= SPEED;
            }
        }
        this.BB.updateHor(this.x+this.xBB);
        this.BB.updateVer(this.y+ 5*this.height);
    }

    draw(ctx){
        this.anim[this.curr].drawFrame(this.game.clockTick,ctx,this.x,this.y,10);
        if(DEBUG){
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x,this.BB.y,this.BB.width,this.BB.height)
        }
    }

    
}

