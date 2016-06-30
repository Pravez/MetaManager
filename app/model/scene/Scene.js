"use strict";
var SceneRenderer = require('./SceneRenderer');
var Physics = require('./Physics');
var SceneElement = require('./SceneElement');
var Vec3 = require('../utility/Vector');


class Scene{


    constructor(canvas){
        this.physics = new Physics({ gravX: 0, gravY: 0, gravZ: 0});
        this.renderer = new SceneRenderer(canvas);

        this.renderer.setCamera(30, canvas.width / canvas.height, 0.5, 10000, new Vec3(17, 5, 17));
        this.renderer.addTrackballControls();
        this.renderer.addLight({ type: "ambient", color:0x666666});
        this.renderer.addLight({ type:"directional", color: 0xffffff, intensity:2 });

        this.elements = [];

        this.physics.addMaterial("no_special");
        this.physics.addContactMaterial("no_special", "no_special", 0,0);
    }

    addElement(options){
        var element = new SceneElement();

        element.setBody({
            mass: options.body.mass,
            type: options.body.type,
            values: options.body.values,
            position: options.body.position,
            material: this.physics.getMaterial("no_special")
        });

        element.setMesh({
            material:{
                type: options.mesh.materialType,
                color: options.mesh.color,
                wireframe: options.mesh.wireframe
            },
            type: options.mesh.type,
            width: options.body.values.width*2,
            height: options.body.values.height*2,
            depth: options.body.values.depth*2,
            widthSeg: options.mesh.widthSeg,
            heightSeg: options.mesh.heightSeg,
            castShadow: options.mesh.castShadow,
            receiveShadow: options.mesh.receiveShadow
        });

        this.elements.push(element);
        this.physics.addBody(element.body);
        this.renderer.addMesh(element.mesh);
    }

    play(){
        this.physics.step();

        for(let i = 0;i < this.elements.length;i++) {
            this.elements[i].updateMesh();
        }

        this.renderer.render();
    }
}
module.exports = Scene;