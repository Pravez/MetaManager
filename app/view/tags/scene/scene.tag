<scene>
    <h1>HERE IS THE SCENE</h1>

    <sceneCanvas one_arg="true" sec={ opts.sec }/>


    <form onsubmit={ sendCmd }>
        <select id="dname" class="form-control">
            <option each={ device }>{ bName }</option>
        </select>
        <input name="cmd" type="text" class="form-control" onblur={ sendCmd }>
    </form>

    <script>
        var Bluetooth = require('../../../model/BluetoothServer');

        var self = this;
        this.sendCmd = function(e){
            var device = Bluetooth.getFromName(self.dname.value);
            device.write(self.cmd.value);
            return false;
        };

        document.addEventListener("devicesUpdate", function(){
            self.update({device: Bluetooth.getConnectedDevices()});
        });
    </script>
</scene>