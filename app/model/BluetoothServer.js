"use strict";

var BluetoothSerial = require('bluetooth-serial-port');

var connectedDevices = new Set();
var mainSerial = new BluetoothSerial.BluetoothSerialPort();

function findDevice(address){
    for(let device of connectedDevices){
        if(device.bAddress === address){
            return device;
        }
    }
}

class BluetoothDevice{

    constructor(address, name){
        this.bAddress = address;
        this.bName= name;
        this.bChannel = 0;

        this.connected = false;
        this.connecting = false;
        this.tries = 0;
    }

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

    removeDevice(){
        connectedDevices.delete(this);
    }

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

        setTimeout(function(){
            self.connecting = false;
            document.dispatchEvent(new Event("devicesUpdate"));
        }, 1000);
    }

    connect(){
        var self = this;
        try {
            this.bSerial.connect(this.bAddress, this.bChannel, function () {
                console.log('connected');
                self.connected = true;
            }, function () {
                console.log('cannot connect');
            });
        } catch(error){
            console.log(error);
        }
    }

    write(data){
        this.bSerial.write(new Buffer(data + "\n", 'utf-8'), function (err, bytesWritten) {
            if (err) console.log(err);
        });
    }
}

class BluetoothServer{

    static startDiscovery(){
        mainSerial.inquire();
    }

    static setupBluetooth(){
        mainSerial.on('found', function(address, name){
            var newDevice = new BluetoothDevice(address, name);
            if(!findDevice(address))
                connectedDevices.add(newDevice.setUp());
            console.log("Device found !" + address + " " + name);
        });
    }

    static getDevices(){
        return connectedDevices;
    };

    static getConnectedDevices(){
        var connected = [];
        for(let device of connectedDevices){
            if(device.connected === true){
                connected.push(device);
            }
        }

        return connected;
    }

    static connectDevice(address){
        var device = findDevice(address);
        if(device){
            device.findChannel();
        }

        return device;
    }
}
module.exports = BluetoothServer;

connectedDevices.add(new BluetoothDevice("B8:63:BC:00:46:ED", "ROBOTIS BT-210").setUp());