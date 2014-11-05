'use strict';

var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')();

gulp.task('styles', function(){
	return gulp.src([
			'app/styles/*.scss',
			'public/styles/sass/*.scss'
		])
		.pipe(plugins.plumber())
		.pipe(plugins.rubySass({
			style : 'expanded'
		}))
		.pipe(gulp.dest('./tmp'))
		.pipe(plugins.autoprefixer({browsers : ['last 1 version']}))
		.pipe(plugins.rename({suffix : '.min'}))
		.pipe(plugins.minifyCss())
		.pipe(gulp.dest('./dist/styles/'));
});

gulp.task('clean', function(){
	return gulp.src('./tmp')
		.pipe(plugins.clean({read:false}));
});

gulp.task('default', ['styles','clean']);
