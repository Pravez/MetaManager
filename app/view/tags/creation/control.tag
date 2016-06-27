<control>

    <div class="padded-less">
        <button class="btn btn-large btn-default" onclick={ editEntity }>Edit Entity</button>
        <button class="btn btn-large btn-warning" onclick={ requestInfo }>Request informations</button>
        <div class="form-group col-md-12">
            <div class="col-xs-3">
                <div class="row"><strong> Name </strong> : { entity.robot._name }</div>
                <div class="row"><strong> Firmware version </strong>: { entity.robot._version } </div>
            </div>
            <div class="col-xs-6">
                <div if={ !entity.device.isOSCListening() } class="row">
                    This entity is currently not listening to i-score
                    <p><button class="btn btn-positive" onclick={ enableOSC } >Enable listening</button></p>
                </div>
                <div if={ entity.device.isOSCListening() } class="row">
                    This entity is listening to i-score
                    <p><button class="btn btn-warning" onclick={ enableOSC } >Disable listening</button></p>
                </div>
            </div>
        </div>
        <div class="form-group col-md-5">
            <div class="row">
                <div class="col-xs-6">
                    <label for="alt">Altitude : <strong>{ this.alt.value }</strong></label>
                    <input id="alt" name="alt" type="range" min="-200" value="0" max="150" class="slider slider-round slider-small" oninput={ onRangeChange }>
                </div>
                <div class="col-xs-6">
                    <label for="size">Size : <strong>{ this.size.value }</strong></label>
                    <input id="size" name="r" type="range" min="-200" value="0" max="150" class="slider slider-round slider-small" oninput={ onRangeChange }>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-6">
                    <label for="freq">Frequency : <strong>{ this.freq.value }</strong></label>
                    <input id="freq" name="freq" type="range" min="0" value="2" max="4" class="slider slider-round slider-small blue" oninput={ onRangeChange }>
                </div>
                <div class="col-xs-6">
                    <label for="height">Height : <strong>{ this.height.value }</strong></label>
                    <input id="height" name="h" type="range" min="-100" value="0" max="100" class="slider slider-round slider-small" oninput={ onRangeChange }>
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
            self.entity.sendBluetoothData(e.currentTarget.name + " " + e.currentTarget.value);
            console.log(e.currentTarget.name + " " + e.currentTarget.value);
        };

        this.enableOSC = function(e){
           Controller.switchEntityOSCListening(self.entity.id);
            self.update();
        };

        this.on('update', function(e){
            try{
                self.entity = Controller.getEntity(this.mixin('entity').id);

            }catch(error){
                console.log("Error: updated without mixin");
            }
        });

        this.requestInfo = function(e){
            Controller.requestRobotInfo(self.entity.id);
        };

        document.addEventListener("askedInfo", function(e){
            self.height.value = self.entity.robot._values['h'];
            self.freq.value = self.entity.robot._values['freq'];
            self.alt.value = self.entity.robot._values['alt'];
            self.size.value = self.entity.robot._values['r'];
        });

    </script>
    <style>

    </style>
</control>