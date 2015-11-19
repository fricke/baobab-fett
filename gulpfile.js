'use strict';

//let _ = require('lodash');
let fs = require('fs');
let gulp = require('gulp');
//let gutil = require('gulp-util');
let spawn = require('child_process').spawn;
// let sourcemaps = require('gulp-sourcemaps');
// let source = require('vinyl-source-stream');
// let buffer = require('vinyl-buffer');
// let streamify = require('gulp-streamify');
// let eslint = require('eslint/lib/cli');
let browserify = require('browserify');
// let watchify = require('watchify');
// let uglify = require('gulp-uglify');

function bundle(bundler, jsName) {
    bundler.bundle()
        .pipe(fs.createWriteStream('./build/' + jsName));
}

gulp.task('copy-html', function () {
    gulp.src('*.html')
        .pipe(gulp.dest('build'));
});

gulp.task('build-background', function() {
    let jsName = 'background.js';
    let b = browserify({
        entries: [jsName],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true,
        transform: ['babelify']
    });

    bundle(b, jsName);
});

gulp.task('build-panel', function() {
    let jsName = 'panel.js';
    let b = browserify({
        entries: [jsName],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true,
        transform: ['babelify']
    });

    bundle(b, jsName);
});

gulp.task('build-devtools', function() {
    let jsName = 'devtools.js';
    let b = browserify({
        entries: [jsName],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true,
        transform: ['babelify']
    });

    bundle(b, jsName);
});


gulp.task('auto', function(){
    let process;

    function restart(){
        if(process){
            process.kill();
        }
        process = spawn('gulp', ['dev'], {stdio: 'inherit'});
    }
    gulp.watch(['gulpfile.js', 'package.json'], restart);
    restart();
});

gulp.task('copy-images', function() {
    gulp.src('./images/*.{ico,png,jpg}')
    .pipe(gulp.dest('./build/images'));
});

gulp.task('copy-manifest', function() {
    gulp.src('manifest.json')
        .pipe(gulp.dest('build'));
});

gulp.task('default', [
    'build-devtools',
    'build-panel',
    'build-background',
    'copy-html',
    'copy-images',
    'copy-manifest'
]);

// function bundleApp(watcher){
//     let updateStart = Date.now();
//     gutil.log('Bundling');
//     watcher.bundle()
//         .pipe(source('bundle.js'))
//         .pipe(buffer())
//         .pipe(sourcemaps.init({loadMaps: true}))
//         .pipe(sourcemaps.write('./'))
//         .pipe(gulp.dest('./dist/bundle.js'));
//     gutil.log('Completed after', (Date.now() - updateStart), 'ms');
// }
