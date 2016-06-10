"use strict";

class Server{

    constructor(){
        this.logicalBots = [];
    }

    addLogicalBot(logicalBot){
        logicalBot.setOSCServerUp(Server.onOSCMessage);
        logicalBot.setUp();
        this.logicalBots.push(logicalBot);

        return logicalBot;
    }
    
    static onOSCMessage(logicalBot, message){
        console.log(logicalBot.bot.name + "received : " + message);
    }

    get bots(){ return this.logicalBots; }

}
module.exports = Server;