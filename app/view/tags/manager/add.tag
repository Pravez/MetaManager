<add class="full">

    <form id="form" class="form-group padded-less">

        <div class="col-md-12">
            <h2>Add an entity</h2>
        </div>

        <div class="col-md-12 separator"></div>

        <div class="col-md-12">
            <label for="name" class="input-title">Name of the entity</label>
            <input class="form-control" style="width:25%;" type="text" id="name" name="name" placeholder="It's always hard to find a name ...">
        </div>
        <div class="col-md-12 separator"></div>

        <hr>
        <div class="col-md-12 separator"></div>


        <div class="col-md-12">
            <div class="col-md-6">
                <div class="col-md-12">
                    <h5>Information about the robot</h5>
                    <div class="col-md-12 separator"></div>
                    <div class="row" style="margin-top:30px;">
                        <label for="size" class="input-title">Size of the robot (height in cm)</label>
                        <input class="form-control" type="number" id="size" name="size" placeholder="">
                    </div>
                    <div class="row">
                        <label for="circ" class="input-title">Circumference of the robot</label>
                        <input class="form-control" type="number" id="circ" name="circumference" placeholder="">
                    </div>
                    <div class="row">
                        <label for="legs" class="input-title">Number of legs</label>
                        <input class="form-control" type="number" id="legs" name="legs" placeholder="">
                    </div>
                </div>
            </div>
            <div class="col-md-6" style="border-left:1px solid #BFBFBF;">
                <div class="col-md-12">
                    <h5>OSC communication (<a onclick={ shell.openExternal('http://i-score.org/'); }>i-score</a>)</h5>
                    <div class="col-md-12 separator"></div>
                    <div class="row" style="margin-top:30px;">
                        <label for="address" class="input-title">Address to listen for the OSC listener</label>
                        <input class="form-control" type="text" id="address" name="address" value="127.0.0.1">
                    </div>
                    <div class="row">
                        <label for="port" class="input-title">Socket to listen to</label>
                        <input class="form-control" type="text" id="port" name="address" placeholder="A random number > 1024">
                    </div>
                </div>
                <div class="col-md-12">
                    <h5>Bluetooth communication</h5>
                    <div class="col-md-12 separator"></div>
                    <div class="row" style="margin-top:30px;">
                        <label for="device_select" class="input-title">Select an available Bluetooth Device</label>
                        <select id="device_select" class="form-control">
                            <option selected> None </option>
                            <option each={ devices }>{ name }</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12 separator"></div>
        <div class="col-md-12">
            <div class="col-md-6 col-md-offset-3">
                <button type="reset" class="btn btn-form btn-default">Reset creation</button>
                <button type="submit" class="btn btn-large btn-form btn-primary" onclick={ verify } >Create entity !</button>
                <button type="submit" class="btn btn-form btn-default" onclick={ cancel }>Cancel creation</button>
            </div>
        </div>
    </form>

    <script>
        var shell = require('electron');
        var Controller = require('../../../controller/Controller');
        var BluetoothManager = require('../../../model/devices/BluetoothManager');

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
                    device: {
                        osc: {
                            address: self.address.value,
                            port: self.port.value
                        },
                        bluetooth: {
                            none: self.bDevice.value === "none",
                            bluetoothDevice: Bluetooth.getFromNameOrAddress(self.bDevice.value)
                        }
                    }
                };

                Controller.addEntity(options);
                self.form.reset();
                self.update();
                document.dispatchEvent(new Event('addedEntity'));
            }else{
                self.name.focus();
            }
        };


        this.on('update', function(e){
            this.devices = Array.from(BluetoothManager.getAvailableDevices());
        });

    </script>

    <style>

        .form-group .row{
            margin-bottom: 20px;
        }

        hr{
            margin:0 auto;
            width:80%;
            border: 0;
            height: 1px;
            background-color: #bfbfbf;
        }
    </style>
</add>