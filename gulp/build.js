'use strict';

var gulp = require('gulp'),
gulpLoadPlugins = require('gulp-load-plugins'),
minifyCSS = require('gulp-minify-css'),
path = require('path'),
gutil = require('gulp-util'),
plugins = gulpLoadPlugins(),

TEMP_FOLDER = ".tmp",
SRC_FOLDER = "src",
TEMPLATES_FOLDER = "templates",
BUILD_FOLDER = "build",
OUTPUT_FILE = "object-table_v0.1.3.js";


gulp.task('less', function () {
	return gulp.src('src/css/**/*.less')
	.pipe(plugins.less({
		paths: [ path.join(__dirname, 'less', 'includes') ]
	}).on('error', function(err){
        gutil.log(err);
        this.emit('end');
    }))
    .pipe(minifyCSS())

	.pipe(gulp.dest(BUILD_FOLDER));
});

gulp.task('watch', function() {
    return plugins.watch('src/css/**/*.less', function() {
        gulp.start('less')
        .on('error', gutil.log);
    })
});

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
	.pipe(plugins.angularTemplatecache('templates.js',{ module:'objectTable', root:'/'+SRC_FOLDER + '/' + TEMPLATES_FOLDER + '/' }))
	.pipe(gulp.dest(TEMP_FOLDER))
});

/*gulp.task('css', function() {
	return gulp.src('src/css/object-table-style.css')
	.pipe(minifyCSS())
	.pipe(gulp.dest(BUILD_FOLDER));
});*/


gulp.task('build', ['js-templates', 'js-min', 'less'], function() {

	gulp.src(TEMP_FOLDER + '/**/*.js')
	.pipe(plugins.concat(OUTPUT_FILE))
	.pipe(gulp.dest(BUILD_FOLDER))

	gulp.src(TEMP_FOLDER, {read: false})
	.pipe(plugins.clean())

});
