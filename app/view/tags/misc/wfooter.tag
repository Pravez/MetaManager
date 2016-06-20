<wfooter>
    <footer class="toolbar toolbar-footer">
        <div class="toolbar-actions">
            <h1 class="title">{ name }</h1>
        </div>
    </footer>

    <script>
        var Renderer = require('./../Renderer');
        var self = this;

        this.name = opts.name;

        document.addEventListener("windowChanged", function(e){
            self.update({name: Renderer.currentWindow()});
        })
    </script>

    <style>
    </style>
</wfooter>