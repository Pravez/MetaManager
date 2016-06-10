'use strict';

var Bot = require('../model/Bot');
var LogicalBot = require('../model/LogicalBot');
var Server = require('../model/Server');
//var Bluetooth = require('../model/BluetoothServer');


var MetaServer = new Server();
var bot1 = MetaServer.addLogicalBot(new LogicalBot(new Bot({position:{x:2, y:2}}), 'localhost', 9997));
var bot2 = MetaServer.addLogicalBot(new LogicalBot(new Bot({position:{x:2, y:2, z:3}}), 'localhost', 9997));

//bot1.oscServer.send("/s_new", ["default", 100], bot2.oscServer.getLocalAddr, bot2.oscServer.getLocalPort);



class Controller {
    static getBots(){
        return MetaServer.bots;
    }

    static addBot(bot){
        MetaServer.addLogicalBot(bot);
    }
}
module.exports = Controller;