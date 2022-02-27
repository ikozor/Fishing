var SPEED = 0.8;
var y_speed = 0.01;
var depth = 0;
var max_depth = 0;
var spawn = 800;
var hookBB = null;
var stuff = [];
var slow = 1;


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
        if(this.game.clockTick > 0.010){
            y_speed = this.game.hooked ? -5 * this.game.clockTick : this.game.clockTick;
            SPEED =  120 * this.game.clockTick;
            slow = 2
        }else {
            SPEED = 0.8;
            y_speed = this.game.hooked ? -0.05 :0.01;
            slow = 1
        }
        depth += y_speed;
        if(this.game.mouse != null){
            this.x = this.game.mouse.x - 62;
            this.y = this.game.mouse.y-950;   
        }
        if(!this.game.hooked)
            max_depth = depth;

        this.BB.updateHor(this.x+25);
        this.BB.updateVer(this.y + 970);
        hookBB = this.BB;
    }

    draw(ctx){
        ctx.font = "30px Bradley Hand, cursive";
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
    }

    update(){

        this.obstiChance = this.game.hooked ? 15 : 16;
        this.backchance = this.game.hooked ? 27 : 52;

        if(spawn == 800)
            this.rand = Math.floor(Math.random()*Math.ceil(2000/slow));
        else
            this.rand = Math.floor(Math.random()*Math.ceil(400/slow));

        if(this.rand <= 14){            
            stuff.push(this.getRandomFish());
            //stuff.push(new Fish(this.game,Math.floor(Math.random()*800),depth,"./Assets/Fish/4.png","./Assets/Fish/3R.png",16,12,3));
        }
        else if(this.rand >=15 && this.rand <= this.obstiChance){
            stuff.push(this.getRandomObstical());
        }
        else if(this.rand < this.backchance){
            stuff.push(this.getRandomBackground());
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
                stuff.sort((a,b)=> b.pos - a.pos);

            }
        }
        for(let i =0; i < caught.length; i++){
            caught[i].x = hookBB.x;
            caught[i].y = hookBB.y;
        }
    }

    // returns a random fish based on depth
    getRandomFish(){
    let rand = Math.random()*100;
        if(rand < 5 && depth > 150)
            return new Fish(this.game,Math.floor(Math.random()*800),depth,"./Assets/Fish/5.png","./Assets/Fish/5R.png",28,24,7);
        else if(rand < 10 && depth > 100)
            return new Fish(this.game,Math.floor(Math.random()*800),depth,"./Assets/Fish/8.png","./Assets/Fish/8R.png",30,11,6);
        else if(rand < 15 && depth > 75)
            return new Fish(this.game,Math.floor(Math.random()*800),depth,"./Assets/Fish/6.png","./Assets/Fish/6R.png",54,22,5);
        else if(rand < 30 && depth > 50)
            return new Fish(this.game,Math.floor(Math.random()*800),depth,"./Assets/Fish/3.png","./Assets/Fish/3R.png",20,12,3);
        else if(rand < 45 && depth > 30)
            return new Fish(this.game,Math.floor(Math.random()*800),depth,"./Assets/Fish/4.png","./Assets/Fish/4R.png",26,12,4);
        else if(rand < 60 && depth > 20)
            return new Fish(this.game,Math.floor(Math.random()*800),depth,"./Assets/Fish/7.png","./Assets/Fish/7R.png",30,12,2);
        else if(rand < 75 && depth > 10)
            return new Fish(this.game,Math.floor(Math.random()*800),depth,"./Assets/Fish/2.png","./Assets/Fish/2R.png",16,12,1);
        else
            return new Fish(this.game,Math.floor(Math.random()*800),depth,"./Assets/Fish/1.png","./Assets/Fish/1R.png",12,6,0);
    }

    getRandomObstical(){
        if(Math.random()*10 <= 5)
            return new Obstical(this.game,Math.floor(Math.random()*700),this.game.hooked ? -100 : 800,"./Assets/Obsticals/Bomb.png",75,75, this.game.hooked ? -2 : -1);
        else
            return new Obstical(this.game,Math.floor(Math.random()*700),this.game.hooked ? 800 : -109,"./Assets/Obsticals/Anchor.png",75,192,3);
                                   
    }

    getRandomBackground(){
        let rand = Math.random()*100 
        if(rand <= 2)
            return new Background(this.game,Math.floor(Math.random()*700),this.game.hooked ? -100 : 800,"./Assets/Background/Mast.png",200,200);
        else if(rand <= 22)
            return new Background(this.game,Math.floor(Math.random()*700),this.game.hooked ? -100 : 800,"./Assets/Background/Seaweed_1.png",200,200);
        else if(rand <= 40)
            return new Background(this.game,Math.floor(Math.random()*700),this.game.hooked ? -100 : 800,"./Assets/Background/Seaweed_2.png",200,200);
        else if(rand <= 45)
            return new Background(this.game,Math.floor(Math.random()*700),this.game.hooked ? -100 : 800,"./Assets/Background/Steering-wheel.png",200,200);
        else if (rand <= 50)
            return new Background(this.game,Math.floor(Math.random()*700),this.game.hooked ? -100 : 800,"./Assets/Background/Stone_1.png",200,200);
        else if (rand <= 60)
            return new Background(this.game,Math.floor(Math.random()*700),this.game.hooked ? -100 : 800,"./Assets/Background/Stone_2.png",200,200);
        else if (rand <= 70)
            return new Background(this.game,Math.floor(Math.random()*700),this.game.hooked ? -100 : 800,"./Assets/Background/Stone_3.png",200,200);
        else if (rand <= 80)
            return new Background(this.game,Math.floor(Math.random()*700),this.game.hooked ? -100 : 800,"./Assets/Background/Stone_4.png",200,200);
        else if (rand <= 90)
            return new Background(this.game,Math.floor(Math.random()*700),this.game.hooked ? -100 : 800,"./Assets/Background/Stone_5.png",200,200);
        else
            return new Background(this.game,Math.floor(Math.random()*700),this.game.hooked ? -100 : 800,"./Assets/Background/Stone_6.png",200,200);
        
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
        this.pos = 1;
        this.initial = this.y;
        
        this.BB = new BouncingBox(this.x+(0.1*this.width),this.y+(0.1*this.height),0.8*this.width,0.8*this.height);
        
    }

    update(){
        this.game.hooked ? this.y -= this.dir * SPEED : this.y += this.dir * SPEED;
        this.BB.updateHor(this.x+(0.1*this.width));
        this.BB.updateVer(this.y+(0.1*this.height));
        
        if(this.hooked) {
            caught = [];
            depth = 0;
            hitOb = true;
        }
        
    }

    draw(ctx){
        ctx.drawImage(this.pic,this.x,this.y,this.width,this.height);
        if(DEBUG){
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x,this.BB.y,this.BB.width,this.BB.height);
        }
    }


}

class Background {
    constructor(game,x,y,picture,width,height){
        Object.assign(this,{game,x,y,width,height});
        this.pic = ASSET_MANAGER.getAsset(picture);
        this.initial = this.y;
        this.pos = 3;
        this.BB = new BouncingBox(-100,-100,0,0);
        
    }

    update(){
        this.game.hooked ? this.y += SPEED * 5 : this.y -= 2 *SPEED;
        
    }

    draw(ctx){
        ctx.drawImage(this.pic,this.x,this.y,this.width,this.height);
    }
}

class Fish {
    constructor(game,x,startDepth,picture,rpicture,width,height,type){
        Object.assign(this,{game,x,startDepth,picture,width,height,type});
        this.y = spawn;
        this.pos = 2;
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

