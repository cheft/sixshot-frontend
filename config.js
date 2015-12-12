module.exports = {
  apiPrefix: 'http://172.16.1.62/'
  // apiPrefix: 'http://ear-eye.com/'
  // apiPrefix: 'api/'
  // apiPrefix: '/'
}

$.ajaxSetup({
　timeout: 3000,
　complete: function (xhr, status) {
    if (xhr.status == '401') {
      location.href = '/login.html';
    }
  },
});