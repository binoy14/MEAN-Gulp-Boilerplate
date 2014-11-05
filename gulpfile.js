'use strict';

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    BROWSER_SYNC_RELOAD_DELAY = 2000;

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

gulp.task('clean', function() {
    return gulp.src('./tmp')
        .pipe(plugins.clean({
            read: false
        }));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        proxy: 'http://localhost:3000',
        port: 4000
    });
});

gulp.task('nodemon', ['browser-sync'],function(cb) {
	var called = false;
    plugins.nodemon({
        script: 'server.js',
        ext: 'html js',
    })
        .on('start', function() {
            if(!called) {cb();}
            called = true;
        })
        .on('restart', function() {
            setTimeout(function() {
                browserSync.reload();
            }, BROWSER_SYNC_RELOAD_DELAY);
        });
});

gulp.task('serve',['nodemon'],function() {
    return gulp.watch([
        'app/styles/*.scss',
        'app/**/*.js',
        'public/js/*.js',
        'public/styles/*.css',
        'public/styles/**/*.scss',
        'public/views/*.html'
    ]);
});

gulp.task('default', ['styles', 'clean']);