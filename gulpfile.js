const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

const sass = require('gulp-sass');

gulp.task('default', () => {
  gulp.src('client-src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['env'],
    }))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/assets/js'));
});


gulp.task('sass', () => {
  gulp.src('client-src/sass/main.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('public/assets/css'));
});


gulp.start('default');
gulp.start('sass');
