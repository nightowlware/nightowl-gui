//========================================================================================
// NightOwl GUI Gulpfile
//========================================================================================
"use strict";
const gulp = require('gulp');
const gp = require('gulp-load-plugins')();
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Handy Paths:
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const paths = {
  styl: ['test/webapp/styl/*.styl'],
  cssDir: 'test/webapp/css'
};

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Stylus Tasks:
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
gulp.task('stylus', () => {
    return gulp.src(paths.styl)
        .pipe(gp.plumber())
        .pipe(gp.stylus({
          paths: ['bower_components/nog-css-reset', 'src/styl']
        }))
        .pipe(gulp.dest(paths.cssDir));
});
gulp.task('release:stylus', () => {
    return gulp.src(paths.styl)
        .pipe(gp.stylus())
        .pipe(gulp.dest(paths.cssDir));
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
// Testing Tasks:
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
gulp.task('doNpmStart', function(done) {

  const child = spawn('node', ['test/server.js']);

  //child.stdout.on('data', function(chunk) {
  //});
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);

  child.on('close', code => {
    console.info(`'npm start' child process exited with code ${code}`);
  });

  //const cmd = `npm start`;
  //exec(cmd, (error, stdout, stderr) => {
  //});
});
gulp.task('test', gulp.series('build', 'doNpmStart'))

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Default Task:
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
gulp.task('default', gulp.series('test'));
