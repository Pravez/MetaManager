<control>

    <button class="btn btn-large btn-default" onclick={ editEntity }>Edit Entity</button>
    <ul>
        <li>{ entity.robot.name }</li>
    </ul>
    <input name="cmd" type="text" class="form-control" onblur={ sendCmd }>


    <script>
        "use strict";
        var Controller = require('../../../controller/Controller');
        var Creation = require('../../js/Creation');
        var riot = require('riot');

        var self = this;

        this.editEntity = function(e){
            Creation.changePane("editBot");
        };

        this.sendCmd = function(e){
            self.entity.sendBluetoothData(this.cmd.value);
        };

        this.on('update', function(e){
            try{
                self.entity = Controller.getEntity(this.mixin('entity').id);
            }catch(error){
                console.log("Error: updated without mixin");
            }

        });

    </script>
    <style>

    </style>
</control>