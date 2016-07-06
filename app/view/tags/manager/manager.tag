<manager class="pane pane-group normal-bg">

    <search></search>

    <div class="pane padded-less pane-group">
        <home name="home" class="management"></home>
        <control name="control" class="management normal-bg"></control>
        <add name="add" class="management"></add>
        <edit name="edit" class="management"></edit>
    </div>


    <script>
        'use strict';

        var Manager = require('../Renderer').PanesManager;
        var Controller = require('../../../controller/Controller');

        var self = this;

        this.on('update', function(){
            try {
                if (this.mixin('entity_id')) {
                    this.entity = Controller.getEntity(this.mixin('entity_id').id);
                    this.control._tag.update({ entity: this.entity });
                    this.edit._tag.update({ entity: this.entity });

                    Manager.changePane("control");
                }
            } catch (error){
                console.log("Error : Unregistered mixin");
            }
        });

        document.addEventListener('entitySelected', function(){ self.update(); });
        document.addEventListener('add_pane', function(){ Manager.changePane("add"); });
    </script>
</manager>