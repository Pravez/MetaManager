"use strict";

var Bot = require('../model/Bot');
var OSCServer = require('../model/OSCServer');
var ServerManager = require('../model/ServerManager');
var Server = require('../model/Server');

/**
 * Class to manage logical bots, which means managing the bot in interaction
 * with the real bot and with the i-score server
 */
class LogicalBot {

    constructor(metabot, localAddr, localPort){
        this.bot = metabot;
        this.oscServer = new OSCServer(localAddr, localPort);
        this.botServer = undefined;

        this.onOSCMessage = Server.onOSCMessage;
    }

    /**
     * Function to call juste after the constructor, to setup the bot (launch the OSC server ...)
     * @returns {LogicalBot}
     */
    setUp(){
        try {
            ServerManager.addServer(this.oscServer);
        } catch (error) {
            ServerManager.enableServer(ServerManager.changeServerPort(this.oscServer));
        }

        this.oscServer.listen();
        return this;
    }

    /**
     * Function to set the OSCServer of a logicalbot up
     */
    setOSCServerUp(){
        this.oscServer.setListener(this.onOSCMessageReceived);
    }

    onOSCMessageReceived(message){
        this.onOSCMessage(this, message);
    }
}
module.exports = LogicalBot;