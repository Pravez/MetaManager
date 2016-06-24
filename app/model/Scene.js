"use strict";

var Vector = require('./utility/Vector');
var Fabric = require('createjs-collection');

class Scene{
    
    constructor(sizeX, sizeY, sizeZ) {
        this._size = new Vector({x: sizeX, y: sizeY, z: sizeZ});
        this._robots = [];
    }


    addRobot(robot){
        this._robots.push(robot);
    }

    draw(){
        
    }
}
module.exports = Scene;