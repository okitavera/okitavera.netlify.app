const fs = require("fs");
const spawn = require("child_process").spawn;
const rimraf = require("rimraf");
const gulp = require("gulp");
const stylus = require("gulp-stylus");
const postcss = require("gulp-postcss");
const cssEnv = require("postcss-preset-env");
const cssNano = require("cssnano");

// read the file instead of requiring directly
const metadata = JSON.parse(fs.readFileSync("./data/manifest/metadata.json"));

// call eleventy with additional options
const eleventy = (options = "") => {
  let cmd = (done) =>
    // explicitly pointing to the .bin to allow us to run it without npx/yarn
    spawn("./node_modules/.bin/eleventy", options.split(), {
      stdio: "inherit"
    }).on("close", (code) => done(code));
  cmd.displayName = ("eleventy" + options).replace("--", ":");
  return cmd;
};

// build main stylesheet with stylus and postcss
gulp.task("build:css", () =>
  gulp
    .src("./assets/stylus/Illuminate.styl")
    .pipe(stylus())
    .pipe(
      postcss([
        require("postcss-normalize")({
          forceImport: true // automagically put normalize.css on the beginning of the css without importing manually
        }),
        require("css-mqpacker"),
        cssEnv,
        cssNano
      ])
    )
    .pipe(gulp.dest("./modules/comps/generated"))
);

// build stylesheet for feather-icons
gulp.task("build:cssicons", () =>
  gulp
    .src("./assets/stylus/IlluminateIcons.styl")
    .pipe(
      stylus({
        url: {
          name: "fea-ico",
          paths: [__dirname + "/node_modules/feather-icons/dist/icons"], // don't know why relative path doesn't works here
          limit: false // disable 30KB file limits
        }
      })
    )
    .pipe(postcss([cssEnv, cssNano]))
    .pipe(gulp.dest(`${metadata.site.output}/assets/css`))
);

// stylesheets watcher
gulp.task("watch:css", () =>
  gulp.watch("./assets/stylus/**", gulp.series("build:css", "build:cssicons"))
);

// transpile and bundle scripts for browser
gulp.task(
  "build:js",
  () =>
    new Promise((done) =>
      require("webpack")(require("./webpack.config.js"), (err, stats) => {
        if (err) console.log("Webpack", err);
        console.log(stats.toString());
        done();
      })
    )
);

// inject license comments to browser's scripts
gulp.task("build:jscomments", (done) => {
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
  gulp.watch("./assets/js/**", gulp.series("build:js", "build:jscomments"))
);

// build mini-thumbnails for posts list
gulp.task("build:thumbnails", (done) => {
  rimraf("./assets/thumbnails", done);
  return gulp
    .src("./assets/img/banners/*.{png,jpg}")
    .pipe(
      require("gulp-responsive")({
        "*": {
          width: "320",
          quality: 80
        }
      })
    )
    .pipe(gulp.dest("./assets/img/thumbnails"));
});

// download people's avatars
const avapath = "./assets/img/avatars";
gulp.task("ava:fetch", (done) => {
  const ava = JSON.parse(fs.readFileSync("./data/manifest/friendlists.json"))
    .friends;

  !fs.existsSync(avapath) && fs.mkdirSync(avapath);

  ava.forEach((i) => {
    const options = `${i.img} -O ${avapath}/${
      i.name
    }.min.png -q --show-progress`;
    spawn("wget", options.split(" "), { stdio: "inherit" });
  });

  const options = `${
    metadata.author.photo
  } -O ${avapath}/me.png -q --show-progress`;
  spawn("wget", options.split(" "), { stdio: "inherit" });

  return done();
});

gulp.task("ava:normalize", () => {
  return gulp
    .src(`${avapath}/*.min.png`)
    .pipe(
      require("gulp-responsive")({
        "*": {
          width: "128",
          format: "png",
          quality: 80,
          withMetadata: false,
          progressive: true,
          withoutEnlargement: false,
          errorOnEnlargement: false
        }
      })
    )
    .pipe(gulp.dest("./assets/img/avatars"));
});

// cleaning up several output folders
gulp.task("clean", (done) => {
  rimraf(metadata.site.output, done);
  rimraf("./modules/comps/generated", done);
});

// task for build and run those watchers
gulp.task(
  "serve",
  gulp.series(
    "clean",
    gulp.parallel("build:css", "build:cssicons", "build:js"),
    "build:jscomments",
    gulp.parallel("watch:css", "watch:js", eleventy("--serve"))
  )
);

// default task
// Only building files, typically for CI/Deployers
gulp.task(
  "default",
  gulp.series(
    "clean",
    gulp.parallel("build:css", "build:cssicons", "build:js"),
    "build:jscomments",
    eleventy()
  )
);
