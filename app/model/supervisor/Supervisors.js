var Supervisor = require('./Supervisor');

var exports = module.exports = {};

class SimpleSupervisor extends Supervisor{
    constructor(name, groundSize){
        super(name, groundSize);
    }

    step() {
        if (this.robots.size > 0) {
            if (this.robots.get(0).position.x > this.groundSize) {
                this.setRobotVelocity(0, 0, 0, 10);
            }else{
                this.setRobotVelocity(0, 10);
            }
        }
    }
    
    onOrder(message){
        Supervisor.retransmitMessage(message);
    }
}

exports.simple = SimpleSupervisor;