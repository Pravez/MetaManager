<edit>
    <div>
        <button class="btn btn-default btn-large padded-less" onclick="Creation.changePane('controlBot');">Back to entity review</button>
    </div>
     <form id="editBot" class="padded-less" style="margin-top:50px;">
        <div class="form-group col-md-5">
            <strong>Bot characteristics</strong>
            <div class="row">
                <div class="col-xs-6">
                    <label>Name of the robot</label>
                    <input name="name" type="text" class="form-control">
                </div>
                <div class="col-xs-6">
                    <label>Size of the robot</label>
                    <input name="size" type="number" class="form-control">
                </div>
            </div>
            <div class="row">
                <div class="col-xs-6">
                    <label>Number of legs</label>
                    <input name="legs" type="number" class="form-control">
                </div>
                <div class="col-xs-6">
                    <label>Circumference</label>
                    <input name="circumference" type="number" class="form-control">
                </div>
            </div>
            <div class="row" style="margin-top:4px;">
                <label class="col-xs-12">Current position (x, y, z)</label>
                <div class="col-md-4"><input name="x" type="number" class="form-control" ></div>
                <div class="col-md-4"><input name="y" type="number" class="form-control" ></div>
                <div class="col-md-4"><input name="z" type="number" class="form-control" placeholder="[z]"></div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <label for="colorpick">Color of the scene element : </label>
                    <input type="color" id="colorpick" name="colorpick" style="width:150px;height:20px;">
                </div>
            </div>
        </div>
        <div class="form-group col-md-5 col-md-offset-1">
            <strong>OSC communication (<a onclick={ openInBrowser }>i-score</a>)</strong>
            <div class="row">
                <label class="col-xs-12">Address and Port to listen</label>
                <div class="col-xs-6"><input name="address" type="text" class="form-control"></div>
                <div class="col-xs-6"><input name="port" type="number" class="form-control"></div>
            </div>
        </div>
        <div class="form-group col-md-5 col-md-offset-1">
            <strong>Bluetooth Communication</strong>
            <div class="row">
                <label class="col-xs-12">Select a device</label>
                <div class="col-xs-12">
                    <select name="bDevice" class="form-control">
                        <option if={ entity.device.bluetoothDevice } selected>{entity.device.bluetoothDevice.name}</option>
                        <option>none</option>
                        <option each={ devices }>{ name }</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="form-actions col-md-6 col-md-offset-2" style="text-align:center;margin-top:30px;">
            <button type="submit" class="btn btn-large btn-form btn-default" onclick={ resetForm } >Cancel changes</button>
            <button type="submit" class="btn btn-large btn-form btn-primary" onclick={ verify } >Modify entity</button>
        </div>
    </form>

    <script>
        var Controller = require('../../../controller/Controller');
        var Bluetooth = require('../../../model/devices/BluetoothManager');
        var Creation = require('../../js/Creation');
        const {shell} = require('electron');
        var self = this;


        this.verify = function(e){
            //TODO something with lastValue
            /*if(self.port <= 1024 || (Controller.isPortTaken(self.port))){
             alert('Port already taken');
             }*/
            if(self.name.validity.valid){
                var options = {
                    robot:{
                        name: self.name.value,
                        size: self.size.value,
                        legs: self.legs.value,
                        circumference: self.circumference.value,
                        position:{
                            x: self.x.value,
                            y: self.y.value,
                            z: self.z.value
                        },
                        color: self.colorpick.value
                    },
                    osc:{
                        address: self.address.value,
                        port: self.port.value
                    },
                    bluetooth:{
                        none: self.bDevice.value === "none",
                        bluetoothDevice: Bluetooth.getFromNameOrAddress(self.bDevice.value)
                    }
                };
                Controller.modifyEntity(self.entity, options);
                document.dispatchEvent(new Event("addedEntity"));
                Creation.changePane('controlBot');
            }else{
                self.name.focus();
            }
        };

        this.openInBrowser = function(e) {
            shell.openExternal('http://i-score.org/');
        };

        this.resetForm = function(e){
            self.update();
        };

        this.on('update', function(e){
            try{
                var entity = Controller.getEntity(this.mixin('entity').id);
                self.entity = entity;
                updateValues(entity);
            }catch(error){
                console.log("Error: updated without mixin");
            }

            this.devices = Array.from(Bluetooth.getAvailableDevices());

        });

        function updateValues(entity){
            self.name.value = entity.robot._name || '';
            self.size.value = entity.robot._size || '';
            self.legs.value = entity.robot._legs || '';
            self.circumference.value = entity.robot._circumference || '';
            self.x.value = entity.robot._position.x || '';
            self.y.value = entity.robot._position.y || '';
            self.z.value = entity.robot._position.z || '';
            self.address.value = entity.device.oscDevice.address || '';
            self.port.value = entity.device.oscDevice.port || '';
            if (entity.device.bluetoothDevice)
                self.bluetoothDevice.value = entity.device.bluetoothDevice.name || '';
            self.colorpick.value = entity.robot._sceneElement.color || "#FFFFFF";
        }
    </script>

    <style>
        .bot-data li{
            height:30px;
            margin:0 auto;
        }

        .bot-data{
            list-style: none;
        }
    </style>
</edit>