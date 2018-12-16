import fs from "fs";
import {spawn} from "child_process";
import gulp from "gulp";
import babel from "gulp-babel";
import clean from "gulp-clean";
import stylus from "gulp-stylus";
import uglify from "gulp-uglify";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import mqpacker from "css-mqpacker";

const BUILD_DIR = "dist";
// google site verification
const ghash = "google9ab7bf08387cc375";

const uglifyopt = {
  output: {
    // don't drop comments with "!"
    comments: /^!/
  }
};

const cleanup = () =>
  gulp
    .src([BUILD_DIR, "modules/comps/generated"], {
      force: true,
      read: false,
      allowEmpty: true
    })
    .pipe(clean());

const stylusbuild = () =>
  gulp
    .src("assets/stylus/Illuminate.styl")
    .pipe(
      stylus({
        compress: true
      })
    )
    .pipe(postcss([autoprefixer, cssnano, mqpacker]))
    .pipe(gulp.dest("modules/comps/generated"));

const styluswatch = () => gulp.watch("assets/stylus/**", stylusbuild);

const jsAssets = () =>
  gulp
    .src([
      "node_modules/vanilla-lazyload/dist/lazyload.min.js",
      "node_modules/smooth-scroll/dist/smooth-scroll.polyfills.min.js",
      "assets/js/critical-foft-preload-fallback-optional.js"
    ])
    .pipe(babel())
    .pipe(uglify(uglifyopt))
    .pipe(gulp.dest(`${BUILD_DIR}/assets/js`));

const jsInline = () =>
  gulp
    .src(["assets/js/okitavera.js", "assets/js/thecompromise-fonts.js"])
    .pipe(babel())
    .pipe(uglify(uglifyopt))
    .pipe(gulp.dest("modules/comps/generated"));

// only watch inlined js
const jsWatch = () => gulp.watch("assets/js/**", jsInline);

const personal = (done) => {
  !fs.existsSync(BUILD_DIR) && fs.mkdirSync(BUILD_DIR);
  fs.writeFile(
    `${BUILD_DIR}/${ghash}.html`,
    `google-site-verification: ${ghash}.html`,
    done
  );
};

const prepareAssets = gulp.parallel(stylusbuild, personal, jsAssets, jsInline);

const eleventy = (options = "") => {
  let cmd = (done) =>
    spawn("eleventy", options.split(), {stdio: "inherit"}).on("close", (code) =>
      done(code)
    );
  cmd.displayName = "eleventy" + options;
  return cmd;
};

gulp.task(
  "serve",
  gulp.series(
    cleanup,
    prepareAssets,
    gulp.parallel(styluswatch, jsWatch, eleventy("--serve"))
  )
);

gulp.task("default", gulp.series(cleanup, prepareAssets, eleventy()));
