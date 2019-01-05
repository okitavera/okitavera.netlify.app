const gulp = require("gulp");
const elv = require("./gulp/eleventy");
const metadata = JSON.parse(
  require("fs").readFileSync("./data/manifest/metadata.json")
);

require("./gulp/clean")(gulp, metadata);
require("./gulp/stylesheet")(gulp, metadata);
require("./gulp/scripts")(gulp, metadata);
require("./gulp/images")(gulp, metadata);

// task for build and resize thumbnails and avatars
exports.images = gulp.series("thumbnails", "ava:fetch", "ava:normalize");

// task for build and run those watchers
exports.serve = gulp.series(
  "clean",
  gulp.parallel("css", "css:icons", "js"),
  "js:comments",
  gulp.parallel("watch:css", "watch:js", elv("--serve"))
);

// default task
// Only building files, typically for CI/Deployers
exports.default = gulp.series(
  "clean",
  gulp.parallel("css", "css:icons", "js"),
  "js:comments",
  elv()
);
