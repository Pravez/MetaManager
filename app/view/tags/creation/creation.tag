<creation>
    <div class="pane-group">
        <div class="pane pane-sm sidebar">
            <ul class="list-group">
                <li class="list-group-header">
                    <input name="search" class="form-control" type="search" placeholder="Search for a robot" oninput={ searchBot }>
                </li>
                <li class="list-group-item" each={ entities } onclick={ selectItem }>
                    <div class="media-body">
                        <strong>{ robot.name }</strong>
                        <p>{ device.bluetoothDevice.address }</p>
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
            <div id="addBot">
                <add name="addTag" class="creation-tags"></add>
            </div>
            <div id="editBot">
                <edit name="editTag" class="creation-tags"></edit>
            </div>
        </div>
    </div>

    <script>
        'use strict';

        var Controller = require('../../../controller/Controller');
        var Bot = require('../../../model/Entity');
        var Creation = require('../../js/Creation');

        var self = this;
        this.entities = opts.entities;

        this.searchBot = function (e){
            self.update({entities: Creation.searchByNameOrAddress(self.search.value)});
        };

        this.selectItem = function(e){
            var bot = Controller.findByName(e.currentTarget.children[0].children[0].innerHTML);
            self.editTag._tag.update({bot: bot});
            Creation.changePane("editBot");
        }
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