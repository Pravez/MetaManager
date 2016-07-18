"use strict";

var BluetoothDevice = require('../devices/BluetoothDevice');
var BluetoothManager = require('../devices/BluetoothManager');
var OSCDevice = require('../devices/OSCDevice');
var DeviceListener = require('../devices/DeviceListener');

BluetoothManager.setupBluetooth();

var exports = module.exports = {};


class Device{

    /**
     * Constructor which initializes the oscDevice and the listener
     */
    constructor(entityID, devices){
        this.devices = new Map();

        this.bluetoothDevice = undefined;
        this.oscDevice = new OSCDevice();
        //this.xbeeDevice = new XbeeDevice();

        this.listener = new DeviceListener(entityID);
    }

    /**
     * The setter of bluetooth, to which we just give a pre-created BluetoothDevice
     * @param options
     * @returns {device|{osc}|*|Device}
     */
    setUpBluetooth(options){
        if(options.none === false){
            this.bluetoothDevice = options.bluetoothDevice;
            this.enableBluetooth();
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
     * Function to enable an OSCDevice.
     * Tries to enable OSC device and changes the port if it's not the good one.
     */
    enableOSC(){
        this.oscDevice.refresh((buffer) => this.listener.osc(buffer));
        this.oscDevice.connect();
    }

    /**
     * Method to switch on/off current listening state of an OSCDevice
     */
    switchOSCState(){
        if(this.oscDevice.isConnected === true){
            this.oscDevice.disconnect();
        }else{
            this.oscDevice.refresh((buffer) => this.listener.osc(buffer));
            this.oscDevice.connect();
        }
    }

    /**
     * Method to set an attributed BluetoothDevice to this Device as not available for others and
     * also forcing it to give data received to the listener given in setListener()
     */
    enableBluetooth(){
        //Changing bluetooth's listener
        this.bluetoothDevice.available = false;
        this.bluetoothDevice.setListener((buffer) => this.listener.bluetooth(buffer));
    }

    /**
     * Disconnects and closes devices
     */
    disable(){
        if(this.bluetoothDevice){
            this.bluetoothDevice.available = true;
            this.bluetoothDevice = undefined;
        }
        this.oscDevice.disconnect();
    }

    /**
     * Modifies osc and bluetooth devices according to optionnal parameters.
     * @param osc
     * @param bluetooth
     */
    modify(osc, bluetooth) {
        if(osc){
            this.oscDevice.modify(osc);
            this.enableOSC();
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
                this.enableBluetooth();
            }
        }
    }

    /**
     * To send data to BluetoothDevice
     * @param data
     */
    sendToBluetooth(data){
        if(this.bluetoothDevice){
            this.bluetoothDevice.send(data);
        }else{
            console.log("Error : no bluetoothDevice assignated");
        }
    }

    /**
     * To set up the DeviceListener according to functions it must passes the information.
     * @param bluetooth
     * @param osc
     */
    setUpListeners(bluetooth, osc){
        this.listener.setMainAnalyzers(bluetooth, osc);
    }
    
    executeCommand(command){
        //Sending to metabot here
        console.log(command);
        this.sendToBluetooth(command);
    }
}

exports.Device = Device;

var DEVICE_TYPE = { 'bluetooth': 0, 'osc': 1, 'xbee': 2};

exports.type = DEVICE_TYPE;