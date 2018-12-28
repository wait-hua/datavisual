const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Util = require('./webpackUtil');

const SOURCE_PATH = path.join(__dirname, '../src');
const views = Util.getEntry(path.resolve(__dirname, '../src/views/**/*.html')); // view下html入口是会唯一一个

let plugins = [];
let entries = {};
// 多入口文件配置
for (var pathname in views) {
  // 配置生成的html文件，定义路径等
  let jsfile = views[pathname].split('.html')[0] + '.js'// JS文件路径
  entries[pathname] = ['babel-polyfill', jsfile];
  var conf = {
    filename: pathname + '.html',
    template: views[pathname], // 模板路径
    chunks: [pathname, 'vendors', 'manifest'], // 每个html引用的js模块
    inject: true           // js插入位置
  };
  // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
  plugins.push(new HtmlWebpackPlugin(conf));
}

module.exports = {
  entry: entries,
  optimization: {
    // https://itnext.io/react-router-and-webpack-v4-code-splitting-using-splitchunksplugin-f0a48f110312
    splitChunks: {
      minSize: 3,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: {
      name: "manifest"
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      '@': SOURCE_PATH,
      '$views': path.join(SOURCE_PATH, 'views'),
    },
  },
  plugins: plugins,
  module: {
    rules: [{
      test: /\.(jsx|js)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    }, {
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'awesome-typescript-loader',
      }
    }, {
      enforce: "pre",
      test: /\.js$/,
      loader: "source-map-loader",
      exclude: /node_modules/,
    }]
  },
};
