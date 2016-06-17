"use strict";

var Device = require('../model/Device');
var Robot = require('../model/Robot');


class Entity {

    constructor(id) {
        this.robot = new Robot();
        this.device = new Device();
        this.id = id;
    }

    setUpRobot(options) {
        return this.robot.setUp(options);
    }

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

    enableDevice() {
        this.device.enable();
    }

    disableDevice() {
        this.device.disable();
    }
}

module.exports = Entity;