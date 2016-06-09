"use strict";

var BluetoothSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();


var connectedDevices = new Map();

class BluetoothServer{

    static startDiscovery(){
        BluetoothSerial.inquire();
    }

    static addDevice(address, channel){

    }
}

BluetoothSerial.on('found', function(address, name) {
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
BluetoothSerial.inquire();