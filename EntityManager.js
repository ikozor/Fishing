var caught = [];


class EntityManager{
    constructor(game){
        this.game = game;
        this.states = [];
        this.currState = 'title';

        this.states['title'] = [new title(this.game,100,-50),new boatFisher(this.game,435,450),
            new boat(this.game,400,500),new building(this.game,50,400),new fisher(this.game,180,407),new water(this.game,0,520),new block(this.game,0,537)];

        this.states['underwater'] = [new UWTracker(this.game), new hook(this.game)];

        this.states['result'] = [new BG_Board(50,50)];

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
            depth = 0;
            max_depth = 0;
            this.game.hooked = false;
            this.game.results = false;
            y_speed = 0.01;
            this.currState = "title";
            caught = [];
            stuff = [];

            

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