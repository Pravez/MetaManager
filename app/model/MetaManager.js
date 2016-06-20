"use strict";

var Entity = require('../model/Entity');
var BluetoothManager = require('./BluetoothManager');
var OSCManager = require('./OSCManager');

var auto_incr_key = 0;
var entities = new Map();

class MetaManager{

    /**
     * To add an entity
     * @param options
     * @returns {Entity}
     */
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

    /**
     * To remove an entity with a certain ID
     * @param id
     * @returns {boolean}
     */
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

    static bluetoothListener(device, message){
        console.log("From "+device+" " + message);
    }

    static oscListener(device, message){

    }
}
module.exports = MetaManager;