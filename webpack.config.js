const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const EncodingPlugin = require('webpack-encoding-plugin');
const path = require('path');

const filenameTemplate = '[name]';
module.exports = {
	entry: ['./src/cms/browser/main.js'],
	resolve: {
		extensions: ['.mjs', '.js', '.jsx', '.css'],
	},
	output: {
		path: path.resolve(__dirname, 'dist/browser'),
		filename: `${filenameTemplate}.js`,
	},
	stats: 'minimal',
	module: {
		rules: [
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: 'javascript/auto',
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `${filenameTemplate}.css`,
		}),
		new ManifestPlugin(),
		new EncodingPlugin({
			encoding: 'utf8',
		}),
	],
	devtool: 'source-map',
};

if (process.env.CIRCLECI) {
	module.exports.devtool = 'source-map';
}
