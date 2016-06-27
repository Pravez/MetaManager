'use strict';

var Entity = require('../model/Entity');
var Scene = require('./scene/Scene');

var auto_incr_key = 0;
var entities = new Map();
var n_scene = new Scene();


class MetaManager{

    /**
     * Method to create an entity. First creates it just with an ID (which initializes Robot, Devices, DeviceListener...).
     * Then sets up device listeners according to functions to analyze data. Then, passes options for robot and devices
     * to set themselves up. Finally associates the newly created entity to the map of entities.
     * @param options
     * @returns {Entity}
     */
    static addEntity(options){
        var ent = new Entity(auto_incr_key);
        ent.setUpDeviceListeners(
            (msg) => {MetaManager.analyzeBlueResponse(msg);},
            (msg) => {MetaManager.analyzeOSCResponse(msg)});

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

    /**
     * Getter
     * @param id
     * @returns {V}
     */
    static getEntity(id){
        return entities.get(id);
    }

    /**
     * Getter of entities
     * @returns {Array}
     */
    static getEntities(){
        var array = [];
        for(let ent of entities.keys()){
            array.push(entities.get(ent));
        }

        return array;
    }

    /**
     * Main function to analyze a message from bluetooth
     * @param message
     */
    static analyzeBlueResponse(message){
        entities.get(message.entity).analyzeBluetoothResponse(message);
    }

    /**
     * Main function to analyze a message from OSC
     * @param message
     */
    static analyzeOSCResponse(message){

        entities.get(message.entity).executeCommand({ command: message.cmd, value: message.arg}, true);

        if(n_scene._stage){
            n_scene.draw();
        }
    }

    static getScene(){
        return n_scene;
    }
    
    static getRobotInformationsFromDevice(id){
        return entities.get(id).askRobotInformations();
    }

}
module.exports = MetaManager;