'use strict';

var MetaManager = require('../model/MetaManager');

MetaManager.addEntity({
    robot:{
        name: "Ewok",
        position:{
            x:100,
            y:100
        }
    },
    device:{
        osc:{
            address: 'localhost',
            port: 15000
        }
    }
});

class Controller{
    static getScene(){
        return MetaManager.getScene();
    }
    
    static addEntity(options){
        MetaManager.addEntity(options);
    }

    static modifyEntity(entity, options){
        entity.modify(options);
    }
    
    static getEntities(){
        return MetaManager.getEntities();
    }

    static getEntity(id){
        return MetaManager.getEntity(id);
    }

    static switchEntityOSCListening(id){
        var ent = MetaManager.getEntity(id);
        ent.switchOSCState();
    }
    
    static requestRobotInfo(id){
        return MetaManager.getRobotInformationsFromDevice(id);
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