"use strict";

class Server{

    constructor(localAddress, localPort, remoteAddress, remotePort){
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

    findByName(name) {
        for(let bot of this.logicalBots){
            if(bot.bot.name === name)
                return bot;
        }
    }
}
module.exports = Server;