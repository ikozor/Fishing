var caught = [];


class EntityManager{
    constructor(game){
        this.game = game;
        this.states = [];
        this.currState = 'title';

        this.states['title'] = [new title(this.game,100,-50),new boatFisher(this.game,435,450),
            new boat(this.game,400,500),new building(this.game,50,400),new fisher(this.game,180,407),new water(this.game,0,520),new block(this.game,0,537)];

        this.states['underwater'] = [new UWTracker(this.game), new hook(this.game)];
        this.states['result'] = [new BG_Board(50,50), new displayManager(this.game)];

        

    }

    update(){
        if(this.game.results){
            if(this.game.castLine)  this.game.castLine = false;
            if(this.game.hooked)  this.game.hooked = false;
            this.currState = 'result';

        }
        else if(this.game.castLine){
            this.currState = 'underwater';
        }
        else {
            fishies = [
                {amount:0,val:10,anim:new Animator(ASSET_MANAGER.getAsset("./Assets/Fish/1.png"),0,0,12,6,2,0.5,0,false,true)},
                {amount:0,val:20,anim:new Animator(ASSET_MANAGER.getAsset("./Assets/Fish/2.png"),0,0,16,12,2,0.5,0,false,true)},
                {amount:0,val:35,anim:new Animator(ASSET_MANAGER.getAsset("./Assets/Fish/7.png"),0,0,30,12,2,0.5,0,false,true)},
                {amount:0,val:50,anim:new Animator(ASSET_MANAGER.getAsset("./Assets/Fish/3.png"),0,0,20,12,2,0.5,0,false,true)},
                {amount:0,val:85,anim:new Animator(ASSET_MANAGER.getAsset("./Assets/Fish/4.png"),0,0,26,12,2,0.5,0,false,true)},
                {amount:0,val:150,anim:new Animator(ASSET_MANAGER.getAsset("./Assets/Fish/6.png"),0,0,54,22,2,0.5,0,false,true)},
                {amount:0,val:300,anim:new Animator(ASSET_MANAGER.getAsset("./Assets/Fish/8.png"),0,0,30,11,2,0.5,0,false,true)},
                {amount:0,val:500,anim:new Animator(ASSET_MANAGER.getAsset("./Assets/Fish/5.png"),0,0,28,24,2,0.5,0,false,true)}
                ];
            depth = 0;
            max_depth = 0;
            this.game.hooked = false;
            this.game.results = false;
            y_speed = 0.01;
            this.currState = "title";
            caught = [];
            stuff = [];
            totalMoney = 0;

            

        }
        if(depth < 0)
            this.game.results = true;
        


        for(let i = 0; i < this.states[this.currState].length; i ++){
            this.states[this.currState][i].update();
        }

    }

    draw(ctx){
        for(let i = 0; i < this.states[this.currState].length; i++){
            this.states[this.currState][i].draw(ctx);
        }
    }
}