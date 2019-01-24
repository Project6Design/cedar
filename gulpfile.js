var gulp = require('gulp');
var argv = require('yargs').argv;

var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var pixrem = require('gulp-pixrem');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var concat = require('gulp-concat');

var paths = {
  sassSrc: 'assets/sass/site.scss',
  sassDest: 'public/css',
  jsSrc: 'assets/js/*.js',
  jsDest: 'public/js',
  imgSrc: 'assets/images/**/*.{png,jpg,gif}',
  imgDest: 'public/images',
  svgSrc: 'assets/images/**/*.svg',
  svgDest: 'public/images'
}

var browserList = ['last 5 versions', '> 5%', 'Firefox ESR'];

gulp.task('sass', function () {
  return gulp.src(paths.sassSrc)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    // Need the next two lines as an intermediate write, otherwise autoprefizer doesnt cooperate with sourcemaps
    // https://github.com/ByScripts/gulp-sample/blob/master/gulpfile.js
    .pipe(sourcemaps.write({includeContent: false}))
      .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoprefixer({browsers: browserList}))
    .pipe(pixrem())
    .pipe(csso())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.sassDest));
});

gulp.task('js', function() {
  return gulp.src(paths.jsSrc)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('site.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.jsDest));
});

gulp.task('imagemin', function() {
  return gulp.src(paths.imgSrc)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.imgDest));
});

gulp.task('svgmin', function() {
  return gulp.src(paths.svgSrc)
    .pipe(svgmin())
    .pipe(gulp.dest(paths.svgDest));
});

gulp.task('svgstore', function () {
    return gulp
        .src(paths.svgSrc)
        .pipe(svgmin())
        .pipe(svgstore())
        .pipe(rename('icons.svg'))
        .pipe(gulp.dest(paths.svgDest));
});

gulp.task('vendor:css', function() {
  return gulp.src([
    './node_modules/jquery.mmenu/dist/jquery.mmenu.all.css',
    './node_modules/select2/dist/css/select2.min.css',
    './node_modules/lity/dist/lity.min.css'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('vendor:js', function() {
  return gulp.src([
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/svg4everybody/dist/svg4everybody.min.js',
    './node_modules/jquery.mmenu/dist/jquery.mmenu.all.js',
    './node_modules/select2/dist/js/select2.min.js',
    './node_modules/lity/dist/lity.min.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/js/'));
});

// Watch files for change and set Browser Sync
gulp.task('watch', function() {
  gulp.watch(paths.sassSrc, ['sass']);
  gulp.watch(paths.jsSrc, ['js']);
});

// Default task
//gulp.task('default', ['svgstore', 'sass', 'js']);
gulp.task('default', ['vendor:css', 'vendor:js','svgstore', 'sass', 'js']);
