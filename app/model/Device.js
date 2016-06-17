"use strict";

var BluetoothDevice = require('../model/BluetoothDevice');
var BluetoothManager = require('../model/BluetoothManager');
var OSCDevice = require('../model/OSCDevice');
var OSCManager = require('../model/OSCManager');

BluetoothManager.setupBluetooth();

class Device{

    constructor(){
        this.bluetoothDevice = undefined;
        this.oscDevice = new OSCDevice();
        //this.xbeeDevice = new XbeeDevice();
    }

    setUpBluetooth(options){
        return this.bluetoothDevice = options.device;
        //return this.bluetoothDevice.setUp(options);
    }

    setUpOSC(options){
        return this.oscDevice.setUp(options);
    }

    /**
     * For later
     */
    setUpXBee(){

    }

    enable(){
        //Enabling bluetooth device
        /*this.bluetoothDevice.findChannelAndConnect();
        if(this.bluetoothDevice.connected === true) BluetoothManager.addDevice(this.bluetoothDevice);*/

        //Enabling OSC device
        try{
            OSCManager.addDevice(this.oscDevice);
        }catch (error){
            console.log("Port already taken");
            OSCManager.addDevice(OSCManager.changeDevicePort(this.oscDevice));
        }
        //And making it listening
        this.oscDevice.listen();
    }

    disable(){
        this.bluetoothDevice.disconnect();
        this.oscDevice.close();
    }
}
module.exports = Device;