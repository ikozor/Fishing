class BG_Board{
    constructor(x,y){
        Object.assign(this,{x,y});
        this.pic = ASSET_MANAGER.getAsset("./Assets/Objects/CatchBG.png");
    }

    update(){}

    draw(ctx){
        ctx.drawImage(this.pic,this.x,this.y,500,600);
    }

}