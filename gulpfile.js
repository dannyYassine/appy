/**
 * Created by dannyyassine on 2017-06-10.
 */

var gulp            = require('gulp');
var babel           = require('gulp-babel');
var shell           = require('gulp-shell');
var sourcemaps      = require('gulp-sourcemaps');
var path            = require('path');
var nodemon         = require('gulp-nodemon');
var sass            = require('gulp-sass');

gulp.task('moveFiles', function () {
    return gulp.src('src/**/*.*')
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
   return gulp.src('./src/web/scss/**/*.scss')
       .pipe(sourcemaps.init())
       .pipe(sass().on('error', sass.logError))
       .pipe(sourcemaps.write('.', { sourceRoot: path.join(__dirname, 'public/css') }))
       .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/web/scss/**/*.scss', ['sass']);
});

gulp.task('compile', ['moveFiles'], function () {
    return gulp.src(['src/**/*.js', '!src/web/**'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(sourcemaps.write('.', { sourceRoot: path.join(__dirname, 'src') }))
        .pipe(gulp.dest('dist'));
});

gulp.task('nodemon', function (cb) {
    var started = false;

    return nodemon({
        script: 'src/server.js',
        watch: ['src/**/*.js'],
        ignore: ['src/web/**']
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

gulp.task('cluster', shell.task([
    'CLUSTER=TRUE nodemon src/server.js'
]));