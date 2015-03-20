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
gulp.task('clean', ['clean:html', 'clean:js', 'clean:css']);

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

// Bower tasks
gulp.task('bower', ['bower:wire', 'bower:copy']);

gulp.task('bower:wire', function () {
    wiredep({src: './*.html', dest: '/*.html'});
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

gulp.task('build', ['clean', 'script', 'style', 'bower', 'images']);
gulp.task('serve', ['build', 'watch', 'server']);
gulp.task('smash', ['prompt', 'serve']);
gulp.task('default', ['build']);
