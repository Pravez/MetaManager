var MetaManager = require('../MetaManager');
var Entity = require('../Entity');

var SupervisorTypes = {
    Simple: "Simple"
};

var exports = module.exports = {};

class Supervisor extends Entity {

    constructor(name, groundSize){
        super();

        this.name = name;
        this.groundSize = {};
        this.groundSize.x = groundSize ? groundSize.x || groundSize : 1000;
        this.groundSize.y = groundSize ? groundSize.y || groundSize : 1000;
        this.groundSize.z = groundSize ? groundSize.z || groundSize : 1000;

        this.robots = this.getAllRobots();
        this.add_new_robot = true;
    }

    setUp(options){
        this.setUpDeviceListeners(undefined, this.onOSCMessage);
        this.setUpDevice({ osc: options });
    }

    getAllRobots(){
        //Map of { entity.id => entity.robot }
        var robots = new Map();
        MetaManager.getEntities().forEach(function(e){
            robots.set(e.id, e.robot);
        });

        return robots;
    }

    addRobot(entity){
        if(this.add_new_robot === true)
            this.robots.set(entity.id, entity.robot);
    }

    removeRobot(id){
        this.robots.delete(id);
    }

    step(){
        //Nothing done if not overrided
    }

    onEntityOrder(message){
        //No analyze if not overrided
        Supervisor.retransmitMessage(message);
    }

    onOSCMessage(message){
        //Nothing ?
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

    sendCommand(entity, command, arg){
        if(typeof entity === "number")
            MetaManager.getEntity(entity).executeCommand({command: command, value: arg}, true);
        else if(typeof entity === "object")
            entity.forEach(function(e){
                MetaManager.getEntity(e).executeCommand({command: command, value: arg}, true);
            });
    }

    toggleAddByDefault(){
        this.add_new_robot = !this.add_new_robot;
    }

    has(id){
        return this.robots.has(id);
    }

    static retransmitMessage(message){
        MetaManager.getEntity(message.entity).executeCommand({ command: message.cmd, value: message.arg}, true);
    }

    get size(){
        return this.groundSize;
    }

    static get types(){
        let array = [];
        for (let sup in SupervisorTypes){
            if(SupervisorTypes.hasOwnProperty(sup)){
                array.push({name : sup});
            }
        }
        return array;
    }
}

exports.Supervisor = Supervisor;
exports.Types = SupervisorTypes;