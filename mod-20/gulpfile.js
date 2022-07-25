const gulp = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const image = require('gulp-image')

function exportCSS() {
  return gulp.src([
    './node_modules/bootstrap/dist/css/bootstrap.css',
    './src/css/custom.css',
  ])
  .pipe(concat('lib.css'))
  .pipe(cssmin())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('./dist/css'))
}

function exportJS() {
  return gulp.src([
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './node_modules/jquery/dist/jquery.js',
    './src/js/custom.js',
  ])
  .pipe(concat('lib.js'))
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('./dist/js'))
}

function exportIMG() {
  return gulp.src('./src/img/*')
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
}

exports.styles = exportCSS
exports.script = exportJS
exports.image = exportIMG
//exports.default = series(exportCSS, exportJS, exportIMG)
