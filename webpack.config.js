var webpack = require('webpack');
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
        // loaders: [
        //  {
        //      test: /\.css$/,
        //      loader: 'style!css'
        //  }
        // ]
    },
    devtool: 'source-map',
    resolve: { //解决方案配置
        root: [
            path.resolve('./modules/')
          ],
        alias: { //模块简称
            // extend: 'tools/extend',
            // jsonp: 'tools/jsonp',
            // datetime: 'tools/datetime',
            jquery:'jquery/dist/jquery.min'
        }
    }
    // },
    // plugins:[
    //  new webpack.ProvidePlugin({
    //      $:'jquery'
    //  }),
    //  new webpack.optimize.CommonsChunkPlugin('vendor','vender.bundler.js')
    // ]
};