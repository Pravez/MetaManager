"use strict";

/**
 * Transitional class between Devices receiving data and messages, and the MetaManager needing to analyze
 * these messages.
 */
class DeviceListener{

    /**
     * Simple constructor, needs to know which devices it is associated to
     * @param device
     */
    constructor(device){
        this.device = device;
        this.lastBluetoothMessage = "";
        this.lastOSCMessage = undefined;
    }

    /**
     * Set MetaManager's functions which will analyze datas for bluetooth and osc messages
     * @param bluetooth
     * @param osc
     */
    setMainAnalyzers(bluetooth, osc){
        this.btAnalyzer = bluetooth;
        this.oscAnalyzer = osc;
    }

    /**
     * When a bluetooth message is received, and until this message is not "$", it enters everything in a
     * string, then cuts it in different parts and sends it to the MetaManager, ready to analyze
     * @param message
     */
    bluetooth(message){
        var translated =  String.fromCharCode.apply(null, message);
        this.lastBluetoothMessage += translated;

        if(translated.indexOf('$') > -1){
            var interpreted = this.buildBluetoothMessage();
            this.btAnalyzer({
                device: this.device,
                cmdSent: interpreted.cmdSent,
                response: interpreted.response
            });
            this.lastBluetoothMessage = "";
        }
    }

    /**
     * Cuts an OSC message and prepares it for the server.
     * @param message
     */
    osc(message){
        this.lastOSCMessage = message;
        this.oscAnalyzer(this.buildOSCMessage());
    }

    /**
     * Main function to cut a bluetoothMessage
     * @returns {{cmdSent: *, response: string}}
     */
    buildBluetoothMessage(){
        var splitted = this.lastBluetoothMessage.split('\r\n');
        var cmdSent = splitted[0];
        var response = this.lastBluetoothMessage.replace(cmdSent, '');
        response = response.replace(splitted[splitted.length-1], '');
        response = response.substr(response.indexOf('\r\n'), response.length);

        return {cmdSent, response};
    }

    buildOSCMessage(){
        return {
            device: this.device,
            cmd: this.lastOSCMessage.address.replace('/', ''),
            arg: this.lastOSCMessage.args[0]
        }
    }
}
module.exports = DeviceListener;