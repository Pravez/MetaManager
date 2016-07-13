var MetaManager = require('../MetaManager');

var supervisors_types = new Set();

class Supervisor{

    constructor(name, groundSize){
        this.name = name;
        this.groundSize = {};
        this.groundSize.x = groundSize.x || groundSize;
        this.groundSize.y = groundSize.y || groundSize;
        this.groundSize.z = groundSize.z || groundSize;

        this.updateRobotsList();


    }

    getRobots(){
        //Map of { entity.id => entity.robot }
        var robots = new Map();
        MetaManager.getEntities().forEach(function(e){
            robots.set(e.id, e.robot);
        });

        return robots;
    }

    updateRobotsList(){
        this.robots = this.getRobots();
    }

    sendCommand(entity, command, arg){
        if(typeof entity === "number")
            MetaManager.getEntity(entity).executeCommand({command: command, value: arg}, true);
        else if(typeof entity === "object")
            entity.forEach(function(e){
                MetaManager.getEntity(e).executeCommand({command: command, value: arg}, true);
            });
    }

    static retransmitMessage(message){
        MetaManager.getEntity(message.entity).executeCommand({ command: message.cmd, value: message.arg}, true);
    }

    step(){
        //Nothing done if not overrided
    }

    onOrder(message){
        //No analyze if not overrided
        Supervisor.retransmitMessage(message);
    }

    setRobotVelocity(id, options){
        //Velocity is changed when sending a command
        /*let robot = this.robots.get(id);
        robot.velocity = options;*/

        if(options.x || options.x === 0)
            this.sendCommand(id, "dx", options.x);
        if(options.z || options.z === 0)
            this.sendCommand(id, "dy", options.z);
        //this.sendCommand(id, "dz", velocity.z);
    }

    isOutOfBounds(id){
        let position = this.robots.get(id).position;

        return  { x: (position.x > this.groundSize.x || position.x < -this.groundSize.x),
                  z: (position.z > this.groundSize.z || position.z < -this.groundSize.z),
                  y: (position.y > this.groundSize.y || position.y < -this.groundSize.y) };
    }

    get size(){
        return this.groundSize;
    }

    set type(value){
        this.sup_type = value;
        supervisors_types.add(value);
    }

    static get types(){
        return Array.from(supervisors_types);
    }
}

module.exports = Supervisor;