var riot = window.riot = require('riot');
require('css/app.css');
riot.config = require('./config');
riot.tags = {};
riot.data = {};
var HOMEPAGE = 'dialog';

var activeMenu = function(path) {
  if(path === '/') {
    path =  HOMEPAGE;
  }

  $('.sidebar-menu li.active').removeClass('active');
  $('.sidebar-menu a[href="#' + path + '"]').parent().addClass('active');
};

var mountSome = function(opts) {
  if(!riot.tags.profile) {
    riot.tags.profile = riot.mount('profile');
  }
  if(!riot.tags.navigator) {
    riot.tags.navigator = riot.mount('navigator');
  }
  riot.tags.container = riot.mount('container', opts);
  activeMenu(opts.path);
}

$.ajax({
  url: riot.config.apiPrefix + 'system/user/getLoginedUser',
  type: 'get'
}).done(function(data) {
  riot.data.user = data;
  riot.config.panelHeight = screen.height - 240;

  riot.route('/', function(path) {
    mountSome({path: HOMEPAGE})
  });

  riot.route('/*', function(path) {
    mountSome({path: path})
  });

  riot.route('/dialog-form/*', function(path) {
    mountSome({path: 'dialog-form', pathId: path})
  });

  document.getElementById('wrapper').style.display = 'block';
  riot.route.base('#')
  riot.route.start(true);
});
