//========================================================================================
// NightOwl GUI Gulpfile
//========================================================================================
//  Author: Chris Anderson
// Created: 9/16/2016
//   Notes: Requires Gulp 4.x!
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
"use strict";
const gulp = require('gulp');
const gp = require('gulp-load-plugins')();

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Handy Paths:
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const paths = {
  styl: ['test/webapp/styl/*.styl'],
  cssDir: 'test/webapp/css'
};

//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Stylus Tasks:
//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
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

//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Building and Releasing Tasks:
//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const buildTasks = ['stylus'];
const releaseTasks = [];
for (const task of buildTasks) {
  releaseTasks.push('release:' + task);
}
gulp.task('build', gulp.series(buildTasks));
gulp.task('release', gulp.series(releaseTasks));

//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Default Task:
//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
gulp.task('default', gulp.series('build'));
