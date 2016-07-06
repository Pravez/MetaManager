<wfooter>
    <footer class="toolbar toolbar-footer">
        <h1 class="title">{ name }</h1>
        <div class="toolbar-actions">
            <button if={ name === 'manager' } class="btn btn-primary pull-right" onclick={ addEntity }>Add an entity</button>
        </div>
    </footer>

    <script>
        var Renderer = require('./../Renderer').Renderer;
        var self = this;

        this.name = opts.name;

        this.addEntity = function(e){
            document.dispatchEvent(new Event("add_pane"));
        };

        document.addEventListener("windowChanged", function(e){
            self.update({name: Renderer.currentWindow()});
        });

    </script>

    <style>
    </style>
</wfooter>