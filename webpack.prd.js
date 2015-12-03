var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

var config = {
  entry: {
    app: [
      path.resolve(__dirname, 'main.js')
    ],
    login: [
      path.resolve(__dirname, 'login.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'assets/js'),
    filename: '[name].js',
    publicPath: "/assets/js/"
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      }
    })
  ],
  module: {
    preLoaders: [{
      test: /\.html$/,
      exclude: /node_modules/,
      loader: 'riotjs-loader'
    }],
    loaders: [{
      test: /\.css$/,
      loader: 'style!css'
    }]
  },
  resolve: {
    modulesDirectories: ['node_modules', 'app', 'assets']
  },
};

var recurse = function(dir, root) {
  fs.readdirSync(dir).forEach(function(file) {
    var filename = path.join(dir, file),
      ext;
    if (fs.statSync(filename).isDirectory()) {
      recurse(filename, root);
    } else {
      ext = path.extname(filename);
      if (ext === '.html') {
        filename = path.relative(root, filename)
        filename = path.join(path.dirname(filename), path.basename(filename, ext));
        var e = filename.replace(/\\/g, '/');
        config.entry.app.push(path.resolve(root, e + '.html'));
      }
    }
  })
}
recurse('./app', './');

module.exports = config;
