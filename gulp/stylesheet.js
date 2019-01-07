const stylus = require("gulp-stylus");
const postcss = require("gulp-postcss");
const cssEnv = require("postcss-preset-env");
const cssNano = require("cssnano");
const cssPacker = require("css-mqpacker");
const cssNormalize = require("postcss-normalize");
const cssSVG = require("postcss-inline-svg");

// build main stylesheet with stylus and postcss
module.exports = ({ gulp, metadata }) => {
  const cssNormalizeX = cssNormalize({
    forceImport: true
  });

  const cssSVGX = cssSVG({
    path: "./node_modules/feather-icons/dist/icons"
  });

  gulp.task("css", () =>
    gulp
      .src("./assets/stylus/Illuminate.styl")
      .pipe(stylus())
      .pipe(postcss([cssNormalizeX, cssPacker, cssEnv, cssNano]))
      .pipe(gulp.dest("./modules/partial/generated"))
  );

  // build stylesheet for feather-icons
  gulp.task("css:icons", () =>
    gulp
      .src("./assets/stylus/IlluminateIcons.styl")
      .pipe(stylus())
      .pipe(postcss([cssSVGX, cssEnv, cssNano]))
      .pipe(gulp.dest(`${metadata.site.output}/assets/css`))
  );

  // stylesheets watcher
  gulp.task("watch:css", () =>
    gulp.watch("./assets/stylus/**", gulp.series("css", "css:icons"))
  );
};
