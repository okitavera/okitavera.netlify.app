module.exports = (dir, obj = {}) =>
  require("fs")
    .readdirSync(dir)
    .forEach((file) => require("./" + require("path").join(dir, file))(obj));
