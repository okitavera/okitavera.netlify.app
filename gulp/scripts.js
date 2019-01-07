const webpack = require("webpack");

module.exports = (gulp) => {
  // transpile and bundle scripts for browser
  gulp.task(
    "js",
    () =>
      new Promise((done) =>
        webpack(require("../webpack.config.js"), (err, stats) => {
          if (err) console.log("Webpack", err);
          console.log(stats.toString());
          done();
        })
      )
  );

  // inject license comments to browser's scripts
  gulp.task("js:comments", (done) => {
    const license = fs.readFileSync("./LICENSE", "utf-8");
    const files = [
      `${metadata.site.output}/assets/js/Okitavera.js`,
      `./modules/comps/generated/FontLoader.js`
    ];
    files.forEach((file) => fs.appendFileSync(file, `\n/*\n${license}\n*/\n`));
    return done();
  });

  // browser's scripts watcher
  gulp.task("watch:js", () =>
    gulp.watch("./assets/js/**", gulp.series("js", "js:comments"))
  );
};
