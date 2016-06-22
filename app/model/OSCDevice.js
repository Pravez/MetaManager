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

        this.isListening = false;
    }

    /**
     * To construct the OSCDevice
     * @param options
     * @returns {*}
     */
    setUp(options) {
        if(options) {
            this.address = options.address || this.address;
            this.port = options.port || this.port;

            this.oscServer = new osc.UDPPort({
                localAddress: this.address,
                localPort: this.port
            });

            return this;
        }else{
            return undefined;
        }
    }

    /**
     * Function used by the constructor to set up the listener (on ready, message and error)
     */
    setListener(listener){
        this.oscServer.on("message", function (oscMessage) {
            listener(oscMessage);
        });

        this.oscServer.on("error", function (err) {
            console.log(err);
            listener(err);
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
        console.log("listening");
        this.oscServer.open();
        this.isListening = true;
    }

    /**
     * Make the listener stop listening
     */
    close(){
        console.log("closed");
        this.oscServer.close();
        this.isListening = false;
    }

    refresh(listener){
        if(this.isListening === true){
            this.close();
        }
        this.oscServer = new osc.UDPPort({
            localAddress: this.address,
            localPort: this.port
        });
        this.setListener(listener);
    }

    modify(osc) {
        this.address = osc.address || this.address;
        this.port = osc.port || this.port;
    }
}
module.exports = OSCDevice;