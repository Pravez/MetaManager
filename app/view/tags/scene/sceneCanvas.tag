<sceneCanvas>
    <h2>Here is INSIDE the scene</h2>
    <p>First arg : { opts.one_arg }</p>
    <p>Second : { opts.sec } </p>

    <canvas id="drawScene" width="500" height="500"></canvas>
    <button class="btn btn-default" onclick={ startScene }>Start</button>

    <script>
    "use strict";
    var Controller = require('../../../controller/Controller');
    var Scene = require('../../../model/scene/Scene');

    var metaScene;

    this.startScene = function(e){
        metaScene = new Scene(document.getElementById('drawScene'));
        /*metaScene.addElement({
            body:{
                mass:1,
                type: 'box',
                values:{
                    width:1,
                    height:1,
                    depth:1
                },
                posX: 1,
                posY: 1,
                posZ: 1
            },
            mesh:{
                color: 0xff0000,
                wireframe: false,
                type: "box",
                widthSeg: 10,
                heightSeg: 2
            }
        });*/
        animate();
    };

    function animate(){
        requestAnimationFrame(animate);
        metaScene.play();
    }
    </script>
</sceneCanvas>