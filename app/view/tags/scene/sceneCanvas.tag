<sceneCanvas>
    <h2>Here is INSIDE the scene</h2>
    <p>First arg : { opts.one_arg }</p>
    <p>Second : { opts.sec } </p>

    <canvas id="stage"></canvas>
    <button class="btn btn-default" onclick={ switchStartStop }>start</button>

    <script>
    "use strict";
    var Controller = require('../../../controller/Controller');

    this.switchStartStop = function(e){
        Controller.getScene().draw();
    };

    this.on('mount', function(){
        Controller.getScene().loadStage("stage");

        Controller.getScene().addRobot(Controller.getEntity(0).robot);
    });
    </script>
</sceneCanvas>