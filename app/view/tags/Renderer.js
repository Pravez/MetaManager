"use strict";

var riot = module.parent.require('riot');

require('./home/home.tag');
require('./creation/creation.tag');
require('./creation/add.tag');
require('./creation/edit.tag');
require('./creation/control.tag');
require('./creation/pad.tag');
require('./misc/menubar.tag');
require('./scene/scene.tag');
require('./scene/sceneCanvas.tag');
require('./misc/contextMenus.tag');
require('./misc/wfooter.tag');

//Windows are a map of windows composing the app
var windows = new Map();
var currentWindow;

class Renderer {

    static addWindow(windowName, element){
        windows.set(windowName, document.getElementsByTagName(windowName || element)[0]);
    }

    static currentWindow(){
        return currentWindow;
    }

    static showWindow(windowName){
        //Hides every window
        for(var key of windows.keys()){
            windows.get(key).style.display = 'none';
        }

        //shows only the concerned
        windows.get(windowName).style.display = '';
        currentWindow = windowName;
        document.dispatchEvent(new Event("windowChanged"));
    }
}
module.exports = Renderer;