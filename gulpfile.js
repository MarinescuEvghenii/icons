var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var clean = require('gulp-clean');
var cssmin = require('gulp-cssmin');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var template = require('gulp-template');
var filenames = require("gulp-filenames");

var paths = {
    stylus: {
        files: "src/stylus/**/*.styl",
        main:  "src/stylus/main.styl",
    },

    template: {
        file: "src/stylus.tpl",
        dest: "src/stylus/",
        filename: "readonly.styl"
    },

    styles: {
        dest: "dist/",
        filename: "styles.css"
    },

    html: {
        template: "src/html.tpl",
        filename: "icons.html",
        dest: "dist/"
    },

    images: {
        files: "src/images/"
    }
};

var defaultColors =  {
    primary: "#337ab7",
    success: "#5cb85c",
    info:    "#5bc0de",
    warning: "#f0ad4e",
    danger:  "#d9534f"
}

function getFiles() {
    var files = fs.readdirSync(paths.images.files)
    files = files.filter(function(file) {
        return path.extname(file).toLowerCase() == ".svg"
    });
    return files
}

var loadSVGContents = function(filename, color) {

    var buf = fs.readFileSync(paths.images.files + filename.val);

    buf = String(buf)
        .replace(/<\?xml(.+?)\?>/, '')
        .replace(/^\s+|\s+$/g, '')
        .replace(/>\s+</g, '><')
        .replace(/\s+/g, ' ')
        .replace(/(\r\n|\n|\r)/gm, '')
        .replace(/\"/g, "'")

    if(color) {
        var str = "<style type='text/css'><![CDATA[ * {fill:" + color + "!important;} ]]></style></svg>"
        buf = buf.replace(/<\/svg>/g, str);
    }

    return String('data:image/svg+xml;charset=utf8,' + buf);
};

gulp.task('styles', ['template'], function () {
    return gulp.src(paths.stylus.main)
        .pipe(stylus({'define': { 'svg': loadSVGContents }}))
        .pipe(rename(paths.styles.filename))
        .pipe(gulp.dest(paths.styles.dest))
});

gulp.task('template', function () {
    return gulp.src(paths.template.file)
        .pipe(template({
            colors: defaultColors,
            icons: getFiles()
        }))
        .pipe(rename(paths.template.filename))
        .pipe(gulp.dest(paths.template.dest));
});

gulp.task('html', function () {
    return gulp.src(paths.html.template)
        .pipe(template({
            colors: defaultColors,
            icons: getFiles()
        }))
        .pipe(rename(paths.html.filename))
        .pipe(gulp.dest(paths.html.dest));
});

gulp.task('build', ['styles'], function () {
    return gulp.src(paths.styles.dest + paths.styles.filename)
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('watch', function() {
    gulp.watch([paths.stylus.files, '!'+paths.template.dest+paths.template.filename, paths.template.file, paths.html.template], ['styles', 'html'])
});

gulp.task('default', ['styles', 'html', 'watch']);
