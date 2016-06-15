'use strict';

var Bot = require('../model/Bot');
var LogicalBot = require('../model/LogicalBot');
var Server = require('../model/Server');
var BluetoothServer = require('../model/BluetoothServer');

var MetaServer = new Server();
var bot1 = MetaServer.addLogicalBot(new LogicalBot(new Bot({name: "Jimmy", position:{x:2, y:2}}), 'localhost', 15000));
var bot2 = MetaServer.addLogicalBot(new LogicalBot(new Bot({name: "Lokhart", position:{x:2, y:2, z:3}}), 'localhost', 16000));

//bot1.oscServer.send("/s_new", ["default", 100], bot2.oscServer.getLocalAddr, bot2.oscServer.getLocalPort);

BluetoothServer.setupBluetooth();


class Controller {
    static getBots(){
        return MetaServer.bots;
    }

    static addBot(bot){
        MetaServer.addLogicalBot(bot);
    }

    static findByName(name){
        return MetaServer.findByName(name);
    }
}
module.exports = Controller;