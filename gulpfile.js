'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

const autoprefixer = require('gulp-autoprefixer');
const stripCssComments = require('gulp-strip-css-comments');

function cssSite() {
    return gulp.src('./view/scss/site/style.scss')
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
        .pipe(gulp.dest('./public/jeneric/site/css'));
}

function cssEmail() {
    return gulp.src('./view/scss/email/style.scss')
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
        .pipe(gulp.dest('./public/jeneric/email/css'));
}

function watch() {
    gulp.watch('./view/scss/**/*.scss', gulp.parallel(cssSite, cssEmail));
}

exports.cssSite = cssSite;
exports.cssEmail = cssEmail;
exports.default = gulp.parallel(cssSite, cssEmail, watch);
