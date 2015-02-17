var gulp = require('gulp');

// Install npm packages
// Needs to be up here to work correctly
gulp.task('install', function() {
    gulp.src(['./package.json', './static-web/bower.json'])
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

// Clean build folder
gulp.task('clean', function() {
    del('static-web/assets/**', function(err) {
        if(err) {
            console.error('could not empty build folder. error:', err);
            return;
        }
        console.log('emptied the static-web/assets folder.');
    });
});

// Handle frontend JS build
gulp.task('script', function() {
    return gulp.src('static-web/js/*.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('static-web/assets/'));

});

// Handle CSS build
gulp.task('style', function() {
    return gulp.src('static-web/css/*.css')
        .pipe(plumber())
        .pipe(cssPrefixed({browsers: ['last 2 versions'], cascade: false}))
        .pipe(minifyCss())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('static-web/assets/'));
});

// Development server @ localhost:8000
gulp.task('server', function() {
    gulp.src('static-web')
        .pipe(server({
            livereload: false,
            open: true,
            log: 'debug'
        }));
});


// Watch for updates in files to recompile assets
gulp.task('watch', function() {
    gulp.watch('static-web/js/*.js', ['script']);
    gulp.watch('static-web/css/*.css', ['style']);
});


gulp.task('build', ['clean', 'script', 'style']);
gulp.task('serve', ['build', 'watch', 'server']);
gulp.task('default', ['build']);
