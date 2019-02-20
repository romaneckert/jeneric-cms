'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

const autoprefixer = require('gulp-autoprefixer');
const stripCssComments = require('gulp-strip-css-comments');

function css() {
    return gulp.src('./view/scss/style.scss')
        .pipe(
            sass({
                outputStyle: 'compressed'
            }).on('error', sass.logError)
        )
        .pipe(
            autoprefixer({
                browsers: ['last 5 versions', 'Firefox ESR', 'not ie <= 8'],
                cascade: false
            })
        )
        .pipe(
            stripCssComments({
                preserve: false
            })
        )
        .pipe(gulp.dest('./public/jeneric/css'));
}

function watch() {
    gulp.watch('./view/scss/**/*.scss', css);
}

exports.css = css;
exports.default = gulp.parallel(css, watch);
