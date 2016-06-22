"use strict";


//TODO create a simple limited stack with a list
/*
class LimitedStack{
    constructor(size){
        this.size = size || 10;
        this.elements = 0;
        this.array = [];
    }

    add(elem){
        if(this.elements === this.size){
            this.array.pop();
        }
    }
}*/

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
        this.currentMessage = "";
    }

    /**
     * Set MetaManager's functions which will analyze datas for bluetooth and osc messages
     * @param bluetooth
     * @param osc
     */
    setMainAnalyzers(bluetooth, osc){
        this.btAnalyzer = bluetooth;
        this.oscAnalyze = osc;
    }

    /**
     * When a bluetooth message is received, and until this message is not "$", it enters everything in a
     * string, then cuts it in different parts and sends it to the MetaManager, ready to analyze
     * @param message
     */
    bluetooth(message){
        var translated =  String.fromCharCode.apply(null, message);
        this.currentMessage += translated;

        if(translated.indexOf('$') > -1){
            var interpreted = this.getMessage();
            this.btAnalyzer({
                device: this.device,
                cmdSent: interpreted.cmdSent,
                response: interpreted.response
            });
            this.currentMessage = "";
        }
    }

    /**
     * Cuts an OSC message and prepares it for the server.
     * @param message
     */
    osc(message){
        console.log(message);
    }

    /**
     * Main function to cut a bluetoothMessage
     * @returns {{cmdSent: *, response: string}}
     */
    getMessage(){
        var splitted = this.currentMessage.split('\r\n');
        var cmdSent = splitted[0];
        var response = this.currentMessage.replace(cmdSent, '');
        response = response.replace(splitted[splitted.length-1], '');
        response = response.substr(response.indexOf('\r\n'), response.length);

        return {cmdSent, response};
    }
}
module.exports = DeviceListener;