var servers = { enabled: [], disabled: []};

/**
 * An error handler (the class is only useful to interact
 * with the program, functions in this file are doing the job)
 */
class ErrorsHandler {

    /**
     * Add a server to a list of servers (by default enabled)
     * @param server
     */
    static addServer(server){
        servers.enabled.push(server);
    }

    /**
     * Method to remove a server. Tries to remove from disabled and enabled.
     * If it is not present, throws an error.
     * @param server
     * @returns {Array.<*>}
     */
    static removeServer(server){
        var index = servers.enabled.indexOf(server);
        if(index != -1) return servers.enabled.splice(index, 1);

        index = servers.disabled.indexOf(server);
        if(index != -1) return servers.disabled.splice(index, 1);

        throw "Error: given server isn't referenced";
    }

    /**
     * Getter of enabled servers
     * @returns {Array}
     */
    static getEnabledServers(){
        return servers.enabled;
    }

    /**
     * Getter of disabled servers
     * @returns {Array}
     */
    static getDisabledServers(){
        return servers.disabled;
    }

    /**
     * Getter of servers
     * @returns {{enabled: Array, disabled: Array}}
     */
    static getServers(){
        return servers;
    }
}

/**
 * Function to handle an error
 * @param err
 */
function handleError(err){
    console.log("Caught[via 'error' event]:  '" + err.message + "' from " + err.filename + ":" + err.lineno);
    console.log(err); // has srcElement / target / etc
    evt.preventDefault();
}

/**
 * The window on error event, permits to catch any normally uncaught exception
 */
window.addEventListener('error', function (evt) {
    onErrorEvent(evt);
});


module.exports = ErrorsHandler;
