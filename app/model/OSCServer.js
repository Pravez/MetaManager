"use strict";
var osc = require('osc');
var Server = require('../model/Server');

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
    }

    /**
     * Function used by the constructor to set up the listener (on ready, message and error)
     */
    setListener(onMessageReceived){

        this.oscServer = new osc.UDPPort({
            localAddress: this.localAddress,
            localPort: this.localPort
        });

        this.oscServer.on("message", function (oscMessage) {
            self.onMessageReceived(oscMessage);
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
     * Getter of localPort
     * @returns {*}
     */
    get getLocalPort(){ return this.localPort }

    /**
     * Getter of localAddress
     * @returns {*}
     */
    get getLocalAddr(){ return this.localAddress }

    /**
     * Setter of localPort, and generates a new osc.UDPPort each time
     * the localPort value is changed.
     * @param localPort
     */
    set setLocalPort(localPort){
        this.localPort = localPort;
        this.oscServer = new osc.UDPPort({
            localAddress: this.localAddress,
            localPort: this.localPort
        });
        this.setListener();
    }
}
module.exports = OSCServer;