"use strict";
var Cannon = require('cannon');

class Physics{

    constructor(options){
        this.world = new Cannon.World();
        this.world.gravity.set(options.gravX || 0, options.gravY || -9.82 , options.gravZ || 0);
        this.world.broadphase = new Cannon.NaiveBroadphase();
        this.world.solver.iterations = 10;

        this.timeStep = options.timeStep || 1.0 / 60.0;

        this.materials = new Map();
    }

    addBody(body){
        this.world.addBody(body);
    }

    addMaterial(name){
        this.materials.set(name, new Cannon.Material(name));
    }

    addContactMaterial(first, second, friction = 0.4, restitution = 0.0){
        this.world.addContactMaterial(new ContactMaterial({
            first,
            second,
            friction,
            restitution
        }))
    }

    step(){
        this.world.step(this.timeStep);
    }

}
module.exports = Physics;
