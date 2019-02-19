'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

function css() {
    return gulp.src('./view/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./view/css/jeneric'));
}

function watch() {
    gulp.watch('./sass/**/*.scss', css);
}

exports.css = css;
exports.default = gulp.parallel(css, watch);
