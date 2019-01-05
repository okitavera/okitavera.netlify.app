const rimraf = require("rimraf");

module.exports = (gulp, metadata) =>
  // cleaning up several output folders
  gulp.task("clean", (done) => {
    rimraf(metadata.site.output, done);
    rimraf("./modules/comps/generated", done);
  });
