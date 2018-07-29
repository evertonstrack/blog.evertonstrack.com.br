const gulp = require('gulp');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const prefix = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const exec = require('child_process').exec ;
const sass = require('gulp-sass');

const messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

const prefixerOptions = {
  browsers: ['last 2 versions']
};

const sassOptions = {
  // outputStyle: 'expanded'
  outputStyle: 'compressed'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);
  return exec('jekyll build', function (err, stdout, stderr) {
    console.log(stdout);
  })
    .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build'], function () {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});


/**
 * Styles Task
 */
gulp.task('styles', function () {
  gulp.src(['./assets/main.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(prefix(prefixerOptions))
    .pipe(concat('all.css'))
    .pipe(gulp.dest('assets'))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest('assets'));
});


/**
 * Javascript Task
 */
gulp.task('js', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(plumber())
    .pipe(concat('blog.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/'));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch('assets/styles/**/*.scss', ['styles', 'jekyll-rebuild']);
  gulp.watch('src/js/**/*.js', ['js', 'styles']);
  gulp.watch(['**/*.html', 'index.html', '_includes/*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the stylus,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['js', 'styles', 'browser-sync', 'watch']);

// build to deploy
gulp.task('build', ['js', 'styles', 'jekyll-build']);