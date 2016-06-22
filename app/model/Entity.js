"use strict";

var Device = require('../model/devices/Device');
var Robot = require('robot/Robot');


class Entity {

    /**
     * Function to initialize by default an entity, with an id
     * @param id
     */
    constructor(id) {
        this.robot = new Robot();
        this.device = new Device();
        this.id = id;
    }

    /**
     * To set up a robot, needs at least a name
     * @param options
     * @returns {*}
     */
    setUpRobot(options) {
        return this.robot.setUp(options);
    }

    /**
     * To set up a device, needs a BluetoothDevice for bluetooth, and an address and a port for OSCDevice
     * @param options
     * @returns {Device}
     */
    setUpDevice(options) {
        if (options.bluetooth) {
            this.device.setUpBluetooth(options.bluetooth);
        }
        if (options.osc) {
            this.device.setUpOSC(options.osc)
        }
        if (options.xbee) {
            this.device.setUpXBee(options.xbee);
        }

        return this.device;
    }

    /**
     * Method to switch an OSC server listening state
     */
    switchOSCState() {
        this.device.switchOSCState();
    }

    /**
     * To disable a device
     */
    disableDevice() {
        this.device.disable();
    }

    /**
     * Method to set deviceListeners according to functions to which will be sent datas to be analyzed
     * @param bluetooth
     * @param osc
     */
    setUpDeviceListeners(bluetooth, osc){
        this.device.setUpListeners(bluetooth, osc);
    }

    /**
     * Function to modify an entity according to options
     * @param options
     */
    modify(options){
        if(options.robot){
            this.robot.modify(options.robot);
        }
        if(options.osc || this.bluetooth){
            this.device.modify(options.osc, options.bluetooth);
        }
    }

    /**
     * Method to send bluetooth data
     * @param data
     */
    sendBluetoothData(data){
        this.device.sendToBluetooth(data);
    }

    executeCommand(command){
        console.log(command);
    }
}

module.exports = Entity;