const SPEED = 0.8;
var y_speed = 0.01;
var depth = 0;
var spawn = 800;
var hookBB = null;
var caught = [];
var stuff = [];


class hook{
    constructor(game){
        this.game = game;
        this.x = 250;
        this.y= -500;
        this.pic = ASSET_MANAGER.getAsset("./Assets/Objects/hook.png");
        this.BB = new BouncingBox(this.x+25,this.y+900,70,25);
        hookBB = this.BB;
    }

    update(){
        depth += y_speed;
        if(this.game.mouse != null){
            this.x = this.game.mouse.x - 62;
            this.y = this.game.mouse.y-950;   
        }
        if(this.game.hooked){
            y_speed = -0.05;

        }
    
        this.BB.updateHor(this.x+25);
        this.BB.updateVer(this.y + 970);
        hookBB = this.BB;
    }

    draw(ctx){
        ctx.font = "30px Arial";
        ctx.fillText("Depth: " + Math.round(depth) +" ft", 25, 30 );
        ctx.drawImage(this.pic,this.x,this.y,125,1000);
        if(DEBUG){
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x,this.BB.y,this.BB.width,this.BB.height)
        }

    }
}

class UWTracker{
    constructor(game){
        this.game = game;
        stuff = [];
        caught = [];
    }

    update(){
        if(!this.game.castLine){
            stuff=[];
            caught = [];
            
        }

        this.obstiChance = this.game.hooked ? 13 : 14;


        if(spawn == 800)
            this.rand = Math.floor(Math.random()*Math.ceil(2000));
        else
            this.rand = Math.floor(Math.random()*Math.ceil(400));

        if(this.rand <= 12){            
            stuff.push(this.getRandomFish());
            //stuff.push();
        }
        else if(this.rand >=13 && this.rand <= this.obstiChance){
            stuff.push(this.getRandomObstical());
        }

        for(let i = 0; i < stuff.length; i++){
            if(stuff[i].y <= -110 || stuff[i] >= 810)
                stuff.splice(i,1);
            else{
                stuff[i].update();
                if(!this.game.hooked && stuff[i].BB.collide(hookBB)){
                    this.game.hooked = true;
                    caught.push(stuff[i]);
                    stuff[i].hooked = true;
                }
                else if(stuff[i].BB.collide(hookBB) && !stuff[i].hooked){
                    caught.push(stuff[i]);
                    stuff[i].hooked = true;
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
            return new Fish(this.game,Math.floor(Math.random()*800),depth,"./Assets/Fish/2.png","./Assets/Fish/2R.png",16,12);
        if(Math.floor(Math.random()*(depth)%15 >=10))
            return new Fish(this.game,Math.floor(Math.random()*800),depth,"./Assets/Fish/7.png","./Assets/Fish/7R.png",30,12);
        else if(Math.floor(Math.random()*(depth/15)%15 >=10))
            return new Fish(this.game,Math.floor(Math.random()*800),depth,"./Assets/Fish/5.png","./Assets/Fish/5R.png",28,24);
        else if(Math.floor(Math.random()*(depth/10)%15 >=10))
            return new Fish(this.game,Math.floor(Math.random()*800),depth,"./Assets/Fish/8.png","./Assets/Fish/8R.png",30,11);
        else if(Math.floor(Math.random()*(depth/5)%15 >=10))
            return new Fish(this.game,Math.floor(Math.random()*800),depth,"./Assets/Fish/6.png","./Assets/Fish/6R.png",54,22);
        else if(Math.floor(Math.random()*(depth/2)%15 >=10))
            return new Fish(this.game,Math.floor(Math.random()*800),depth,"./Assets/Fish/3.png","./Assets/Fish/3R.png",20,12);
        else if(Math.floor(Math.random()*(depth/2)%15 >=10))
            return new Fish(this.game,Math.floor(Math.random()*800),depth,"./Assets/Fish/4.png","./Assets/Fish/4R.png",26,12);
        else
            return new Fish(this.game,Math.floor(Math.random()*800),depth,"./Assets/Fish/1.png","./Assets/Fish/1R.png",12,6);
    }

    getRandomObstical(){
        if(Math.floor(Math.random()*10 <= 5))
            return new Obstical(this.game,Math.floor(Math.random()*700),this.game.hooked ? -100 : 800,"./Assets/Obsticals/Bomb.png",75,75, this.game.hooked ? -2 : -1) ;
        else
            return new Obstical(this.game,Math.floor(Math.random()*700),this.game.hooked ? 800 : -109,"./Assets/Obsticals/Anchor.png",75,192,3) ;
                                   
    }



    draw(ctx){
        for(let i = 0; i < stuff.length; i++)
            stuff[i].draw(ctx);   
    }

}

class Obstical{
    constructor(game,x,y,picture,width,height,dir){
        Object.assign(this,{game,x,y,width,height,dir});
        this.pic = ASSET_MANAGER.getAsset(picture);
        this.initial = this.y;
        
        this.BB = new BouncingBox(this.x+(0.1*this.width),this.y+(0.1*this.height),0.8*this.width,0.8*this.height);
        
    }

    update(){
        this.game.hooked ? this.y -= this.dir * SPEED : this.y += this.dir * SPEED;
        this.BB.updateHor(this.x+(0.1*this.width));
        this.BB.updateVer(this.y+(0.1*this.height));
        
        this.hooked ? this.game.castLine = false : "";
        
    }

    draw(ctx){
        ctx.drawImage(this.pic,this.x,this.y,this.width,this.height);
        if(DEBUG){
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x,this.BB.y,this.BB.width,this.BB.height);
        }
    }


}

class Fish {
    constructor(game,x,startDepth,picture,rpicture,width,height){
        Object.assign(this,{game,x,startDepth,picture,width,height});
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

