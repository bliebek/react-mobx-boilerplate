'use strict';

import gulp from 'gulp';
import util from 'gulp-util';
import sass from 'gulp-sass';
import del from 'del';
import webpack from 'webpack';
import webpackConfig from './webpack.config';

const config = {
    paths: {
        js: './src/**/*.js',
        sass: './sass/**/*.scss',
        css: './css'
    }
}

gulp.task('default', ['clean', 'sass', 'webpack']);

gulp.task('webpack', function(callback) {
    webpack(webpackConfig, function(err, stats) {
        if(err) {
            throw new util.PluginError("webpack:build", err);
        }
        util.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task('watch', ['default'], function() {
    gulp.watch(config.paths.sass, ['sass']);
    gulp.watch(config.paths.js, ['webpack']);
});

gulp.task('sass', function () {
    return gulp.src(config.paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.paths.css));
});

gulp.task('clean', function () {
    return del([webpackConfig.output.path, config.paths.css]);
});