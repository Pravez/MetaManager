"use strict";

var Controller = require('../../controller/Controller');

var panes = new Map();
var currentPane;

function addClassAndRemoveAnother(elementName, added, removed){
    var pane = panes.get(elementName);
    pane.classList.remove(removed);
    pane.classList.add(added);
}

class Creation{
    static addPane(pane, paneName){
        panes.set(paneName, pane);
    }

    static getCurrentPane(){
        return currentPane;
    }

    static setCurrentPane(paneName){
        currentPane = paneName;
        Creation.changePane(paneName);
    }

    static changePane(paneName){
        addClassAndRemoveAnother(currentPane, 'before-shade');

        for(var key of panes.keys()){
            panes.get(key).style.display = 'none';
        }

        //shows only the concerned
        panes.get(paneName).style.display = '';
        addClassAndRemoveAnother(paneName, 'shade-in-right', 'before-shade');
        currentPane = paneName;
    }

    static searchByNameOrAddress(value){
        var devices = Controller.getBots();
        var found = [];
        var re = new RegExp(value, "i");
        for(let device of devices){
            //TODO end this with mac address
            if(device.bot.name.match(re))
                found.push(device);
        }

        return found.sort();
    }

}
module.exports = Creation;