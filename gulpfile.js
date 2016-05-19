'use strict';

var path = require('path');
var gulp = require('gulp');
var del = require('del');
var typescript = require('typescript');
var buildTools = require('via-build-tools');
var sass = require('gulp-sass');

var locations = new buildTools.config.Locations({
  root: path.resolve(__dirname),
  core: {
    base: "src/core",
    typescript: ["**/*.ts"],
    definitions: ["../../typings/**/*.d.ts"]
  },
  targets: {
    browser: {
      base: "src/browser",
      typescript: ["**/*.ts"],
      main: "main",
      definitions: []
    },
    electron: {
      base: "src/electron",
      typescript: ["**/*.ts"],
      main: "main",
      definitions: []
    },
    node: {
      base: "src/node",
      typescript: ["**/*.ts"],
      main: "main",
      definitions: []
    }
  }
});

buildTools.tasks.build(gulp, locations, {
  tsc: {
    typescript: typescript,
    noExternalResolve: false,
    module: "commonjs",
    moduleResolution: "node"
  }
});
buildTools.tasks.install(gulp, locations);
buildTools.tasks.project(gulp, locations);
buildTools.tasks.test(gulp, locations);

var jade = require("gulp-jade");

gulp.task('build.browser.jade', function(){
  gulp.src(['src/browser/**/*.jade'], {base: 'src/browser'})
    .pipe(jade({
      locals: {}
    }))
    .pipe(gulp.dest('build/browser'))
});

gulp.task('build.browser.assets', function(){
  return gulp.src([
      'src/browser/**/*.css',
      'src/browser/**/*.html',
      'src/browser/**/*.jpg',
      'src/browser/**/*.png'
    ], {base: 'src/browser'})
    .pipe(gulp.dest('build/browser'));
});

gulp.task('build.browser.sass', function(){
  return gulp.src(['src/browser/**/*.scss', 'src/browser/**/*.sass'], {base: 'src/browser'})
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/browser'));
});

gulp.task("build.browser", ["build.browser.systemjs", "build.browser.jade", 'build.browser.sass', "build.browser.assets"]);
gulp.task("build", ["build.browser", "build.node", "build.electron"]);

gulp.task('clean.node', function () {
  return del(['build/node/**/*']);
});

gulp.task('clean.browser', function () {
  return del(['build/browser/**/*', 'build/systemjs/**/*']);
});

gulp.task('clean.electron', function () {
  return del(['build/electron/**/*']);
});

gulp.task('clean', function () {
  return del(['build/**/*']);
});


