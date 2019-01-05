const responsive = require("gulp-responsive");
const spawn = require("child_process").spawn;
const rimraf = require("rimraf");

module.exports = (gulp, metadata) => {
  // build mini-thumbnails for posts list
  gulp.task("thumbnails", (done) => {
    rimraf("./assets/thumbnails", done);
    return gulp
      .src("./assets/img/banners/*.{png,jpg}")
      .pipe(
        responsive({
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
        responsive({
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
};
