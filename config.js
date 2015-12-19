module.exports = {
  sceneMap: [
    {
      key: 'chat',
      value: '聊天'
    },
    {
      key: 'poem',
      value: '诗歌'
    },
    {
      key: 'idiom',
      value: '成语'
    },
    {
      key: 'arithmetic',
      value: '算数'
    },
    {
      key: 'english',
      value: '英语'
    },
    {
      key: 'solitaire',
      value: '接龙'
    },
    {
      key: 'solitaireidiom',
      value: '成语接龙'
    },
    {
      key: 'solitaire-verse',
      value: '诗歌接龙'
    },
    {
      key: 'chat',
      value: '聊天'
    },
    {
      key: 'motion',
      value: '运动'
    },
    {
      key: 'shot-chat',
      value: '短聊天'
    },
  ],

  apiPrefix: 'http://172.16.1.83/'
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