"use strict";

var Device = require('../model/Device');
var Robot = require('../model/Robot');


class Entity {

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
     * To enable a device
     */
    enableDevice() {
        this.device.enable();
    }

    /**
     * To disable a device
     */
    disableDevice() {
        this.device.disable();
    }

    modify(options){
        if(options.robot){
            this.robot.modify(options.robot);
        }
        if(options.osc || this.bluetooth){
            this.device.modify(options.osc, options.bluetooth);
        }
    }

    sendBluetoothData(data){
        this.device.bluetoothDevice.send(data);
    }
}

module.exports = Entity;