'use strict';

var Bot = require('../model/Bot');
var LogicalBot = require('../model/LogicalBot');

var bots = [];

bots.push(new LogicalBot(new Bot({position:{x:2, y:2}}), 'localhost', 9997).setUp());
bots.push(new LogicalBot(new Bot({position:{x:2, y:2, z:3}}), 'localhost', 9997).setUp());



//bot1.oscServer.send("/s_new", ["default", 100], bot2.oscServer.getLocalAddr, bot2.oscServer.getLocalPort);



class Controller {
    static getBots(){
        return bots;
    }

    static addBot(bot){
        bots.push(bot);
    }
}
module.exports = Controller;