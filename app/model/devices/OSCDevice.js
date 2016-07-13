"use strict";
var OSC = require('osc');
var DeviceElement = require('./DeviceElement');

var port_index = 10000;

class OSCDevice extends DeviceElement{
    constructor(){
        super();

        this.address = "127.0.0.1";
        this.port = port_index;
        port_index += 1;

        this.dest_address = "127.0.0.1";
        this.dest_port = 9950;
    }

    setUp(options){
        if(options){
            super.setUp(options);

            this.port = options.port || this.port;
            this.dest_address = options.dest_address || this.dest_address;
            this.dest_port = options.dest_port || this.dest_port;

            this.device = new OSC.UDPPort({ localAddress: this.address, localPort: this.port });


            ////////For debug//////////
            this.on('error', function(data){ console.log(data); });
            ///////////////////////////

            return this;
        }
    }

    setListener(listener){
        super.setListener('message', listener);
    }

    connect(){
        this.device.open();
        this.connected = true;
    }

    disconnect(){
        this.device.close();
        this.connected = false;
    }

    send(data){
        this.device.send({address: data.address, args: data.args}, this.dest_address, this.dest_port);
    }

    modify(options){
        if(options){
            this.disconnect();
            this.setUp(options);
        }
    }

    refresh(listener){
        if(this.connected === true)
            this.disconnect();
        this.device = new OSC.UDPPort({ localAddress: this.address, localPort: this.port });
        this.setListener(listener);
    }
}

module.exports = OSCDevice;


////////////////OSC MANAGER///////////////////
var devices = new Map();

function addDevice(device){
    if(!devices.has(device.port)){
        devices.set(device.port, device);
    }else{
        throw "Error : a device is already listening on this port.";
    }
}

function removeDevice(device){
    if(devices.has(device.port)){
        devices.delete(device.port);
        return device;
    }else{
        console.log('Error : Trying to remove not existing device.')
    }
}

function changeDevicePort(device, port){
    var n_port = port ? port : device.port;

    while(devices.enabled.has(n_port)){
        n_port += 1;
    }

    device.port = n_port;
    return device;
}

function handleOSCError(address, port){
    if(devices.has(port)){
        let device = removeDevice(devices.get(port));
        device.connected = false;
        addDevice()
    }
}


////////////////////////////////////////////////////