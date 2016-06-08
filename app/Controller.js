var osc = require('osc');
var Metabot = require('../app/model/Metabot');

var truc = new Metabot("prout");

var udpPort = new osc.UDPPort({
    localAddress: "127.0.0.1",
    localPort: 9996
});

udpPort.on("ready", function(){
    console.log("listening...");
});

udpPort.on("message", function (oscMessage) {
    console.log(oscMessage);
});

udpPort.on("error", function (err) {
    console.log(err);
});

udpPort.open();