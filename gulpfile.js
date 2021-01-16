const gulp = require('gulp');
const sass = require('gulp-sass');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const pug = require('gulp-pug');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const nano = require('cssnano');
const browserSync = require('browser-sync').create();

// Compile scss into css

gulp.task('sass', () => {
	return gulp
		.src('production/scss/**/*.scss')
		.pipe(sass())
		.pipe(browserSync.stream())
		.on('error', sass.logError)
		.pipe(postcss([ autoprefixer /* , nano*/ ]))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('pug', () => {
	return gulp
		.src('production/*.pug')
		.pipe(
			pug({
				pretty: true
			})
		)
		.pipe(gulp.dest('./dist/'));
});

gulp.task('ts', () => {
	return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest('./dist/'));
});

gulp.task(
	'watch',
	gulp.series('pug', function(done) {
		browserSync.init({
			server: {
				baseDir: './dist'
			}
		});
		gulp.watch('./dist/*.html').addListener('change', browserSync.reload);
		gulp.watch('./production/scss/**/*.scss', gulp.parallel('sass'));
		gulp.watch('./production/js/**/*.js').addListener('change', browserSync.reload);
		gulp.watch('production/*.pug', gulp.parallel('pug'));
		gulp.watch('./production/ts/*.ts', gulp.parallel('ts'));
		done();
	})
);

gulp.task('default', gulp.series('watch', function() {}));
