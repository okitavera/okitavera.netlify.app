const res = require("gulp-responsive");
const dl = require("gulp-download2");

module.exports = ({ gulp, fs, rimraf }) => {
  // build mini-thumbnails for posts list
  gulp.task("thumbnails", (done) => {
    rimraf("./assets/thumbnails", done);
    return gulp
      .src("./assets/img/banners/*.{png,jpg}")
      .pipe(
        res({
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
  gulp.task("ava:fetch", () => {
    const ava = JSON.parse(fs.readFileSync("./manifest/friendlists.json"))
      .friends;
    const avalist = [];
    !fs.existsSync(avapath) && fs.mkdirSync(avapath);

    ava.forEach((i) => {
      avalist.push({
        url: i.img,
        file: `${i.name}.min.png`
      });
    });
    return dl(avalist).pipe(gulp.dest("./assets/img/avatars"));
  });

  gulp.task("ava:normalize", () => {
    return gulp
      .src(`${avapath}/*.min.png`)
      .pipe(
        res({
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

  gulp.task("avatars", gulp.series("ava:fetch", "ava:normalize"));
};
