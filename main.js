var riot = window.riot = require('riot');
require('css/app.css');

var HOMEPAGE = 'dialog';

var activeMenu = function(path) {
  if(path === HOMEPAGE) {
    path = '';
  }

  $('.sidebar-menu li.active').removeClass('active');
  $('.sidebar-menu a[href="/#!' + path + '"]').parent().addClass('active');
};

window.onload = function() {
  riot.route('/', function(path) {
    riot.mount('navigator');
    riot.mount('container', {path: HOMEPAGE});
    activeMenu(HOMEPAGE);
  });

  riot.route('/*', function(path) {
    riot.mount('navigator');
    riot.mount('container', {path: path});
    activeMenu(path);
  });

  riot.route.base('#!')
  riot.route.start(true);
}
