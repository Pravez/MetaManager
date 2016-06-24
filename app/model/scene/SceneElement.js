"use strict";

var Vector = require('../utility/Vector');
var oCanvas = require('ocanvas');


class SceneElement{

    constructor(robot, stage){
        this._robot = robot;
        this._shape = stage.display.ellipse({
            x: robot._position._x, y: robot._position._y,
            radius: 5,
            fill: "#fff"
        }).add();
    }

    update() {
        this._shape.moveTo(this._robot._position._x, this._robot._position._y);
    }
    
}
module.exports = SceneElement;