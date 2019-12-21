const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin()
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [MiniCSSExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new HTMLPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new MiniCSSExtractPlugin({
      filename: 'style.css'
    })
  ]
};