<toolbar>
    <header id="menu-bar" class="titlebar toolbar toolbar-header">
        <div id="act-btns" style="float:left; position:absolute;left:10px;font-size:16px;">
            <a id="btn-close" onclick={ toggleAction }><span class="icon icon-record main-btn"></span></a>
            <a id="btn-reduce" onclick={ toggleAction }><span class="icon icon-record main-btn" onclick={ toggleAction }></span></a>
            <a id="btn-max" onclick={ toggleAction }><span class="icon icon-record main-btn" ></span></a>
        </div>
        <h1 class="title">MetaManager</h1>

        <!-- Actions to change windows -->
        <div class="toolbar-actions" style="margin-left:20%;">

            <!-- Bluetooth dropdown -->
            <!--<div class="dropdown">
                <button class="btn btn-default btn-dropdown" onclick={ showbt }>
                    <span class="icon icon-megaphone"></span>
                </button>
                <div id="bt-dropdown" class="dropdown-content">
                    <table class="table-striped">
                        <tbody>
                        <tr id="scanning">
                            <td onclick={ searchBT }>Click to scan for devices ...</td>
                        </tr>
                        <tr each={ devices } onclick={ select }>
                            <td>{name}</td>
                            <td>{address}</td>
                            <td>
                                <div style="width:19px;height:15px;text-align:center;">
                                    <span if={tries > 0 && connected && !connecting} class='icon icon-check'></span>
                                    <span if={tries > 0 && !connected && !connecting} class='icon icon-cancel'></span>
                                    <img if={connecting} style='height:15px;width:19px;' src='view/resources/spin.gif'>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>-->

            <!-- Specific buttons -->
            <div if={ Renderer.currentWindow() === "creation" } class="pull-right" style="margin-right:150px;">
            <button class="btn btn-primary bottom-right" onclick="Creation.changePane('addBot');">Create an entity</button>
        </div>

        </div>

    </header>

    <script>
        const remote = require('electron').remote;
        var Renderer = require('./../Renderer').Renderer;
        var Controller = require('../../../controller/Controller');
        var BluetoothManager = require('../../../model/devices/BluetoothManager');
        var Creation = require('../../js/Creation');

        //options
        this.active = opts.active;
        this.devices = opts.devices;
        var self = this;


        this.toggleAction = function(e){
            var window = remote.getCurrentWindow();
            switch(e.currentTarget.id){
                case "btn-close":
                    window.close();
                    break;
                case "btn-reduce":
                    window.minimize();
                    break;
                case "btn-max":
                    if (!window.isMaximized()) {
                        window.maximize();
                    } else {
                        window.unmaximize();
                    }
                    break;
            }
        };

        //Functions for buttons
        this.show = function(e){
            document.getElementById(self.active).classList.remove("active");
            self.active = e.currentTarget.id;
            e.currentTarget.classList.add("active");
            Renderer.showWindow(e.currentTarget.id);
            if(e.currentTarget.id == "scene") Controller.unpauseWorldAndAnimations();
            else Controller.pauseWorldAndAnimations();
        };

        this.showbt = function(e){
            self.update({devices: Array.from(BluetoothManager.getDevices())});
            document.getElementById("bt-dropdown").classList.toggle("show");
            document.getElementById("scanning").classList.toggle("show");
        };

        this.searchBT = function(e){
            BluetoothManager.startDiscovery();
        };

        document.addEventListener('devicesUpdate', function(e){
            self.update({devices: Array.from(BluetoothManager.getDevices())});
        });

        this.select = function(e){
            var address = e.currentTarget.children[1].innerHTML;
            if(BluetoothManager.getFromNameOrAddress(address).connected === true){
                BluetoothManager.disconnectDevice(address);
            }else{
                BluetoothManager.connectDevice(address);
            }
            self.update({devices: Array.from(BluetoothManager.getDevices())});
        };
    </script>
</toolbar>