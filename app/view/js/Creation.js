"use strict";

var panes = new Map();
var currentPane;

class Creation{
    static addPane(pane, paneName){
        panes.set(paneName, pane);
    }

    static getCurrentPane(){
        return currentPane;
    }

    static changePane(paneName){
        for(var key of panes.keys()){
            panes.get(key).style.display = 'none';
        }

        //shows only the concerned
        panes.get(paneName).style.display = '';
        currentPane = paneName;
    }
}
module.exports = Creation;