"use strict";
var Three = require('three');
var Cannon = require('cannon');

class SceneElement{
    constructor(){

    }

    setBody(options){
        var body = new Cannon.Body({
            mass: options.mass,
            type: Cannon.Body.DYNAMIC
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
                this.type = "drone";
                break;
            case "cube":
                body.addShape(new Cannon.Box(new Cannon.Vec3(options.values.width, options.values.height, options.values.depth)));
                this.type = "robot";
                break;
            case "plane":
                body.addShape(new Cannon.Plane());
                body.quaternion.setFromAxisAngle(new Cannon.Vec3(1,0,0),-Math.PI/2);
                this.type = "ground";
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

        this.color = options.material.color;
    }

    updatePositions(){
        //Update mesh positions
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
    }

    setVelocity(x, y, z){
        if(x && y && z){
            this.body.velocity = new Cannon.Vec3(x, y, z);
        }else{
            this.body.velocity.x = x ? x : this.body.velocity.x;
            this.body.velocity.y = y ? y : this.body.velocity.y;
            this.body.velocity.z = z ? z : this.body.velocity.z;
        }
    }

    getVelocity(){
        return this.body.velocity;
    }

    setColor(color){
        this.color = color;
        this.material.color = new Three.Color(color);
    }

    setPosition(position){
        if(position){
            this.body.position.x = position.x ? position.x : this.body.position.x;
            this.body.position.y = position.y ? position.y : this.body.position.y;
            this.body.position.z = position.z ? position.z : this.body.position.z;
        }
    }

    static createLimits(size){
        var material = new Three.LineBasicMaterial({
            color: 0x0000ff
        });
        var geometry = new Three.Geometry();
        geometry.vertices.push(new Three.Vector3(-size, 0.1 , size));
        geometry.vertices.push(new Three.Vector3(-size, 0.1 , -size));
        geometry.vertices.push(new Three.Vector3(size, 0.1 , -size));
        geometry.vertices.push(new Three.Vector3(size, 0.1 , size));
        geometry.vertices.push(new Three.Vector3(-size, 0.1 , size));

        return new Three.Line(geometry, material);
    }
}
module.exports = SceneElement;