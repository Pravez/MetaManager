<menubar>
    <header class="titlebar toolbar toolbar-header">
        <div id="act-btns" style="float:left; position:absolute;left:10px;font-size:16px;">
            <a id="btn-close" onclick={ toggleAction }><span class="icon icon-record main-btn"></span></a>
            <a id="btn-reduce" onclick={ toggleAction }><span class="icon icon-record main-btn" onclick={ toggleAction }></span></a>
            <a id="btn-max" onclick={ toggleAction }><span class="icon icon-record main-btn" ></span></a>
        </div>
        <h1 class="title">MetaManager</h1>

        <!-- Actions to change windows -->
        <div class="toolbar-actions" style="margin-left:20%;">
            <div class="btn-group">
                <button id="home" class="btn btn-default active" onclick={ show }>
                    <span class="icon icon-home"></span>
                </button>
                <button id="creation" class="btn btn-default" onclick={ show } >
                    <span class="icon icon-network"></span>
                </button>
                <button id="scene" class="btn btn-default" onclick={ show }>
                    <span class="icon icon-note-beamed"></span>
                </button>
            </div>

            <!-- Bluetooth dropdown -->
            <div class="dropdown">
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
                            <td>{bName}</td>
                            <td>{bAddress}</td>
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
            </div>

            <!-- Specific buttons -->
            <div if={ Renderer.currentWindow() === "creation" } class="pull-right" style="margin-right:150px;">
                <button class="btn btn-primary bottom-right" onclick="Creation.changePane('addBot');">Add a bot</button>
            </div>

        </div>

    </header>

    <script>
        const remote = require('electron').remote;
        var Renderer = require('./../index');
        var BluetoothServer = require('../../../model/BluetoothServer');
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
        };

        this.showbt = function(e){
            self.update({devices: Array.from(BluetoothServer.getDevices())});
            document.getElementById("bt-dropdown").classList.toggle("show");
            document.getElementById("scanning").classList.toggle("show");
        };

        this.searchBT = function(e){
            BluetoothServer.startDiscovery();
        };

        document.addEventListener('devicesUpdate', function(e){
            self.update({devices: Array.from(BluetoothServer.getDevices())});
        });

        this.select = function(e){
            var address = e.currentTarget.children[1].innerHTML;
            if(BluetoothServer.getFromNameOrAddress(address).connected === false) {
                BluetoothServer.connectDevice(address);
                self.update({devices: Array.from(BluetoothServer.getDevices())});
            }
        };
    </script>

    <style>

        #btn-close span{
            color:#fc605b;
        }

        #btn-reduce span{
            color:#fdbc40;
        }

        #btn-max span{
            color:#34c84a;
        }

        #btn-close:hover span{
            color:#C15A56;
        }

        #btn-reduce:hover span{
            color:#CC8C3F;
        }

        #btn-max:hover span{
            color:#339D49;
        }

        .main-btn{
            margin-left:3px;
        }

        img{
            -webkit-user-select: none;
            pointer-events: none;
        }

        #act-btns{
            -webkit-user-select: none;
            -webkit-app-region: no-drag;
            z-index:2;
        }

        .titlebar {
            z-index:0;
            -webkit-user-select: none;
            -webkit-app-region: drag;
        }

        /* Dropdown Content (Hidden by Default) */
        .dropdown-content {
            display: none;
            position: absolute;
            background-color: #f9f9f9;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            border:1px solid black;
        }

        .dropdown {
            position: relative;
            display: inline-block;
        }

        #scanning{
            display:block;
        }

        .show {
            display:block;
            z-index:50;
        }
    </style>
</menubar>