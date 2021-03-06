//========================================================================================
// NightOwl GUI Gulpfile
//========================================================================================
"use strict";
const gulp = require('gulp');
const gp = require('gulp-load-plugins')();
const del = require('del');
const spawn = require('child_process').spawn;

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Handy Paths:
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const paths = {
  stylusIncludeDirs: ['bower_components/nog-css-reset', 'src/styl'],
  stylFiles: ['test/webapp/styl/*.styl'],
  htmlFiles: ['test/webapp/*.html'],
  build: {
    cssDir: '_build/webapp/css'
  }
};

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Stylus Tasks:
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
gulp.task('stylus', () => {
    return gulp.src(paths.stylFiles)
        .pipe(gp.plumber())
        .pipe(gp.stylus({
          paths: paths.stylusIncludeDirs
        }))
        .pipe(gulp.dest(paths.build.cssDir));
});
gulp.task('release:stylus', () => {
    return gulp.src(paths.stylFiles)
        .pipe(gp.stylus())
        .pipe(gulp.dest(paths.build.cssDir));
});

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Building and Releasing Tasks:
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const buildTasks = ['stylus'];
const releaseTasks = [];
for (const task of buildTasks) {
  releaseTasks.push('release:' + task);
}
gulp.task('build', gulp.series(buildTasks));
gulp.task('release', gulp.series(releaseTasks));

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Watching and Live Reloading Tasks:
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
gulp.task('watch:html', () => {
  gulp.watch(paths.htmlFiles).on('change', function(file) {
    gp.livereload.changed(file);
  });
});
function startLiveReload(done) {
  gp.livereload.listen();
  done();
}
gulp.task('watch', gulp.series(startLiveReload, gulp.parallel('watch:html')));

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Testing Tasks:
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
gulp.task('runTestServer', function(done) {
  const child = spawn('node', ['test/server.js']);
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
  child.on('close', code => {
    console.info(`Test server child process exited with code ${code}.`);
    done();
  });
});
gulp.task('test', gulp.series('build', gulp.parallel('runTestServer', 'watch')));

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Cleaning Tasks:
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
gulp.task('clean', function(done) {
  return del(['./_build/']);
});
gulp.task('deep-clean', gulp.series('clean', function(done) {
  return del(['./bower_components/', './node_modules/']);
}));

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Default Task:
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
gulp.task('default', gulp.series('test'));
