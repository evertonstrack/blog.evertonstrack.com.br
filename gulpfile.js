const spawn = require('cross-spawn');
const del = require('del');
const browserSync = require('browser-sync');
const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const webp = require('gulp-webp');
const { config } = require('./build.config');

const messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

// const server = browserSync.create();

const clean = () => del(['dist/*']);

console.log(config);

function serve(done) {
  browserSync.notify(messages.jekyllBuild);
  browserSync.init(config.browserSync);
  done();
}

function reload() {
  browserSync.notify(messages.jekyllBuild);
  return browserSync.reload({stream:true})
}

/**
 * Styles Build
 */
async function styles () {
  await gulp.src(config.styles.src, {
    since: gulp.lastRun(styles)
  }).pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'compressed'
      }).on('error', error => {
        console.error(`${error.messageFormatted}`);
        this.emit('end');
      }
    )
    .pipe(
      cssnano({
        autoprefixer: {
          add: true,
          browsers: ['last 2 versions']
        }
      })
    )
    .pipe(gulp.dest(config.styles.dest))
    .pipe(browserSync.reload({stream:true}))
  );
}

/***
 * Convert Images to WebP
*/
async function images () {

  await gulp.src(config.images.src)
    .pipe(webp({
      quality: 50
    }))
    .pipe(gulp.dest(config.images.webpDest))
}

/**
 * Jekyll build
 */
function jekyll (done) {

  spawn('jekyll', [
    'build',
    '--config',
    config.jekyll.development
  ], {
    env: process.env,
    stdio: 'ignore'
  }).on('close', reload).on('exit', done)

}

function watch (done) {

  gulp.watch(config.styles.src, styles);
  gulp.watch(config.views, jekyll);
  done();
}

exports.styles = styles;
exports.build = gulp.series(clean, styles, gulp.parallel(jekyll, reload));
exports.default = gulp.series(serve, gulp.parallel(styles), watch);
