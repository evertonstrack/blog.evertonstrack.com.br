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
  outputStyle: 'compressed',
  allowEmpty: true
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


gulp.task('convert-webp', (done) => {
  gulp.src('app/assets/images/**/*.{jpg,jpeg,png}')
  .pipe(webp({
    quality: 50
  }))
  .pipe(gulp.dest('app/assets/images/webp'));
  done();
});

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', (done) => {
  browserSync.notify(messages.jekyllBuild);
  exec('jekyll build', (err, stdout, stderr) => {
      console.log('stdout', stdout);
      console.log('err', err);
      console.log('stderr', stderr);
    })
    .on('close', done);
    done();
});

/**
 * Rebuild Jekyll & do page reload
 */
// gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
//   browserSync.reload();
// });

gulp.task('jekyll-rebuild', gulp.series('jekyll-build', async (done) => {
  browserSync.reload();
  done();
}));

/**
 * Wait for jekyll-build, then launch the Server
 */
// gulp.task('browser-sync', ['jekyll-build'], function () {
//   browserSync({
//     server: {
//       baseDir: './dist'
//     }
//   });
// });

gulp.task('browser-sync', gulp.series('jekyll-build', async (done) => {
  browserSync({
    server: {
      baseDir: './dist'
    }
  });
  done();
}));


/**
 * Styles Task
 */
gulp.task('styles', (done) => {
  gulp.src(pageStyles, { allowEmpty: true })
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(prefix(prefixerOptions))
    .pipe(gulp.dest(stylesDest))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(gulp.dest(stylesDest));

  done();
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', (done) => {
  gulp.watch('./app/assets/styles/**/*.scss', gulp.series('styles', 'jekyll-rebuild'));
  gulp.watch(['./app/index.html', './app/**/*.{html,md,markdown}'], gulp.series('jekyll-rebuild'));
  done();
});

/**
 * Default task, running just `gulp` will compile the stylus,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
// gulp.task('default', ['styles', 'convert-webp', 'browser-sync', 'watch']);

gulp.task('default', gulp.series('styles', 'convert-webp', 'browser-sync', 'watch'));


// build to deploy
// gulp.task('build', ['styles', 'convert-webp', 'jekyll-build']);

gulp.task('build', gulp.series('styles', 'convert-webp', 'jekyll-build'));
