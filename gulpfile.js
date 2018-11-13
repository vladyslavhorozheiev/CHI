//add  gulp
var gulp = require("gulp");

//add plugins
var sass = require("gulp-sass"),
	cssnano = require("gulp-cssnano"),
	autoprefixer = require("gulp-autoprefixer"),
	imagemin = require("gulp-imagemin"),
	concat = require("gulp-concat"),
	rename = require("gulp-rename"),
	fixmyjs = require("gulp-fixmyjs");

//add tasks
//copy html files to dist directory
gulp.task("html", function () {
	return gulp.src("src/*html").pipe(gulp.dest("dist"));
});

//concat, compile scss, autoprefixer, min code
gulp.task("scss", function () {
	return gulp.src("src/scss/*.scss").pipe(concat("style.scss")).pipe(sass()).pipe(autoprefixer({
		browsers: ['last 2 version'],
		cascade: false
	})).pipe(cssnano()).pipe(rename({
		sufix: '.min'
	})).pipe(gulp.dest("dist/css"));
});

//compress image
gulp.task('imgs', function () {
	gulp.src('src/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
});

//fixmyjs
gulp.task('fixmyjs', function () {
	gulp.src('src/js/script.js')
		.pipe(fixmyjs())
		.pipe(gulp.dest('dist/js'));
});

//see after modified files
gulp.task('watch', function () {
	gulp.watch('src/*.html', ['html']);
	gulp.watch('src/js/*.js', ['fixmyjs']);
	gulp.watch('src/scss/*.scss', ['scss']);
	gulp.watch('src/img/*.png)', ['imgs']);
});

//start tasks
gulp.task('default', ['html', 'scss', 'fixmyjs', 'imgs', 'watch']);
