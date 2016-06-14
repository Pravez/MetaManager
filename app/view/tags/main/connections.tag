<connections>
    <h1>My Name is: {text}</h1>
    Create bot : <input type="text" name="name"> <br>
    <input type="button" onclick= { submit } value="Submit">

    <div class="pane">
        <table class="table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Listening Port</th>
                </tr>
            </thead>
            <tbody id="bots">
                <tr each={ bots }>
                    <td>{bot.name}</td>
                    <td>{oscServer.getLocalPort}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <script>
        'use strict';

        var LogicalBot = require('../../../model/LogicalBot');
        var Controller = require('../../../controller/Controller');
        var Bot = require('../../../model/Bot');

        this.text="Sandeep";
        var self = this;
        this.bots = opts.bots;

        this.submit = function(e){
            Controller.addBot(new LogicalBot(new Bot({name :this.name.value, position:{x:1, y:2}}), 'localhost', 10500).setUp());
            self.update({bots: Controller.getBots()});
        };
    </script>

</connections>