var gulp = require('gulp');
var autoprefix = require('gulp-autoprefixer');
var concatcss = require('gulp-concat-css');
var mincss = require('gulp-cssmin');
var concatjs = require('gulp-concat');
var minjs = require('gulp-uglify');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var minimages = require('gulp-imagemin');
var useref = require('gulp-useref');

/* Make JS */
gulp.task('make-js', function() {
    return gulp.src(['components/*', 'controllers/*', 'directives/*', 'services/*', 'app-module.js'])
    // Check for mistakes in code rules
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    // Concat all js in a single file
    .pipe(concatjs('app.js'))
    // Minify js
    .pipe(minjs())
    // On minify error
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    // Rename to app.min.js
    .pipe(rename({suffix: '.min'}))
    // Get final file
    .pipe(gulp.dest('build/js'));
})

//TEMP
gulp.task('check-err', function() {
    return gulp.src(['components/*', 'controllers/*', 'directives/*', 'services/*', 'app-module.js'])
    // Check for mistakes
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
})


/* Make index.html */
gulp.task('index', function() {
    return gulp.src('index.html')
    .pipe(useref())
    gulp.dest('build');
})

/* Put views into build */
gulp.task('views', function() {
    return gulp.src('views/*')
    .pipe(gulp.dest('build/views'));
})


/* Make CSS */
gulp.task('compile-css', function() {
    return gulp.src('./css/*.css')
    // Set vendor prefixes
    .pipe(autoprefix(['last 3 versions', 'iOS 7']))
    // Concat all css in a single file
    .pipe(concatcss('style.css'))
    // Minify css
    .pipe(mincss())
    // Rename to style.min.css
    .pipe(rename({suffix: '.min'}))
    // Get final file
    .pipe(gulp.dest('build/css'));
});

/* Put fonts into build */
gulp.task('fonts', function() {
    return gulp.src('fonts/*')
    .pipe(gulp.dest('build/fonts'));
})

/* Minify images */
gulp.task('image-min', function() {
    return gulp.src('./images/*')
    // Minify
    .pipe(minimages())
    // Get minified images
    .pipe(gulp.dest('build/images'));
})