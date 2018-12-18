import fs from "fs";
import {spawn} from "child_process";
import merge from "merge-stream";
import rimraf from "rimraf";
import gulp from "gulp";
import babel from "gulp-babel";
import concat from "gulp-concat";
import stylus from "gulp-stylus";
import uglify from "gulp-uglify";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import mqpacker from "css-mqpacker";
import metadata from "./data/manifest/metadata.json";

const UGLIFY_OPT = {
  output: {
    // don't drop comments with "!"
    comments: /(?:^!|@(?:license|preserve))/i
  }
};

// call eleventy with additional options
const eleventy = (options = "") => {
  let cmd = (done) =>
    spawn("eleventy", options.split(), {stdio: "inherit"}).on("close", (code) =>
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
    .pipe(postcss([autoprefixer, cssnano, mqpacker]))
    .pipe(gulp.dest("modules/comps/generated"))
);

gulp.task("watch:stylus", () =>
  gulp.watch("assets/stylus/**", gulp.series("build:stylus"))
);

gulp.task("build:js", () => {
  const pass = gulp
    .src("assets/js/critical-foft-preload-fallback-optional.js")
    .pipe(babel())
    .pipe(uglify(UGLIFY_OPT))
    .pipe(gulp.dest(`${metadata.site.output}/assets/js`));

  const bundle = gulp
    .src([
      "node_modules/vanilla-lazyload/dist/lazyload.min.js",
      "node_modules/smooth-scroll/dist/smooth-scroll.polyfills.min.js",
      "assets/js/okitavera.js"
    ])
    .pipe(babel())
    .pipe(uglify(UGLIFY_OPT))
    .pipe(concat("bundle.js"))
    .pipe(gulp.dest(`${metadata.site.output}/assets/js`));

  const inline = gulp
    .src(["assets/js/thecompromise-fonts.js"])
    .pipe(babel())
    .pipe(uglify(UGLIFY_OPT))
    .pipe(gulp.dest("modules/comps/generated"));

  return merge(pass, bundle, inline);
});

// only watch custom js
gulp.task("watch:js", () =>
  gulp.watch("assets/js/**", gulp.series("build:js"))
);

gulp.task("build:gsv", (done) => {
  !fs.existsSync(metadata.site.output) && fs.mkdirSync(metadata.site.output);
  fs.writeFile(
    `${metadata.site.output}/${metadata.site.google_verification}.html`,
    `google-site-verification: ${metadata.site.google_verification}.html`,
    done
  );
});

gulp.task("clean", (done) => rimraf(metadata.site.output, done));

gulp.task(
  "serve",
  gulp.series(
    "clean",
    gulp.parallel("build:stylus", "build:js", "build:gsv"),
    gulp.parallel("watch:stylus", "watch:js", eleventy("--serve"))
  )
);

gulp.task(
  "default",
  gulp.series(
    "clean",
    gulp.parallel("build:stylus", "build:js", "build:gsv"),
    eleventy()
  )
);
