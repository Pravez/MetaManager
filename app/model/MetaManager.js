"use strict";

var Entity = require('../model/Entity');

var auto_incr_key = 0;
var entities = new Map();

class MetaManager{

    static addEntity(options){
        var ent = new Entity(auto_incr_key);
        if(options.robot){
            ent.setUpRobot(options.robot);
        }
        if(options.device){
            ent.setUpDevice(options.device);
        }

        entities.set(auto_incr_key, ent);
        auto_incr_key += 1;
        return ent;
    }

    static removeEntity(id){
        var entity = entities.get(id);
        entity.stopDevices();
        return entities.delete(id);
    }

    static getEntity(id){
        return entities.get(id);
    }

    static getEntities(){
        var array = [];
        for(let ent of entities.keys()){
            array.push(entities.get(ent));
        }

        return array;
    }
}
module.exports = MetaManager;