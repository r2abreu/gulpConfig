const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const nano = require('cssnano');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// Compile scss into css

gulp.task('sass', () => {
	return gulp
		.src('./scss/**/*.scss')
		.pipe(sass())
		.pipe(browserSync.stream())
		.on('error', sass.logError)
		.pipe(postcss([ autoprefixer /* , nano*/ ]))
		.pipe(gulp.dest('./production/css'));
});

gulp.task(
	'watch',
	gulp.series('sass', function(done) {
		browserSync.init({
			server: {
				baseDir: './production'
			}
		});
		gulp.watch('./production/*.html').addListener('change', browserSync.reload);
		gulp.watch('./scss/**/*.scss', gulp.parallel('sass'));
		gulp.watch('./js/**/*.js').addListener('change', browserSync.reload);
		done();
	})
);

gulp.task('default', gulp.series('watch', function() {}));
