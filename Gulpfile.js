// Load plugins
var gulp = require('gulp'),
minifycss = require('gulp-minify-css'),
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
rename = require('gulp-rename'),
clean = require('gulp-clean'),
concat = require('gulp-concat'),
notify = require('gulp-notify'),
less   = require('gulp-less'),
cache = require('gulp-cache'),
connect = require('gulp-connect'),
opn       = require('opn'),
livereload = require('gulp-livereload'),
lr = require('tiny-lr'),
server =  {
  host: 'localhost',
  port: '4000'
}

//server
gulp.task('serve', ['openbrowser'], function() {
  connect.server({
    port: 4000,
    host: 'localhost',
    livereload: true
  });
});

// Styles
gulp.task('styles', function() {
  return gulp.src('app/styles/app.less')
  .pipe(less())
  .pipe(gulp.dest('dist/styles'))
  .pipe(rename({ suffix: '.min' }))
  .pipe(minifycss())
  .pipe(connect.reload())
  .pipe(notify({ message: 'Styles mis à jour' }));
});

// assets
gulp.task('assets', function() {
  return gulp.src('app/assets/fonts')
  .pipe(gulp.dest('dist/assets/fonts'))
  .pipe(connect.reload())
  .pipe(notify({ message: 'assets mis à jour' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('app/scripts/**/*.js')
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('default'))
  .pipe(concat('app.js'))
  .pipe(gulp.dest('dist/scripts'))
  .pipe(rename({ suffix: '.min' }))
  //.pipe(uglify())
  .pipe(connect.reload())
  .pipe(notify({ message: 'JS mis à jour' }));
});

// html
gulp.task('html', function() {
    gulp.src('app/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(notify({ message: 'HTML mis à jour' }));
});


// views
gulp.task('views', function() {
    gulp.src('app/views/*')
     .pipe(connect.reload())
    .pipe(gulp.dest('dist/views/'));
});

// data
gulp.task('data', function() {
    gulp.src('app/data/*')
    .pipe(connect.reload())
    .pipe(gulp.dest('dist/data/'));
});

// Images
gulp.task('images', function() {
  return gulp.src('app/assets/img/*')
  .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
  .pipe(connect.reload())
  .pipe(gulp.dest('dist/assets/img'))
  .pipe(notify({ message: 'Images mises à jour' }));
});

// Clean
gulp.task('clean', function() {
  return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false})
  .pipe(clean());
});

//open browser
gulp.task('openbrowser', function() {
  opn( 'http://' + server.host + ':' + server.port );
});


// Default task
gulp.task('default', ['clean', 'scripts', 'images', 'styles', 'html', 'views'], function() {
  gulp.watch('styles', 'scripts', 'images');
});

// Watch
gulp.task('watch',['serve', 'scripts', 'images', 'styles', 'html', 'views', 'assets', 'data'], function(){
    gulp.watch('app/styles/**/*.less', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/views/*', ['views']);
    gulp.watch('app/data/*', ['data']);
    gulp.watch('app/assets/fonts/*', ['assets']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('app/*.html', ['html']);
  });

