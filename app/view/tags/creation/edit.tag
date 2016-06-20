<edit>
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
                <label class="col-xs-12">Starting position (x, y, z)</label>
                <div class="col-md-4"><input name="x" type="number" class="form-control" ></div>
                <div class="col-md-4"><input name="y" type="number" class="form-control" ></div>
                <div class="col-md-4"><input name="z" type="number" class="form-control" placeholder="[z]"></div>
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
                <label class="col-xs-12"> Available devices</label>
                <div class="col-xs-12">
                    <select name="bDevice" class="form-control">
                        <option selected>none</option>
                        <option each={ devices }>{ bName } - {bAddress}</option>
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
        var Bluetooth = require('../../../model/BluetoothManager');
        var Creation = require('../../js/Creation');
        const {shell} = require('electron');
        var self = this;

        this.devices = Array.from(Bluetooth.getDevices());


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
                        }
                    },
                    osc:{
                        address: self.address.value,
                        port: self.port.value
                    },
                    bluetooth:{
                        bluetoothDevice: Bluetooth.getFromNameOrAddress(self.bDevice.value)
                    }
                };

                Controller.modifyEntity(this.entity, options);
                self.update();
                document.dispatchEvent(new Event("addedEntity"));
            }else{
                self.name.focus();
            }
        };

        this.openInBrowser = function(e) {
            shell.openExternal('http://i-score.org/');
        };

        this.resetForm = function(e){
            self.update({entity: this.entity});
        };

        this.on('update', function(e){
            if(e){
                self.name.value = e.entity.robot.name || '';
                self.size.value = e.entity.robot.size || '';
                self.legs.value = e.entity.robot.legs || '';
                self.circumference.value = e.entity.robot.circumference || '';
                self.x.value = e.entity.robot.x || '';
                self.y.value = e.entity.robot.y || '';
                self.z.value = e.entity.robot.z || '';
                self.address.value = e.entity.device.oscDevice.address || '';
                self.port.value = e.entity.device.oscDevice.port || '';
                if(e.entity.device.bluetoothDevice)
                    self.bluetoothDevice.value = e.entity.device.bluetoothDevice.address || '';

            }
        });
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