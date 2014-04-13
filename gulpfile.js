var gulp    = require('gulp');
var $		= require('gulp-load-plugins')();

/********** Styles **********/
gulp.task('less', function() {
	gulp.src(__dirname + '/assets/less/style.less')
		.pipe($.less())
        .pipe($.minifyCss({
        	keepBreaks:true,
        	keepSpecialComments: 0
        }))
        .pipe(gulp.dest(__dirname + '/assets/css'))
        .pipe(connect.reload());
});

/********** Scripts **********/
gulp.task('js', function () {
	gulp.src(__dirname + '/assets/js/app.js')
		.pipe($.include())
		.pipe($.uglify())
		.pipe($.rename("script.js"))
		.pipe(gulp.dest(__dirname + '/assets/js'))
        .pipe(connect.reload());
});

/********** HTML **********/
gulp.task('html', function () {
	gulp.src(__dirname + '/_index.html')
		.pipe($.fileInclude())
        .pipe($.rename("index.html"))
        .pipe(gulp.dest(__dirname))
        .pipe(connect.reload());
});

/********** Serve **********/
gulp.task('serve', function() {
    $.connect.server({
    	root 		: [__dirname],
    	port 		: 9000,
    	livereload 	: true,
    });
});

/********** Watch **********/
gulp.task('watch', function () {
    gulp.watch(__dirname + '/assets/less/style.less', ['less']);
    gulp.watch(__dirname + '/assets/js/app.js', ['js']);
    gulp.watch([
    	__dirname + '/_index.html',
    	__dirname + '/_pages/*.html'
    ], ['html']);
});

/********** Default **********/
gulp.task('default', ['less', 'js', 'html', 'serve', 'watch']);
