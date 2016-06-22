"use strict";

var CommandType = require('../utility/CommandType');

class Command{
    constructor(commandType, args){
        if(commandType && typeof commandType === "string"){
            this._command = CommandType.get(commandType);
        }else {
            this._command = commandType;
        }

        this._args = args;
    }

    execute(){
        return this._command.cmd + " " + this._args.toString();
    }

    getCommandType(){
        return this._command;
    }
}


console.log(new Command('dx', 20).execute());
module.exports = Command;