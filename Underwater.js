const SPEED = 0.8;
var depth = 0;

class hook{
    constructor(game){
        this.game = game;
        this.x = 250;
        this.y= -500;
        depth = 0;
        this.pic = ASSET_MANAGER.getAsset("./Assets/Objects/hook.png");
    }

    update(){
        if(this.game.castLine){
            depth += 0.01;
            if(this.game.mouse != null){
                this.x = this.game.mouse.x - 62;
                this.y = this.game.mouse.y-950;   
            }
        }
        else depth = 0;
    }

    draw(ctx){
        ctx.font = "30px Arial";
        if(this.game.castLine){
            ctx.fillText("Depth: " + Math.round(depth) +" ft", 25, 30 );
            ctx.drawImage(this.pic,this.x,this.y,125,1000);
        }

    }
}

class UWTracker{
    constructor(game){
        this.game = game;
        this.stuff = [];
    }

    update(){
        if(!this.game.castLine)
            this.stuff=[];
        if(Math.floor(Math.random()*Math.ceil(200)) == 10 && this.game.castLine){
            this.stuff.push(this.getRandomFish());

        }
        for(let i = 0; i < this.stuff.length; i++){
            if(this.stuff[i].y <= 0)
                this.stuff.splice(i,1);
            else
                this.stuff[i].update();
            
            
        }
    }

    getRandomFish(){
        if(Math.floor(Math.random()*(depth/0.5)%20 >=10))
            return new Underwater(this.game,Math.floor(Math.random()*800),true,depth,"./Assets/Fish/2.png","./Assets/Fish/2R.png",16,12);
        else if(Math.floor(Math.random()*(depth)%15 >=10))
            return new Underwater(this.game,Math.floor(Math.random()*800),true,depth,"./Assets/Fish/7.png","./Assets/Fish/7R.png",30,12);
        else if(Math.floor(Math.random()*(depth/15)%15 >=10))
            return new Underwater(this.game,Math.floor(Math.random()*800),true,depth,"./Assets/Fish/5.png","./Assets/Fish/5R.png",28,24);
        else if(Math.floor(Math.random()*(depth/10)%15 >=10))
            return new Underwater(this.game,Math.floor(Math.random()*800),true,depth,"./Assets/Fish/8.png","./Assets/Fish/8R.png",30,11);
        else if(Math.floor(Math.random()*(depth/5)%15 >=10))
            return new Underwater(this.game,Math.floor(Math.random()*800),true,depth,"./Assets/Fish/6.png","./Assets/Fish/6R.png",54,22);
        else if(Math.floor(Math.random()*(depth/2)%15 >=10))
            return new Underwater(this.game,Math.floor(Math.random()*800),true,depth,"./Assets/Fish/3.png","./Assets/Fish/3R.png",20,12);
        else if(Math.floor(Math.random()*(depth/2)%15 >=10))
            return new Underwater(this.game,Math.floor(Math.random()*800),true,depth,"./Assets/Fish/4.png","./Assets/Fish/4R.png",26,12);
        else
            return new Underwater(this.game,Math.floor(Math.random()*800),true,depth,"./Assets/Fish/1.png","./Assets/Fish/1R.png",12,6);
    }



    draw(ctx){
        if(this.game.castLine){
        for(let i = 0; i < this.stuff.length; i++)
            this.stuff[i].draw(ctx);
        }
        
    }

}

class Underwater {
    constructor(game,x,moving,startDepth,picture,rpicture,width,height){
        Object.assign(this,{game,x,startDepth,moving,picture,width,height});
        this.y =800;
        this.pic = ASSET_MANAGER.getAsset(picture);
        this.rev = ASSET_MANAGER.getAsset(rpicture);
        this.anim = [];
        if(Math.random() >= 0.5){
            this.mult = 1;
            this.curr = "for";
        }
        else{
            this.mult = -1;
            this.curr = "rev";
        }

        this.anim["for"] = new Animator(this.pic,0,0,this.width,this.height,2,0.5,0,false,true);
        this.anim["rev"] = new Animator(this.rev,0,0,this.width,this.height,2,0.5,0,false,true);
    }

    update(){
        if(this.moving){
            if(this.x < 10) {
                this.mult = 1;
                this.curr = "for";
            }
            else if (this.x > 580) {
                this.mult = -1;
                this.curr = "rev";
            }
            this.x += this.mult * SPEED;
            this.y -= SPEED;
        }
    }

    draw(ctx){
        this.anim[this.curr].drawFrame(this.game.clockTick,ctx,this.x,this.y,10);
        
    }

    
}

