"use strict";

class Server{

    constructor(localAddress, localPort, remoteAddress, remotePort){
        this.localAddress = localAddress;
        this.localPort = localPort;
        this.remoteAddress = remoteAddress || "0.0.0.0";
        this.remotePort = remotePort || 0;
    }

    }