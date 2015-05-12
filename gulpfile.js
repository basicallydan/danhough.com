var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var config = {
	local: {
		destination: './_site'
	},
	live: {
		destination: '/home/dan/websites/danhough.com/www'
	},
	dev: {
		destination: '/home/dan/websites/danhough.com/dev'
	}
};
var environment = 'local';

if (gutil.env.live) {
	environment = 'live';
}

if (gutil.env.dev) {
	environment = 'dev';
}

config = config[environment];

gulp.task('styles', function () {
    return gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

gulp.task('build', ['styles'], function (done) {
	require('child_process').spawn('jekyll', ['build'], { stdio: 'inherit' })
	.on('exit', function () {
		done();
	});
});

gulp.task('deploy', ['styles'], function (done) {
	gutil.log('Deploying website to', config.destination);
	var variables = ['build', '--destination', config.destination];
	require('child_process').spawn('jekyll', variables, { stdio: 'inherit' })
	.on('exit', function () {
		done();
	});
});

gulp.task('serve', ['styles'], function () {
	require('child_process').spawn('jekyll', ['serve', '--watch'], {stdio: 'inherit'});
    gulp.watch('scss/**', ['styles']);
});

gulp.task('default',['serve']);
