# Gulp Config

## What this config does

It compiles SCSS to a CSS file inside the production folder, also adding vendors prefixes. It also uses browser-sync to spin up a live server for development. 

## What this config does not

It doesn't compiles SASS to CSS.

## Instructions 

The configurarion currently allows to run two tasks: `sass` and `watch`:

### `sass`

By running `gulp sass` the following task will run: 

```
gulp.task('sass', () => {
	return gulp
		.src('./scss/**/*.scss')
		.pipe(sass())
		.pipe(browserSync.stream())
		.on('error', sass.logError)
		.pipe(postcss([ autoprefixer /* , nano*/ ]))
		.pipe(gulp.dest('./production/css'));
});
```

This will compile any `.scss` file inside the scss folder into `css` and throw the ouput into the CSS folder inside the production folder. This output will also be prefixed. The configuration will not minify by default, it can be easily enabled by uncommenting the `nano` literal on line 26. 

### `watch`

Running `gulp watch` will trigger the following task: 

```
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
```

This will enable the live server inside the production folder (any HTML should be placed inside it). It will also allow gulp to listen to any changes in the `scss` files and if so, run the `sass` in paralell to compile to `css`.

### `gulp`

By running `gulp` by itself, will trigger as default task the same behaviour as `gulp watch`, it only serves as a shortcut: 

```
gulp.task('default', gulp.series('watch', function() {}));
```

## Dependencies Documentation

* [Gulp](https://gulpjs.com/)
* [PostCss](https://www.npmjs.com/package/postcss)
* [autoprefixer](https://www.npmjs.com/package/autoprefixer)
* [cssnano](https://www.npmjs.com/package/cssnano)
* [browser-sync](https://www.npmjs.com/package/browser-sync)

