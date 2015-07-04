var gulp = require('gulp'),
		jshint = require('gulp-jshint'),
		uglify = require('gulp-uglify'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		minifycss = require('gulp-minify-css'),
		rename = require('gulp-rename'),
		browserSync = require('browser-sync'),
		nodemon = require('gulp-nodemon'),
		react = require('gulp-react'),
		concat = require('gulp-concat'),
		reload = browserSync.reload;

function handleError (err) {
  console.log(err.toString());
  process.exit(-1);
}


gulp.task('default', ['start', 'copy', 'browser-sync', 'transform', 'styles', 'watch']);

gulp.task('serve', ['start', 'bowercopy', 'browser-sync']);

gulp.task('start', function() {
	nodemon({
		script: 'server.js'
	})
});

gulp.task('bowercopy', function() {
  gulp.src(['bower_components/react/react.min.js'])
    .pipe(gulp.dest('./build/js/vendor'));
});

gulp.task('transform', function() {
	gulp.src(['./src/js/components/*.js', './src/js/app.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(react())
		.pipe(concat('build.min.js'))
		.pipe(uglify())
		.on('error', handleError)
		.pipe(gulp.dest('./build/js/'))
		.pipe(reload({stream: true}));
});

gulp.task('minify', function() {
	gulp.src('./build/js/build.min.js')
		.pipe(uglify())
		.on('error', handleError);
});

gulp.task('copy', function(){
  gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('styles', function() {
	gulp.src('./src/css/main.scss')
		.pipe(sass({
	  	"sourcemap=none": true
	  }))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('./build/css'))
		.pipe(reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		proxy: "localhost:8080"
	});
});

gulp.task('watch', function() {
	gulp.watch('./src/js/**/*.js', ['transform']);
	gulp.watch('./src/css/**/*.scss', ['styles']);
	gulp.watch('./src/**/*.html', ['copy', reload]);
});