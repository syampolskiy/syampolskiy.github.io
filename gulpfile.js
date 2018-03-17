"use strict";

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    opn = require('opn'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    pug = require('gulp-pug'),
    prettify = require('gulp-html-prettify'),
    rename = require('gulp-rename'),
    beautify = require('gulp-beautify'),
    csso = require('gulp-csso'),
    replace = require('gulp-replace'),
    htmlLint = require('gulp-html-lint'),
    sassLint = require('gulp-sass-lint'),
    csslint = require('gulp-csslint'),
    csscomb = require('gulp-csscomb'),
    concat = require('gulp-concat');

// csslint.addFormatter('csslint-stylish');

gulp.task('connect', function() {
    connect.server({
        root: 'build/dest',
        livereload: true
    });
    // opn('http://localhost:8080');
});

gulp.task('css', function() {
    // gulp.src('build/src/scss/**/*.scss')
    //     .pipe(sassLint({
    //         options: {
    //             "config-file": "./config/sass-lint.yml"
    //         }
    //     }))
    //     .pipe(sassLint.format())
    gulp.src('build/src/scss/all.scss')
        .pipe(sass())
        .pipe(autoprefixer('> 1%'))
        .pipe(csscomb())
        // .pipe(csso())
        .pipe(rename('main.css'))
        // .pipe(csslint('./config/csslintrc.json'))
        // .pipe(csslint.formatter('stylish'))
        .pipe(gulp.dest('build/dest/css'))
        .pipe(connect.reload());
});

gulp.task('pug', function() {
    var locals = './build/src/content.json';

    gulp.src('build/src/markup/pages/*.pug')
        .pipe(pug())
        .pipe(prettify({
            unformatted: [],
            indent_char: '\t',
            indent_size: 1
        }))
        // .pipe(htmlLint({
        //     htmllintrc: "./config/htmllintrc.json"
        // }))
        // .pipe(htmlLint.format())
        .pipe(gulp.dest('build/dest/'))
        .pipe(connect.reload());
});

gulp.task('fonts', function() {
    gulp.src('build/src/fonts/*')
        .pipe(gulp.dest('build/dest/fonts'));
});

gulp.task('img', function() {
    gulp.src('build/src/img/*.*')
        .pipe(gulp.dest('build/dest/img'));
});

gulp.task('js', function() {
    gulp.src(['build/src/**/*.js', '!build/src/js-no-concat/**/*'])
        .pipe(concat('js.js'))
        .pipe(beautify({
            indent_char: '\t',
            indent_size: 1
        }))
        .pipe(gulp.dest('build/dest/js'))
        .pipe(connect.reload());
});

var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var runTimestamp = Math.round(Date.now()/1000);

gulp.task('iconfont', function() {
    var fontName = 'iconfont';

    gulp.src(['build/src/icons/*.svg'], {base: 'build'})
        .pipe(iconfontCss({
            fontName: fontName,
            path: 'build/src/scss/templates/icons-tmpl.scss',
            targetPath: '../../src/scss/includes/icons.scss',
            fontPath: '../fonts/'
        }))
        .pipe(iconfont({
            fontName: fontName,
            prependUnicode: false,
            normalize: true,
            fontHeight: 1001,
            formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
            timestamp: runTimestamp
        }))
        .pipe(gulp.dest('build/dest/fonts/'));
});

gulp.task('vendor', function() {
    // files prepared before
    gulp.src("build/src/css/**/*.*")
        .pipe(gulp.dest("build/dest/css"))

    gulp.src("build/src/js-no-concat/**/*.*")
        .pipe(gulp.dest("build/dest/js"))


    var pathToSave = "build/dest/vendor/";

    // bower files
    var bc = "bower_components/";

    // gulp.src(bc + "jquery.form-styler/dist/jquery.formstyler.min.js")
    //     .pipe(gulp.dest(pathToSave + 'jquery.form-styler'));
    // gulp.src(bc + "jquery.form-styler/dist/jquery.formstyler.css")
    //     .pipe(gulp.dest(pathToSave + 'jquery.form-styler'));
    // gulp.src(bc + "jquery.form-styler/dist/jquery.formstyler.theme.css")
    //     .pipe(gulp.dest(pathToSave + 'jquery.form-styler'));

    // gulp.src(bc + "bootstrap/dist/css/bootstrap-grid.min.css")
    gulp.src(bc + "tether/dist/js/tether.min.js")
        .pipe(gulp.dest(pathToSave + "tether/js"));
    gulp.src(bc + "popper.js/dist/umd/popper.min.js")
        .pipe(gulp.dest(pathToSave));
    gulp.src(bc + "bootstrap/dist/css/bootstrap.min.css")
        .pipe(gulp.dest(pathToSave + "bootstrap/css"));
    gulp.src(bc + "bootstrap/dist/js/bootstrap.min.js")
        .pipe(gulp.dest(pathToSave + "bootstrap/js"));

    gulp.src(bc + "jquery/dist/jquery.min.js")
        .pipe(gulp.dest(pathToSave))

    // node_modules
    var nm = "node_modules/";
    gulp.src(nm + "bootstrap-select-v4/dist/css/bootstrap-select.min.css")
        .pipe(gulp.dest(pathToSave + "bootstrap-select-v4/css"));
    gulp.src(nm + "bootstrap-select-v4/dist/js/bootstrap-select.min.js")
        .pipe(gulp.dest(pathToSave + "bootstrap-select-v4/js"));

});

gulp.task('watch', function() {
    gulp.watch(['build/src/**/*.pug'], ['pug']);
    gulp.watch(['build/src/**/*.scss'], ['css']);
    gulp.watch(['build/src/**/*.js'], ['js']);
});

gulp.task('default', [
    'fonts',
    'iconfont',
    'img',
    'js',
    'vendor',
    'pug',
    'css',
    'connect',
    'watch'
]);