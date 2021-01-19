const gulp = require('gulp');

const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

const del = require('del');

const browserSync = require('browser-sync').create();

const paths = {
    root: './build',
    template: {
        src: 'src/template/**/*.html'
    },
    styles: {
        src: 'src/styles/**/*.*',
        dest: 'build/assets/styles/'
    },    
    images: {
        src: 'src/img/**/*.*',
        dest: 'build/assets/images/'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'build/assets/scripts/'
    },
    font: {
        src: 'src/font/**/*.*',
        dest: 'build/assets/font'
    }
}

//перенос html кода в build
function template() {
    return gulp.src(paths.template.src)
        .pipe(gulp.dest(paths.root));
}

// scss
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(gulp.dest(paths.styles.dest))
}

function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(gulp.dest(paths.scripts.dest));
}

//font
function font() {
    return gulp.src(paths.font.src)
        .pipe(gulp.dest(paths.font.dest));
}

// clear
function clean() {
    return del(paths.root);
}

// галповский вотчер
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.template.src, template);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.font.src, font);
}

// локальный сервер + livereload (встроенный)
function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

// просто переносим картинки
function images() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));
}

exports.template = template;
exports.styles = styles;
exports.clean = clean;
exports.images = images;
exports.font = font;

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, template, images, scripts, font),
    gulp.parallel(watch, server)
));