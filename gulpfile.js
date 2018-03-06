var gulp = require('gulp');
var autoprefix = require('gulp-autoprefixer');
var concatcss = require('gulp-concat-css');
var mincss = require('gulp-cssmin');
var useref = require('gulp-useref');
var concatjs = require('gulp-concat');
var minjs = require('gulp-uglify');
var babel = require('gulp-babel');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var minimages = require('gulp-imagemin');
var sourcemap = require('gulp-sourcemaps');
var gulpDist = require('gulp-npm-dist');

/* Make JS */
gulp.task('make-js', function() {
    return gulp.src(['components/*', 'controllers/*', 'directives/*', 'services/*', 'app-module.js'])
    // Init SourceMap creation
    .pipe(sourcemap.init())
    // Check for mistakes in code rules
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    // Support es2015 symbols ('`' especially)
    .pipe(babel({ presets: ['es2015'] }))
    // Concat all js in a single file
    .pipe(concatjs('app.js'))
    // Minify js
    .pipe(minjs())
    // On minify error
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    // Create SourceMap
    .pipe(sourcemap.write('.'))
    // Rename to app.min.js
    .pipe(rename({suffix: '.min'}))
    // Get final file
    .pipe(gulp.dest('build/js'));
});

/* Make index.html */
gulp.task('index', function() {
    return gulp.src('index.html')
    .pipe(useref({noAssets: true}))
    .pipe(gulp.dest('build'));
});

/* Put views into build */
gulp.task('views', function() {
    return gulp.src('views/*')
    .pipe(gulp.dest('build/views'));
});

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
});

/* Put libs into build */
gulp.task('libs', function() {
    return gulp.src('lib/*')
    .pipe(gulp.dest('build/lib'));
});

gulp.task('node-libs', function() {
    return gulp.src(gulpDist(), {base:'./node_modules'})
    .pipe(gulp.dest('./build/lib'));
});

/* Minify images */
gulp.task('image-min', function() {
    return gulp.src('./images/*')
    // Minify
    .pipe(minimages())
    // Get minified images
    .pipe(gulp.dest('build/images'));
});

// Check for mistakes only
gulp.task('check-err', function() {
    return gulp.src(['components/*', 'controllers/*', 'directives/*', 'services/*', 'app-module.js'])
    // Check for mistakes
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
});

/* Build production project */
gulp.task('build', ['make-js', 'compile-css', 'index', 'views', 'fonts', 'libs', 'image-min']);