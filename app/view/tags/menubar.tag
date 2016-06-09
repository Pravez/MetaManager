<menubar>
    <header class="titlebar toolbar toolbar-header">
        <h1 class="title">MetaManager</h1>

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
        </div>
    </header>

    <script>
        const remote = require('electron').remote;
        var renderer = require('./index');

        this.active = opts.active;
        var self = this;

        this.show = function(e){
            document.getElementById(self.active).classList.remove("active");
            self.active = e.currentTarget.id;
            e.currentTarget.classList.add("active");
            renderer.showWindow(e.currentTarget.id);
        };

        function quit(){
            console.log("prout")
        }
    </script>

    <style>

        .titlebar {
            z-index:0;
            -webkit-user-select: none;
            -webkit-app-region: drag;
        }

        /*button .buttons {
            -webkit-app-region: no-drag;
        }

        .buttons {
            z-index:5;
            position:absolute;
            padding-left: 8px;
            padding-top: 5px;
            float: left;
            line-height: 0px;
        }

        .close {
            background: #ff5c5c;
            font-size: 9pt;
            width: 11px;
            height: 11px;
            border: 1px solid #e33e41;
            border-radius: 50%;
            display: inline-block;
        }

        .close:active {
            background: #c14645;
            border: 1px solid #b03537;
        }

        .close:active .closebutton {
            color: #4e0002;
        }

        .closebutton {
            color: #820005;
            visibility: hidden;
            cursor: default;
        }

        .minimize {
            background: #ffbd4c;
            font-size: 9pt;
            line-height: 11px;
            margin-left: 4px;
            width: 11px;
            height: 11px;
            border: 1px solid #e09e3e;
            border-radius: 50%;
            display: inline-block;
        }

        .minimize:active {
            background: #c08e38;
            border: 1px solid #af7c33;
        }

        .minimize:active .minimizebutton {
            color: #5a2607;
        }

        .minimizebutton {
            color: #9a5518;
            visibility: hidden;
            cursor: default;
        }

        .zoom {
            background: #00ca56;
            font-size: 9pt;
            line-height: 11px;
            margin-left: 6px;
            width: 11px;
            height: 11px;
            border: 1px solid #14ae46;
            border-radius: 50%;
            display: inline-block;
        }

        .zoom:active {
            background: #029740;
            border: 1px solid #128435;
        }

        .zoom:active .zoombutton {
            color: #003107;
        }

        .zoombutton {
            color: #006519;
            visibility: hidden;
            cursor: default;
        }*/
    </style>
</menubar>