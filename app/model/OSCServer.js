"use strict";
var osc = require('osc');

/**
 * Little override of the osc.UDPPort from osc library (node).
 */
class OSCServer{

    /**
     * Constructs the listener (UDPPort)
     * @param localAddress Where it will be listening
     * @param localPort the port of the listener
     */
    constructor(localAddress, localPort){
        this.localAddress = localAddress;
        this.localPort = localPort;

        this.server = new osc.UDPPort({
            localAddress: this.localAddress,
            localPort: this.localPort
        });


        this.setListener();
    }

    /**
     * Function used by the constructor to set up the listener (on ready, message and error)
     */
    setListener(){
        /*this.server.on("ready", function(){
            console.log("Listening...")
        });*/

        this.server.on("message", function (oscMessage) {
            console.log(oscMessage);
        });

        this.server.on("error", function (err) {
            console.log(err);
        });
    }

    /**
     * Sends an OSC message
     * @param address
     * @param args
     * @param remoteAddr
     * @param remotePort
     */
    send(address, args, remoteAddr, remotePort){
        this.server.send({
            address: address,
            args: args
        }, remoteAddr, remotePort);
    }

    /**
     * Make the listener listen
     */
    listen(){
        this.server.open();
    }

    /**
     * Make the listener stop listening
     */
    close(){
        this.server.close();
    }
}
module.exports = OSCServer;