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

class Robot{

    constructor(){
        this.name = "Jabberwockie"
    }

    setUp(options){
        if(options){

            this.name = options.name;

            return this;
        }else{
            return undefined;
        }
    }

}
module.exports = Robot;