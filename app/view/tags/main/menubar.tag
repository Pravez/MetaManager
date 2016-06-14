<menubar>
    <header class="titlebar toolbar toolbar-header">
        <h1 class="title">MetaManager</h1>

        <!-- Actions to change windows -->
        <div class="toolbar-actions">
            <div class="btn-group">
                <button id="home" class="btn btn-default" onclick={ show }>
                    <span class="icon icon-home"></span>
                </button>
                <button id="connections" class="btn btn-default" onclick={ show } >
                    <span class="icon icon-rss"></span>
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
                <table id="bt-dropdown" class="table-striped dropdown-content">
                    <tbody>
                        <tr id="scanning">
                            <td>Scanning for devices ...</td>
                            <td></td>
                            <td><img id="1" style="height:19px;width:19px;" src="view/resources/ring.gif"></td>
                        </tr>
                        <tr each={ devices } onclick={ select }>
                            <td>{bName}</td>
                            <td>{bAddress}</td>
                            <td><img style="height:19px;width:19px;" src="view/resources/spin.gif"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <button class="btn btn-default" onclick= { searchBT }>
                <span class="icon icon-home icon-text"></span>
                BT Search
            </button>
        </div>

    </header>

    <script>
        const {BrowserWindow} = require('electron').remote;
        var renderer = require('./index');
        var BluetoothServer = require('../../../model/BluetoothServer');

        //options
        this.active = opts.active;
        this.devices = opts.devices;
        var self = this;

        //Functions for buttons
        this.show = function(e){
            document.getElementById(self.active).classList.remove("active");
            self.active = e.currentTarget.id;
            e.currentTarget.classList.add("active");
            renderer.showWindow(e.currentTarget.id);
        };

        this.showbt = function(e){
            self.update({devices: Array.from(BluetoothServer.getDevices())});
            document.getElementById("bt-dropdown").classList.toggle("show");
            document.getElementById("scanning").classList.toggle("show");
        };

        this.searchBT = function(e){
            BluetoothServer.startDiscovery();
        };

        document.addEventListener('BTdevice', function(e){
            self.update({devices: Array.from(BluetoothServer.getDevices())});
        });

        this.select = function(e){
            var address = e.currentTarget.children[1].innerHTML;
            BluetoothServer.connectDevice(address);
        }
    </script>

    <style>

        img{
            -webkit-user-select: none;
            pointer-events: none;
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
            min-width: 160px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        }

        .dropdown {
            position: relative;
            display: inline-block;
        }

        #scanning{
            display:block;
        }

        .show {display:block;}
    </style>
</menubar>