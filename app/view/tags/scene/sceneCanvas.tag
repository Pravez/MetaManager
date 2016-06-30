<sceneCanvas>
    <h2>Here is INSIDE the scene</h2>
    <p>First arg : { opts.one_arg }</p>
    <p>Second : { opts.sec } </p>

    <canvas id="drawScene" width="1000" height="680"></canvas>
    <button class="btn btn-default" onclick={ startScene }>Start</button>

    <script>
    "use strict";
    var Controller = require('../../../controller/Controller');
    var Scene = require('../../../model/scene/Scene');

    var metaScene;

    this.startScene = function(e){
        metaScene = new Scene(document.getElementById('drawScene'));
        metaScene.addElement({
            body:{
                mass:0,
                type:"plane",
                values:{
                    width:100,
                    height:100
                }
            },
            mesh:{
                color: 0x777777,
                materialType: "lambert",
                type: "plane",
                widthSeg: 1,
                heightSeg: 1,
                castShadow: true,
                receiveShadow: true
            }
        });
        for(let i=0;i<20;i++)
            metaScene.addElement({
                body:{
                    mass:1,
                    type: 'box',
                    values:{
                        width:1,
                        height:1,
                        depth:1
                    },
                    position:{
                        x:1,
                        y:50+i*10,
                        z:1
                    }
                },
                mesh:{
                    color: 0x888888,
                    materialType: "phong",
                    type: "box",
                    widthSeg: 10,
                    heightSeg: 10,
                    castShadow: true,
                    receiveShadow: true
                }
            });
        animate();
    };

    function animate(){
        requestAnimationFrame(animate);
        metaScene.play();
    }
    </script>
</sceneCanvas>