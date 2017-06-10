/**
 * Created by dannyyassine on 2017-06-10.
 */

var gulp            = require('gulp');
var babel           = require('gulp-babel');
var shell           = require('gulp-shell');
var sourcemaps      = require('gulp-sourcemaps');
var path            = require('path');
var nodemon         = require('gulp-nodemon');

gulp.task('moveFiles', function () {
    return gulp.src('src/**/*.*')
        .pipe(gulp.dest('dist'));
});

gulp.task('compile', ['moveFiles'], function () {
    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ["react", "es2015", "stage-0"]
        }))
        .pipe(sourcemaps.write('.', { sourceRoot: path.join(__dirname, 'src') }))
        .pipe(gulp.dest('dist'));
});

gulp.task('nodemon', ['compile'], function (cb) {
    var started = false;

    return nodemon({
        script: 'dist/server.js'
    })
        .on('start', function () {
            if (!started) {
                started = true;
                return cb();
            }
        })
        .on('restart', function () {

        });
});