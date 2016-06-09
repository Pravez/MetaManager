<first>
    <h1>My Name is: {text}</h1>
    Create bot : <input type="text" name="name"> <br>
    <input type="button" onclick= { submit } value="Submit">

    <table>
        <tbody>
            <tr each={bots}>
                <td>{bot.name}</td>
            </tr>
        </tbody>
    </table>

    <script>
        'use strict';

        var LogicalBot = require('../../model/LogicalBot');
        var Controller = require('../../Controller');
        var Bot = require('../../model/Bot');


        this.text="Sandeep";
        var self = this;
        this.bots = opts.bots;

        this.submit = function(e){
            Controller.addBot(new LogicalBot(new Bot({name :this.name.value, position:{x:1, y:2}}), 'localhost', 10500).setUp());
            self.bots = Controller.getBots();
            self.update();
        };
    </script>

</first>