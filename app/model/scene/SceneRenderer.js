"use strict";
var Three = require('three');
require('./TrackballControls');


class SceneRenderer{

    constructor(options){
        this.scene = new Three.Scene();

        var canvas = typeof options.canvas === "string" ? document.getElementById(options.canvas) : options.canvas;

        this.camera = new Three.PerspectiveCamera(30, canvas.width / canvas.height, 0.5, 10000);
        this.camera.position.set(17, 5, 17);
        this.scene.add(this.camera);

        this.controls = new Three.TrackballControls( this.camera , canvas);
        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = false;
        this.controls.noPan = false;
        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;
        this.controls.keys = [ 65, 83, 68 ];

        this.scene.add( new Three.AmbientLight( 0x666666 ) );

        var light = new Three.DirectionalLight( 0xffffff, 1.75 );
        var d = 20;
        light.position.set( d, d, d );
        light.castShadow = true;
        //light.shadowCameraVisible = true;
        light.shadowMapWidth = 1024;
        light.shadowMapHeight = 1024;
        light.shadowCameraLeft = -d;
        light.shadowCameraRight = d;
        light.shadowCameraTop = d;
        light.shadowCameraBottom = -d;
        light.shadowCameraFar = 3*d;
        light.shadowCameraNear = d;
        light.shadowDarkness = 0.5;
        this.scene.add( light );

        var geometry = new Three.PlaneGeometry( 100, 100, 1, 1 );
        //geometry.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI / 2 ) );
        var material = new Three.MeshLambertMaterial( { color: 0x777777 } );
        //THREE.ColorUtils.adjustHSV( material.color, 0, 0, 0.9 );
        var mesh = new Three.Mesh( geometry, material );
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.scene.add( mesh );

        var cubeGeo = new Three.BoxGeometry( 1, 1, 1, 10, 10 );
        var cubeMaterial = new Three.MeshPhongMaterial( { color: 0x888888 } );
        var cubeMesh = new Three.Mesh( cubeGeo, cubeMaterial );
        cubeMesh.castShadow = true;
        this.scene.add( cubeMesh );

        this.renderer = new Three.WebGLRenderer({ canvas: canvas });
        this.renderer.setSize(canvas.width, canvas.height);

        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;
        this.renderer.shadowMap.enabled = true;

    }

    addMesh(mesh){
        this.scene.add(mesh);
    }

    render(){
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
    
}
module.exports = SceneRenderer;