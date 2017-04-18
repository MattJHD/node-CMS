var HTMLWebpackPlugin = require('html-webpack-plugin');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');

var webpack = require('webpack');

// process.env.NODE_ENV variable globale de node
var isProduction = process.env.NODE_ENV === "production";

// les fichier vont etre lu de droite vers la gauche
var cssDev = ["style-loader", "css-loader", "sass-loader"];

var cssProd = ExtractTextPlugin.extract({
	fallback: "style-loader",
	use: [
	"css-loader","sass-loader"
	],
	publicPath:"./dist"
});

var cssConfig = (isProduction) ? cssProd : cssDev;

module.exports = {
	entry: {
		app : "./src/index.js",
	},
	target: "web",
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	resolve:{
		extensions: [".js", ".json"]
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: cssConfig
			},
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: "babel-loader"
			},
			{
				test: /\.jsx?$/,
				exclude: [/node_modules/],
				loader: ["react-hot-loader", "babel-loader"]
			},
			{
				test: /\.(jpe?g|png|gif|svg|ico)$/i,
				use: ["file-loader?name=[name].[ext]&outputPath=/assets/img/", "image-webpack-loader?bypassOnDebug"]
			},
			{
				test: /\.json$/,
				loader: "json"
			},

		]
	},
	devServer: {
		compress: true,
		contentBase: path.join(__dirname, "dist"),
		hot: true,
		open: true,
		port: 3000,
		stats: "errors-only"
	},
	plugins: [
		new ExtractTextPlugin({
			allChunks: true,
			disable: !isProduction,
			filename: "style.css"
		}),
		new HTMLWebpackPlugin({
			hash: true,
			inject: "body",
			minify: {
				collapseWhitespace: false
			},
			template: path.resolve(__dirname, "src/templates/index.ejs"),
			title: "node-kickstarter"
		}),

		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	]
};





