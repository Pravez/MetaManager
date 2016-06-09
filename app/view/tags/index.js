"use strict";

var riot = module.parent.require('riot');

require('./home.tag');
require('./connections.tag');
require('./menubar.tag');
require('./scene.tag');
require('./sceneCanvas.tag');

//Windows are a map of windows composing the app
var windows = new Map();

class Renderer {

    static addWindow(windowName, element){
        windows.set(windowName, document.getElementsByTagName(windowName || element)[0]);
    }

    static showWindow(windowName){
        //Hides every window
        for(var key of windows.keys()){
            windows.get(key).style.display = 'none';
        }

        //shows only the concerned
        windows.get(windowName).style.display = '';
    }
}
module.exports = Renderer;