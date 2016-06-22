const {dialog} = require('electron').remote;


class Dialog{

    static showOpenFileDialog(){

    }

    static showSaveFileDialog(){

    }

    static showErrorBox(title, content){
        dialog.showErrorBox(title, content);
    }

    static showMessageBox(options, callback){
        dialog.showMessageBox(options, callback)
    }
}
module.exports = Dialog;