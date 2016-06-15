"use strict";

var BluetoothSerial = require('bluetooth-serial-port');

/**
 * Set of all devices found
 * @type {Set}
 */
var connectedDevices = new Set();

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
    for(let device of connectedDevices){
        if(device.bAddress === address || device.bName === address){
            return device;
        }
    }
}

/**
 * Each connection to a device is a BluetoothDevice instance. This class is
 * used to create and manage a connection to a bluetooth device.
 */
class BluetoothDevice{

    /**
     * Constructor
     * @param address
     * @param name
     */
    constructor(address, name){
        this.bAddress = address;
        this.bName= name;
        this.bChannel = 0;

        this.connected = false;
        this.connecting = false;
        this.tries = 0;
    }

    /**
     * Method to initialize listeners and serial port
     * @returns {BluetoothDevice}
     */
    setUp(){
        this.bSerial = new BluetoothSerial.BluetoothSerialPort();

        this.bSerial.on('data', function(buffer) {
            console.log(buffer.toString('utf-8'));
        });

        this.bSerial.on('finished', function() {
            console.log('scan did finish');
        });

        return this;
    }

    /**
     * Method to remove the device from a set of devices
     */
    removeDevice(){
        connectedDevices.delete(this);
    }

    /**
     * Method to try finding a channel to connect, and if so, to try
     * connecting the device through the found channel.
     */
    findChannel(){
        this.tries +=1;
        var self = this;
        console.log("Searching");
        this.connecting = true;

        this.bSerial.findSerialPortChannel(this.bAddress, function(channel){
            self.bChannel = channel;
            console.log("Channel found !" + channel);
            if(self.bChannel !== 0){
                self.connect();
            }
        });

        //TODO rework message to the view
        setTimeout(function(){
            self.connecting = false;
            if(self.connected === false) {
                document.dispatchEvent(new Event("devicesUpdate"));
                console.log("Timed out to connect");
            }
        }, 7500);
    }

    /**
     * Method to connect to a device.
     * Needs an address and a channel
     */
    connect(){
        var self = this;
        try {
            this.bSerial.connect(this.bAddress, this.bChannel, function () {
                console.log('connected');
                self.connected = true;
                self.connecting = false;
                document.dispatchEvent(new Event("devicesUpdate"));
            }, function () {
                console.log('cannot connect');
            });
        } catch(error){
            console.log(error);
        }
    }

    /**
     * Function to write data to a device
     * @param data
     */
    write(data){
        this.bSerial.write(new Buffer(data + "\n", 'utf-8'), function (err, bytesWritten) {
            if (err) console.log(err);
        });
    }
}

/**
 * Static class to manages devices and discovery
 */
class BluetoothServer{

    /**
     * Function to discover network and find bluetooth devices
     */
    static startDiscovery(){
        mainSerial.inquire();
    }

    /**
     * Setup function to add listener
     */
    static setupBluetooth(){
        mainSerial.on('found', function(address, name){
            var newDevice = new BluetoothDevice(address, name);
            if(!findDevice(address))
                connectedDevices.add(newDevice.setUp());
            console.log("Device found !" + address + " " + name);
        });
    }

    /**
     * Getter of the set of devices
     * @returns {Set}
     */
    static getDevices(){
        return connectedDevices;
    };

    /**
     * Returns an array containing connected devices
     * @returns {Array}
     */
    static getConnectedDevices(){
        var connected = [];
        for(let device of connectedDevices){
            if(device.connected === true){
                connected.push(device);
            }
        }

        return connected;
    }

    /**
     * Function to ask a BluetoothDevice to connect
     * @param address
     * @returns {*}
     */
    static connectDevice(address){
        var device = findDevice(address);
        if(device){
            device.findChannel();
        }

        return device;
    }

    static getFromNameOrAddress(name){
        return findDevice(name);
    }
}
module.exports = BluetoothServer;


//FOR DEBUG
connectedDevices.add(new BluetoothDevice("B8:63:BC:00:46:ED", "ROBOTIS BT-210").setUp());