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
  // outputStyle: 'expanded'
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



gulp.task('convert-webp', () =>
  gulp.src('./app/assets/images/**/*.{jpg,jpeg,png}')
  .pipe(webp({
    quality: 50
  }))
  .pipe(gulp.dest('./app/assets/images/webp'))
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
      baseDir: './dist'
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
    .pipe(gulp.dest(stylesDest))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(gulp.dest(stylesDest));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch('./app/assets/styles/**/*.scss', ['styles', 'jekyll-rebuild']);
  gulp.watch(['./app/index.html', './app/**/*.{html,md,markdown}'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the stylus,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['styles', 'convert-webp', 'browser-sync', 'watch']);

// build to deploy
gulp.task('build', ['styles', 'convert-webp', 'jekyll-build']);
