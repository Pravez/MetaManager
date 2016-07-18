"use strict";

var BluetoothSerial = require('bluetooth-serial-port');
var DeviceElement = require('./DeviceElement');

var MAX_CONNECTION_TRIES = 3;

class BluetoothDevice extends DeviceElement.Device{
    constructor(){
        super();

        this.channel = 0;
        this.available = true;
        this.connecting = false;
        this.tries = 0;
        this.tries_connect = 0;
        this.last_connection = undefined;
    }

    setUp(options){
        if(options){
            super.setUp(options);

            this.device = new BluetoothSerial.BluetoothSerialPort();
            this.on('closed', function(){
                console.log('connection closed');
                this.connected = false;
                this.connecting = false;
                document.dispatchEvent(new Event('devicesUpdate'));
            });

            ///////For debug//////////
            this.on('data', function(data){ console.log("Log : " + data.toString('utf-8')); });
            this.on('finished', function(){ console.log("Scan did finish"); });
            //////////////////////////

            return this;
        }
    }

    setListener(listener){
        super.setListener('data', listener);
    }

    connect(){
        this.tries += 1;
        this.connecting = true;
        var self = this;

        this.device.findSerialPortChannel(this.address, function(channel){
            self.channel = channel;
            console.log("Channel found !" + channel);
            if(self.channel !== 0){
                self.connection_try_timeout = setInterval(function(){
                    self.finalizeConnection();
                }, 2000);
            }
        });
    }

    finalizeConnection(){
        var self = this;

        if(self.connected === false && self.tries_connect < MAX_CONNECTION_TRIES) {
            self.tries_connect += 1;

            //First we try to connect
            this.device.connect(this.address, this.channel, function () {
                console.log('connected');
                self.connected = true;
                self.connecting = false;
                self.last_connection = Date.now();
                document.dispatchEvent(new Event("devicesUpdate"));

            }, function () {
                //If it failed, if we are not already connected and if we haven't tried too many times, we retry
                if (self.tries_connect < MAX_CONNECTION_TRIES && self.connected === false) {
                    console.log('Unable to connect, retrying in 2 seconds...');
                }else{
                    console.log("Couldn't connect");
                    self.connecting = false;
                    self.tries_connect = 0;
                    clearInterval(self.connection_try_timeout);
                    document.dispatchEvent(new Event("devicesUpdate"));

                    self.device.close();
                    self.setUp({name: self.name, address:self.address, lastconn: self.last_connection});
                }

            });
        }else{
            clearInterval(self.connection_try_timeout);
        }
    }

    disconnect(){
        this.device.close();
        this.connected = false;
        this.connecting = false;
        this.tries = 0;
        this.tries_connect = 0;
    }

    send(data){
        this.device.write(new Buffer(data + "\n", 'utf-8'), (err) => { if(err) console.log(err); });
    }

    modify(options){
        if(options) {
            this.disconnect();
            this.setUp(options);
        }
    }
}
module.exports = BluetoothDevice;