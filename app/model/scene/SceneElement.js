"use strict";
var Three = require('three');
var Cannon = require('cannon');

class SceneElement{
    constructor(){

    }

    setBody(options){
        var body = new Cannon.Body({
            mass: options.mass
        });

        if(options.position){
            body.position.x = options.position.x || body.position.x;
            body.position.y = options.position.y || body.position.y;
            body.position.z = options.position.z || body.position.z;
        }

        if(options.material){
            body.material = options.material;
        }


        switch(options.type){
            case "sphere":
                body.addShape(new Cannon.Sphere(options.values.radius));
                break;
            case "cube":
                body.addShape(new Cannon.Box(new Cannon.Vec3(options.values.width, options.values.height, options.values.depth)));
                break;
            case "plane":
                body.addShape(new Cannon.Plane());
                body.quaternion.setFromAxisAngle(new Cannon.Vec3(1,0,0),-Math.PI/2);
                break;
            default:
                body.addShape(new Cannon.Box(new Cannon.Vec3(1,1,1)));
        }

        this.body = body;
    }

    setMesh(options){
        var geometry, material;


        switch(options.material.type){
            case "basic":
                material = new Three.MeshBasicMaterial({color: options.material.color, wireframe: options.material.wireframe});
                break;
            case "lambert":
                material = new Three.MeshLambertMaterial( { color: options.material.color } );
                break;
            case "phong":
                material = new Three.MeshPhongMaterial( { color: options.material.color } );
                break;
        }

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
        if(options.castShadow === true)
            this.mesh.castShadow = true;
        if(options.receiveShadow === true)
            this.mesh.receiveShadow = true;
    }

    updateMesh(){
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
    }

    setVelocity(x, y, z){
        this.body.velocity = new Cannon.Vec3(x, y, z);
    }

    getVelocity(){
        return this.body.velocity;
    }

    setColor(color){
        this.material.color = new Three.Color(color);
    }
}
module.exports = SceneElement;