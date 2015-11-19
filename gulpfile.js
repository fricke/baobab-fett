'use strict';

// Dependencies
let _ = require('lodash');
let gulp = require('gulp');
let gulpif = require('gulp-if');
let rimraf = require('gulp-rimraf');
let gutil = require('gulp-util');
let spawn = require('child_process').spawn;
let sourcemaps = require('gulp-sourcemaps');
let source = require('vinyl-source-stream');
let buffer = require('vinyl-buffer');
let eslint = require('eslint/lib/cli');
let browserify = require('browserify');
let watchify = require('watchify');
let size = require('gulp-size');
let uglify = require('gulp-uglify');
let sass = require('gulp-ruby-sass');
let install = require('gulp-install');
let autoprefixer = require('gulp-autoprefixer');

const npmConfig = require('./package.json');

// Static variables
const SRC_DIR = './src/';
const BUILD_DIR = './build';

const SOURCES = {
    scripts: '/**/*.js{,x}',
    app: '/app.js',
    style: '/styles/app.scss'
};

const APPS = [
    'devtools',
    'react'
];
const TEST_DIRS = _.map(npmConfig.jest.testPathDirs, (path) => {
    return path.replace('<rootDir>', '.');
});

// Code checking tasks
gulp.task('lint', function(){
    let scriptFiles = ['gulpfile.js', './stem/client'];
    return lintFiles(scriptFiles);
});

gulp.task('test', function(){
    spawn('npm', ['test'], {stdio: 'inherit'});
});

gulp.task('browserify-devtools', function(cb){
    browserifyThoseApps({
        outfilePattern: 'devtools',
        externals: npmConfig.dependencies,
        isProd: false,
        watchFiles: true
    }, cb);
});

gulp.task('browserify-app', function(cb){
    browserifyThoseApps({
        outfilePattern: 'app',
        entry: './src/dom.js',
        externals: npmConfig.dependencies,
        isProd: false,
        watchFiles: true
    }, cb);
});

// Bundle vendor only scripts under "dependencies" in package.json
gulp.task('browserify-vendor', function(cb){
    browserifyThoseApps({
        entry: './noop.js',
        outfilePattern: 'vendor',
        dependencies: npmConfig.dependencies,
        isProd: false
    }, cb);
});

gulp.task('browserify-prod-app', function(cb){
    browserifyThoseApps({
        outfilePattern: 'bundleApp'
    }, cb);
});

gulp.task('browserify-prod-devtools', function(cb){
    browserifyThoseApps({
        outfilePattern: 'bundleDevtools'
    }, cb);
});

// Compile Sass to CSS
gulp.task('scss', function(){
    for(let i = 0; i < APPS.length; i++){
        let app = APPS[i];
        bundleSass(app);
    }
});

// Non-browserify-related watch tasks
gulp.task('watch', function(){
    for(let a = 0; a < APPS.length; a++){
        let app = APPS[a];
        gulp.watch([
            SRC_DIR + '/styles/*.scss',
            SRC_DIR + '/styles/**/*.scss'
        ], bundleSass.bind(undefined, app));
    }

    for(let t = 0; t < TEST_DIRS.length; t++){
        let testPath = TEST_DIRS[t];
        gulp.watch([
            testPath + '/*.js{,x}',
            testPath + '/__tests__/*.js{,x}'
        ], testFiles.bind(undefined, testPath));
    }
});

gulp.task('clear', function() {
    clear();
});

// Grunt automatically restarts itself
gulp.task('auto', function(){
    let process;

    function restart(){
        if(process){
            process.kill();
        }
        process = spawn('gulp', ['main'], {stdio: 'inherit'});
    }
    gulp.watch(['gulpfile.js', 'package.json'], restart);
    restart();
});

gulp.task('install', ['lint', 'test'], function() {
    gulp.src(['./package.json'])
        .pipe(install());
});

// Composite tasks
gulp.task('qa-prod', ['qa-uglify', 'scss']);
gulp.task('prod', ['browserify-prod-devtools', 'browserify-prod-react', 'scss']);
gulp.task('main', ['install', 'clear', 'lint', 'browserify-devtools', 'browserify-react', 'browserify-vendor', 'test', 'sass', 'watch']);
gulp.task('default', ['auto']);
gulp.task('dev', ['main']);
gulp.task('bb', ['browserify-app', 'browserify-devtools', 'browserify-vendor']);
gulp.task('bbprod', ['browserify-prod-app', 'browserify-prod-devtools']);

// clears previously bundled files for a build.
function clear(fileNameBase) {
    let filePattern = fileNameBase + '.*';
    let pattern = BUILD_DIR + '/' + filePattern;
    gutil.log('clearing', gutil.colors.white(pattern));
    gulp.src(pattern, { read: false })
        .pipe(rimraf({ force: true }));
}

// browserify function to rule them all
function browserifyThoseApps(options, cb) {
    let entry = options.entry;
    let outfilePattern = options.outfilePattern;
    let dependencies = options.dependencies || [];
    let externals = options.externals || [];
    let watchFiles = options.hasOwnProperty('watchFiles') ? options.watchFiles : false;
    let isProd = options.hasOwnProperty('isProd') ? options.isProd : true;

    let bundler = browserify({
        entries: [entry || SRC_DIR + SOURCES.app],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true,
        extensions: ['.js', '.jsx'],
        transform: [
            ['babelify', {
                extensions: ['.js', '.jsx']
            }]
        ]
    });
    _.each(dependencies, function(version, dependency){
        bundler.require(dependency);
    });
    _.each(externals, function(version, dependency){
        bundler.external(dependency);
    });

    if(watchFiles) {
        let watcher = watchify(bundler);
        watcher.on('update', updateApp.bind(undefined, bundler, outfilePattern, isProd, function() {}));
        bundler = watcher;
    }

    bundleApp(bundler, outfilePattern, isProd, cb);
}

// Bindable bundler functions
function bundleApp(bundler, fileNameBase, isProd, cb){
    clear(fileNameBase);
    let updateStart = Date.now();
    gutil.log('Bundling', gutil.colors.red(fileNameBase), '...');
    cb = cb || function() {};
    bundler.bundle()
        .on('error', errMessage)
        .pipe(source(fileNameBase + '.js'))
        .pipe(buffer())
        .pipe(gulpif(isProd, uglify({
            compress: {
                drop_console: true
            }
        })))
        .pipe(gulpif(!isProd, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(!isProd, sourcemaps.write('./')))
        .pipe(gulpif(isProd, size({showFiles: true})))
        .pipe(gulp.dest(BUILD_DIR))
        .on('end', function() {
            gutil.log('Completed', gutil.colors.red(fileNameBase), 'after', gutil.colors.magenta(~~(Date.now() - updateStart)/1000), 's');
            cb();
        });
}

function bundleSass(app){
    let updateStart = Date.now();
    gutil.log('Sassifying', app, '...');
    sass(SRC_DIR + SOURCES.style)
        .on('error', errMessage)
        .pipe(autoprefixer({
            browsers: ['last 1 version', '> 1%', 'ie 8', 'ie 7']
        }))
        .pipe(gulp.dest((BUILD_DIR + app + '/')));
    gutil.log('Completed', app, 'after', (Date.now() - updateStart), 'ms');
}

// Browserify watcher update handler
//bundler, app, outfilePattern, isProd
function updateApp(watcher, app, outfilePattern, isProd, changedFiles){
    if(changedFiles){
        // Only lint JavaScript, not JSON
        let filesToLint = _.filter(changedFiles, function(file){
            return file.indexOf('.json') === -1;
        });

        lintFiles(filesToLint);
    }

    bundleApp(watcher, app, outfilePattern, isProd);
}

// Code checking
function lintFiles(files){
    let cliArgs = files.join(' ') + ' --ext .js,.jsx';
    eslint.execute(cliArgs);
}

function testFiles(testPath){
    gutil.log('Testing', testPath, '...');

    lintFiles([testPath + '/__tests__']);

    spawn('npm', ['test', testPath], {stdio: 'inherit'});
}

// Error handling
function errMessage(err){
    gutil.log('___________________________________________________________');
    gutil.log(err.name, ':', err.fileName);
    gutil.log(err.message);
    gutil.log('___________________________________________________________');
    gutil.log('oooooh no.');
    gutil.beep();
}
