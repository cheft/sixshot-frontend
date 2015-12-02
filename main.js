var riot = window.riot = require('riot');
require('css/app.css');
riot.config = require('./config');

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
    console.log('path :' + path);
    riot.mount('navigator');
    riot.mount('container', {path: path});
    activeMenu(path);
  });

  riot.route('/dialog-form/*', function(path) {
    riot.mount('navigator');
    var tag = riot.mount('container', {path: 'dialog-form', pathId: path});
    activeMenu('dialog-form');
  });

  riot.route.base('#!')
  riot.route.start(true);
}
