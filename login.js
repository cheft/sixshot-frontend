var riot = window.riot = require('riot');
require('css/app.css');
require('./app/_tags/container.html');
require('./login/index.html');
require('./login/register.html');
riot.config = require('./config');

window.onload = function() {
  riot.route('/', function() {
    riot.mount('container', {path: 'login'});
  });
  
  riot.route('/register', function() {
    riot.mount('container', {path: 'register'});
  });
  
  riot.route('/*', function(path) {
    console.log(path, 404);
  });

  riot.route.base('#')
  riot.route.start(true);
}
