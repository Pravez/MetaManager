var Metabot = require('../app/model/Metabot');
var OSCServer = require('../app/model/OSCServer');
var ErrorsHandler = require('../app/model/ErrorsHandler');



var server1 = new OSCServer('localhost', 9997);
ErrorsHandler.addServer(server1);


server1.listen();