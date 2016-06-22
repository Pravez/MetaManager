"use strict";

var BluetoothDevice = require('../model/BluetoothDevice');
var BluetoothManager = require('../model/BluetoothManager');
var OSCDevice = require('../model/OSCDevice');
var OSCManager = require('../model/OSCManager');
var DeviceListener = require('../model/DeviceListener');

BluetoothManager.setupBluetooth();

class Device{

    /**
     * Constructor which initializes the oscDevice and the listener
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
        //Enabling OSC device
        try{
            OSCManager.addDevice(this.oscDevice);
        }catch (error){
            OSCManager.addDevice(OSCManager.changeDevicePort(this.oscDevice));
            this.oscDevice.refresh((buffer) => this.listener.osc(buffer));
        }
    }

    /**
     * Method to switch on/off current listening state of an OSCDevice
     */
    switchOSCState(){
        if(this.isOSCListening() === true){
            this.oscDevice.close();
        }else if(this.isOSCListening() === false){
            this.oscDevice.refresh((buffer) => this.listener.osc(buffer));
            this.oscDevice.listen();
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
     * Explicit enough
     * @returns {boolean}
     */
    isOSCListening(){
        return this.oscDevice.isListening;
    }

    /**
     * Disconnects and closes devices
     */
    disable(){
        this.bluetoothDevice.disconnect();
        this.oscDevice.close();
    }

    /**
     * Modifies osc and bluetooth devices according to optionnal parameters.
     * @param osc
     * @param bluetooth
     */
    modify(osc, bluetooth) {
        if(osc){
            //First we stop it and remove
            this.oscDevice.close();
            OSCManager.removeDevice(this.oscDevice);
            //Then we modify
            this.oscDevice.modify(osc);
            //And finally we re-enable it
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
}
module.exports = Device;