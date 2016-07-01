"use strict";

var LimitedStack = require('../utility/LimitedStack');
var Command = require('./Command');
var Vector = require('../utility/Vector');
var SceneElement = require('../scene/SceneElement');

class Robot{

    constructor(){
        this._name = "Jabberwockie";
        
        this._commands = new LimitedStack(20, new Command("start"));

        this._sceneElement = new SceneElement();

    }

    setUp(options){
        if(options){

            this._name = options.name;
            this._position = new Vector(options.position.x, options.position.y, options.position.z);
            this._velocity = new Vector(0, 0, 0);
            this.valuesQty = 7;

            this._values = {
                'h':0,
                'r':0,
                'dx':0,
                'dy':0,
                'alt':0,
                'freq':0
            };
            this._version = "1.1.1";

            this.setUpSceneElement(options);

            return this;
        }else{
            return undefined;
        }
    }

    setUpSceneElement(options){
        this._sceneElement.setBody({
            mass:1,
            type: 'box',
            values:{
                width: 1,
                height:1,
                depth:1
            },
            position:{
                x: this._position.x,
                y: this._position.y,
                z: this._position.z
            }
        });
        this._sceneElement.setMesh({
            material: {
                type: "phong",
                color: options.color || 0xffffff
            },
            type: "box",
            width: 2,
            height: 2,
            depth: 2,
            widthSeg: 10,
            heightSeg: 10,
            castShadow: true,
            receiveShadow: true
        })
    }

    hasBeenUpdated(){
        if(this.valuesQty === 0){
            this.valuesQty = 7;
            return true;
        }else{
            return false;
        }
    }

    modifyValue(name, value){
        if(name === 'version')
            this._version = value;
        else
            this._values[name] = parseInt(value);
        this.valuesQty -= 1;
    }

    modify(options){
        this._name = options.name || this._name;
        this._position.change(options.position.x || this._position.x, options.position.y || this._position.y, options.position.z || this._position.z)
    }

    addExecutedCommand(command){
        this._commands.add(command);
    }

    getExecutedCommands(){
        return this._commands;
    }
    
    getLastCommand(){
        return this._commands.head();
    }

    executeCommand(cmd) {
        this.addExecutedCommand(cmd);
        switch(cmd._command.cmd){
            case "dx":
                this._velocity.x = cmd._args;
                break;
            case "dy":
                this._velocity.y = cmd._args;
                break;
        }
        this._sceneElement.setVelocity(this._velocity.x, this._velocity.y, this._velocity.z);
    }
}
module.exports = Robot;