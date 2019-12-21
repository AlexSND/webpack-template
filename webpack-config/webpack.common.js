const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist')
};

const PAGES_DIR = PATHS.src;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.html'));

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    app: `${PATHS.src}/js/app.js`
  },
  output: {
    filename: '[name].[hash].js',
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
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page}`
    })),
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