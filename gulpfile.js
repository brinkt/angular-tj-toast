//-----------------------------------------------------------------------------
// load plugins

var gulp = require('gulp'),
    gconcat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    ngHtml2js = require('gulp-ng-html2js'),
    bs = require('browser-sync').create(),
    jshint = require('gulp-jshint'),
    gp = require('gulp-protractor'),
    karma = require('karma');

//-----------------------------------------------------------------------------
// source paths

var paths = {
  styles: ['docs/assets/*.css', 'src/*.css'],
  scripts: ['docs/*.js', 'docs/assets/*.js', 'src/*.js'],
  other: ['docs/*.html']
};

//-----------------------------------------------------------------------------
// convert angular HTML templates to javascript to assign to $templateCache

function ngTemplates(){
  gulp.src('docs/templates/*.html')
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(ngHtml2js({ moduleName: 'templates' }))
    .pipe(gconcat('templates.js'))
    .pipe(gulp.dest('docs'));
}

//-----------------------------------------------------------------------------
// build demo dependencies to deploy on a server without bower & bower_components

function demo_dependencies(){
  gulp.src([
    'bower_components/angular/angular.min.js',
    'bower_components/angular-route/angular-route.min.js',
    'bower_components/angular-animate/angular-animate.min.js'
  ])
    .pipe(gconcat('dependencies.min.js'))
    .pipe(gulp.dest('docs'));
}

//-----------------------------------------------------------------------------
// serve the app

gulp.task('serve', ['jshint'], function(){
  build_src();
  ngTemplates();
  demo_dependencies();
  
  // with browser-sync
	bs.init({
    notify: false,
    open: false,
    port: 9000,
    server: {
      baseDir: ['docs']
    }
  });
  
  // inject or reload on change
  bs.watch(paths.styles).on('change', function(t){
    bs.reload(t, {stream: true});
  });
  bs.watch('docs/templates/*.html').on('change', ngTemplates);
	bs.watch(paths.scripts).on('change', bs.reload);
	bs.watch(paths.other).on('change', bs.reload);
});

//-----------------------------------------------------------------------------
// build: minify JS and CSS source within dist directory

function build_src(){
  // javascript
  gulp.src('src/*.js')
    .pipe(gconcat('angular-tj-toast.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));

  // css
  gulp.src('src/*.css')
    .pipe(gconcat('angular-tj-toast.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist'));

  // for demo in docs/
  gulp.src('src/*.js').pipe(gulp.dest('docs'));
  gulp.src('src/*.css').pipe(gulp.dest('docs'));
}

gulp.task('build', build_src);

//-----------------------------------------------------------------------------
// jshint: check sourcecode for syntax errors

function jshint_test(){
  // include any js files in index directory
  gulp.src(paths.scripts.concat(['*.js', 'test/**/*.js', '!docs/dependencies.min.js']))
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-stylish')));
}

gulp.task('jshint', jshint_test);

//-----------------------------------------------------------------------------
// karma+jasmine: unit tests

function karma_test(cb){
  new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  },function(e){
    cb(); // run this callback once karma has completed
  }).start();
}

gulp.task('karma', karma_test);

//-----------------------------------------------------------------------------
// protractor: update selenium driver

gulp.task('webdriver_update', gp.webdriver_update);

//-----------------------------------------------------------------------------
// protractor: e2e tests

function protractor_serve(){
  bs.init({
    notify: false,
    open: false,
    port: 9001,
    server: {
      baseDir: ['docs']
    }
  });
}

//-----------------------------------------------------------------------------

function protractor_run(){
  gulp.src(['test/e2e/**/*.js'], { read:false })
    .pipe(gp.protractor({
      configFile: 'test/protractor.config.js',
      args: ['--baseUrl', 'http://localhost:9001']
    }))  
    .on('error', function(e) { throw e; })
    .on('end', function() { process.exit(); });
}
//-----------------------------------------------------------------------------

function protractor_test(){
  protractor_serve();
  setTimeout(function(){
    // allow server time to spawn
    protractor_run();
  }, 500);
}

gulp.task('protractor', protractor_test);

//-----------------------------------------------------------------------------
// run all tests semi-sequentially

gulp.task('test', ['jshint'], function(){
  // need to run protractor as a callback to karma since karma forks a process
  // otherwise: main karma thread returns immediately and breaks protractor test
  karma_test(function(){ protractor_test(); });
});

//-----------------------------------------------------------------------------
