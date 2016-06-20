"use strict";

var BluetoothSerial = require('bluetooth-serial-port');
var MetaManager = require('./MetaManager');

/**
 * Each connection to a device is a BluetoothDevice instance. This class is
 * used to create and manage a connection to a bluetooth device.
 */
class BluetoothDevice{

    /**
     * Constructor
     */
    constructor(){
        this.address = undefined;
        this.name = "MEGANONAME 3000";
        this.channel = 0;

        this.available = true;

        this.connected = false;
        this.connecting = false;
        this.tries = 0;
    }

    /**
     * Method to initialize listeners and serial port
     * @returns {BluetoothDevice}
     */
    setUp(options){
        if(options){
            this.address = options.address || this.address;
            this.name = options.name || this.name;

            this.serial = new BluetoothSerial.BluetoothSerialPort();

            var self = this;

            this.serial.on('data', function(buffer) {
                MetaManager.bluetoothListener(self, buffer.toString('utf-8'));
            });

            this.serial.on('finished', function() {
                console.log('Scan did finish');
            });

            return this;
        }else{
            return undefined;
        }
    }

    /**
     * Method to try finding a channel to connect, and if so, to try
     * connecting the device through the found channel.
     */
    findChannelAndConnect(){
        this.tries +=1;
        var self = this;
        console.log("Searching");
        this.connecting = true;

        this.serial.findSerialPortChannel(this.address, function(channel){
            self.channel = channel;
            console.log("Channel found !" + channel);
            if(self.channel !== 0){
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
            this.serial.connect(this.address, this.channel, function () {
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
     * Disconnect the serial
     */
    disconnect(){
        this.serial.close();
    }

    /**
     * Function to write data to a device
     * @param data
     */
    send(data){
        this.serial.write(new Buffer(data + "\n", 'utf-8'), function (err, bytesWritten) {
            if (err) console.log(err);
        });
    }

    modify(bluetooth){
        this.serial.close();
        this.setUp(bluetooth);
    }
}
module.exports = BluetoothDevice;