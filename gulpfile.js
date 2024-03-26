const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const cleanCSS = require('gulp-cleaner-css');


// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "."
        }
    });
});

gulp.task('styles', function() {
    return gulp.src("sass/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min"
          }))
        // .pipe(autoprefixer({
		// 	cascade: false
		// }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function(){
    gulp.watch("sass/*.+(scss|sass)", gulp.parallel("styles"));
    gulp.watch("*.html").on("change", browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));