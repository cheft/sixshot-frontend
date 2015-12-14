var riot = window.riot = require('riot');
require('css/app.css');
riot.config = require('./config');
riot.tags = {};
riot.data = {};
var HOMEPAGE = 'chat';

var activeMenu = function(path, pathId) {
  if(path === '/') {
    path =  HOMEPAGE;
  }

  if(path == 'poem') {
    path = 'poem/' + pathId;
  }

  var curMenu = $('.sidebar-menu a[href="#' + path + '"]');
  if(curMenu.length > 0) {
    $('.sidebar-menu li.active').removeClass('active');
    curMenu.parent().addClass('active');
  }
};

var mountSome = function(opts) {

  if(!riot.tags.profile) {
    riot.tags.profile = riot.mount('profile');
  }
  if(!riot.tags.navigator) {
    riot.tags.navigator = riot.mount('navigator');
  }
  riot.tags.container = riot.mount('container', opts);
  activeMenu(opts.path, opts.pathId);
}

var activate = function(toggleBtn) {
  //Get the screen sizes
  var screenSizes = {
    xs: 480,
    sm: 768,
    md: 992,
    lg: 1200
  };

  //Enable sidebar toggle
  $(toggleBtn).on('click', function (e) {
    e.preventDefault();

    //Enable sidebar push menu
    if ($(window).width() > (screenSizes.sm - 1)) {
      if ($("body").hasClass('sidebar-collapse')) {
        $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
      } else {
        $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
      }
    }
    //Handle sidebar push menu for small screens
    else {
      if ($("body").hasClass('sidebar-open')) {
        $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
      } else {
        $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
      }
    }
  });

  $(".content-wrapper").click(function () {
    //Enable hide menu when clicking on the content-wrapper on small screens
    if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
      $("body").removeClass('sidebar-open');
    }
  });
};

$.ajax({
  url: riot.config.apiPrefix + 'system/user/getSettings',
  type: 'get'
}).done(function(data) {
  riot.data = data;
  riot.data.dictObj = toObject(data.dictionaries);
  riot.config.panelHeight = screen.height - 240;

  riot.route('/', function(path) {
    mountSome({path: HOMEPAGE})
  });

  riot.route('/*', function(path) {
    mountSome({path: path})
  });

  riot.route('/*/*', function(path, pathId) {
    mountSome({path: path, pathId: pathId})
  });

  $('#wrapper').show();
  riot.route.base('#')
  riot.route.start(true);

  activate('.sidebar-toggle');
});

var toObject = function(array) {
  var obj = {};
  array.forEach(function(item) {
    obj[item.key] = item.value;
  });
  return obj;
}

Date.prototype.format = function(fmt) {
  if(fmt==null){
    fmt = "yyyy-MM-dd hh:mm:ss";
  }

  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
};
