<scene>
    <h1>HERE IS THE SCENE</h1>

    <sceneCanvas one_arg="true" sec={ opts.sec }/>


    <form onsubmit={ sendCmd }>
        <div each={ device } class="checkbox">
            <label>
                <input onclick={parent.toggle} type="checkbox"> { bName }
            </label>
        </div>
        <input name="cmd" type="text" class="form-control" onblur={ sendCmd }>
    </form>

    <script>
        var Bluetooth = require('../../../model/BluetoothServer');

        var devices = new Map();

        var self = this;

        this.sendCmd = function(e){
            for(let d of devices.keys()){
                Bluetooth.getFromNameOrAddress(devices.get(d)).write(self.cmd.value);
            }
            return false;
        };

        toggle(e) {
            if(devices.has(e.item.bAddress) === false){
                devices.set(e.item.bAddress, e.item.bName);
            }else{
                devices.delete(e.item.bAddress);
            }
        }

        document.addEventListener("devicesUpdate", function(){
            self.update({device: Bluetooth.getConnectedDevices()});
        });
    </script>
</scene>