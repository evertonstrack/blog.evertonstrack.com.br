exports.config = {
  jekyll: {
    default: '_config.yml',
    development: '_config.yml'
  },
  views: [
    './app/index.html',
    './app/**/*.{html,md,markdown}'
  ],
  // scripts: {
  //   src: './src/scripts/bundle.js',
  //   dest: './dist/assets/bundle.min.js'
  // },
  styles: {
    src: './app/assets/styles/**/*.scss',
    dest: './app/components/styles'
  },
  images: {
    src: './app/assets/images/**/*.{jpg,jpeg,png}',
    webpDest: './app/assets/images/webp'
  },
  browserSync: {
    open: false,
    ghostMode: false,
    server: {
      baseDir: './dist'
    }
  }
};

