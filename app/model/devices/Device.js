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
    constructor(entityID){
        this.devices = {};
        //TODO convert into arrays
        this.devices.bluetooth = undefined;
        this.devices.osc = undefined;
        this.devices.xbee = undefined;

        this.listener = new DeviceListener(entityID);
    }

    setUp(type, options){
        switch(type){
            case DEVICE_TYPE.bluetooth:
                if(options.none === false){
                    this.devices.bluetooth = options.bluetoothDevice;
                    this.enable(DEVICE_TYPE.bluetooth);
                }else{
                    this.devices.bluetooth = undefined;
                }
                break;
            case DEVICE_TYPE.osc:
                this.devices.osc = new OSCDevice();
                return this.devices.osc.setUp(options);
            case DEVICE_TYPE.xbee:
                break;
        }
    }

    enable(type){
        switch(type){
            case DEVICE_TYPE.bluetooth:
                this.devices.bluetooth.available = false;
                this.devices.bluetooth.setListener((buffer) => this.listener.bluetooth(buffer));
                break;
            case DEVICE_TYPE.osc:
                this.devices.osc.refresh((buffer) => this.listener.osc(buffer));
                this.devices.osc.connect();
                break;
            case DEVICE_TYPE.xbee:
                break;
        }
    }

    modify(options) {
        if(options.osc){
            this.devices.osc.modify(options.osc);
            this.enable(DEVICE_TYPE.osc);
        }
        if(options.bluetooth){
            //First we free last bluetoothDevice used
            if(this.devices.bluetooth !== undefined){
                this.devices.bluetooth.available = true;
            }
            //Then we link the new one, or remove if none
            if(options.bluetooth.none === true){
                this.devices.bluetooth = undefined;
            }else if(options.bluetooth.bluetoothDevice.available === true){
                this.devices.bluetooth = options.bluetooth.bluetoothDevice || this.devices.bluetooth;
                this.enable(DEVICE_TYPE.bluetooth);
            }
        }
        /*if(options.xbee){

        }*/
    }

    /**
     * Disconnects and closes devices
     */
    disable(){
        if(this.bluetoothDevice){
            this.devices.bluetooth.available = true;
            this.devices.bluetooth = undefined;
        }
        this.devices.osc.disconnect();
    }

    send(type, data){
        switch(type){
            case DEVICE_TYPE.bluetooth:
                if(this.devices.bluetooth){
                    this.devices.bluetooth.send(data);
                }else{
                    console.log("Error : no bluetoothDevice assignated");
                }
                break;
            case DEVICE_TYPE.osc:
                this.devices.osc.send(data);
                break;
            case DEVICE_TYPE.xbee:
                break;
        }
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
        this.send(DEVICE_TYPE.bluetooth, command);
    }
}

exports.Device = Device;

var DEVICE_TYPE = { 'bluetooth': 0, 'osc': 1, 'xbee': 2};

exports.type = DEVICE_TYPE;