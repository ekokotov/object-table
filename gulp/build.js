'use strict';

var gulp = require('gulp'),
gulpLoadPlugins = require('gulp-load-plugins'),
plugins = gulpLoadPlugins(),

minifyCSS = require('gulp-minify-css'),

TEMP_FOLDER = ".tmp",
SRC_FOLDER = "src",
TEMPLATES_FOLDER = "templates",
BUILD_FOLDER = "build",
OUTPUT_FILE = "object-table.js";

gulp.task('js-min', function () {
	return gulp.src(SRC_FOLDER + '/js/**/*.js')
	.pipe(plugins.concat(OUTPUT_FILE))
	.pipe(plugins.ngAnnotate())
	.pipe(plugins.uglify())
	.pipe(gulp.dest(TEMP_FOLDER))
});

gulp.task('js-templates', function() {
	return gulp.src(SRC_FOLDER + '/' + TEMPLATES_FOLDER + '/**/*.html')
	.pipe(plugins.htmlmin({collapseWhitespace: true}))
	.pipe(plugins.angularTemplatecache('templates.js',{ module:'objectTable', root:TEMPLATES_FOLDER + '/' }))
	.pipe(gulp.dest(TEMP_FOLDER))
});

gulp.task('css', function() {
  return gulp.src('src/css/object-table-style.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest(BUILD_FOLDER));
});


gulp.task('build', ['js-templates', 'js-min', 'css'], function() {

	gulp.src(TEMP_FOLDER + '/**/*.js')
	.pipe(plugins.concat(OUTPUT_FILE))
	.pipe(gulp.dest(BUILD_FOLDER))

	gulp.src(TEMP_FOLDER, {read: false})
	.pipe(plugins.clean())

});
