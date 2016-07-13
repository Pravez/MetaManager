"use strict";

class DeviceElement{
    constructor(){
        this.address = undefined;
        this.name = "NONAME";
        this.device = undefined;

        this.connected = false;
    }

    setUp(options){
        this.address = options.address;
        this.name = options.name;
    }

    on(event, func){
        this.device.on(event, func);
    }

    setListener(event, listener){
        if(listener)
            this.listener = listener;
        //Maybe this.listener instead of listener ? self.listener should be better
        this.on(event, function(data){ listener(data); });
    }

    get isConnected(){
        return this.connected;
    }

    connect(){}
    disconnect(){}
    send(data){}
    modify(){}
}
module.exports = DeviceElement;