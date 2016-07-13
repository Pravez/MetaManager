var Supervisor = require('./Supervisor');

var exports = module.exports = {};

class SimpleSupervisor extends Supervisor{
    constructor(name, groundSize){
        super(name, groundSize);
        this.type = "simple";
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
    
    onOrder(message){
        Supervisor.retransmitMessage(message);
    }
}

exports.simple = SimpleSupervisor;