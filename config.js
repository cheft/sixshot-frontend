module.exports = {
  apiPrefix: 'http://127.0.0.1:8080/sixshot-train/'
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