"use strict";

var BluetoothDevice = require('../model/BluetoothDevice');
var BluetoothManager = require('../model/BluetoothManager');
var OSCDevice = require('../model/OSCDevice');
var OSCManager = require('../model/OSCManager');

BluetoothManager.setupBluetooth();

class Device{

    /**
     * Constructor
     */
    constructor(){
        this.bluetoothDevice = undefined;
        this.oscDevice = new OSCDevice();
        //this.xbeeDevice = new XbeeDevice();
    }

    /**
     * The setter of bluetooth, to which we just give a pre-created BluetoothDevice 
     * @param options
     * @returns {device|{osc}|*|Device}
     */
    setUpBluetooth(options){
        return this.bluetoothDevice = options.device;
        //return this.bluetoothDevice.setUp(options);
    }

    /**
     * Sets up OSC device, need an address and a port to listen
     * @param options
     * @returns {*}
     */
    setUpOSC(options){
        return this.oscDevice.setUp(options);
    }

    /**
     * For later
     */
    setUpXBee(){

    }

    /**
     * Function to enable a device. Cannot enable a bluetooth device because located and managed elsewhere.
     * Tries to enable OSC device and changes the port if it's not the good one.
     */
    enable(){
        //Enabling bluetooth device
        /*this.bluetoothDevice.findChannelAndConnect();
        if(this.bluetoothDevice.connected === true) BluetoothManager.addDevice(this.bluetoothDevice);*/

        //Enabling OSC device
        try{
            OSCManager.addDevice(this.oscDevice);
        }catch (error){
            OSCManager.addDevice(OSCManager.changeDevicePort(this.oscDevice));
            this.oscDevice.refresh();
        }
        //And making it listening
        this.oscDevice.listen();
    }

    isOSCListening(){
        return this.oscDevice.oscServer.isListening;
    }

    /**
     * Disconnects and closes devices
     */
    disable(){
        this.bluetoothDevice.disconnect();
        this.oscDevice.close();
    }

    modify(osc, bluetooth) {
        if(osc){
            this.oscDevice.modify(osc);
        }
        if(bluetooth){
            this.bluetoothDevice = bluetooth.bluetoothDevice || this.bluetoothDevice;
        }
    }
}
module.exports = Device;