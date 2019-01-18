const res = require("gulp-responsive");
const dl = require("gulp-download2");
const rename = require("gulp-rename");

module.exports = ({ gulp, fs, rimraf }) => {
  // build mini-thumbnails for posts list
  gulp.task("thumbnails", (done) => {
    const resOpt = {
      "*": {
        width: "320",
        quality: 80,
        format: "jpeg"
      }
    };
    const renOpt = {
      extname: ".jpg"
    };
    rimraf("./assets/thumbnails", done);
    return gulp
      .src("./assets/img/banners/*.{png,jpg}")
      .pipe(res(resOpt))
      .pipe(rename(renOpt))
      .pipe(gulp.dest("./assets/img/thumbnails"));
  });

  // download people's avatars
  const avapath = "./assets/img/avatars";
  gulp.task("ava:fetch", () => {
    !fs.existsSync(avapath) && fs.mkdirSync(avapath);

    const fdata = JSON.parse(fs.readFileSync("./manifest/friendlists.json"));
    const avatars = fdata.friends.map((it) => ({
      url: it.img,
      file: `${it.name}.min.png`
    }));

    return dl(avatars).pipe(gulp.dest("./assets/img/avatars"));
  });

  gulp.task("ava:normalize", () => {
    const resOpt = {
      "*": {
        width: "128",
        format: "png",
        quality: 80,
        withMetadata: false,
        progressive: true,
        withoutEnlargement: false,
        errorOnEnlargement: false
      }
    };
    return gulp
      .src(`${avapath}/*.min.png`)
      .pipe(res(resOpt))
      .pipe(gulp.dest("./assets/img/avatars"));
  });

  gulp.task("avatars", gulp.series("ava:fetch", "ava:normalize"));
};
