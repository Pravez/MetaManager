"use strict";

var BluetoothSerial = require('bluetooth-serial-port');

var MAX_CONNECTION_TRIES = 5;

/**
 * Each connection to a device is a BluetoothDevice instance. This class is
 * used to create and manage a connection to a bluetooth device.
 */
class BluetoothDevice{

    /**
     * Constructor by default
     */
    constructor(){
        this.address = undefined;
        this.name = "MEGANONAME 3000";
        this.channel = 0;

        this.available = true;

        this.connected = false;
        this.connecting = false;
        this.tries = 0;
        this.tries_connect = 0;
    }

    /**
     * Method which will initialize by default the listeners, and will create a serial port for Bluetooth.
     * @returns {BluetoothDevice}
     */
    setUp(options){
        if(options){
            this.address = options.address || this.address;
            this.name = options.name || this.name;

            this.serial = new BluetoothSerial.BluetoothSerialPort();

            var self = this;
            this.serial.bluetoothDeviceObject = this;

            this.serial.on('data', function(buffer){
                console.log("BTCONNECTLOG: " + buffer.toString('utf-8'));
            });

            this.serial.on('finished', function() {
                console.log('Scan did finish');
            });

            this.serial.on('closed', function(){
                console.log("connection closed");
                this.connected = false;
                this.connecting = false;
                document.dispatchEvent(new Event('devicesUpdate'));
            });

            return this;
        }else{
            return undefined;
        }
    }

    /**
     * Function to set listener (function to which data will be given)
     * @param listener
     */
    setListener(listener){
        this.serial.on('data', function(buffer){
            listener(buffer);
        });
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
    }

    /**
     * Method to connect to a device, after having found a channel.
     */
    connect(){
        if(this.connected === false) {
            var self = this;
            this.tries_connect += 1;

            //First we try to connect
            this.serial.connect(this.address, this.channel, function () {
                console.log('connected');
                self.connected = true;
                self.connecting = false;
                document.dispatchEvent(new Event("devicesUpdate"));

            }, function () {
                //If it failed, if we are not already connected and if we haven't tried too many times, we retry
                if (self.tries_connect < MAX_CONNECTION_TRIES && self.connected === false) {
                    console.log('Unable to connect, retrying in 2 seconds...');
                    setTimeout(self.connect(), 2000);
                }else{
                    self.connecting = false;
                    document.dispatchEvent(new Event("devicesUpdate"));
                }

            });
        }
    }

    /**
     * Disconnect the serial
     */
    disconnect(){
        this.serial.close();
        this.connected = false;
        this.connecting = false;
        this.tries = 0;
        this.tries_connect = 0;
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

    /**
     * Function to modify a bluetooth device. First closes the bluetooth serial (= destroys it), and then re-creates
     * it.
     * @param bluetooth
     */
    modify(bluetooth){
        this.serial.close();
        this.setUp(bluetooth);
    }
}

module.exports = BluetoothDevice;