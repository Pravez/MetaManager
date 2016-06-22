"use strict";

var osc = require('osc');

/**
 * Little override of the osc.UDPPort from osc library (node).
 */
class OSCDevice{

    /**
     * A simple constructor just initializing default attributes
     */
    constructor(){
        this.address = "127.0.0.1";
        this.port = 9999;

        this.isListening = false;
    }

    /**
     * This will initialize attributes according to what is given in options. It creates an oscServer, ready to be added
     * to the list of enabled oscServers.
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
     * Sets up listeners on error and message, according to a certain function. (will send the data to the given
     * function)
     * @param listener
     * @returns {OSCDevice}
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
        this.oscServer.open();
        this.isListening = true;
    }

    /**
     * Make the listener stop listening
     */
    close(){
        this.oscServer.close();
        this.isListening = false;
    }

    /**
     * Function to refresh an OSCDevice, with a listener. It closes the oscServer, rebuilds it and reattributes
     * the different listeners.
     * @param listener
     */
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

    /**
     * To modify attributes according to an osc optional parameter. Changes will be applied on the oscServer
     * only after calling refresh()
     * @param osc
     */
    modify(osc) {
        this.address = osc.address || this.address;
        this.port = osc.port || this.port;
    }
}
module.exports = OSCDevice;