"use strict";

class Vector2 {
    constructor(position){
        this.x = position.x;
        this.y = position.y;
    }
}

class Vector3 {
    constructor(position){
        if(position.z) {
            this.x = position.x;
            this.y = position.y;
            this.z = position.z;
        }else{
            return new Vector2(position);
        }
    }
}

class Bot {
    constructor(options) {
        if(options){
            this.name = options.name || "A random name";
            this.position = new Vector3(options.position);
            this.size = options.size || 0;
            this.circumference = options.circumference || 0;
            this.numberOfLegs = options.numberOfLegs || 0;
        }
    }
}
module.exports = Bot;
