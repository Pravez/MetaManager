"use strict";

var Device = require('../model/devices/Device');
var Robot = require('./robot/Robot');
var Command = require('./robot/Command');


class Entity {

    /**
     * Function to initialize by default an entity, with an id
     * @param id
     */
    constructor(id) {
        this.id = id;

        this.robot = new Robot();
        this.device = new Device(this.id);
        
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
            this.device.setUpOSC(options.osc);
            this.device.enableOSC();
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

    executeCommand(command, verify){
        var cmd = new Command(command.command, command.value);
        try {
            //if(!(verify === true ^ this.robot.getLastCommand().equals(cmd) === false)) {
                this.device.executeCommand(cmd.execute());
                this.robot.addExecutedCommand(cmd);
            //}
        } catch (error) {
            console.log(error);
        }
    }

    analyzeBluetoothResponse(message){
        if(message.args === undefined && this.askingInformations === true){
            var response = Entity.parseBlueResponse(message.response);
            this.robot.modifyValue(response.cmd, response.value);
            console.log('updated ' + message.cmdSent + " : " + response.value);
        }
    }

    static parseBlueResponse(response){
        var changed = response.replace('\r\n', '');
        return {
            cmd: changed.split('=')[0],
            value: changed.split('=')[1]
        };
    }

    askRobotInformations(){
        this.askingInformations = true;
        this.executeCommand({command: 'h'}, false);
        this.executeCommand({command: 'r'}, false);
        this.executeCommand({command: 'alt'}, false);
        this.executeCommand({command: 'freq'}, false);
        this.executeCommand({command: 'dx'}, false);
        this.executeCommand({command: 'dy'}, false);
        this.executeCommand({command: 'version'}, false);

        var self = this;
        var finished = function(e){
            if(self.robot.hasBeenUpdated() === true){
                document.dispatchEvent(new Event("askedInfo"));
                self.askingInformations = false;
            }else{
                setTimeout(finished, 1000);
            }
        };

        setTimeout(finished, 1500);
    }
}

module.exports = Entity;