/*eslint-disable no-var */

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

module.exports = {

  devtool: 'inline-source-map',

  entry: ['webpack-hot-middleware/client', './example/entry.js'],

  output: {
    path: path.join(__dirname, '/__build__'),
    filename: 'bundle.js',
    publicPath: '/__build__/',
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.s?css$/, loader: 'style!css!sass' },
      { test: /\.md$/, loader: "html!highlight!markdown" },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.BABEL_ENV': JSON.stringify('dev'),
    }),
  ],
};
