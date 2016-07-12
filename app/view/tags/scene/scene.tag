<scene class="pane pane-group">

    <selection></selection>

    <div class="pane">
        <button class="btn btn-primary btn-large" onclick={ sendcmd }>Send command</button>
    </div>
    <div class="pane">
        <canvas id="sceneCanvas" style="border:1px solid lightslategray;"></canvas>
    </div>

    <script>
        var riot = require('riot');

        this.selectedEntities = [];
        riot.mixin("selected_entities", { selected: this.selectedEntities });

        this.sendcmd = function(e){
            console.log(this.selectedEntities);
        }

    </script>

    <style>
    </style>
</scene>