"use strict";

var riot = module.parent.require('riot');

require('./home/home.tag');
require('./creation/creation.tag');
require('./creation/add.tag');
require('./creation/edit.tag');
require('./creation/control.tag');
require('./creation/pad.tag');
require('./nav/toolbar.tag');
require('./nav/menu.tag');
require('./scene/scene.tag');
require('./misc/contextMenus.tag');
require('./misc/wfooter.tag');

//Windows are a map of windows composing the app
var windows = new Map();
var currentWindow;

class Renderer {

    static hideAll(){
        for(let window of windows.values()){
            window.style.display = 'none';
        }
    }

    static addWindow(windowName, element){
        windows.set(windowName, document.getElementsByTagName(windowName || element)[0]);
    }

    static currentWindow(){
        return currentWindow;
    }
    
    static showWindow(windowName){
        //Hides every window

        if(currentWindow)
            windows.get(currentWindow).style.display = 'none';

        //shows only the concerned
        windows.get(windowName).style.display = '';
        currentWindow = windowName;
        document.dispatchEvent(new Event("windowChanged"));
    }
}
module.exports = Renderer;