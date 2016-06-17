<add>
    <form id="createBot" class="padded-less" style="margin-top:50px;">
        <div class="form-group col-md-5">
            <strong>Bot characteristics</strong>
            <div class="row">
                <div class="col-xs-6">
                    <label>Name of the bot</label>
                    <input name="name" type="text" class="form-control" placeholder="name" required>
                </div>
                <div class="col-xs-6">
                    <label>Size of the bot</label>
                    <input name="size" type="number" class="form-control" placeholder="53, 162, 13 ..." required>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-6">
                    <label>Number of legs</label>
                    <input name="legs" type="number" class="form-control" placeholder="2, 3, 4, 5, 42 ..." required>
                </div>
                <div class="col-xs-6">
                    <label>Circumference</label>
                    <input name="circumference" type="number" class="form-control" placeholder="100, 53, ...">
                </div>
            </div>
            <div class="row" style="margin-top:4px;">
                <label class="col-xs-12">Starting position (x, y, z)</label>
                <div class="col-md-4"><input name="x" type="number" class="form-control" placeholder="x" required></div>
                <div class="col-md-4"><input name="y" type="number" class="form-control" placeholder="y" required></div>
                <div class="col-md-4"><input name="z" type="number" class="form-control" placeholder="[z]"></div>
            </div>
        </div>
        <div class="form-group col-md-5 col-md-offset-1">
            <strong>OSC communication (<a onclick={ openInBrowser }>i-score</a>)</strong>
            <div class="row">
                <label class="col-xs-12">Address and Port to listen</label>
                <div class="col-xs-6"><input name="address" type="text" class="form-control" placeholder="127.0.0.1" required></div>
                <div class="col-xs-6"><input name="port" type="number" class="form-control" placeholder="> 1024" required></div>
            </div>
        </div>
        <div class="form-group col-md-5 col-md-offset-1">
            <strong>Bluetooth Communication</strong>
            <div class="row">
                <label class="col-xs-12"> Available devices </label>
                <div class="col-xs-12">
                    <select name="bDevice" class="form-control" required>
                        <option selected>none</option>
                        <option each={ devices }>{ bName } - {bAddress}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="form-actions col-md-6 col-md-offset-2" style="text-align:center;margin-top:30px;">
            <button type="submit" class="btn btn-large btn-form btn-default" onclick={ resetForm } >Reset</button>
            <button type="submit" class="btn btn-large btn-form btn-primary" onclick={ verify } >Create bot !</button>
        </div>

    </form>

    <script>
        var Controller = require('../../../controller/Controller');
        var Bluetooth = require('../../../model/BluetoothManager');
        var Bot = require('../../../model/Entity');
        var OSCServer = require('../../../model/OSCManager');
        const {shell} = require('electron');
        var self = this;

        this.lastValue = -1;
        this.devices = Array.from(Bluetooth.getDevices());

        this.verify = function(e){
            //TODO something with lastValue
            /*if(self.port <= 1024 || (Controller.isPortTaken(self.port))){
                alert('Port already taken');
            }*/

            var newBot = new Bot({name: this.name, size: this.size, circumference: this.circumference, legs: this.legs, position: {x: this.x, y:this.y, z: this.z}});
            /*var deviceAddress =
            Controller.addBot(new LogicalBot(newBot, this.address, this.port, this.bDevice.value.split('-')))*/
        };

        this.openInBrowser = function(e) {
            shell.openExternal('http://i-score.org/');
        };

        this.resetForm = function(e){
            self.createBot.reset();
        };

    </script>

    <style>
        .shade-in-right{
            padding-left:0;

            transition:0.5s all;
        }

        .before-shade{
            padding-left:20px;

            transition:0.5s all;
        }

        .input-md-4{
            width:32%;
        }

        .input-md-6{
            width:49%;
        }

        .form-group .row{
            margin-top:20px;
        }

        .form-group label{
            font-size:12px;
            font-weight: normal;
        }
    </style>
</add>