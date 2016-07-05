<menu class="pane pane-sm sidebar">
    <nav class="nav-group">
    <h5 class="nav-group-title">Main menu</h5>
        <span id="scene" class="nav-group-item active" onclick={ changeWindow }>
            <span class="icon icon-note"></span>
            Scene
        </span>
        <span id="manager" class="nav-group-item" onclick={ changeWindow }>
            <span class="icon icon-network"></span>
            Entities
        </span>
        <span id="bluetooth" class="nav-group-item" onclick={ changeWindow }>
            <span class="icon icon-signal"></span>
            Bluetooth
        </span>
    </nav>



    <script>
        const remote = require('electron').remote;
        var Renderer = require('./../Renderer').Renderer;
        var Controller = require('../../../controller/Controller');
        var Creation = require('../../js/Creation');

        //options
        this.active = opts.active;
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
        this.changeWindow = function(e){
            //Changing active menu item
            toggle(this.active, "active");
            self.active = e.currentTarget;
            toggle(this.active, "active");

            //Changing window
            Renderer.showWindow(e.currentTarget.id);

            //for optimization
            if(e.currentTarget.id == "scene") Controller.unpauseWorldAndAnimations();
            else Controller.pauseWorldAndAnimations();
        };

        function toggle(element, property){
            if(element.classList.contains(property)){
                element.classList.remove(property);
            }else{
                element.classList.add(property);
            }
        }

        this.on('mount', function(){
            this.active = document.getElementById(this.active);
            this.update();
        })
    </script>

    <style>
        menu{
            padding:0;
            margin:0;
        }
    </style>
</menu>