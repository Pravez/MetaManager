<control>

    <div class="padded-less">
        <button class="btn btn-large btn-default" onclick={ editEntity }>Edit Entity</button>
        <div class="form-group col-md-12">
            <div class="col-xs-3">
                <div class="row"><strong> Name </strong> : { entity.robot.name }</div>
                <div class="row"><strong> Firmware version </strong>: 1.1.1</div>
            </div>
        </div>
        <div class="form-group col-md-5">
            <div class="row">
                <div class="col-xs-8">
                    <label for="alt">Altitude : <strong>{ this.alt.value }</strong></label>
                    <input id="alt" name="alt" type="range" min="-200" value="0" max="150" oninput={ onRangeChange }>
                </div>
            </div>
        </div>
        <div class="form-group col-md-5 col-md-offset-1">
            <div class="row">
                <label>Send command
                    <input name="cmd" type="text" class="form-control" onblur={ sendCmd }>
                </label>
            </div>
        </div>
    </div>



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

        this.onRangeChange = function(e){
            self.entity.sendBluetoothData("h "+this.alt.value);
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