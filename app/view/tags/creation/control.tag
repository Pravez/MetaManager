<control class="pane pane-group">

    <div class="padded-less">
        <button class="btn btn-large btn-default" onclick={ editEntity }>Edit Entity</button>
        <button if={ entity.device.bluetoothDevice.connected } class="btn btn-large btn-primary" onclick={ requestInfo }>Request informations</button>
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
                    <input id="size" name="r" type="range" min="80" value="0" max="150" class="slider slider-round slider-small" oninput={ onRangeChange }>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-6">
                    <label for="freq">Frequency : <strong>{ this.freq.value }</strong></label>
                    <input id="freq" name="freq" type="range" min="0" value="2" max="4" class="slider slider-round slider-small blue" oninput={ onRangeChange }>
                </div>
                <div class="col-xs-6">
                    <label for="height">Height : <strong>{ this.height.value }</strong></label>
                    <input id="height" name="h" type="range" min="-150" value="0" max="20" class="slider slider-round slider-small" oninput={ onRangeChange }>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-6">
                    <label for="cmd">Send command</label>
                    <input id="cmd" name="cmd" type="text" class="form-control" onblur={ sendCmd }>
                </div>
            </div>
        </div>
        <div class="form-group col-md-5 col-md-offset-1">
            <pad class="creation-tags" entity={ entity }></pad>
        </div>
    </div>



    <script>
        "use strict";
        var Controller = require('../../../controller/Controller');
        var Creation = require('../../js/Creation');
        var riot = require('riot');

        var self = this;
        var entity = undefined;

        this.editEntity = function(e){
            Creation.changePane("editBot");
        };

        this.sendCmd = function(e){
            //self.entity.sendBluetoothData(this.cmd.value);
            self.entity.executeCommand({ command:this.cmd.value.split(" ")[0], value:parseInt(this.cmd.value.split(" ")[1])}, true);
        };

        this.onRangeChange = function(e){
            self.entity.executeCommand({ command:e.currentTarget.name, value:parseInt(e.currentTarget.value) }, true);
            self.entity.robot._values[e.currentTarget.name] = parseInt(e.currentTarget.value);
            console.log(e.currentTarget.name + " " + e.currentTarget.value);
        };

        this.enableOSC = function(e){
           Controller.switchEntityOSCListening(self.entity.id);
            self.update();
        };

        this.on('update', function(e){
            try{
                self.entity = entity = Controller.getEntity(this.mixin('entity').id);
            }catch(error){
                console.log("Error: updated without mixin");
            }
        });

        this.requestInfo = function(e){
            document.getElementById("loading").style.display="flex";
            Controller.requestRobotInfo(self.entity.id);

            //TODO if triggered notice it to the user
            setTimeout(function(e){
                if(self.entity.askingInformations === true){
                    document.getElementById("loading").style.display="none";
                    self.entity.robot.valuesQty = 0;
                    self.entity.robot.hasBeenUpdated();
                }
            }, 3000);
        };

        document.addEventListener("askedInfo", function(e){
            self.height.value = e.detail.h;
            self.freq.value = e.detail.freq;
            self.alt.value = e.detail.alt;
            self.size.value = e.detail.r;
            document.getElementById("loading").style.display="none";
            self.update();
        });
    </script>
    <style>

    </style>
</control>