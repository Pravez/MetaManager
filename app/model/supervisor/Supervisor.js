var MetaManager = require('../MetaManager');

class Supervisor{

    constructor(name, groundSize){
        this.name = name;
        this.groundSize = groundSize;

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
        MetaManager.getEntity(message.entity).updateRobotValuesFromBluetooth(message);
    }

    step(){
        //Nothing done if not overrided
    }

    onOrder(message){
        //No analyze if not overrided
        Supervisor.retransmitMessage(message);
    }

    setRobotVelocity(id, x, y, z){
        let robot = this.robots.get(id);
        let velocity = {};
        velocity.x = x || x == 0 ? x : robot.velocity.x;
        velocity.y = y || y == 0 ? y : robot.velocity.y;
        velocity.z = z || z == 0 ? z : robot.velocity.z;

        robot.velocity = velocity;
        
        this.sendCommand(id, "dx", velocity.x);
        this.sendCommand(id, "dy", velocity.y);
        //this.sendCommand(id, "dz", velocity.z);
    }

    get size(){
        return this.groundSize;
    }

}

module.exports = Supervisor;