"use strict";
var OSCDevice = require('../model/OSCDevice');
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
            }while(device.enabled.has(newPort));
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
        device.disabled.push(device);
    }

    /**
     * Function to handle an error
     * @param log
     */
    static handleOSCError(log) {

        //Find the port
        var address = log.match(/\d+\.\d+\.\d+\.\d+:\d+/gi);

        //Disable server listening on the port
        address.forEach(function (e) {
            var port = e.split(':')[1];
            if (devices.enabled.has(parseInt(port))) {
                OSCManager.disableDevice(devices.enabled.get(parseInt(port)));
                devices.enabled.set(parseInt(port), new OSCDevice(e.split(':')[0], parseInt(port)));
            }
        });


        devices.disabled.forEach(function (e) {
            OSCManager.enableDevice(OSCManager.changeDevicePort(e));
        });
    }

    static get getServers() { return servers }
}
module.exports = OSCManager;

/**
 * The window on error event, permits to catch any normally uncaught exception
 */
window.addEventListener('error', function (evt) {

    console.log("Caught error [ via 'error' event ]  :'" + evt.message + "' from " + evt.filename + ":" + evt.lineno);

    if(evt.message.search("EADDRINUSE") != -1){
        OSCManager.handleOSCError(evt.message);
    }

});