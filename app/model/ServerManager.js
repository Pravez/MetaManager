"use strict";

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
        var newPort = opt ? opt.port || -1 : -1;
        if(newPort === -1){
            do {
                newPort = server.getLocalPort + 1;
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
        console.log('disabled server ' + server);
    }

    static get getServers() { return servers }
}
module.exports = ServerManager;
