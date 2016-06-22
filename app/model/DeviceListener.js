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

class DeviceListener{
    constructor(device){
        this.device = device;
        this.currentMessage = "";
    }

    setMainAnalyzers(bluetooth, osc){
        this.btAnalyzer = bluetooth;
        this.oscAnalyze = osc;
    }

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

    osc(message){
        console.log(message);
    }

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