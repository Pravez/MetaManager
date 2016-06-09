// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//var remote = require('electron');
var riot = require('riot');
var Controller = require('../app/controller/Controller');
var Renderer = require('../app/view/tags/index');
require('../app/view/tags');

//Here we mount every single tag
riot.mount('menubar', {active: "home"});
riot.mount('home');
riot.mount('connections', {bots: Controller.getBots()});
riot.mount('scene', {sec: "prout"});
//And we add the main windows composing the app
Renderer.addWindow('home');
Renderer.addWindow("connections");
Renderer.addWindow("scene");
Renderer.showWindow("home");