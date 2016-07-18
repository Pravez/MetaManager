"use strict";

var Device = require('./devices/Device');

var id_key = 0;

class Entity{

    constructor(){
        this.id = id_key++;

        this.device = new Device.Device(this.id);
    }

    modify(options){
        if(options.device.osc || options.device.bluetooth){
            this.device.modify({osc: options.device.osc, bluetooth: options.device.bluetooth});
        }
    }

    /**
     * To set up a device, needs a BluetoothDevice for bluetooth, and an address and a port for OSCDevice
     * @param options
     * @returns {Device}
     */
    setUpDevice(options) {
        if (options.bluetooth) {
            this.device.setUp(Device.type.bluetooth, options.bluetooth);
        }
        if (options.osc) {
            this.device.setUp(Device.type.osc, options.osc);
            this.device.enable(Device.type.osc);
        }
        /*if (options.xbee) {
         this.device.setUpXBee(options.xbee);
         }*/

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

    toggleRobotState(){
        if(this.robot.started === false){
            this.executeCommand({command: 'start'}, false);
            this.robot.started = true;
        }else{
            this.executeCommand({command: 'stop'}, false);
            this.robot.started = false;
        }
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
     * Method to send bluetooth data
     * @param data
     */
    sendBluetoothData(data){
        this.device.send(Device.type.bluetooth, data);
    }

    executeCommand(command, verify){}

}
module.exports = Entity;