'use strict';
let gulp = require('gulp');
let gutil = require('gulp-util');
let webpack = require('webpack');
let webpackConfig = require('./webpack.config.js');
let webserver = require('gulp-webserver');

gulp.task('webserver', function() {
	gulp.src('./')
		.pipe(webserver({
			livereload: false,
			port: 8080,
		}));
});

let myDevConfig = Object.create(webpackConfig);

// create a single instance of the compiler to allow caching
let devCompiler = webpack(myDevConfig);

gulp.task('webpack:build', function(callback) {
	// run webpack
	devCompiler.run(function(err, stats) {
		if(err) {
			throw new gutil.PluginError('webpack:build', err);
		}

		gutil.log('[webpack:build]', stats.toString({
			colors: true,
		}));
		callback();
	});
});

gulp.task('build', ['webpack:build'], function() {
	gulp.watch([
		'libs/**/*',
		'src/**/*',
	], ['webpack:build']);
});

gulp.task('default', [
	'webserver',
	'build',
]);
