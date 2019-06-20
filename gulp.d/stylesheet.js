const postcss = require("gulp-postcss");
const cssEnv = require("postcss-preset-env");
const cssNano = require("cssnano");
const cssPacker = require("css-mqpacker");
const cssNormalize = require("postcss-normalize");
const cssSVG = require("postcss-inline-svg");
const sass = require("gulp-sass");
const sassGlob = require("gulp-sass-glob");

// build main stylesheet
module.exports = ({ gulp }) => {
  const cssNormalizeX = cssNormalize({
    forceImport: true
  });

  const cssSVGX = cssSVG({
    paths: ["./node_modules/feather-icons/dist/icons"]
  });

  gulp.task("css", () =>
    gulp
      .src("./assets/scss/Illuminate.scss")
      .pipe(sassGlob())
      .pipe(sass().on("error", sass.logError))
      .pipe(postcss([cssNormalizeX, cssPacker, cssEnv, cssNano]))
      .pipe(gulp.dest("./views/modules/virtual"))
  );

  // build stylesheet for feather-icons
  gulp.task("css:icons", () =>
    gulp
      .src("./assets/scss/IlluminateIcons.scss")
      .pipe(sass().on("error", sass.logError))
      .pipe(postcss([cssSVGX, cssEnv, cssNano]))
      .pipe(gulp.dest("./views/modules/virtual"))
  );

  // stylesheets watcher
  gulp.task("watch:css", () =>
    gulp.watch("./assets/scss/**", gulp.series("css", "css:icons"))
  );
};
