// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//var remote = require('electron');
var riot = require('riot');
var Controller = require('../app/controller/Controller');
var Renderer = require('../app/view/tags/main/index');
var ContextMenu = require('../app/view/tags/main/ContextMenu');
var BluetoothServer = require('../app/model/BluetoothServer');
require('../app/view/tags/main');

//register the root of the app
var path = require('path');
global.appRoot = path.resolve(__dirname);

//Here we mount every single tag
riot.mount('menubar', {active: "home"});
riot.mount('home');
riot.mount('connections', {bots: Controller.getBots(), devices: []});
riot.mount('scene', {sec: "prout"});
riot.mount('contextMenus');

//And we add the main windows composing the app
Renderer.addWindow('home');
Renderer.addWindow("connections");
Renderer.addWindow("scene");
Renderer.showWindow("home");

//BluetoothServer.startDiscovery();

//Contexts menus need to be setted up after everything is made
//Select a className elements which will trigger the context menu, then the id of the context menu, and finally
//the called function upon click on one item.
var cm = new ContextMenu("bots", document.getElementById("photon_cm"), function(e){ console.log(e.innerHTML);}).setUp();

