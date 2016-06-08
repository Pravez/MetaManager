var Metabot = require('../app/model/Metabot');
var OSCServer = require('../app/model/OSCServer');

var server1 = new OSCServer('localhost', 9998);
var server2 = new OSCServer('localhost', 9999);
server1.listen();
server2.listen();
server2.send('/s_new', ["default", 100], "localhost", 9998);
server1.send('/s_delete', ["default", 100], "localhost", 9999);