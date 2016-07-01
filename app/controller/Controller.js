'use strict';

var MetaManager = require('../model/MetaManager');
var Scene = require('../model/scene/Scene');

var metaScene;
var animationId = -1;

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

    static setScene(canvas){
        metaScene = new Scene(canvas);
        //Adding ground
        metaScene.addElement({
            body:{
                mass:0,
                type:"plane",
                values:{
                    width:100,
                    height:100
                }
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
            animate();
        }
    }
    
    static addEntity(options){
        var created = MetaManager.addEntity(options);
        metaScene.addElement({ element: created.sceneElement });
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
}

module.exports = Controller;