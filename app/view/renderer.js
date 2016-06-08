// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var remote = require('electron');
var riot = require('riot');
var Controller = require('./Controller');
require('../app/view/tags');
riot.mount('first', {bots: Controller.getBots()});