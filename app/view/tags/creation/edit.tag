<edit>

    <div class="padded-less">
        <div class="col-md-6">
            <ul class="bot-data">
                <li>
                    <strong>Name</strong>:
                    <span>{bot.bot.name}</span>
                </li>
                <li>
                    <strong>Size</strong>:
                    <span>{bot.bot.size}</span>
                </li>
            </ul>

        </div>
    </div>

    <script>
        var Controller = require('../../../controller/Controller');
        var $ = require('jquery');

        var self = this;

        this.switchToInput = function (e) {
            var input = document.createElement("input");
            input.type = "text";
            input.value = e.currentTarget.innerText;
            e.currentTarget.parentNode.replaceChild(input, e.currentTarget);
            input.addEventListener("blur", self.switchToSpan);
            input.focus();
        };

        this.switchToSpan = function (e) {
            var span = document.createElement("span");
            span.innerText = e.currentTarget.value;
            e.currentTarget.parentNode.replaceChild(span, e.currentTarget);
            span.addEventListener("click", self.switchToInput);
        };
    </script>

    <style>
        .bot-data li{
            height:30px;
            margin:0 auto;
        }

        .bot-data{
            list-style: none;
        }
    </style>
</edit>