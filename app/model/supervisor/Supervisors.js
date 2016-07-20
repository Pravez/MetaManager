var Supervisor = require('./Supervisor').Supervisor;
var Types = require('./Supervisor').Types;

var exports = module.exports = {};

class SimpleSupervisor extends Supervisor{
    constructor(name, groundSize){
        super(name, groundSize);
    }

    step() {
        for(let key of this.robots.keys()) {
            if (this.robots.size > 0) {
                var out = this.isOutOfBounds(key);

                if (out.x === true) {
                    this.setRobotVelocity(key, {x: -this.robots.get(key).velocity.x});
                }
                if (out.z === true) {
                    this.setRobotVelocity(key, {z: -this.robots.get(key).velocity.z});
                }
                if (out.y === true) {
                    this.setRobotVelocity(key, {y: -this.robots.get(key).velocity.y});
                }
            }
        }
    }

    onEntityOrder(message){
        Supervisor.retransmitMessage(message);
    }

    onOSCMessage(message){
        console.log(message);
    }
}

exports[Types.Simple] = SimpleSupervisor;

class BoidSupervisor extends Supervisor{
    constructor(name, groundSize){
        super(name, groundSize);
    }

    step(){

    }

    onEntityOrder(message){

    }

    onOSCMessage(message){

    }
}