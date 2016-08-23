const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const WebpackConfig = require('./webpack.config');
const compiler = webpack(WebpackConfig);

const app = express();

app.use(webpackDevMiddleware(compiler, {
	publicPath: '/__build__/',
	noInfo: true,
	stats: {
		colors: true,
	},
}));

app.use(require("webpack-hot-middleware")(compiler));

app.use(express.static(__dirname));

app.listen(3000, function() {
	console.log('Server listening on http://localhost:3000, Ctrl+C to stop');
});
