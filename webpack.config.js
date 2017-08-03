const path = require('path'),
	fsextra = require('fs-extra'),
	webpack = require('webpack'),
	ExtractTextPlugin = require("extract-text-webpack-plugin"),
	HtmlWebpackPlugin = require('html-webpack-plugin');

const copy = [
	{src: 'src/app/common/locales', dest: 'assets/locales'},
	{src: 'src/app/common/css/bootstrap.min.css', dest: 'assets/css/bootstrap.min.css'},
	{src: 'src/app/common/css/font-awesome.min.css', dest: 'assets/css/font-awesome.min.css'},
	{src: 'src/app/common/css/prettyPhoto.css', dest: 'assets/css/prettyPhoto.css'},
	{src: 'src/app/common/css/price-range.css', dest: 'assets/css/price-range.css'},
	{src: 'src/app/common/fonts', dest: 'assets/fonts'},
	{src: 'src/js', dest: 'assets/js'},
	{src: 'src/app/common/dxconfig', dest: 'assets/dxconfig'},
	{src: 'src/app/common/authoring', dest: 'assets'},
	{src: 'src/app/common/templates', dest: 'assets/templates'},
	{src: 'src/mocks', dest: 'assets/mocks'}
];

copy.forEach(item => fsextra.copy(item.src, item.dest, function (err) {
	if (err) {
		console.error(`cannot copy "${item.src}": ${err}`);
	} else {
		console.log(`successfully copied "${item.src}" to "${item.dest}"`);
	}
}));

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: {
		app: [path.resolve(__dirname, 'src/main.ts')]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {compact: false}
			},
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'awesome-typescript-loader',
						options: { configFileName: path.resolve(__dirname, 'src/tsconfig.json') }
					}, {
						loader: 'angular-router-loader'
					}, {
						loader: 'angular2-template-loader'
					}
				]
			}, {
				test: /\.s?css$/,
				use: ['to-string-loader', 'css-loader', 'sass-loader']
			// }, {
			// 	test: /\.s?css$/,
			// 	loaders: ExtractTextPlugin.extract({
			// 		fallbackLoader: "style-loader",
			// 		use: ["css-loader", "sass-loader"]
			// 	})
			}, {
				test: /\.html$/,
				loader: 'html-loader'
			}, {
				test: /\.(gif|png|jpg)$/,
				loader: 'file-loader?name=images/[name].[ext]'
			}, {
				test: /\.(eot|ttf|woff2?)$/,
				loader: 'file-loader?name=fonts/[name].[ext]'
			}, {
				test: /\.svg$/,
				include: [/node_modules/],
				loader: 'file-loader?name=fonts/[name].[ext]'
			},
		]
	},
	output: {
		path: path.resolve(__dirname,'assets'),
		filename: '[name].js',
		chunkFilename: '[id].chunk.js'
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				BROWSER: JSON.stringify(true),
				NODE_ENV: JSON.stringify("production")
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {warnings: false},
			mangle: {
				except: ['require']
			},
			sourcemap: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendors',
			minChunks: module => { return module.context && module.context.indexOf('node_modules') !== -1; }
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin("[name].css"),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html')
		})
	],
	resolve: {
		extensions: ['.js', '.ts', '.json', '.scss', '.less', '.css', '.svg'],
		modules: [
			path.join(__dirname, 'src'),
			"node_modules",
			"bower_components"
		]
	}
};
