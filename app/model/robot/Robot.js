"use strict";

var LimitedStack = require('../utility/LimitedStack');
var Command = require('./Command');
var Vector = require('../utility/Vector');

class Robot{

    constructor(){
        this._name = "Jabberwockie";
        
        this._commands = new LimitedStack(20, new Command("start"));
    }

    setUp(options){
        if(options){

            this._name = options.name;
            this._position = new Vector(options.position);

            this._values = {
                'h':0,
                'r':0,
                'dx':0,
                'dy':0,
                'alt':0,
                'freq':0,
            };
            this._version = "1.1.1";

            this.valuesQty = 7;

            return this;
        }else{
            return undefined;
        }
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

}
module.exports = Robot;