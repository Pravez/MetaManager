"use strict";

var BluetoothSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();

var connectedDevices = new Set();

function findDevice(address){
    for(let device of connectedDevices){
        if(device.bAddress === address){
            return device;
        }
    }
}

var lebon = require('lebon');

lebon.on('discover', function(device) {
    console.log('New device discovered! ' + device.name);
});



class BluetoothDevice{

    constructor(address, name){
        this.bAddress = address;
        this.bName= name;
        this.bChannel = 0;

        this.connected = false;
    }

    removeDevice(){
        connectedDevices.delete(this);
    }

    connect(){
        var self = this;

        BluetoothSerial.findSerialPortChannel(this.bAddress, function(channel){
            self.bChannel = channel;
        });

        try {
            BluetoothSerial.connect(this.bAddress, this.bChannel, function () {
                console.log('connected');

                BluetoothSerial.write(new Buffer('1234', 'utf-8'), function (err, bytesWritten) {
                    if (err) console.log(err);
                });

                BluetoothSerial.on('data', function (buffer) {
                    console.log(buffer.toString('utf-8'));
                });
            }, function () {
                console.log('cannot connect');
            });
        } catch(error){
            console.log(error);
        }

        console.log(this.bChannel);
    }
}

class BluetoothServer{

    static startDiscovery(){
        BluetoothSerial.inquire();
    }

    static setupBluetooth(){
        BluetoothSerial.on('found', function(address, name){
            var newDevice = new BluetoothDevice(address, name);
            connectedDevices.add(newDevice);
            document.dispatchEvent(new Event("BTdevice"));
            console.log("Device found !" + address + " " + name);
        });
    }

    static getDevices(){
        return connectedDevices;
    }

    static connectDevice(address){
        var device = findDevice(address);
        if(device){
            device.connect();
        }
    }

    //static write
}

module.exports = BluetoothServer;

/*BluetoothSerial.on('found', function(address, name) {
    BluetoothSerial.findSerialPortChannel(address, function(channel) {
        BluetoothSerial.connect(address, channel, function() {
            console.log('connected');

            BluetoothSerial.write(new Buffer('my data', 'utf-8'), function(err, bytesWritten) {
                if (err) console.log(err);
            });

            BluetoothSerial.on('data', function(buffer) {
                console.log(buffer.toString('utf-8'));
            });
        }, function () {
            console.log('cannot connect');
        });

        // close the connection when you're ready
        BluetoothSerial.close();
    }, function() {
        console.log('found nothing');
    });
});
BluetoothSerial.inquire();*/