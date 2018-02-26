'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');

var sassFiles = ['./public/sass/*.scss', './public/sass/**/*.scss'];

gulp.task('sass', function() {
  return gulp
    .src('./public/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('default', function() {
  gulp.watch(sassFiles, ['sass']);
});
