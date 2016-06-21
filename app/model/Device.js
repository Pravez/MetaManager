"use strict";

var BluetoothDevice = require('../model/BluetoothDevice');
var BluetoothManager = require('../model/BluetoothManager');
var OSCDevice = require('../model/OSCDevice');
var OSCManager = require('../model/OSCManager');
var DeviceListener = require('../model/DeviceListener');

BluetoothManager.setupBluetooth();

class Device{

    /**
     * Constructor
     */
    constructor(){
        this.bluetoothDevice = undefined;
        this.oscDevice = new OSCDevice();
        //this.xbeeDevice = new XbeeDevice();

        this.listener = new DeviceListener(this);
    }

    /**
     * The setter of bluetooth, to which we just give a pre-created BluetoothDevice 
     * @param options
     * @returns {device|{osc}|*|Device}
     */
    setUpBluetooth(options){
        if(options.none === false){
            this.bluetoothDevice = options.bluetoothDevice;
            this.bluetoothDevice.available = false;
            this.bluetoothDevice.setListener((buffer) => this.listener.bluetooth(buffer));
        }
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
            //First we free last bluetoothDevice used
            if(this.bluetoothDevice){
                this.bluetoothDevice.available = true;
            }
            //Then we link the new one, or remove if none
            if(bluetooth.none === true){
                this.bluetoothDevice = undefined;
            }else if(bluetooth.bluetoothDevice.available === true){
                this.bluetoothDevice = bluetooth.bluetoothDevice || this.bluetoothDevice;
                this.bluetoothDevice.available = false;
                this.bluetoothDevice.setListener((buffer) => this.listener.bluetooth(buffer));

            }
        }
    }

    sendToBluetooth(data){
        if(this.bluetoothDevice){
            this.bluetoothDevice.send(data);
        }
    }

    setUpListeners(bluetooth){
        this.listener.setMainAnalyzer(bluetooth);
    }
}
module.exports = Device;