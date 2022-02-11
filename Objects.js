class building{
    constructor(game,x,y){
        Object.assign(this, {game, x,y});
        this.pic = ASSET_MANAGER.getAsset("./Assets/Objects/Fishing_hut.png");
    }

    update(){};
    draw(ctx){
        ctx.drawImage(this.pic, this.x,this.y,200,200);
    }
}

class block{
    constructor(game,x,y){
        Object.assign(this, {game, x,y});
        this.pic = ASSET_MANAGER.getAsset("./Assets/Objects/grassblock.png");
    }

    update(){};

    draw(ctx){
        ctx.drawImage(this.pic, this.x,this.y,125,300);
    }
}

class water {
    constructor(game,x,y){
        Object.assign(this, {game, x,y});
        this.pic = ASSET_MANAGER.getAsset("./Assets/Objects/Water.png");
    };

    update(){};

    draw(ctx){
        ctx.drawImage(this.pic, 0,0,96,32,this.x,this.y,600,300);
    }
}

class boat{
    constructor(game,x,y){
        Object.assign(this, {game, x,y});
        this.pic = ASSET_MANAGER.getAsset("./Assets/Objects/Boat.png");
    }

    update(){};

    draw(ctx){
        ctx.drawImage(this.pic,this.x,this.y,100,50);

    }
}

class title{
    constructor(game,x,y){
        this.game = game;
        this.x = x;
        this.y = y;
        this.pic = ASSET_MANAGER.getAsset("./Assets/Objects/Title.png");
    }

    update(){};

    draw(ctx){
        ctx.drawImage(this.pic, this.x,this.y, 400,300);
    }
    
}

class boatFisher{
    constructor(game,x,y){
        Object.assign(this, {game,x,y});
        this.pic1 = ASSET_MANAGER.getAsset("./Assets/Objects/Woodcutter_fish.png");
        this.pic2 = ASSET_MANAGER.getAsset("./Assets/Objects/Woodcutter_hook.png");

        this.anim = []
        this.curr = "fish";
        this.anim["fish"] = new Animator(this.pic1,0,10,48,38,4,0.5,0,false,true);
        this.anim["hook"] = new Animator(this.pic2,0,10,48,38,6,0.2,0,false,false);
        this.anim["cast"] = new Animator(this.pic2,0,10,48,38,6,0.2,0,true,false);
        
    }

    update(){
        if(Math.floor(Math.random()*1000) == 10 && this.curr =="fish"){
            this.curr = "hook";
        }
        else if(this.anim["hook"].isDone()){
            this.curr = "cast";
            this.anim["hook"].elapsedTime = 0;
        }
        else if(this.anim["cast"].isDone()){
            this.curr = "fish";
            this.anim["cast"].elapsedTime = 0;
        }
    }

    draw(ctx){
        this.anim[this.curr].drawFrame(this.game.clockTick,ctx,this.x,this.y,2);
    }
}

class fisher{
    constructor(game,x,y){
        Object.assign(this, {game,x,y});
        this.pic2 = ASSET_MANAGER.getAsset("./Assets/Objects/Fisherman_hook.png");
        this.pic3 = ASSET_MANAGER.getAsset("./Assets/Objects/Fisherman_idle.png");

        this.anim = []
        this.curr = "idle";
        this.anim["cast"] = new Animator(this.pic2,0,10,48,38,6,0.2,0,true,false);
        this.anim["idle"] = new Animator(this.pic3,0,10,48,38,4,0.5,0,false,true);
    }

    update(){}

    draw(ctx){
        this.anim[this.curr].drawFrame(this.game.clockTick,ctx,this.x,this.y,2);
    }
}