const gulp = require('gulp');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const prefix = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const exec = require('child_process').exec;
const sass = require('gulp-sass');
const webp = require('gulp-webp');


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

const pageStyles = [
  './assets/styles/scss/main.scss',
  './assets/styles/scss/pages/home.scss',
  './assets/styles/scss/pages/about.scss',
  './assets/styles/scss/pages/blog.scss',
  './assets/styles/scss/pages/post.scss',
  './assets/styles/scss/pages/projects.scss',
  './assets/styles/scss/pages/contact.scss'
];


gulp.task('convert-webp', () =>
  gulp.src('assets/images/**/*.{jpg,jpeg,png}')
  .pipe(webp({
    quality: 50
  }))
  .pipe(gulp.dest('assets/images/webp'))
);

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
  gulp.src(pageStyles)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(prefix(prefixerOptions))
    .pipe(gulp.dest('_includes/styles'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(gulp.dest('_includes/styles'));
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
  // gulp.watch('src/js/**/*.js', ['js', 'styles']);
  gulp.watch(['index.html', '_includes/*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the stylus,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['js', 'styles', 'convert-webp', 'browser-sync', 'watch']);

// build to deploy
gulp.task('build', ['js', 'styles', 'convert-webp', 'jekyll-build']);