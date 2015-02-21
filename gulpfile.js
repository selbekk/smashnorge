var gulp = require('gulp');

// Install npm packages
// Needs to be up here to work correctly
gulp.task('install', function() {
    gulp.src(['./package.json', './bower.json'])
        .pipe(install());
});

// Now the rest of the dependencies
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var del = require('del');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var cssPrefixed = require('gulp-autoprefixer');
var server = require('gulp-server-livereload');
var install = require('gulp-install');
var wiredep = require('wiredep').stream;
var changed = require('gulp-changed');

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
gulp.task('script', function() {
    return gulp.src('js/*.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('dist/assets/'));

});

// Handle CSS build
gulp.task('style', function() {
    return gulp.src('css/*.css')
        .pipe(plumber())
        .pipe(cssPrefixed({browsers: ['last 2 versions'], cascade: false}))
        .pipe(minifyCss())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('dist/assets/'));
});

// Wire in bower dependencies
gulp.task('bower:wire', function () {
    gulp.src('*.html')
        .pipe(wiredep({
            // todo: prepend a / to path
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('bower:copy', function () {
    gulp.src('bower_components/**')
        .pipe(changed('dist/bower_components'))
        .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('images', function() {
   gulp.src('img/**')
       .pipe(changed('dist/img'))
       .pipe(gulp.dest('dist/img'));
});

// Development server @ localhost:8000
gulp.task('server', function() {
    gulp.src('dist')
        .pipe(server({
            livereload: false,
            open: true,
            log: 'debug'
        }));
});


// Watch for updates in files to recompile assets
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['script']);
    gulp.watch('css/*.css', ['style']);
    gulp.watch('bower.json', ['bower']);
});

gulp.task('bower', ['bower:wire', 'bower:copy']);
gulp.task('clean', ['clean:html', 'clean:js', 'clean:css']);
gulp.task('build', ['clean', 'script', 'style', 'bower', 'images']);
gulp.task('serve', ['build', 'watch', 'server']);
gulp.task('default', ['build']);
