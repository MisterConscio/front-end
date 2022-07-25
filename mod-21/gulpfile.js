const gulp = require('gulp')
const { series, parallel } = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const image = require('gulp-image')
const htmlmin = require('gulp-htmlmin')
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create();
const reload = browserSync.reload

function exportCSS(cb) {
  gulp.src([
    './node_modules/bootstrap/dist/css/bootstrap.css',
    './src/css/custom.css',
  ])
  .pipe(concat('lib.css'))
  .pipe(cssmin())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('./dist/css'))
  cb()
}

function exportJS(cb) {
  gulp.src([
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './node_modules/jquery/dist/jquery.js',
    './src/js/custom.js',
  ])
  .pipe(babel({ comments: false, presets: ['env'] }))
  .pipe(concat('lib.js'))
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('./dist/js'))
  cb()
}

function exportHTML(cb) {
  gulp.src('./src/**/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('./dist'))
  cb()
}

function exportIMG(cb) {
  gulp.src('./src/img/*')
  .pipe(image({
    pngquant: true,
    optipng: false,
    zopflipng: true,
    jpegRecompress: false,
    mozjpeg: true,
    gifsicle: true,
    svgo: true,
    concurrent: 10,
    quiet: true
  }))
  .pipe(gulp.dest('./dist/img'))
  cb()
}

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  gulp.watch('./src/**/*').on('change', process)

});

const process = series(exportCSS, exportJS, exportHTML, reload)

exports.styles = exportCSS
exports.script = exportJS
exports.html = exportHTML
exports.image = exportIMG
exports.default = parallel(exportCSS, exportJS, exportHTML, exportIMG)
