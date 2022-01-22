class EntityManager{
    constructor(game){
        this.game = game;
    }

    create(){

        this.game.addEntity(new hook(this.game));
        this.game.addEntity(new UWTracker(this.game));
        this.game.addEntity(new block(this.game,0,537));
        this.game.addEntity(new water(this.game,0,520));
        this.game.addEntity(new fisher(this.game,180,427));
        this.game.addEntity(new building(this.game,50,400));
        this.game.addEntity(new boat(this.game,400,500));
        this.game.addEntity(new boatFisher(this.game,435,470));
        this.game.addEntity(new title(this.game,100,-50));
        
    }
}