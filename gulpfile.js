var gulp = require('gulp');
var browserify = require('gulp-browserify');
var browserSync = require('browser-sync').create();

// process JS files and return the stream.
gulp.task('js', function () {
  gulp.src('js/index.js', {read: false})
    .pipe(browserify({
      transform: ['reactify']
    }))
    .pipe(gulp.dest('./public/'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], browserSync.reload);

// use default task to launch Browsersync and watch JS files
gulp.task('serve', ['js'], function() {

  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });

  // add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  gulp.watch("js/**/*.js", ['js-watch']);
});

gulp.task('default', ['serve']);
