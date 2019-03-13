const path = require('path')
const packagejson = require('./package')
const webpack = require('webpack')

//抽离自定义公共模块
module.exports = {
  entry: {
    "main1": "./src/main1.js",
    "main2": "./src/main2.js",
    "vendor": Object.keys(packagejson.dependencies)//获取依赖的第三方库
  },
  output: {
    path: path.resolve('./dist'),
    // filename: "./build.js"
    filename: "[name].js"
  },
  watch: true,//监视文件改动，自动生成build.js
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'runtime'],
      filename: '[name].js',
      minChunks: Infinity//只有当入口文件大于等于3才会生效，用来在第三方库中分离自定义的公共模块
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',//此处名字可以随便取
      filename: '[name].js',
      chunks: ['main1', 'main2']//从main1.js和main2.js中抽离自定义公共模块
    })
  ]
}
