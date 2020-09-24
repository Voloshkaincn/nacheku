var gulp = require('gulp'),
	sassToCss = require('gulp-sass'),
	concat = require("gulp-concat"),
	babel = require('gulp-babel'),
	uglifyjs = require("gulp-uglify"),
	cleanCSS = require('gulp-clean-css'),
	autoprefixer = require("gulp-autoprefixer"),
	rename = require("gulp-rename"),
	browserSync = require('browser-sync').create(),
	sourcemaps = require('gulp-sourcemaps'),
	cssnano = require('gulp-cssnano');

//Compile CSS file from Sass
gulp.task('compileSass', function () {
	return gulp.src(['src/sass/**/*.{sass,scss}'])
		.pipe(sourcemaps.init())
		.pipe(sassToCss({ outputStyle: 'expanded', sourcemap: true }).on('error', sassToCss.logError))
		.pipe(autoprefixer({ cascade: false }))
		.pipe(gulp.dest('src/css'))
		.pipe(cleanCSS())
		.pipe(cssnano({ zindex: false }))
		.pipe(rename({ suffix: '.min' }))
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.stream({ match: '**/*.css' }));
});

//Compress JSFiles
gulp.task('compressJs', function () {
	return gulp.src([
		'src/js/main.js'
	])
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglifyjs())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest('src/js'))
		.pipe(browserSync.stream({ match: '**/*.js' }));
});

gulp.task('code', function () {
	return gulp.src([
		'src/**/*.{php, html}'
	])
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('browserSync', function () {
	browserSync.init({
		watch: true,
		server: "./src/"
	});
});


// Watch
gulp.task('watch', gulp.parallel('code', 'compileSass', 'compressJs', 'browserSync', function startWatching() {
	gulp.watch('src/sass/**/*.{css,sass,scss}', gulp.parallel('compileSass'));
	gulp.watch('src/js/main.js', gulp.parallel('compressJs'));
	gulp.watch('src/**/*.{php,html}', gulp.parallel('code')).on('change', browserSync.reload);
}));

// Default Gulp function
gulp.task('default', gulp.parallel('watch'));