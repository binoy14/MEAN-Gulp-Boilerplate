'use strict';

var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')();

gulp.task('sass', function(){
	return gulp.src([
			'app/styles/*.scss',
			'public/styles/sass/*.scss'
		])
		.pipe(plugins.plumber())
		.pipe(plugins.rubySass({
			style : 'expanded'
		}))
		.pipe(gulp.dest('./tmp'))
		gulp.start('styles');
});

gulp.takk('styles', function(){

});