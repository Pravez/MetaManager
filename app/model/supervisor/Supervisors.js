var Supervisor = require('./Supervisor').Supervisor;
var Types = require('./Supervisor').Types;

var Vector = require('../Utility').Vector;

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
        super.onEntityOrder(message);
    }

    onOSCMessage(message){
        super.onOSCMessage(message);
    }
}

exports[Types.Simple] = SimpleSupervisor;


/**
 * From http://www.kfish.org/boids/pseudocode.html
 */
class BoidSupervisor extends Supervisor{
    constructor(name, groundSize){
        super(name, groundSize);
    }

    step(){
        //Move boids to new position
        let v1, v2, v3, v4;

        for(let key of this.robots.keys()){
            v1 = this.flyTowardCenterRule(key);
            v2 = this.keepSmallDistanceRule(key);
            v3 = this.matchVelocityRule(key);
            v4 = this.boundingPositionRule(key);

            this.robots.get(key).velocity = Vector.VectorAdd(this.robots.get(key).velocity, v1, v2, v3, v4);
        }
    }

    onEntityOrder(message){
        super.onEntityOrder(message);
    }

    onOSCMessage(message){
        super.onOSCMessage(message);
    }

    flyTowardCenterRule(boid){
        let vec = new Vector();

        for(let key of this.robots.keys()){
            if(key !== boid){
                Vector.VectorAdd(vec, this.robots.get(key).position);
            }
        }

        vec = Vector.VectorDiv(vec, this.robots.keys().length - 1 );

        return vec;
    }

    keepSmallDistanceRule(boid){
        let vec = new Vector();

        for(let key of this.robots.keys()){
            if(key !== boid){
                let distance = Vector.VectorSub(this.robots.get(key).position, this.robots.get(boid).position);
                if(Vector.VectorInferiorTo(distance, 100)){
                    vec = Vector.VectorSub(vec, (Vector.VectorSub(this.robots.get(key).position, this.robots.get(boid).position)));
                }
            }
        }

        return vec;
    }

    matchVelocityRule(boid){
        let vec = new Vector();

        for(let key of this.robots.keys()){
            if(key !== boid){
                vec = Vector.VectorAdd(vec, this.robots.get(key).velocity);
            }
        }

        vec = Vector.VectorDiv(vec, this.robots.keys().length - 1 );

        return Vector.VectorDiv(Vector.VectorSub(vec, this.robots.get(boid).velocity), 8);
    }

    boundingPositionRule(boid) {
        let bounds = Vector.VectorSub(this.groundSize, new Vector(25, 25, 25));
        let vec = new Vector();
        let rposition = this.robots.get(boid).position;

        if (rposition.x < -bounds.x)
            vec.x = 10;
        else if (rposition.x > bounds.x)
            vec.x = -10;
        if (rposition.y < -bounds.y)
            vec.y = 10;
        else if (rposition.y > bounds.y)
            vec.y = -10;
        if (rposition.z < -bounds.z)
            vec.z = 10;
        else if (rposition.z > bounds.z)
            vec.z = -10;

        return vec;
    }
}

exports[Types.Boids] = BoidSupervisor;