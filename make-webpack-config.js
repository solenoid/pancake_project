var path = require('path');

module.exports = function (options) {
  return {
    resolve: {
      alias: {
        // Workaround https://github.com/Reactive-Extensions/RxJS/issues/832, until it's fixed
        'rx$': 'rx/dist/rx'
      }
    },
    entry: {
      main: './src/main.jsx'
    },
    output: {
      path: './dist',
      publicPath: '/ui/jazz/',
      filename: 'resources/app.js'
    },
    module: {
      loaders: [
        {
          test: /\.(jsx)$/,
          loaders: options.hotComponents ? ['react-hot', 'babel'] : ['babel'],
          include: path.join(__dirname, 'src')
        },
        {
          test: /\.(js)$/,
          loaders: ['babel'],
          include: path.join(__dirname, 'src')
        }
      ]
    },
    devServer: {
      proxy: {
        '*': 'http://localhost:4000'
      }
    }
  };
};
