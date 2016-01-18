var path = require('path');

module.exports = {
	entry: {
		app: './src/app.js',
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: [
					path.resolve(__dirname, 'node_modules'),
				],
				query: {
					presets: [
						'es2015',
					],
				},
			}, {
				test: /\.css$/,
				loader: 'style!css',
			},{
				test: /\.scss$/,
				loader: 'style!css?sourceMap!sass?sourceMap',
			},
		],
	},
	plugins: [
	],
	devtool: 'source-map',
	externals: {
		'phaser': 'Phaser',
	},
	resolve: {
		alias: {
			'ecs-manager': 'ecs/ecs-manager',
		},
		extensions: [
			'',
			'.js',
		],
		modulesDirectories: [
			'src',
			'libs',
			'node_modules',
		],
	},
	resolveLoader: {
		root: path.join(__dirname, 'node_modules'),
	},
};
