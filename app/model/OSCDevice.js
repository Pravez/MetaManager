"use strict";

var osc = require('osc');

/**
 * Little override of the osc.UDPPort from osc library (node).
 */
class OSCDevice{

    /**
     * Nothing
     */
    constructor(){
        this.address = "127.0.0.1";
        this.port = 9999;

    }

    /**
     * To construct the OSCDevice
     * @param options
     * @returns {*}
     */
    setUp(options) {
        if(options) {
            this.address = options.address;
            this.port = options.port;

            return this.setListener();
        }else{
            return undefined;
        }
    }

    /**
     * Function used by the constructor to set up the listener (on ready, message and error)
     */
    setListener(){

        this.oscServer = new osc.UDPPort({
            localAddress: this.address,
            localPort: this.port
        });

        this.oscServer.on("message", function (oscMessage) {
            console.log(oscMessage);
        });

        this.oscServer.on("error", function (err) {
            console.log(err);
        });

        return this;
    }

    /**
     * Sends an OSC message
     * @param address
     * @param args
     * @param remoteAddr
     * @param remotePort
     */
    send(address, args, remoteAddr, remotePort){
        this.oscServer.send({
            address: address,
            args: args
        }, remoteAddr, remotePort);
    }

    /**
     * Make the listener listen
     */
    listen(){
        this.oscServer.open();
        console.log(this.localPort + "listening");
    }

    /**
     * Make the listener stop listening
     */
    close(){
        this.oscServer.close();
    }

    /**
     * Setter of localPort, and generates a new osc.UDPPort each time
     * the localPort value is changed.
     * @param localPort
     */
    setLocalPort(localPort){
        this.localPort = localPort;
        this.oscServer = new osc.UDPPort({
            localAddress: this.localAddress,
            localPort: this.localPort
        });
        this.setListener();
    }
}
module.exports = OSCDevice;