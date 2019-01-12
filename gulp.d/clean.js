module.exports = ({ gulp, rimraf, metadata }) => {
  // cleaning up several output folders
  gulp.task("clean", (done) => {
    rimraf(metadata.site.output, done);
    rimraf("./views/modules/virtual", done);
  });
};
