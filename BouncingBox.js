class BouncingBox {
    constructor(x,y,width,height,){
        Object.assign(this,{x,y,width,height})
        this.left = x;
        this.top = y;
        this.right = this.left + width;
        this.bot = this.top + height;
    }

    updateHor(x){
        this.x = x;
        this.left = x;
        this.right = this.left + this.width;
    }

    updateVer(y){
        this.y = y;
        this.top = y;
        this.bot = this.top+ this.height;
    }

    collide(obj){
        if(this.right > obj.left && this.left < obj.right && this.top < obj.bot && this.bot > obj.top)
            return true;
        return false;
    }
    

}