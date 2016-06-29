"use strict";
var SceneRenderer = require('./SceneRenderer');
var Physics = require('./Physics');
var SceneElement = require('./SceneElement');


class Scene{


    constructor(canvas){
        this.physics = new Physics({ gravX: 0, gravY: 0, gravZ: 0});
        this.renderer = new SceneRenderer({/*
            camera:{
                fov:75,
                aspect: window.innerWidth / window.innerHeight,
                near: 1,
                far: 100,
                position:{
                    x:0,
                    y:2,
                    z:5
                }
            },*/
            canvas: canvas
        });

        this.elements = [];
    }

    addElement(options){
        var element = new SceneElement();
        element.setBody({
            mass: options.body.mass,
            type: options.body.type,
            values: options.body.values
        });

        element.setMesh({
            color: options.mesh.color,
            wireframe: options.mesh.wireframe,
            type: options.mesh.type,
            width: options.body.values.width*2,
            height: options.body.values.height*2,
            widthSeg: options.mesh.widthSeg,
            heightSeg: options.mesh.HeightSeg
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