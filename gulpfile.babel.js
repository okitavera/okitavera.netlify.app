import fs from "fs";
import {spawn} from "child_process";
import gulp from "gulp";
import babel from "gulp-babel";
import stylus from "gulp-stylus";
import uglify from "gulp-uglify";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import mqpacker from "css-mqpacker";

const BUILD_DIR = "dist";
// google site verification
const GSV = "google9ab7bf08387cc375";
const UGLIFY_OPT = {
  output: {
    // don't drop comments with "!"
    comments: /^!/
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

gulp.task("build:js", () =>
  gulp
    .src([
      "node_modules/vanilla-lazyload/dist/lazyload.min.js",
      "node_modules/smooth-scroll/dist/smooth-scroll.polyfills.min.js",
      "assets/js/critical-foft-preload-fallback-optional.js"
    ])
    .pipe(babel())
    .pipe(uglify(UGLIFY_OPT))
    .pipe(gulp.dest(`${BUILD_DIR}/assets/js`))
);

gulp.task("build:injs", () =>
  gulp
    .src(["assets/js/okitavera.js", "assets/js/thecompromise-fonts.js"])
    .pipe(babel())
    .pipe(uglify(UGLIFY_OPT))
    .pipe(gulp.dest("modules/comps/generated"))
);

// only watch inlined js
gulp.task("watch:injs", () =>
  gulp.watch("assets/js/**", gulp.series("build:injs"))
);

gulp.task("build:gsv", (done) => {
  !fs.existsSync(BUILD_DIR) && fs.mkdirSync(BUILD_DIR);
  fs.writeFile(
    `${BUILD_DIR}/${GSV}.html`,
    `google-site-verification: ${GSV}.html`,
    done
  );
});

gulp.task(
  "serve",
  gulp.series(
    gulp.parallel("build:stylus", "build:js", "build:injs", "build:gsv"),
    gulp.parallel("watch:stylus", "watch:injs", eleventy("--serve"))
  )
);

gulp.task(
  "default",
  gulp.series(
    gulp.parallel("build:stylus", "build:js", "build:injs", "build:gsv"),
    eleventy()
  )
);
