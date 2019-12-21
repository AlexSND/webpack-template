const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: '#@cheap-module-eval-source-map',
  devServer: {
    port: 8081,
    overlay: {
      errors: true,
      warnings: true
    },
    contentBase: common.externals.paths.dist
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    })
  ]
});