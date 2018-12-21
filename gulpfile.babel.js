import fs from "fs";
import { spawn } from "child_process";
import rimraf from "rimraf";
import gulp from "gulp";
import stylus from "gulp-stylus";
import postcss from "gulp-postcss";
import postcssPresetEnv from "postcss-preset-env";
import cssnano from "cssnano";
import mqpacker from "css-mqpacker";
import webpack from "webpack";
import flatMap from 'flat-map';
import scaleImages from 'gulp-scale-images';


// read the file instead requiring directly
const metadata = JSON.parse(fs.readFileSync("./data/manifest/metadata.json"));

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

gulp.task("build:jscomments", (done) => {
  const license = fs.readFileSync("./LICENSE", 'utf-8');
  const files = [
    `${metadata.site.output}/assets/js/Okitavera.js`,
    `modules/comps/generated/FontLoader.js`,
  ];
  files.forEach((file) => fs.appendFileSync(file, `\n/*\n${license}\n*/\n`));
  return done();
});

// only watch custom js
gulp.task("watch:js", () =>
  gulp.watch("assets/js/**", gulp.series("build:js", "build:jscomments"))
);

gulp.task("build:lqip", () => {
  const scaleopts = (file, done) => {
    const pict = file.clone()
    pict.scale = { maxWidth: 16 }
    done(null, pict)
  };
  return gulp.src('assets/img/thumbnails/*.jpg')
    .pipe(flatMap(scaleopts))
    .pipe(scaleImages())
    .pipe(gulp.dest(metadata.site.output + "/assets/img/thumbnails"))

});

gulp.task("clean", (done) => {
  rimraf(metadata.site.output, done);
  rimraf("modules/comps/generated", done);
});

gulp.task(
  "serve",
  gulp.series(
    "clean",
    gulp.parallel("build:stylus", "build:js", "build:lqip"),
    "build:jscomments",
    gulp.parallel("watch:stylus", "watch:js", eleventy("--serve"))
  )
);

gulp.task(
  "default",
  gulp.series("clean", gulp.parallel("build:stylus", "build:js", "build:lqip"), "build:jscomments", eleventy())
);
