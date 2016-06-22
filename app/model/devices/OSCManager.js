"use strict";
var OSCDevice = require('../devices/OSCDevice');

/**
 * An object containing a map and an array (map for mapping enabled server to port,
 * array for each wrong other server).
 * @type {{enabled: Map, disabled: Array}}
 */
var devices = { enabled: new Map(), disabled: [] };

/**
 * An error handler (the class is only useful to interact
 * with the program, functions in this file are doing the job)
 */
class OSCManager {

    /**
     * Add a server to a list of servers (by default enabled)
     * @param device
     */
    static addDevice(device){
        if(!devices.enabled.has(device.port)) {
            devices.enabled.set(device.port, device);
        }
        else
        {
            devices.disabled.push(device);
            throw "Error : one server is already listening on this port. Server added as disabled."
        }
    }

    /**
     * Removes a server if it exists. (removes from enabled and disabled)
     * @param device
     * @returns {*}
     */
    static removeDevice(device){

        if(devices.enabled.has(device.port)){
            devices.enabled.delete(device.port);
            return device;
        }

        if(devices.disabled.indexOf(device) != -1) return devices.disabled.splice(devices.disabled.indexOf(device), 1)[0];

        throw "Error: given server isn't referenced.";
    }

    /**
     * Function to change port of a server. If 'port' parameter is not given, seeks for the first
     * next available port.
     * @param device
     * @param opt
     * @returns {*}
     */
    static changeDevicePort(device, opt){
        var newPort = opt ? opt.port || device.port : device.port;
        if(newPort === device.port){
            do {
                newPort = newPort + 1;
            }while(devices.enabled.has(newPort));
        }

        device.port = newPort;
        if(opt && opt.remove && opt.remove === true)
            return this.removeDevice(device);
        return device;
    }

    /**
     * Function to enable a server (removes it from the servers (disabled), and adds it).
     * @param device
     */
    static enableDevice(device){
        if (!devices.enabled.get(device.port)) {
            this.removeDevice(device);
            this.addDevice(device);
        } else {
            throw "Error : one server is already running on this port."
        }

        return device;
    }

    /**
     * Function to disable a server (from the enabled servers)
     * @param device
     */
    static disableDevice(device){
        this.removeDevice(device);
        devices.disabled.push(device);

        return device;
    }

    /**
     * Function to handle an error
     * @param address
     * @param port
     */
    static handleOSCError(address, port) {
        if (devices.enabled.has(parseInt(port))) {
            /*const {dialog} = require('electron');
            dialog.showErrorBox('Error', 'Port already in use');*/
            var device = OSCManager.disableDevice(devices.enabled.get(parseInt(port)));
            device.isListening = false;
            devices.enabled.set(parseInt(port), new OSCDevice(address, parseInt(port)));
            OSCManager.enableDevice(OSCManager.changeDevicePort(device));
            //alert('New port is ' + device.port);
        }
    }
}
module.exports = OSCManager;

/**
 * The window on error event, permits to catch any normally uncaught exception
 */
process.on('uncaughtException', function (error) {

    console.log("Caught error : \n" + error.stack);

    if(error.code === "EADDRINUSE"){
        OSCManager.handleOSCError(error.address, error.port);
    }

});