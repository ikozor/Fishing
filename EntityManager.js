class EntityManager{
    constructor(game){
        this.game = game;
        this.states = [];
        this.currState = 'title';

        this.states['title'] = [new title(this.game,100,-50),new boatFisher(this.game,435,470),
            new boat(this.game,400,500),new building(this.game,50,400),new fisher(this.game,180,427),new water(this.game,0,520),new block(this.game,0,537)];

        this.states['underwater'] = [new hook(this.game),new UWTracker(this.game)];

    }

    update(){
        if(this.game.castLine){
            this.currState = 'underwater';
        }
        else {
            depth = 0;
            this.game.hooked = false;
            y_speed = 0.01;
            this.currState = "title";
            caught = [];
            stuff = [];

            

        }
        if(depth < 0)
            this.game.castLine = false;
        


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