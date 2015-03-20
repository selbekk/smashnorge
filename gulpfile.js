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
var wiredep = require('wiredep');
var changed = require('gulp-changed');
var fs = require('fs');

// constants goes here
const WORDPRESS_THEME = 'smash-norge';

// Clean build folder
gulp.task('clean', function(cb) {
    del(['dist/**', '!dist/**.[png|jpg]'], cb);
});

// Handle frontend JS build
gulp.task('script', ['clean'], function () {
    return gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('dist/assets/'));

});

// Handle CSS build
gulp.task('style', ['clean'], function () {
    return gulp.src('src/css/*.css')
        .pipe(plumber())
        .pipe(cssPrefixed({browsers: ['last 2 versions'], cascade: false}))
        .pipe(minifyCss())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('dist/assets/'));
});

// Bower tasks
gulp.task('bower', ['bower:css', 'bower:js'], function() {
    console.log('bower tasks completed');
});

gulp.task('bower:js', ['clean'], function () {
    return gulp.src('bower_components/**.min.js')
        .pipe(changed('vendor.min.js'))
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('dist/assets/'));
});

gulp.task('bower:css', ['clean'], function () {
    return gulp.src('bower_components/**.min.css')
        .pipe(changed('vendor.min.css'))
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest('dist/assets/'));
});

gulp.task('images', function () {
    return gulp.src('src/img/**')
        .pipe(changed('dist/assets/img'))
        .pipe(gulp.dest('dist/assets/img'));
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

gulp.task('wordpress', ['wordpress:theme'], function () {
    return gulp.src('theme/**')
        .pipe(gulp.dest('wordpress/wp-content/themes/' + WORDPRESS_THEME));
});

// Watch for updates in files to recompile assets
gulp.task('watch', function () {
    gulp.watch('js/*.js', ['script']);
    gulp.watch('css/*.css', ['style']);
    gulp.watch('bower.json', ['bower']);
    gulp.watch('*.html', ['bower:wire']);
    gulp.watch('bower.json', ['bower:copy']);
});

gulp.task('build', ['script', 'style', 'bower', 'images']);
gulp.task('serve', ['build', 'watch', 'server']);
gulp.task('smash', ['prompt', 'serve']);
gulp.task('default', ['build']);
