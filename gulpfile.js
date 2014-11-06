'use strict';

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    BROWSER_SYNC_RELOAD_DELAY = 5000;

// Compile SASS to CSS and minify CSS
gulp.task('styles', function() {
    return gulp.src('app/styles/*.scss')
        .pipe(plugins.plumber())
        .pipe(plugins.rubySass({
            style: 'expanded'
        }))
        .pipe(gulp.dest('./tmp'))
        .pipe(plugins.autoprefixer({
            browsers: ['last 1 version']
        }))
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest('./public/styles/'));
});

// Minify JS
gulp.task('scripts', function(){
	return gulp.src('./public/js/**/*.js')
		.pipe(gulp.dest('./tmp/js'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest('./public/js/'));
});

// Browser-Sync
gulp.task('browser-sync',['nodemon'], function() {
    setTimeout(function(){
    	browserSync.init(null, {
	        proxy: 'http://localhost:3000',
	        port: 4000
	    });
    },BROWSER_SYNC_RELOAD_DELAY);
});

// Nodemon for running the app server
gulp.task('nodemon', function(cb) {
	var called = false;
    plugins.nodemon({script: 'server.js'})
        .on('start', function() {
            if(!called) {
            	cb();
            }
            called = true;
        })
        .on('restart', function() {
            setTimeout(function() {
                browserSync.reload();
            }, BROWSER_SYNC_RELOAD_DELAY);
        });
});

// Minify Images
gulp.task('images', function(){
	return gulp.src('./public/img/*')
		.pipe(gulp.dest('./tmp/img'))
		.pipe(plugins.imagemin())
		.pipe(gulp.dest('./public/img/'));
});

// Local webserver watching for changes
gulp.task('serve',['styles','browser-sync'],function() {
    return gulp.watch([
        'app/styles/*.scss',
        'app/**/*.js',
        'public/js/*.js',
        'public/styles/*.css',
        'public/views/*.html'
    ])
    .on('change',function(){
    	'styles';
    	browserSync.reload();
    });
});

// Remove Temporary folders
gulp.task('clean', function() {
    return gulp.src(['./tmp','.bower-cache','.bower-registry','.bower-tmp','.sass-cache'])
        .pipe(plugins.clean({
            read: false
        }));
});

// Build the final version
gulp.task('build', ['styles', 'scripts','images','clean']);

// Instructions
gulp.task('default',function(){
	console.log("Run `gulp serve` to run a local webserver with browser-sync");
	console.log("Run `gulp build` for a production ready code");
});
