var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var path = require('path');

module.exports = {
  //页面入口文件配置
  entry: {
    homepage: './dev/homepage.js', //手机分时图
  },
  output: {
    filename: './bundle/[name].js'
  },
  module: //加载器配置
  {
    loaders: [
      {
       test: /\.css$/,
       loaders:['style-loader','css-loader','postcss-loader']
      }
    ],
    postcss:[autoprefixer({browsers:['last 2 versions']})]
  },
  devtool: 'source-map',
  resolve: { //解决方案配置
    root: [
      path.resolve('./modules/')
    ],
    alias: { //模块简称
    }
  }
};
