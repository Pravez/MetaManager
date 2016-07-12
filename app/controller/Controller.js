'use strict';

var MetaManager = require('../model/MetaManager');
var Scene = require('../model/scene/Scene');
var Renderer = require('../view/tags/Renderer').Renderer;
var Supervisors = require('../model/supervisor/Supervisors');


var metaScene;
var animationId = -1;
var resizeNeeded = false;

var supervisors = new Map();
var activeSupervisor;

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
                    width:1000,
                    height:1000
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

    static modifyEntity(options, id){
        Controller.getEntity(id).modify(options);
    }

    static removeEntity(id){
        var ent = MetaManager.removeEntity(id);
        if(ent.robot.sceneElement)
            metaScene.removeElement(ent.robot.sceneElement);
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

    static packageRangeControlDatas(id){
        if(id > -1) {
            var robot = Controller.getEntity(id).robot;
            var data = [];
            data.push({name: 'h', type: 'range', min: -150, max: 50, init_value: robot._values.h, description: "Height"});
            data.push({name: 'r', type: 'range', min: 80, max: 150, init_value: robot._values.r, description: "Size"});
            data.push({name: 'freq', type: 'range', min: 0, max: 4, init_value: robot._values.freq, description: "Frequency of steps"});
            data.push({name: 'alt', type: 'range', min: -200, max: 150, init_value: robot._values.alt, description: "Altitude of steps"});
            data.push({name: 'dx', type: 'text', init_value: robot._values.dx, description: "Speed in x"});
            data.push({name: 'dy', type: 'text', init_value: robot._values.dy, description: "Speed in y"});

            return data;
        }

        return null;
    }

    static packageDefaultRangeControlDatas(){
        var data = [];
        data.push({name: 'h', type: 'range', min: -150, max: 50, description: "Height"});
        data.push({name: 'r', type: 'range', min: 80, max: 150, description: "Size"});
        data.push({name: 'freq', type: 'range', min: 0, max: 4, description: "Frequency"});
        data.push({name: 'alt', type: 'range', min: -200, max: 150, description: "Altitude"});

        return data;
    }

    static addSupervisor(supervisorType, name, groundSize){
        supervisors.set(name, new Supervisors[supervisorType](name, groundSize));
        activeSupervisor = name;
    }

    static removeSupervisor(name){
        supervisors.delete(name);
    }

    static getActiveSupervisorName(){
        return activeSupervisor;
    }
    
    static setSupervisor(name){
        MetaManager.setSupervisor(supervisors.get(name));
        metaScene.createLimits(supervisors.get(name).size);
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

