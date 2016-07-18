<supervisor class="pane full normal-bg">

    <div class="col-md-12">
        <h2>Supervisors</h2>
    </div>

    <hr>
    <div class="col-md-12 separator"></div>

    <div class="col-md-6" style="border-left:1px solid #BFBFBF;">
        <div class="col-md-12">
            <h5>Add a supervisor</h5>
        </div>
        <div class="col-md-12 separator"></div>

        <form class="form-group col-md-12">
            <div class="row">
                <label for="name" class="input-title">Supervisor name</label>
                <input type="text" class="form-control" id="name" name="name">
            </div>
            <div class="row">
                <label for="ground" class="input-title">Ground size of the scene</label>
                <input type="text" class="form-control" id="ground" name="ground">
            </div>
            <div class="row">
                <label for="type" class="input-title">Supervisor type</label>
                <select class="form-control" id="type" name="type">
                    <option each={ this.supervisors }>{ name }</option>
                </select>
            </div>

            <div class="col-md-12">
                <h5>OSC communication (i-score)</h5>
                <div class="col-md-12 separator" style="height:40px;"></div>
                <div class="row" style="margin-top:30px;">
                    <label for="address" class="input-title">Address to listen for the OSC listener</label>
                    <input class="form-control" type="text" id="address" name="address" value="127.0.0.1">
                </div>
                <div class="row">
                    <label for="port" class="input-title">Socket to listen to</label>
                    <input class="form-control" type="text" id="port" name="port" placeholder="A random number > 1024">
                </div>
            </div>

            <div class="col-md-12">
                <button class="btn btn-large btn-primary" onclick={ add }>Add supervisor !</button>
            </div>
        </form>
    </div>

    <script>
        var Controller = require('../../../controller/Controller');

        this.add = function(e){
            let sup = Controller.addSupervisor(this.type.value, this.name.value, parseInt(this.ground.value));
            sup.setUp({address: this.address.value, port: this.port.value});
            Controller.setSupervisor(sup.name);
        };

        this.on('update', function(){
            this.supervisors = Controller.getSupervisorsTypes();
        });
    </script>
    <style>

    </style>

</supervisor>