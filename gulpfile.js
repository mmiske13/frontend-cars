let gulp = require('gulp');
let sass = require('gulp-sass');

const sassDirectory = "./styles/sass/style.sass";
const sassDestination = "./styles/";

sass.compiler = require('node-sass');


gulp.task('sass', function () {
   return gulp.src(sassDirectory)
       .pipe(sass())
       .pipe(gulp.dest(sassDestination));
});

