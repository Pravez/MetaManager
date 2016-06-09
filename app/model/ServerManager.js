"use strict";
var OSCServer = require('../model/OSCServer');
/**
 * An object containing a map and an array (map for mapping enabled server to port,
 * array for each wrong other server).
 * @type {{enabled: Map, disabled: Array}}
 */
var servers = { enabled: new Map(), disabled: [] };

/**
 * An error handler (the class is only useful to interact
 * with the program, functions in this file are doing the job)
 */
class ServerManager {

    /**
     * Add a server to a list of servers (by default enabled)
     * @param server
     */
    static addServer(server){
        if(!servers.enabled.has(server.getLocalPort)) {
            servers.enabled.set(server.getLocalPort, server);
        }
        else
        {
            servers.disabled.push(server);
            throw "Error : one server is already listening on this port. Server added as disabled."
        }
    }

    /**
     * Removes a server if it exists. (removes from enabled and disabled)
     * @param server
     * @returns {*}
     */
    static removeServer(server){

        if(servers.enabled.has(server.getLocalPort)){
            servers.enabled.delete(server.getLocalPort);
            return server;
        }

        if(servers.disabled.indexOf(server) != -1) return servers.disabled.splice(servers.disabled.indexOf(server), 1)[0];

        throw "Error: given server isn't referenced.";
    }

    /**
     * Function to change port of a server. If 'port' parameter is not given, seeks for the first
     * next available port.
     * @param server
     * @param opt
     * @returns {*}
     */
    static changeServerPort(server, opt){
        var newPort = opt ? opt.port || server.getLocalPort : server.getLocalPort;
        if(newPort === server.getLocalPort){
            do {
                newPort = newPort + 1;
            }while(servers.enabled.has(newPort));
        }

        server.setLocalPort = newPort;
        if(opt && opt.remove && opt.remove === true)
            return this.removeServer(server);
        return server;
    }

    /**
     * Function to enable a server (removes it from the servers (disabled), and adds it).
     * @param server
     */
    static enableServer(server){
        if (!servers.enabled.get(server.getLocalPort)) {
            this.removeServer(server);
            this.addServer(server);
        } else {
            throw "Error : one server is already running on this port."
        }

        return server;
    }

    /**
     * Function to disable a server (from the enabled servers)
     * @param server
     */
    static disableServer(server){
        this.removeServer(server);
        servers.disabled.push(server);
    }

    /**
     * Function to handle an error
     * @param log
     */
    static handleServerError(log) {

        //Find the port
        var address = log.match(/\d+\.\d+\.\d+\.\d+:\d+/gi);

        //Disable server listening on the port
        address.forEach(function (e) {
            var port = e.split(':')[1];
            if (servers.enabled.has(parseInt(port))) {
                ServerManager.disableServer(servers.enabled.get(parseInt(port)));
                servers.enabled.set(parseInt(port), new OSCServer(e.split(':')[0], parseInt(port)));
            }
        });


        servers.disabled.forEach(function (e) {
            ServerManager.enableServer(ServerManager.changeServerPort(e));
        });
    }

    static get getServers() { return servers }
}
module.exports = ServerManager;

/**
  * The window on error event, permits to catch any normally uncaught exception
  */
window.addEventListener('error', function (evt) {

    console.log("Caught error [ via 'error' event ]  :'" + evt.message + "' from " + evt.filename + ":" + evt.lineno);

    if(evt.message.search("EADDRINUSE") != -1){
        ServerManager.handleServerError(evt.message);
    }

});

