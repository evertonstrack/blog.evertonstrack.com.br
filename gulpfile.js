const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');

const cssFiles = './assets/main.scss';

gulp.task('css', () => {
  gulp.src(cssFiles)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(concat('all.css'))
    .pipe(gulp.dest('assets'));
});


gulp.task('watch', () => {
  gulp.watch(cssFiles, ['css']);
});

gulp.task('default', ['css']);