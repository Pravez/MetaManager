"use strict";

var exports = module.exports = {};

class DeviceElement{
    constructor(){
        this.address = undefined;
        this.name = "NONAME";
        this.device = undefined;

        this.connected = false;
    }

    setUp(options){
        this.address = options.address;
        this.name = options.name;
    }

    on(event, func){
        this.device.on(event, func);
    }

    setListener(event, listener){
        if(listener)
            this.listener = listener;
        //Maybe this.listener instead of listener ? self.listener should be better
        this.on(event, function(data){ listener(data); });
    }

    get isConnected(){
        return this.connected;
    }

    connect(){}
    disconnect(){}
    send(data){}
    modify(){}
}
exports.Device = DeviceElement;

////////////////OSC MANAGER (PORTS)///////////////////
var devices = new Map();

class PortsManager {
    static addDevice(device) {
        if (!devices.has(device.port)) {
            devices.set(device.port, device);
        } else {
            PortsManager.addDevice(changeDevicePort(device));
        }
    }

    static removeDevice(device) {
        if (devices.has(device.port)) {
            devices.delete(device.port);
            return device;
        } else {
            console.log('Error : Trying to remove not existing device.')
        }
    }

    static changeDevicePort(device, port) {
        var n_port = port ? port : device.port;

        while (devices.enabled.has(n_port)) {
            n_port += 1;
        }

        device.port = n_port;
        return device;
    }

    static handleOSCError(address, port) {
        if (devices.has(port)) {
            let device = removeDevice(devices.get(port));
            //Set port as already taken (by another application)
            devices.set(port, 'TAKEN_PORT');
            device.connected = false;
            PortsManager.addDevice(changeDevicePort(device));
        }
    }

    static has(port){
        return devices.has(port);
    }
}

process.on('uncaughtException', function (error) {

    console.log("Caught error : \n" + error.stack);

    if(error.code === "EADDRINUSE"){
        PortsManager.handleOSCError(error.address, error.port);
    }
});

exports.PortsManager = PortsManager;
////////////////////////////////////////////////////