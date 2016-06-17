"use strict";

var BluetoothSerial = require('bluetooth-serial-port');
var BluetoothDevice = require('../model/BluetoothDevice');

/**
 * Set of all devices found
 * @type {Set}
 */
var devices = new Set();

/**
 * Main Bluetooth serial port used by the static class and to discover.
 * @type {*|BluetoothSerialPort}
 */
var mainSerial = new BluetoothSerial.BluetoothSerialPort();

/**
 * Function to find a device in an array (O(n))
 * @param address
 * @returns {*}
 */
function findDevice(address){
    for(let device of devices){
        if(device.address === address || device.name === address){
            return device;
        }
    }
}

/**
 * Static class to manages devices and discovery
 */
class BluetoothManager{

    /**
     * Function to discover network and find bluetooth devices
     */
    static startDiscovery(){
        mainSerial.inquire();
        document.dispatchEvent(new Event('devicesUpdate'));
    }

    static addDevice(device){
        devices.add(device);
    }

    static removeDevice(device){
        devices.delete(device);
    }

    /**
     * Setup function to add listener
     */
    static setupBluetooth(){
        mainSerial.on('found', function(address, name){
            var newDevice = new BluetoothDevice();
            if(!findDevice(address))
                devices.add(newDevice.setUp({address: address, name: name}));
            console.log("Device found !" + address + " " + name);
        });
    }

    /**
     * Function to ask a BluetoothDevice to connect
     * @param address
     * @returns {*}
     */
    static connectDevice(address){
        var device = findDevice(address);
        if(device){
            device.findChannelAndConnect();
        }

        return device;
    }

    /**
     * Getter of the set of devices
     * @returns {Set}
     */
    static getDevices(){
        return devices;
    };

    /**
     * Returns an array containing connected devices
     * @returns {Array}
     */
    static getConnectedDevices(){
        var connected = [];
        for(let device of devices){
            if(device.connected === true){
                connected.push(device);
            }
        }

        return connected;
    }

    static getFromNameOrAddress(name){
        return findDevice(name);
    }
}
module.exports = BluetoothManager;


//FOR DEBUG
//connectedDevices.add(new BluetoothDevice("B8:63:BC:00:46:ED", "ROBOTIS BT-210").setUp());