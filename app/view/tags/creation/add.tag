<add>
    <form class="padded-less">
        <div class="form-group col-md-6">
            <label>Name of the bot</label>
            <input type="text" class="form-control" placeholder="Name">
            <label>Starting position (x, y, z)</label>
            <input type="number" class="form-control" placeholder="x">
            <input type="number" class="form-control" placeholder="y">
            <input type="number" class="form-control" placeholder="z">
            <label>Name of the bot</label>
            <input type="text" class="form-control" placeholder="Name">
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" placeholder="Password">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="form-control" rows="3"></textarea>
        </div>
        <select class="form-control">
            <option>Option one</option>
            <option>Option two</option>
            <option>Option three</option>
            <option>Option four</option>
            <option>Option five</option>
            <option>Option six</option>
            <option>Option seven</option>
            <option>Option eight</option>
        </select>
        <div class="checkbox">
            <label>
                <input type="checkbox"> This is a checkbox
            </label>
        </div>
        <div class="checkbox">
            <label>
                <input type="checkbox"> This is a checkbox too
            </label>
        </div>
        <div class="radio">
            <label>
                <input type="radio" name="radios" checked>
                Keep your options open
            </label>
        </div>
        <div class="radio">
            <label>
                <input type="radio" name="radios">
                Be sure to remember to check for unknown unknowns
            </label>
        </div>
        <div class="form-actions">
            <button type="submit" class="btn btn-form btn-default">Cancel</button>
            <button type="submit" class="btn btn-form btn-primary">OK</button>
        </div>
    </form>

    <script>
        var Controller = require('../../../controller/Controller');
    </script>
</add>