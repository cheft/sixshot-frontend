var riot = window.riot = require('riot');
require('css/app.css');

window.onload = function() {
  riot.route('/', function(path) {
    riot.mount('viewport', {path: 'test2'});
  });

  riot.route('/*', function(path) {
    riot.mount('viewport', {path: path});
  });

  riot.route.base('#!')
  riot.route.start(true);
}
