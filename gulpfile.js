var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var csso = require('gulp-csso');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var uncss = require('gulp-uncss');
var templateCache = require('gulp-angular-templatecache');

gulp.task('sass', function() {
  gulp.src('public/stylesheets/style.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(uncss({
    html: [
      'public/index.html',
      'public/views/add.html',
      'public/views/detail.html',
      'public/views/home.html',
      'public/views/login.html',
      'public/views/signup.html',
    ]
  }))
  .pipe(csso())
  .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('compress', function() {
  gulp.src([
    'public/vendor/angular.js',
    'public/vendor/*.js',
    'public/js/app.js',
    'public/services/*.js',
    'public/controllers/*.js',
    'public/filters/*.js',
    'public/directives/*.js'
  ])
  .pipe(concat('app.min.js'))
  .pipe(ngAnnotate())
  .pipe(uglify())
  .pipe(gulp.dest('public/js'));
});

gulp.task('templates', function() {
  gulp.src('public/views/**/*.html')
  .pipe(templateCache({ root: 'views', module: 'ShowTracker' }))
  .pipe(gulp.dest('public/js'));
});

gulp.task('watch', function() {
  gulp.watch('public/stylesheets/*.scss', ['sass']);
  gulp.watch('public/views/**/*.html', ['templates']);
  gulp.watch(['public/**/*.js', '!public/js/app.min.js', '!public/js/templates.js', '!public/vendor'], ['compress']);
});

gulp.task('default', ['sass', 'compress', 'templates', 'watch']);
