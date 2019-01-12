const gulp = require("gulp");
const fs = require("fs");
const spawn = require("child_process").spawn;
const rimraf = require("rimraf");
const metadata = JSON.parse(fs.readFileSync("./manifest/metadata.json"));
const ModLoader = require("./modloader");

new ModLoader().load("./gulp.d", {
  gulp: gulp,
  fs: fs,
  spawn: spawn,
  rimraf: rimraf,
  metadata: metadata
});

const elv = (options = "") => {
  let cmd = (cb) =>
    spawn(require.resolve(".bin/eleventy"), options.split(), {
      stdio: "inherit"
    }).on("close", (ret) => cb(ret));
  cmd.displayName = ("eleventy" + options).replace("--", ":");
  return cmd;
};

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
