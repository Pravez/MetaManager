'use strict';

var MetaManager = require('../model/MetaManager');

MetaManager.addEntity({
    robot:{
        name: "Ewok"
    },
    device:{
        osc:{
            address: 'localhost',
            port: 15000
        }
    }
});

class Controller{
    static addEntity(options){
        MetaManager.addEntity(options);
    }
    
    static getEntities(){
        return MetaManager.getEntities();
    }

    static getEntity(id){
        MetaManager.getEntity(id);
    }
    
    static enableEntityDevice(id){
        var ent = MetaManager.getEntity(id);
        ent.enableDevice();
    }

    static findDevicesByRegexp(regexp){
        var entities = MetaManager.getEntities();
        var found = [];
        for(let entity of entities){
            //TODO end this with mac address
            if(entity.robot.name.match(regexp))
                found.push(entity);
        }

        return found.sort();
    }
}
module.exports = Controller;