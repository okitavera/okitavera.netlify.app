import { readFileSync } from "fs";
import { spawn } from "child_process";
import rimraf from "rimraf";
import gulp from "gulp";
import stylus from "gulp-stylus";
import postcss from "gulp-postcss";
import postcssPresetEnv from "postcss-preset-env";
import cssnano from "cssnano";
import mqpacker from "css-mqpacker";
import webpack from "webpack";

// read the file instead requiring directly
const metadata = JSON.parse(readFileSync("./data/manifest/metadata.json"));

// call eleventy with additional options
const eleventy = (options = "") => {
  let cmd = (done) =>
    spawn("eleventy", options.split(), { stdio: "inherit" }).on("close", (code) =>
      done(code)
    );
  cmd.displayName = "eleventy" + options;
  return cmd;
};

gulp.task("build:stylus", () =>
  gulp
    .src("assets/stylus/Illuminate.styl")
    .pipe(
      stylus({
        compress: true
      })
    )
    .pipe(postcss([postcssPresetEnv, cssnano, mqpacker]))
    .pipe(gulp.dest("modules/comps/generated"))
);

gulp.task("watch:stylus", () =>
  gulp.watch("assets/stylus/**", gulp.series("build:stylus"))
);

gulp.task(
  "build:js",
  () =>
    new Promise((done) =>
      webpack(require("./webpack.config.js"), (err, stats) => {
        if (err) console.log("Webpack", err);
        console.log(stats.toString())
        done();
      })
    )
);

// only watch custom js
gulp.task("watch:js", () =>
  gulp.watch("assets/js/**", gulp.series("build:js"))
);

gulp.task("clean", (done) => rimraf(metadata.site.output, done));

gulp.task(
  "serve",
  gulp.series(
    "clean",
    gulp.parallel("build:stylus", "build:js"),
    gulp.parallel("watch:stylus", "watch:js", eleventy("--serve"))
  )
);

gulp.task(
  "default",
  gulp.series("clean", gulp.parallel("build:stylus", "build:js"), eleventy())
);
