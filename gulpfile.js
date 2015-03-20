var gulp = require('gulp');

// Now the rest of the dependencies
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var del = require('del');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var cssPrefixed = require('gulp-autoprefixer');
var server = require('gulp-server-livereload');
var wiredep = require('wiredep').stream;
var changed = require('gulp-changed');
var fs = require('fs');

// constants goes here
const WORDPRESS_THEME = 'smash-norge';

// Clean build folder
gulp.task('clean:img', function (cb) {
    del(['dist/img/content/*', 'dist/img/*'], cb);
});

gulp.task('clean:html', function (cb) {
    del(['dist/*.html'], cb);
});

gulp.task('clean:js', function (cb) {
    del(['dist/*.js'], cb);
});

gulp.task('clean:css', function (cb) {
    del(['dist/*.css'], cb);
});


// Handle frontend JS build
gulp.task('script', function () {
    return gulp.src('js/*.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('dist/assets/'));

});

// Handle CSS build
gulp.task('style', function () {
    return gulp.src('css/*.css')
        .pipe(plumber())
        .pipe(cssPrefixed({browsers: ['last 2 versions'], cascade: false}))
        .pipe(minifyCss())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('dist/assets/'));
});

// Wire in bower dependencies
gulp.task('bower:wire', function () {
    return gulp.src('*.html')
        .pipe(wiredep({
            // todo: prepend a / to path
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('bower:copy', function () {
    return gulp.src('bower_components/**')
        .pipe(changed('dist/bower_components'))
        .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('images', function () {
    return gulp.src('img/**')
        .pipe(changed('dist/img'))
        .pipe(gulp.dest('dist/img'));
});

// Development server @ localhost:8000
gulp.task('server', function () {
    return gulp.src('dist')
        .pipe(server({
            livereload: false,
            open: true,
            log: 'debug'
        }));
});

// Prompt
gulp.task('prompt', function () {
    return fs.readFile('prompt.txt', 'utf8', function (err, data) {
        if (err) {
            throw err;
        }
        console.log(data);
    });
});

// Wordpress tasks
gulp.task('wordpress:theme', ['build'], function() {
    return gulp.src('dist/assets/**')
        .pipe(gulp.dest('theme/assets'));
});

gulp.task('wordpress:install', ['dist:assets-to-theme'], function() {
    return gulp.src('theme/**')
        .pipe(gulp.dest('wordpress/wp-content/themes'))
});

// Watch for updates in files to recompile assets
gulp.task('watch', function () {
    gulp.watch('js/*.js', ['script']);
    gulp.watch('css/*.css', ['style']);
    gulp.watch('bower.json', ['bower']);
    gulp.watch('*.html', ['bower:wire']);
    gulp.watch('bower.json', ['bower:copy']);
});

gulp.task('bower', ['bower:wire', 'bower:copy']);
gulp.task('clean', ['clean:html', 'clean:js', 'clean:css']);
gulp.task('build', ['clean', 'script', 'style', 'bower', 'images']);
gulp.task('serve', ['build', 'watch', 'server']);
gulp.task('default', ['build']);

/* 5up3r s3cr37 34573r366 */

gulp.task('smash', ['prompt', 'serve']);
