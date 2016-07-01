<scene>
    <h1>HERE IS THE SCENE</h1>

    <sceneCanvas one_arg="true" sec={ opts.sec }/>

    <script>
        var Bluetooth = require('../../../model/devices/BluetoothManager');

        var devices = new Map();

        var self = this;

        this.sendCmd = function(e){
            for(let d of devices.keys()){
                Bluetooth.getFromNameOrAddress(devices.get(d)).send(self.cmd.value);
            }
            return false;
        };

        toggle(e) {
            if(devices.has(e.item.address) === false){
                devices.set(e.item.address, e.item.name);
            }else{
                devices.delete(e.item.address);
            }
        }

        document.addEventListener("devicesUpdate", function(){
            self.update({device: Bluetooth.getConnectedDevices()});
        });
    </script>
</scene>