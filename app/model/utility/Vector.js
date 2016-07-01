"use strict";

class Vector{
    constructor(x, y, z){
        this.x = x ? typeof x == "string" ? parseInt(x) : x : 0;
        this.y = y ? typeof y == "string" ? parseInt(y) : y : 0;
        this.z = z ? typeof z == "string" ? parseInt(z) : z : 0;
    }

    change(x, y, z){
        this.x = x ? typeof x == "string" ? parseInt(x) : x : this.x;
        this.y = y ? typeof y == "string" ? parseInt(y) : y : this.y;
        this.z = z ? typeof z == "string" ? parseInt(z) : z : this.z;
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