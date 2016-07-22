"use strict";

var exports = module.exports = {};

var Types = {
    NUMBER: "number",
    STRING: "string",
    BOOL: "boolean",
    SINGLE_VALUE: "number",
    NO_TYPE: "NO TYPE",
    UNDEFINED: "undefined"
};

exports.Types = Types;

var CommandTypes = {
    PRESCALER: {cmd:'prescaler', args: 1, type:Types.NUMBER, description: 'Prescaler'},
    TIME: {cmd:'t', args:1, type:Types.NUMBER, description: 'Time'},
    MOVES_T: {cmd:'moves_t', args:1, type:Types.NUMBER, description: 'Time for special moves'},
    MOVE: {cmd:'move', args:1, type:Types.BOOL, description: 'Enable or disable move'},
    VOLTAGE: {cmd:'voltage', args:1, type:Types.NUMBER, description: 'Average voltage (dV)'},
    FREQUENCY: {cmd:'freq', args:1, type:Types.NUMBER, description: 'Time factor gain'},
    BACK_LEGS: {cmd:'backLegs', args:1, type:Types.BOOL, description: 'Legs backwards'},
    ALTITUDE: {cmd:'alt', args:1, type:Types.NUMBER, description: 'Height of steps'},
    SIZE: {cmd:'r', args:1, type:Types.NUMBER, description: 'Robot size'},
    HEIGHT: {cmd:'h', args:1, type:Types.NUMBER, description: 'Robot height'},
    SPEED_X: {cmd:'dx', args:1, type:Types.NUMBER, description: 'Dx'},
    SPEED_Y: {cmd:'dy', args:1, type:Types.NUMBER, description: 'Dy'},
    CRAB: {cmd:'crab', args:1, type:Types.NUMBER, description: 'Crab'},
    TURN: {cmd:'turn', args:1, type:Types.NUMBER, description: 'Turn'},
    FRONT_H: {cmd:'frontH', args:1, type:Types.NUMBER, description: 'Front delta H'},
    SMOOTH_BACK_LEGS: {cmd:'smoothBackLegs', args:1, type:Types.NUMBER, description: 'Smooth 180'},
    GAIT: {cmd:'gait', args:1, type:Types.NUMBER, description: 'Gait {0: walk, 1: trot, 2: music}'},
    COLOR: {cmd:'color', args:1, type:Types.NUMBER, description: "Robot's color"},
    FREQ_LEG_1: {cmd:'freqLeg1', args:1, type:Types.NUMBER, description: "Leg 1's frequence"},
    FREQ_LEG_2: {cmd:'freqLeg2', args:1, type:Types.NUMBER, description: "Leg 2's frequence"},
    FREQ_LEG_3: {cmd:'freqLeg3', args:1, type:Types.NUMBER, description: "Leg 3's frequence"},
    FREQ_LEG_4: {cmd:'freqLeg4', args:1, type:Types.NUMBER, description: "Leg 4's frequence"},
    MODE_LEG_1: {cmd:'modeLeg1', args:1, type:Types.SINGLE_VALUE, description: 'Mode (0:Perc, 1:TODO) - Always give value 0'},
    MODE_LEG_2: {cmd:'modeLeg2', args:1, type:Types.SINGLE_VALUE, description: 'Mode (0:Perc, 1:TODO) - Always give value 0'},
    MODE_LEG_3: {cmd:'modeLeg3', args:1, type:Types.SINGLE_VALUE, description: 'Mode (0:Perc, 1:TODO) - Always give value 0'},
    MODE_LEG_4: {cmd:'modeLeg4', args:1, type:Types.SINGLE_VALUE, description: 'Mode (0:Perc, 1:TODO) - Always give value 0'},
    PHASE_LEG_1: {cmd:'phaseLeg1', args:1, type:Types.NUMBER, description: "Leg 1's phase"},
    PHASE_LEG_2: {cmd:'phaseLeg2', args:1, type:Types.NUMBER, description: "Leg 2's phase"},
    PHASE_LEG_3: {cmd:'phaseLeg3', args:1, type:Types.NUMBER, description: "Leg 3's phase"},
    PHASE_LEG_4: {cmd:'phaseLeg4', args:1, type:Types.NUMBER, description: "Leg 4's phase"},
    COMMANDS: {cmd:'params', args:0, type:Types.NO_TYPE, description: "Get all possible commands"},
    VERSION: {cmd:'version', args:0, type:Types.NO_TYPE, description: "Get version of the firmware"},
    START: {cmd: 'start', args: 0, type:Types.NO_TYPE, description:"Start the robot"},
    STOP: {cmd: 'stop', args:0, type:Types.NO_TYPE, description:"Stop the robot"}
};

var commandsMap = new Map();

for(var key in CommandTypes){
    if (CommandTypes.hasOwnProperty(key)) {
        var value = CommandTypes[key];
        commandsMap.set(value.cmd, value);
    }
}

exports.CommandTypes = commandsMap;


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

exports.Vector = Vector;

class StackNode{

    constructor(value, after){
        this._value = value;
        this._before = undefined;
        if(after)
            after._before = this;
    }
}

class LimitedStack{

    constructor(size, firstValue){
        this._size = size;
        this._elements = 1;

        this._head = new StackNode(firstValue, undefined);
        this._tail = this._head;
    }

    add(value){
        if(this._elements >= this._size){
            this._tail = this._tail._before;
        }else{
            this._elements += 1;
        }

        this._head = new StackNode(value, this._head);
    }

    head(){
        return this._head._value;
    }

    get(position){
        if(position < this._size) {
            var current = this._tail;
            for (let i = 0; i < (this._size - position); i++) {
                current = current._before;
            }

            return current._value;
        }else{
            throw "Not in array";
        }
    }
}

exports.LimitedStack = LimitedStack;