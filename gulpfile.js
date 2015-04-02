var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('default', function() {
    gulp.src('src/js/main.js')
        .pipe(browserify({ insertGlobals: true }))
        .pipe(gulp.dest('./build/js'));
    gulp.src('src/index.html')
        .pipe(gulp.dest('./build'));

});
