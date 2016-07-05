'use strict';

var MetaManager = require('../model/MetaManager');
var Scene = require('../model/scene/Scene');
var Renderer = require('../view/tags/Renderer').Renderer;

var metaScene;
var animationId = -1;
var resizeNeeded = false;

MetaManager.addEntity({
    robot:{
        name: "Ewok",
        position:{
            x:100,
            y:100
        }
    },
    device:{
        osc:{
            address: 'localhost',
            port: 15000
        }
    }
});

class Controller{

    static resizeCanvas(){
        if(Renderer.currentContainsCanvas()){
            metaScene.renderer.resize();
        }else{
            resizeNeeded = true;
        }
    }
    
    static setScene(canvas){
        metaScene = new Scene(canvas);
        //Adding ground
        metaScene.addElement({
            body:{
                mass:0,
                type:"plane",
                values:{
                    width:500,
                    height:500
                },
                material: "no_special"
            },
            mesh:{
                color: "#777777",
                materialType: "phong",
                type: "plane",
                widthSeg: 1,
                heightSeg: 1,
                castShadow: true,
                receiveShadow: true
            }
        });
    }

    static animateScene(){
        animate();
    }

    static pauseWorldAndAnimations(){
        if(animationId !== -1) {
            cancelAnimationFrame(animationId);
            animationId = -1;
        }
    }

    static unpauseWorldAndAnimations(){
        if(animationId === -1){
            //Restore controls, probably temporary solution
            metaScene.renderer.addTrackballControls();
            animate();
        }
    }
    
    static addEntity(options){
        var created = MetaManager.addEntity(options);
        metaScene.addElement({ element: created.robot.sceneElement });
    }

    static modifyEntity(entity, options){
        entity.modify(options);
    }
    
    static getEntities(){
        return MetaManager.getEntities();
    }

    static getEntity(id){
        return MetaManager.getEntity(id);
    }

    static switchEntityOSCListening(id){
        var ent = MetaManager.getEntity(id);
        ent.switchOSCState();
    }
    
    static requestRobotInfo(id){
        return MetaManager.getRobotInformationsFromDevice(id);
    }

    static findDevicesByRegexp(regexp){
        var entities = MetaManager.getEntities();
        var found = [];
        for(let entity of entities){
            //TODO end this with mac address
            if(entity.robot.name.match(regexp))
                found.push(entity);
        }

        return found.sort();
    }
}

function animate(){
    animationId = requestAnimationFrame(animate);
    metaScene.play();
    /*metaScene.elements[1].setVelocity(1, 0, 0);
    console.log(metaScene.elements[1].body.position);*/
}

window.addEventListener('resize', Controller.resizeCanvas, false );
document.addEventListener('windowChanged', () => {
    if(resizeNeeded === true)
        Controller.resizeCanvas();
});

module.exports = Controller;