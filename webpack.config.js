module.exports = {
  //页面入口文件配置
  entry: './main.js',
  output: {
    path: '/',
    filename: './bundle/index.js',
    chunkFilename: '[name].[chunkhash:5].chunk.js'
  },
  devServer: {
    inline: true,
    port: 8080
  },
  module: //加载器配置
  {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'latest']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require("autoprefixer")({browserslist: ["last 2 versions"]})
            ]
          }
        }]
      }
    ]
  },
  devtool: 'source-map'
};
