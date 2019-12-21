const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist')
};

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: PATHS.src,
  output: {
    filename: 'bundle.js',
    path: PATHS.dist
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif)$/,
        loader: "file-loader",
        options: {
          name: '[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new CopyWebpackPlugin([
      {
        from: `${PATHS.src}/images`,
        to: `${PATHS.dist}/images`,
      },
      {
        from: `${PATHS.src}/misc`,
        to: `${PATHS.dist}`,
      }
    ]),
    new MiniCSSExtractPlugin({
      filename: 'style.css'
    })
  ]
};