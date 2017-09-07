const path = require('path');

const gulp = require('gulp');
const sass = require('gulp-sass');
const livereload = require('gulp-livereload');

const sassMatch = 'src/sass/main.sass';
const htmlMatch = 'src/index.html';
const jsMatch = 'src/js/*.js';
const outBase = 'dist';

const copy = (match, outDir) => {
    gulp.src(match)
        .pipe(gulp.dest(outDir));
};

gulp.task('sass', () => {
    gulp.src(sassMatch)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.join(outBase, 'css')))
        .pipe(livereload());
});

gulp.task('html', () => copy(htmlMatch, outBase));
gulp.task('js', () => copy(jsMatch, path.join(outBase, 'js')));

gulp.task('dev', function() {
    livereload.listen();
    gulp.watch(sassMatch, ['sass']);
    gulp.watch(htmlMatch, ['html']);
    gulp.watch(jsMatch, ['js']);
});

gulp.task('build', ['sass', 'html', 'js']);
