var fishies = [];
var totalMoney = 0;

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
class displayManager{
    constructor(game){
        this.game = game;
    }
    
    update(){
        for(let i = 0; i < caught.length; i++){
            fishies[caught[i].type].amount++;
            totalMoney+= fishies[caught[i].type].val;

        }
        caught = [];
        
    }

    draw(ctx){
        ctx.font = "30px Bradley Hand, cursive";
        ctx.fillText(" $ per | num |      fish      | total", 65, 100);
        ctx.beginPath();
        ctx.strokeStyle = "Black";
        ctx.moveTo(65,120);
        ctx.lineTo(535,120);
        ctx.stroke();
        for(let i = 0; i < fishies.length; i++){
            ctx.fillText(fishies[i].val, 65, 150 + (50*i));
            ctx.fillText(fishies[i].amount, 180, 150 + (50*i));
            ctx.fillText( fishies[i].val*fishies[i].amount, 435, 150 + (50*i));
            fishies[i].anim.drawFrame(this.game.clockTick,ctx,260,130 + (50*i) - fishies[i].anim.height,3);
        }

        ctx.font = "25px Bradley Hand, cursive";
        if(hitOb){
            ctx.fillText("You pull up your line to see the hook", 65, 560);
            ctx.fillText("is missing", 65, 590);
        }
        else
            ctx.fillText(" Depth: "+ Math.round(max_depth) + "ft  Total earned: $" + totalMoney, 65, 560);
        ctx.fillText(" Press the ESC key to go to title screen", 65, 620);
        
    }
}
