"use strict";

class Server{

    constructor(localAddress, localPort, remoteAddress, remotePort){
        this.localAddress = localAddress;
        this.localPort = localPort;
        this.remoteAddress = remoteAddress || "0.0.0.0";
        this.remotePort = remotePort || 0;
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