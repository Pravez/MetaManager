"use strict";
var Three = require('three');
var Cannon = require('cannon');

class SceneElement{
    constructor(){

    }

    setBody(options){
        var body = new Cannon.Body({
            mass: options.mass,
            position: new Cannon.Vec3(options.posX, options.posY, options.posZ)
        });

        switch(options.type){
            case "sphere":
                body.addShape(new Cannon.Sphere(options.values.radius));
                break;
            case "cube":
                body.addShape(new Cannon.Box(new Cannon.Vec3(options.values.width, options.values.height, options.values.depth)));
                break;
            case "plane":
                body.addShape(new Cannon.Plane());
                break;
            default:
                body.addShape(new Cannon.Box(new Cannon.Vec3(1,1,1)));
        }

        this.body = body;
    }

    setMesh(options){
        var geometry, material;

        material = new Three.MeshBasicMaterial({color: options.color, wireframe: options.wireframe});

        switch(options.type){
            case "box":
                geometry = new Three.BoxGeometry(options.width, options.height, options.depth, options.widthSeg, options.heightSeg);
                break;
            case "cube":
                geometry = new Three.CubeGeometry(options.width, options.height, options.depth, options.widthSeg, options.heightSeg);
                break;
            case "plane":
                geometry = new Three.PlaneGeometry(options.width, options.height, options.widthSeg, options.heightSeg);
                break;
        }

        this.geometry = geometry;
        this.material = material;
        this.mesh = new Three.Mesh(geometry, material);
    }

    updateMesh(){
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
    }
}
module.exports = SceneElement;