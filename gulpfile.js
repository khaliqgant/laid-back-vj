var gulp = require('gulp');
var ts = require('gulp-typescript');
var clean = require('gulp-clean');
var server = require('gulp-develop-server');
var mocha = require('gulp-mocha');
var webpack = require('gulp-webpack');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');

var serverTS = ['**/*.ts', '!node_modules/**', '!bin/**'];
var pack = ['public/js/*.ts'];

gulp.task('sass', function () {
    return gulp.src('./public/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('ts', ['clean'], function () {
    return gulp
        .src(serverTS, { base: './' })
        .pipe(ts({ module: 'commonjs', noImplicitAny: true }))
        .pipe(gulp.dest('./'));
});

gulp.task('ts-pack', function () {
    return gulp
        .src(pack, { base: './' })
        .pipe(ts({ module: 'commonjs', noImplicitAny: true }))
        .pipe(gulp.dest('./'))
        .pipe(webpack({
            output: {
                filename: './public/js/app.js'
            }
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('compile', ['ts', 'ts-pack']);

gulp.task('clean', function () {
    return gulp
        .src([
            'app.js',
            '**/*.js',
            '**/*.js.map',
            '!public/js/*.js',
            '!node_modules/**',
            '!gulpfile.js',
            '!bin/**'
        ], { read: false })
        .pipe(clean());
});

gulp.task('load:fixtures', function (cb) {
    var load = require('./fixtures/load');
    return load.loadData(cb);
});

gulp.task('server:start', ['compile'], function () {
    server.listen({ path: 'bin/www' }, function (error) {
        if (error !== null) {
            console.log(error);
        }
    });
});

gulp.task('server:restart', ['compile'], function () {
    server.restart();
});

gulp.task('default', ['server:start'], function () {
    gulp.watch(serverTS,  ['server:restart']);
    gulp.watch('./public/sass/*.scss', ['sass']);
});

gulp.task('test', ['compile', 'load:fixtures'], function () {
    return gulp
        .src('test/*.js', { read: false })
        .pipe(mocha())
        .once('error', function () {
            process.exit(1);
        })
        .once('end', function () {
            process.exit();
        });
});
