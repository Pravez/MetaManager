"use strict";

var Bot = require('../model/Bot');
var OSCServer = require('../model/OSCServer');
var ServerManager = require('../model/ServerManager');

/**
 * Class to manage logical bots, which means managing the bot in interaction
 * with the real bot and with the i-score server
 */
class LogicalBot {

    constructor(metabot, localAddr, localPort){
        this.bot = metabot;
        this.oscServer = new OSCServer(localAddr, localPort).setListener();
        this.botServer = undefined;
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
}
module.exports = LogicalBot;