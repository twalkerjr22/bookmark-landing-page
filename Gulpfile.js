var gulp = require("gulp");
var sass = require("gulp-sass");
var source = require("vinyl-source-stream");
var browserify = require("browserify");
var prompt = require("gulp-prompt");
var tap = require("gulp-tap"),
  path = require("path"),
  newfile = require("gulp-file");

gulp.task("styles", function() {
  return gulp
    .src("scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./css/"));
});

gulp.task("scss-generate", function() {
  return gulp.src("_empty.txt").pipe(
    prompt.prompt(
      {
        type: "input",
        name: "task",
        message: "What's the name of the new scss?"
      },
      function(res) {
        gulp.src("_empty.txt").pipe(
          tap(function(file) {
            var fileName = res.task;
            var contents = "." + res.task + " {}";
            newfile(fileName + "-large.scss", contents).pipe(
              gulp.dest("./scss/components/" + res.task)
            );
            newfile(fileName + "-medium.scss", contents).pipe(
              gulp.dest("./scss/components/" + res.task)
            );
            return newfile(fileName + "-small.scss", contents).pipe(
              gulp.dest("./scss/components/" + res.task)
            );
          })
        );
      }
    )
  );
});

gulp.task("browserify", function() {
  return (
    browserify("js/index.js")
      .bundle()
      //Pass desired output filename to vinyl-source-stream
      .pipe(source("js/app.js"))
      // Start piping stream to tasks!
      .pipe(gulp.dest("./build/"))
  );
});

gulp.task("default", function() {
  gulp.watch("scss/**/*.scss", gulp.series("styles"));
  gulp.watch("js/**/*.js", gulp.series("browserify"));
});
