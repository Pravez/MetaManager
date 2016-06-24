"use strict";

class Vector{
    constructor(position){
        if(position){
            this._x = position.x || 0;
            this._y = position.y || 0;
            this._z = position.z || null;
        }
    }

    change(position){
        if(position){
            this._x = position.x || this._x;
            this._y = position.y || this._y;
            this._z = position.z || this._z;
        }
    }

    toPosition(){
        return {
            x:this._x,
            y:this._y,
            z:this._z
        }
    }
    
}
module.exports = Vector;