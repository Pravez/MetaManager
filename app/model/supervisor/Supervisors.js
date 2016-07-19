var Supervisor = require('./Supervisor').Supervisor;
var Types = require('./Supervisor').Types;

var exports = module.exports = {};

class SimpleSupervisor extends Supervisor{
    constructor(name, groundSize){
        super(name, groundSize);
    }

    step() {
        if (this.robots.size > 0) {
            var out = this.isOutOfBounds(0);

            if(out.x === true){
                this.setRobotVelocity(0, {x: 0});
            }
            if(out.z === true){
                this.setRobotVelocity(0, {z: 0});
            }
            if(out.y === true){
                this.setRobotVelocity(0, {y: 0});
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