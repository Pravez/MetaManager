<creation>
    <div class="pane-group">
        <div id="robots-list" class="pane pane-sm sidebar">
            <ul class="list-group">
                <li class="list-group-header">
                    <input name="search" class="form-control" type="search" placeholder="Search for a robot" oninput={ searchBot }>
                </li>
                <li class="list-group-item entities-list" each={ entities } onclick={ selectItem }>
                    <div class="media-body">
                        <strong>{ robot._name }</strong>
                        <p>{ device.bluetoothDevice.name }</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="pane padded-less">
            <div id="nothing">
                <div style="margin:0 auto;">
                    <p>Nothing there !</p>
                    <button class="btn btn-large btn-default" onclick="Creation.changePane('addBot');" >Add an Entity</button>
                </div>
            </div>
            <div id="controlBot">
                <control name="controlTag" class="creation-tags"></control>
            </div>
            <div id="addBot">
                <add name="addTag" class="creation-tags"></add>
            </div>
            <div id="editBot">
                <edit name="editTag" class="creation-tags"></edit>
            </div>
        </div>
    </div>

    <!--suppress ThisExpressionReferencesGlobalObjectJS -->
    <script>
        'use strict';

        var Controller = require('../../../controller/Controller');
        var Bot = require('../../../model/Entity');
        var Creation = require('../../js/Creation');
        var riot = require('riot');

        var self = this;
        this.entities = opts.entities;

        this.searchBot = function (e){
            self.update({entities: Creation.searchByNameOrAddress(self.search.value)});
        };

        this.selectItem = function(e){
            //Removing active class
            Creation.setActive(e.currentTarget);
            //Setting the selected entity as mixin
            riot.mixin('entity', this._item);
            //And update concerned tags
            self.controlTag._tag.update();
            self.editTag._tag.update();
            Creation.changePane("controlBot");
        };

        document.addEventListener("addedEntity", function(e){
            self.update({entities: Controller.getEntities()});
            self.controlTag._tag.update();
            self.editTag._tag.update();
        });

        document.addEventListener("devicesUpdate", function(e){
            self.editTag._tag.update();
            self.addTag._tag.update();
            self.controlTag._tag.update();
        })
    </script>

    <style>
        input:hover, textarea:hover{
            cursor: text;
        }

        input[type=radio]:hover, input[type=checkbox]:hover, select:hover, button:hover{
            cursor:pointer;
        }
    </style>

</creation>