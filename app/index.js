var riot = require('riot');
var Controller = require('../app/controller/Controller');
var Renderer = require('../app/view/tags/Renderer').Renderer;
var ContextMenu = require('../app/view/js/ContextMenu');
var Manager = require('../app/view/tags/Renderer').PanesManager;

//register the root of the app
var path = require('path');
global.appRoot = path.resolve(__dirname);

//Here we mount every single tag
riot.mount('toolbar', {active: "scene"});
riot.mount('menu', {active: "scene"});
riot.mount('creation', {entities: Controller.getEntities(), devices: []});
riot.mount('scene', {sec: "prout"});
riot.mount('contextMenus');
riot.mount('wfooter');

//Mounting manager
riot.mount('manager');
riot.mount('search', { entities: Controller.getEntities() });
riot.mount('.management');

//And we add the main windows composing the app
Renderer.addWindow("manager");
Renderer.addWindow("scene");
Renderer.hideAll();
Renderer.showWindow("scene");

Controller.setScene(document.getElementById('sceneCanvas'));

Manager.addPane("control");
Manager.addPane("edit");
Manager.addPane("add");
Manager.addPane("home");
Manager.setCurrentPane("home");


Controller.animateScene();
