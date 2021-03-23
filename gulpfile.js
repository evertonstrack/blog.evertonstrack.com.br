const gulp = require('gulp');
const browserSync = require('browser-sync');
const prefix = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const exec = require('child_process').exec;
const sass = require('gulp-sass');
const webp = require('gulp-webp');

const stylesDest = './app/components/styles';

const messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

const prefixerOptions = {
  browsers: ['last 2 versions']
};

const sassOptions = {
  outputStyle: 'compressed'
};

const pageStyles = [
  './app/assets/styles/scss/main.scss',
  './app/assets/styles/scss/pages/home.scss',
  './app/assets/styles/scss/pages/about.scss',
  './app/assets/styles/scss/pages/blog.scss',
  './app/assets/styles/scss/pages/post.scss',
  './app/assets/styles/scss/pages/projects.scss',
  './app/assets/styles/scss/pages/contact.scss'
];


/**
 * Convert Webp Images
 */
function convertWebp(done) {
  gulp.src('app/assets/images/**/*.{jpg,jpeg,png}')
  .pipe(webp({
    quality: 50
  }))
  .pipe(gulp.dest('app/assets/images/webp'));
  done();
}


/**
 * Build the Jekyll Site
 */
function jekyllBuild(done) {
  browserSync.notify(messages.jekyllBuild);
  exec('jekyll build', (err, stdout, stderr) => {
    if(err) {
      console.log('stdout', stdout);
      console.log('err', err);
      console.log('stderr', stderr);
    }
  }).on('close', done);
  done();
}

/**
 * Do page reload
 */
function reload(done) {
  browserSync.reload();
  done();
}


/**
 * Launch the Server
 */
function syncBrowser(done) {
  browserSync({
    server: {
      baseDir: './dist'
    }
  });
  done();
}

/**
 * Styles Task
 */
function styles(done) {
  gulp.src(pageStyles, { allowEmpty: true })
    // .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(prefix(prefixerOptions))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(stylesDest))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(gulp.dest(stylesDest));

  done();
}

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
function watch(done) {
  gulp.watch('./app/assets/styles/**/*.scss', gulp.series(styles, jekyllBuild, reload));
  gulp.watch(['./app/index.html', './app/**/*.{html,md,markdown}'], gulp.series(jekyllBuild, reload));
  done();
}

/**
 * Default task, running just `gulp` will compile the stylus,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
exports.images = gulp.series(convertWebp);
exports.build = gulp.series(styles, convertWebp, jekyllBuild);
exports.default = gulp.series(styles, convertWebp, jekyllBuild, syncBrowser, watch);
