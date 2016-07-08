<edit class="full">

    <form id="form" class="form-group padded-less">

        <div class="col-md-12">
            <h2>Edit { entity.robot.name }</h2>
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
            <div class="col-md-6" style="border-right:1px solid #BFBFBF;">
                <div class="col-md-12">
                    <h5>Information about the robot</h5>
                    <div class="col-md-12 separator"></div>
                    <div class="row" style="margin-top:30px;">
                        <label for="size" class="input-title">Size of the robot (height in cm)</label>
                        <input class="form-control" type="number" id="size" name="size">
                    </div>
                    <div class="row">
                        <label for="circ" class="input-title">Circumference of the robot</label>
                        <input class="form-control" type="number" id="circ" name="circumference">
                    </div>
                    <div class="row">
                        <label for="legs" class="input-title">Number of legs</label>
                        <input class="form-control" type="number" id="legs" name="legs">
                    </div>
                </div>
                <div class="col-md-12">
                    <h5>3D Scene reproduction</h5>
                    <div class="col-md-12 separator"></div>
                    <div class="row" style="margin-top: 30px;">
                        <label for="color" class="input-title">Color of the robot</label>
                        <input type="color" name="color" id="color" style="height:20px;">
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="col-md-12">
                    <h5>OSC communication (i-score)</h5>
                    <div class="col-md-12 separator" style="height:40px;"></div>
                    <div class="row" style="margin-top:30px;">
                        <label for="address" class="input-title">Address to listen for the OSC listener</label>
                        <input class="form-control" type="text" id="address" name="address">
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
                            <option if={ this.entity.device.bluetoothDevice } selected>{ this.entity.device.bluetoothDevice.name }</option>
                            <option> None </option>
                            <option each={ devices }>{ name }</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12 separator"></div>
        <div class="col-md-12">
            <div class="col-md-6 col-md-offset-3">
                <button type="submit" class="btn btn-form btn-default" onclick={ reset }>Reset values</button>
                <button type="submit" class="btn btn-large btn-form btn-warning" onclick={ modify } >Modify entity</button>
                <button type="submit" class="btn btn-form btn-default" onclick={ cancel }>Cancel</button>
            </div>
        </div>
    </form>

    <script>
        var Controller = require('../../../controller/Controller');
        var BluetoothManager = require('../../../model/devices/BluetoothManager');
        var self = this;

        ////////Modify, reset and cancel///////
        this.cancel = function(e){
            document.dispatchEvent(new Event('control_pane'));
        };

        this.reset = function(e){
            self.update();
        };

        this.modify = function(e){
            //TODO verify port and IP address
            if(this.name.validity.valid && this.name.value !== ""){
                var options = {};
                options.robot = {
                    name: this.name.value,
                    size: this.size.value,
                    legs: this.legs.value,
                    circumference: this.circ.value,
                    color: this.color.value
                };
                options.device = {
                    osc: {
                        address: this.address.value,
                        port: this.port.value
                    },
                    bluetooth: {
                        none: this.device_select.value === "None",
                        bluetoothDevice: BluetoothManager.getFromNameOrAddress(this.device_select.value)
                    }
                };

                Controller.modifyEntity(options, this.entity.id);
                this.update();
                document.dispatchEvent(new Event('entities_update'));
                document.dispatchEvent(new Event('control_pane'));
            }else{
                this.name.focus();
            }
        };

        this.on('update', function(){

            this.devices = Array.from(BluetoothManager.getAvailableDevices());

            if(this.entity){
                this.name.value = this.entity.robot.name;
                this.size.value = this.entity.robot.size;
                this.circ.value = this.entity.robot.circumference;
                this.color.value = this.entity.robot.sceneElement.color;
                this.address.value = this.entity.device.oscDevice.address;
                this.port.value = this.entity.device.oscDevice.port;
                this.device_select.value = this.entity.device.bluetoothDevice ? this.entity.device.bluetoothDevice.name : 'None';
            }
        });
    </script>
    <style>

    </style>
</edit>