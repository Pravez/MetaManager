"use strict";

var Vector = require('./../utility/Vector');
var SceneElement = require('./SceneElement');
var oCanvas = require('ocanvas');


class Scene{
    
    constructor(sizeX, sizeY, sizeZ) {
        this._size = new Vector({x: sizeX, y: sizeY, z: sizeZ});
        this._robots = [];

        this._elements = [];

        this._stage = undefined;
    }

    loadStage(stageName){
        this._stage = oCanvas.create({
            canvas: "#"+stageName,
            background: "#222",
            fps: 60
        });
    }

    addRobot(robot){
        this._robots.push(robot);

        this._elements.push(new SceneElement(robot, this._stage))
    }

    draw(){
        this._elements.forEach(function(e){
            e.update();
        });

        this._stage.redraw();
    }
}
module.exports = Scene;