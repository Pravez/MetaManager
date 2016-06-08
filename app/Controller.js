var Metabot = require('../app/model/Metabot');
var OSCServer = require('../app/model/OSCServer');
var ServerManager = require('../app/model/ServerManager');



var server1 = new OSCServer('localhost', 9997);
var server2 = new OSCServer('localhost', 9997);
 ServerManager.addServer(server1);

try {
    ServerManager.addServer(server2);
} catch (error) {
    ServerManager.enableServer(ServerManager.changeServerPort(server2));
}

server1.listen();
server2.listen();
server2.send("/s_new", ["default", 100], server1.getLocalAddr, server1.getLocalPort);