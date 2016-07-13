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
                <label for="sup-name" class="input-title">Supervisor name</label>
                <input type="text" class="form-control" id="sup-name" name="name">
            </div>
            <div class="row">
                <label for="sup-type" class="input-title">Supervisor title</label>
                <select class="form-control" id="sup-type" name="type">
                    <option each={ supervisors }>{ type_name }</option>
                </select>
            </div>
        </form>
    </div>
    <div class="col-md-6">

    </div>

    <script>
        var Controller = require('../../../controller/Controller');

        this.on('update', function(){
            this.supervisors = Controller.getSupervisorsTypes();
        });
    </script>
    <style>

    </style>

</supervisor>