"use strict";

class Vector{
    constructor(x, y, z){
        this.x = x ? typeof x == "string" ? parseInt(x) : x : 0;
        this.y = y ? typeof y == "string" ? parseInt(y) : y : 0;
        this.z = z ? typeof z == "string" ? parseInt(z) : z : 0;
    }

    copy(position){
        if(position){
            this.x = position.x ? typeof position.x == "string" ? parseInt(position.x) : position.x : this.x;
            this.y = position.y ? typeof position.y == "string" ? parseInt(position.y) : position.y : this.y;
            this.z = position.z ? typeof position.z == "string" ? parseInt(position.z) : position.z : this.z;
        }
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