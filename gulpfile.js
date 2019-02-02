require("dotenv").config();

const gulp = require("gulp");
const fs = require("fs");
const spawn = require("child_process").spawn;
const rimraf = require("rimraf");
const metadata = JSON.parse(fs.readFileSync("./manifest/metadata.json"));
const ModLoader = require("./modloader");

ModLoader("./gulp.d", {
  gulp: gulp,
  fs: fs,
  spawn: spawn,
  rimraf: rimraf,
  metadata: metadata
});

const eleventy = (options = "") => (cb) =>
  spawn(require.resolve(".bin/eleventy"), options.split(), {
    stdio: "inherit"
  }).on("close", (ret) => cb(ret));

const switchTo = (mode) => (cb) => ((process.env.NODE_ENV = mode), cb());

// task for build and resize avatars
exports.images = gulp.series("ava:fetch", "ava:normalize");

// task for build and run those watchers
exports.serve = gulp.series(
  switchTo("development"),
  "clean",
  gulp.parallel("css", "css:icons", "js"),
  "js:comments",
  gulp.parallel("watch:css", "watch:js", eleventy("--serve"))
);

// default task
// Only building files, typically for CI/Deployers
exports.default = gulp.series(
  switchTo("production"),
  "clean",
  gulp.parallel("css", "css:icons", "js"),
  "js:comments",
  "twitter",
  eleventy()
);
