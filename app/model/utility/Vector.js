"use strict";

class Vector{
    constructor(x, y, z){
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }

    change(x, y, z){
        this.x = x || this.x;
        this.y = y || this.y;
        this.z = z || this.z;
    }

    toPosition(){
        return {
            x:this.x,
            y:this.y,
            z:this.z
        }
    }
    
}
module.exports = Vector;