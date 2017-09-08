const path = require('path');

const gulp = require('gulp');
const sass = require('gulp-sass');
const livereload = require('gulp-livereload');
const webserver = require('gulp-webserver');
const clean = require('gulp-clean');

const sassMatch = 'src/sass/**/*.sass';
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
        .pipe(gulp.dest(path.join(outBase, 'css')));
});

gulp.task('html', () => copy(htmlMatch, outBase));
gulp.task('js', () => copy(jsMatch, path.join(outBase, 'js')));
gulp.task('setup', () => copy('src/index.theme', outBase));

gulp.task('serve', () => {
    gulp.src(outBase)
        .pipe(webserver({ livereload: true }));
});

gulp.task('dev', () => {
    gulp.start('build');
    gulp.watch('src/index.theme', ['setup']);
    gulp.watch(sassMatch, ['sass']);
    gulp.watch(htmlMatch, ['html']);
    gulp.watch(jsMatch, ['js']);
    gulp.start('serve');
});



gulp.task('build', ['setup', 'sass', 'html', 'js']);
