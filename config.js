module.exports = {
  apiPrefix: 'http://172.16.1.96:8080/sixshot-train/'
  // apiPrefix: 'api/'
}

$.ajaxSetup({
　timeout: 3000,
　complete: function (xhr, status) {
    if (xhr.status == '401') {
      location.href = '/login.html';
    }
  },
});