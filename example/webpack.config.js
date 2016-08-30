/*eslint-disable no-var */

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var VisualizerPlugin = require('webpack-visualizer-plugin');

const prod = process.env.NODE_ENV === "production";
console.log(`Compiling client code with production set to "${prod}"`);

module.exports = {

  devtool: 'inline-source-map',

  entry: !prod ? (
    ['webpack-hot-middleware/client', './example/entry.js']
  ) : (
    ['./example/entry.js']
  ),
  output: {
    path: path.join(__dirname, '../gh-pages'),
    filename: 'bundle.js',
    publicPath: !prod ? '/__build__/' : '/react-validate/gh-pages/',
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.s?css$/, loader: 'style!css!postcss!sass' },
      { test: /\.md$/, loader: "html!highlight!markdown" },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?name=[name].[ext]',
          'image?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: !prod ? ([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.BABEL_ENV': JSON.stringify('dev'),
    }),
  ]) : ([
    new VisualizerPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        BABEL_ENV: JSON.stringify('es'),
        APP_ENV: JSON.stringify('browser'),
      },
    }),
  ]),
  postcss: [autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Opera >= 12', 'Chrome >= 25', 'Firefox >= 13', 'ie >= 9'] })],
};
