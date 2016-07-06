<control class="control">

    <div class="col-md-12">
        <h2>Entity { entity.robot.name }</h2>
    </div>

    <div class="col-xs-12">
        <h4>Edit entity properties</h4>
    </div>
    <div class="col-xs-12 separator"></div>

    <div class="col-xs-6" style="border-right:1px solid #BFBFBF;">
        <button class="btn btn-large btn-warning" onclick={ editEntity }>Edit this entity</button>
    </div>
    <div class="col-xs-6">
        <button class="btn btn-large btn-positive" onclick={ toggleOSCListening }>Listen on OSC</button>
    </div>
    <div class="separator col-xs-12"></div>
    <hr style="width:70%;">

    <div class="col-md-12">
        <h4>Robot properties</h4>
    </div>

    <div class="col-xs-12 separator"></div>

    <div class="col-md-12 form-group">
        <div class="col-xs-6" style="border-right:1px solid #BFBFBF;">
            <div class="row" each={ this.control_datas.ranges } style="margin-bottom: 20px;">
                <label for={ name } class="input-title">{ description }</label>
                <input id={ name } name={ name } type="range" min={ min } max={ max } value={ init_value } oninput={ onInput }>
                <div class="input-values">
                    <div class="col-md-4" style="text-align: left;">{ min }</div>
                    <div class="col-md-4">{ this.entity.robot._values[name] }</div>
                    <div class="col-md-4" style="text-align: right;">{ max }</div>
                </div>
            </div>
            <div class="col-md-12" style="margin-top: 30px;">
                <button class="btn btn-default btn-large" onclick={ setDefault }>Set values as default</button>
                <button class="btn btn-warning btn-large" onclick={ restoreDefault }>Restore default values</button>
            </div>
        </div>
        <div class="col-xs-6">
            <div class="row" each={ this.control_datas.texts } style="margin-bottom: 20px">
                <label for={ name } class="input-title">{ description }</label>
                <input id={ name } name={ name } value={ init_value } type="number" oninput={ onInput }>
            </div>
            <button class="btn btn-primary btn-large" onclick={ validateSpeed }>Change speed</button>
        </div>
    </div>







    <script>
        var Controller = require('../../../controller/Controller');

        this.onInput = function(e){
            this.entity.robot._values[this.name] = this[this.name].value;
            console.log(this.entity.robot._values[this.name]);
        };

        this.validateSpeed = function(e){

        };

        this.setDefault = function(e){
            for(let i = 0;i<this.control_datas.ranges.length;i++){
                this.control_datas.ranges[i].init_value = this[this.control_datas.ranges[i].name].value;
            }
        };

        this.restoreDefault = function(e){
            for(let i = 0;i<this.control_datas.ranges.length;i++){
                this[this.control_datas.ranges[i].name].value = this.control_datas.ranges[i].init_value;
                this.entity.robot._values[this.control_datas.ranges[i].name] = this.control_datas.ranges[i].init_value;
            }
        };



        this.on('update', function(){
            if(!this.control_datas && this.entity){
                var temp_datas = Controller.packageRangeControlDatas(this.entity.id);
                this.control_datas = {ranges: [], texts: []};
                for(let val of temp_datas){
                    if(val.type === "range"){
                        this.control_datas.ranges.push(val);
                    }else if(val.type === "text"){
                        this.control_datas.texts.push(val);
                    }
                }
            }
        });


    </script>

    <style>

        .input-title{
            display:block;
        }

        .input-values{
            width:65%;
            margin:0 auto;
        }

        .row input[type=range]{
            width:60%;
        }

        .row input[type=number]{
            width:50%;
            text-align:center;
        }

        .control{
            width:100%;
            height:100%;
            text-align: center;
        }

        .separator{
            height:20px;
            width:100%;
        }

        hr{
            margin:0 auto;
            width:80%;
            border: 0;
            height: 1px;
            background-color: #bfbfbf;
        }

    </style>

</control>